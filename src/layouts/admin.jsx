import { Link, Outlet, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { logout, useDecodeToken } from "../_services/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminLayout() {
	const navigate = useNavigate();
	const token = localStorage.getItem("accessToken");
	const decodedData = useDecodeToken(token);
	const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
	const [openDropdownId, setOpenDropdownId] = useState(null);

	useEffect(() => {
		if (!token || !decodedData || !decodedData.success) {
			navigate("/login");
			return;
		}
		const role = currentUser?.role;
		if (!role || String(role).toLowerCase() !== "admin") {
			navigate("/");
		}
	}, [token, decodedData, navigate]);

	const toggleDropdown = (id) =>
		setOpenDropdownId((prev) => (prev === id ? null : id));

	// tutup dropdown saat klik di luar dropdown
	useEffect(() => {
		const handleDocClick = (e) => {
			// kalau klik diluar usermenu dropdown
			if (!e.target.closest("[data-dropdown-wrapper]")) {
				setOpenDropdownId(null);
			}
		};
		document.addEventListener("mousedown", handleDocClick);
		return () => {
			document.removeEventListener("mousedown", handleDocClick);
		};
	}, []);

	const handleLogout = async () => {
		if (token) {
			try {
				await logout({ token });
			} catch (err) {
				console.error(err);
			}
		}
		localStorage.removeItem("accessToken");
		localStorage.removeItem("userInfo");
		toast.success("Logout berhasil!");
		navigate("/");
	};

	return (
		<>
			<div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
				<nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
					<div className="flex flex-wrap justify-between items-center">
						<div className="flex justify-start items-center">
							<button
								data-drawer-target="drawer-navigation"
								data-drawer-toggle="drawer-navigation"
								aria-controls="drawer-navigation"
								className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								<svg
									aria-hidden="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
										clipRule="evenodd"></path>
								</svg>
								<svg
									aria-hidden="true"
									className="hidden w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"></path>
								</svg>
								<span className="sr-only">Toggle sidebar</span>
							</button>
							<a
								href="https://flowbite.com"
								className="flex items-center justify-between mr-4">
								<BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
								<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
									booksales
								</span>
							</a>
						</div>
						<div className="flex items-center lg:order-2">
							<button
								type="button"
								data-drawer-toggle="drawer-navigation"
								aria-controls="drawer-navigation"
								className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
								<span className="sr-only">Toggle search</span>
								<svg
									aria-hidden="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
								</svg>
							</button>

							<div className="relative" data-dropdown-wrapper="userMenu">
								<button
									type="button"
									className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
									id="user-menu-button"
									aria-expanded={openDropdownId === "userMenu"}
									onClick={() => toggleDropdown("userMenu")}>
									<span className="sr-only">Open user menu</span>

									<img
										className="w-8 h-8 rounded-full"
										src="/logo.jpg"
										alt="user photo"
									/>
								</button>

								{/* Dropdown menu (controlled) */}
								<div
									className={`${
										openDropdownId === "userMenu" ? "block" : "hidden"
									} z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl absolute right-0`}
									id="dropdown">
									<div className="py-3 px-4">
										<span className="block text-sm font-semibold text-gray-900 dark:text-white">
											{currentUser?.name || "User"}
										</span>
										<span className="block text-sm text-gray-900 truncate dark:text-white">
											{currentUser?.email || "-"}
										</span>
									</div>
									<ul
										className="py-1 text-gray-700 dark:text-gray-300"
										aria-labelledby="dropdown">
										<li>
											<Link
												to="/admin/profile"
												className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Profile
											</Link>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Logout
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</nav>

				{/* <!-- Sidebar --> */}

				<aside
					className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
					aria-label="Sidenav"
					id="drawer-navigation">
					<div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
						<ul className="space-y-2">
							<li>
								<Link
									to="/admin/users"
									className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
									<svg
										aria-hidden="true"
										className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
										<path
											fillRule="evenodd"
											d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
											clipRule="evenodd"></path>
									</svg>
									<span className="ml-3">Users</span>
								</Link>
							</li>
							<li>
								<Link
									to="/admin/authors"
									className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
									<svg
										aria-hidden="true"
										className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
										<path
											fillRule="evenodd"
											d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
											clipRule="evenodd"></path>
									</svg>
									<span className="ml-3">Authors</span>
								</Link>
							</li>
							<li>
								<Link
									to="/admin/genres"
									className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
									<svg
										aria-hidden="true"
										className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
										<path
											fillRule="evenodd"
											d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
											clipRule="evenodd"></path>
									</svg>
									<span className="ml-3">Genres</span>
								</Link>
							</li>
						</ul>

						<ul className="pt-5 mt-5 space-y-2 borderT border-gray-200 dark:border-gray-700">
							<li>
								<Link
									to="/admin/books"
									className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
									<svg
										aria-hidden="true"
										className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
										<path
											fillRule="evenodd"
											d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
											clipRule="evenodd"></path>
									</svg>
									<span className="ml-3">Books</span>
								</Link>
							</li>
							<li>
								<Link
									to="/admin/transactions"
									className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
									<svg
										aria-hidden="true"
										className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
											clipRule="evenodd"></path>
									</svg>
									<span className="ml-3">Transaction</span>
								</Link>
							</li>
						</ul>
					</div>
				</aside>

				<main className="p-4 md:ml-64 pt-20 flex-1">
					<div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 min-h-[60vh] px-4 pt-4 pb-6">
						<Outlet />
					</div>
				</main>
			</div>
		</>
	);
}
