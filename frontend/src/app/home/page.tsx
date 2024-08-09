// "use client";
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function Home() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/login');
//   };

//   if (!isAuthenticated) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="flex flex-col min-h-screen items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
//       <button
//         onClick={handleLogout}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Logout
//       </button>
//     </main>
//   );
// }


"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </main>
  );
}
