import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/userSlice";

export default function EditUserModal({ user = {}, isOpen, onClose }) {
  // form state object
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, updatedData: formData }));
    alert("Form submitted successfully!");
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-xl mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white text-center">
            <h1 className="text-2xl font-bold">Edit User</h1>
          </div>
          {/* Edit User Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>
            {/* User Name */}
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            {/* Email Address */}
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:scale-[1.02] transition shadow-lg"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
