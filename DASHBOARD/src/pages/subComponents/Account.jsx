import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Settings,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState('Profile')

  const menuItems = [
    {
      title: 'Profile',
      icon: <User className="h-5 w-5" />,
    },
    {
      title: 'Update Profile',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: 'Update Password',
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ]

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Profile':
        return <Profile />

      case 'Update Profile':
        return <UpdateProfile />

      case 'Update Password':
        return <UpdatePassword />

      default:
        return <Profile />
    }
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#020617] p-4 md:p-8">

        {/* Background Effects */}
        <div className="absolute -left-30 -top-30 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-30 -right-30 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Top Heading */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-white/5 px-5 py-3 backdrop-blur-xl">

              <div className="rounded-xl bg-cyan-500/15 p-3">
                <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                  Account Settings
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Manage your profile, password and account settings.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Layout */}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-fit rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)]"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  Navigation
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Switch between account sections.
                </p>
              </div>

              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedComponent(item.title)}
                    className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-4 py-4 transition-all duration-300
                      
                      ${
                        selectedComponent === item.title
                          ? 'border-cyan-400/40 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-[0_0_25px_rgba(34,211,238,0.2)]'
                          : 'border-white/10 bg-white/3 text-gray-400 hover:border-cyan-400/20 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >

                    {/* Glow Hover */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-r from-cyan-500/5 via-blue-500/5 to-fuchsia-500/5"></div>

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`rounded-xl p-2 transition-all duration-300
                          ${
                            selectedComponent === item.title
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : 'bg-white/5 text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300'
                          }
                        `}
                      >
                        {item.icon}
                      </div>

                      <span className="text-sm font-semibold tracking-wide">
                        {item.title}
                      </span>
                    </div>

                    <ChevronRight
                      className={`h-5 w-5 transition-all duration-300
                        ${
                          selectedComponent === item.title
                            ? 'translate-x-1 text-cyan-300'
                            : 'text-gray-500 group-hover:translate-x-1 group-hover:text-cyan-300'
                        }
                      `}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Dynamic Content */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedComponent}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.35 }}
                >
                  {renderComponent()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Account;