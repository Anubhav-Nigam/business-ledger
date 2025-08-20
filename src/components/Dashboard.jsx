import { useEffect, useState } from 'react';
import api from '../middleware/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    api.get('/dashboard/metrics')  // Customize based on your backend
      .then(res => setMetrics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Total Receivables: ₹{metrics.receivables}</div>
        <div className="bg-white p-4 shadow rounded">Total Payables: ₹{metrics.payables}</div>
        <div className="bg-white p-4 shadow rounded">Overdue: ₹{metrics.overdue}</div>
      </div>
    </div>
  );
}
