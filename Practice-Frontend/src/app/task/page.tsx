"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../components/topbar/page";
import Link from "next/link";

interface TaskFormData {
  title: string;
  description: string;
  assignedTo: string;
}

interface Employee {
  userid: string;
  name: string;
}

export default function AddTask() {
  const router = useRouter();
  const [formData, setFormData] = useState<TaskFormData>({ title: "", description: "", assignedTo: "" });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]); // State to store employees

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3444/user/all_staffs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(response.data);
      if (response.status === 200) {
        setEmployees(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees when the component mounts
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("All fields are required.");
      return;
    }

    const assignedToArray = formData.assignedTo.split(",").map(id => id.trim());

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3444/user/asigntask",
        {
          title: formData.title,
          description: formData.description,
          assignedTo: assignedToArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        setSuccessMessage("Task assigned successfully!");
        setFormData({ title: "", description: "", assignedTo: "" }); // Reset form
        router.push("/task"); // Navigate to task list page (update the route accordingly)
      } else {
        setError("Failed to assign the task. Please try again.");
      }
    } catch (error: any) {
      console.error("Error assigning task:", error);
      setError(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handletask = () => {
    router.push('/viewTask');
};

  return (
    <>
      <TopBar />
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">Assign Task</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter task title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              placeholder="Enter task description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="assignedTo" className="block text-gray-700 text-sm font-bold mb-2">
              Assign to (Employee IDs, comma separated):
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter employee IDs"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
              Assign Task
            </button>
            <button
                className=" hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handletask}>
                View Assigned Task
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Available Employees</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full shadow-xl">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.userid}>
                    <td>{employee.userid}</td>
                    <td>{employee.name}</td>
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
