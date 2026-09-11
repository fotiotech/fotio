"use client";

import Image from "next/image";

const ProjectSection = () => {
  return (
    <section id="project" className="m-4 bg-gray-50 p-8 rounded-lg shadow-md">
      <h2 className="font-semibold text-3xl text-gray-800 mb-6">Projects</h2>

      <a
        href="http://novaorizon.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center mb-4"
      >
        <Image
          src="/logo1.png"
          alt="Project Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </a>

      <p className="text-xl text-center text-gray-700">
        Your powerful <br /> e-commerce app
      </p>
    </section>
  );
};

export default ProjectSection;
