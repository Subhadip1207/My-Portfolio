import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from '@/store/slices/userSlice'

import { toast } from 'react-toastify'
import SpecialLoadingButton from './SpecialLoadingButton'

import {
  Camera,
  FileText,
  Globe,
  User,
  Phone,
  Mail,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import { FaLinkedin, FaSquareFacebook, FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

import { motion } from 'framer-motion'

const UpdateProfile = () => {
  const { user, loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  )

  const [fullName, setFullName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '')

  const [portfolioURL, setPortfolioURL] = useState(
    user?.portfolioURL === 'undefined' ? '' : user?.portfolioURL
  )

  const [githubURL, setGithubURL] = useState(
    user?.githubURL === 'undefined' ? '' : user?.githubURL
  )

  const [instagramURL, setInstagramURL] = useState(
    user?.instagramURL === 'undefined' ? '' : user?.instagramURL
  )

  const [facebookURL, setFacebookURL] = useState(
    user?.facebookURL === 'undefined' ? '' : user?.facebookURL
  )

  const [twitterURL, setTwitterURL] = useState(
    user?.twitterURL === 'undefined' ? '' : user?.twitterURL
  )

  const [linkedInURL, setLinkedinURL] = useState(
    user?.linkedInURL === 'undefined' ? '' : user?.linkedInURL
  )

  const [codingPlatformURL, setCodingPlatformURL] = useState(
    user?.codingPlatformURL === 'undefined'
      ? ''
      : user?.codingPlatformURL
  )

  const [avatar, setAvatar] = useState(
    user?.avatar?.url || ''
  )

  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url || ''
  )

  const [resume, setResume] = useState(
    user?.resume?.url || ''
  )

  const [resumePreview, setResumePreview] = useState(
    user?.resume?.url || ''
  )

  const dispatch = useDispatch()

  const avatarHandler = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      setResumePreview(reader.result)
      setResume(file)
    }
  }

  const updateProfileHandler = () => {
    const formData = new FormData()

    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('aboutMe', aboutMe)

    formData.append('portfolioURL', portfolioURL)
    formData.append('githubURL', githubURL)
    formData.append('instagramURL', instagramURL)
    formData.append('facebookURL', facebookURL)
    formData.append('twitterURL', twitterURL)
    formData.append('linkedInURL', linkedInURL)
    formData.append('codingPlatformURL', codingPlatformURL)

    formData.append('avatar', avatar)
    formData.append('resume', resume)

    dispatch(updateProfile(formData))
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

  const inputClass =
    'h-12 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-cyan-400'

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#020817]/70 p-6 backdrop-blur-2xl">

        {/* Glow Effects */}
        <div className="absolute -left-20 -top-20 h-55 w-55 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute -bottom-25 -right-25 h-65 w-65 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

        <div className="relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="flex items-center gap-3 text-4xl font-extrabold text-white">
                <div className="rounded-2xl bg-cyan-500/15 p-3">
                  <Sparkles className="h-7 w-7 text-cyan-400 animate-pulse" />
                </div>

                Update Profile
              </h1>

              <p className="mt-2 text-gray-400">
                Personalize and manage your portfolio profile beautifully.
              </p>
            </div>
          </motion.div>

          {/* Images */}
          <div className="mb-10 grid gap-8 lg:grid-cols-2">

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-cyan-500/15 p-3">
                  <Camera className="h-6 w-6 text-cyan-400" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Profile Image
                  </h2>

                  <p className="text-sm text-gray-400">
                    Upload your profile picture
                  </p>
                </div>
              </div>

              <Link
                to={user?.avatar?.url}
                target="_blank"
              >
                <img
                  src={avatarPreview || './vite.svg'}
                  alt="avatar"
                  className="h-80 w-full rounded-3xl object-cover transition-all duration-500 group-hover:scale-[1.02]"
                />
              </Link>

              <label className="mt-5 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-500/10 px-5 py-4 text-cyan-300 transition-all duration-300 hover:bg-cyan-500 hover:text-white">
                <UploadCloud className="h-5 w-5" />

                Upload Avatar

                <input
                  type="file"
                  className="hidden"
                  onChange={avatarHandler}
                />
              </label>
            </motion.div>

            {/* Resume */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-fuchsia-500/15 p-3">
                  <FileText className="h-6 w-6 text-fuchsia-400" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Resume
                  </h2>

                  <p className="text-sm text-gray-400">
                    Upload your latest resume
                  </p>
                </div>
              </div>

              <Link
                to={user?.resume?.url}
                target="_blank"
              >
                <img
                  src={resumePreview || './vite.svg'}
                  alt="resume"
                  className="h-80 w-full rounded-3xl object-cover transition-all duration-500 group-hover:scale-[1.02]"
                />
              </Link>

              <label className="mt-5 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-fuchsia-400/20 bg-fuchsia-500/10 px-5 py-4 text-fuchsia-300 transition-all duration-300 hover:bg-fuchsia-500 hover:text-white">
                <UploadCloud className="h-5 w-5" />

                Upload Resume

                <input
                  type="file"
                  className="hidden"
                  onChange={resumeHandler}
                />
              </label>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6"
          >

            {/* Full Name */}
            <div className="grid gap-3">
              <Label className="text-gray-300">Full Name</Label>

              <div className="relative">
                <User className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label className="text-gray-300">Email</Label>

              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="grid gap-3">
              <Label className="text-gray-300">Phone</Label>

              <div className="relative">
                <Phone className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            {/* About */}
            <div className="grid gap-3">
              <Label className="text-gray-300">About Me</Label>

              <Textarea
                value={aboutMe}
                placeholder="Tell something about yourself..."
                onChange={(e) => setAboutMe(e.target.value)}
                className="min-h-40 rounded-3xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-cyan-400"
              />
            </div>

            {/* Social URLs */}
            <div className="grid gap-6 lg:grid-cols-2">

              <div className="relative">
                <Globe className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={portfolioURL}
                  placeholder="Portfolio URL"
                  onChange={(e) => setPortfolioURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>

              <div className="relative">
                <FaSquareGithub className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={githubURL}
                  placeholder="GitHub URL"
                  onChange={(e) => setGithubURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>

              <div className="relative">
                <FaLinkedin className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={linkedInURL}
                  placeholder="LinkedIn URL"
                  onChange={(e) => setLinkedinURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={codingPlatformURL}
                  placeholder="Coding Platform URL"
                  onChange={(e) => setCodingPlatformURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>

              <div className="relative">
                <BsInstagram className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={instagramURL}
                  placeholder="Instagram URL"
                  onChange={(e) => setInstagramURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>

              <div className="relative">
                <FaSquareFacebook className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={facebookURL}
                  placeholder="Facebook URL"
                  onChange={(e) => setFacebookURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>

              <div className="relative lg:col-span-2">
                <FaSquareXTwitter className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />

                <Input
                  type="text"
                  value={twitterURL}
                  placeholder="Twitter (X) URL"
                  onChange={(e) => setTwitterURL(e.target.value)}
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              {!loading ? (
                <Button
                  onClick={updateProfileHandler}
                  className="h-14 w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
                >
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={'Updating'} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile;