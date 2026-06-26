import {
  clearAllProjectsErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from '@/store/slices/projectSlice'

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import { Tabs, TabsContent } from '@/components/ui/tabs'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Eye,
  Pen,
  Trash2,
  ArrowLeft,
  FolderKanban,
  Sparkles,
  Layers3,
  ExternalLink,
  Code2,
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import SpecialLoadingButton from './subComponents/SpecialLoadingButton'

const ManageProjects = () => {
  const { loading, error, projects, message } =
    useSelector((state) => state.project)

  const dispatch = useDispatch()

  const [projectId, setProjectId] = useState('')

  const handleDeleteProject = (id) => {
    setProjectId(id)
    dispatch(deleteProject(id))
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
    }
  }, [dispatch, error, loading, message])

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10">

        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <Tabs
          defaultValue="projects"
          className="relative z-10"
        >
          <TabsContent value="projects">

            {/* Main Card */}
            <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

              {/* Header */}
              <CardHeader className="flex flex-col gap-6 border-b border-white/10 bg-white/5 p-8 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <CardTitle className="flex items-center gap-4 text-4xl font-black tracking-tight text-white">

                    <div className="rounded-3xl bg-cyan-500/15 p-4">
                      <FolderKanban className="h-8 w-8 text-cyan-400" />
                    </div>

                    Manage Projects

                    <Sparkles className="h-6 w-6 animate-pulse text-cyan-400" />
                  </CardTitle>

                  <p className="mt-3 text-sm text-gray-400">
                    Organize, edit and manage your portfolio
                    projects beautifully.
                  </p>
                </div>

                <Link to="/">
                  <Button className="group rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-6 text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-white">

                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />

                    Dashboard
                  </Button>
                </Link>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-6">

                {projects && projects.length > 0 ? (

                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#020817]/70">

                    <Table>

                      {/* Table Header */}
                      <TableHeader>

                        <TableRow className="border-b border-white/10 bg-white/5 hover:bg-white/5">

                          <TableHead className="py-5 text-cyan-300">
                            Preview
                          </TableHead>

                          <TableHead className="text-cyan-300">
                            Project
                          </TableHead>

                          <TableHead className="hidden text-cyan-300 md:table-cell">
                            Stack
                          </TableHead>

                          <TableHead className="text-right text-cyan-300">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody>

                        {projects.map((element, index) => {
                          return (
                            <TableRow
                              key={element._id}
                              className="group border-b border-white/5 transition-all duration-500 hover:bg-cyan-500/5"
                              style={{
                                animationDelay: `${index * 100}ms`,
                              }}
                            >

                              {/* Image */}
                              <TableCell className="py-5">

                                <div className="relative overflow-hidden rounded-2xl border border-white/10">

                                  <img
                                    src={
                                      element.projectimage &&
                                      element.projectimage.url
                                    }
                                    alt={element.title}
                                    className="h-20 w-28 object-cover transition-transform duration-500 group-hover:scale-110"
                                  />

                                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                                </div>
                              </TableCell>

                              {/* Title */}
                              <TableCell>

                                <div className="flex items-center gap-4">

                                  <div className="rounded-2xl bg-cyan-500/10 p-3">
                                    <Layers3 className="h-5 w-5 text-cyan-400" />
                                  </div>

                                  <div>
                                    <h2 className="text-lg font-bold text-white">
                                      {element.title}
                                    </h2>

                                    <p className="mt-1 text-xs uppercase tracking-[2px] text-cyan-300">
                                      Portfolio Project
                                    </p>
                                  </div>
                                </div>
                              </TableCell>

                              {/* Stack */}
                              <TableCell className="hidden md:table-cell">

                                <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-cyan-300">

                                  <Code2 className="h-4 w-4" />

                                  {element.stack}
                                </div>
                              </TableCell>

                              {/* Actions */}
                              <TableCell>

                                <div className="flex items-center justify-end gap-3">

                                  {/* View */}
                                  <TooltipProvider>
                                    <Tooltip>

                                      <TooltipTrigger asChild>

                                        <Link
                                          to={`/view/project/${element._id}`}
                                        >
                                          <Button className="group/view h-12 w-12 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">

                                            <Eye className="h-5 w-5 transition-transform duration-300 group-hover/view:scale-110" />
                                          </Button>
                                        </Link>
                                      </TooltipTrigger>

                                      <TooltipContent
                                        side="bottom"
                                        className="border-none bg-emerald-500 text-white"
                                      >
                                        View Project
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  {/* Edit */}
                                  <TooltipProvider>
                                    <Tooltip>

                                      <TooltipTrigger asChild>

                                        <Link
                                          to={`/update/project/${element._id}`}
                                        >
                                          <Button className="group/edit h-12 w-12 rounded-2xl border border-yellow-400/20 bg-yellow-500/10 text-yellow-300 transition-all duration-300 hover:scale-110 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]">

                                            <Pen className="h-5 w-5 transition-transform duration-300 group-hover/edit:rotate-12" />
                                          </Button>
                                        </Link>
                                      </TooltipTrigger>

                                      <TooltipContent
                                        side="bottom"
                                        className="border-none bg-yellow-400 text-black"
                                      >
                                        Edit Project
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  {/* Delete */}
                                  <TooltipProvider>
                                    <Tooltip>

                                      <TooltipTrigger asChild>

                                        {loading &&
                                        projectId ===
                                          element._id ? (
                                          <SpecialLoadingButton
                                            width={'w-28'}
                                            content={'Deleting'}
                                          />
                                        ) : (
                                          <Button
                                            onClick={() =>
                                              handleDeleteProject(
                                                element._id
                                              )
                                            }
                                            className="group/delete h-12 w-12 rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300 transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                                          >

                                            <Trash2 className="h-5 w-5 transition-transform duration-300 group-hover/delete:rotate-12" />
                                          </Button>
                                        )}
                                      </TooltipTrigger>

                                      <TooltipContent
                                        side="bottom"
                                        className="border-none bg-red-500 text-white"
                                      >
                                        Delete Project
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (

                  /* Empty State */
                  <div className="flex min-h-125 flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 text-center">

                    <div className="mb-6 rounded-3xl bg-cyan-500/10 p-6">
                      <FolderKanban className="h-16 w-16 text-cyan-400" />
                    </div>

                    <h2 className="text-4xl font-black text-white">
                      No Projects Found
                    </h2>

                    <p className="mt-4 max-w-lg text-gray-400">
                      Your portfolio is currently empty.
                      Start adding projects to showcase your
                      creativity and skills beautifully.
                    </p>

                    <Link to="/">
                      <Button className="mt-8 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">

                        <ExternalLink className="mr-2 h-5 w-5" />

                        Go Back Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ManageProjects;