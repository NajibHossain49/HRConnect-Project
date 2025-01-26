"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../components/topbar/page";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]); // State to store roles

  const fetchRoles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3444/role/showrole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      if (response.status === 200) {
        setRoles(response.data); // Assuming the response contains an array of roles
      }
    } catch (error: any) {
      console.error("Error fetching roles:", error);
      setError("Failed to fetch roles. Please try again.");
    }
    };

  useEffect(() => {
    fetchRoles(); // Fetch roles when the component mounts
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!formData.role.trim()) {
      setError("Role name is required");
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
        setSuccessMessage("Role added successfully!");
        setFormData({ role: "" }); // Reset form
        fetchRoles(); // Fetch roles again to update the list
        router.push("/role"); // Replace with the route to list roles
      } else {
        setError("Failed to add the role. Please try again.");
      }
    } catch (error: any) {
      console.error("Error adding role:", error);
      setError(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <TopBar />
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">Add Role</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role Name
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter role name"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
              Add Role
            </button>
          </div>
        </form>

        <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">All Roles</h2>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full shadow-xl">
            <thead>
                <tr>
                <th>Role ID</th>
                <th>Role Name</th>
                </tr>
            </thead>
            <tbody>
                {roles.map((role: any, index: number) => (
                <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.role}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
      </div>
    </>
  );
}
