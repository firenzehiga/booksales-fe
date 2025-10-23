import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import DetailBook from "./pages/public/books/show";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
// Admin Pages
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import BookEdit from "./pages/admin/books/edit";
import GenreEdit from "./pages/admin/genres/edit";
import AuthorEdit from "./pages/admin/authors/edit";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* Public */}
					<Route element={<PublicLayout />}>
						<Route index element={<Home />} />
						<Route path="books">
							<Route index element={<Books />} />
							<Route path="show/:id" element={<DetailBook />} />
						</Route>
					</Route>

					{/* Auth */}
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />

					{/* Admin */}
					<Route path="admin" element={<AdminLayout />}>
						<Route path="dashboard" element={<Dashboard />} />

						<Route path="authors">
							<Route index element={<AdminAuthors />} />
							<Route path="create" element={<AuthorCreate />} />
							<Route path="edit/:id" element={<AuthorEdit />} />
						</Route>
						<Route path="genres">
							<Route index element={<AdminGenres />} />
							<Route path="create" element={<GenreCreate />} />
							<Route path="edit/:id" element={<GenreEdit />} />
						</Route>
						<Route path="books">
							<Route index element={<AdminBooks />} />
							<Route path="create" element={<BookCreate />} />
							<Route path="edit/:id" element={<BookEdit />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
