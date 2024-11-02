import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const githubUrl = "https://github.com/ryanvandrunen/327-Group34-CH";

  return (
    <section className="bg-white text-gray-800 py-4 border-t border-gray-200 relative z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-sm">
          © {currentYear} Roam. All rights reserved.
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer p-2"
          aria-label="GitHub Repository"
          onClick={() => window.open(githubUrl, "_blank")}
        >
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Footer;
