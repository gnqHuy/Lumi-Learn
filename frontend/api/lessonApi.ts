import { CreateLessonRequest } from "@/types/lesson"
import api from "./api"

const URL_PREFIX = 'api/Lessons'

export function createLesson(request: any) {
    return api.post(`${URL_PREFIX}`, request);
}