// src/components/Dashboard.jsx
import React from "react";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">PhysioBook</h2>
        <nav>
          <ul className="space-y-4">
            {["Dashboard", "Patients", "Appointments", "Therapy Records", "Reports", "Settings", "Logout"].map(
              (item, idx) => (
                <li
                  key={idx}
                  className="hover:bg-green-600 px-4 py-2 rounded-lg cursor-pointer transition duration-200"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">
          Welcome to PhysioBook Dashboard
        </h1>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Patients", value: "120 Total Patients" },
            { title: "Appointments", value: "15 Upcoming" },
            { title: "Therapy Sessions", value: "8 Active" },
            { title: "Reports", value: "20 Progress Reports" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-200"
            >
              <h2 className="text-lg font-medium text-gray-700">{stat.title}</h2>
              <p className="text-gray-500 mt-2">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Patient Records and Appointments */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Patients */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Recent Patients
            </h2>
            <ul className="space-y-3">
              {[
                { name: "John Doe", issue: "Back Pain" },
                { name: "Sarah Lee", issue: "Knee Injury" },
                { name: "Michael Smith", issue: "Shoulder Rehab" },
              ].map((patient, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b pb-2 text-gray-600"
                >
                  <span>{patient.name}</span>
                  <span className="text-sm text-gray-500">{patient.issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Upcoming Appointments
            </h2>
            <ul className="space-y-3">
              {[
                { name: "John Doe", time: "Tomorrow, 10 AM" },
                { name: "Sarah Lee", time: "Tomorrow, 2 PM" },
                { name: "Michael Smith", time: "Friday, 11 AM" },
              ].map((appt, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b pb-2 text-gray-600"
                >
                  <span>{appt.name}</span>
                  <span className="text-sm text-gray-500">{appt.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
