import React from "react";

interface StaffData {
  filename: string;
  name: string;
  userid: string;
  username: string;
  email: string;
  address: string;
  role: {
    role: string;
  };
}

interface StaffCardProps {
  data: StaffData;
}

export default function StaffCard({ data }: StaffCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <img
            src={"http://localhost:3444/user/getimage/" + data.filename}
            alt={data.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-blue-100"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h2>
          <div className="space-y-2 text-gray-600">
            <p className="flex items-center">
              <span className="font-semibold w-24">ID:</span>
              <span>{data.userid}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">Username:</span>
              <span>{data.username}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">Email:</span>
              <span className="text-blue-600">{data.email}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">Address:</span>
              <span>{data.address}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">Role:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {data.role.role}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
