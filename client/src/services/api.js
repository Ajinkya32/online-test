import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export const fetchQuestions = () => API.get("/questions");

export const submitResponses = (payload) => API.post("/responses", payload);

export const fetchScores = () => API.get("/admin/scores");

export const checkSubmission = (userId) => API.get(`/responses/${userId}`);
