"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../components/topbar/page";
import toast, { Toaster } from "react-hot-toast";

interface RoleFormData {
  role: string;
}

interface Role {
  _id: string;
  role: string;
}

export default function AddRole() {
  const router = useRouter();
  const [formData, setFormData] = useState<RoleFormData>({ role: "" });
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3444/role/showrole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setRoles(response.data);
        // toast.success("Roles loaded successfully");
      }
    } catch (error: any) {
      // console.error("Error fetching roles:", error);
      toast.error("Failed to fetch roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.role.trim()) {
      setError("Role name is required");
      toast.error("Role name is required");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3444/role/addrole",
        {
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        toast.success("Role added successfully!");
        setFormData({ role: "" });
        fetchRoles();
        router.push("/role");
      }
    } catch (error: any) {
      // console.error("Error adding role:", error);
      toast.error(error.response?.data?.message || "Failed to add role");
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <TopBar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Role Management
          </h1>
          <p className="text-center text-gray-600">
            Add and manage user roles in the system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Role Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add New Role
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 rounded-md p-3 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role Name
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter role name"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Adding Role..." : "Add Role"}
              </button>
            </form>
          </div>

          {/* Roles Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Existing Roles
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {roles.map((role: any) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {role.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {role.role}
                      </td>
                    </tr>
                  ))}
                  {roles.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-3 text-sm text-gray-500 text-center"
                      >
                        No roles found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
