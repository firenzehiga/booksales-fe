import { API } from "../_api";

export const getBooks = async () => {
	const { data } = await API.get("/books");
	return data.data;
};

export const createBook = async (data) => {
	const token = localStorage.getItem("accessToken");
	try {
		const response = await API.post("/books", data, {
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

export const showBook = async (id) => {
	try {
		const { data } = await API.get(`/books/${id}`);
		return data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateBook = async (id, data) => {
	const token = localStorage.getItem("accessToken");
	try {
		const response = await API.post(`/books/${id}`, data, {
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

export const deleteBook = async (id) => {
	const token = localStorage.getItem("accessToken");
	try {
		await API.delete(`/books/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};
