import { useEffect, useState, useMemo } from "react";
import { getBookmarks, addBookmark, deleteBookmark, reorderBookmarks } from "../api/bookmarks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tagFilter, setTagFilter] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBookmarks();
      // Sort by order field if present
      setBookmarks(res.data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
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

  // Tag filtering
  const allTags = useMemo(() => {
    const tagSet = new Set();
    bookmarks.forEach(b => (b.tags || []).forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }, [bookmarks]);

  const filteredBookmarks = tagFilter
    ? bookmarks.filter(b => b.tags && b.tags.includes(tagFilter))
    : bookmarks;

  // Drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(filteredBookmarks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    // Update order field for backend
    const newOrder = reordered.map((b, idx) => ({ id: b._id, order: idx }));
    try {
      await reorderBookmarks(newOrder);
      fetchData();
    } catch (err) {
      setError("Failed to reorder bookmarks");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0V40H0" stroke="#4B5563" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
      </div>
      <div className="w-full max-w-2xl mx-auto z-10">
        <h2 className="text-4xl font-extrabold mb-8 text-white text-center drop-shadow-lg tracking-tight">Your Bookmarks</h2>
        {/* Tag filter chips */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button
              className={`px-3 py-1 rounded-full font-medium border transition ${!tagFilter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/30 text-blue-700 border-blue-300 hover:bg-blue-100'}`}
              onClick={() => setTagFilter("")}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full font-medium border transition ${tagFilter === tag ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/30 text-blue-700 border-blue-300 hover:bg-blue-100'}`}
                onClick={() => setTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 mb-10 justify-center items-center bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/20">
          <input
            value={url}
            onChange={e=>setUrl(e.target.value)}
            placeholder="Paste URL"
            required
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-gray-900 placeholder-gray-500 shadow-sm"
          />
          <input
            value={tags}
            onChange={e=>setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-gray-900 placeholder-gray-500 shadow-sm"
          />
          <button
            type="submit"
            className="px-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg transition transform hover:-translate-y-1 hover:scale-105 active:scale-95 duration-150"
          >
            Add
          </button>
        </form>
        {error && <div className="text-red-500 text-center mb-4 font-semibold animate-pulse">{error}</div>}
        {loading ? (
          <div className="text-white text-center text-lg animate-pulse">Loading...</div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="bookmarks-droppable">
              {(provided) => (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredBookmarks.map((b, idx) => (
                    <Draggable key={b._id} draggableId={b._id} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-2 relative border border-white/20 hover:shadow-blue-200 transition duration-200 group ${snapshot.isDragging ? 'ring-4 ring-blue-400 scale-105' : ''}`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <img src={b.favicon} alt="" className="w-8 h-8 rounded shadow" />
                            <span className="font-semibold text-lg text-gray-900 truncate max-w-[200px] group-hover:text-blue-700 transition">{b.title || b.url}</span>
                          </div>
                          <div className="text-gray-800 text-sm mb-2 min-h-[48px] italic group-hover:text-gray-900 transition">{b.summary || <em>No summary</em>}</div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {b.tags && b.tags.map(t=>(
                              <span key={t} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium shadow">{t}</span>
                            ))}
                          </div>
                          <button
                            onClick={()=>handleDelete(b._id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-extrabold bg-white/70 rounded-full w-8 h-8 flex items-center justify-center shadow transition hover:scale-110"
                            title="Delete"
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}