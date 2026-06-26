import {
  clearAllSkillsErrors,
  deleteSkill,
  getAllskills,
  resetSkillSlice,
  updateSkill,
} from '@/store/slices/skillSlice'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import { Tabs, TabsContent } from '@/components/ui/tabs'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import {
  Trash2,
  Sparkles,
  ArrowLeft,
  Code2,
  BrainCircuit,
  GaugeCircle,
  Star,
  Zap,
  Layers3,
} from 'lucide-react'

const ManageSkills = () => {
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  )

  const dispatch = useDispatch()

  const [newProficiency, setNewProficiency] = useState('')

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency)
  }

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency))
  }

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllSkillsErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetSkillSlice())
      dispatch(getAllskills())
    }
  }, [dispatch, error, loading, message])

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 lg:px-8">

        {/* Animated Background */}
        <div className="absolute inset-0 z-0">

          <div className="absolute -top-32 -left-32 h-95 w-95 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>

          <div className="absolute top-1/3 -right-25 h-80 w-80 animate-pulse rounded-full bg-fuchsia-500/20 blur-3xl"></div>

          <div className="absolute -bottom-30 left-1/3 h-65 w-65 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[45px_45px]"></div>
        </div>

        <Tabs defaultValue="skills" className="relative z-10">

          <TabsContent value="skills">

            {/* Main Container */}
            <Card className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.7)]">

              {/* Header */}
              <CardHeader className="relative overflow-hidden border-b border-white/10 bg-white/5 p-8">

                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-blue-500/5 to-fuchsia-500/5"></div>

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                  {/* Left */}
                  <div>

                    <div className="mb-5 flex items-center gap-3">

                      <div className="rounded-2xl bg-cyan-500/15 p-4 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                        <BrainCircuit className="h-8 w-8 text-cyan-400" />
                      </div>

                      <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-cyan-300 backdrop-blur-xl">
                        Skill Management
                      </div>
                    </div>

                    <CardTitle className="flex flex-wrap items-center gap-4 text-4xl font-black tracking-tight text-white lg:text-5xl">

                      Manage Skills

                      <Sparkles className="h-7 w-7 animate-pulse text-cyan-400" />
                    </CardTitle>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
                      Manage, update, and showcase your technical skills with
                      a futuristic animated dashboard experience.
                    </p>
                  </div>

                  {/* Right */}
                  <Link to="/">
                    <Button className="group rounded-2xl border border-cyan-400/20 bg-linear-to-r from-cyan-500/10 to-blue-500/10 px-7 py-6 text-cyan-300 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-cyan-400/40 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                      <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                      Return Dashboard
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              {/* Skills */}
              <CardContent className="p-6 lg:p-8">

                {skills && skills.length > 0 ? (

                  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {skills.map((element, index) => {
                      return (
                        <Card
                          key={element._id}
                          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-[#0f172a] to-[#111827] p-1 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(34,211,238,0.2)]"
                          style={{
                            animationDelay: `${index * 120}ms`,
                          }}
                        >

                          {/* Glow */}
                          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10"></div>

                          <div className="relative rounded-[1.8rem] bg-[#020817]/95 p-6 backdrop-blur-2xl">

                            {/* Top */}
                            <CardHeader className="flex flex-row items-start justify-between p-0">

                              <div className="flex items-center gap-4">

                                <div className="relative">

                                  <div className="absolute inset-0 animate-ping rounded-2xl bg-cyan-500/20"></div>

                                  <div className="relative rounded-2xl bg-cyan-500/10 p-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                    <Code2 className="h-7 w-7 text-cyan-400" />
                                  </div>
                                </div>

                                <div>

                                  <CardTitle className="text-2xl font-black text-white transition-all duration-300 group-hover:text-cyan-300">
                                    {element.title}
                                  </CardTitle>

                                  <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[3px] text-cyan-300">
                                    <Layers3 className="h-3 w-3" />
                                    Skill Expertise
                                  </div>
                                </div>
                              </div>

                              {/* Delete */}
                              <TooltipProvider>
                                <Tooltip>

                                  <TooltipTrigger asChild>

                                    <button
                                      onClick={() =>
                                        handleDeleteSkill(element._id)
                                      }
                                      className="group/delete rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                                    >
                                      <Trash2 className="h-5 w-5 transition-transform duration-300 group-hover/delete:rotate-12" />
                                    </button>
                                  </TooltipTrigger>

                                  <TooltipContent
                                    side="left"
                                    className="border-red-500/20 bg-[#111827] text-red-400"
                                  >
                                    Delete Skill
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </CardHeader>

                            {/* Progress UI */}
                            <div className="mt-8">

                              <div className="mb-3 flex items-center justify-between">

                                <div className="flex items-center gap-2 text-cyan-300">
                                  <GaugeCircle className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    Proficiency
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-bold text-cyan-300">
                                  <Star className="h-3 w-3 fill-cyan-300 text-cyan-300" />
                                  {element.proficiency}%
                                </div>
                              </div>

                              {/* Animated Progress Bar */}
                              <div className="relative h-4 overflow-hidden rounded-full bg-white/10">

                                <div
                                  className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500 transition-all duration-700"
                                  style={{
                                    width: `${element.proficiency}%`,
                                  }}
                                ></div>

                                <div className="absolute inset-0 animate-pulse bg-white/5"></div>
                              </div>
                            </div>

                            {/* Footer */}
                            <CardFooter className="mt-8 flex-col items-start gap-4 p-0">

                              <div className="w-full">

                                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[2px] text-gray-300">

                                  <Zap className="h-4 w-4 text-cyan-400" />

                                  Update Proficiency
                                </Label>

                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  defaultValue={element.proficiency}
                                  onChange={(e) =>
                                    handleInputChange(e.target.value)
                                  }
                                  onBlur={() =>
                                    handleUpdateSkill(element._id)
                                  }
                                  className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-lg text-white backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                                />
                              </div>

                              <p className="text-xs leading-relaxed text-gray-500">
                                Update the skill proficiency percentage from
                                0 to 100.
                              </p>
                            </CardFooter>
                          </div>
                        </Card>
                      )
                    })}
                  </div>

                ) : (

                  /* Empty State */
                  <div className="flex min-h-137.5 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-white/10 bg-white/5 px-6 text-center backdrop-blur-2xl">

                    <div className="relative mb-8">

                      <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20 blur-xl"></div>

                      <div className="relative rounded-[2rem] border border-cyan-400/10 bg-cyan-500/10 p-8 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                        <BrainCircuit className="h-20 w-20 text-cyan-400" />
                      </div>
                    </div>

                    <h2 className="bg-linear-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-5xl font-black text-transparent">
                      No Skills Found
                    </h2>

                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">
                      You have not added any skills yet. Add your technologies,
                      tools, and expertise to create an impressive portfolio.
                    </p>

                    <Link to="/">
                      <Button className="mt-10 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-10 py-7 text-lg font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_45px_rgba(34,211,238,0.45)]">
                        Go To Dashboard
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

export default ManageSkills;