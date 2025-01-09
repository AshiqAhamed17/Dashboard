import { Bell, Settings } from 'lucide-react';

export default function Navbar() {
  return (
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
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">JD</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
