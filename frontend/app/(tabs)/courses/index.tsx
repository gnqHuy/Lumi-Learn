import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CourseList from '@/components/Course/CourseList'
import { CourseItemProps } from '@/components/Course/CourseItem'
import { getMyCourses } from '@/api/courseApi'

const coursesDummyData: CourseItemProps[] = [
    {
        imgUrl: null,
        id: '1',
        courseName: 'Football',
        instructorName: 'Leo Messi'
    },
    {
        imgUrl: null,
        id: '2',
        courseName: 'Billiards',
        instructorName: 'Fedor Gorst'
    },
    {
        imgUrl: null,
        id: '3',
        courseName: 'Snooker',
        instructorName: `Ronnie O' Sullivan`
    },
    {
        imgUrl: null,
        id: '4',
        courseName: '3pts Shooting',
        instructorName: 'Steph Curry'
    },
    {
        imgUrl: null,
        id: '5',
        courseName: 'Fathering',
        instructorName: 'Nikola Jokic'
    },
    {
        imgUrl: null,
        id: '6',
        courseName: 'Formula One',
        instructorName: 'Max Verstappen'
    },
    {
        imgUrl: null,
        id: '7',
        courseName: 'Golf',
        instructorName: 'Gareth Bale'
    },
    {
        imgUrl: null,
        id: '8',
        courseName: 'Swimming',
        instructorName: 'Michael Phelps'
    },
];

const index = () => {
    const [ courses, setCourses ] = useState<CourseItemProps[]>(coursesDummyData);

    useEffect(() => {
        getMyCourses().then((res) => {
            const mappedCourses: CourseItemProps[] = res.data.map((course: any) => ({
                id: course.id,
                imgUrl: course.thumbnail,
                courseName: course.title,
                instructorName: course.instructor,
            }));

            setCourses(mappedCourses);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <CourseList courses={courses}/>
    )
}

export default index