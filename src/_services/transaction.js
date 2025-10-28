import { API } from "../_api";

export const getTransactions = async () => {
	const token = localStorage.getItem("accessToken");
	const { data } = await API.get("/transactions", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data.data;
};
export const createTransaction = async (data) => {
	const token = localStorage.getItem("accessToken");
	try {
		const response = await API.post("/transactions", data, {
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

export const showTransaction = async (id) => {
	try {
		const { data } = await API.get(`/transactions/${id}`);
		return data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
