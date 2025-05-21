import { BookOpen, Code, LayoutDashboard, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Code, label: "Coding Stats", path: "/coding" },
    { icon: BookOpen, label: "Resources", path: "/resources" },
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
