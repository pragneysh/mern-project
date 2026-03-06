import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        setEmail("");
        setPassword("");
        setError(null);

        Cookies.set("access_token", result.access_token, {
          sameSite: "none",
          secure: true,
        });

        Cookies.set("isAdmin", result.user.isAdmin, {
          sameSite: "none",
          secure: true,
        });

        if (result.user.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/menu");
        }
      } else {
        setError(result);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">

      <div className="w-full max-w-md bg-white 
                      rounded-3xl shadow-2xl 
                      p-6 sm:p-8">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to continue ordering delicious food
          </p>

          {error && (
            <p className="text-red-600 mt-3 text-sm">
              {error.message}
            </p>
          )}
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={loginUser}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 
                         border border-gray-300 
                         rounded-xl 
                         focus:ring-2 focus:ring-orange-500 
                         focus:border-orange-500
                         focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 
                           border border-gray-300 
                           rounded-xl 
                           focus:ring-2 focus:ring-orange-500 
                           focus:border-orange-500
                           focus:outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm 
                           text-orange-500 hover:text-orange-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="accent-orange-500"
              />
              Remember me
            </label>

            <a
              href="#"
              className="text-orange-500 hover:text-orange-700 font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl 
                       text-white font-semibold
                       bg-gradient-to-r from-orange-500 to-orange-600
                       hover:opacity-90
                       transition shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:text-orange-700 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;