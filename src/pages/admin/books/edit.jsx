import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/author";
import { showBook, updateBook } from "../../../_services/books";

export default function BookEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [genres, setGenres] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		price: 0,
		stock: 0,
		genre_id: 0,
		author_id: 0,
		cover_photo: null,
		description: "",
		_method: "PUT",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Fetch genres and authors
				const [genresData, authorsData, bookData] = await Promise.all([
					getGenres(),
					getAuthors(),
					showBook(id),
				]);
				setGenres(genresData);
				setAuthors(authorsData);
				setFormData({
					title: bookData.title,
					price: bookData.price,
					stock: bookData.stock,
					genre_id: bookData.genre_id,
					author_id: bookData.author_id,
					cover_photo: bookData.cover_photo,
					description: bookData.description,
					_method: "PUT",
				});
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "cover_photo") {
			setFormData({ ...formData, cover_photo: files[0] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		try {
			const payload = new FormData();

			for (const key in formData) {
				if (key === "cover_photo") {
					if (formData.cover_photo instanceof File) {
						payload.append("cover_photo", formData.cover_photo);
					}
				} else {
					payload.append(key, formData[key]);
				}
			}

			await updateBook(id, payload);
			navigate("/admin/books");
		} catch (error) {
			console.log(error);
			alert(error.response?.data?.message || "Failed to update book.");
		} finally {
			setLoading(false);
		}
	};
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<div role="status" className="text-center">
					<svg
						aria-hidden="true"
						className="w-10 h-10 mr-2 text-gray-200 animate-spin fill-indigo-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08163 50.5908C9.08163 73.1895 27.4013 91.5092 50 91.5092C72.5987 91.5092 90.9184 73.1895 90.9184 50.5908C90.9184 27.9921 72.5987 9.67236 50 9.67236C27.4013 9.67236 9.08163 27.9921 9.08163 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5535C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7235 75.2124 7.41289C69.5422 4.10232 63.2754 1.94025 56.7698 1.05197C51.7666 0.367028 46.6976 0.446843 41.7345 1.27639C39.2744 1.67345 37.8139 4.19778 38.4509 6.62326C39.0879 9.04874 41.5654 10.4717 44.0205 10.1071C47.8516 9.55225 51.7191 9.52615 55.5403 10.032C60.8644 10.7433 65.9928 12.6781 70.6331 15.7096C75.2734 18.7411 79.3415 22.8133 82.6649 27.6514C85.8284 32.3111 88.3613 37.5817 90.1816 43.2307C90.912 45.6029 93.5422 46.6781 95.9676 46.0409Z"
							fill="currentFill"
						/>
					</svg>
				</div>
			</div>
		);
	}

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
					<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
						Edit Book
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
							<div className="sm:col-span-2">
								<label
									for="title"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Book Title
								</label>
								<input
									type="text"
									name="title"
									id="title"
									value={formData.title}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="Book title"
									required
								/>
							</div>
							<div className="w-full">
								<label
									for="price"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Price
								</label>
								<input
									type="number"
									name="price"
									id="price"
									value={formData.price}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="e.g. 150000"
									required
								/>
							</div>
							<div className="w-full">
								<label
									for="stock"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Stock
								</label>
								<input
									type="number"
									name="stock"
									id="stock"
									value={formData.stock}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="e.g. 50"
									required
								/>
							</div>
							<div>
								<label
									for="genre_id"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Genre
								</label>
								<select
									id="genre_id"
									name="genre_id"
									value={formData.genre_id}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
									<option value="">--Select Genre--</option>
									{genres.map((genre) => (
										<option key={genre.id} value={genre.id}>
											{genre.name}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									for="author_id"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Author
								</label>
								<select
									id="author_id"
									name="author_id"
									value={formData.author_id}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
									<option value="">--Select author--</option>
									{authors.map((author) => (
										<option key={author.id} value={author.id}>
											{author.name}
										</option>
									))}
								</select>
							</div>

							<div className="w-full">
								<label
									for="cover_photo"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Cover Photo
								</label>
								<input
									type="file"
									name="cover_photo"
									id="cover_photo"
									onChange={handleChange}
									accept="image/*"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
								/>
							</div>

							<div className="sm:col-span-2">
								<label
									for="description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Description
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleChange}
									rows="6"
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="Write a description of the book..."></textarea>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<button
								type="submit"
								disabled={loading}
								className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-60">
								{loading ? "Editing..." : "Save Data"}
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
