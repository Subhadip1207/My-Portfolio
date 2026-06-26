import {
  clearAllTimelinesErrors,
  deleteTimeline,
  getAllTimelines,
  resetTimelineslice,
} from '@/store/slices/timelineSlice'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  Trash2,
  ArrowLeft,
  Clock3,
  Sparkles,
  CalendarDays,
  TimerReset,
  BriefcaseBusiness,
} from 'lucide-react'

import { toast } from 'react-toastify'
import SpecialLoadingButton from './subComponents/SpecialLoadingButton'

const ManageTimeLine = () => {
  const { loading, error, timeLines, message } = useSelector(
    (state) => state.timeline
  )

  const dispatch = useDispatch()

  const [timelineId, setTimelineId] = useState('')

  const handleDeleteTimeLine = (id) => {
    setTimelineId(id)
    dispatch(deleteTimeline(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllTimelinesErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetTimelineslice())
      dispatch(getAllTimelines())
    }
  }, [dispatch, error, message, loading])

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10">

        {/* Background Glow */}
        <div className="absolute -top-25 -left-25 h-70 w-70 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-30 -right-25 h-75 w-75 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <Tabs defaultValue="timeline" className="relative z-10">

          <TabsContent value="timeline">

            {/* Main Card */}
            <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)]">

              {/* Header */}
              <CardHeader className="flex flex-col gap-6 border-b border-white/10 bg-white/5 p-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <CardTitle className="flex items-center gap-4 text-4xl font-black tracking-tight text-white">

                    <div className="rounded-2xl bg-cyan-500/15 p-4">
                      <Clock3 className="h-8 w-8 text-cyan-400" />
                    </div>

                    Manage Timeline

                    <Sparkles className="h-6 w-6 animate-pulse text-cyan-400" />
                  </CardTitle>

                  <p className="mt-3 text-sm text-gray-400">
                    Beautifully organize and manage your journey &
                    achievements.
                  </p>
                </div>

                <Link to="/">
                  <Button className="group rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-6 text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-white">
                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Return Dashboard
                  </Button>
                </Link>
              </CardHeader>

              {/* Timeline Table */}
              <CardContent className="p-6">

                {timeLines && timeLines.length > 0 ? (

                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#020817]/80">

                    <Table>

                      {/* Table Header */}
                      <TableHeader>

                        <TableRow className="border-b border-white/10 bg-white/5 hover:bg-white/5">

                          <TableHead className="py-5 text-cyan-300">
                            Title
                          </TableHead>

                          <TableHead className="text-cyan-300">
                            Description
                          </TableHead>

                          <TableHead className="text-cyan-300">
                            From
                          </TableHead>

                          <TableHead className="text-cyan-300">
                            To
                          </TableHead>

                          <TableHead className="text-right text-cyan-300">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody>

                        {timeLines.map((element, index) => {
                          return (
                            <TableRow
                              key={element._id}
                              className="group border-b border-white/5 bg-transparent transition-all duration-500 hover:bg-cyan-500/5"
                              style={{
                                animationDelay: `${index * 100}ms`,
                              }}
                            >

                              {/* Title */}
                              <TableCell className="py-6">

                                <div className="flex items-center gap-4">

                                  <div className="rounded-2xl bg-cyan-500/10 p-3">
                                    <BriefcaseBusiness className="h-5 w-5 text-cyan-400" />
                                  </div>

                                  <div>
                                    <h2 className="font-bold text-white">
                                      {element.title}
                                    </h2>

                                    <p className="mt-1 text-xs uppercase tracking-[2px] text-cyan-300">
                                      Timeline Event
                                    </p>
                                  </div>
                                </div>
                              </TableCell>

                              {/* Description */}
                              <TableCell className="max-w-75 text-gray-300">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 leading-relaxed backdrop-blur-xl">
                                  {element.description}
                                </div>
                              </TableCell>

                              {/* From */}
                              <TableCell>

                                <div className="flex items-center gap-2 text-white">

                                  <CalendarDays className="h-4 w-4 text-cyan-400" />

                                  {element.timeLine.from}
                                </div>
                              </TableCell>

                              {/* To */}
                              <TableCell>

                                <div className="flex items-center gap-2">

                                  <TimerReset className="h-4 w-4 text-fuchsia-400" />

                                  <span className="font-medium text-white">
                                    {element.timeLine.to
                                      ? element.timeLine.to
                                      : 'Present'}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Action */}
                              <TableCell className="text-right">

                                {loading &&
                                timelineId === element._id ? (
                                  <div className="flex justify-end">
                                    <SpecialLoadingButton
                                      width={'w-32'}
                                      content={'Deleting'}
                                    />
                                  </div>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleDeleteTimeLine(
                                        element._id
                                      )
                                    }
                                    className="group/delete rounded-2xl bg-linear-to-r from-red-500 to-pink-600 px-5 py-5 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/delete:rotate-12" />

                                    Delete
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (

                  /* Empty State */
                  <div className="flex min-h-112.5 flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 text-center">

                    <div className="mb-6 rounded-3xl bg-cyan-500/10 p-6">
                      <Clock3 className="h-16 w-16 text-cyan-400" />
                    </div>

                    <h2 className="text-4xl font-black text-white">
                      No Timeline Found
                    </h2>

                    <p className="mt-4 max-w-lg text-gray-400">
                      Your professional journey timeline is currently
                      empty. Add timeline events to showcase your
                      achievements beautifully.
                    </p>

                    <Link to="/">
                      <Button className="mt-8 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
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

export default ManageTimeLine;