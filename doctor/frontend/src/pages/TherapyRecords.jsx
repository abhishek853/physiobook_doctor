import { useEffect, useState } from "react";
import axios from "axios";

export default function TherapyRecords() {
  const [groupedData, setGroupedData] = useState({});
  const [openPatientId, setOpenPatientId] = useState(null); // Track opened patient

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/patientTherapy")
      .then((res) => {
        const grouped = {};

        res.data.forEach((item) => {
          const pId = item.patient.id;

          if (!grouped[pId]) {
            grouped[pId] = {
              patient: item.patient,
              therapies: []
            };
          }

          grouped[pId].therapies.push({
            id: item.id,
            mainTherapy: item.therapyCategory.therapy,
            subTherapy: item.therapyType.subTherapyName,
            duration: item.duration,
            medicines: item.medicines
          });
        });

        setGroupedData(grouped);
      })
      .catch(() => alert("Failed to load therapy data"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">
        Therapy Records
      </h1>

      {/* Patient List */}
      <div className="max-w-full mx-auto space-y-6">

        {Object.values(groupedData).map((entry) => (
          <div
            key={entry.patient.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-purple-200"
          >
            {/* PATIENT BASIC INFO */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">
                  {entry.patient.name}
                </h2>

                <p className="text-gray-700 mt-1">
                  <b>Age:</b> {entry.patient.age} &nbsp; | &nbsp;
                  <b>Weight:</b> {entry.patient.weight}kg
                </p>

                <p className="text-gray-700">
                  <b>Phone:</b> {entry.patient.phone}
                </p>
              </div>

              {/* VIEW THERAPIES BUTTON */}
              <button
                onClick={() =>
                  setOpenPatientId(
                    openPatientId === entry.patient.id ? null : entry.patient.id
                  )
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold"
              >
                {openPatientId === entry.patient.id
                  ? "Hide Therapies"
                  : "View Therapies"}
              </button>
            </div>

            {/* THERAPIES SECTION (ONLY IF OPENED) */}
            {openPatientId === entry.patient.id && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  Therapies
                </h3>

                <div className="space-y-3">
                  {entry.therapies.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 bg-gray-50 rounded-lg border"
                    >
                      <p>
                        <b>Main Therapy:</b>{" "}
                        <span className="text-purple-700">{t.mainTherapy}</span>
                      </p>

                      <p>
                        <b>Sub Therapy:</b>{" "}
                        <span className="text-purple-700">{t.subTherapy}</span>
                      </p>

                      <p><b>Duration:</b> {t.duration} days</p>
                      <p><b>Medicines:</b> {t.medicines}</p>

                      <p className="text-sm text-gray-500 mt-1">
                        Record ID: #{t.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}
