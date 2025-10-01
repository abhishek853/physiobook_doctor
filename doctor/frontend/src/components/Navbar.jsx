import { Link, Outlet } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="flex min-h-screen bg-violet-200">
      {/* Sidebar */}
      <aside className="w-64 bg-violet-300 text-xl text-violet-950 flex flex-col">
        <Link to={"/"}>
          <div className="p-6 text-2xl font-bold border-b flex items-center gap-2">
            <img
              src="logo.png"
              className="w-8 h-8"
            />
            TherapyForU
          </div>
        </Link>

        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li className="hover:bg-white p-2 rounded cursor-pointer">Dashboard</li>
            <Link to={"/PatientsList"}>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Patients</li>
            </Link>
            <Link to={"/Receptionists"}>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Receptionists</li>
            </Link>
            <Link to={"/Appointments"}>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Appointments</li>
            </Link>
            <Link>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Therapy Records</li>
            </Link>
            <Link>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Reports</li>
            </Link>
            <Link>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Settings</li>
            </Link>
            <Link>
              <li className="mt-1 hover:bg-white p-2 rounded cursor-pointer">Logout</li>
            </Link>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-violet-300 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Welcome Dr.</h1>
          <div className="flex gap-4">
            <Link to="/AddReceptionist">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" >
                Add Receptionist
              </button>
            </Link>

            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Profile
            </button>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Navbar;