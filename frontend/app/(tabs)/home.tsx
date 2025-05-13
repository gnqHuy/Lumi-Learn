import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CoursesPage from "./courses";
import { logIn } from "@/api/authApi";
import useAuthStore from "@/zustand/authStore";

import EvilIcon from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseJoined from "@/components/Home/CourseJoined";
import SuggestedCourse from "@/components/Home/SuggestedCourse";
import Search from "@/components/Search/Search";
import Entypo from "@expo/vector-icons/Entypo";
import SearchFilter from "@/components/Search/SearchFilter";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getAllCourses, getCourseOverview, getMyCourses, searchCourse } from "@/api/courseApi";
import { GetAllTopics } from "@/api/topicApi";
import {
  deleteSearchHistoryByContent,
  getMySearchHistories,
} from "@/api/searchHistoriesApi";
import { CourseOverview } from "@/types/course";
import { CourseItemProps } from "@/components/Course/CourseItem";
import { getUserProfile } from "@/api/userApi";
import { User } from "@/types/user";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
// import { REACT_APP_API_BASE_URL } from '';

const HomePage = () => {
  const username = "teacher";
  const password = "string";
  const [text, setText] = useState("");
  const authState = useAuthStore((state) => state.authState);
  const saveAuthState = useAuthStore((state) => state.saveAuthState);
  const filters = ["All", "New", "Popular", "Highest Rated"];

  // state display search
  const [displaySearch, setDisplaySearch] = useState(false);

  // state display search filter
  const [displaySearchFilter, setDisplaySearchFilter] = useState(false);

  // courseJoined
  const [coursesJoined, setCoursesJoined] = useState<CourseItemProps[]>([]);

  // all courses not joined
  const [ suggestedCourses, setSuggestedCourses ] = useState<CourseItemProps[]>([]);
  const [ allCoursesNotJoined, setAllCoursesNotJoined ] = useState<CourseItemProps[]>([]);

  // full all courses
  const [allCourses, setAllCourses] = useState<CourseItemProps[]>([]);

  // recent search
  const [recentSearches, setRecentSearches] = useState([]);

  // keyword of search input
  const [keyword, setKeyword] = useState<string>("");

  // courses based on search result
  const [searchedCourses, setSearchedCourses] = useState<CourseItemProps[]>([]);

  // state to handle display search result
  const [displaySearchResult, setDisplaySearchResult] =
    useState<boolean>(false);

  // trigger the change of search histories
  const [searchTrigger, setSearchTrigger] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<string[]>(["All"]);

  // user profile
  const userProfile = useAuthStore.getState().authState?.user;

  // rating filter of course
  const [ratingRange, setRatingRange] = useState<number[]>([1, 3]);

  // course length range
  const [courseLengthRange, setCourseLengthRange] = useState<number[]>([1,5]);

  // topics chosen
  const [ selectedTopics, setSelectedTopics ] = useState<string[]>(["All"]);

  //
  const [isEditing, setIsEditing] = useState(false); 

  const handleOnClick = () => {
    const request = {
      username: username,
      password: password,
    };

    logIn(request)
      .then((res) => {
        setText(res.data.user.username);
      })
      .catch((err) => {
        setText(err.message);
      });
  };

  // auth state 
  useEffect(() => {
    if (authState?.accessToken) {
      setText(authState.accessToken);
    }
  }, [authState]);

  // get all courses
  useEffect(() => {
    getAllCourses().then((res) => {
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
      setAllCourses(mappedCourses);
    })
  }, [])

  // get user's courses
  useEffect(() => {
    getMyCourses()
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
        setCoursesJoined(mappedCourses);
      })
      .catch((err) => {
        console.log(err);
      });

      getAllCourses()
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
        setAllCoursesNotJoined(
          mappedCourses.filter((course) => course.isUserEnrolled === false)
        );
        setSuggestedCourses(
          mappedCourses.filter((course) => course.isUserEnrolled === false)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get search histories when change the router 
  useFocusEffect(
    useCallback(() => {
      getMySearchHistories().then((response) => {
        setRecentSearches(response.data);
      });
    }, [])
  );

  // get search histories when end one search -> push new search -> update
  useEffect(() => {
    getMySearchHistories().then((response) => {
      setRecentSearches(response.data);
    });
  }, [searchTrigger])

  // get user profile
  useEffect(() => {
    let sortedCourses = [...allCoursesNotJoined];
  
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
  
    setSuggestedCourses(sortedCourses);
  }, [selectedFilter, allCoursesNotJoined]);

  // disable search filter
  const disableSearchFilter = () => {
    setDisplaySearchFilter(false);
  };

  // delete search history
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
        setSearchTrigger((prev) => !prev);
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
        setSearchedCourses(mappedCourses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle auto fill and search keyword
  const handleAutoFillAndSearchKeyword = (val: string) => {
    setKeyword(val);
    searchCourseByKeyword(val);
  } 

  // update recent search
  const refreshRecentSearches = () => {
    getMySearchHistories().then((response) => {
      setRecentSearches(response.data);
    });
  };

  // set up display search
  const setupDisplaySearch = (display: boolean) => {
      setDisplaySearch(display);
      setSearchTrigger(prev => !prev)
  }

  // set up display search result
  const setupDisplaySearchResult = (display: boolean) => {
      setDisplaySearchResult(display);
  }

  // filter by course length
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
    const ratingFiltered = allCourses.filter(course =>
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

  const textInputRef = useRef<TextInput>(null);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content"/>
      <View className="flex-1 flex-col gap-3 mt-20 pb-4">
        {/* username */}
        {(displaySearch === false && displaySearchResult === false) ? (
          <View className="relative left-[5%]">
            <Text className="text-3xl text-cyan-800 font-extrabold">{userProfile?.name || userProfile?.username}</Text>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              setDisplaySearch(false);
              setDisplaySearchResult(false);
            }}
            className = "relative left-[4%] flex-row mb-[0.5rem] gap-3"
          >
            <AntDesign
              name="arrowleft"
              size={24}
              className="relative top-[0.3rem]"
            />
            <Text className = "text-3xl text-cyan-800 font-extrabold">Search</Text>
          </Pressable>
        )}

        {/* search bar and sort */}
        <View className="flex-row w-full items-center justify-between gap-3 px-4">
          {/* search bar */}
          <Pressable className="flex-row items-center px-4 gap-3 bg-zinc-100 rounded-full w-5/6 z-[10] h-[3.3rem]"
            onPress={() => setDisplaySearch(true)}
          >
            <Feather name="search" color={"gray"} size={22} className=" z-[20] relative top-[0.1rem]"/>
            <TextInput
              ref={textInputRef}
              accessible={true}
              accessibilityLabel={`Search Courses field: ${keyword} . ${isEditing ? 'Editing' : '. Double tab to edit'}`}
              placeholder="Find courses here"
              className="font-semibold flex-1 h-full"
              style={{ textAlignVertical: "center" }}
              editable={displaySearch}
              placeholderTextColor={"gray"}
              onPressIn={() => {
                setDisplaySearch(true);
                setIsEditing(true); 
              }}
              onBlur={() => setIsEditing(false)}
              onChangeText={setKeyword}
              value={keyword}
              onSubmitEditing={() => searchCourseByKeyword(keyword)}
            />
          </Pressable>
          {keyword && (
              <AntDesign
                name="close"
                color={"gray"}
                size={20}
                className="z-[10] absolute p-3"
                style={{
                  right: 86
                }}
                accessible={true}
                accessibilityLabel="Delete search field keyword"
                onPress={() => {
                  setKeyword("");
                  setDisplaySearchResult(false);
                  setSearchTrigger((prev) => !prev);
                }}
              />
            )}
          {/* filter  */}
          <Pressable
            className="flex items-center justify-center p-[10px] bg-zinc-100 rounded-full z-[10] mt-[1.2rem] relative bottom-[0.5rem]"
            onPress={() => {
              setDisplaySearchFilter(true);
              textInputRef.current?.blur();
            }}
            accessible={true}
            accessibilityLabel="Filter"
            accessibilityRole="button"
            accessibilityHint="Double tab to open Course Filter"
          >
            <AntDesign name="filter" color={"gray"} size={24} className = "relative top-[0.1rem]"/>
          </Pressable>
        </View>

        {/* Course joined */}
        <ScrollView className="w-full">
          <View className="flex-col gap-3 flex-1">
            {(displaySearch === false && displaySearchResult === false && coursesJoined.length > 0) && (
              <CourseJoined courseJoined={coursesJoined} />
            )}

            {/* suggested course */}
            {(displaySearch === false && displaySearchResult === false) && (
              <SuggestedCourse
                courses={suggestedCourses}
                filters={filters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            )}

            {displaySearch === true && (
              <Search
                recentSearches={recentSearches}
                deleteSearchHistory={deleteSearchHistory}
                displaySearchResult={displaySearchResult}
                searchedCourses={searchedCourses}
                handleAutoFillAndSearchKeyword={handleAutoFillAndSearchKeyword}
              />
            )}
          </View>
        </ScrollView>

        {/* search filter */}
        {displaySearchFilter === true && (
          <View className="absolute flex-1 left-0 top-40 z-[50]">
            <SearchFilter 
              disableSearchFilter={disableSearchFilter} 
              setupDisplaySearch={setupDisplaySearch}
              setupDisplaySearchResult={setupDisplaySearchResult}
              handleFilterCourse={handleFilterCourse}
              ratingRange={ratingRange}
              setRatingRange={setRatingRange}
              courseLengthRange={courseLengthRange}
              setCourseLengthRange={setCourseLengthRange}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
          </View>
        )}
      </View>

      {/* overlay */}
      {displaySearchFilter === true && (
        <Pressable
          className="bg-gray-600 absolute left-0 top-0 w-full h-full z-[10] opacity-50"
          onPress={() => setDisplaySearchFilter(false)}
        ></Pressable>
      )}
    </View>
  );
};

export default HomePage;
