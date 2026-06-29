import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        `https://my-portfolio-bckend.onrender.com/api/v1/softwareapplication/getall`,
        { withCredentials: true }
      );

      setApps(data.softwareApplications);
    };

    getMyApps();
  }, []);

  return (
    <section className='w-full flex flex-col gap-10 sm:gap-16 overflow-hidden'>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='relative flex justify-center'
      >
        <div className='relative flex items-center gap-4'>

          <Sparkles
            className='
              text-cyan-400
              w-10
              h-10
              animate-pulse
            '
          />

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
              tracking-[10px]
              uppercase
              drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]
            '
          >
            KNOWN SOFTWARES
          </h1>

          <Sparkles
            className='
              text-purple-400
              w-10
              h-10
              animate-pulse
            '
          />

          {/* Glow Background */}
          <div className='absolute w-60 h-60 bg-blue-500/20 blur-3xl rounded-full -z-10'></div>
        </div>
      </motion.div>

      {/* Apps Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>

        {
          apps && apps.map((element, index) => {
            return (
              <motion.div
                key={element._id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
                whileHover={{
                  y: -12,
                  scale: 1.05
                }}
                viewport={{ once: true }}
                className='group'
              >

                <Card
                  className='
                    relative
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    rounded-3xl
                    shadow-xl
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
                  '
                >

                  {/* Animated Glow */}
                  <div
                    className='
                      absolute
                      inset-0
                      bg-linear-to-br
                      from-cyan-500/10
                      via-blue-500/10
                      to-purple-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                    '
                  ></div>

                  {/* Floating Background Circle */}
                  <div
                    className='
                      absolute
                      -top-10
                      -right-10
                      w-28
                      h-28
                      bg-cyan-500/10
                      rounded-full
                      blur-2xl
                      group-hover:scale-150
                      transition-all
                      duration-700
                    '
                  ></div>

                  {/* App Icon */}
                  <motion.img
                    src={element.svg?.url}
                    alt={element.name}
                    className='
                      relative
                      h-16
                      sm:h-20
                      md:h-24
                      w-auto
                      object-contain
                      drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
                    '
                    whileHover={{
                      rotate: 8,
                      scale: 1.15
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300
                    }}
                  />

                  {/* App Name */}
                  <h2
                    className='
                      relative
                      text-center
                      text-sm
                      sm:text-base
                      font-bold
                      tracking-wide
                      text-white
                      group-hover:text-cyan-300
                      transition-all
                      duration-300
                    '
                  >
                    {element.name}
                  </h2>

                  {/* Shine Line */}
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

                </Card>
              </motion.div>
            )
          })
        }

      </div>
    </section>
  )
}

export default MyApps;