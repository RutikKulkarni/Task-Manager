import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrimaryButton from "@/components/Button/PrimaryButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-12 bg-white shadow-xl rounded-lg border border-gray-200"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Login
        </h1>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <PrimaryButton
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Login
        </PrimaryButton>
        <p className="mt-6 text-center text-gray-600 text-sm">
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
