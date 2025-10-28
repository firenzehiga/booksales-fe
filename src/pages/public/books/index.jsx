import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { User2, ChartBarStacked, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { booksImageStorage } from "../../../_api";

export default function Books() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [booksData] = await Promise.all([getBooks()]);
				setBooks(booksData);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
				<div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
					<div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
						{books.length > 0 ? (
							books.map((book) => (
								<div
									key={book.id}
									className="rounded-lg border border-gray-200 bg-white p-9 shadow-sm dark:border-gray-700 dark:bg-gray-800">
									<div className="h-56 w-full">
										<Link to={`/books/show/${book.id}`}>
											<img
												className="mx-auto h-full"
												src={`${booksImageStorage}/books/${book.cover_photo}`}
												alt={book.title}
											/>
										</Link>
									</div>
									<div className="pt-6">
										<Link
											to={`/books/show/${book.id}`}
											className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
											{book.title}
										</Link>

										<ul className="mt-2 flex items-center gap-4">
											<li className="flex items-center gap-2">
												<ChartBarStacked className="h-4 w-4 text-gray-500 dark:text-gray-400" />
												<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
													{book.genre.name}
												</p>
											</li>

											<li className="flex items-center gap-2">
												<User2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
												<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
													{book.author?.name}
												</p>
											</li>
										</ul>

										<div className="mt-4 flex items-center justify-between gap-4">
											<p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
												Rp{book.price.toLocaleString("id-ID")}
											</p>
											<Link
												to={`/books/show/${book.id}`}
												type="button"
												className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
												View Details
												<ArrowUpRight className="ml-3 nline-block h-6 w-6 text-gray-500 dark:text-white" />
											</Link>
										</div>
									</div>
								</div>
							))
						) : loading ? (
							Array.from({ length: 8 }).map((_, i) => (
								<div
									key={i}
									className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse">
									<div className="h-56 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
									<div className="pt-6">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
										<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
										<div className="mt-4 flex items-center justify-between gap-4">
											<div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
											<div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
										</div>
									</div>
								</div>
							))
						) : (
							<p>No books available.</p>
						)}
					</div>
					<div className="w-full text-center">
						<button
							type="button"
							className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
							Show more
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
