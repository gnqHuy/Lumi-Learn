import api from "./api";

const URL_PREFIX = 'api/Topics';

export function GetAllTopics() {
    return api.get(`${URL_PREFIX}/`);
}

export function CreateTopic(name: string) {
    return api.post(`${URL_PREFIX}?name=${name}`);
}