import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8081";

export default function Patient() {
  const { patientId } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainTherapies, setMainTherapies] = useState([]);
  const [subTherapies, setSubTherapies] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [duration, setDuration] = useState("");
  const [medicines, setMedicines] = useState("");

  const [savedTherapies, setSavedTherapies] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // Load patient details
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/patient/${patientId}`)
      .then((res) => setPatient(res.data))
      .finally(() => setLoading(false));
  }, [patientId]);

  // Load saved therapies
  const loadSavedTherapies = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/patientTherapy/patient/${patientId}`
      );
      setSavedTherapies(res.data);
    } catch (err) {
      console.error("Failed to load saved therapies", err);
    }
  };

  useEffect(() => {
    if (patientId) loadSavedTherapies();
  }, [patientId]);

  // Load main therapies
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/PatientTherapyDetails/mainTherapy`)
      .then((res) => setMainTherapies(res.data))
      .catch(() => alert("Failed to load main therapies"));
  }, []);

  // Load sub therapies
  useEffect(() => {
    if (!selectedMain) {
      setSubTherapies([]);
      return;
    }

    axios
      .get(
        `${API_BASE}/api/PatientTherapyDetails/therapyType/mainTherapy/${selectedMain}`
      )
      .then((res) => setSubTherapies(res.data))
      .catch(() => alert("Failed to load sub therapies"));
  }, [selectedMain]);

  const toggleSub = (subId) => {
    setSelectedSubs((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  const addTherapy = async () => {
    if (!selectedMain) return alert("Select main therapy");
    if (selectedSubs.length === 0) return alert("Select sub therapies");
    if (!duration) return alert("Enter duration");

    try {
      for (let subId of selectedSubs) {
        const payload = {
          patientId: patient.id,
          tcid: parseInt(selectedMain),
          ttid: parseInt(subId),
          duration,
          medicines,
        };

        await axios.post(`${API_BASE}/api/patientTherapy`, payload);
      }

      alert("Therapy added successfully!");
      loadSavedTherapies();

      setShowModal(false);
      setSelectedMain("");
      setSelectedSubs([]);
      setDuration("");
      setMedicines("");
    } catch (err) {
      console.error("Error saving therapy:", err);
      alert("Failed to save therapy");
    }
  };

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen text-black p-6 bg-gray-100">
      <div className="max-w-full mx-auto">

        {/* PATIENT DETAILS SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-200 mb-6">

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-3">
                Patient Details
              </h2>
              <p className="text-lg"><b>Name:</b> {patient?.name}</p>
              <p className="text-lg"><b>Age:</b> {patient?.age}</p>
              <p className="text-lg"><b>Weight:</b> {patient?.weight} kg</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-lg font-semibold"
            >
              + Add Therapy
            </button>
          </div>
        </div>

        {/* SAVED THERAPIES SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-200">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">Saved Therapies</h3>

          {savedTherapies.length === 0 ? (
            <p className="text-gray-500">No therapies yet.</p>
          ) : (
            <div className="space-y-3">
              {savedTherapies.map((t) => (
                <div
                  key={t.id}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <p><b>Main:</b> {t.therapyCategory.therapy}</p>
                  <p><b>Sub:</b> {t.therapyType.subTherapyName}</p>
                  <p><b>Duration:</b> {t.duration} days</p>
                  <p><b>Medicines:</b> {t.medicines}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADD THERAPY POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold text-purple-700 mb-5 text-center">
              Add Therapy
            </h2>

            {/* Main Therapy */}
            <label className="font-semibold text-lg">Main Therapy</label>
            <select
              className="w-full border p-3 rounded-lg mt-1"
              value={selectedMain}
              onChange={(e) => setSelectedMain(e.target.value)}
            >
              <option value="">-- Select Main Therapy --</option>
              {mainTherapies.map((th) => (
                <option key={th.id} value={th.id}>{th.therapy}</option>
              ))}
            </select>

            {/* Sub Therapies */}
            <label className="font-semibold text-lg mt-4 block">Sub Therapies</label>
            <div className="border p-3 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {!selectedMain ? (
                <p className="text-gray-500">Select a main therapy first</p>
              ) : (
                subTherapies.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedSubs.includes(sub.id)}
                      onChange={() => toggleSub(sub.id)}
                    />
                    <span>{sub.subTherapyName}</span>
                  </div>
                ))
              )}
            </div>

            {/* Duration */}
            <label className="font-semibold text-lg mt-4 block">Duration (days)</label>
            <input
              type="number"
              className="w-full border p-3 rounded-lg mt-1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            {/* Medicines */}
            <label className="font-semibold text-lg mt-4 block">Medicines</label>
            <input
              type="text"
              className="w-full border p-3 rounded-lg mt-1"
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              placeholder="Optional"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addTherapy}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg"
              >
                Save Therapy
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
