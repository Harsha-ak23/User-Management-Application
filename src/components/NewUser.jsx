import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { createNewUser } from "../slices/userSlice";

const NewUser = () => {
  //form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(formData)); // creating user
    alert("Form submitted successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 inset-0 z-50 bg-opacity-70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-purple-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>

          <h1 className="text-2xl font-bold text-center">Add New User</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-2">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:scale-[1.02] transition shadow-lg"
          >
            Add New User
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
