import { AddFeedbackRequest } from "@/types/feedback";
import api from "./api";

const URL_PREFIX = 'api/Feedbacks';

export function getMyRating (courseId: string) {
    return api.get(`${URL_PREFIX}/MyRating/?courseId=${courseId}`);
}

export function addFeedback(request: AddFeedbackRequest) {
    return api.post(`${URL_PREFIX}`, request);
}