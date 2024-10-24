import React from 'react';

const ContactUs = () => {
  const address = '1234 Example St, City, USA'; // Replace with your actual address

  return (
    <div className="min-h-screen bg-primary bg-cover bg-center p-10 md:px-20 lg:px-40">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-primary mb-5">Get in Touch</h3>
          <form action="" className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                rows={5}
                placeholder="Enter your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-all w-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Map Image */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-primary mb-5">
            Contact Information
          </h3>
          <p className="mb-5">
            Feel free to reach out to us for any inquiries or support.
          </p>
          <ul className="space-y-3">
            <li>
              <span className="font-bold">Email:</span> support@example.com
            </li>
            <li>
              <span className="font-bold">Phone:</span> +1 123 456 7890
            </li>
            <li>
              <span className="font-bold">Address:</span> {address}
            </li>
          </ul>

          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-3">Find Us on the Map</h4>
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="map.jpeg" // Replace with your actual image path
                alt="Google Map Location"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
