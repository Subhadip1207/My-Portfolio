import React from 'react'
import { Heart, ArrowUp } from 'lucide-react'

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className='relative mt-20 overflow-hidden'>

      {/* Top Glow Line */}
      <div className='h-px w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-70'></div>

      {/* Background Glow */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-100 h-50 bg-cyan-500/10 blur-3xl rounded-full'></div>

      <div className='relative px-5 py-12 w-full max-w-7xl mx-auto flex flex-col items-center gap-8'>

        {/* Thank You Text */}
        <div className='flex flex-col items-center gap-3'>

          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-[6px] uppercase text-center bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse'>
            Thanks For Scrolling
          </h1>

          <p className='text-muted-foreground text-center text-sm sm:text-base tracking-wide'>
            Hope you enjoyed exploring my portfolio ✨
          </p>

        </div>

        {/* Decorative Line */}
        <div className='w-40 h-0.5 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full'></div>

        {/* Bottom Section */}
        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5'>

          {/* Left */}
          <div className='text-sm text-muted-foreground text-center md:text-left'>
            © {new Date().getFullYear()} All Rights Reserved
          </div>

          {/* Center */}
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            Made with
            <Heart className='w-4 h-4 text-red-500 fill-red-500 animate-pulse' />
            by You
          </div>

          {/* Scroll Top Button */}
          <button
            onClick={scrollToTop}
            className='group flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-white/5 backdrop-blur-md hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/40'
          >
            <ArrowUp className='w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300' />
            Top
          </button>

        </div>

      </div>
    </footer>
  )
}

export default Footer