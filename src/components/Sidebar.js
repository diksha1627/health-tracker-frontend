import { useState } from "react";

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'tracker', label: 'Diabetes Track', icon: '📝' },
      { id: 'predict', label: 'Diabetes Predict', icon: '🔮' },
      { id: 'info', label: 'Diabetes Info', icon: '📖' },
    ];
  
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
  
        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
  
        {/* Sidebar */}
        <div
          className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white w-64 flex flex-col shadow-2xl z-40 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Header */}
          <div className="p-6 pt-10 border-b border-blue-500">
           
            
         
          </div>
  
          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-white text-blue-700 shadow-lg font-semibold'
                      : 'text-white hover:bg-blue-600 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
  
          {/* Logout Button */}
          {/* <div className="p-4 border-t border-blue-500">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg hover:shadow-xl"
            >
                <LogoutIcon className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </button>
          </div> */}
        </div>
      </>
    );
  };


  export default Sidebar;
  