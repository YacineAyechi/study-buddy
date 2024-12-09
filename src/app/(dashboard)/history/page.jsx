"use client";

import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import React, { useState, useEffect } from "react";
import { FiEye, FiCalendar, FiFile } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/app/loading";

const History = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, getAuthToken } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch history");
      }

      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Upload History</h1>
          <p className="text-slate-600">
            View and manage your uploaded documents
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[--poppy] border-t-transparent"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4 font-semibold text-slate-600">Title</th>
                    <th className="pb-4 font-semibold text-slate-600">Type</th>
                    <th className="pb-4 font-semibold text-slate-600">Size</th>
                    <th className="pb-4 font-semibold text-slate-600">
                      Upload Date
                    </th>
                    <th className="pb-4 font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {documents.map((doc) => (
                    <tr key={doc._id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <FiFile className="text-[--poppy]" />
                          <span className="font-medium">
                            {doc.originalName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="rounded bg-slate-100 px-2 py-1 text-sm">
                          {doc.fileType}
                        </span>
                      </td>
                      <td className="py-4 text-slate-600">
                        {formatFileSize(doc.fileSize)}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <FiCalendar className="text-sm" />
                          {/* {new Date(doc.created_at).toLocaleDateString()} */}
                          {formatDate(doc.updatedAt)}

                          {/* {new Date(doc.upload_date).toLocaleString()} */}
                        </div>
                      </td>
                      <td className="py-4">
                        <Link
                          href={`/documents/${doc._id}`}
                          className="inline-flex items-center gap-2 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <FiEye className="text-lg" />
                          <span className="text-sm">View</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {documents.length === 0 && (
                <div className="py-8 text-center text-slate-600">
                  No documents found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
