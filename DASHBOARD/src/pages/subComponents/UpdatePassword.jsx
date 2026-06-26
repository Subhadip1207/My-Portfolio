import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updatePassword,
} from '@/store/slices/userSlice'
import { toast } from 'react-toastify'

import {
  ShieldCheck,
  LockKeyhole,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  )

  const dispatch = useDispatch()

  const updatePasswordHandler = () => {
    dispatch(
      updatePassword(
        currentPassword,
        newPassword,
        confirmNewPassword
      )
    )
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }

    if (isUpdated) {
      dispatch(getUser())
      dispatch(resetProfile())
    }

    if (message) {
      toast.success(message)
    }
  }, [dispatch, loading, error, isUpdated])

  return (
    <>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] p-6 shadow-[0_0_60px_rgba(0,0,0,0.6)] md:p-10">

        {/* Background Glow */}
        <div className="absolute -top-25 -left-25 h-65 w-65 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-30 -right-25 h-70 w-70 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <div className="relative z-10">

          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-500/15 p-4">
                  <ShieldCheck className="h-8 w-8 text-cyan-400" />
                </div>

                <div>
                  <h1 className="flex items-center gap-2 text-4xl font-black tracking-tight text-white">
                    Update Password
                    <Sparkles className="h-6 w-6 animate-pulse text-cyan-400" />
                  </h1>

                  <p className="mt-2 text-sm text-gray-400">
                    Secure your dashboard with a stronger password.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 backdrop-blur-xl">
              <LockKeyhole className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-semibold text-cyan-200">
                Encrypted Security
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-7">

            {/* Current Password */}
            <div className="group space-y-3">
              <Label className="text-sm font-semibold tracking-wide text-cyan-100">
                Current Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                <Input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 pl-12 pr-14 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-cyan-300"
                >
                  {showCurrent ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="group space-y-3">
              <Label className="text-sm font-semibold tracking-wide text-cyan-100">
                New Password
              </Label>

              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                <Input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 pl-12 pr-14 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-cyan-300"
                >
                  {showNew ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="group space-y-3">
              <Label className="text-sm font-semibold tracking-wide text-cyan-100">
                Confirm New Password
              </Label>

              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                <Input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) =>
                    setConfirmNewPassword(e.target.value)
                  }
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 pl-12 pr-14 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-cyan-300"
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Strength */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-cyan-200">
                  Password Strength
                </p>

                <span className="text-xs text-gray-400">
                  Secure your account
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-pulse"></div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-gray-400">
                Use uppercase letters, numbers, and symbols for a
                stronger password.
              </p>
            </div>

            {/* Button */}
            <div className="pt-2">
              {!loading ? (
                <Button
                  onClick={updatePasswordHandler}
                  className="group relative h-14 w-full overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-fuchsia-600 text-lg font-bold text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                  <span className="relative flex items-center justify-center gap-3">
                    <ShieldCheck className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                    Update Password
                  </span>
                </Button>
              ) : (
                <SpecialLoadingButton content={'Updating'} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword