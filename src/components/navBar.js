// src/components/navBar.jsx
import PersonIcon from "@mui/icons-material/Person";

const NavBar = ({ user, onLogout, onOpenProfile }) => {

  console.log("NavBar user:", user);
  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {/* <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <ShowChartIcon className="w-6 h-6 text-blue-600" />
        </div> */}
        <h1 className="text-2xl font-bold text-white">Diabetes Tracker</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Make the user chip clickable to open profile */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex items-center w-10 h-10  backdrop-blur-sm hover:bg-opacity-30"
          aria-label="Open profile"
        >
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user?.name || "User"}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-blue-600" />
            </div>
          )}
        
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:shadow-lg transform hover:scale-105"
        >
          {/* <LogoutIcon className="w-4 h-4" /> */}
          <span className="font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
