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
    <div>
      <h2>Bookmarks</h2>
      <form onSubmit={handleAdd}>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste URL" required />
        <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)" />
        <button type="submit">Add</button>
      </form>
      {error && <div style={{color:"red"}}>{error}</div>}
      {loading ? <div>Loading...</div> : (
        <div style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>
          {bookmarks.map(b=>(
            <div key={b._id} style={{border:"1px solid #ccc",padding:"1rem",width:"300px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                <img src={b.favicon} alt="" width={16} height={16} />
                <strong>{b.title || b.url}</strong>
              </div>
              <div style={{fontSize:"0.9em",color:"#555"}}>{b.summary || <em>No summary</em>}</div>
              <div>
                {b.tags && b.tags.map(t=><span key={t} style={{background:"#eee",margin:"0 2px",padding:"2px 6px",borderRadius:"4px"}}>{t}</span>)}
              </div>
              <button onClick={()=>handleDelete(b._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}