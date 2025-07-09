// GET /api/user/complaints/:id

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
  FaBell,
  FaChartBar,
  FaLock,
  FaArrowRight,
  FaUser,
  FaPaperPlane,
  FaUserPlus,
  FaLightbulb,
  FaTasks,
  FaCommentDots,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  console.log(admin)

  const handleRaiseComplaint = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: <FaCheckCircle className="text-5xl text-teal-800 mb-6" />,
      title: "Effortless Submission",
      desc: "Quickly lodge complaints with intuitive forms and smart suggestions.",
    },
    {
      icon: <FaChartLine className="text-5xl text-teal-800 mb-6" />,
      title: "Progress at a Glance",
      desc: "Track your complaint status in real-time from any device, securely.",
    },
    {
      icon: <FaTasks className="text-5xl text-teal-800 mb-6" />,
      title: "Seamless Coordination",
      desc: "Automatic routing to relevant departments ensures faster resolution.",
    },
    {
      icon: <FaBell className="text-5xl text-teal-800 mb-6" />,
      title: "Stay Informed",
      desc: "Receive immediate updates via email and SMS on complaint milestones.",
    },
    {
      icon: <FaChartBar className="text-5xl text-teal-800 mb-6" />,
      title: "Insightful Analytics",
      desc: "Admins gain valuable insights from detailed complaint statistics and reports.",
    },
    {
      icon: <FaLock className="text-5xl text-teal-800 mb-6" />,
      title: "Trusted Security",
      desc: "Your data is protected with robust encryption and privacy-focused policies.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Submitting my issue was so straightforward, and the live updates kept me in the loop. A fantastic platform!",
      name: "Priya Verma",
      role: "Resident",
      avatar: "/api/placeholder/100/100",
    },
    {
      quote:
        "The administrative tools have significantly improved our department's efficiency in handling grievances. Highly effective!",
      name: "Suresh Kumar",
      role: "Admin Officer",
      avatar: "/api/placeholder/100/100",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">

      {/* Hero Section - Teal Forest with Vanilla Latte Accent */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-700 text-amber-50 py-24 relative overflow-hidden">
        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="animate-fade-in-down">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Your Voice Matters. <br />{" "}
              <span className="text-amber-100">Get Heard. Get Resolved.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light opacity-80">
              We provide a transparent and efficient platform to address your
              concerns promptly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <Link
              to={'/user/dashboard'}
                className="group bg-amber-200 text-teal-800 font-semibold py-4 px-8 rounded-full hover:bg-amber-100 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <FaPaperPlane className="text-lg group-hover:animate-bounce" />
                <span>File a Complaint</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
              <Link
                to={'/user/register'}
                className="group bg-teal-900 text-amber-100 font-semibold py-4 px-8 rounded-full hover:bg-teal-800 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <FaUserPlus className="text-lg" />
                <span>Register</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle Background Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 sm:h-32 md:h-40"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 256V0L1440 160V320H0Z"
              fill="rgba(245, 235, 224, 0.1)"
            />
          </svg>
        </div>
      </section>

      {/* About Section - Vanilla Latte and Teal Forest */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-6">About Our System</h2>
          <p className="text-lg text-teal-900 leading-relaxed mb-8 max-w-2xl mx-auto">
            We are committed to providing a seamless and transparent platform for
            managing complaints. Our system is designed to empower users and
            facilitate efficient resolution by relevant authorities.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="bg-amber-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <FaLightbulb className="text-3xl text-teal-700 mb-3" />
              <h3 className="text-xl font-semibold text-teal-800">Our Vision</h3>
              <p className="text-teal-700">To create a more accountable and responsive environment.</p>
            </div>
            <div className="bg-amber-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <FaTasks className="text-3xl text-teal-700 mb-3" />
              <h3 className="text-xl font-semibold text-teal-800">Our Mission</h3>
              <p className="text-teal-700">To simplify complaint management for everyone involved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Vanilla Latte and Teal Forest */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-amber-50 rounded-lg shadow-md p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              >
                <div className="text-teal-800 text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-teal-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Vanilla Latte and Teal Forest */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="relative mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-teal-700 text-amber-100 font-bold flex items-center justify-center text-2xl shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mt-4">Submit</h3>
              <p className="text-teal-700">Describe your issue.</p>
            </div>
            <div className="hidden md:block text-amber-200 text-2xl">&rarr;</div>
            <div className="relative mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-teal-700 text-amber-100 font-bold flex items-center justify-center text-2xl shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mt-4">Track</h3>
              <p className="text-teal-700">Follow the progress.</p>
            </div>
            <div className="hidden md:block text-amber-200 text-2xl">&rarr;</div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-teal-700 text-amber-100 font-bold flex items-center justify-center text-2xl shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mt-4">Resolve</h3>
              <p className="text-teal-700">Get your issue addressed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Vanilla Latte and Teal Forest */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-amber-50 rounded-lg shadow-md p-8 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <FaCommentDots className="text-teal-700 text-3xl mb-4" />
                <p className="text-lg italic text-teal-800 mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto border-t border-amber-200 pt-4">
                  <h4 className="font-semibold text-teal-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-teal-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Vanilla Latte and Teal Forest */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">Contact Us</h2>
          <p className="text-lg text-teal-700 mb-10 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to our support team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Email</h3>
              <p className="text-teal-700">complainthub123@gmail.com</p>
            </div>
            <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Phone</h3>
              <p className="text-teal-700">+91 9876543210</p>
            </div>
            <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Address</h3>
              <p className="text-teal-700">123 ISBT, Bhopal, India</p>
            </div>
          </div>
          <button className="bg-teal-700 text-amber-50 font-semibold py-3 px-6 rounded-full hover:bg-teal-800 transition-all duration-300 mt-8 shadow-md">
            Send us a Message
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;