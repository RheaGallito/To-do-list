import React from "react"

import { useState } from "react"

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("login")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Mock database for registered users
  const [registeredUsers, setRegisteredUsers] = useState([
    { name: "Test User", email: "test@example.com", password: "password" },
  ])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user exists in our mock database
      const userExists = registeredUsers.find((user) => user.email === loginEmail && user.password === loginPassword)

      if (userExists) {
        setSuccess(true)
        console.log("Login successful!")
        // Here you would typically:
        // - Store authentication token
        // - Redirect to dashboard
        // - Update global auth state
      } else {
        setError("Invalid email or password.")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Validate passwords match
      if (registerPassword !== confirmPassword) {
        setError("Passwords do not match")
        setLoading(false)
        return
      }

      // Validate password length
      if (registerPassword.length < 6) {
        setError("Password must be at least 6 characters")
        setLoading(false)
        return
      }

      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if email already exists
      const emailExists = registeredUsers.some((user) => user.email === registerEmail)

      if (emailExists) {
        setError("Email already registered")
      } else {
        // Add new user to our mock database
        const newUser = {
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }

        setRegisteredUsers([...registeredUsers, newUser])
        setSuccess(true)
        console.log("Registration successful!", newUser)

        // Clear form
        setRegisterName("")
        setRegisterEmail("")
        setRegisterPassword("")
        setConfirmPassword("")

        // Switch to login tab after successful registration
        setTimeout(() => {
          setActiveTab("login")
          setSuccess(false)
        }, 2000)
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Get Started</h1>
        <p className="text-gray-600 mt-1">Sign in to your account or create a new one</p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border rounded-md overflow-hidden">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "login" ? "bg-white font-medium" : "bg-gray-50 text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("login")
            setError("")
            setSuccess(false)
          }}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "register" ? "bg-white font-medium" : "bg-gray-50 text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("register")
            setError("")
            setSuccess(false)
          }}
        >
          Register
        </button>
      </div>

      {activeTab === "login" ? (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="login-email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              className="w-full p-3 border rounded-md"
              placeholder="your@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="login-password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className="w-full p-3 border rounded-md"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">Login successful! Redirecting...</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="register-name" className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="register-name"
              className="w-full p-3 border rounded-md"
              placeholder="John Doe"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="register-email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="register-email"
              className="w-full p-3 border rounded-md"
              placeholder="your@email.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="register-password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="register-password"
              className="w-full p-3 border rounded-md"
              placeholder="Minimum 6 characters"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block mb-2 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-3 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Registration successful! Redirecting to login...
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
    </div>
  )
}

