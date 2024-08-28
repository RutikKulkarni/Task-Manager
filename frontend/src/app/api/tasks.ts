import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Fetch tasks from backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
          },
        }
      );
      const tasks = await response.json();
      res.status(200).json(tasks);
      break;
    case "POST":
      // Create new task in backend API
      const newTask = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
      const createdTask = await newTask.json();
      res.status(201).json(createdTask);
      break;
    case "PUT":
      // Update user data
      if (req.url?.includes("/user/userdata/name")) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata/name`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${req.headers.authorization}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        const updatedName = await response.json();
        res.status(200).json(updatedName);
      } else if (req.url?.includes("/user/userdata/password")) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/userdata/password`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${req.headers.authorization}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        const updatedPassword = await response.json();
        res.status(200).json(updatedPassword);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
