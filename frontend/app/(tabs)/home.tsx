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
// import { REACT_APP_API_BASE_URL } from '';

const HomePage = () => {
    const username = 'teacher';
    const password = 'string';
    const [text, setText] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const saveAuthState = useAuthStore((state) => state.saveAuthState);

    const [displaySearch, setDisplaySearch] = useState(false);

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

  return (
    <View className="h-full">
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
        <View className = "flex-row">
            {/* search bar */}
            <Pressable className = "relative left-[4%] mt-[1rem] bg-gray-300 rounded-full w-[80%]" onPress={() => setDisplaySearch(true)}>
                <TextInput 
                    placeholder = "Find courses here"
                    className = "bg-gray-300 rounded-full py-[0.8rem] pl-[3rem] w-full"
                    onFocus={() => setDisplaySearch(true)}
                    editable = {displaySearch === false ? false : true}
                />
                <EvilIcon name = "search" size = {30} className = "absolute left-[0.5rem] top-[0.45rem]" />
            </Pressable>
            {/* sort  */}
            <View className = "bg-gray-300 rounded-full w-[10%] h-[3rem] mt-[1.2rem] ml-[8%]">
              <Image source={require("../../assets/images/filter.png")} className = "relative left-3 w-[1.5rem] h-[1.5rem] top-3" />
            </View>
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

        {displaySearch === true && 
            <Search 
                dummyRecentSearches={dummyRecentSearches}
                setupDummyRecentSearches={setupDummyRecentSearches}
            />
        }
    </View>
  )
};

export default HomePage;