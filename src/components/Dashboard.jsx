import { useEffect, useState } from 'react';
import api from '../middleware/api';
import { useAuth } from '../store/authContext';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const { logout } = useAuth();

  useEffect(() => {
    api
      .get("/dashboard/metrics") // Customize based on your backend
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500 text-sm">Total Receivables</p>
          <p className="text-xl font-semibold">₹{metrics.receivables ?? 0}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500 text-sm">Total Payables</p>
          <p className="text-xl font-semibold">₹{metrics.payables ?? 0}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500 text-sm">Overdue</p>
          <p className="text-xl font-semibold text-red-600">
            ₹{metrics.overdue ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
