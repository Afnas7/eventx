import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4000/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] text-white">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your fullname"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-gray-800"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-gray-800"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-gray-800"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
            >
              Signup
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
