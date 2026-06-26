import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  BrainCircuit,
  Rocket,
  Code2,
} from 'lucide-react';

const About = () => {
  const [user, setUser] = useState({});
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          `https://my-portfolio-bckend.onrender.com/api/v1/user/me/portfolio`,
          { withCredentials: true }
        );

        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    const getMyLanguages = async () => {
      try {
        const { data } = await axios.get(
          `https://my-portfolio-bckend.onrender.com/api/v1/language/getall`,
          { withCredentials: true }
        );

        setLanguages(data.languages || []);
      } catch (error) {
        console.log(error);
      }
    };

    getMyProfile();
    getMyLanguages();
  }, []);

  return (
    <section className="relative w-full py-20 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="
            inline-flex
            items-center
            gap-4
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-black
            tracking-[8px]
          ">
            <span className="text-white">
              ABOUT
            </span>

            <span className="
              bg-linear-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            ">
              ME
            </span>
          </h1>

          <div className="
            w-40
            h-1
            mx-auto
            mt-6
            rounded-full
            bg-linear-to-r
            from-cyan-400
            to-blue-500
          "></div>
        </div>

        {/* Top Layout */}
        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
          items-center
        ">

          {/* LEFT CARD - Interests */}
          <div className="
            bg-slate-900/70
            border
            border-slate-700
            rounded-[35px]
            p-8
            backdrop-blur-xl
            shadow-2xl
            hover:shadow-cyan-500/20
            transition-all
            duration-500
            h-full
          ">

            <div className="flex items-center gap-4 mb-8">
              <BrainCircuit className="text-cyan-400 w-8 h-8" />

              <h2 className="text-3xl font-bold text-white">
                My Interests
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">

              {
                [
                  "Full Stack Development",
                  "Machine Learning",
                  "Deep Learning",
                  "Artificial Intelligence",
                  "Cloud Computing",
                  "Spring Boot",
                  "System Design"
                ].map((item, index) => (
                  <span
                    key={index}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-linear-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      text-sm
                      font-medium
                      shadow-lg
                      hover:scale-110
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    {item}
                  </span>
                ))
              }

            </div>
          </div>

          {/* CENTER CARD - Profile */}
          <div className="
            relative
            group
            flex
            flex-col
            items-center
          ">

            {/* Glow */}
            <div className="
              absolute
              -inset-2
              rounded-[40px]
              bg-linear-to-r
              from-cyan-500
              via-blue-500
              to-purple-600
              blur-xl
              opacity-30
              group-hover:opacity-50
              transition-all
              duration-500
            "></div>

            {/* Profile Card */}
            <div className="
              relative
              bg-slate-900/80
              border
              border-slate-700
              rounded-[40px]
              p-6
              overflow-hidden
              backdrop-blur-xl
              shadow-2xl
              w-full
            ">

              <img
                src={user.avatar?.url}
                alt={user.fullName}
                className="
                  w-full
                  h-125
                  object-cover
                  rounded-[30px]
                  transition-all
                  duration-700
                  group-hover:scale-105
                "
              />

              <div className="mt-6 text-center">
                <h2 className="text-3xl font-bold text-white">
                  {user.fullName}
                </h2>

                <p className="text-slate-400 mt-2 text-lg">
                  Full Stack Developer & ML Enthusiast
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT CARD - Languages */}
          <div
            className="
              bg-slate-900/70
              border
              border-slate-700
              rounded-[35px]
              p-8
              backdrop-blur-xl
              shadow-2xl
              hover:shadow-blue-500/20
              transition-all
              duration-500
              h-full
            "
          >

            {/* Heading */}
            <div className="flex items-center gap-4 mb-8">
              <Code2 className="text-blue-400 w-8 h-8" />

              <h2 className="text-3xl font-bold text-white">
                Languages
              </h2>
            </div>

            {/* Languages List */}
            <div className="flex flex-col gap-5">

              {
                languages.length > 0 ? (
                  languages.map((lang, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-4
                        bg-slate-800/80
                        border
                        border-slate-700
                        rounded-2xl
                        px-5
                        py-4
                        hover:border-blue-500
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                        shadow-lg
                        group
                      "
                    >

                      {/* Language Icon */}
                      <div
                        className="
                          w-14
                          h-14
                          rounded-xl
                          bg-slate-900
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                          border
                          border-slate-700
                          group-hover:border-cyan-400
                          transition-all
                          duration-300
                        "
                      >
                        <img
                          src={lang.svg?.url}
                          alt={lang.title}
                          className="
                            w-8
                            h-8
                            object-contain
                          "
                        />
                      </div>

                      {/* Language Title */}
                      <div>
                        <h3
                          className="
                            text-lg
                            font-semibold
                            text-white
                          "
                        >
                          {lang.title}
                        </h3>

                        <p className="text-slate-400 text-sm">
                          Programming Language
                        </p>
                      </div>

                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">
                    No languages found.
                  </p>
                )
              }

            </div>
          </div>

        </div>

        {/* Bottom Full Width Card */}
        <div className="mt-10">

          <div className="
            bg-slate-900/70
            border
            border-slate-700
            rounded-[35px]
            p-10
            backdrop-blur-xl
            shadow-2xl
            hover:shadow-purple-500/20
            transition-all
            duration-500
            w-full
          ">

            <div className="flex items-center gap-4 mb-8">
              <Rocket className="text-purple-400 w-8 h-8" />

              <h2 className="text-4xl font-bold text-white">
                Flexibility & Passion
              </h2>
            </div>

            <p className="
              text-slate-300
              leading-10
              text-lg
              md:text-xl
            ">
              I love learning new technologies and building modern,
              scalable, and impactful applications. I continuously
              explore innovative solutions in web development and
              machine learning while maintaining a strong focus on
              clean UI design and user experience.

              <br />
              <br />

              I enjoy solving real-world problems, creating visually
              engaging interfaces, and developing high-performance
              applications that deliver meaningful user experiences.
              My passion for innovation motivates me to constantly
              improve my technical skills and stay updated with
              emerging technologies.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;