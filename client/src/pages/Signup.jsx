import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const createUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);
        navigate("/login");
      } else {
        setError(result);
      }
    } catch (err) {
      setError({ message: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white 
                      rounded-3xl shadow-2xl 
                      p-6 sm:p-8">

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account 🧡
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Join us and start ordering delicious food
          </p>

          {error && (
            <p className="text-red-600 text-sm mt-3">
              {error.message}
            </p>
          )}
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={createUser}>
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 
                           rounded-xl 
                           focus:ring-2 focus:ring-orange-500 
                           focus:border-orange-500
                           focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="surname"
                placeholder="Last name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 
                           rounded-xl 
                           focus:ring-2 focus:ring-orange-500 
                           focus:border-orange-500
                           focus:outline-none transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 
                         rounded-xl 
                         focus:ring-2 focus:ring-orange-500 
                         focus:border-orange-500
                         focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 
                           rounded-xl 
                           focus:ring-2 focus:ring-orange-500 
                           focus:border-orange-500
                           focus:outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-sm 
                           text-orange-500 hover:text-orange-700"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="accent-orange-500 mr-2" />
            I agree to Terms & Conditions
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
            Sign Up
          </button>
        </form>

        {/* Login */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-700 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;