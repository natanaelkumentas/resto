"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function Page() {
  const [tab, setTab] = useState("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

 const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  alert("Login clicked!");
};

const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  alert("Register clicked!");
};


  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-base rounded-2xl flex items-center justify-center mx-auto mb-4 cursor-pointer">
            <span className="text-white text-3xl">🍜</span>
          </div>

          <h1 className="text-2xl text-gray-900 mb-2">Rumah Makan Online</h1>
          <p className="text-gray-600">Welcome back! Please login to continue</p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl p-6 shadow">

          {/* TABS */}
          <div className="grid grid-cols-2 mb-6">
            <button
              onClick={() => setTab("login")}
              className={`py-2 text-center border-b-2 ${
                tab === "login"
                  ? "border-base text-base font-semibold"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setTab("register")}
              className={`py-2 text-center border-b-2 ${
                tab === "register"
                  ? "border-base text-base font-semibold"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {tab === "login" && (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block mb-1">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    className="w-full border rounded-lg pl-10 py-2"
                    placeholder="your.email@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    className="w-full border rounded-lg pl-10 py-2"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-gray-600">Remember me</span>
                </label>

                <a href="#" className="text-base hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-base hover:bg-base-dark text-white py-2 rounded-lg"
              >
                Login
              </button>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                <strong>Admin Access:</strong> admin@rumahmakanonline.com / admin123
              </div>

              {/* OR */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* GOOGLE BUTTON */}
              <button
                type="button"
                className="w-full border py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FaGoogle />
                Login with Google
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {tab === "register" && (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg py-2 px-3"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    className="w-full border rounded-lg pl-10 py-2"
                    placeholder="your.email@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    className="w-full border rounded-lg pl-10 py-2"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <p className="text-xs text-gray-600">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-base hover:underline">
                  Terms & Conditions
                </a>
              </p>

              <button
                type="submit"
                className="w-full bg-base hover:bg-base-dark text-white py-2 rounded-lg"
              >
                Create Account
              </button>

              {/* OR */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full border py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FaGoogle />
                Sign up with Google
              </button>
            </form>
          )}

        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-8 text-center">
          <p className="text-3xl mb-2">🍛 🍜 🍗</p>
          <p className="text-sm text-gray-600">Delicious food awaits you!</p>
        </div>
      </div>
    </div>
  );
}
