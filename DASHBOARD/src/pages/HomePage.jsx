import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllUserErrors, logout } from '../store/slices/userSlice.js'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import {
  ChessQueen,
  FolderGit2,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  User,
  Sparkles,
  ALargeSmall
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import Dashboard from './subComponents/Dashboard.jsx'
import AddProject from './subComponents/AddProject.jsx'
import AddSkill from './subComponents/AddSkill.jsx'
import AddApplication from './subComponents/AddApplication.jsx'
import Account from './subComponents/Account.jsx'
import AddTimeline from './subComponents/AddTimeline.jsx'
import Messages from './subComponents/Messages.jsx'
import AddLanguage from './subComponents/AddLanguage.jsx'

const HomePage = () => {

  const [active, setActive] = useState("Dashboard")

  const dispatch = useDispatch()

  const { error, isAuthenticated, user } = useSelector((state) => state.user)

  const navigateTo = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    toast.success("Logged out successfully")
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }

    if (!isAuthenticated) {
      navigateTo("/login")
    }
  }, [isAuthenticated])

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className='h-5 w-5' />,
    },
    {
      name: "Add Project",
      icon: <FolderGit2 className='h-5 w-5' />,
    },
    {
      name: "Add Skills",
      icon: <ChessQueen className='h-5 w-5' />,
    },
    {
      name: "Add Languages",
      icon: <ALargeSmall className='h-5 w-5' />,
    },
    {
      name: "Add Application",
      icon: <LayoutGrid className='h-5 w-5' />,
    },
    {
      name: "Add Timeline",
      icon: <History className='h-5 w-5' />,
    },
    {
      name: "Messages",
      icon: <MessageSquareMore className='h-5 w-5' />,
    },
    {
      name: "Account",
      icon: <User className='h-5 w-5' />,
    },
  ]

  const renderComponent = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />

      case "Add Project":
        return <AddProject />

      case "Add Skills":
        return <AddSkill />

      case "Add Languages":
        return <AddLanguage />

      case "Add Application":
        return <AddApplication />

      case "Account":
        return <Account />

      case "Add Timeline":
        return <AddTimeline />

      case "Messages":
        return <Messages />

      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-black via-zinc-950 to-slate-950 text-white overflow-hidden'>

        {/* Animated background */}
        <div className='fixed inset-0 z-0 overflow-hidden'>
          <div className='absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse'></div>
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full animate-pulse'></div>
        </div>

        {/* Sidebar */}
        <aside className='fixed inset-y-0 left-0 z-50 hidden w-20 border-r border-white/10 bg-white/5 backdrop-blur-xl sm:flex flex-col justify-between py-6'>

          {/* Logo */}
          <div className='flex flex-col items-center gap-8'>

            <div className='flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'>
              <Sparkles className='w-7 h-7 text-white animate-pulse' />
            </div>

            {/* Menu */}
            <TooltipProvider>
              <nav className='flex flex-col items-center gap-5'>

                {
                  menuItems.map((item, index) => (
                    <Tooltip key={index}>

                      <TooltipTrigger asChild>

                        <button
                          onClick={() => setActive(item.name)}
                          className={`
                            relative group flex items-center justify-center
                            w-12 h-12 rounded-2xl transition-all duration-300
                            hover:scale-110
                            ${active === item.name
                              ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          {item.icon}
                        </button>

                      </TooltipTrigger>

                      <TooltipContent side='right'>
                        {item.name}
                      </TooltipContent>

                    </Tooltip>
                  ))
                }

              </nav>
            </TooltipProvider>
          </div>

          {/* Logout */}
          <div className='flex justify-center'>
            <TooltipProvider>
              <Tooltip>

                <TooltipTrigger asChild>

                  <button
                    onClick={logoutHandler}
                    className='flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110'
                  >
                    <LogOut className='h-5 w-5' />
                  </button>

                </TooltipTrigger>

                <TooltipContent side='right'>
                  Logout
                </TooltipContent>

              </Tooltip>
            </TooltipProvider>
          </div>

        </aside>

        {/* Mobile Header */}
        <header className='sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl sm:hidden'>

          <div className='flex items-center justify-between px-4 py-4'>

            <Sheet>

              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <PanelLeft className='w-5 h-5' />
                </Button>
              </SheetTrigger>

              <SheetContent
                side='left'
                className="bg-black border-r border-white/10 text-white"
              >

                <div className='mt-10 flex flex-col gap-5'>

                  {
                    menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(item.name)}
                        className={`
                          flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                          ${active === item.name
                            ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                            : "bg-white/5 hover:bg-white/10 text-zinc-300"
                          }
                        `}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </button>
                    ))
                  }

                  <button
                    onClick={logoutHandler}
                    className='flex items-center gap-4 p-4 rounded-xl bg-red-500/10 hover:bg-red-500 transition-all duration-300 text-red-400 hover:text-white'
                  >
                    <LogOut className='w-5 h-5' />
                    <span>Logout</span>
                  </button>

                </div>

              </SheetContent>

            </Sheet>

            <h1 className='text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
              Admin Panel
            </h1>

          </div>

        </header>

        {/* Main Content */}
        <main className='relative z-10 sm:ml-20 min-h-screen'>

          {/* Top Welcome Section */}
          <div className='px-5 sm:px-10 pt-8 pb-4'>

            <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 shadow-2xl'>

              <div className='absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>

              <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-6'>

                <div className='flex items-center gap-5'>

                  <div className='relative'>
                    <img
                      src={user?.avatar?.url}
                      alt="avatar"
                      className='w-24 h-24 rounded-full border-4 border-cyan-500 object-cover shadow-lg shadow-cyan-500/30'
                    />

                    <span className='absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-black animate-pulse'></span>
                  </div>

                  <div>
                    <h1 className='text-3xl sm:text-5xl font-extrabold leading-tight'>
                      Welcome Back,
                    </h1>

                    <h2 className='text-2xl sm:text-4xl font-bold bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent'>
                      {user ? user.fullName : "User"}
                    </h2>

                    <p className='text-zinc-400 mt-2'>
                      Manage your portfolio dashboard professionally.
                    </p>
                  </div>

                </div>

                <div className='hidden lg:flex'>
                  <div className='px-6 py-4 rounded-2xl bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20'>
                    <p className='text-zinc-300 text-sm'>Current Active Page</p>
                    <h2 className='text-2xl font-bold text-cyan-400 mt-1'>
                      {active}
                    </h2>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Dynamic Component */}
          <div className='px-2 sm:px-5 pb-10 animate-in fade-in duration-500'>
            {renderComponent()}
          </div>

        </main>

      </div>
    </>
  )
}

export default HomePage