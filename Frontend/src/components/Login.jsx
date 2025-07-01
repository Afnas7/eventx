import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useAuth();

  // const onSubmit = async (data) => {
  //   const userInfo = {
  //     email: data.email,
  //     password: data.password,
  //   };

  //   try {
  //     const res = await axios.post("http://localhost:4001/user/login", userInfo);
  //     if (res.data && res.data.user) {
  //       toast.success("Logged in successfully!");
  //       setUser(res.data.user);
  //       localStorage.setItem("Users", JSON.stringify(res.data.user));

  //       const redirectPath = localStorage.getItem("redirectAfterLogin") || "/Events";
  //       localStorage.removeItem("redirectAfterLogin");
  //       navigate(redirectPath);
  //     }
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Login failed!");
  //   }
  // };
const onSubmit = async (data) => {
  const userInfo = {
    email: data.email,
    password: data.password,
  };

  try {
    console.log("Login attempt:", userInfo);

    const res = await axios.post("http://localhost:4000/user/login", userInfo);

    console.log("Response from backend:", res.data);

    if (res.data && res.data.user) {
      toast.success("Logged in successfully!");
      setUser(res.data.user);
      localStorage.setItem("Users", JSON.stringify(res.data.user));

      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/Events";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    }
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Login failed!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] text-white">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
            >
              Login
            </button>
            <p>
              Not registered?{" "}
              <Link to="/Signup" className="text-blue-500 underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
