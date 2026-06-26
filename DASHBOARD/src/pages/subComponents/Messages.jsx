import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import SpecialLoadingButton from './SpecialLoadingButton.jsx'

import {
  clearAllMessagesErrors,
  deleteMessage,
  getAllMessages,
  resetMessageSlice,
} from '@/store/slices/messagesSlice.js'

import { toast } from 'react-toastify'

import {
  Mail,
  Trash2,
  MessageSquareMore,
  User,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Clock3,
  Stars,
} from 'lucide-react'

const Messages = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const { loading, error, messages, message } = useSelector(
    (state) => state.messages
  )

  const [messageId, setMessageId] = useState('')

  const handleReturnToDashboard = () => {
    navigateTo('/')
  }

  const handleMessageDelete = (id) => {
    setMessageId(id)
    dispatch(deleteMessage(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllMessagesErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetMessageSlice())
      dispatch(getAllMessages())
    }
  }, [dispatch, loading, error, message])

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 sm:px-8 sm:pl-24">

        {/* ================= BACKGROUND EFFECTS ================= */}

        {/* Main Glow */}
        <div className="absolute -left-30 -top-30 h-85 w-85 rounded-full bg-cyan-500/20 blur-[120px]"></div>

        <div className="absolute -right-25 -bottom-25 h-85 w-85 rounded-full bg-fuchsia-500/20 blur-[120px]"></div>

        <div className="absolute left-[40%] top-[20%] h-62.5 w-62.5 rounded-full bg-blue-500/10 blur-[100px]"></div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[42px_42px]"></div>

        {/* Floating Blur Balls */}
        <div className="absolute top-20 right-32 h-20 w-20 animate-pulse rounded-full bg-cyan-400/20 blur-3xl"></div>

        <div className="absolute bottom-20 left-40 h-20 w-20 animate-pulse rounded-full bg-fuchsia-400/20 blur-3xl"></div>

        {/* ================= CONTENT ================= */}

        <Tabs defaultValue="messages" className="relative z-10">
          <TabsContent value="messages">

            {/* Main Wrapper Card */}
            <Card className="overflow-hidden rounded-[34px] border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

              {/* ================= HEADER ================= */}
              <CardHeader className="relative overflow-hidden border-b border-white/10 bg-linear-to-r from-cyan-500/10 via-blue-500/5 to-fuchsia-500/10 p-8">

                {/* Decorative Glow */}
                <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl"></div>

                <div className="absolute left-10 bottom-0 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* Left Section */}
                  <div>

                    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
                      <Stars className="h-4 w-4 animate-pulse" />
                      ADMIN MESSAGE CENTER
                    </div>

                    <CardTitle className="flex flex-wrap items-center gap-4 text-4xl font-black tracking-wide text-white md:text-5xl">

                      <div className="rounded-3xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 p-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <MessageSquareMore className="h-10 w-10 text-cyan-400" />
                      </div>

                      Messages

                      <Sparkles className="h-8 w-8 animate-pulse text-cyan-400" />
                    </CardTitle>

                    <CardDescription className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400">
                      Manage all portfolio conversations in a futuristic,
                      premium and beautifully animated dashboard experience.
                    </CardDescription>

                    {/* Stats */}
                    <div className="mt-6 flex flex-wrap gap-4">

                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                        <Mail className="h-5 w-5 text-cyan-400" />
                        <span className="text-sm text-gray-300">
                          Total Messages :
                        </span>
                        <span className="font-bold text-white">
                          {messages?.length || 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                        <span className="text-sm text-gray-300">
                          Secure Inbox
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                        <Clock3 className="h-5 w-5 text-fuchsia-400" />
                        <span className="text-sm text-gray-300">
                          Real-Time Updates
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Right Button */}
                  <Button
                    onClick={handleReturnToDashboard}
                    className="group h-14 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-7 text-base font-semibold text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back To Dashboard
                  </Button>
                </div>
              </CardHeader>

              {/* ================= BODY ================= */}
              <CardContent className="p-7 md:p-10">

                {messages && messages.length > 0 ? (
                  <div className="grid gap-8 xl:grid-cols-2">

                    {messages.map((element, index) => {
                      return (
                        <Card
                          key={element._id}
                          className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-linear-to-br from-[#0f172a] via-[#111827] to-[#0b1120] p-px transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]"
                          style={{
                            animationDelay: `${index * 120}ms`,
                          }}
                        >

                          {/* Animated Border */}
                          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-fuchsia-500/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

                          {/* Glow */}
                          <div className="absolute -top-10 right-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl"></div>

                          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-fuchsia-400/10 blur-3xl"></div>

                          {/* Inner Content */}
                          <div className="relative rounded-[28px] bg-[#050b18]/95 p-7 backdrop-blur-2xl">

                            {/* Sender */}
                            <div className="mb-6 flex items-center gap-5">

                              <div className="relative">
                                <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 blur-xl"></div>

                                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-500/10">
                                  <User className="h-8 w-8 text-cyan-400" />
                                </div>
                              </div>

                              <div>
                                <p className="mb-1 text-xs uppercase tracking-[4px] text-cyan-300">
                                  Sender Name
                                </p>

                                <h2 className="text-2xl font-bold text-white">
                                  {element.senderName}
                                </h2>
                              </div>
                            </div>

                            {/* Subject */}
                            <CardDescription className="mb-5 rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20">

                              <div className="mb-3 flex items-center gap-2">
                                <div className="rounded-xl bg-cyan-500/10 p-2">
                                  <Mail className="h-4 w-4 text-cyan-300" />
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[3px] text-cyan-300">
                                  Subject
                                </span>
                              </div>

                              <p className="text-lg font-medium leading-relaxed text-white">
                                {element.subject}
                              </p>
                            </CardDescription>

                            {/* Message */}
                            <CardDescription className="rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/20">

                              <div className="mb-3 flex items-center gap-2">

                                <div className="rounded-xl bg-fuchsia-500/10 p-2">
                                  <MessageSquareMore className="h-4 w-4 text-fuchsia-300" />
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[3px] text-fuchsia-300">
                                  Message
                                </span>
                              </div>

                              <p className="leading-8 text-gray-300">
                                {element.message}
                              </p>
                            </CardDescription>

                            {/* Footer */}
                            <CardFooter className="mt-7 flex justify-end p-0">

                              {loading && messageId === element._id ? (
                                <SpecialLoadingButton
                                  width={'w-40'}
                                  content={'Deleting'}
                                />
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleMessageDelete(element._id)
                                  }
                                  className="group/delete h-14 rounded-2xl bg-linear-to-r from-red-500 via-pink-500 to-rose-600 px-7 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(239,68,68,0.5)]"
                                >
                                  <Trash2 className="mr-2 h-5 w-5 transition-transform duration-300 group-hover/delete:rotate-12" />
                                  Delete Message
                                </Button>
                              )}
                            </CardFooter>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex min-h-125 flex-col items-center justify-center rounded-[34px] border border-dashed border-white/10 bg-white/3 text-center backdrop-blur-xl">

                    <div className="relative mb-8">
                      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"></div>

                      <div className="relative rounded-full border border-cyan-400/20 bg-cyan-500/10 p-8">
                        <MessageSquareMore className="h-20 w-20 text-cyan-400" />
                      </div>
                    </div>

                    <h2 className="text-5xl font-black tracking-wide text-white">
                      No Messages Yet
                    </h2>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-gray-400">
                      Your inbox is beautifully empty right now. Once visitors
                      contact you through your portfolio, their messages will
                      appear here instantly.
                    </p>

                    <Button
                      onClick={handleReturnToDashboard}
                      className="mt-8 h-14 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Return Home
                    </Button>
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

export default Messages