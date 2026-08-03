import { Link } from "@tanstack/react-router";
import { User, ShoppingBag, CreditCard, MapPin, Settings, LogOut } from "lucide-react";

export default function LeftMenu() {
  const menuItems = [
    { title: "My Profile", path: "/myprofile", icon: User },
    { title: "Orders", path: "/order", icon: ShoppingBag },
    { title: "Payments", path: "/paymenthistory", icon: CreditCard },
    { title: "Addresses", path: "/address", icon: MapPin },
    { title: "Settings", path: "/setting", icon: Settings },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-xs">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Menu Categories
        </h1>
        <p className="text-sm font-medium text-gray-400 mt-1">
          Quick Jump
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Navigation List */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group relative"
              activeProps={{
                className:
                  "flex items-center px-4 py-3.5 rounded-l-xl rounded-r-sm font-semibold ",
              }}
            >
              <Icon className="w-5 h-5 mr-3.5 shrink-0 group-hover:scale-105 transition-transform" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <hr className="border-gray-100 my-6" />

      {/* Logout */}
      <div>
        <Link
          to="/logout"
          className="flex items-center px-4 py-3.5 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 mr-3.5 shrink-0 group-hover:scale-105 transition-transform text-red-500" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}