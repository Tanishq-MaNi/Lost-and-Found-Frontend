import {api} from "./api";

export const getNotifications = async () => {
  const data  = await api(
    "/notifications", { method: 'GET' }
  );
  return data;
};

export const markRead = async (id) => {
  const data  = await api(
    `/notifications/${id}/read`, { method: "PATCH" }
  );

  return data;
};

export const markAllRead = async () => {
  const data  = await api(
    "/notifications/read-all", { method: "PATCH" }
  );

  return data;
};