import React from 'react';
import { Users, PieChart, Calendar, MessageCircle } from 'lucide-react';
import NavBar from "./components/navbar/page";
import Footer from './components/Footer/page';

const Home = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Employee Management",
      description: "Streamline your workforce management with powerful tools for tracking, organizing, and optimizing employee data."
    },
    {
      icon: <PieChart className="w-12 h-12 text-blue-600" />,
      title: "Analytics Dashboard",
      description: "Make data-driven decisions with comprehensive HR analytics and visual reporting tools."
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-600" />,
      title: "Leave Management",
      description: "Efficiently manage employee time-off requests, attendance, and scheduling in one place."
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-blue-600" />,
      title: "Internal Communications",
      description: "Foster better workplace communication with integrated messaging and announcement tools."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your HR Operations
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Streamline your human resources management with our all-in-one platform
            </p>
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                Get Started
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Everything you need to manage your workforce
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">HR Tools</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to revolutionize your HR management?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust HRConnect to manage their workforce effectively
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
            Start Free Trial
          </button>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;