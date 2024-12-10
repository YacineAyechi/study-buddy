"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import { FiMessageSquare } from "react-icons/fi";

const TicketDetailPage = () => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${id}`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${id}/reply`,
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-indigo-50">
        <NavbarDashboard />
        <div className="flex-1 p-8">
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[--poppy] border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Ticket Details</h1>
          <p className="text-slate-600">View and manage your support ticket</p>
        </div>

        {ticket && (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  ticket.status === "open"
                    ? "bg-green-100 text-green-800"
                    : ticket.status === "closed"
                    ? "bg-slate-100 text-slate-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
              <h2 className="mt-2 text-xl font-semibold">{ticket.subject}</h2>
              <span className="text-sm text-slate-500">
                {new Date(ticket.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="mb-6 rounded bg-slate-50 p-4">
              <p className="text-slate-700">{ticket.message}</p>
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

            {ticket.status === "closed" ? (
              <div className="rounded-lg bg-slate-100 p-4 text-slate-600">
                This ticket is closed and cannot receive new replies.
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetailPage;
