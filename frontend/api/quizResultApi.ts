import { QuizSubmissionDto } from "@/types/quizResult"
import api from "./api"

const URL_PREFIX = 'api/QuizResults'

export function SubmitQuiz(quizSubmission: QuizSubmissionDto) {
    return api.post(`${URL_PREFIX}`, quizSubmission);
}