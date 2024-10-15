import React from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons"; // Ant Design Icons for elegant icons
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const VisitUs = () => {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="p-8 mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold text-green-600">Visit Us</h1>{" "}
          {/* <p className="mt-4 text-xl text-gray-500">
            Learn more about Sobha Plantations and how you can engage with us.
          </p> */}
        </div>

        {/* Company Background Section */}
        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-bold text-green-700">
            Company Background
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Sobha Plantations is an 11-acre estate located in the lush region of
            Kurunegala, North Western Province. Specializing in coconuts with
            intercrops like banana, pepper, and papaya, the estate’s potential
            is hindered by remote management challenges. With a new web app, we
            aim to overcome logistical difficulties, improve employee and buyer
            interactions, and drive sustainable growth in a competitive market.
          </p>
        </section>

        {/* Interactive Map Section */}
        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-bold text-green-700">
            Our Location
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Sobha Plantations is located in Kurunegala, North Western Province,
            Sri Lanka. Come visit our lush coconut estate and explore the
            beautiful intercrops we cultivate.
          </p>

          {/* Embed a Map (Google Map or similar) */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126999.3385987278!2d80.2714587427639!3d7.48262597389739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33e73bf85c8d3%3A0xbd8a09bbbc4a8351!2sKurunegala%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1697292353380!5m2!1sen!2sus"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              title="Google Map of Sobha Plantations"
              className="border-none"
            />
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-bold text-green-700">
            Get in Touch
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Whether you're a buyer or just interested in visiting, reach out to
            us. We're happy to answer any questions you may have.
          </p>
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <EnvironmentOutlined
                style={{ fontSize: "32px", color: "#48BB78" }}
              />
              <span className="text-lg text-gray-600">
                Kurunegala, North Western Province, Sri Lanka
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <PhoneOutlined style={{ fontSize: "32px", color: "#48BB78" }} />
              <span className="text-lg text-gray-600">+94 71 058 8207</span>
            </div>
            <div className="flex items-center space-x-4">
              <MailOutlined style={{ fontSize: "32px", color: "#48BB78" }} />
              <span className="text-lg text-gray-600">
                info@sobhaplantations.com
              </span>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center">
          {/* <Link
            to="/contact"
            className="px-6 py-3 text-xl text-white transition duration-300 bg-green-600 rounded-full shadow-lg hover:bg-green-700"
          >
            Schedule a Visit
          </Link> */}
        </section>
      </div>
    </div>
  );
};

export default VisitUs;
