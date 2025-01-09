import { Link } from 'react-router-dom';
import { LayoutDashboard, User, Code, BookOpen } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Code, label: 'Coding Stats', path: '/coding' },
    { icon: BookOpen, label: 'Academic', path: '/academic' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Student Dashboard</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
