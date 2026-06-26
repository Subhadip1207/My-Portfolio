import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink} from 'lucide-react';
import { IoLogoGithub } from "react-icons/io5";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        `https://my-portfolio-bckend.onrender.com/api/v1/project/getall`,
        { withCredentials: true }
      );

      setProjects(data.projects);
    };

    getMyProjects();
  }, []);

  const displayedProjects = viewAll
    ? projects
    : projects.slice(0, 9);

  return (
    <section className='w-full overflow-hidden'>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='relative mb-16 flex justify-center'
      >
        <h1
          className='
            text-transparent
            bg-clip-text
            bg-linear-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            text-[2.3rem]
            sm:text-[3rem]
            md:text-[4rem]
            lg:text-[4.8rem]
            font-extrabold
            tracking-[8px]
            uppercase
            drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]
          '
        >
          Portfolio
        </h1>

        {/* Glow */}
        <div className='absolute w-52 h-52 bg-blue-500/20 blur-3xl rounded-full'></div>
      </motion.div>

      {/* Portfolio Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
        {
          displayedProjects &&
          displayedProjects.map((element, index) => {
            return (
              <motion.div
                key={element._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className='group'
              >
                <Link to={`/project/${element._id}`}>
                  
                  <div
                    className='
                      relative
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                      backdrop-blur-lg
                      shadow-xl
                    '
                  >

                    {/* Project Image */}
                    <div className='overflow-hidden'>
                      <motion.img
                        src={element.projectimage?.url}
                        alt={element.title}
                        className='
                          w-full
                          h-62.5
                          object-cover
                          transition-all
                          duration-700
                          group-hover:scale-110
                        '
                      />
                    </div>

                    {/* Overlay */}
                    <div
                      className='
                        absolute
                        inset-0
                        bg-black/70
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-500
                        flex
                        flex-col
                        justify-center
                        items-center
                        text-center
                        p-6
                      '
                    >

                      <h2
                        className='
                          text-2xl
                          font-bold
                          text-white
                          mb-3
                          tracking-wide
                        '
                      >
                        {element.title}
                      </h2>

                      <p
                        className='
                          text-sm
                          text-gray-300
                          mb-5
                          line-clamp-3
                        '
                      >
                        {element.description}
                      </p>

                      {/* Buttons */}
                      <div className='flex gap-3 flex-wrap justify-center'>

                        {
                          element.githubLink && (
                            <a
                              href={element.githubLink}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Button
                                className='
                                  rounded-full
                                  bg-white/10
                                  border
                                  border-white/20
                                  hover:bg-white/20
                                  backdrop-blur-md
                                  flex
                                  items-center
                                  gap-2
                                '
                              >
                                <IoLogoGithub size={18} />
                                Github
                              </Button>
                            </a>
                          )
                        }

                        {
                          element.projectLink && (
                            <a
                              href={element.projectLink}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Button
                                className='
                                  rounded-full
                                  bg-cyan-500
                                  hover:bg-cyan-400
                                  text-black
                                  font-semibold
                                  flex
                                  items-center
                                  gap-2
                                '
                              >
                                <ExternalLink size={18} />
                                Live Demo
                              </Button>
                            </a>
                          )
                        }

                      </div>
                    </div>

                    {/* Bottom Glow */}
                    <div
                      className='
                        absolute
                        bottom-0
                        left-0
                        h-1
                        w-0
                        bg-linear-to-r
                        from-cyan-400
                        via-blue-500
                        to-purple-500
                        group-hover:w-full
                        transition-all
                        duration-500
                      '
                    ></div>
                  </div>
                </Link>
              </motion.div>
            )
          })
        }
      </div>

      {/* Show More Button */}
      {
        projects && projects.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className='w-full flex justify-center mt-12'
          >
            <Button
              onClick={() => setViewAll(!viewAll)}
              className='
                px-10
                py-6
                rounded-full
                text-lg
                font-semibold
                bg-linear-to-r
                from-cyan-500
                to-blue-600
                hover:scale-105
                transition-all
                duration-300
                shadow-lg
                shadow-cyan-500/30
              '
            >
              {viewAll ? "Show Less" : "View More"}
            </Button>
          </motion.div>
        )
      }
    </section>
  )
}

export default Portfolio;