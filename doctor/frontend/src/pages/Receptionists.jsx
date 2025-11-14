import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8081";

const Receptionists = () => {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (!query) return setFiltered(patients);
    const q = query.toLowerCase();
    setFiltered(
      patients.filter((p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.email || "").toLowerCase().includes(q) ||
        (p.phone || "").toLowerCase().includes(q)
      )
    );
  }, [query, patients]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE}/api/GetAllReceptionists`); // adjust path if needed
      setPatients(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch receptionists."
      );
    } finally {
      setLoading(false);
    }
  };

  // optional: delete patient (uncomment if your API supports DELETE)
  const handleDelete = async (id) => {
    if (!confirm("Delete this receptionist?")) return;
    try {
      await axios.delete(`${API_BASE}/api/receptionist/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id));
      setFiltered((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Receptionists</h2>

        <div className="flex gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name / email / phone..."
            className="border rounded px-3 py-2 w-64"
          />
          <button
            onClick={fetchPatients}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center">Loading receptionists...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-600">No receptionists found.</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Age / Gender</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id ?? idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{p.name || "-"}</td>
                  <td className="p-3">{p.email || "-"}</td>
                  <td className="p-3">{p.phone || "-"}</td>
                  <td className="p-3">
                    {(p.age ? `${p.age} yrs` : "-")}{" "}
                    {p.gender ? ` / ${p.gender}` : ""}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // navigate to view page OR open modal                        
                          alert("Open receptionist details for: " + (p.name || p.id));
                        }}
                        className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
    
}

export default Receptionists