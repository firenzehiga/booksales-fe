import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getTransactions } from "../../../_services/transaction";
export default function AdminTransactions() {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);

	const [openDropdownId, setOpenDropdownId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [transactionsData] = await Promise.all([getTransactions()]);
				setTransactions(transactionsData);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const toggleDropdown = (id) => {
		setOpenDropdownId(openDropdownId === id ? null : id);
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 flex justify-center">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden w-full max-w-6xl">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2">
							<form className="flex items-center">
								<label htmlFor="simple-search" className="sr-only">
									Search
								</label>
								<div className="relative w-full">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<svg
											aria-hidden="true"
											className="w-5 h-5 text-gray-500 dark:text-gray-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<input
										type="text"
										id="simple-search"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
										placeholder="Search"
										required=""
									/>
								</div>
							</form>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-4 py-3">
										Order Number
									</th>
									<th scope="col" className="px-4 py-3">
										Name
									</th>
									<th scope="col" className="px-4 py-3">
										Email
									</th>
									<th scope="col" className="px-4 py-3">
										Buku yang Dibeli
									</th>
								</tr>
							</thead>
							<tbody>
								{transactions.length > 0 ? (
									transactions.map((transaction) => (
										<tr className="border-b dark:border-gray-700">
											<th
												scope="row"
												className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{transaction.order_number}
											</th>
											<td className="px-4 py-3">{transaction.user.name}</td>
											<td className="px-4 py-3">{transaction.user.email}</td>
											<td className="px-4 py-3">{transaction.book.title}</td>
										</tr>
									))
								) : loading ? (
									<tr>
										<td colSpan="7" className="px-4 py-8">
											<div className="flex items-center justify-center">
												<Loader2 className="animate-spin h-6 w-6" />
											</div>
										</td>
									</tr>
								) : (
									<p>Data buku tidak ditemukan</p>
								)}
							</tbody>
						</table>
					</div>
					<nav
						className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
						aria-label="Table navigation">
						<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
							Showing
							<span className="font-semibold text-gray-900 dark:text-white">
								1-10
							</span>
							of
							<span className="font-semibold text-gray-900 dark:text-white">
								1000
							</span>
						</span>
						<ul className="inline-flex items-stretch -space-x-px">
							<li>
								<a
									href="#"
									className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									<span className="sr-only">Previous</span>
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									1
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									2
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-current="page"
									className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-indigo-600 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
									3
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									...
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									100
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									<span className="sr-only">Next</span>
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</section>
		</>
	);
}
