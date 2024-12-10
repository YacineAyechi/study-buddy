"use client";

import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { FiPlus, FiMessageSquare } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SupportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getAuthToken } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
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

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Support</h1>
            <p className="text-slate-600">
              Need help? Create a support ticket.
            </p>
          </div>
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="flex items-center gap-2 rounded-lg bg-[--poppy] px-4 py-2 text-white hover:bg-[--poppy-dark]"
          >
            <FiPlus /> New Ticket
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[--poppy] border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
            {tickets.length === 0 && (
              <div className="col-span-full text-center py-8 text-slate-600">
                No support tickets yet
              </div>
            )}
          </div>
        )}

        <AnimatePresence>
          {showNewTicketModal && (
            <NewTicketModal
              onClose={() => setShowNewTicketModal(false)}
              onTicketCreated={fetchTickets}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TicketCard = ({ ticket }) => {
  const router = useRouter();
  const statusColors = {
    open: "bg-green-100 text-green-800",
    closed: "bg-slate-100 text-slate-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div
      onClick={() => router.push(`/support/${ticket._id}`)}
      className="rounded-lg bg-white p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            statusColors[ticket.status]
          }`}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
        <span className="text-sm text-slate-500">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h3 className="mb-2 font-semibold">{ticket.subject}</h3>
      <p className="mb-4 text-sm text-slate-600 line-clamp-2">
        {ticket.message}
      </p>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <FiMessageSquare />
        <span>{ticket.replies?.length || 0} replies</span>
      </div>
    </div>
  );
};

const NewTicketModal = ({ onClose, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getAuthToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        onTicketCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="w-full max-w-md rounded-lg bg-white p-6"
      >
        <h2 className="mb-4 text-xl font-semibold">
          Create New Support Ticket
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Subject</label>
            <input
              type="text"
              required
              className="w-full rounded border p-2"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              required
              className="h-32 w-full rounded border p-2"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-[--poppy] px-4 py-2 text-white hover:bg-[--poppy-dark] disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SupportPage;
