import { Bell, Settings, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          <div className="flex items-center space-x-4">


          <button
              onClick={() => alert('Wallet clicked!')}
              className="p-2 hover:bg-gray-900 rounded-lg flex items-center"
            >
              <Wallet className="h-5 w-5 text-green-400" />
              <span className="text-sm text-white ml-2">Wallet</span>
            </button>


            <button onClick={() => alert('Notifications clicked')} className="p-2 hover:bg-gray-900 rounded-lg">
              <Bell className="h-5 w-5 text-yellow-400" />
            </button>

            <button onClick={toggleSidebar} className="p-2 hover:bg-gray-900 rounded-lg">
              <Settings className="h-5 w-5 text-yellow-400" />
            </button>

            
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">AQ</span>
            </div>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="absolute top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transition-transform duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">Settings</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-red-500"
            >
              Close
            </button>
          </div>
          <div className="p-4 bg-gray-900">
            <button
             className="text-gray-400 hover:text-red-500"
            >Log out</button>
            <p></p>
            <button
             className="text-gray-400 hover:text-red-500"
            >Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}