import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/skill/getall`,
        { withCredentials: true }
      );
      setSkills(data.skills);
    };

    getMySkills();
  }, []);

  return (
    <section className='w-full flex flex-col gap-10 sm:gap-14 overflow-hidden'>
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='relative flex justify-center'
      >
        <h1 className='
          text-transparent 
          bg-clip-text 
          bg-linear-to-r 
          from-cyan-400 
          via-blue-500 
          to-purple-500
          text-[2.3rem]
          sm:text-[3rem]
          md:text-[3.8rem]
          lg:text-[4.5rem]
          font-extrabold
          tracking-[10px]
          uppercase
          drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]
        '>
          Skills
        </h1>

        {/* Glow */}
        <div className='absolute w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full'></div>
      </motion.div>

      {/* Skills Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
        {
          skills && skills.map((element, index) => {
            return (
              <motion.div
                key={element._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
                whileHover={{
                  scale: 1.08,
                  y: -10
                }}
                viewport={{ once: true }}
              >
                <Card
                  className='
                    relative
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-lg
                    shadow-lg
                    rounded-3xl
                    p-6
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-5
                    transition-all
                    duration-500
                    hover:border-cyan-400/50
                    hover:shadow-cyan-500/30
                    group
                  '
                >
                  {/* Animated Background Glow */}
                  <div className='
                    absolute
                    inset-0
                    bg-linear-to-br
                    from-cyan-500/10
                    to-blue-500/10
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  '></div>

                  {/* Skill Icon */}
                  <motion.img
                    src={element.svg?.url}
                    alt={element.title}
                    className='
                      relative
                      h-14
                      sm:h-20
                      w-auto
                      object-contain
                      drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]
                    '
                    whileHover={{
                      rotate: 8,
                      scale: 1.15
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />

                  {/* Skill Title */}
                  <p className='
                    relative
                    text-center
                    text-sm
                    sm:text-base
                    font-semibold
                    tracking-wide
                    text-white
                    group-hover:text-cyan-300
                    transition-all
                    duration-300
                  '>
                    {element.title}
                  </p>

                  {/* Bottom Shine */}
                  <div className='
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-0
                    bg-linear-to-r
                    from-cyan-400
                    to-blue-500
                    group-hover:w-full
                    transition-all
                    duration-500
                  '></div>
                </Card>
              </motion.div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Skills;