import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8081";

export default function Patient() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend Data
  const [mainTherapies, setMainTherapies] = useState([]);
  const [subTherapies, setSubTherapies] = useState([]);

  // Store ALL sub therapies loaded (so added list works even after dropdown resets)
  const [allSubTherapies, setAllSubTherapies] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [duration, setDuration] = useState("");
  const [medicines, setMedicines] = useState("");
  const [therapyList, setTherapyList] = useState([]);

  // =============================
  // LOAD PATIENT
  // =============================
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/PatientTherapyDetails/details/${id}`)
      .then((res) => setPatient(res.data[0]))
      .catch(() => alert("Failed to load patient"))
      .finally(() => setLoading(false));
  }, [id]);

  // =============================
  // LOAD MAIN THERAPIES
  // =============================
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/PatientTherapyDetails/mainTherapy`)
      .then((res) => setMainTherapies(res.data))
      .catch(() => alert("Failed to load main therapies"));
  }, []);

  // =============================
  // LOAD SUB THERAPIES BASED ON MAIN
  // =============================
  useEffect(() => {
    if (!selectedMain) {
      setSubTherapies([]);
      return;
    }

    axios
      .get(`${API_BASE}/api/PatientTherapyDetails/subTherapy/${selectedMain}`)
      .then((res) => {
        setSubTherapies(res.data);

        // Store ALL sub therapies so added list works
        setAllSubTherapies((prev) => {
          const merged = [...prev];
          res.data.forEach((item) => {
            if (!merged.find((s) => s.id === item.id)) merged.push(item);
          });
          return merged;
        });
      })
      .catch(() => alert("Failed to load sub therapies"));
  }, [selectedMain]);

  // =============================
  // ADD THERAPY
  // =============================
  const toggleSub = (subId) => {
    setSelectedSubs((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  const addTherapy = () => {
    if (!selectedMain) return alert("Select main therapy");
    if (selectedSubs.length === 0) return alert("Select sub therapies");
    if (!duration) return alert("Enter duration");

    setTherapyList((prev) => [
      ...prev,
      {
        main: selectedMain,
        subs: selectedSubs,
        duration,
        medicines,
      },
    ]);

    // Reset fields
    setSelectedMain("");
    setSelectedSubs([]);
    setDuration("");
    setMedicines("");
  };

  // =============================
  // SAVE THERAPIES TO BACKEND
  // =============================
  const saveTherapies = async () => {
    try {
      const payload = {
        patientId: patient.id,
        therapies: therapyList,
      };

      await axios.post(
        `${API_BASE}/api/PatientTherapyDetails/saveTherapies`,
        payload
      );

      alert("Therapies saved successfully!");
      setTherapyList([]); // optional clear

    } catch (err) {
      console.error(err);
      alert("Failed to save therapies");
    }
  };

  // =============================
  // UI
  // =============================
  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen text-black p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* LEFT - Patient Info */}
        <div className="w-full md:w-1/3 bg-white shadow-lg border border-purple-300 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            Patient Details
          </h2>

          <p className="text-lg"><b>Name:</b> {patient?.name}</p>
          <p className="text-lg"><b>Age:</b> {patient?.age}</p>
          <p className="text-lg mb-4"><b>Weight:</b> {patient?.weight} kg</p>

          <h3 className="text-xl font-semibold text-purple-700 mb-3">
            Added Therapies
          </h3>

          <div className="bg-gray-50 border border-purple-300 rounded-lg p-3 h-64 overflow-y-auto">
            {therapyList.length === 0 ? (
              <p className="text-gray-500 text-center">No therapies added.</p>
            ) : (
              therapyList.map((t, i) => (
                <div
                  key={i}
                  className="p-3 mb-2 bg-white border rounded-lg shadow-sm"
                >
                  <p>
                    <b>Main:</b>{" "}
                    {mainTherapies.find((m) => m.id == t.main)?.therapy}
                  </p>

                  <p>
                    <b>Sub:</b>{" "}
                    {t.subs
                      .map(
                        (sid) =>
                          allSubTherapies.find((s) => s.id == sid)
                            ?.subTherapyName
                      )
                      .join(", ")}
                  </p>

                  <p><b>Duration:</b> {t.duration} days</p>
                  <p><b>Medicines:</b> {t.medicines || "None"}</p>
                </div>
              ))
            )}
          </div>

          {/* SAVE BUTTON */}
          <button
            disabled={therapyList.length === 0}
            onClick={saveTherapies}
            className={`mt-4 w-full py-3 rounded-lg text-lg font-semibold
              ${
                therapyList.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            Save Therapies
          </button>
        </div>

        {/* RIGHT - Add Therapy */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-purple-300">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            Add Therapy
          </h2>

          {/* Main Therapy */}
          <label className="font-semibold text-lg">Main Therapy</label>
          <select
            className="w-full border border-gray-400 p-3 rounded-lg mt-2 bg-white text-black"
            value={selectedMain}
            onChange={(e) => setSelectedMain(e.target.value)}
          >
            <option value="">-- Select Main Therapy --</option>
            {mainTherapies.map((th) => (
              <option key={th.id} value={th.id} className="text-black">
                {th.therapy}
              </option>
            ))}
          </select>

          {/* Sub Therapy */}
          <label className="font-semibold text-lg mt-5 block">
            Sub Therapies
          </label>

          <div className="border border-gray-400 p-3 rounded-lg mt-2 bg-white max-h-40 overflow-y-auto">
            {selectedMain ? (
              subTherapies.length > 0 ? (
                subTherapies.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedSubs.includes(sub.id)}
                      onChange={() => toggleSub(sub.id)}
                      className="h-5 w-5 text-purple-600"
                    />
                    <span className="text-black">{sub.subTherapyName}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading...</p>
              )
            ) : (
              <p className="text-gray-500">Select a main therapy first</p>
            )}
          </div>

          {/* Duration */}
          <label className="font-semibold text-lg mt-5 block">
            Duration (days)
          </label>
          <input
            type="number"
            className="w-full border border-gray-400 p-3 rounded-lg mt-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          {/* Medicines */}
          <label className="font-semibold text-lg mt-5 block">Medicines</label>
          <input
            type="text"
            className="w-full border border-gray-400 p-3 rounded-lg mt-2"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="Optional"
          />

          {/* Add Button */}
          <button
            onClick={addTherapy}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            + Add Therapy
          </button>
        </div>
      </div>
    </div>
  );
}
