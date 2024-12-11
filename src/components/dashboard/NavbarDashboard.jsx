"use client";

import React, { useState, useEffect } from "react";
import {
  FiBell,
  FiChevronDown,
  FiChevronsRight,
  FiHome,
  FiRotateCcw,
  FiUploadCloud,
  FiX,
  FiSettings,
  FiLogOut,
  FiLifeBuoy,
} from "react-icons/fi";
import { BiEnvelope, BiEnvelopeOpen, BiTrash } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "../ProtectedRoute";
import { getInitials, getAvatarColor } from "@/utils/avatarUtils";
import { BsStars } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};

const NavbarDashboard = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.split("/")[1];
  const [notificationCount, setNotificationCount] = useState(0);
  const { getAuthToken, user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          console.warn("No auth token available");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNotificationCount(data.count);
      } catch (error) {
        console.error("Error fetching notification count:", error);
        // Set count to 0 on error to prevent UI issues
        setNotificationCount(0);
      }
    };

    fetchNotificationCount();

    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, [getAuthToken]);

  return (
    <ProtectedRoute>
      <motion.nav
        layout
        className={`${
          isMobile && open
            ? "fixed inset-0 z-50 backdrop-blur-sm"
            : "sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white"
        } p-2`}
        style={{
          width: open ? (isMobile ? "100%" : "225px") : "fit-content",
        }}
      >
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-/20"
          />
        )}

        <div
          className={`${
            isMobile && open
              ? "absolute left-0 top-0 h-screen p-2 w-[225px] bg-white shadow-lg"
              : "h-full w-full"
          }`}
        >
          <TitleSection open={open} />

          <div className="space-y-1">
            <Option
              Icon={FiHome}
              title="Dashboard"
              selected={currentPath === "dashboard"}
              open={open}
              link="dashboard"
            />

            <div className="mt-6">
              <Option
                Icon={FiUploadCloud}
                title="Upload"
                selected={currentPath === "upload"}
                open={open}
                link="upload"
              />
            </div>

            <div className="my-6">
              <Option
                Icon={FiRotateCcw}
                title="History"
                selected={currentPath === "history"}
                open={open}
                link="history"
              />
            </div>

            <Option
              Icon={FiBell}
              title="Notifications"
              selected={currentPath === "notifications"}
              open={open}
              notifs={notificationCount}
              onClick={() => setShowNotifications(true)}
            />

            <div className="my-6">
              <Option
                Icon={FiLifeBuoy}
                title="Support"
                selected={currentPath === "support"}
                open={open}
                link="support"
              />

              {user?.role === "admin" && (
                <Option
                  Icon={GrUserAdmin}
                  title="Admin Support"
                  selected={currentPath === "admin/support"}
                  open={open}
                  link="admin/support"
                />
              )}
            </div>
          </div>

          {user?.plan === "free" && (
            <>
              {open && (
                <div className="absolute bottom-14 left-0 right-0 border-t border-slate-300 transition-colors">
                  <div className="bg-[--poppy] h-full p-4 m-4 rounded-lg text-white">
                    <div>
                      <span className="text- font-medium">
                        Become Pro Access
                      </span>
                      <p className="text-xs mt-1">
                        Try your experience for using more features
                      </p>
                    </div>
                    <div className="flex items-center bg-white text-[--poppy] rounded-lg p-2 mt-4 w-full justify-center transition-colors hover:bg-slate-100">
                      <BsStars className="text-xl" />
                      <button className="w-full text-[14px] font-bold">
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!open && (
                // <div className="absolute bottom-14 left-0 right-0 mb-2 transition-colors">
                //   <motion.div className="relative cursor-pointer p-2 flex justify-center mx-auto items-center rounded-md transition-colors bg-[--poppy] text-white h-full w-10 place-content-center text-lg">
                //     <BsStars className="text-xl" />
                //   </motion.div>
                // </div>
                <></>
              )}
            </>
          )}

          <ToggleClose open={open} setOpen={setOpen} />
        </div>
      </motion.nav>

      <AnimatePresence>
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
};

export default NavbarDashboard;

const Option = ({ Icon, title, selected, open, notifs, link, onClick }) => {
  const content = (
    <>
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs >= 0 && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 grid size-4 place-content-center rounded bg-[--poppy] text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </>
  );

  const className = `relative flex h-10 w-full cursor-pointer items-center rounded-md transition-colors ${
    selected ? "bg-[--poppy] text-white" : "text-slate-500 hover:bg-slate-100"
  }`;

  if (link) {
    return (
      <Link href={`/${link}`}>
        <motion.div layout className={className}>
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div layout onClick={onClick} className={className}>
      {content}
    </motion.div>
  );
};

const TitleSection = ({ open }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div
        className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center gap-2">
          <div className="grid size-10 shrink-0 place-content-center">
            <UserAvatar />
          </div>

          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="block text-xs text-slate-500 capitalize">
                {user?.plan} Plan
              </span>
            </motion.div>
          )}
        </div>
        {open && (
          <motion.div
            animate={showDropdown ? "open" : "closed"}
            variants={iconVariants}
            className="mr-2"
          >
            <FiChevronDown />
          </motion.div>
        )}
      </div>

      {showDropdown && open && (
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          animate="open"
          className="absolute z-50 mt-2 flex w-48 flex-col gap-2 rounded-lg bg-white p-2 shadow-xl"
        >
          <Option
            Icon={FiSettings}
            title="Settings"
            open={open}
            link="profile"
          />

          <Option
            Icon={FiLogOut}
            title="Log Out"
            open={open}
            onClick={() => {
              logout();
              setShowDropdown(false);
            }}
          />
        </motion.ul>
      )}
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const NotificationsPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthToken } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [getAuthToken]);

  const markAsRead = async (id) => {
    try {
      const token = getAuthToken();
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = getAuthToken();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      setNotifications(notifications.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      className="fixed right-0 top-0 h-screen w-80 bg-white p-4 shadow-lg z-50"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={onClose}>
          <FiX className="text-xl" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[--poppy] border-t-transparent" />
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`rounded-lg border p-3 ${
                notification.isRead ? "bg-white" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-slate-600">
                    {notification.message}
                  </p>
                  <span className="mt-2 block text-xs text-slate-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {!notification.isRead ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification._id);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                      title="Mark as read"
                    >
                      <BiEnvelope className="text-[--poppy] text-xl" />
                    </button>
                  ) : (
                    <span className="p-2" title="Read">
                      <BiEnvelopeOpen className="text-slate-400 text-xl" />
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification._id);
                    }}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    title="Delete notification"
                  >
                    <BiTrash className="text-red-500 text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500">No notifications</p>
        )}
      </div>
    </motion.div>
  );
};

const UserAvatar = () => {
  const { user } = useAuth();
  const initials = getInitials(user?.firstName, user?.lastName);
  const avatarColor = getAvatarColor(initials);

  return (
    <div
      className="h-10 w-10 rounded-md flex items-center justify-center text-white text-sm font-semibold"
      // style={{ backgroundColor: avatarColor }}
      style={{ background: "var(--poppy)" }}
    >
      {initials}
    </div>
  );
};
