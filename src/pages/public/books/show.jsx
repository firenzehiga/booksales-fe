import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { showBook } from "../../../_services/books";
import { Link, useNavigate, useParams } from "react-router-dom";
import { booksImageStorage } from "../../../_api";
import { createTransaction } from "../../../_services/transaction";
import toast from "react-hot-toast";

export default function ShowBook() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [books, setBook] = useState({});
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const accessToken = localStorage.getItem("accessToken");
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [bookData] = await Promise.all([showBook(id)]);
				setBook(bookData);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		if (!accessToken) {
			toast.error("Anda harus login terlebih dahulu untuk membeli buku.");
			navigate("/login");
			return;
		}
		try {
			const payload = {
				book_id: books.id,
				quantity: quantity,
			};

			await createTransaction(payload);
			navigate("/books");
			toast.success("Pembelian Buku berhasil!");
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<section className="py-8 bg-white md:py-16 dark:bg-slate-800 antialiased">
				<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
					<div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
						{/* Image skeleton */}
						<div className="shrink-0 max-w-md sm:max-w-lg lg:max-w-3xl mx-auto">
							<div className="mx-auto w-full h-96 sm:h-[32rem] lg:h-[40rem] bg-gray-300 rounded animate-pulse" />
						</div>

						{/* Content skeleton */}
						<div className="mt-6 sm:mt-8 lg:mt-0  space-y-6">
							{/* Title */}
							<div className="h-8 bg-gray-300  rounded w-3/4 animate-pulse" />

							{/* Price and rating */}
							<div className="flex items-center gap-4">
								<div className="h-10 w-1/3 bg-gray-300 rounded animate-pulse" />
								<div className="flex items-center gap-2">
									<div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
									<div className="h-6 w-20 bg-gray-300 rounded animate-pulse" />
								</div>
							</div>

							{/* Add to cart button */}
							<div className="mt-2">
								<div className="h-10 w-40 bg-gray-300 rounded animate-pulse" />
							</div>

							<hr className="my-6 md:my-8 border-gray-300 dark:border-gray-800" />

							{/* Description lines */}
							<div className="space-y-3">
								<div className="h-4 bg-gray-300 rounded animate-pulse" />
								<div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
								<div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<section className="relative py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
				{/* Back button top-right */}
				<Link
					to="/books"
					title={books.title || "Back"}
					className="absolute top-6 right-6 inline-flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span className="hidden sm:inline">Back</span>
				</Link>
				<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
					<div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
						{/* Make container wider and give the image an explicit larger height */}
						<div className="shrink-0 max-w-md sm:max-w-lg lg:max-w-3xl mx-auto">
							<img
								className="mx-auto w-full h-96 sm:h-[32rem] lg:h-[40rem] object-cover rounded"
								src={`${booksImageStorage}/books/${books.cover_photo}`}
								alt=""
							/>
						</div>

						<div className="mt-6 sm:mt-8 lg:mt-0 inlline">
							<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
								{books.title}
							</h1>
							<div className="mt-4 sm:items-center sm:gap-4 sm:flex">
								<p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
									Rp{books.price}
								</p>

								<div className="flex items-center gap-2 mt-2 sm:mt-0">
									<div className="flex items-center gap-1">
										<svg
											className="w-4 h-4 text-yellow-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
										</svg>
										<svg
											className="w-4 h-4 text-yellow-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
										</svg>
										<svg
											className="w-4 h-4 text-yellow-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
										</svg>
										<svg
											className="w-4 h-4 text-yellow-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
										</svg>
										<svg
											className="w-4 h-4 text-yellow-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
										</svg>
									</div>
									<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
										(5.0)
									</p>
									<a
										href="#"
										className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
										345 Reviews
									</a>
								</div>
							</div>

							<div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
								<form
									onSubmit={handleSubmit}
									className="mt-6 sm:mt-8 space-y-4">
									<label
										htmlFor="quantity"
										className="block text-sm font-medium text-gray-700 dark:text-white">
										Jumlah
									</label>
									<input
										type="number"
										id="quantity"
										name="quantity"
										min={1}
										onChange={(e) => setQuantity(e.target.value)}
										className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
										value={quantity}
									/>
									<button
										type="submit"
										title="Beli buku..."
										className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center">
										{submitting ? (
											<>
												<Loader2 className="mr-2 mt-1 animate-spin w-3 h-3" />{" "}
												Sedang memproses...
											</>
										) : (
											"Beli Buku"
										)}
									</button>
								</form>
							</div>

							<hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

							<p className="mb-6 text-gray-500 dark:text-gray-400">
								{books.description}
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
