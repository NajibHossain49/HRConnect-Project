"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TopBar from "../components/topbar/page";

interface User {
  userid: string;
  name: string;
  email: string;
  username: string;
  address: string;
  filename: string;
  role: {
    id: number;
    role: string;
  };
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
          const response = await axios.get('http://localhost:3444/user/getusers/' + username, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/signin');
      }
    };

    fetchUserData();
  }, [router]);

  // Example quick actions
  const quickActions = [
    {
      icon: "📊",
      title: "View Analytics",
      description: "Check your team's performance and insights.",
      link: "#",
    },
    {
      icon: "📅",
      title: "Manage Schedule",
      description: "Organize your team's tasks and deadlines.",
      link: "#",
    },
    {
      icon: "📝",
      title: "Create Report",
      description: "Generate and share reports with your team.",
      link: "#",
    },
    {
      icon: "📩",
      title: "Send Announcement",
      description: "Communicate important updates to your team.",
      link: "#",
    },
  ];

  // Example recent activities
  const recentActivities = [
    {
      id: 1,
      type: "Task Completed",
      description: "You completed the Q3 financial report.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "New Message",
      description: "You received a message from Jane Smith.",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "Team Update",
      description: "Your team added a new member, Alex Johnson.",
      timestamp: "1 day ago",
    },
  ];

  if (!user) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={'http://localhost:3444/user/getimage/' + user.filename}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">{user.role.role}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{action.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{action.title}</h2>
                <p className="text-gray-600 mb-4">{action.description}</p>
                <a
                  href={action.link}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Go to {action.title} →
                </a>
              </div>
            ))}
          </div>

          {/* Recent Activities Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">📌</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{activity.type}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}