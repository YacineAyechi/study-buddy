"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import { FiMessageSquare } from "react-icons/fi";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

const AdminTicketDetailPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { getAuthToken } = useAuth();

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets/${id}/reply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: replyMessage }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setReplyMessage("");
        fetchTicket();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const updateTicketStatus = async (status) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          credentials: "include",
        }
      );
      if (response.ok) {
        fetchTicket();
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  if (isLoading) {
    return (
      <AdminProtectedRoute>
        <div className="flex min-h-screen bg-indigo-50">
          <NavbarDashboard />
          <div className="flex-1 p-8">
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[--poppy] border-t-transparent" />
            </div>
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="flex min-h-screen bg-indigo-50">
        <NavbarDashboard />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Ticket Details
            </h1>
            <p className="text-slate-600">
              Manage and respond to support ticket
            </p>
          </div>

          {ticket && (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="text-sm text-slate-500">
                    Ticket #{ticket._id.slice(-6)}
                  </span>
                  <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                  <span className="text-sm text-slate-500">
                    Created by: {ticket.userId.email}
                  </span>
                </div>
                <select
                  value={ticket.status}
                  onChange={(e) => updateTicketStatus(e.target.value)}
                  className="rounded border px-2 py-1 text-sm"
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="mb-6 rounded bg-slate-50 p-4">
                <p className="text-slate-700">{ticket.message}</p>
                <span className="mt-2 block text-xs text-slate-500">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>

              {ticket.replies?.length > 0 && (
                <div className="mb-6 space-y-4">
                  <h3 className="font-medium text-slate-800">Replies</h3>
                  {ticket.replies.map((reply, index) => (
                    <div key={index} className="rounded bg-slate-100 p-4">
                      <p className="text-slate-700">{reply.message}</p>
                      <span className="mt-2 block text-xs text-slate-500">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleReply} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Reply
                  </label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full rounded-lg border p-3"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded bg-[--poppy] px-4 py-2 text-white hover:bg-[--poppy-dark]"
                >
                  <FiMessageSquare /> Send Reply
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
};

export default AdminTicketDetailPage;
