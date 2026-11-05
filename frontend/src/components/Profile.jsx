
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

import { Button } from "./ui/button";

import {
  Mail,
  MapPin,
  Phone,
  Edit,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Link as LinkIcon,
} from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const defaultProfile = {
    name: "John Doe",
    role: "Full Stack Developer | MERN Stack Developer",
    email: "john@example.com",
    location: "Kolkata, India",
    phone: "+91 9876543210",
    about: "Passionate Full Stack Developer with experience in building modern and responsive web applications. Skilled in React.js, Node.js, Express.js, and MongoDB. I enjoy solving problems, learning new technologies, and creating user-friendly applications.",
    skills: ["React.js", "JavaScript", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "HTML", "CSS"],
    experienceTitle: "Fresher",
    experience: "Looking for opportunities to start my professional career and contribute to innovative projects.",
    education: "Bachelor of Technology",
    department: "Computer Science & Engineering",
    educationPeriod: "2022 - 2026",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    resumeName: "John_Doe_Resume.pdf",
    resumeUrl: "",
  };
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem("jobPortalProfile") || "{}");
      return { ...defaultProfile, ...savedProfile, resumeUrl: savedProfile.resumeUrl || "" };
    } catch {
      return defaultProfile;
    }
  });
  const [draft, setDraft] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const getViewableResumeUrl = (url) => {
    if (!url || url.startsWith("data:")) return url;
    return url.replace("/raw/upload/", "/raw/upload/fl_attachment:false/");
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await axios.get(`${USER_API_BASE_URL}/profile`, {
          withCredentials: true,
        });
        const user = response.data.user;
        if (!user) return;

        const loadedProfile = (current) => ({
          ...current,
          name: user.fullname || current.name,
          email: user.email || current.email,
          phone: user.phoneNumber !== undefined && user.phoneNumber !== null ? String(user.phoneNumber) : "",
          about: user.profile?.bio || current.about,
          skills: user.profile?.skills?.length ? user.profile.skills : current.skills,
          resumeName: user.profile?.resumeOriginalName || "",
          resumeUrl: user.profile?.resume || "",
          resumeFile: undefined,
          profilePhoto: user.profile?.profilePhoto || "",
        });
        setProfile(loadedProfile);
        setDraft((current) => loadedProfile(current));
      } catch (error) {
        console.error("Unable to load profile resume.", error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const savedProfile = { ...profile };
    localStorage.setItem("jobPortalProfile", JSON.stringify(savedProfile));
  }, [profile]);

  const openEditor = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      event.target.value = "";
      toast.error("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      toast.error("Resume size must be 5 MB or less.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDraft((current) => ({
        ...current,
        resumeName: file.name,
        resumeUrl: reader.result,
        resumeFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      toast.error("Profile image size must be 5 MB or less.");
      return;
    }

    setProfilePhotoFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Cover Background */}
          <div className="h-40 bg-gradient-to-r from-[#4c1d95] via-[#6A38C2] to-[#9b7ce2]"></div>

          <div className="px-8 pb-8">

            <div className="flex flex-col md:flex-row justify-between items-start">

              {/* Avatar */}
              <div className="-mt-16">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage
                    src={profile.profilePhoto || undefined}
                    alt="Profile"
                  />
                  <AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </div>

              {/* Edit Button */}
              <div className="mt-5">
                <Button
                  type="button"
                  onClick={openEditor}
                  className="bg-[#6A38C2] hover:bg-[#5529a6] rounded-full px-6"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

            </div>

            {/* User Information */}
            <div className="mt-4">

              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {profile.role}
              </p>

              <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">

                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#6A38C2]" />
                  {profile.email}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#6A38C2]" />
                  {profile.location}
                </span>

                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#6A38C2]" />
                  {profile.phone}
                </span>

              </div>

            </div>

          </div>
        </div>


        {/* Main Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">

          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">

            {/* About Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About Me
              </h2>

              <p className="text-gray-600 leading-7">{profile.about}</p>

            </div>


            {/* Skills Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-purple-50 text-[#6A38C2] text-sm font-medium border border-purple-100 hover:bg-purple-100 transition"
                  >
                    {skill}
                  </span>
                ))}

              </div>

              {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
                  <form
                    className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const skills = Array.isArray(draft.skills)
                        ? draft.skills
                        : draft.skills.split(",").map((skill) => skill.trim()).filter(Boolean);
                        const saveProfile = async () => {
                          try {
                            setIsSaving(true);
                            const formData = new FormData();
                            formData.append("fullname", draft.name);
                            formData.append("email", draft.email);
                            formData.append("phoneNumber", draft.phone);
                            formData.append("bio", draft.about);
                            formData.append("skills", skills.join(","));
                            if (draft.resumeFile) formData.append("file", draft.resumeFile);
                            if (profilePhotoFile) formData.append("profilePhoto", profilePhotoFile);

                            const response = await axios.post(`${USER_API_BASE_URL}/profile/update`, formData, {
                              withCredentials: true,
                            });
                            const updatedProfile = response.data.user?.profile;
                            setProfile({
                              ...draft,
                              skills,
                              resumeUrl: updatedProfile?.resume || draft.resumeUrl,
                              resumeName: updatedProfile?.resumeOriginalName || draft.resumeName,
                              resumeFile: undefined,
                              profilePhoto: updatedProfile?.profilePhoto || draft.profilePhoto,
                            });
                            setProfilePhotoFile(null);
                            dispatch(setUser({
                              ...(user || response.data.user),
                              ...response.data.user,
                              profile: updatedProfile,
                            }));
                            setIsEditing(false);
                            toast.success(response.data.message || "Profile updated successfully.");
                          } catch (error) {
                            const uploadFailed = error.response?.status === 403 ||
                              error.response?.data?.message?.toLowerCase().includes("upload");
                            toast.error(
                              uploadFailed
                                ? "File upload failed. Please try again later."
                                : error.response?.data?.message || "Profile update failed."
                            );
                          } finally {
                            setIsSaving(false);
                          }
                        };
                        saveProfile();
                      }}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                      <button type="button" onClick={() => setIsEditing(false)} className="text-2xl text-gray-400 hover:text-gray-700" aria-label="Close">
                        &times;
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        ["name", "Full name"],
                        ["role", "Professional title"],
                        ["email", "Email"],
                        ["location", "Location"],
                        ["phone", "Phone"],
                      ].map(([field, label]) => (
                        <label key={field} className={field === "role" ? "sm:col-span-2" : ""}>
                          <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
                          <input
                            value={draft[field]}
                            onChange={(event) => setDraft((current) => ({ ...current, [field]: event.target.value }))}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]"
                          />
                        </label>
                      ))}
                      <label className="sm:col-span-2">
                        <span className="mb-1 block text-sm font-medium text-gray-700">About</span>
                        <textarea
                          rows="4"
                          value={draft.about}
                          onChange={(event) => setDraft((current) => ({ ...current, about: event.target.value }))}
                          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]"
                        />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Skills (comma separated)</span>
                        <input
                          value={Array.isArray(draft.skills) ? draft.skills.join(", ") : draft.skills}
                          onChange={(event) => setDraft((current) => ({ ...current, skills: event.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]"
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-sm font-medium text-gray-700">Experience title</span>
                        <input value={draft.experienceTitle} onChange={(event) => setDraft((current) => ({ ...current, experienceTitle: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label>
                        <span className="mb-1 block text-sm font-medium text-gray-700">Education</span>
                        <input value={draft.education} onChange={(event) => setDraft((current) => ({ ...current, education: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Experience summary</span>
                        <textarea rows="3" value={draft.experience} onChange={(event) => setDraft((current) => ({ ...current, experience: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label>
                        <span className="mb-1 block text-sm font-medium text-gray-700">Department</span>
                        <input value={draft.department} onChange={(event) => setDraft((current) => ({ ...current, department: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label>
                        <span className="mb-1 block text-sm font-medium text-gray-700">Education period</span>
                        <input value={draft.educationPeriod} onChange={(event) => setDraft((current) => ({ ...current, educationPeriod: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label>
                        <span className="mb-1 block text-sm font-medium text-gray-700">GitHub URL</span>
                        <input value={draft.github} onChange={(event) => setDraft((current) => ({ ...current, github: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label>
                        <span className="mb-1 block text-sm font-medium text-gray-700">LinkedIn URL</span>
                        <input value={draft.linkedin} onChange={(event) => setDraft((current) => ({ ...current, linkedin: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#6A38C2]" />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Resume</span>
                        <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleResumeUpload} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Profile image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePhotoUpload}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      </label>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button type="submit" disabled={isSaving} className="bg-[#6A38C2] hover:bg-[#5529a6]">
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

            </div>


            {/* Resume Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Resume
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">

                <div className="flex items-center gap-3">

                  <div className="bg-purple-100 p-3 rounded-xl">
                    <FileText className="text-[#6A38C2] h-7 w-7" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {profile.resumeName || "No resume uploaded"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {profile.resumeName ? "Resume Document" : "Upload your resume from Edit Profile"}
                    </p>
                  </div>

                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    const viewUrl = getViewableResumeUrl(profile.resumeUrl);
                    if (viewUrl) window.open(viewUrl, "_blank", "noopener,noreferrer");
                  }}
                  disabled={!profile.resumeUrl}
                >
                  View Resume
                </Button>

              </div>

            </div>

          </div>


          {/* Right Section */}
          <div className="space-y-6">

            {/* Experience */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

              <div className="flex items-center gap-3 mb-4">

                <div className="p-3 bg-purple-50 rounded-xl">
                  <Briefcase className="text-[#6A38C2] h-5 w-5" />
                </div>

                <h2 className="text-lg font-bold">
                  Experience
                </h2>

              </div>

              <h3 className="font-semibold text-gray-800">
                {profile.experienceTitle}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {profile.experience}
              </p>

            </div>


            {/* Education */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

              <div className="flex items-center gap-3 mb-4">

                <div className="p-3 bg-purple-50 rounded-xl">
                  <GraduationCap className="text-[#6A38C2] h-5 w-5" />
                </div>

                <h2 className="text-lg font-bold">
                  Education
                </h2>

              </div>

              <h3 className="font-semibold text-gray-800">
                {profile.education}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {profile.department}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {profile.educationPeriod}
              </p>

            </div>


            {/* Social Links */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

              <h2 className="text-lg font-bold mb-4">
                Social Links
              </h2>

              <div className="space-y-4">

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-black transition"
                >
                  <Code2 className="h-5 w-5" />
                  GitHub
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition"
                >
                  <LinkIcon className="h-5 w-5" />
                  LinkedIn
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;