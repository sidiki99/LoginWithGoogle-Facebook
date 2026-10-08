
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path
      d="m4 7 8 6 8-6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="8" r="4" />
    <path
      d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"
      strokeLinecap="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path
      d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"
      strokeLinecap="round"
    />
    <path
      d="M10 8l-4 4 4 4M6 12h10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/me",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("USER FROM BACKEND:", data.user);

        if (!response.ok) {
          throw new Error(data.message || "Failed to get user");
        }

        setUser(data.user);
      } catch (error) {
        console.log("Get user error:", error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:8001/logout",
        {
          withCredentials: true,
        }
      );

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

  // Copy email
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user.email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.log("Copy error:", error.message);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h2 className="text-xl font-semibold text-slate-700">
          Loading...
        </h2>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-10 text-center shadow-xl shadow-slate-200/70">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UserIcon />
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            You're signed out
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Log in to see your profile and account details.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-7 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  const showImage = user.image && !imageFailed;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/60">
        {/* Banner */}
        <div className="relative h-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-white/10" />

          <p className="absolute left-6 top-5 text-sm font-medium text-white/80">
            Dashboard
          </p>
        </div>

        {/* Avatar */}
        <div className="mt-5 flex justify-center">
          <div className="rounded-full bg-white p-1.5 shadow-lg">
            {showImage ? (
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100 text-3xl font-semibold text-indigo-700">
                {getInitials(user.name)}
              </div>
            )}
          </div>
        </div>

        {/* Welcome */}
        <div className="px-8 pb-8 pt-5 text-center">
          <p className="text-sm text-slate-500">
            {getGreeting()},
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {user.name}
          </h1>

          {/* Details */}
          <div className="mt-7 space-y-3 text-left">
            {/* Name */}
            <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <UserIcon />
              </span>

              <div className="min-w-0">
                <p className="text-xs text-slate-500">
                  Full name
                </p>

                <p className="truncate font-medium text-slate-900">
                  {user.name}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <MailIcon />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="truncate font-medium text-slate-900">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleCopyEmail}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
          >
            <LogoutIcon />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
