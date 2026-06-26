import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from '@/store/slices/forgotResetPasswordSlice.js'

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import SpecialLoadingButton from './subComponents/SpecialLoadingButton'

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

import {
  Mail,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
} from 'lucide-react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const { loading, error, message } = useSelector(
    (state) => state.forgotResetPassword
  )

  const { isAuthenticated } = useSelector(
    (state) => state.user
  )

  const dispatch = useDispatch()

  const navigateTo = useNavigate()

  const handleForgotpassword = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllForgotPasswordErrors())
    }

    if (isAuthenticated) {
      navigateTo('/')
    }

    if (message) {
      toast.success(message)
    }
  }, [dispatch, error, isAuthenticated, loading, message])

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10">

        {/* Background Glow Effects */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Main Card */}
        <Card className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

          <CardContent className="grid p-0 lg:grid-cols-2">

            {/* Left Side Form */}
            <div className="relative flex flex-col justify-center p-8 md:p-14">

              {/* Floating Blur */}
              <div className="absolute top-10 right-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl"></div>

              {/* Logo/Icon */}
              <div className="mb-8 flex items-center gap-4">

                <div className="rounded-2xl bg-cyan-500/15 p-4">
                  <LockKeyhole className="h-8 w-8 text-cyan-400" />
                </div>

                <div>
                  <h1 className="text-4xl font-black tracking-tight text-white">
                    Forgot Password
                  </h1>

                  <p className="mt-1 text-sm text-gray-400">
                    Securely recover your dashboard account
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleForgotpassword}
                className="relative z-10"
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
                        type="email"
                        placeholder="Enter your email address"
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

                  {/* Button */}
                  <Field>
                    {loading ? (
                      <SpecialLoadingButton
                        content={'Requesting'}
                      />
                    ) : (
                      <Button
                        type="submit"
                        className="group h-14 w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                      >
                        Send Reset Request

                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    )}
                  </Field>

                  {/* Login Redirect */}
                  <FieldDescription className="pt-2 text-center text-gray-400">
                    Remember your password?{' '}

                    <Link
                      to="/login"
                      className="font-semibold text-cyan-300 transition-all duration-300 hover:text-cyan-200"
                    >
                      Login Here
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>

              {/* Security Box */}
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                <div className="flex items-start gap-4">

                  <div className="rounded-2xl bg-emerald-500/10 p-3">
                    <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                      Secure Password Recovery

                      <Sparkles className="h-4 w-4 animate-pulse text-cyan-400" />
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      We’ll send a secure password reset link to
                      your registered email address.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="relative hidden items-center justify-center overflow-hidden bg-[#0f172a] lg:flex">

              {/* Overlay Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-fuchsia-500/20"></div>

              {/* Animated Circles */}
              <div className="absolute top-20 left-20 h-40 w-40 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>

              <div className="absolute bottom-20 right-20 h-52 w-52 animate-pulse rounded-full bg-fuchsia-500/20 blur-3xl"></div>

              {/* Main Image */}
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="Forgot Password"
                className="relative z-10 h-full w-full object-cover opacity-80"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-12 left-12 right-12 z-20 rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl">

                <h2 className="text-4xl font-black leading-tight text-white">
                  Secure Your <br /> Digital Identity
                </h2>

                <p className="mt-4 max-w-md text-gray-300">
                  Your portfolio dashboard is protected with
                  advanced authentication and secure password
                  recovery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="absolute bottom-6 text-center text-sm text-gray-500">
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
    </>
  )
}

export default ForgotPassword;