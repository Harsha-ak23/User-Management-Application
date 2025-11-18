import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../slices/userSlice";
import { Link } from "react-router-dom";
import { Search, Eye, Edit2, Trash2, Mail, Phone } from "lucide-react";
import UserProfile from "./UserProfile.jsx";
import EditUserModal from "./EditUser.jsx";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetail, setUserDetails] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user: users, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Users
        </h1>

        <Link
          to="/createUser"
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
        >
          Add User
        </Link>
      </div>

      {/* Table + Mobile Cards */}
      <div className="mt-6 mx-5 bg-white rounded-xl shadow border overflow-hidden">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Username
                </th>
                <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">
                  Phone
                </th>
                <th className="py-3 px-4 text-center text-sm font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {/* Loading */}
              {status === "pending" && (
                <tr>
                  <td
                    colSpan="4"
                    className="py-10 text-center text-indigo-600 font-medium"
                  >
                    {/* <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> */}
                    Loading users...
                  </td>
                </tr>
              )}

              {/* Error */}
              {status === "failed" && (
                <tr>
                  <td
                    colSpan="4"
                    className="py-10 text-center text-red-600 font-medium"
                  >
                    Failed to load users.
                  </td>
                </tr>
              )}

              {/* USERS TABLE ROWS */}
              {status === "idle" &&
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-indigo-50 transition">
                    <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                      {user.email}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      {user.username}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>

                    <td className="px-4 py-4 flex gap-3 justify-center text-sm">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsProfileOpen(true);
                        }}
                        className="flex flex items-start justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-150"
                      >
                        <Eye size={16} />
                        <span className="inline">View</span>
                      </button>
                      <button
                        onClick={() => {
                          setUserDetails(user);
                          setIsOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors duration-150"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="border border-gray-500 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-800 hover:text-white transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden p-4 space-y-4">
          {status === "pending" && (
            <div className="flex flex-col items-center gap-3 py-12">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Loading users...</p>
            </div>
          )}

          {status === "failed" && (
            <div className="flex flex-col items-center gap-2 py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <p className="text-red-600 font-semibold">Failed to load users</p>
            </div>
          )}

          {status === "idle" && users.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-12">
              <Search className="text-gray-400" size={48} />
              <p className="text-gray-600 font-medium">No users found</p>
            </div>
          )}

          {status === "idle" &&
            users.map((user) => (
              <div
                key={user.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {user.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      @{user.username}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400 flex-shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsProfileOpen(true);
                    }}
                    className="flex flex items-start justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-150"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log(user);
                      setUserDetails(user);
                      setIsOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors duration-150"
                  >
                    <Edit2 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="flex items-center justify-center bg-white hover:bg-red-50 text-red-600 p-2.5 rounded-lg border border-gray-300 hover:border-red-300 transition-colors duration-150"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {selectedUser && (
        <UserProfile
          user={selectedUser}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
      <EditUserModal
        user={userDetail}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Home;
