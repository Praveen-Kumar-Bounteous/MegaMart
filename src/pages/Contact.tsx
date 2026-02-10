import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0077C0] via-[#0077C0]/90 to-[#FAFAFA] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-white/90 text-center mb-10">
          We'd love to hear from you! Fill out the form below and we'll get back to you.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077C0]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077C0]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#0077C0]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0077C0] text-white rounded-md font-semibold hover:bg-blue-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
