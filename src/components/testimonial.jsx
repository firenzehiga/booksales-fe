export default function TestimonialBooksales() {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
				<figure className="max-w-screen-md mx-auto">
					{/* decorative quote icon */}
					<svg
						className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
						viewBox="0 0 24 27"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true">
						<path
							d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
							fill="currentColor"
						/>
					</svg>

					{/* testimonial text */}
					<blockquote>
						<p className="text-2xl font-medium text-gray-900 dark:text-white">
							“Booksales memudahkan saya menemukan judul langka dan bestseller,
							layanan pengiriman cepat, dan rekomendasi yang cocok untuk koleksi
							pribadi saya. Sangat direkomendasikan untuk semua pencinta buku.”
						</p>
					</blockquote>

					{/* author */}
					<figcaption className="flex items-center justify-center mt-6 space-x-3">
						{/* gunakan path lokal atau URL gambar yang sesuai */}
						<img
							className="w-10 h-10 rounded-full object-cover"
							src="/logo.jpg"
							alt="Foto Firenze Higa"
							onError={(e) => {
								// fallback jika gambar tidak tersedia
								e.currentTarget.onerror = null;
								e.currentTarget.src =
									"https://ui-avatars.com/api/?name=Firenze+Higa&background=7c3aed&color=fff&rounded=true";
							}}
						/>

						<div className="flex items-center divide-x-2 divide-gray-200 dark:divide-gray-700">
							<div className="pr-3 font-medium text-gray-900 dark:text-white">
								Firenze Higa
							</div>
							<div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
								Pembaca & Kolektor Buku
							</div>
						</div>
					</figcaption>

					{/* optional citation / rating */}
					<div
						className="mt-4 flex items-center justify-center gap-2 text-yellow-400"
						aria-label="Rating 5 dari 5">
						<svg
							className="w-5 h-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z" />
						</svg>
						<svg
							className="w-5 h-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z" />
						</svg>
						<svg
							className="w-5 h-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z" />
						</svg>
						<svg
							className="w-5 h-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z" />
						</svg>
						<svg
							className="w-5 h-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z" />
						</svg>
					</div>
				</figure>
			</div>
		</section>
	);
}
