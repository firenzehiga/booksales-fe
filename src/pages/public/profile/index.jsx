import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../_services/users";
import { useDecodeToken } from "../../../_services/auth";

export default function Profile() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const token = localStorage.getItem("accessToken");
	const decodedData = useDecodeToken(token);
	const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

	useEffect(() => {
		if (!token || !decodedData || !decodedData.success) {
			navigate("/login");
			return;
		}

		const fetchProfile = async () => {
			setLoading(true);
			try {
				const data = await getUserProfile();
				setProfile(data || null);
			} catch (err) {
				console.error(err);
				const msg =
					err?.response?.data?.message || err?.message || "Gagal memuat profil";
				setError(msg);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	if (loading) {
		return (
			<div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
				<div className="max-w-3xl mx-auto">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
						<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
						<div className="space-y-4">
							<div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
							<div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
							<div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
							<div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
							<div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6">
				<div className="max-w-3xl mx-auto text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
							Profil Saya
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Informasi akun pelanggan
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4">
					<div className="flex flex-col">
						<span className="text-xs text-gray-500">Nama</span>
						<span className="text-lg font-medium text-gray-900 dark:text-gray-100">
							{profile?.name || profile?.full_name || "-"}
						</span>
					</div>

					<div className="flex flex-col">
						<span className="text-xs text-gray-500">Email</span>
						<span className="text-lg font-medium text-gray-900 dark:text-gray-100">
							{profile?.email || "-"}
						</span>
					</div>

					<div className="flex flex-col">
						<span className="text-xs text-gray-500">Peran</span>
						<span className="text-lg font-medium text-gray-900 dark:text-gray-100">
							{profile?.role || "customer"}
						</span>
					</div>

					{profile?.phone && (
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Telepon</span>
							<span className="text-lg font-medium text-gray-900 dark:text-gray-100">
								{profile.phone}
							</span>
						</div>
					)}

					{profile?.address && (
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Alamat</span>
							<span className="text-lg font-medium text-gray-900 dark:text-gray-100">
								{profile.address}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
