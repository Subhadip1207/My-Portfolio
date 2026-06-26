import {
  addNewSkill,
  clearAllSkillsErrors,
  getAllskills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Image,
  Sparkles,
  UploadCloud,
  Code2,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const AddSkill = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
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
    (state) => state.skill
  );

  const handleNewSkill = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);

    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillsErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetSkillSlice());
      dispatch(getAllskills());

      setTitle("");
      setProficiency("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-zinc-950 to-black px-4 py-10 sm:pl-20">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-3xl"
      >
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/10 px-8 py-10">
            
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-violet-500/10" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-500/20 p-3 text-cyan-400">
                  <Sparkles className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-4xl font-extrabold tracking-wide text-white">
                    Add New Skill
                  </h1>

                  <p className="mt-1 text-sm text-zinc-400">
                    Showcase your technical expertise beautifully.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleNewSkill}
            className="space-y-8 px-8 py-10"
          >
            
            {/* Skill Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <Label className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">
                <Code2 className="h-4 w-4 text-cyan-400" />
                Skill Title
              </Label>

              <Input
                type="text"
                placeholder="React.js"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </motion.div>

            {/* Proficiency */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <Label className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">
                <BarChart3 className="h-4 w-4 text-violet-400" />
                Proficiency (%)
              </Label>

              <Input
                type="number"
                placeholder="90"
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-violet-400 focus:ring-violet-400"
              />

              {/* Progress Preview */}
              {proficiency && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                    <span>Skill Level</span>
                    <span>{proficiency}%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${proficiency}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full bg-linear-to-r from-cyan-400 to-violet-500"
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Label className="text-sm font-semibold tracking-wide text-zinc-300">
                Skill Logo / Icon
              </Label>

              <div className="group relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 transition-all duration-500 hover:border-cyan-400/50 hover:bg-cyan-500/5">
                
                <div className="flex flex-col items-center justify-center text-center">
                  
                  {svgPreview ? (
                    <motion.img
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={svgPreview}
                      alt="Preview"
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
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105">
                      <UploadCloud className="h-5 w-5" />
                      Upload Image
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
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              {loading ? (
                <SpecialLoadingButton
                  content={"Adding Skill"}
                  width={"w-full"}
                />
              ) : (
                <Button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-lg font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30"
                >
                  Add Skill
                </Button>
              )}
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddSkill;