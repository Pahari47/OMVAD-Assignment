import api from "./axios";

export const getBookmarks = () => api.get("/bookmarks");
export const addBookmark = (data) => api.post("/bookmarks", data);
export const deleteBookmark = (id) => api.delete(`/bookmarks/${id}`);
export const updateBookmark = (id, data) => api.put(`/bookmarks/${id}`, data);
export const reorderBookmarks = (order) => api.put("/bookmarks/reorder", { order });