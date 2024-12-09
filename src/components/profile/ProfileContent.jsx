"use client";

import React, { useState, useEffect } from "react";
import { FiUser, FiEdit, FiSave, FiMail, FiX } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials, getAvatarColor } from "@/utils/avatarUtils";

const ProfileContent = () => {
  const { user, getAuthToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        plan: user.plan,
      });
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
      // Validate empty fields
      if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
        setError("First name and last name cannot be empty");
        setTimeout(() => setError(""), 3000);
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

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);

      // Refresh the page after successful update
      window.location.reload();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-600">Manage your profile information</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-semibold bg-[--poppy]"
              // style={{ backgroundColor: avatarColor }}
            >
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-slate-600">{profileData.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 text-[--poppy] hover:underline"
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                disabled={!isEditing}
                className="w-full rounded border p-2 disabled:bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                disabled={!isEditing}
                className="w-full rounded border p-2 disabled:bg-slate-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              disabled
              className="w-full rounded border p-2 disabled:bg-slate-50"
            />
          </div>

          <div>
            <p className="text-slate-600 text-sm">
              You can change your email address by contacting support.
            </p>
          </div>

          <div>
            <p className="text-slate-600 capitalize">
              <span className="font-bold">Plan:</span> {profileData.plan} plan
            </p>
          </div>

          <div>
            <p className="text-slate-600">
              <span className="font-bold">Created At:</span>{" "}
              {formatDate(profileData.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-slate-600">
              <span className="font-bold">Last Update At:</span>{" "}
              {formatDate(profileData.updatedAt)}
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-1 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="bg-[--poppy] text-white px-4 py-2 rounded hover:bg-[--poppy-dark]"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
