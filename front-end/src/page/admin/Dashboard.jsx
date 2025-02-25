import { PiArticle } from "react-icons/pi";
import { FaComments, FaUser, FaHeart } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="py-10 px-44">
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white border border-slate-300 rounded-lg p-5 flex items-center gap-4">
          <PiArticle className="text-3xl text-slate-500" />
          <div>
            <h2 className="text-2xl font-bold">120</h2>
            <p className="text-slate-500 text-sm">Total Articles</p>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-lg p-5 flex items-center gap-4">
          <FaComments className="text-3xl text-slate-500" />
          <div>
            <h2 className="text-2xl font-bold">350</h2>
            <p className="text-slate-500 text-sm">Total Comments</p>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-lg p-5 flex items-center gap-4">
          <FaUser className="text-3xl text-slate-500" />
          <div>
            <h2 className="text-2xl font-bold">85</h2>
            <p className="text-slate-500 text-sm">Total Users</p>
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-white border border-slate-300 rounded-lg p-5 flex items-center gap-4">
          <FaHeart className="text-3xl text-slate-500" />
          <div>
            <h2 className="text-2xl font-bold">480</h2>
            <p className="text-slate-500 text-sm">Total Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
