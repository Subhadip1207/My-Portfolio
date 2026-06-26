import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Progress } from '@/components/ui/progress'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  Tabs,
  TabsContent
} from '@/components/ui/tabs'

import {
  clearAllSoftwareApplicationsErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice
} from '@/store/slices/softwareApplicationSlice'

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import SpecialLoadingButton from './SpecialLoadingButton.jsx'

import {
  FolderGit2,
  Layers3,
  MonitorSmartphone,
  Clock3,
  ExternalLink,
  Pencil,
  Trash2,
  Code2
} from 'lucide-react'

const Dashboard = () => {

  const { user } = useSelector(state => state.user)
  const { projects } = useSelector(state => state.project)
  const { skills } = useSelector(state => state.skill)
  const { languages } = useSelector(state => state.language)

  const {
    softwareApplications,
    loading,
    error,
    message
  } = useSelector(state => state.application)

  const { timeLines } = useSelector(state => state.timeline)

  const dispatch = useDispatch()

  const [appId, setAppId] = useState("")

  const handleSoftwareApp = (id) => {
    setAppId(id)
    dispatch(deleteSoftwareApplication(id))
  }

  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearAllSoftwareApplicationsErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetSoftwareApplicationSlice())
      dispatch(getAllSoftwareApplications())
    }

  }, [dispatch, error, message, loading])

  return (
    <div className='min-h-screen w-full bg-linear-to-br from-[#020617] via-[#0f172a] to-[#111827] text-white overflow-hidden'>

      {/* Background Blur Effects */}
      <div className='fixed top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl'></div>
      <div className='fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl'></div>

      <div className='relative flex flex-col sm:gap-6 sm:py-6 sm:pl-14 p-4'>

        {/* PAGE TITLE */}
        <div className='mb-4'>
          <h1 className='text-4xl md:text-5xl font-black tracking-wide bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
            Admin Dashboard
          </h1>

          <p className='text-gray-400 mt-2 text-lg'>
            Welcome back, {user.fullName}
          </p>
        </div>

        <main className='grid flex-1 gap-6 lg:grid-cols-2 xl:grid-cols-2'>

          <div className='grid auto-rows-max items-start gap-6 lg:col-span-2'>

            {/* TOP STATS */}
            <div className='grid items-stretch gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>

              {/* ABOUT CARD */}
              <Card className='flex flex-col justify-between h-full bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 rounded-3xl shadow-xl'>

                <CardHeader>
                  <CardTitle className='text-cyan-400 text-2xl'>
                    About Me
                  </CardTitle>

                  <CardDescription className='text-gray-300 leading-relaxed pt-2'>
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Link to={user.portfolioURL} target='_blank'>
                    <Button className='rounded-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300'>
                      Visit Portfolio
                    </Button>
                  </Link>
                </CardFooter>

              </Card>

              {/* PROJECT CARD */}
              <Card className='flex flex-col justify-between h-full bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 rounded-3xl shadow-xl'>

                <CardHeader className='items-center text-center'>

                  <FolderGit2 className='w-12 h-12 text-cyan-400 mb-3' />

                  <CardTitle className='text-xl text-white'>
                    Projects
                  </CardTitle>

                  <CardTitle className='text-6xl font-black text-cyan-400'>
                    {projects?.length}
                  </CardTitle>

                </CardHeader>

                <CardFooter className='justify-center'>
                  <Link to={"/manage/projects"}>
                    <Button className='rounded-full bg-cyan-500 hover:bg-cyan-600'>
                      Manage
                    </Button>
                  </Link>
                </CardFooter>

              </Card>

              {/* SKILLS CARD */}
              <Card className='flex flex-col justify-between h-full bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 rounded-3xl shadow-xl'>

                <CardHeader className='items-center text-center'>

                  <Layers3 className='w-12 h-12 text-purple-400 mb-3' />

                  <CardTitle className='text-xl text-white'>
                    Skills
                  </CardTitle>

                  <CardTitle className='text-6xl font-black text-purple-400'>
                    {skills?.length}
                  </CardTitle>

                </CardHeader>

                <CardFooter className='justify-center'>
                  <Link to={"/manage/skills"}>
                    <Button className='rounded-full bg-purple-500 hover:bg-purple-600'>
                      Manage
                    </Button>
                  </Link>
                </CardFooter>

              </Card>

              {/* Languages CARD */}
              <Card className='flex flex-col justify-between h-full bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500 rounded-3xl shadow-xl'>

                <CardHeader className='items-center text-center'>

                  <Code2 className='w-12 h-12 text-yellow-400 mb-3' />

                  <CardTitle className='text-xl text-white'>
                    Languages
                  </CardTitle>

                  <CardTitle className='text-6xl font-black text-yellow-400'>
                    {languages?.length}
                  </CardTitle>

                </CardHeader>

                <CardFooter className='justify-center'>
                  <Link to={"/manage/languages"}>
                    <Button className='rounded-full bg-yellow-500 hover:bg-yellow-600'>
                      Manage
                    </Button>
                  </Link>
                </CardFooter>

              </Card>

            </div>

            {/* SKILLS */}
            <Tabs defaultValue="skills">

              <TabsContent value="skills">

                <Card className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl'>

                  <CardHeader>
                    <CardTitle className='text-2xl text-purple-400'>
                      Skills
                    </CardTitle>
                  </CardHeader>

                  <CardContent className='grid sm:grid-cols-2 gap-5'>

                    {
                      skills?.length > 0 ? (

                        skills.map(element => (

                          <Card
                            key={element._id}
                            className='bg-black/30 border border-white/10 hover:scale-[1.03] transition-all duration-500 rounded-2xl'
                          >

                            <div className='flex items-center justify-between px-6 pt-6'>

                              <h2 className='text-lg font-semibold text-white'>
                                {element.title}
                              </h2>

                              <span className='text-cyan-400 font-bold'>
                                {element.proficiency}%
                              </span>

                            </div>

                            <CardFooter className='pt-5'>
                              <Progress
                                value={element.proficiency}
                                className='w-full h-3'
                              />
                            </CardFooter>

                          </Card>

                        ))

                      ) : (

                        <p className='text-center text-2xl text-gray-400'>
                          No Skills Found
                        </p>

                      )
                    }

                  </CardContent>

                </Card>

              </TabsContent>

            </Tabs>


            {/* PROJECTS TABLE */}
            <Tabs defaultValue="projects">

              <TabsContent value="projects">

                <Card className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl'>

                  <CardHeader>
                    <CardTitle className='text-2xl text-cyan-400'>
                      Projects
                    </CardTitle>
                  </CardHeader>

                  <CardContent>

                    <Table>

                      <TableHeader>
                        <TableRow className='border-white/10 hover:bg-transparent'>
                          <TableHead className='text-gray-300'>Title</TableHead>
                          <TableHead className='hidden md:table-cell text-gray-300'>Stack</TableHead>
                          <TableHead className='text-gray-300 '>Update</TableHead>
                          <TableHead className='text-gray-300'>Visit</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>

                        {
                          projects?.length > 0 ? (

                            projects.map(element => (

                              <TableRow
                                key={element._id}
                                className='border-white/10 hover:bg-white/5 transition-all duration-300'
                              >

                                <TableCell className='font-semibold text-white'>
                                  {element.title}
                                </TableCell>

                                <TableCell className='hidden md:table-cell text-gray-300'>
                                  {element.stack}
                                </TableCell>

                                <TableCell>
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button
                                      size="sm"
                                      className='rounded-full bg-blue-500 hover:bg-blue-600 flex gap-2'
                                    >
                                      <Pencil className='w-4 h-4' />
                                      Update
                                    </Button>
                                  </Link>
                                </TableCell>

                                <TableCell>
                                  <Link
                                    to={element.projectLink || "#"}
                                    target='_blank'
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className='rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black flex gap-2 -mr-28 text-right' style={{}}
                                    >
                                      <ExternalLink className='w-4 h-4 ' />
                                      Visit
                                    </Button>
                                  </Link>
                                </TableCell>

                              </TableRow>

                            ))

                          ) : (

                            <TableRow>
                              <TableCell
                                className='text-center text-2xl py-8 text-gray-400'
                                colSpan={4}
                              >
                                No Projects Found
                              </TableCell>
                            </TableRow>

                          )
                        }

                      </TableBody>

                    </Table>

                  </CardContent>

                </Card>

              </TabsContent>

            </Tabs>

            {/* LANGUAGES */}
            <Tabs defaultValue="languages">

              <TabsContent value="languages">

                <Card className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl'>

                  <CardHeader>
                    <CardTitle className='text-2xl text-purple-400'>
                      Languages
                    </CardTitle>
                  </CardHeader>

                  <CardContent className='grid sm:grid-cols-2 gap-5'>

                    {
                      languages?.length > 0 ? (

                        languages.map(element => (

                          <Card
                            key={element._id}
                            className='bg-black/30 border border-white/10 hover:scale-[1.03] transition-all duration-500 rounded-2xl'
                          >

                            <div className='flex items-center justify-between px-6 pt-6'>

                              <h2 className='text-lg font-semibold text-white'>
                                {element.title}
                              </h2>

                              <span className='text-cyan-400 font-bold'>
                                {element.proficiency}%
                              </span>

                            </div>

                            <CardFooter className='pt-5'>
                              <Progress
                                value={element.proficiency}
                                className='w-full h-3'
                              />
                            </CardFooter>

                          </Card>

                        ))

                      ) : (

                        <p className='text-center text-2xl text-gray-400'>
                          No Languages Found
                        </p>

                      )
                    }

                  </CardContent>

                </Card>

              </TabsContent>

            </Tabs>

            {/* SOFTWARE + TIMELINE */}
            <Tabs defaultValue="softwareApplications">

              <TabsContent
                value="softwareApplications"
                className='grid min-[1050px]:grid-cols-2 gap-6'
              >

                {/* SOFTWARE */}
                <Card className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl'>

                  <CardHeader>
                    <CardTitle className='text-2xl text-green-400 flex items-center gap-2'>
                      <MonitorSmartphone />
                      Software Applications
                    </CardTitle>
                  </CardHeader>

                  <CardContent>

                    <Table>

                      <TableHeader>
                        <TableRow className='border-white/10'>
                          <TableHead className='text-gray-300'>Name</TableHead>
                          <TableHead className='text-gray-300'>Icon</TableHead>
                          <TableHead className='text-gray-300'>Action</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>

                        {
                          softwareApplications?.length > 0 ? (

                            softwareApplications.map(element => (

                              <TableRow
                                key={element._id}
                                className='border-white/10 hover:bg-white/5 transition-all duration-300'
                              >

                                <TableCell className='text-white'>
                                  {element.name}
                                </TableCell>

                                <TableCell>
                                  <img
                                    src={element.svg?.url}
                                    alt={element.name}
                                    className='w-8 h-8 object-contain'
                                  />
                                </TableCell>

                                <TableCell>

                                  {
                                    loading && appId === element._id ? (

                                      <SpecialLoadingButton
                                        content={"Deleting"}
                                        width={"w-fit"}
                                      />

                                    ) : (

                                      <Button
                                        onClick={() => handleSoftwareApp(element._id)}
                                        className='rounded-full bg-red-500 hover:bg-red-600 flex gap-2'
                                      >
                                        <Trash2 className='w-4 h-4' />
                                        Delete
                                      </Button>

                                    )
                                  }

                                </TableCell>

                              </TableRow>

                            ))

                          ) : (

                            <TableRow>
                              <TableCell className='text-center text-xl py-6 text-gray-400'>
                                No Software Applications
                              </TableCell>
                            </TableRow>

                          )
                        }

                      </TableBody>

                    </Table>

                  </CardContent>

                </Card>

                {/* TIMELINE */}
                <Card className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl'>

                  <CardHeader className='flex flex-row items-center justify-between'>

                    <CardTitle className='text-2xl text-orange-400 flex items-center gap-2'>
                      <Clock3 />
                      Timeline
                    </CardTitle>

                    <Link to={"/manage/timeline"}>
                      <Button className='rounded-full bg-orange-500 hover:bg-orange-600'>
                        Manage
                      </Button>
                    </Link>

                  </CardHeader>

                  <CardContent>

                    <Table>

                      <TableHeader>
                        <TableRow className='border-white/10'>
                          <TableHead className='text-gray-300'>Title</TableHead>
                          <TableHead className='text-gray-300'>From</TableHead>
                          <TableHead className='text-right text-gray-300'>To</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>

                        {
                          timeLines?.length > 0 ? (

                            timeLines.map(element => (

                              <TableRow
                                key={element._id}
                                className='border-white/10 hover:bg-white/5 transition-all duration-300'
                              >

                                <TableCell className='text-white font-medium'>
                                  {element.title}
                                </TableCell>

                                <TableCell className='text-gray-300'>
                                  {element.timeLine.from}
                                </TableCell>

                                <TableCell className='text-right text-gray-300'>
                                  {element.timeLine.to || "Present"}
                                </TableCell>

                              </TableRow>

                            ))

                          ) : (

                            <TableRow>
                              <TableCell className='text-center text-xl py-6 text-gray-400'>
                                No Timeline Found
                              </TableCell>
                            </TableRow>

                          )
                        }

                      </TableBody>

                    </Table>

                  </CardContent>

                </Card>

              </TabsContent>

            </Tabs>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard