import api from "./api";

const URL_PREFIX = 'api/Quizzes';

export function GetQuizDetail(id: string) {
    return api.get(`${URL_PREFIX}/${id}`);
}