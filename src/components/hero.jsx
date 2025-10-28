import { Link } from "react-router-dom";

export default function HeroBooksales() {
	return (
		<section className="bg-gray-900">
			<div className="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
				{/* Announcement pill */}
				<a
					href="#"
					className="inline-flex justify-center items-center gap-3 py-1 px-3 mb-7 text-sm text-gray-200 bg-indigo-700 bg-opacity-20 rounded-full hover:bg-opacity-30"
					role="status"
					aria-label="Pengumuman Booksales">
					<span className="text-xs bg-indigo-600 rounded-full text-white px-3 py-1">
						New
					</span>
					<span className="text-sm font-medium text-gray-200">
						Koleksi musim ini sudah hadir — cek rekomendasi terbaik kami
					</span>
					<svg
						className="ml-2 w-4 h-4 text-gray-200"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</a>

				{/* Title & description */}
				<h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-tight text-white md:text-5xl lg:text-6xl">
					Booksales — Buku Terbaik untuk Semua
				</h1>
				<p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-6 xl:px-48">
					Temukan koleksi buku rekomendasi, bestseller, dan promo menarik. Baca
					ulasan, bandingkan harga, dan pesan langsung dari toko kami.
				</p>

				{/* CTA */}
				<div className="flex justify-center gap-4 mb-8">
					<Link
						to="/books"
						className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow focus:ring-4 focus:ring-indigo-300">
						Beli Sekarang
					</Link>

					<Link
						to="/books"
						className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-indigo-600 bg-gray-200 hover:bg-gray-400 hover:text-white rounded-lg border border-transparent">
						Lihat Koleksi
					</Link>
				</div>
			</div>
		</section>
	);
}
