import { useEffect, useState } from "react";
import axios from "axios";
import { PiArticle } from "react-icons/pi";
import { FaComments, FaUser, FaHeart } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalComments: 0,
    totalUsers: 0,
    totalLikes: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard");
        setStats(response.data);
      } catch (err) {
        setError("Failed to load data");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="py-10 px-44">
      <div className="grid grid-cols-4 gap-5">
        <StatCard icon={<PiArticle className="text-3xl text-slate-500" />} title="Total Articles" count={stats.totalArticles} />
        <StatCard icon={<FaComments className="text-3xl text-slate-500" />} title="Total Comments" count={stats.totalComments} />
        <StatCard icon={<FaUser className="text-3xl text-slate-500" />} title="Total Users" count={stats.totalUsers} />
        <StatCard icon={<FaHeart className="text-3xl text-slate-500" />} title="Total Likes" count={stats.totalLikes} />
      </div>
    </div>
  );
}

function StatCard({ icon, title, count }) {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-5 flex items-center gap-4">
      {icon}
      <div>
        <h2 className="text-2xl font-bold">{count}</h2>
        <p className="text-slate-500 text-sm">{title}</p>
      </div>
    </div>
  );
}

export default Dashboard;
