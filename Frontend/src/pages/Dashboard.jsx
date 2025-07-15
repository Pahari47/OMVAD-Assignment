import { useEffect, useState } from "react";
import { getBookmarks, addBookmark, deleteBookmark } from "../api/bookmarks";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBookmarks();
      setBookmarks(res.data);
    } catch (err) {
      setError("Failed to load bookmarks");
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addBookmark({ url, tags: tags.split(",").map(t=>t.trim()).filter(Boolean) });
      setUrl(""); setTags("");
      fetchData();
    } catch (err) {
      setError("Failed to add bookmark");
    }
  };

  const handleDelete = async (id) => {
    await deleteBookmark(id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Your Bookmarks</h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <input
            value={url}
            onChange={e=>setUrl(e.target.value)}
            placeholder="Paste URL"
            required
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={tags}
            onChange={e=>setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Add
          </button>
        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bookmarks.map(b=>(
              <div key={b._id} className="bg-white/90 rounded-xl shadow-lg p-5 flex flex-col gap-2 relative">
                <div className="flex items-center gap-2 mb-2">
                  <img src={b.favicon} alt="" className="w-6 h-6" />
                  <span className="font-semibold text-lg text-gray-900 truncate max-w-[200px]">{b.title || b.url}</span>
                </div>
                <div className="text-gray-700 text-sm mb-2 min-h-[48px]">{b.summary || <em>No summary</em>}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {b.tags && b.tags.map(t=>(
                    <span key={t} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{t}</span>
                  ))}
                </div>
                <button
                  onClick={()=>handleDelete(b._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                  title="Delete"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}