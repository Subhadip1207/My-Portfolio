import React, { useEffect, useState } from 'react'

import { cn } from '../lib/utils.js'

import { Button } from '../components/ui/button.jsx'

import {
  Card,
  CardContent,
} from '../components/ui/card.jsx'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '../components/ui/field.jsx'

import { Input } from '../components/ui/input.jsx'

import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import {
  login,
  clearAllUserErrors,
} from '../store/slices/userSlice.js'

import SpecialLoadingButton from './subComponents/SpecialLoadingButton.jsx'

import {
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  Stars,
} from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const { loading, isAuthenticated, error } =
    useSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigateTo = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Email and Password are required')
      return
    }

    dispatch(login(email, password))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }

    if (isAuthenticated) {
      navigateTo('/')
    }
  }, [dispatch, isAuthenticated, error, loading])

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10">

        {/* Background Glow */}
        <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-1/4 animate-bounce">
          <Stars className="h-5 w-5 text-cyan-400/50" />
        </div>

        <div className="absolute bottom-20 right-1/3 animate-pulse">
          <Sparkles className="h-6 w-6 text-fuchsia-400/50" />
        </div>

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-6xl">

          <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

            <CardContent className="grid p-0 lg:grid-cols-2">

              {/* Left Side Form */}
              <div className="relative flex flex-col justify-center p-8 md:p-14">

                {/* Glow */}
                <div className="absolute top-10 right-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl"></div>

                {/* Header */}
                <div className="mb-10">

                  <div className="mb-6 flex items-center gap-4">

                    <div className="rounded-2xl bg-cyan-500/15 p-4">
                      <LockKeyhole className="h-8 w-8 text-cyan-400" />
                    </div>

                    <div>
                      <h1 className="text-4xl font-black tracking-tight text-white">
                        Welcome Back
                      </h1>

                      <p className="mt-1 text-sm text-gray-400">
                        Login to access your dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300 backdrop-blur-xl">
                    <ShieldCheck className="h-4 w-4" />

                    Your account is protected with secure
                    authentication
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <FieldGroup className="space-y-6">

                    {/* Email */}
                    <Field>
                      <FieldLabel className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[2px] text-cyan-300">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </FieldLabel>

                      <div className="group relative">

                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          required
                          className="h-14 rounded-2xl border border-white/10 bg-white/5 pl-5 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                        />

                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-linear-to-r from-cyan-500/10 to-blue-500/10"></div>
                      </div>
                    </Field>

                    {/* Password */}
                    <Field>
                      <div className="mb-3 flex items-center justify-between">

                        <FieldLabel className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[2px] text-cyan-300">
                          <LockKeyhole className="h-4 w-4" />
                          Password
                        </FieldLabel>

                        <Link
                          to="/password/forgot"
                          className="text-sm font-medium text-cyan-300 transition-all duration-300 hover:text-cyan-200 hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <div className="group relative">

                        <Input
                          id="password"
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          required
                          className="h-14 rounded-2xl border border-white/10 bg-white/5 pr-14 pl-5 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                        />

                        {/* Toggle Password */}
                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400 transition-all duration-300 hover:text-cyan-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>

                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 bg-linear-to-r from-cyan-500/10 to-blue-500/10"></div>
                      </div>
                    </Field>

                    {/* Button */}
                    <Field>
                      {loading ? (
                        <SpecialLoadingButton
                          content={'Logging In'}
                        />
                      ) : (
                        <Button
                          type="submit"
                          className="group h-14 w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                        >
                          Login Now

                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      )}
                    </Field>

                    {/* Signup */}
                    <FieldDescription className="pt-2 text-center text-gray-400">
                      Don&apos;t have an account?{' '}

                      <span className="cursor-pointer font-semibold text-cyan-300 transition-all duration-300 hover:text-cyan-200">
                        Sign Up
                      </span>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </div>

              {/* Right Side */}
              <div className="relative hidden overflow-hidden bg-[#0f172a] lg:flex">

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-fuchsia-500/20"></div>

                {/* Floating Glow */}
                <div className="absolute top-20 left-16 h-40 w-40 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>

                <div className="absolute right-16 bottom-20 h-52 w-52 animate-pulse rounded-full bg-fuchsia-500/20 blur-3xl"></div>

                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop"
                  alt="Login"
                  className="h-full w-full object-cover opacity-80"
                />

                {/* Overlay Text */}
                <div className="absolute bottom-10 left-10 right-10 rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl">

                  <h2 className="text-4xl font-black leading-tight text-white">
                    Build. Create. <br />
                    Manage.
                  </h2>

                  <p className="mt-4 max-w-md text-gray-300">
                    Access your futuristic admin dashboard and
                    manage your portfolio beautifully with
                    style & performance.
                  </p>

                  <div className="mt-6 flex items-center gap-3 text-cyan-300">
                    <Sparkles className="h-5 w-5 animate-pulse" />

                    Modern UI Experience
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <span className="text-cyan-300">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-cyan-300">
              Privacy Policy
            </span>
            .
          </div>
        </div>
      </div>
    </>
  )
}