import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = ({ user, onLogout }) => {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <ShowChartIcon className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-white">Diabetes Tracker</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
          {user?.picture ? (
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-blue-600" />
            </div>
          )}
          <div className="hidden sm:block text-left">
            <span className="font-semibold text-white block text-sm">
              {user?.name || "User"}
            </span>
            {user?.email && (
              <span className="text-xs text-blue-100">
                {user.email}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:shadow-lg transform hover:scale-105"
        >
          <LogoutIcon className="w-4 h-4" />
          <span className="font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;