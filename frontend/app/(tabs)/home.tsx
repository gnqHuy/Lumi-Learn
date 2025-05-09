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
import React, { useEffect, useState } from "react";
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
import { getAllCourses, getMyCourses, searchCourse } from "@/api/courseApi";
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

  // all courses
  const [ suggestedCourses, setSuggestedCourses ] = useState<CourseItemProps[]>([]);
  const [ allCourses, setAllCourses ] = useState<CourseItemProps[]>([]);

  // searching topic
  const [searchingTopics, setSearchingTopics] = useState([]);

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
  const [userProfile, setUserProfile] = useState<User>({
    id: "",
    username: "",
    name: "",
    email: "",
    phone: "",
    birthday: new Date(),
    role: "",
  });

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

  useEffect(() => {
    if (authState?.accessToken) {
      setText(authState.accessToken);
    }
    GetAllTopics().then((response) => {
      setSearchingTopics(response.data);
    });
  }, [authState]);

  // get user's courses
  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((err) => console.error(err));
    
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
            isUserEnrolled: course.isUserEnrolled,
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
            isUserEnrolled: course.isUserEnrolled,
          })
        );
        setAllCourses(
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

  // get search histories
  useEffect(() => {
    getMySearchHistories().then((response) => {
      setRecentSearches(response.data);
    });
  }, [searchTrigger]);

  // get user profile
  useEffect(() => {
    let sortedCourses = [...allCourses];
  
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
  }, [selectedFilter, allCourses]);

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
        const mappedCourses: CourseItemProps[] = res.data.map(
          (course: any) => ({
            id: course.id,
            imgUrl: course.thumbnail,
            courseName: course.title,
            instructorName: course.instructor,
          })
        );
        setSearchedCourses(mappedCourses);
        setSearchTrigger((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update recent search
  const refreshRecentSearches = () => {
    getMySearchHistories().then((response) => {
      setRecentSearches(response.data);
    });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content"/>
      <View className="flex-1 flex-col gap-3 mt-16 pb-4">
        {/* username */}
        {displaySearch === false ? (
          <View className="relative left-[5%]">
            <Text className="text-3xl text-cyan-800 font-bold">{userProfile?.name}</Text>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              setDisplaySearch(false);
              setDisplaySearchResult(false);
            }}
          >
            <Entypo
              name="chevron-left"
              size={40}
              className="relative left-[1%] top-[0.5rem] mt-[1rem]"
            />
          </Pressable>
        )}

        {/* search bar and sort */}
        <View className="flex-row w-full items-center justify-between gap-3 px-4">
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

        {/* Course joined */}
        <ScrollView className="w-full">
          <View className="flex-col gap-3">
            {displaySearch === false && (
              <CourseJoined courseJoined={coursesJoined} />
            )}

            {/* suggested course */}
            {displaySearch === false && (
              <SuggestedCourse
                courses={suggestedCourses}
                filters={filters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            )}

            {displaySearch === true && (
              <Search
                searchingTopics={searchingTopics}
                recentSearches={recentSearches}
                deleteSearchHistory={deleteSearchHistory}
                displaySearchResult={displaySearchResult}
                searchedCourses={searchedCourses}
              />
            )}
          </View>
        </ScrollView>

        {/* search filter */}
        {displaySearchFilter === true && (
          <View className="absolute left-0 bottom-[2rem] z-[50]">
            <SearchFilter disableSearchFilter={disableSearchFilter} />
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
