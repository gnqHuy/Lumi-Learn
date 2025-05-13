import { S3_URL_PREFIX } from "@/const/AmazonS3"

export const getCourseThumbnail = (courseId: string) => {
    return `${S3_URL_PREFIX}/course/${courseId}?v=${Date.now().toString()}`;
} 