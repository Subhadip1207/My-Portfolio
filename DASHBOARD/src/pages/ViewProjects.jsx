import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  ArrowLeft,
  Globe,
  Layers3,
  Sparkles,
  Code2,
  FolderKanban,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { FaLinkedin, FaSquareFacebook, FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ViewProjects = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [stack, setStack] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [projectimage, setProjectimage] = useState('')

  const { id } = useParams()

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`https://my-portfolio-bckend.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title)
          setDescription(res.data.project.description)
          setStack(res.data.project.stack)
          setTechnologies(res.data.project.technologies)
          setGithubLink(res.data.project.githubLink)
          setProjectLink(res.data.project.projectLink)
          setProjectimage(
            res.data.project.projectimage &&
              res.data.project.projectimage.url
          )
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }

    getProject()
  }, [id])

  const descriptionInListFormat = description
    .split('.')
    .filter((item) => item.trim() !== '')

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 sm:px-8">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Top Header */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-500/15 p-3">
                  <FolderKanban className="h-7 w-7 text-cyan-400" />
                </div>

                <h1 className="text-4xl font-black tracking-tight text-white">
                  Project Details
                </h1>

                <Sparkles className="h-6 w-6 animate-pulse text-cyan-400" />
              </div>

              <p className="max-w-2xl text-gray-400">
                Explore your project beautifully with modern UI, animated
                sections, technology showcase, and premium glassmorphism
                effects.
              </p>
            </div>

            <Link to="/">
              <Button className="group rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-6 text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-white">
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                Return Dashboard
              </Button>
            </Link>
          </div>

          {/* Main Layout */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Left Section */}
            <div className="space-y-8">

              {/* Hero Image */}
              <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl">

                <div className="relative overflow-hidden">

                  <img
                    src={projectimage || '/vite.svg'}
                    alt={title}
                    className="h-112.5 w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-black/20 to-transparent"></div>

                  {/* Floating Title */}
                  <div className="absolute bottom-0 left-0 w-full p-8">

                    <div className="mb-4 flex items-center gap-3">
                      <Badge className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-cyan-300">
                        Featured Project
                      </Badge>

                      <Badge className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-fuchsia-300">
                        {stack}
                      </Badge>
                    </div>

                    <h1 className="text-5xl font-black leading-tight text-white">
                      {title}
                    </h1>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl">

                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white">

                    <div className="rounded-xl bg-cyan-500/10 p-2">
                      <Layers3 className="h-5 w-5 text-cyan-400" />
                    </div>

                    Project Description
                  </CardTitle>
                </CardHeader>

                <CardContent>

                  <div className="space-y-4">

                    {descriptionInListFormat.map((item, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#020817]/80 p-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-500/5"
                      >
                        <div className="mt-1 rounded-full bg-cyan-500/15 p-1.5">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        </div>

                        <p className="leading-relaxed text-gray-300">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl">

                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white">

                    <div className="rounded-xl bg-fuchsia-500/10 p-2">
                      <Code2 className="h-5 w-5 text-fuchsia-400" />
                    </div>

                    Technologies Used
                  </CardTitle>
                </CardHeader>

                <CardContent>

                  <div className="flex flex-wrap gap-4">

                    {technologies.map((item, index) => (
                      <div
                        key={index}
                        className="group rounded-2xl border border-white/10 bg-[#020817]/90 px-5 py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                      >
                        #{item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">

              {/* Stack Card */}
              <Card className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl">

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    Project Stack
                  </CardTitle>
                </CardHeader>

                <CardContent>

                  <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8 text-center">

                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/15">
                      <Layers3 className="h-10 w-10 text-cyan-400" />
                    </div>

                    <h2 className="text-3xl font-black text-white">
                      {stack}
                    </h2>

                    <p className="mt-3 text-gray-400">
                      Main technology stack used in this project.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl">

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    Project Links
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">

                  {/* GitHub */}
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#020817]/90 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-4">

                      <div className="rounded-2xl bg-white/10 p-3">
                        <FaSquareGithub className="h-6 w-6 text-white" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white">
                          GitHub Repository
                        </h3>

                        <p className="text-sm text-gray-400">
                          View source code
                        </p>
                      </div>
                    </div>

                    <ExternalLink className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>

                  {/* Live Project */}
                  <a
                    href={projectLink || '/'}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#020817]/90 p-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-500/5"
                  >
                    <div className="flex items-center gap-4">

                      <div className="rounded-2xl bg-cyan-500/15 p-3">
                        <Globe className="h-6 w-6 text-cyan-400" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white">
                          Live Project
                        </h3>

                        <p className="text-sm text-gray-400">
                          {projectLink
                            ? 'Visit deployed application'
                            : 'Still not deployed'}
                        </p>
                      </div>
                    </div>

                    <ExternalLink className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </CardContent>
              </Card>

              {/* Decorative Card */}
              <Card className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-linear-to-br from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10 backdrop-blur-2xl">

                <CardContent className="p-8">

                  <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-4">
                    <Sparkles className="h-8 w-8 animate-pulse text-cyan-300" />
                  </div>

                  <h2 className="text-3xl font-black text-white">
                    Premium Portfolio Experience
                  </h2>

                  <p className="mt-4 leading-relaxed text-gray-300">
                    Showcase your projects with modern UI design, smooth
                    animations, glowing effects, and elegant layouts that
                    impress recruiters and visitors instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProjects;