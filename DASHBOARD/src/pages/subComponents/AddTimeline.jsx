import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewTimeline,
  clearAllTimelinesErrors,
  getAllTimelines,
  resetTimelineslice,
} from '@/store/slices/timelineSlice'
import { toast } from 'react-toastify'
import {
  CalendarDays,
  Sparkles,
  Clock3,
  FileText,
  ArrowRight,
} from 'lucide-react'

const AddTimeline = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const { loading, error, message } = useSelector(
    (state) => state.timeline
  )

  const handleAddNewTimeline = (e) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append('title', title)
    formdata.append('description', description)
    formdata.append('from', from)
    formdata.append('to', to)

    dispatch(addNewTimeline(formdata))
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

      setTitle('')
      setDescription('')
      setFrom('')
      setTo('')
    }
  }, [dispatch, loading, error, message])

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 sm:pl-20">
        
        {/* Background Effects */}
        <div className="absolute -top-30 -left-30 -h-75 w-75 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-37.5 -right-25 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Main Form Card */}
        <div className="relative z-10 flex items-center justify-center">
          <form
            onSubmit={handleAddNewTimeline}
            className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] sm:p-10"
          >
            
            {/* Heading */}
            <div className="mb-10 text-center">
              <div className="mb-5 flex justify-center">
                <div className="rounded-2xl bg-cyan-500/20 p-4 shadow-lg shadow-cyan-500/20">
                  <CalendarDays className="h-10 w-10 text-cyan-400" />
                </div>
              </div>

              <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold tracking-wide text-white sm:text-5xl">
                Add Timeline
                <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
              </h1>

              <p className="mt-4 text-base text-gray-400 sm:text-lg">
                Create a beautiful milestone for your portfolio journey.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-7">

              {/* Title */}
              <div className="group">
                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                  <FileText className="h-4 w-4" />
                  Timeline Title
                </Label>

                <div className="rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-400/40 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                  <input
                    type="text"
                    placeholder="Graduation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-2xl bg-transparent px-5 py-4 text-white placeholder:text-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                  <FileText className="h-4 w-4" />
                  Description
                </Label>

                <div className="rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-400/40 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                  <Textarea
                    placeholder="Describe your journey, achievement or experience..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-35 resize-none border-none bg-transparent px-5 py-4 text-white placeholder:text-gray-500 focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Timeline Dates */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* From */}
                <div className="group">
                  <Label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                    <Clock3 className="h-4 w-4" />
                    From
                  </Label>

                  <div className="rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-400/40 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                    <input
                      type="number"
                      placeholder="2021"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full rounded-2xl bg-transparent px-5 py-4 text-white placeholder:text-gray-500 outline-none"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="group">
                  <Label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                    <ArrowRight className="h-4 w-4" />
                    To
                  </Label>

                  <div className="rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-400/40 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                    <input
                      type="number"
                      placeholder="2025"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full rounded-2xl bg-transparent px-5 py-4 text-white placeholder:text-gray-500 outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 flex justify-center">
              {loading ? (
                <SpecialLoadingButton
                  content={'Adding Timeline'}
                  width={'w-72'}
                />
              ) : (
                <Button
                  type="submit"
                  className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 px-10 py-7 text-lg font-bold tracking-wide text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    Add Timeline
                  </span>

                  <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0"></span>
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTimeline;