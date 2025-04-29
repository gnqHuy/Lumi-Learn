import { View, Text, Button, TextInput, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoursesPage from './courses';
import { logIn } from '@/api/authApi';
import useAuthStore from '@/zustand/authStore';

import EvilIcon from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseJoined from '@/components/Home/CourseJoined';
import SuggestedCourse from '@/components/Home/SuggestedCourse';
import Search from '@/components/Search/Search';
import Entypo from '@expo/vector-icons/Entypo';
import SearchFilter from '@/components/Search/SearchFilter';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { REACT_APP_API_BASE_URL } from '';

const HomePage = () => {
    const username = 'teacher';
    const password = 'string';
    const [text, setText] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const saveAuthState = useAuthStore((state) => state.saveAuthState);

    // state display search
    const [displaySearch, setDisplaySearch] = useState(false);

    // state display search filter
    const [displaySearchFilter, setDisplaySearchFilter] = useState(false);

    const [dummyRecentSearches, setDummyRecentSearches] = useState([
      "Math 11", 
      "Physics 12",
      "Literature 10", 
      "React Native Programming", 
      "Deep Learning",
      "Spring Boot"
    ]);

    const handleOnClick = () => {
      const request = {
        username: username,
        password: password
      };

      logIn(request).then((res) => {
        setText(res.data.user.username);
      }).catch((err) => {
        setText(err.message);
      })
    }

    useEffect(() => {
      if (authState?.accessToken) {
        setText(authState.accessToken);
      }
    }, [authState]);

    const images: Record<string, any> = {
        math: require("../../assets/images/testCourse1.jpg"), 
        english: require("../../assets/images/testCourse1.jpg")
    }

    const dummyDataCourses: { courseName: string; urlKey: string }[] = [
        {
            "courseName": "Math 12", 
            "urlKey": "math"
        }, 
        {
            "courseName": "English 10",
            "urlKey": "english"
        }, 
        {
          "courseName": "Physics 12",
          "urlKey": "english"
      },
    ]

    const dummySuggestedCourses: {courseName: string, instructorName: string, urlKey: keyof typeof images}[] = 
    [
      {
        "courseName": "Algebra 1",
        "instructorName": "Nguyen Duc Anh",
        "urlKey": "math"
      }, 
      {
        "courseName": "Algebra 2",
        "instructorName": "Nguyen Duc Anh",
        "urlKey": "math"
      },
      {
        "courseName": "Python Programming",
        "instructorName": "Nguyen Duc Anh",
        "urlKey": "math"
      },
      {
        "courseName": "Computer Vision",
        "instructorName": "Nguyen Duc Anh",
        "urlKey": "math"
      },
      {
        "courseName": "Machine Learning",
        "instructorName": "Nguyen Duc Anh",
        "urlKey": "math"
      },
    ]

    // set dummy recentsearch
    const setupDummyRecentSearches = (newRecentSearches: string[]) => {
        setDummyRecentSearches(newRecentSearches);
    }

    // disable search filter
    const disableSearchFilter = () => {
      setDisplaySearchFilter(false);
    }

  return (
    <View className = "flex-1">
      <View className="h-full mt-[2rem]">
        {/* username */}
        {displaySearch === false ? 
            <View className = "relative left-[5%] mt-[2rem]">
              <Text className = "text-3xl font-bold">Nguyen Van A</Text>
            </View> : 
            <Pressable onPress={() => setDisplaySearch(false)}>
              <Entypo name = "chevron-left" size = {40} className = "relative left-[1%] top-[0.5rem]" />
            </Pressable>
        }
        
        {/* search bar and sort */}
        <View className = "flex-row w-full justify-between gap-3 px-4">
            {/* search bar */}
            <Pressable className = "flex-row gap-3 p-3 h-max bg-gray-300 rounded-full w-5/6 z-[10]" onPress={() => setDisplaySearch(true)}>
                <EvilIcon name = "search" size = {30} className = "" />
                <TextInput
                    placeholder = "Find courses here"
                    className = "bg-gray-300 rounded-full py-3 pl-3"
                    onFocus={() => setDisplaySearch(true)}
                    editable = {displaySearch === false ? false : true}
                    placeholderTextColor={"black"}
                    onPress={() => setDisplaySearch(true)}
                />
            </Pressable>
            {/* filter  */}
            <Pressable className = "flex items-center justify-center p-3 bg-gray-300 rounded-full w-max h-max z-[10] mt-[1.2rem]" onPress={() => setDisplaySearchFilter(true)}>
              <AntDesign name='filter' size={24}/>
            </Pressable>
        </View>

        {/* Course joined */}
        {displaySearch === false && 
            <CourseJoined 
              dummyDataCourses={dummyDataCourses}
              images={images}
            />
        }

        {/* suggested course */}
        {displaySearch === false && 
            <SuggestedCourse 
              dummySuggestedCourses={dummySuggestedCourses}
              images={images}
            />
        }

        {/* search */}
        {displaySearch === true && 
            <Search 
                dummyRecentSearches={dummyRecentSearches}
                setupDummyRecentSearches={setupDummyRecentSearches}
            />
        }

        {/* search filter */}
        {displaySearchFilter === true && 
            <View className = "absolute left-0 bottom-16 z-[50]">
              <SearchFilter 
                  disableSearchFilter={disableSearchFilter}
              />
            </View>
        }
      </View>
      {/* overlay */}
      {displaySearchFilter === true && 
        <Pressable className = "bg-gray-600 absolute left-0 top-0 w-full h-full z-[10] opacity-50" onPress={() => setDisplaySearchFilter(false)}></Pressable>
      }
    </View>
  )
};

export default HomePage;