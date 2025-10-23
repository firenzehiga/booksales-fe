import axios from "axios";

const url = "http://localhost:8000";

export const API = axios.create({
	baseURL: `${url}/api`,
});

export const booksImageStorage = `${url}/storage`;
