import { useEffect, useState } from "react";
import axios from "axios";

export default function TherapyRecords(){
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/patientTherapy") // change if needed
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
        Patient Therapy Records
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(groupedData).map((entry) => (
          <div
            key={entry.patient.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-purple-300"
          >
            {/* Patient Info */}
            <h2 className="text-xl font-semibold text-purple-700">
              {entry.patient.name}
            </h2>

            <p className="text-gray-700">
              <b>Age:</b> {entry.patient.age} &nbsp; | &nbsp;
              <b>Weight:</b> {entry.patient.weight}kg
            </p>

            <p className="text-gray-700">
              <b>Phone:</b> {entry.patient.phone}
            </p>

            <p className="text-gray-500 text-sm mb-3">
              Added On: {new Date(entry.patient.createdAt).toLocaleString()}
            </p>

            <hr className="my-3" />

            {/* Therapy List */}
            <h3 className="text-lg font-bold text-purple-700 mb-3">Therapies</h3>

            {entry.therapies.map((t) => (
              <div key={t.id} className="mb-3 p-3 bg-gray-50 rounded border">
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

                <p className="text-sm text-gray-500 mt-2">Record ID: #{t.id}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}