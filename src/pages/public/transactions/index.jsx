import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getTransactions } from "../../../_services/transaction";
import { useDecodeToken } from "../../../_services/auth";

export default function CustomerTransactions() {
	const navigate = useNavigate();
	const token = localStorage.getItem("accessToken");
	const decodedData = useDecodeToken(token);
	const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!token || !decodedData || !decodedData.success) {
			navigate("/login");
			return;
		}

		if ((currentUser?.role || "").toLowerCase() !== "customer") {
			navigate("/");
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			try {
				const [transactionsData] = await Promise.all([getTransactions()]);
				// filter only transactions that belong to current user if API returns all
				const list = Array.isArray(transactionsData)
					? transactionsData.filter(
							(t) =>
								String(t.user?.id) === String(currentUser?.id) ||
								String(t.user_id) === String(currentUser?.id)
					  )
					: [];
				setTransactions(list);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="bg-gray-50 dark:bg-gray-900 p-6 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
					Riwayat Pesanan Saya
				</h2>

				<div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th className="px-4 py-3">Order</th>
									<th className="px-4 py-3">Buku</th>
									<th className="px-4 py-3">Harga</th>
									<th className="px-4 py-3">Jumlah</th>
									<th className="px-4 py-3">Total Harga</th>
									<th className="px-4 py-3">Tanggal</th>
								</tr>
							</thead>
							<tbody>
								{transactions.length > 0 ? (
									transactions.map((tx) => {
										const bookPrice = tx.book.price || 0;
										const totalAmount = tx.total_amount || 0;
										// hitung qty
										const quantity =
											bookPrice > 0
												? Math.max(1, Math.round(totalAmount / bookPrice))
												: 1;

										const fmt = (v) =>
											typeof v === "number"
												? `Rp${v.toLocaleString("id-ID")}`
												: v;

										return (
											<tr key={tx.id} className="border-b dark:border-gray-700">
												<td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
													{tx.order_number || tx.id}
												</td>
												<td className="px-4 py-3">{tx.book?.title || "-"}</td>
												<td className="px-4 py-3">{bookPrice || 0}</td>
												<td className="px-4 py-3">{quantity}</td>
												<td className="px-4 py-3">{totalAmount || 0}</td>
												<td className="px-4 py-3">
													{new Date(tx.created_at).toLocaleDateString("id-ID", {
														day: "numeric",
														month: "long",
														year: "numeric",
													})}
												</td>
											</tr>
										);
									})
								) : loading ? (
									<tr>
										<td colSpan="7" className="px-4 py-8">
											<div className="flex items-center justify-center">
												<Loader2 className="animate-spin h-6 w-6" />
											</div>
										</td>
									</tr>
								) : (
									<tr>
										<td
											colSpan="5"
											className="px-4 py-8 text-center text-gray-600 dark:text-gray-300">
											Belum ada transaksi.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}
