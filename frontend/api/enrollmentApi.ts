import api from "./api";

const URL_PREFIX = "api/Enrollments";

export function JoinCourseApi(payload: {
    courseId: string
}) {
    return api.post(`${URL_PREFIX}`, payload);
}