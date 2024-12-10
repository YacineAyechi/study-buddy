"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import { FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { useRouter } from "next/navigation";

const AdminSupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAuthToken } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets/${ticketId}/status`,
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
        fetchTickets();
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="flex min-h-screen bg-indigo-50">
        <NavbarDashboard />
        <div className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Admin Support
              </h1>
              <p className="text-slate-600">Manage support tickets</p>
            </div>
            <button
              onClick={fetchTickets}
              className="flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
            >
              <FiRefreshCw /> Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[--poppy] border-t-transparent" />
            </div>
          ) : (
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  ticket={ticket}
                  onStatusUpdate={updateTicketStatus}
                  onRefresh={fetchTickets}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
};

const TicketCard = ({ ticket, onStatusUpdate, onRefresh }) => {
  const router = useRouter();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const { getAuthToken } = useAuth();

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tickets/${ticket._id}/reply`,
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
        setShowReplyForm(false);
        onRefresh();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div
      onClick={() => router.push(`/admin/support/${ticket._id}`)}
      className="rounded-lg bg-white p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-sm text-slate-500">
            Ticket #{ticket._id.slice(-6)}
          </span>
          <h3 className="text-xl font-semibold">{ticket.subject}</h3>
        </div>
        <select
          value={ticket.status}
          onChange={(e) => onStatusUpdate(ticket._id, e.target.value)}
          className="rounded border px-2 py-1 text-sm"
        >
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="mb-4 rounded bg-slate-50 p-4">
        <p className="text-slate-700">{ticket.message}</p>
      </div>

      <button
        onClick={() => setShowReplyForm(true)}
        className="flex items-center gap-2 text-sm text-[--poppy]"
      >
        <FiMessageSquare /> Reply
      </button>
    </div>
  );
};

export default AdminSupportPage;
