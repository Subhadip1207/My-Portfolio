import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  clearAllProjectsErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from '@/store/slices/projectSlice'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import SpecialLoadingButton from './subComponents/SpecialLoadingButton'

import { Button } from '@/components/ui/button'

import {
  ArrowLeft,
  Code2,
  FolderGit2,
  Globe,
  ImagePlus,
  Layers3,
  PencilLine,
  Sparkles,
  UploadCloud,
} from 'lucide-react'

const UpdateProject = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [stack, setStack] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [projectimage, setProjectimage] = useState('')
  const [projectimagePreview, setProjectimagePreview] = useState('')

  const { error, message, loading } = useSelector(
    (state) => state.project
  )

  const { id } = useParams()

  const handleProjectImagePreview = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      setProjectimage(file)
      setProjectimagePreview(reader.result)
    }
  }

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setTitle(res.data.project.title)
          setDescription(res.data.project.description)
          setStack(res.data.project.stack)
          setTechnologies(
            res.data.project.technologies
          )
          setGithubLink(res.data.project.githubLink)
          setProjectLink(res.data.project.projectLink)

          setProjectimage(
            res.data.project.projectimage &&
              res.data.project.projectimage.url
          )

          setProjectimagePreview(
            res.data.project.projectimage &&
              res.data.project.projectimage.url
          )
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }

    getProject()

    if (error) {
      toast.error(error)
      dispatch(clearAllProjectsErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetProjectSlice())
      dispatch(getAllProjects())
    }
  }, [id, message, loading, error])

  const handleUpdateProject = (e) => {
    e.preventDefault()

    const formData = new FormData()

    const techArray = technologies
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0)

    formData.append('title', title)
    formData.append('description', description)
    formData.append('githubLink', githubLink)
    formData.append('projectLink', projectLink)
    formData.append('stack', stack)
    formData.append(
      'technologies',
      JSON.stringify(techArray)
    )
    formData.append('projectimage', projectimage)

    dispatch(updateProject(id, formData))
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10">

        {/* Background Effects */}
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <form
          onSubmit={handleUpdateProject}
          className="relative z-10 mx-auto max-w-6xl"
        >

          {/* Main Glass Card */}
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-white/10 bg-white/5 p-8 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-4">

                  <div className="rounded-3xl bg-cyan-500/15 p-4">
                    <PencilLine className="h-8 w-8 text-cyan-400" />
                  </div>

                  <div>
                    <h1 className="flex items-center gap-3 text-4xl font-black tracking-tight text-white">

                      Update Project

                      <Sparkles className="h-6 w-6 animate-pulse text-cyan-400" />
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                      Edit your project beautifully and
                      showcase your creativity.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/">
                <Button className="group rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-6 text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-white">

                  <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />

                  Dashboard
                </Button>
              </Link>
            </div>

            {/* Content */}
            <div className="grid gap-8 p-8">

              {/* Project Image */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020817]/80 p-4">

                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="relative">

                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-500/15 p-3">
                      <ImagePlus className="h-5 w-5 text-cyan-400" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Project Preview
                      </h2>

                      <p className="text-sm text-gray-400">
                        Upload or change your project
                        thumbnail
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10">

                    <img
                      src={
                        projectimagePreview
                          ? projectimagePreview
                          : '/vite.svg'
                      }
                      alt="ProjectImage"
                      className="h-100 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="mt-5">

                    <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-500/10 px-5 py-5 text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20">

                      <UploadCloud className="h-5 w-5" />

                      Upload New Project Image

                      <input
                        type="file"
                        onChange={
                          handleProjectImagePreview
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* Title */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-cyan-300">

                    <Layers3 className="h-4 w-4" />

                    Project Title
                  </Label>

                  <input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400 focus:bg-cyan-500/5 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Stack */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-cyan-300">

                    <Code2 className="h-4 w-4" />

                    Tech Stack
                  </Label>

                  <input
                    type="text"
                    placeholder="MERN Stack"
                    value={stack}
                    onChange={(e) =>
                      setStack(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400 focus:bg-cyan-500/5 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label className="text-cyan-300">
                  Description
                </Label>

                <Textarea
                  placeholder="Describe your amazing project..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="min-h-45 rounded-2xl border border-white/10 bg-white/5 p-5 text-white placeholder:text-gray-500 transition-all duration-300 focus:border-cyan-400 focus:bg-cyan-500/5 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <Label className="text-cyan-300">
                  Technologies Used
                </Label>

                <Textarea
                  placeholder="React, Node.js, MongoDB..."
                  value={technologies}
                  onChange={(e) =>
                    setTechnologies(e.target.value)
                  }
                  className="min-h-35 rounded-2xl border border-white/10 bg-white/5 p-5 text-white placeholder:text-gray-500 transition-all duration-300 focus:border-cyan-400 focus:bg-cyan-500/5 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Links */}
              <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-cyan-300">

                    <Globe className="h-4 w-4" />

                    Live Project Link
                  </Label>

                  <input
                    type="text"
                    placeholder="https://yourproject.com"
                    value={projectLink}
                    onChange={(e) =>
                      setProjectLink(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400 focus:bg-cyan-500/5 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-cyan-300">

                    <FolderGit2 className="h-4 w-4" />

                    GitHub Repository
                  </Label>

                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={githubLink}
                    onChange={(e) =>
                      setGithubLink(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400 focus:bg-cyan-500/5 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">

                {loading ? (
                  <SpecialLoadingButton
                    content={'Updating'}
                    width={'w-60'}
                  />
                ) : (
                  <button
                    type="submit"
                    className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-fuchsia-600 px-12 py-5 text-lg font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(34,211,238,0.5)]"
                  >

                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full"></span>

                    <span className="relative flex items-center gap-3">
                      <Sparkles className="h-5 w-5 animate-pulse" />

                      Update Project
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateProject;