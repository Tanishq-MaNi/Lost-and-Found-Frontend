import { useState } from "react";
import { useLocation } from "react-router-dom";

import { BurgerMenuIcon, NotificationIcon } from "../../assets/Icons";
import Notifications from "./Notifications";

import { useAuth } from "../../context/AuthContext";

const titles = {
  "/": "Dashboard",
  "/items": "Browse Items",
  "/report/lost": "Report Lost Item",
  "/report/found": "Report Found Item",
  "/my-reports": "My Reports",
  "/my-claims": "My Claims",
  "/profile": "My Profile",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/pending-reports": "Pending Reports",
  "/admin/all": "All Reports",
  "/admin/claims-management": "Claims Management",
  "/admin/student-management": "Student Management",
  "/admin/automatic-matches": "Automatic Matches",
};

function getTitle(pathname) {
  if (pathname.endsWith("/claim")) return "Claim Item";
  if (pathname.startsWith("/items/")) return "Item Details";
  return titles[pathname] || "Lost & Found";
}

const Navbar = ({ burgerMenuActive, setBurgerMenuActive }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const title = getTitle(pathname);
  const section = user?.role === "admin" ? "Admin" : "Student";

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setBurgerMenuActive(true)}
          type="button"
          aria-label="Open menu"
          aria-controls="app-sidebar"
          aria-expanded={burgerMenuActive}
          className="rounded-xl border border-white/8 bg-white/3 p-2.5 transition hover:bg-white/8 lg:hidden"
        >
          <BurgerMenuIcon size={24} />
        </button>

        <div className="min-w-0">
          <p className="text-xs text-slate-500">
            {section} / {title}
          </p>
          <h2 className="mt-1 truncate text-base font-semibold text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="relative">
        {true && (
          <span className="absolute right-2 top-2 z-10 h-2.5 w-2.5 rounded-full border-2 border-[#0d121a] bg-rose-500" />
        )}

        <button
          type="button"
          aria-label="Notifications"
          onClick={() => (setNotificationOpen(!notificationOpen))}
          className="rounded-xl border border-white/8 bg-white/3 p-2 transition hover:bg-white/8"
        >
          <NotificationIcon size={28} />
        </button>
      </div>
      {
        notificationOpen &&
        <Notifications />
      }
    </header>
  );
};

export default Navbar;