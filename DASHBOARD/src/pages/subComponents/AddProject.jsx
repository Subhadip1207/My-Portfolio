import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './SpecialLoadingButton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IoLogoGithub } from "react-icons/io5";

import {
  Image,
  Globe,
  Layers3,
  FolderGit2,
  Sparkles,
  UploadCloud,
} from 'lucide-react'


import {
  addNewProject,
  clearAllProjectsErrors,
  getAllProjects,
  resetProjectSlice
} from '@/store/slices/projectSlice'

const AddProject = () => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [stack, setStack] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [projectimage, setProjectimage] = useState("")
  const [projectimagePreview, setProjectimagePreview] = useState("")

  const { loading, error, message } = useSelector(state => state.project)

  const handleSvg = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      setProjectimage(file)
      setProjectimagePreview(reader.result)
    }
  }

  const handleNewProject = (e) => {

    e.preventDefault()

    const formData = new FormData()

    const techArray = technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0)

    formData.append("title", title)
    formData.append("description", description)
    formData.append("githubLink", githubLink)
    formData.append("projectLink", projectLink)
    formData.append("stack", stack)
    formData.append("technologies", JSON.stringify(techArray))
    formData.append("projectimage", projectimage)

    dispatch(addNewProject(formData))
  }

  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearAllProjectsErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetProjectSlice())
      dispatch(getAllProjects())

      setTitle("")
      setDescription("")
      setGithubLink("")
      setProjectLink("")
      setStack("")
      setTechnologies("")
      setProjectimage("")
      setProjectimagePreview("")
    }

  }, [dispatch, loading, error, message])

  return (
    <>
      <div className='relative min-h-screen overflow-hidden bg-linear-to-br from-black via-zinc-950 to-slate-950 py-10 px-4 sm:px-8'>

        {/* Animated Background */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse'></div>
        </div>

        {/* Main Container */}
        <div className='relative z-10 max-w-6xl mx-auto'>

          {/* Heading */}
          <div className='text-center mb-10 animate-in fade-in duration-700'>

            <div className='inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6'>
              <Sparkles className='w-5 h-5 animate-pulse' />
              <span className='text-sm font-semibold tracking-widest uppercase'>
                Portfolio Dashboard
              </span>
            </div>

            <h1 className='text-4xl sm:text-6xl font-black bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent'>
              Add New Project
            </h1>

            <p className='mt-4 text-zinc-400 text-lg max-w-2xl mx-auto'>
              Create stunning portfolio projects with modern styling and smooth animations.
            </p>

          </div>

          {/* Form Card */}
          <form
            onSubmit={handleNewProject}
            className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 sm:p-10'
          >

            {/* Glow */}
            <div className='absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8'>

              {/* LEFT SIDE */}
              <div className='space-y-6'>

                {/* Title */}
                <div className='space-y-2'>
                  <Label className="text-zinc-200 text-sm tracking-wide">
                    Project Title
                  </Label>

                  <div className='relative'>
                    <FolderGit2 className='absolute left-4 top-4 w-5 h-5 text-cyan-400' />

                    <input
                      type="text"
                      placeholder='Portfolio Website'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                    />
                  </div>
                </div>

                {/* Stack */}
                <div className='space-y-2'>
                  <Label className="text-zinc-200 text-sm tracking-wide">
                    Stack
                  </Label>

                  <div className='relative'>
                    <Layers3 className='absolute left-4 top-4 w-5 h-5 text-violet-400' />

                    <input
                      type="text"
                      placeholder='MERN Stack'
                      value={stack}
                      onChange={(e) => setStack(e.target.value)}
                      className='w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20'
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className='space-y-2'>
                  <Label className="text-zinc-200 text-sm tracking-wide">
                    Technologies
                  </Label>

                  <Textarea
                    placeholder='React, Node.js, MongoDB, Tailwind CSS'
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    className='min-h-32 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-500/20'
                  />
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <Label className="text-zinc-200 text-sm tracking-wide">
                    Description
                  </Label>

                  <Textarea
                    placeholder='Describe your amazing project...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='min-h-40 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-500/20'
                  />
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className='space-y-6'>

                {/* Project Link */}
                <div className='space-y-2'>
                  <Label className="text-zinc-200 text-sm tracking-wide">
                    Live Project Link
                  </Label>

                  <div className='relative'>
                    <Globe className='absolute left-4 top-4 w-5 h-5 text-blue-400' />

                    <input
                      type="text"
                      placeholder='https://yourproject.com'
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      className='w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20'
                    />
                  </div>
                </div>

                {/* GitHub Link */}
                <div className='space-y-2'>
                  <Label className="text-zinc-200 text-sm tracking-wide">
                    GitHub Repository
                  </Label>

                  <div className='relative'>
                    <IoLogoGithub className='absolute left-4 top-4 w-5 h-5 text-white' />

                    <input
                      type="text"
                      placeholder='https://github.com/username/project'
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className='w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/10'
                    />
                  </div>
                </div>

                {/* Upload Section */}
                <div className='space-y-3'>

                  <Label className="text-zinc-200 text-sm tracking-wide">
                    Project Image
                  </Label>

                  <div className='group relative border-2 border-dashed border-white/10 hover:border-cyan-400 transition-all duration-500 rounded-3xl bg-white/5 overflow-hidden'>

                    <input
                      id="file-upload"
                      type="file"
                      className='hidden'
                      onChange={handleSvg}
                    />

                    <label
                      htmlFor="file-upload"
                      className='cursor-pointer flex flex-col items-center justify-center min-h-87.5 p-8'
                    >

                      {
                        projectimagePreview ? (
                          <img
                            src={projectimagePreview}
                            alt="preview"
                            className='w-full h-80 object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02]'
                          />
                        ) : (
                          <>
                            <div className='w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center mb-5'>
                              <UploadCloud className='w-12 h-12 text-cyan-400 animate-bounce' />
                            </div>

                            <h3 className='text-xl font-bold text-white'>
                              Upload Project Image
                            </h3>

                            <p className='text-zinc-400 mt-2 text-center'>
                              Drag & drop or click to upload your project screenshot
                            </p>

                            <div className='mt-6 px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30'>
                              Choose File
                            </div>
                          </>
                        )
                      }

                    </label>

                  </div>

                </div>

              </div>

            </div>

            {/* Submit Button */}
            <div className='mt-10 flex justify-center'>

              {
                loading ? (
                  <SpecialLoadingButton
                    content={"Adding Project"}
                    width={"w-72"}
                  />
                ) : (
                  <Button
                    type='submit'
                    className='group relative overflow-hidden w-full sm:w-80 h-14 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 text-lg font-bold tracking-wide shadow-2xl shadow-cyan-500/20 hover:scale-105 transition-all duration-500'
                  >

                    <span className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-all duration-500'></span>

                    <span className='relative z-10 flex items-center gap-2'>
                      <Sparkles className='w-5 h-5 group-hover:rotate-180 transition-all duration-700' />
                      Add Project
                    </span>

                  </Button>
                )
              }

            </div>

          </form>

        </div>

      </div>
    </>
  )
}

export default AddProject;