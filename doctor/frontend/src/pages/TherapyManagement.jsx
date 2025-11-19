import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8081/api/PatientTherapyDetails";

export default function TherapyManagement() {
  const [mainTherapies, setMainTherapies] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");

  const [mainName, setMainName] = useState("");
  const [subName, setSubName] = useState("");

  const [subTherapies, setSubTherapies] = useState([]);

  // Load Main Therapies
  useEffect(() => {
    axios.get(`${API_BASE}/mainTherapy`).then(res => setMainTherapies(res.data));
  }, []);

  // Load Sub Therapies when main selected
  useEffect(() => {
    if (selectedMain) {
      axios
        .get(`${API_BASE}/therapyType/mainTherapy/${selectedMain}`)
        .then(res => setSubTherapies(res.data));
    }
  }, [selectedMain]);

  // Add Main Therapy
  const addMainTherapy = async () => {
    if (!mainName.trim()) return alert("Enter therapy name");

    await axios.post(`${API_BASE}/addMT`, { therapy: mainName });
    alert("Main therapy added!");

    setMainName("");

    // reload list
    const res = await axios.get(`${API_BASE}/mainTherapy`);
    setMainTherapies(res.data);
  };

  // Add Sub Therapy
  const addSubTherapy = async () => {
    if (!selectedMain) return alert("Select main therapy first");
    if (!subName.trim()) return alert("Enter sub therapy");

    await axios.post(`${API_BASE}/addSubTherapy`, {
      subTherapy: subName,
      mainTherapyId: selectedMain
    });

    alert("Sub therapy added!");
    setSubName("");

    const res = await axios.get(`${API_BASE}/therapyType/mainTherapy/${selectedMain}`);
    setSubTherapies(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Therapy Management Panel
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-purple-300">

        {/* Add Main Therapy */}
        <h2 className="text-xl font-semibold mb-3">Add Main Therapy</h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Main Therapy Name"
            value={mainName}
            onChange={(e) => setMainName(e.target.value)}
            className="p-3 border rounded-lg w-full"
          />
          <button
            onClick={addMainTherapy}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Select Main Therapy */}
        <h2 className="text-xl font-semibold mb-3">Select Main Therapy</h2>
        <select
          className="w-full border p-3 rounded-lg mb-6"
          value={selectedMain}
          onChange={(e) => setSelectedMain(e.target.value)}
        >
          <option value="">-- Select Main Therapy --</option>
          {mainTherapies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.therapy}
            </option>
          ))}
        </select>

        {/* Add Sub Therapy */}
        {selectedMain && (
          <>
            <h2 className="text-xl font-semibold mb-3">Add Sub Therapy</h2>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter Sub Therapy Name"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                className="p-3 border rounded-lg w-full"
              />
              <button
                onClick={addSubTherapy}
                className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg"
              >
                Add
              </button>
            </div>

            {/* Show Sub Therapies */}
            <h2 className="text-xl font-semibold mb-3">Sub Therapies</h2>
            <div className="bg-gray-50 border p-4 rounded-lg max-h-64 overflow-y-auto">
              {subTherapies.length === 0 ? (
                <p className="text-gray-500">No sub therapies yet.</p>
              ) : (
                subTherapies.map((st) => (
                  <div
                    key={st.id}
                    className="p-2 bg-white border rounded mb-2 flex justify-between items-center"
                  >
                    <span>{st.subTherapyName}</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
