/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Utensils,
  BookOpen,
  LineChart,
  Settings,
  Search,
  Bell,
  History,
  Info
} from "lucide-react"
import Image from "next/image"; 
import CreateMenu from "../Dashbaord/createmenu";
import { Dashboard } from "./mydashboard";


export default function MyDashBoard() {
  const [activeTab, setActiveTab] = useState<string>("orders");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [acceptingOrders, setAcceptingOrders] = useState<boolean>(true);


  return (
    <>
      <div className="flex h-[calc(100vh-64px)] bg-gray-50 text-gray-800 font-sans w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0">
          <div className="py-6 px-0">
            <nav className="space-y-2 mt-4 pr-6">
              <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
              <NavItem icon={<Utensils size={20} />} label="Orders" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
              <NavItem icon={<BookOpen size={20} />} label="Menu Management" active={activeTab === "menu"} onClick={() => setActiveTab("menu")} />
              <NavItem icon={<LineChart size={20} />} label="job" active={activeTab === "jobpost"} onClick={() => setActiveTab("jobpost")} />
              <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
            </nav>
          </div>

          {/* Kitchen Status */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-orange-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Kitchen Status</p>
                <p className="text-sm font-bold text-orange-700 mt-0.5">Accepting Orders</p>
              </div>
              <button
                onClick={() => setAcceptingOrders(!acceptingOrders)}
                className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${acceptingOrders ? 'bg-orange-500' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${acceptingOrders ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
            <div className="w-96 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

          </header>

          {/* Dynamic Content Based on Tab */}
          <div className="flex-1 overflow-auto p-8 bg-[#fafafa]">
            {activeTab === "orders" && (
              <>
                {/* Orders Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Utensils className="text-orange-600" size={24} />
                    <h1 className="text-2xl font-bold font-serif text-gray-800">Active Orders</h1>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">12</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search ID or Customer"
                        className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 text-gray-700">
                      <History size={16} />
                      History
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-8 border-b border-gray-200 pb-2">
                  <FilterBadge label="All Orders" count={12} active={activeFilter === "all"} onClick={() => setActiveFilter("all")} color="gray" />
                  <FilterBadge label="New" count={2} active={activeFilter === "new"} onClick={() => setActiveFilter("new")} color="red" />
                  <FilterBadge label="Preparing" count={6} active={activeFilter === "preparing"} onClick={() => setActiveFilter("preparing")} color="orange" />
                  <FilterBadge label="Ready" count={2} active={activeFilter === "ready"} onClick={() => setActiveFilter("ready")} color="green" />
                  <FilterBadge label="Dispatched" count={1} active={activeFilter === "dispatched"} onClick={() => setActiveFilter("dispatched")} color="blue" />
                </div>

                {/* Order Cards */}
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {/* Card 1: New Order */}
                  <OrderCard
                    id="#SW-8942"
                    status="NEW"
                    statusColor="text-red-500 bg-red-50"
                    customerName="Rahul Sharma"
                    timeLabel="Time Elapsed"
                    timeValue="02:45"
                    timeColor="text-red-600"
                    items={[
                      { qty: 1, name: "Tandoori Chicken Tikka", price: "320" },
                      { qty: 2, name: "Garlic Naan", price: "110" },
                    ]}
                    note="Extra spicy, please! Provide mint chutney on the side."
                    actionButtons={
                      <div className="flex gap-3 mt-4">
                        <button className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                          Reject
                        </button>
                        <button className="flex-[2] py-2.5 bg-orange-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-sm">
                          <span className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center text-[10px]">✓</span>
                          Accept & Prep
                        </button>
                      </div>
                    }
                  />

                  {/* Card 2: Preparing Order */}
                  <OrderCard
                    id="#SW-8940"
                    status="PREPARING"
                    statusColor="text-orange-500 bg-orange-50"
                    customerName="Priya Patel"
                    timeLabel="Target Time"
                    timeValue="12:00 min"
                    timeColor="text-gray-900"
                    items={[
                      { qty: 1, name: "Paneer Butter Masala" },
                      { qty: 3, name: "Butter Roti" },
                      { qty: 1, name: "Jeera Rice" },
                    ]}
                    actionButtons={
                      <div className="mt-4">
                        <button className="w-full py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-sm">
                          <span className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center text-[10px]">✓</span>
                          Mark as Ready
                        </button>
                      </div>
                    }
                  />
                </div>
              </>
            )}

            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "menu" && <MenuManagementContent />}
          </div>
        </main>
      </div>
    </>
  );
}

function MenuManagementContent() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8001/api/v1/reastaurant/menu_item/1");
      if (res.data && res.data.data) {
        setMenuItems(res.data.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const updateItem = async (id: any) => {
     try{
      setLoading(true);
      setError(null);
      const response = await axios.put(`http://localhost:8001/api/v1/reastaurant/updateReastaurant/${id}`, {});
      console.log(response.data);
      return response;
     }
     catch(err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update item");
      }
     } finally {
      setLoading(false);
     }
 }

  const deleteItem = async (id: any) => {
    try {
      if (!window.confirm("Are you sure you want to delete this item?")) return;
      setLoading(true);
      await axios.delete(`http://localhost:8001/api/v1/reastaurant/deleteReastaurant/1/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Menu Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Restaurant Menu</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage your active menu items and pricing</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search menu..."
            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 w-64 shadow-sm"
          />
        </div>
      </div>

      {/* Full Screen Image */}
      <div className="w-full h-[70vh] rounded-2xl overflow-hidden shadow-lg mt-6 relative mb-8">
        <Image
          src="/boy_cutting_food.png" 
          alt="Boy Making Food" 
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <div>
            <h2 className="text-white text-4xl font-bold mb-2">Fast & Fresh Preparation</h2>
            <p className="text-white/90 text-lg">Experience the fastest cooking in town.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <CreateMenu onSuccess={fetchMenuItems} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Menu Items</h2>
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : menuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard 
                key={item.id}
                id={item.id}
                image={item.FoodImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"}
                type={item.FoodType === "veg" ? "Veg" : "Non-Veg"}
                price={item.FoodPirce}
                title={item.FoodName}
                description={item.FoodDiscription}
                inStock={true}
                onDelete={deleteItem}
                onEdit={updateItem}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No items yet</h3>
            <p className="text-gray-500 text-sm mt-1">Add your first menu item using the form above.</p>
          </div>
        )}
      </div>

    </div>
  );
}

interface MenuItemCardProps {
  id?: any;
  image?: string;
  type?: string;
  price?: string | number;
  title?: string;
  description?: string;
  inStock?: boolean;
  onDelete?: (id: any) => void;
  onEdit?: (id: any) => void;
}

function MenuItemCard({ id, image, type, price, title, description, inStock, onDelete, onEdit }: MenuItemCardProps) {
  const isVeg = type === "Veg";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-shadow hover:shadow-md">
      {/* Image Container with Badges */}
      <div className="relative h-48 w-full bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Veg / Non-Veg Badge */}
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded shadow-sm flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
          <span className={`text-[11px] font-bold ${isVeg ? 'text-green-700' : 'text-red-700'}`}>{type}</span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded shadow-sm">
          <span className="text-[12px] font-bold text-gray-800">₹{price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
        <p className={`text-gray-500 text-xs leading-relaxed mb-1 flex-1 ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {description}
        </p>
        {description && description.length > 50 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-orange-500 text-[11px] font-semibold self-start hover:underline mb-3"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          {inStock && (
            <span className="px-2 py-1 bg-green-50 text-green-600 text-[11px] font-bold rounded">
              In Stock
            </span>
          )}
          <div className="flex items-center gap-3">
            <button onClick={() => onEdit && onEdit(id)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
            </button>
            <button onClick={() => onDelete && onDelete(id)} className="text-gray-400 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-bold transition-colors ${active
          ? "bg-orange-500 text-white rounded-r-full"
          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-r-full"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function FilterBadge({ label, count, active, color, onClick }: { label: string, count: number, active?: boolean, color: string, onClick: () => void }) {
  const colorMap: Record<string, string> = {
    gray: active ? "bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-700",
    red: active ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-500",
    orange: active ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-500",
    green: active ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-500",
    blue: active ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-500",
  };

  const dotColorMap: Record<string, string> = {
    gray: "hidden",
    red: "bg-red-500",
    orange: "bg-orange-500",
    green: "bg-emerald-500",
    blue: "bg-blue-500",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${colorMap[color]}`}
    >
      {color !== 'gray' && <span className={`w-2 h-2 rounded-full ${dotColorMap[color]}`}></span>}
      {label} ({count})
    </button>
  );
}

function OrderCard({ id, status, statusColor, customerName, timeLabel, timeValue, timeColor, items, note, actionButtons }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-bold text-gray-900 text-lg">{id}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor}`}>
              {status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
              <span className="text-[10px]">👤</span>
            </div>
            <span className="font-medium text-gray-600">{customerName}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 font-bold mb-0.5">{timeLabel}</p>
          <p className={`text-xl font-bold font-serif ${timeColor}`}>{timeValue}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-gray-50/80 rounded-xl p-4 mb-4 flex-1 border border-gray-100">
        <ul className="space-y-2.5">
          {items.map((item: any, idx: number) => (
            <li key={idx} className="flex justify-between text-sm">
              <div className="flex gap-3">
                <span className="font-bold text-orange-600">{item.qty}x</span>
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>
              {item.price && <span className="text-gray-800 font-semibold">₹{item.price}</span>}
            </li>
          ))}
        </ul>

        {note && (
          <div className="mt-4 p-3 bg-red-50/60 rounded-lg flex gap-2.5 items-start border border-red-100">
            <Info className="text-red-500 shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-red-700 font-medium leading-relaxed">{note}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {actionButtons}
    </div>
  );
}