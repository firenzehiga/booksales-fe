import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_services/genres";
import toast from "react-hot-toast";

export default function GenreCreate() {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			alert("Please enter a genre name");
			return;
		}

		setLoading(true);
		try {
			await createGenre(formData);
			navigate("/admin/genres");
			toast.success("Genre created successfully!");
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Failed to create genre");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
					<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
						Create New Genre
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 mb-4 sm:grid-cols-1 sm:gap-6 sm:mb-5">
							<div className="sm:col-span-1">
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Genre Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={formData.name}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="Genre name"
									required
								/>
							</div>

							<div className="sm:col-span-1">
								<label
									htmlFor="description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Description
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleChange}
									rows="4"
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="Genre description"></textarea>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							<button
								type="submit"
								disabled={loading}
								className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-60">
								{loading ? "Creating..." : "Create Genre"}
							</button>
							<button
								type="reset"
								onClick={() => setFormData({ name: "", description: "" })}
								className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900">
								Reset
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
