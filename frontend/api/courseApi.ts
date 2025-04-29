import api from "./api";

const URL_PREFIX = 'api/Courses'

export function getMyCourses() {
    return api.get(`${URL_PREFIX}/mine`);
}

export function getCourseOverview(courseId: string) {
    return api.get(`${URL_PREFIX}/overview/${courseId}`);
}