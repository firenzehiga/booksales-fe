import { API } from "../_api";

export const getUserProfile = async () => {
	// Accept an optional AbortSignal to allow callers to cancel the request
	const token = localStorage.getItem("accessToken");
	const { data } = await API.get("/profil-saya", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data.data;
};

export const getUsers = async () => {
	const token = localStorage.getItem("accessToken");
	const { data } = await API.get("/users", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data.data;
};

export const deleteUser = async (id) => {
	const token = localStorage.getItem("accessToken");
	try {
		await API.delete(`/users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};
