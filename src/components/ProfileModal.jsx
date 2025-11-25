const ProfileModal = ({ open, onClose, user }) => {
    if (!open) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Profile</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
  
          <div className="flex items-center gap-4 mb-6">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user?.name || "User"}
                className="w-20 h-20 rounded-full border-4 border-indigo-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl">
                👤
              </div>
            )}
            <div>
              <div className="text-xl font-semibold text-gray-900">{user?.name || "User"}</div>
              <div className="text-sm text-gray-500">{user?.email || "—"}</div>
            </div>
          </div>
  
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="text-xs uppercase tracking-wide text-gray-500">Google ID</div>
              <div className="text-gray-800 break-all">{user?.google_id || "—"}</div>
            </div>
            {/* Add more fields here if you store them: created_at, updated_at, etc. */}
          </div>
  
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ProfileModal;
  