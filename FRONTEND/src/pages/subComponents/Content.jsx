import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Content = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    setLoading(true);

    await axios.post(
      `http://localhost:4000/api/v1/message/send`,
      { senderName, subject, message },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then((res) => {
      toast.success(res.data.message);

      setSenderName("");
      setSubject("");
      setMessage("");
      setLoading(false);
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    });
  }

  return (
    <section className='w-full overflow-hidden py-10'>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='relative flex justify-center mb-16'
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
            tracking-[10px]
            uppercase
            drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]
          '
        >
          Contact Me
        </h1>

        {/* Glow */}
        <div className='absolute w-56 h-56 bg-cyan-500/20 blur-3xl rounded-full'></div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='max-w-4xl mx-auto'
      >

        <div
          className='
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            p-6
            sm:p-10
          '
        >

          {/* Background Glow */}
          <div className='absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>
          <div className='absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full'></div>

          <form
            onSubmit={handleSendMessage}
            className='relative flex flex-col gap-8'
          >

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className='flex flex-col gap-3'
            >

              <Label className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                <User size={18} />
                Your Name
              </Label>

              <Input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name"
                className='
                  h-14
                  rounded-2xl
                  border-white/10
                  bg-white/5
                  backdrop-blur-md
                  text-white
                  placeholder:text-gray-400
                  focus-visible:ring-cyan-500
                  transition-all
                  duration-300
                '
              />
            </motion.div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className='flex flex-col gap-3'
            >

              <Label className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                <Mail size={18} />
                Subject
              </Label>

              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter message subject"
                className='
                  h-14
                  rounded-2xl
                  border-white/10
                  bg-white/5
                  backdrop-blur-md
                  text-white
                  placeholder:text-gray-400
                  focus-visible:ring-cyan-500
                '
              />
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className='flex flex-col gap-3'
            >

              <Label className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                <MessageSquare size={18} />
                Message
              </Label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={6}
                className='
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-md
                  p-4
                  text-white
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                  resize-none
                  transition-all
                  duration-300
                '
              ></textarea>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className='flex justify-center sm:justify-end'
            >

              {
                !loading ? (
                  <button
                    type='submit'
                    className='
                      group
                      relative
                      overflow-hidden
                      px-10
                      py-4
                      rounded-full
                      font-semibold
                      text-lg
                      bg-linear-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      shadow-lg
                      shadow-cyan-500/30
                      transition-all
                      duration-300
                      hover:scale-105
                    '
                  >

                    <span className='flex items-center gap-3 relative z-10'>
                      <Send size={20} />
                      Send Message
                    </span>

                    {/* Shine Effect */}
                    <div
                      className='
                        absolute
                        top-0
                        -left-full
                        w-full
                        h-full
                        bg-white/20
                        skew-x-12
                        group-hover:left-full
                        transition-all
                        duration-700
                      '
                    ></div>
                  </button>
                ) : (

                  <button
                    disabled
                    className='
                      inline-flex
                      items-center
                      px-10
                      py-4
                      rounded-full
                      bg-white/10
                      backdrop-blur-md
                      border
                      border-white/10
                      text-white
                    '
                  >

                    <svg
                      aria-hidden="true"
                      role="status"
                      className="w-5 h-5 me-3 animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                        fill="currentColor"
                        opacity="0.2"
                      />

                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539"
                        fill="currentColor"
                      />
                    </svg>

                    Sending...
                  </button>
                )
              }

            </motion.div>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default Content;