import api from "./api";

const URL_PREFIX = 'api/Topics';

export function GetAllTopics() {
    return api.get(`${URL_PREFIX}/`);
}