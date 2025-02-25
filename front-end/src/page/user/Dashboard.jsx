import { FileText, UserCircle, PenSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-slate-900 mb-2">
            Welcome to the User Dashboard!
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Where you manage content, create new articles, and get organized
            your profile. Start exploring the available features through the
            menu in the sidebar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link to={`/user/my-article`} className="group bg-slate-50 p-6 rounded-t-xl rounded-bl-2xl  border border-slate-400/[0.5] hover:bg-slate-900 transition-all duration-500 ease-in-out hover:-translate-y-5 hover:shadow-xl cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors">
                My Article
              </h3>
            </div>
            <p className="text-slate-600 group-hover:text-slate-200 transition-colors">
              Manage all the articles you have created
            </p>
          </Link>

          <Link to={`/user/profile`} className="group bg-slate-50 p-6 rounded-t-xl rounded-bl-2xl  border border-slate-400/[0.5] hover:bg-slate-900 transition-all duration-500 ease-in-out hover:-translate-y-5 hover:shadow-xl cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <UserCircle className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors">
                Profile
              </h3>
            </div>
            <p className="text-slate-600 group-hover:text-slate-100 transition-colors">
              Update your profile information
            </p>
          </Link>

          <Link to={`/user/create`} className="group bg-slate-50 p-6 rounded-t-xl rounded-bl-2xl  border border-slate-400/[0.5] hover:bg-slate-900 transition-all duration-500 ease-in-out hover:-translate-y-5 hover:shadow-xl cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <PenSquare className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors">
                Create Article
              </h3>
            </div>
            <p className="text-slate-600 group-hover:text-slate-100 transition-colors">
            Start writing a new article
            </p>
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-500 ease-in-out hover:-translate-y-5 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
