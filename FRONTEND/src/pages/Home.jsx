import React from 'react'
import Hero from './subComponents/Hero'
import TimeLine from './subComponents/TimeLine'
import About from './subComponents/About'
import Skills from './subComponents/Skills'
import Portfolio from './subComponents/Portfolio'
import MyApps from './subComponents/MyApps'
import Content from './subComponents/Content'

const Home = () => {
  return (
    <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-262.5 flex flex-col gap-14'>
      <Hero/>
      <TimeLine/>
      <About/>
      <Skills/>
      <Portfolio/>
      <MyApps/>
      <Content/>
    </article>
  )
}

export default Home