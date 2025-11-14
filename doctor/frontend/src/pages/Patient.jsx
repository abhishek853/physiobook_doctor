import { useState } from "react";

export default function Patient() {
  const mainTherapies = [
    { id: 1, name: "Physiotherapy" },
    { id: 2, name: "Electrotherapy" },
    { id: 3, name: "Hydrotherapy" },
  ];

  const subTherapies = {
    1: [
      { id: 1, name: "Stretching" },
      { id: 2, name: "Strength Training" },
    ],
    2: [
      { id: 3, name: "Ultrasound Therapy" },
      { id: 4, name: "TENS" },
    ],
    3: [
      { id: 5, name: "Hot Water Immersion" },
      { id: 6, name: "Cold Water Compression" },
    ],
  };

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [duration, setDuration] = useState("");
  const [medicines, setMedicines] = useState("");
  const [therapyList, setTherapyList] = useState([]);

  const toggleSub = (id) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const addTherapy = () => {
    if (!selectedMain || selectedSubs.length === 0 || !duration) {
      alert("Please fill all required fields");
      return;
    }

    setTherapyList((prev) => [
      ...prev,
      {
        main_therapy: selectedMain,
        sub_therapies: selectedSubs,
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

  return (
    <div className="min-h-screen bg-black text-white p-6 flex gap-8">

      {/* LEFT SECTION */}
      <div className="w-1/3 border border-purple-400 p-6 rounded-xl">
        <p className="text-3xl font-mono text-purple-400 mb-4">Name:</p>
        <p className="text-3xl font-mono text-purple-400 mb-4">Age:</p>
        <p className="text-3xl font-mono text-purple-400 mb-4">Weight:</p>

        <div className="mt-8 border border-purple-400 p-4 rounded-xl h-64">
          <p className="text-3xl font-mono text-purple-400 mb-4">
            Added Therapies
          </p>

          <div className="text-white text-sm overflow-y-auto h-40">
            {therapyList.map((t, index) => (
              <div
                key={index}
                className="mb-3 p-2 border border-purple-300 rounded-md"
              >
                <p>
                  <b>Main:</b> {mainTherapies.find((m) => m.id == t.main_therapy)?.name}
                </p>
                <p>
                  <b>Subs:</b>{" "}
                  {t.sub_therapies
                    .map(
                      (sid) =>
                        subTherapies[t.main_therapy].find((s) => s.id == sid)
                          ?.name
                    )
                    .join(", ")}
                </p>
                <p><b>Duration:</b> {t.duration} days</p>
                <p><b>Medicines:</b> {t.medicines}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-2/3 bg-white text-black p-6 rounded-xl">

        {/* Main Therapy */}
        <label className="font-semibold">Main Therapy</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={selectedMain}
          onChange={(e) => setSelectedMain(e.target.value)}
        >
          <option value="">Select Main Therapy</option>
          {mainTherapies.map((mt) => (
            <option key={mt.id} value={mt.id}>
              {mt.name}
            </option>
          ))}
        </select>

        {/* Sub Therapies - Checkboxes */}
        <label className="font-semibold mt-4 block">
          Select Sub Therapies (Multiple)
        </label>

        <div className="border p-3 rounded mt-1 max-h-40 overflow-y-auto bg-gray-100">
          {selectedMain &&
            subTherapies[selectedMain].map((sub) => (
              <div key={sub.id} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedSubs.includes(sub.id)}
                  onChange={() => toggleSub(sub.id)}
                />
                <span>{sub.name}</span>
              </div>
            ))}

          {!selectedMain && (
            <p className="text-gray-500 text-sm">Select main therapy first</p>
          )}
        </div>

        {/* Duration */}
        <label className="font-semibold mt-4 block">Duration (Days)</label>
        <input
          type="number"
          className="w-full border p-2 rounded mt-1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        {/* Medicines */}
        <label className="font-semibold mt-4 block">Medicines</label>
        <input
          type="text"
          className="w-full border p-2 rounded mt-1"
          value={medicines}
          onChange={(e) => setMedicines(e.target.value)}
        />

        {/* Add Therapy Button */}
        <button
          onClick={addTherapy}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Add Therapy
        </button>
      </div>
    </div>
  );
}
