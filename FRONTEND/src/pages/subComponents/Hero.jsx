import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';

import { BsInstagram } from "react-icons/bs";
import { FaLinkedin, FaSquareFacebook, FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";
import { ExternalLink, Sparkles } from 'lucide-react';
import { VscGlobe } from "react-icons/vsc";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          `https://my-portfolio-backend-krvn.onrender.com/api/v1/user/me/portfolio`,
          { withCredentials: true }
        );

        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getMyProfile();
  }, []);

  return (
    <section className="relative w-full overflow-hidden  -mt-25">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-14">

        {/* Left Content */}
        <div className="flex-1">

          {/* Online Status */}
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <span className="bg-green-400 rounded-full h-3 w-3 shadow-[0_0_20px_#22c55e]"></span>

            <p className="text-slate-300 tracking-widest uppercase text-sm">
              Available For Work
            </p>
          </div>

          {/* Heading */}
          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-extrabold
            mb-6
            leading-tight
            animate-fadeIn
          ">
            Hi, I'm{" "}
            <span className="
              whitespace-nowrap
              bg-linear-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            ">
              {user.fullName}
            </span>
          </h1>

          {/* Typewriter */}
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-cyan-400 animate-spin-slow" />

            <h2 className="
              text-xl
              sm:text-2xl
              md:text-3xl
              font-bold
              tracking-[4px]
              text-cyan-400
            ">
              <Typewriter
                words={[
                  "FULL STACK DEVELOPER",
                  "MERN STACK DEVELOPER",
                  "AI & ML ENTHUSIAST",
                  "JAVA PROGRAMMER"
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </h2>
          </div>

          {/* About */}
          <p className="
            text-slate-300
            text-lg
            leading-9
            max-w-3xl
            mb-10
            animate-slideUp
          ">
            {user.aboutMe}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mb-10">

            <a
              href={user.githubURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="
                rounded-full
                px-8
                py-6
                text-lg
                bg-linear-to-r
                from-slate-800
                to-slate-900
                border
                border-slate-700
                hover:scale-105
                transition-all
                duration-300
                shadow-lg
                text-amber-50
              ">
                <FaSquareGithub className="mr-2 text-2xl text-amber-50" />
                GitHub
              </Button>
            </a>

            <a
              href={user.resume?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="
                rounded-full
                px-8
                py-6
                text-lg
                bg-linear-to-r
                from-cyan-500
                to-blue-600
                hover:scale-105
                transition-all
                duration-300
                shadow-[0_0_30px_rgba(6,182,212,0.4)]
              ">
                <ExternalLink className="mr-2" />
                Resume
              </Button>
            </a>

          </div>

          {/* Social Icons */}
          <div className="
            flex
            items-center
            gap-6
            bg-slate-900/60
            border
            border-slate-700
            backdrop-blur-lg
            px-8
            py-5
            rounded-3xl
            w-fit
            shadow-xl
          ">

            <a
              href={user.instagramURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-all duration-300"
            >
              <BsInstagram className="text-pink-500 w-8 h-8" />
            </a>

            <a
              href={user.facebookURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-all duration-300"
            >
              <FaSquareFacebook className="text-blue-500 w-8 h-8" />
            </a>

            <a
              href={user.linkedInURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-all duration-300"
            >
              <FaLinkedin className="text-sky-400 w-8 h-8" />
            </a>


            <a
              href={user.codingPlatformURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-all duration-300"
            >
              <VscGlobe className="text-green-400 w-8 h-8" />
            </a>


            <a
              href={user.twitterURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-all duration-300"
            >
              <FaSquareXTwitter className="text-white w-8 h-8" />
            </a>

          </div>
        </div>

        {/* Right Side Decorative Card */}
        <div className="flex-1 flex justify-center items-center">

          <div className="
            relative
            w-[320px]
            h-80
            rounded-full
            bg-linear-to-br
            from-cyan-500
            via-blue-600
            to-purple-700
            p-1
            animate-float
            shadow-[0_0_80px_rgba(6,182,212,0.5)]
          ">

            <div className="
              w-full
              h-full
              rounded-full
              bg-[#020817]
              flex
              items-center
              justify-center
              text-center
              border
              border-slate-700
            ">
              <div>
                <h2 className="
                  text-7xl
                  font-black
                  bg-linear-to-r
                  from-cyan-400
                  to-blue-500
                  bg-clip-text
                  text-transparent
                ">
                  {user.fullName?.charAt(0)}
                </h2>

                <p className="mt-4 text-slate-400 tracking-[5px] uppercase">
                  Developer
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <hr className="border-slate-800 my-14" />
    </section>
  );
};

export default Hero;