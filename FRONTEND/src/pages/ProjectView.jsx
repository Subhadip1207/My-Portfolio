import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [stack, setStack] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [projectimage, setProjectimage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );

        setTitle(data.project.title);
        setDescription(data.project.description);
        setStack(data.project.stack);
        setTechnologies(data.project.technologies || []);
        setGithubLink(data.project.githubLink);
        setProjectLink(data.project.projectLink);
        setProjectimage(data.project.projectimage?.url || "");
      } catch (err) {
        toast.error(err.response?.data?.message || "Error loading project");
      }
    };

    getProject();
  }, [id]);

  const descriptionList = description ? description.split(".") : [];

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-10 flex justify-center items-center">

      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-cyan-500/20 blur-3xl rounded-full -top-25 -left-25" />
      <div className="absolute w-100 h-100 bg-purple-500/20 blur-3xl rounded-full -bottom-25 -right-25" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl"
      >

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h1>

        {/* Image */}
        <div className="overflow-hidden rounded-xl mb-6 group">
          <img
            src={projectimage || "/vite.svg"}
            alt={title}
            className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-cyan-300">Description</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {descriptionList.map((item, i) =>
              item.trim() ? (
                <li key={i}>{item}</li>
              ) : null
            )}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-purple-300">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20 hover:bg-cyan-500/20 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-300">Stack</h2>
          <p className="text-gray-300 mt-1">{stack}</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to={githubLink}
            target="_blank"
            className="flex-1 text-center px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-cyan-500/30 transition"
          >
            GitHub Repository
          </Link>

          <Link
            to={projectLink || "#"}
            target="_blank"
            className="flex-1 text-center px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-purple-500/30 transition"
          >
            Live Project
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default ProjectView;