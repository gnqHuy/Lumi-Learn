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
                numberOfRatings: course.numberOfRatings,
                numberOfLessons: course.numberOfLessons,
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
        searchCourse(keyword)
        .then((res) => {
        const mappedCourses: CourseItemProps[] = res.data.map(
            (course: any) => ({
            id: course.id,
            imgUrl: course.thumbnail,
            courseName: course.title,
            instructorName: course.instructor,
            timestamp: new Date(course.timestamp),
            rating: course.rating,
            numberOfRatings: course.numberOfRatings,
            numberOfLessons: course.numberOfLessons,
            isUserEnrolled: course.isUserEnrolled,
            topic: course.topic
            })
        );
        setSearchedCourses(mappedCourses.filter(course => course.isUserEnrolled === true));
        setSearchTrigger((prev) => !prev);
        })
        .catch((err) => {
        console.log(err);
        });
        setSearchTrigger((prev) => !prev);
    };

    // handle auto fill and search keyword
    const handleAutoFillAndSearchKeyword = (val: string) => {
        setKeyword(val);
        searchCourseByKeyword(val);
    } 

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
        const ratingFiltered = courses.filter(course =>
            course.rating >= rating[0] &&
            course.rating <= rating[1]
          );
      
          const ratingAndTopicFiltered = ratingFiltered.filter(course => {
              return topics[0] === "All" || topics.includes(course.topic);
          })
        
          const finalFiltered = await filterByLength(ratingAndTopicFiltered, length[0], length[1]);
          setSearchedCourses(finalFiltered);
          console.log(finalFiltered);
    
        setDisplaySearchResult(true);
        setDisplaySearch(true);
    };

    return (
        <View className='flex-1'>
            <View
                id='my-course-screen'
                className='flex-1 pt-20 bg-white'
            >
                {displaySearch === false && 
                    <View className='w-full px-4'>
                        <Text className="text-3xl text-cyan-800 font-extrabold mb-3 ml-2">My Courses</Text>
                    </View>
                }

                {displaySearch === true && 
                    <View className='w-full px-4'>
                        <Pressable
                            onPress={() => {
                            setDisplaySearch(false);
                            setDisplaySearchResult(false);
                            }}
                            className="relative left-[2%] flex-row mb-[0.5rem] gap-3"
                        >
                            <AntDesign
                                name="arrowleft"
                                size={24}
                                className = "relative top-[0.3rem]"
                            />
                            <Text className = "text-3xl text-cyan-800 font-extrabold mb-[0.5rem]">Search</Text>
                        </Pressable>
                    </View>
                }

                {/* search bar and sort */}
                <View className="flex-row w-full px-4 items-center justify-between">
                    {/* search bar */}
                    <Pressable className="flex-row items-center px-4 gap-3 bg-zinc-100 rounded-full w-5/6 z-[10] h-[3.3rem]">
                        <Feather name="search" color={"gray"} size={22} className=" z-[20] relative top-[0.1rem]" />
                        <TextInput
                            placeholder="Find courses here"
                            className="font-semibold w-3/4 pt-[0.2rem]"
                            style={{ textAlignVertical: "center" }}
                            editable={displaySearch === false ? false : true}
                            placeholderTextColor={"gray"}
                            onPressIn={() => setDisplaySearch(true)}
                            onChangeText={setKeyword}
                            value={keyword}
                            onSubmitEditing={() => searchCourseByKeyword(keyword)}
                        />
                        {keyword && (
                        <AntDesign
                            name="close"
                            color={"gray"}
                            size={20}
                            className="z-[20] ml-2"
                            onPress={() => {
                            setKeyword("");
                            setDisplaySearchResult(false);
                            }}
                        />
                        )}
                    </Pressable>
                    {/* filter  */}
                    <Pressable
                        className="flex items-center justify-center p-[10px] bg-zinc-100 rounded-full z-[10] mt-[1.2rem] relative bottom-[0.45rem]"
                        onPress={() => setDisplaySearchFilter(true)}
                    >
                        <AntDesign name="filter" color={"gray"} size={24} className = "relative top-[0.1rem]"/>
                    </Pressable>
                </View>


                {/* options filter */}
                {displaySearch === false && 
                    <View className = "mt-[1rem] mb-1 w-full px-4">
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
                <View 
                    className='w-full px-6 pb-2 pt-4 bottom-0 z-10 absolute'
                >
                    <TouchableOpacity
                        id='submit-button'
                        className='flex justify-center items-center w-full py-4 bg-cyan-700 rounded-xl'
                        onPress={() => router.push('/(tabs)/courses/createCourse')}
                        style = {{boxShadow: "0px 0px 20px 20px rgba(243, 243, 243, 0.5)"}}
                        activeOpacity={0.85}
                    >
                        <Text className='text-lg text-white font-semibold'>Create new course</Text>
                    </TouchableOpacity>
                </View>
                : <></>}

                {/* search screen */}
                {displaySearch === true && (
                    <View className = "mt-[0.75rem]">
                        <Search
                            recentSearches={recentSearches}
                            deleteSearchHistory={deleteSearchHistory}
                            displaySearchResult={displaySearchResult}
                            searchedCourses={searchedCourses}
                            handleAutoFillAndSearchKeyword={handleAutoFillAndSearchKeyword}
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