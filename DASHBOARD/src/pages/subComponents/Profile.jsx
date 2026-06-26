import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  User,
  Mail,
  Phone,
  Globe,
  Code2,
  FileText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { FaLinkedin, FaSquareFacebook, FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

const Profile = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] p-6 shadow-[0_0_60px_rgba(0,0,0,0.6)] md:p-10">

        {/* Background Glow */}
        <div className="absolute -top-30 -left-30 h-70 w-70 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-30 -right-25 h-75 w-75 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <div className="relative z-10">

          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-2xl bg-cyan-500/15 p-4">
                  <User className="h-8 w-8 text-cyan-400" />
                </div>

                <div>
                  <h1 className="flex items-center gap-2 text-4xl font-black tracking-tight text-white">
                    Profile Overview
                    <Sparkles className="h-6 w-6 animate-pulse text-cyan-400" />
                  </h1>

                  <p className="mt-2 text-sm text-gray-400">
                    Your complete professional profile preview.
                  </p>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 backdrop-blur-xl">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-semibold text-cyan-200">
                Verified Portfolio
              </span>
            </div>
          </div>

          {/* Profile & Resume */}
          <div className="mb-10 grid gap-8 lg:grid-cols-2">

            {/* Avatar */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">

              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10"></div>

              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-3">
                  <User className="h-5 w-5 text-cyan-400" />

                  <Label className="text-base font-semibold text-cyan-100">
                    Profile Image
                  </Label>
                </div>

                <Link
                  to={user?.avatar?.url}
                  target="_blank"
                  className="group/image relative block overflow-hidden rounded-3xl"
                >
                  <img
                    src={user?.avatar?.url}
                    alt="avatar"
                    className="h-87.5 w-full rounded-3xl object-cover transition-all duration-700 group-hover/image:scale-110"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-500 group-hover/image:opacity-100">
                    <ExternalLink className="h-10 w-10 text-white" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Resume */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-400/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]">

              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-r from-fuchsia-500/10 via-pink-500/10 to-cyan-500/10"></div>

              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-fuchsia-400" />

                  <Label className="text-base font-semibold text-fuchsia-100">
                    Resume Preview
                  </Label>
                </div>

                <Link
                  to={user?.resume?.url}
                  target="_blank"
                  className="group/resume relative block overflow-hidden rounded-3xl"
                >
                  <img
                    src={user?.resume?.url}
                    alt="resume"
                    className="h-87.5 w-full rounded-3xl object-cover transition-all duration-700 group-hover/resume:scale-110"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-500 group-hover/resume:opacity-100">
                    <ExternalLink className="h-10 w-10 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Full Name */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <User className="h-4 w-4 text-cyan-400" />
                Full Name
              </Label>

              <Input
                type="text"
                defaultValue={user?.fullName || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <Mail className="h-4 w-4 text-cyan-400" />
                Email
              </Label>

              <Input
                type="email"
                defaultValue={user?.email || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <Phone className="h-4 w-4 text-cyan-400" />
                Phone
              </Label>

              <Input
                type="text"
                defaultValue={user?.phone || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Portfolio */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <Globe className="h-4 w-4 text-cyan-400" />
                Portfolio URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.portfolioURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Github */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <FaSquareGithub className="h-4 w-4 text-cyan-400" />
                Github URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.githubURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <FaLinkedin className="h-4 w-4 text-cyan-400" />
                LinkedIn URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.linkedInURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Coding */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <Code2 className="h-4 w-4 text-cyan-400" />
                Coding Platform URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.codingPlatformURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <BsInstagram className="h-4 w-4 text-cyan-400" />
                Instagram URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.instagramURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Facebook */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <FaSquareFacebook className="h-4 w-4 text-cyan-400" />
                Facebook URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.facebookURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>

            {/* Twitter */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-cyan-100">
                <FaSquareXTwitter className="h-4 w-4 text-cyan-400" />
                Twitter (X) URL
              </Label>

              <Input
                type="text"
                defaultValue={user?.twitterURL || ''}
                disabled
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
              />
            </div>
          </div>

          {/* About Me */}
          <div className="mt-8 space-y-3">
            <Label className="flex items-center gap-2 text-cyan-100">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              About Me
            </Label>

            <Textarea
              defaultValue={user?.aboutMe || ''}
              disabled
              className="min-h-45 rounded-3xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-xl"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;