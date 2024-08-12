import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginOrSignup } from "@/utils/auth";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginOrSignup("/auth/signup", {
        name,
        email,
        password,
      });
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
          Sign Up
        </h1>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
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
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Sign Up
        </button>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
