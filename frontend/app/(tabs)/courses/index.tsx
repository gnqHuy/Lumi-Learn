import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CourseList from '@/components/Course/CourseList'
import { CourseItemProps } from '@/components/Course/CourseItem'
import { getCourseOverview, getMyCourses, searchCourse } from '@/api/courseApi'
import useAuthStore from '@/zustand/authStore'
import CreateCourseModal from '@/components/Course/CreateCourseModal'
import { useRouter } from 'expo-router'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import { PillSelection } from '@/components/PillsSelection/PillSelection'
import SearchFilter from '@/components/Search/SearchFilter'
import Search from '@/components/Search/Search'
import { GetAllTopics } from '@/api/topicApi'
import { deleteSearchHistoryByContent, getMySearchHistories } from '@/api/searchHistoriesApi'

// const coursesDummyData: CourseItemProps[] = [
//     {
//         imgUrl: '',
//         id: '1',
//         courseName: 'Football',
//         instructorName: 'Leo Messi', 
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '2',
//         courseName: 'Billiards',
//         instructorName: 'Fedor Gorst',
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '3',
//         courseName: 'Snooker',
//         instructorName: `Ronnie O' Sullivan`,
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '4',
//         courseName: '3pts Shooting',
//         instructorName: 'Steph Curry',
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '5',
//         courseName: 'Fathering',
//         instructorName: 'Nikola Jokic',
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '6',
//         courseName: 'Formula One',
//         instructorName: 'Max Verstappen',
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '7',
//         courseName: 'Golf',
//         instructorName: 'Gareth Bale',
//         isUserEnrolled: false
//     },
//     {
//         imgUrl: '',
//         id: '8',
//         courseName: 'Swimming',
//         instructorName: 'Michael Phelps',
//         isUserEnrolled: false
//     },
// ];

const MyCourseScreen = () => {
    const [ courses, setCourses ] = useState<CourseItemProps[]>([]);
    const [ isCourseModalOpen, setIsCourseModalOpen ] = useState(false);
    const user = useAuthStore((state) => state.authState?.user);
    const router = useRouter();

    // keyword of search bar
    const [keyword, setKeyword] = useState("");

    // state to display search filter
    const [displaySearchFilter, setDisplaySearchFilter] = useState(false);

    // state to display search screen 
    const [displaySearch, setDisplaySearch] = useState(false);

    // state to display search result
    const [displaySearchResult, setDisplaySearchResult] = useState(false);

    // filter options
    const filters = ["All", "New", "Popular", "Highest Rated"];
    const [selectedFilter, setSelectedFilter] = useState<string[]>(["All"]);

    // filteredCourse
    const [filteredCourses, setFilteredCourses] = useState<CourseItemProps[]>([]);

    // recent searches 
    const [recentSearches, setRecentSearches] = useState([]);

    // state to trigger change of recent searches
    const [searchTrigger, setSearchTrigger] = useState(false);

    // courses based on search result
    const [searchedCourses, setSearchedCourses] = useState<CourseItemProps[]>([]);

    const isTeacher = () => {
        return user?.role == "Teacher";
    }

    // get my courses
    useEffect(() => {
        getMyCourses().then((res) => {
            const mappedCourses: CourseItemProps[] = res.data.map((course: any) => ({
                id: course.id,
                imgUrl: course.thumbnail,
                courseName: course.title,
                instructorName: course.instructor,
                timestamp: new Date(course.timestamp),
                rating: course.rating,
                isUserEnrolled: course.isUserEnrolled, 
                topic: course.topic
            }));

            setCourses(mappedCourses);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    // filter courses
    useEffect(() => {
        let sortedCourses = [...courses];
        
        switch (selectedFilter[0]) {
            case 'All':
            break;
        
            case 'New':
            sortedCourses.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            break;
        
            case 'Rating':
            sortedCourses.sort((a, b) => b.rating - a.rating);
            break;
        
            default:
            break;
        }
        
        setFilteredCourses(sortedCourses);
    }, [selectedFilter, courses]);

    useEffect(() => {
        getMySearchHistories().then((response) => {
          setRecentSearches(response.data);
        });
    }, [searchTrigger]);

    // disable search filter
    const disableSearchFilter = () => {
        setDisplaySearchFilter(false);
    };

    // delete search histories
    const deleteSearchHistory = (content: string) => {
        deleteSearchHistoryByContent(content)
          .then((res) => {
            setSearchTrigger((prev) => !prev);
          })
          .catch((err) => console.error(err));
    };

    // handle search key word
    const searchCourseByKeyword = (keyword: string) => {
        setDisplaySearchResult(true);
        const filteredCourse = courses.filter((course) => course.courseName.toLowerCase().includes(keyword.toLowerCase()));
        setSearchedCourses(filteredCourse);
        setSearchTrigger((prev) => !prev);
    };

    // set up display search
    const setupDisplaySearch = (display: boolean) => {
        setDisplaySearch(display);
    }

    // set up display search result
    const setupDisplaySearchResult = (display: boolean) => {
        setDisplaySearchResult(display);
    }

    async function filterByLength(
        courses: CourseItemProps[],
        minLength: number,
        maxLength: number
      ): Promise<CourseItemProps[]> {
        const courseDetails = await Promise.all(
          courses.map(course =>
            getCourseOverview(course.id).then(res => ({
              ...course,
              length: res.data.lessons.length
            }))
          )
        );
      
        return courseDetails.filter(course =>
          course.length >= minLength && course.length <= maxLength
        );
      }
      
      // Main filter function combining all criteria
      const handleFilterCourse = async (
        rating: number[],
        topics: string[],
        length: number[]
      ) => {
        const basicFiltered = courses.filter(course =>
          course.rating >= rating[0] &&
          course.rating <= rating[1] &&
          topics.includes(course.topic)
        );
      
        const finalFiltered = await filterByLength(basicFiltered, length[0], length[1]);
        setSearchedCourses(finalFiltered);
        console.log(finalFiltered);
    
        setDisplaySearchResult(true);
        setDisplaySearch(true);
    };

    return (
        <View className='flex-1'>
            <View
                id='my-course-screen'
                className='flex-1 px-4 pt-16 bg-white'
            >
                {displaySearch === false && 
                    <Text className="text-3xl text-cyan-800 font-bold mb-2 ml-2">My Courses</Text>
                }

                {displaySearch === true && 
                    <Pressable
                    onPress={() => {
                    setDisplaySearch(false);
                    setDisplaySearchResult(false);
                    }}
                    className="relative left-[1%]"
                    >
                        <AntDesign
                            name="arrowleft"
                            size={24}
                        />
                    </Pressable>
                }

                {/* search bar and sort */}
                <View className="flex-row w-full items-center justify-between gap-3">
                    {/* search bar */}
                    <Pressable className="flex-row items-center px-4 gap-3 bg-zinc-100 rounded-full w-5/6 z-[10] h-[3.3rem]">
                        <Feather name="search" color={"gray"} size={22} className=" z-[20]" />
                        {keyword && (
                        <AntDesign
                            name="close"
                            color={"#4b5563"}
                            size={25}
                            className="z-[10]"
                            onPress={() => {
                            setKeyword("");
                            setDisplaySearchResult(false);
                            }}
                        />
                        )}
                        <TextInput
                            placeholder="Find courses here"
                            className="font-semibold"
                            style={{ textAlignVertical: "center" }}
                            editable={displaySearch === false ? false : true}
                            placeholderTextColor={"gray"}
                            onPressIn={() => setDisplaySearch(true)}
                            onChangeText={setKeyword}
                            value={keyword}
                            onSubmitEditing={() => searchCourseByKeyword(keyword)}
                        />
                    </Pressable>
                    {/* filter  */}
                    <Pressable
                        className="flex items-center justify-center p-[10px] bg-zinc-100 rounded-full z-[10] mt-[1.2rem] relative bottom-[0.7rem]"
                        onPress={() => setDisplaySearchFilter(true)}
                    >
                        <AntDesign name="filter" color={"gray"} size={24} />
                    </Pressable>
                </View>


                {/* options filter */}
                {displaySearch === false && 
                    <View className = "mt-[1rem] mb-1">
                        <PillSelection
                            values={filters}
                            defaultColor='bg-zinc-100'
                            selectedColor='bg-cyan-700'
                            textColor='text-cyan-700'
                            selected={selectedFilter}
                            setSelected={setSelectedFilter}
                        />
                    </View>
                }

                {displaySearch === false && 
                    <CourseList courses={filteredCourses}/>
                }
                {(isTeacher() && displaySearch === false) ? 
                <TouchableOpacity
                    id='submit-button'
                    className='bottom-4 z-10 flex justify-center items-center w-full py-4 bg-cyan-800 rounded-xl'
                    onPress={() => router.push('/(tabs)/courses/createCourse')}
                    activeOpacity={0.55}
                >
                    <Text className='text-lg text-white font-semibold'>Create new course</Text>
                </TouchableOpacity>
                : <></>}

                {/* search screen */}
                {displaySearch === true && (
                    <View className = "mt-[0.75rem]">
                        <Search
                            recentSearches={recentSearches}
                            deleteSearchHistory={deleteSearchHistory}
                            displaySearchResult={displaySearchResult}
                            searchedCourses={searchedCourses}
                        />
                    </View>
                )}
            </View>

            {/* search filter */}
            {displaySearchFilter === true && 
                <View className="absolute bottom-0 z-[50]">
                    <SearchFilter 
                        disableSearchFilter={disableSearchFilter} 
                        setupDisplaySearch={setupDisplaySearch}
                        setupDisplaySearchResult={setupDisplaySearchResult}
                        handleFilterCourse={handleFilterCourse}
                    />
                </View>
            }

            {/* overlay */}
            {displaySearchFilter === true && (
            <Pressable
                className="bg-gray-600 absolute left-0 top-0 w-full h-full z-[10] opacity-50"
                onPress={() => setDisplaySearchFilter(false)}
            ></Pressable>
            )}
        </View>
    )
}

export default MyCourseScreen