"use client";

import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiEdit,
  FiSave,
  FiMail,
  FiX,
  FiBook,
  FiCheckCircle,
  FiAward,
  FiUpload,
  FiStar,
  FiLock,
  FiKey,
  FiActivity,
  FiCheck,
  FiBell,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials, getAvatarColor } from "@/utils/avatarUtils";
import Link from "next/link";
import toast from "react-hot-toast";

const ProfileContent = () => {
  const { user, getAuthToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    plan: "",
    emailNotifications: false,
  });
  const [emailNotifications, setEmailNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        createdAt: user.createdAt || "",
        updatedAt: user.updatedAt || "",
        plan: user.plan || "",
        emailNotifications: user.emailNotifications || false,
      });
      setEmailNotifications(user.emailNotifications);
    }
  }, [user]);

  const initials = getInitials(profileData.firstName, profileData.lastName);
  const avatarColor = getAvatarColor(initials);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSaveProfile = async () => {
    try {
      if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
        toast.error("First name and last name cannot be empty");
        return;
      }

      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [totalDocuments, setTotalDocuments] = useState(0);

  const handleNotificationToggle = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-notifications`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            emailNotifications: !emailNotifications,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update notification preferences");
      }

      setEmailNotifications(!emailNotifications);
      toast.success("Notification preferences updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-600">Manage your profile information</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-lg bg-white p-6 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-semibold text-white bg-gradient-to-br from-[--poppy] to-[--poppy-dark]">
              {initials}
            </div>
            <h2 className="mt-4 text-xl font-semibold">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-slate-600">{profileData.email}</p>
            <div className="mt-4 w-full">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-slate-600">Plan</span>
                <span className="font-medium capitalize">
                  {profileData.plan}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Member since</span>
                <span className="text-sm">
                  {formatDate(profileData.createdAt).split(",")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isEditing
                  ? "text-red-600 hover:bg-red-50"
                  : "text-[--poppy] hover:bg-[--poppy]/10"
              }`}
            >
              {isEditing ? (
                <>
                  <FiX /> Cancel
                </>
              ) : (
                <>
                  <FiEdit /> Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border p-2.5 disabled:bg-slate-50 focus:border-[--poppy] focus:ring-1 focus:ring-[--poppy] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border p-2.5 disabled:bg-slate-50 focus:border-[--poppy] focus:ring-1 focus:ring-[--poppy] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full rounded-lg border p-2.5 bg-slate-50"
              />
              <p className="mt-2 text-sm text-slate-600">
                Contact support to change your email address
              </p>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 rounded-lg bg-[--poppy] px-6 py-2.5 text-white hover:bg-[--poppy-dark] transition-colors"
                >
                  <FiSave /> Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Account Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FiActivity className="text-2xl text-[--poppy]" />
              <h3 className="font-semibold">Last Login</h3>
            </div>
            <p className="text-slate-600">
              {formatDate(user?.lastLoginAt || "")}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FiBook className="text-2xl text-[--poppy]" />
              <h3 className="font-semibold">Documents Uploaded</h3>
            </div>
            <p className="text-slate-600">
              {totalDocuments.toString()} Documents
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FiStar className="text-2xl text-[--poppy]" />
              <h3 className="font-semibold">Account Status</h3>
            </div>
            <p className="text-slate-600 capitalize">
              {user?.status || "Active"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Preferences</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiBell className="text-2xl text-[--poppy]" />
                <div>
                  <h3 className="font-semibold">Email Notifications</h3>
                  <p className="text-sm text-slate-600">
                    Receive updates and alerts
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={emailNotifications}
                  onChange={handleNotificationToggle}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[--poppy]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
