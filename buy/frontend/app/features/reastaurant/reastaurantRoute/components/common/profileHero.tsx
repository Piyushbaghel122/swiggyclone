import React from "react";
import { User } from "lucide-react";

export default function ProfileHero() {
  return (
    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
      <div className="bg-gray-200 p-2 rounded-full">
        <User size={20} className="text-gray-600" />
      </div>
      <span className="font-medium text-gray-700 hidden sm:inline">Profile</span>
    </div>
  );
}
