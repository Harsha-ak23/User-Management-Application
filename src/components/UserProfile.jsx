import React from "react";
import { User, X, Mail, Phone, MapPin, Globe, Briefcase } from "lucide-react";

const UserProfile = ({ user, onClose, isOpen }) => {
  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <User className="w-6 h-6 mr-2 text-indigo-500" />
            Profile
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="text-center sm:text-left">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                @{user.username}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Location
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {`${user.address.street}, ${user.address.suite}, ${user.address.city}`}
                </p>
              </div>
            </div>

            {/* Company */}
            <div className="flex items-start space-x-3">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Company
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.company.name}
                </p>
              </div>
            </div>
          </div>

          {/* Website */}
          <div>
            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white border-b pb-1 dark:border-gray-600 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Website
            </h4>
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
