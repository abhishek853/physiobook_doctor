import { useState } from 'react'
import axios from 'axios';

const AddReceptionist = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: ""

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const res = await axios.post("http://localhost:8081/api/SaveReceptionists", formData);
            console.log(res.data);
            alert("Receptionist added successfully");
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                address: ""
            })
        } catch (error) {
            console.error("Error adding receptionist:", error);
            alert("Failed to add receptionist");
        }
        
    }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Receptionist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter phone number"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter password"
          />
        </div>

        {/* Address */}
        <div>
            <label>Address</label>
            <input 
                type="text"
                name="address"
                value={formData.address} 
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="Enter address"
            />                
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Receptionist
        </button>
      </form>
    </div>
  );
}

export default AddReceptionist