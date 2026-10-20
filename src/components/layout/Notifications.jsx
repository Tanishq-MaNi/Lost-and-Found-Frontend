import { useEffect, useState } from "react";
import {
  getNotifications,
  markRead,
} from "../../services/notificationService";

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await getNotifications();

    setItems(data.notifications);
  };

  const readItem = async (id) => {
    await markRead(id);

    setItems((prev) =>
      prev.map((n) =>
        n._id === id
          ? { ...n, isRead: true }
          : n
      )
    );
  };

  return (
    <div className="absolute right-0 top-14 w-96 rounded-xl border border-[#303940] bg-[#111720]">
      <div className="border-b border-[#303940] p-4">
        <h3 className="font-semibold">
          Notifications
        </h3>
      </div>

      {items.map((item) => (
        <button
          key={item._id}
          onClick={() => readItem(item._id)}
          className={`block w-full border-b border-[#252b33] p-4 text-left ${
            !item.isRead
              ? "bg-blue-500/10"
              : ""
          }`}
        >
          <div className="font-medium">
            {item.title}
          </div>

          <div className="text-sm text-slate-400">
            {item.message}
          </div>
        </button>
      ))}
    </div>
  );
}