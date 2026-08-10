"use client";

import { submitContactForm } from "@/app/actions/getintouch";
import Image from "next/image";
import { FormEvent, useState, useTransition } from "react";

const Services = () => {
  type ContactFormErrors = {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    contact?: string[];
    message?: string[];
  };

  type ContactFormState = {
    success: boolean;
    errors: ContactFormErrors | null;
    message?: string;
  };

  const [state, setState] = useState<ContactFormState>({
    success: false,
    errors: null,
    message: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      submitContactForm(formData).then((result) =>
        setState(result as ContactFormState),
      );
    });
  };

  return (
    <section id="service" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Services
      </h2>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Service 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <Image
              src="/social.jpg"
              alt="Website Development"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Website Development
          </h3>
          <p className="text-gray-600">
            From simple and elegant designs to complex e-commerce platforms, we
            craft websites that not only look great but also drive results. Our
            team of experienced developers and designers will work closely with
            you to create a website that reflects your brand, engages your
            audience, and converts visitors into customers.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <Image
              src="/trading.jpg"
              alt="Software Development"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Software Development
          </h3>
          <p className="text-gray-600">
            Need a custom software solution to streamline your business
            processes or enhance your customer experience? We've got you
            covered. We develop robust and scalable software applications
            tailored to your specific requirements, ensuring efficiency,
            reliability, and seamless integration with your existing systems.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <Image
              src="/desktop.jpg"
              alt="SEO (Search Engine Optimization)"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            SEO (Search Engine Optimization)
          </h3>
          <p className="text-gray-600">
            In today's competitive online landscape, getting found on search
            engines is essential for business success. Our SEO experts employ
            proven strategies to improve your website's visibility, drive
            organic traffic, and boost your rankings on search engine results
            pages (SERPs). From keyword research and on-page optimization to
            content creation and link building, we'll help you climb the search
            rankings and stay ahead of the competition.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 text-center p-6">
        <h4 className="text-2xl font-semibold text-gray-800 mb-6">
          Why Choose Us?
        </h4>
        <ul className="space-y-4 text-gray-600">
          <li>
            <span className="font-semibold">Experience:</span> With years of
            experience in the industry, we have the knowledge and expertise to
            deliver top-notch digital solutions.
          </li>
          <li>
            <span className="font-semibold">Customization:</span> We understand
            that every business is unique. That's why we take a personalized
            approach to every project, ensuring that our solutions align with
            your goals and objectives.
          </li>
          <li>
            <span className="font-semibold">Quality Assurance:</span> Our
            commitment to quality is unwavering. We follow best practices and
            industry standards to deliver high-quality, bug-free solutions that
            exceed your expectations.
          </li>
          <li>
            <span className="font-semibold">Customer Satisfaction:</span> Your
            satisfaction is our priority. We keep you involved throughout the
            development process, providing regular updates and seeking your
            feedback to ensure that the final product meets your requirements.
          </li>
        </ul>
      </div>

      {/* Get in Touch Form */}
      <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">
          Get in Touch
        </h4>
        <p className="text-gray-600 mb-6">
          Ready to take your digital presence to the next level? Contact us
          today to discuss your project and discover how we can help you achieve
          your goals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="joe@gmail.com"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            className="border border-gray-300 p-3 rounded-md w-full h-32"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Display feedback messages */}
        {state?.errors && (
          <div className="mt-4 text-red-600">
            {Object.values(state.errors)
              .flat()
              .map((err, idx) => (
                <p key={idx}>{err as string}</p>
              ))}
          </div>
        )}
        {state?.success && (
          <div className="mt-4 text-green-600">
            <p>{state.message}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
