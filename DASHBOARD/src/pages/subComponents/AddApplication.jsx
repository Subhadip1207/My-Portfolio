import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  addNewSoftwareApplication,
  clearAllSoftwareApplicationsErrors,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";

import SpecialLoadingButton from "./SpecialLoadingButton";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import {
  Image,
  UploadCloud,
  Sparkles,
  AppWindow,
  MonitorSmartphone,
} from "lucide-react";

import { motion } from "framer-motion";

const AddApplication = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { loading, error, message } = useSelector(
    (state) => state.application
  );

  const handleNewApplication = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("svg", svg);

    dispatch(addNewSoftwareApplication(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareApplicationsErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());

      setName("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-zinc-950 to-black px-4 py-10 sm:pl-20">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-3xl"
      >
        <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/10 px-8 py-10">
            
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-violet-500/10" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="mb-4 flex items-center gap-4">
                
                <div className="rounded-2xl bg-cyan-500/20 p-4 text-cyan-400">
                  <MonitorSmartphone className="h-8 w-8" />
                </div>

                <div>
                  <h1 className="text-4xl font-extrabold tracking-wide text-white">
                    Add Software App
                  </h1>

                  <p className="mt-1 text-sm text-zinc-400">
                    Add your favorite development tools & applications.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleNewApplication}
            className="space-y-8 px-8 py-10"
          >
            
            {/* App Name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <Label className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">
                <AppWindow className="h-4 w-4 text-cyan-400" />
                Software Application Name
              </Label>

              <Input
                type="text"
                placeholder="Postman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <Label className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">
                <Sparkles className="h-4 w-4 text-violet-400" />
                Application Logo
              </Label>

              <div className="group relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 transition-all duration-500 hover:border-cyan-400/50 hover:bg-cyan-500/5">
                
                <div className="flex flex-col items-center justify-center text-center">
                  
                  {svgPreview ? (
                    <motion.img
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      src={svgPreview}
                      alt="preview"
                      className="mb-5 h-28 w-28 rounded-2xl object-contain shadow-2xl"
                    />
                  ) : (
                    <div className="mb-5 rounded-full bg-zinc-900 p-6">
                      <Image className="h-14 w-14 text-zinc-500" />
                    </div>
                  )}

                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                  >
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105">
                      <UploadCloud className="h-5 w-5" />
                      Upload Logo
                    </div>

                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleSvg}
                    />
                  </label>

                  <p className="mt-4 text-sm text-zinc-500">
                    PNG, JPG, SVG up to 10MB
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-2"
            >
              {loading ? (
                <SpecialLoadingButton
                  content={"Adding Application"}
                  width={"w-full"}
                />
              ) : (
                <Button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-lg font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30"
                >
                  Add Software Application
                </Button>
              )}
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddApplication;