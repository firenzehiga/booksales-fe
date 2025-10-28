import { API } from "../_api";

export const getAuthors = async () => {
	const { data } = await API.get("/authors");
	return data.data;
};

export const createAuthor = async (data) => {
	const token = localStorage.getItem("accessToken");
	try {
		const response = await API.post("/authors", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const showAuthor = async (id) => {
	try {
		const { data } = await API.get(`/authors/${id}`);
		return data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateAuthor = async (id, data) => {
	const token = localStorage.getItem("accessToken");
	try {
		const response = await API.post(`/authors/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteAuthor = async (id) => {
	const token = localStorage.getItem("accessToken");
	try {
		await API.delete(`/authors/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};
