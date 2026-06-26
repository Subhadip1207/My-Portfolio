import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CalendarDays, BriefcaseBusiness } from 'lucide-react';

const TimeLine = () => {
  const [timeLines, setTimeLines] = useState([]);

  useEffect(() => {
    const getMyTimeLine = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/timeline/getall`,
          { withCredentials: true }
        );

        setTimeLines(data.timeLines);
      } catch (error) {
        console.log(error);
      }
    };

    getMyTimeLine();
  }, []);

  return (
    <section className="relative w-full py-10">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="
            text-4xl
            md:text-5xl
            lg:text-6xl
            font-extrabold
            bg-linear-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
            inline-block
            tracking-wide
          ">
            My Journey
          </h1>

          <div className="
            w-40
            h-1
            mx-auto
            mt-5
            rounded-full
            bg-linear-to-r
            from-cyan-400
            to-blue-500
          "></div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">

          {/* Vertical Line */}
          <div className="
            absolute
            left-4
            md:left-1/2
            top-0
            h-full
            w-1
            bg-linear-to-b
            from-cyan-500
            via-blue-500
            to-purple-500
            rounded-full
          "></div>

          {
            timeLines && timeLines.map((element, index) => (
              <div
                key={element._id}
                className={`
                  relative
                  flex
                  flex-col
                  md:flex-row
                  items-start
                  md:items-center
                  mb-16
                  animate-slideUp
                  ${index % 2 === 0 ? "md:flex-row-reverse" : ""}
                `}
              >

                {/* Timeline Dot */}
                <div className="
                  absolute
                  left-0
                  md:left-1/2
                  transform
                  md:-translate-x-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-linear-to-r
                  from-cyan-500
                  to-blue-600
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_25px_rgba(6,182,212,0.6)]
                  z-10
                ">
                  <CalendarDays className="text-white w-5 h-5" />
                </div>

                {/* Content Card */}
                <div className={`
                  ml-16
                  md:ml-0
                  md:w-[45%]
                  bg-slate-900/60
                  border
                  border-slate-700
                  backdrop-blur-lg
                  rounded-3xl
                  p-6
                  shadow-xl
                  hover:scale-[1.02]
                  hover:shadow-cyan-500/20
                  transition-all
                  duration-500
                `}>

                  {/* Date */}
                  <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-slate-800
                    border
                    border-slate-700
                    text-cyan-400
                    text-sm
                    font-medium
                    mb-5
                  ">
                    <CalendarDays className="w-4 h-4" />

                    <span>
                      {element.timeLine.from} - {" "}
                      {element.timeLine.to
                        ? element.timeLine.to
                        : "Present"}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <BriefcaseBusiness className="text-blue-400" />

                    <h3 className="
                      text-2xl
                      font-bold
                      text-white
                    ">
                      {element.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="
                    text-slate-300
                    leading-8
                    text-lg
                  ">
                    {element.description}
                  </p>

                </div>
              </div>
            ))
          }

        </div>
      </div>
    </section>
  );
};

export default TimeLine;