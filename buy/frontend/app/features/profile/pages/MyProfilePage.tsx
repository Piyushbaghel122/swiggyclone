/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import LeftMenu from "./leftMenu";
import useProfile from "../hook/useProfile";
import { Edit2, TrendingUp, CheckCircle2, Lock, User, Mail, Phone } from "lucide-react";
import  EditProfilePage  from "./EditProfilePage";
import EditImage from "../components/EditImage";
import EditValue from "../components/EditValue";

export default function MyProfilePage() {
  const { user: profileRes, loading } = useProfile();
  
  // Extract user profile object returned from API / context
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps
  const userData = (profileRes as any)?.user || profileRes || {};

  const [customName, setCustomName] = useState<string | undefined>(undefined);
  const [customAddress, setCustomAddress] = useState<string | undefined>(undefined);
  const fullName = customName || userData.name || userData.username || "Alex Thompson";
  const defaultPhone = userData.mobile || "+91 98765 43210";
  const defaultEmail = userData.email || "alex.thompson@example.com";
  const defaultCredits = userData.credits !== undefined ? userData.credits : 1240;

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    username: fullName,
    email: defaultEmail,
    mobile: defaultPhone,
    password: "••••••••",
  });

  // Automatically fill profile details when loaded from backend
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        username: userData.name || userData.username || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        password: "••••••••",
      });
    }
  }, [userData.name, userData.username, userData.email, userData.mobile, userData]);

  const handleEditClick = () => {
    if (!isEditing) {
      setFormData({
        username: fullName,
        email: defaultEmail,
        mobile: defaultPhone,
        password: "••••••••",
      });
    }
    setIsEditing(!isEditing);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMemberSince = (dateStr?: string) => {
    if (!dateStr) return "Member since Jan 2024";
    try {
      const date = new Date(dateStr);
      return `Member since ${date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
    } catch {
      return "Member since Jan 2024";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8 items-start bg-slate-50/50 min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-auto shrink-0">
        <LeftMenu />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 w-full space-y-6">
        {/* Top Row: Profile Banner & Active Credits */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Profile Banner Card */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 min-h-[160px]">
            <div className="flex flex-col sm:flex-row items-center gap-5 flex-1">
              <div className="relative shrink-0">
                <img
                  src={customAvatar || userData.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={fullName || "User Avatar"}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-100 p-0.5 shadow-sm"
                />
                <button onClick={() => setIsEditingImage(true)} className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {fullName}
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  {defaultEmail}
                </p>
              </div>
            </div>

            <div className="shrink-0 mt-4 sm:mt-0 self-center sm:self-end">
              <button 
                onClick={() => setIsEditingValue(true)} 
                className="cursor-pointer inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-orange-600 hover:text-orange-700 font-semibold text-xs transition-all"
              >
                <Edit2 className="w-3.5 h-3.5 shrink-0" /> Edit Profile 
              </button>
            </div>
          </div>

          {/* Active Credits Card */}
          <div className="xl:col-span-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between min-h-[160px]">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase opacity-90">
                Active Credits
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
                ₹{defaultCredits.toLocaleString()}.00
              </p>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium opacity-95 pt-4 border-t border-orange-400/30 mt-4">
              <span>24 Orders this month</span>
              <TrendingUp className="w-5 h-5 shrink-0" />
            </div>
          </div>
        </div>

        {/* Bottom Row: Personal Information Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Personal Information
            </h3>
            <button
              onClick={handleEditClick}
              className="text-orange-600 hover:text-orange-700 font-semibold text-sm cursor-pointer hover:underline transition-all"
            >
              {isEditing ? "Close" : "Edit Info"}
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-400 font-medium">
              Loading profile details...
            </div>
          ) : isEditing ? (
            <EditProfilePage onClose={() => setIsEditing(false)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Username / Full Name */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" /> Username / Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? formData.username : fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 font-medium text-gray-800 disabled:text-gray-700 disabled:bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" /> Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={isEditing ? formData.email : defaultEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 font-medium text-gray-800 disabled:text-gray-700 disabled:bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> Mobile Number
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={isEditing ? formData.mobile : defaultPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 font-medium text-gray-800 disabled:text-gray-700 disabled:bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all pr-12"
                  />
                  <CheckCircle2 className="w-5 h-5 text-orange-600 absolute right-4 pointer-events-none shrink-0" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gray-400" /> Password
                </label>
                <input
                  type="password"
                  disabled={!isEditing}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 font-medium text-gray-800 disabled:text-gray-700 disabled:bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Image Edit Popup Modal */}
      {isEditingImage && (
        <EditImage
          currentImage={customAvatar || userData.profileImage}
          onClose={() => setIsEditingImage(false)}
          onSave={(newImageUrl) => {
            setCustomAvatar(newImageUrl);
            setIsEditingImage(false);
          }}
        />
      )}

      {/* Profile Values Edit Popup Modal */}
      {isEditingValue && (
        <EditValue
          onClose={() => setIsEditingValue(false)}
          onSave={(data) => {
            if (data.profileImage) {
              setCustomAvatar(data.profileImage);
            }
            if (data.username) {
              setCustomName(data.username);
            }
            if (data.address) {
              setCustomAddress(data.address);
            }
            setIsEditingValue(false);
          }}
          initialData={{
            username: fullName,
            profileImage: customAvatar || userData.profileImage,
            address: customAddress || "123 Swiggy Street, Bangalore"
          }}
        />
      )}
    </div>
  );
}


