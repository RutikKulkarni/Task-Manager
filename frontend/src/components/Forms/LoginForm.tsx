import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Incorrect email or password");
        } else if (response.status === 404) {
          throw new Error("User not found");
        } else {
          throw new Error("Server error, please try again later");
        }
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-4 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-4 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Login"}
        </button>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
