import { LessonOverview } from "./lesson";

export type CourseOverview = {
    id: string;
    instructor: string;
    title: string;
    description: string | null;
    thumbnail: string | null;
    topic: string;
    rating: number;
    numberOfRatings: number;
    lessons: LessonOverview[];
};

export type CreateCourseRequest = {
    title: string;
    description: string;
    thumbnail: File | null;
    topic: string;
}

export type CourseDto = {
    id: string;
    instructor: string;
    title: string;
    description: string;
    thumbnail: string;
    topic: string;
    rating: number;
    numberOfRatings: number;
    timestamp: Date;
    isUserEnrolled: boolean;
}

export type UpdateCourseRequest = {
    id: string;
    updateCourseRequest: FormData;
}
