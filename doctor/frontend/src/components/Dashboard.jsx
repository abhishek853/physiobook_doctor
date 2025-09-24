const Dashboard = () => {

  // Dummy Data (replace with API calls)
  const patientsCount = 12;
  const activeTherapies = 8;
  const completedTherapies = 15;

  const todayAppointments = [
    { id: 1, patient: "Ramesh Kumar", time: "10:00 AM", status: "Completed" },
    { id: 2, patient: "Priya Sharma", time: "11:30 AM", status: "Upcoming" },
    { id: 3, patient: "Amit Verma", time: "2:00 PM", status: "Upcoming" },
  ];

  return (
    <>
        {/* Dashboard Content */}
        <main className="p-6 flex-1">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow p-4 rounded-xl">
              <h2 className="text-gray-600">Total Patients</h2>
              <p className="text-2xl font-bold">{patientsCount}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h2 className="text-gray-600">Active Therapies</h2>
              <p className="text-2xl font-bold">{activeTherapies}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h2 className="text-gray-600">Completed Therapies</h2>
              <p className="text-2xl font-bold">{completedTherapies}</p>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white shadow p-4 rounded-xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Patient</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">View</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((appt) => (
                  <tr key={appt.id} className="border-b hover:bg-gray-100">
                    <td className="p-2">{appt.patient}</td>
                    <td className="p-2">{appt.time}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${appt.status === "Upcoming"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-green-200 text-green-800"
                          }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                Create Therapy Plan
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
                View Patient History
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
                Add Notes
              </button>
            </div>
          </div>
        </main>
    </>
  )
}

export default Dashboard;