import { CreateQuizRequest } from "@/types/quizz";
import api from "./api";

const URL_PREFIX = 'api/Quizzes';

export function GetQuizDetail(id: string) {
    return api.get(`${URL_PREFIX}/${id}`);
}

export function createQuizWithContent(request: CreateQuizRequest) {
    return api.post(`${URL_PREFIX}/WithContent`, request);
}