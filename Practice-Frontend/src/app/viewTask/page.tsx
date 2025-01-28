"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import TopBar from "../components/topbar/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdBy: {
    userid: number;
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string;
  } | null;
  assignedTo: Array<{
    userid: number;
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string;
  }> | null;
}

export default function ViewTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3444/user/alltasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again.");
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateTask = async (taskId: number, currentStatus: string) => {
    const token = localStorage.getItem("token");
    let newStatus = "";

    // Determine the next status based on the current status
    if (currentStatus === "Not Started") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed";
    } else {
      toast.warning("This task is already completed!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3444/user/updatetask/stutus/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        fetchTasks(); // Refresh tasks after update
        toast.success(`Task status updated to "${newStatus}" successfully!`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task progress. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://localhost:3444/user/deletetask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Task deleted successfully!");
        fetchTasks(); // Refresh the task list
      } else {
        toast.error(response.data.message || "Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <>
      <TopBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          All Tasks
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.createdBy?.name ? (
                      <div className="font-semibold">{task.createdBy.name}</div>
                    ) : (
                      <div className="text-gray-500">N/A</div>
                    )}
                    {task.createdBy?.email && (
                      <div className="text-gray-600">{task.createdBy.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.assignedTo && task.assignedTo.length > 0 ? (
                      task.assignedTo.map((user) => (
                        <div key={user.userid} className="mb-2">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-gray-600">{user.email}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No assignees</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleUpdateTask(task.id, task.status)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 transition-colors"
                    >
                      Update Progress
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}