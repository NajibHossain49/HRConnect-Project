"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopBar from "../components/topbar/page";

interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
  address: string;
  myfile: File | null;
  roleId: string; // Added roleId field
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    address: "",
    myfile: null,
    roleId: "", // Default empty
  });
  const [roles, setRoles] = useState<{ id: string; role: string }[]>([]); // State for roles
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
        const token = localStorage.getItem('token'); // Fetch token from localStorage
        if (!token) {
            throw new Error("No token found! Please login first.");
        }
        try {
            const response = await axios.get("http://localhost:3444/role/showrole", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRoles(response.data); // Assuming the API returns an array of roles
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append("name", formData.name);
        formDataObject.append("email", formData.email);
        formDataObject.append("username", formData.username);
        formDataObject.append("password", formData.password);
        formDataObject.append("address", formData.address);
        formDataObject.append("role", formData.roleId); // Add roleId to formData
        if (formData.myfile) {
          formDataObject.append("myfile", formData.myfile);
        }

        const response = await axios.post(
          "http://localhost:3444/auth/signup",
          formDataObject
        );

        if (response) {
            alert("Signup successful!"); // Show success message
        } else {
            alert("Signup failed. Please try again."); // Show failure message
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        const files = (e.target as HTMLInputElement).files;
        setFormData({ ...formData, [name]: files ? files[0] : null });
        setErrors({ ...errors, [name]: null });
    } else {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    }
};

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.username) {
      errors.username = "UserName is required";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (!formData.roleId) {
      errors.roleId = "Role is required";
    }

    return errors;
  };

  return (
    <>
      <TopBar />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
          <h1 className="">Add New Employee</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Name */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          {/* Username */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>

          {/* Address */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Address"
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
          </div>

          {/* Password */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          {/* File */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              type="file"
              id="myfile"
              name="myfile"
              onChange={handleInputChange}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            />
          </div>

          {/* Role Dropdown */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <select
              id="roleId"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role}
                </option>
              ))}
            </select>
            {errors.roleId && <p className="text-red-500 text-xs italic">{errors.roleId}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-active">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
