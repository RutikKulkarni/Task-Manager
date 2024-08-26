// // "use client";
// // import React, { useState } from "react";
// // import moment from "moment";

// // interface Task {
// //   title: string;
// //   description: string;
// //   priority: "Normal" | "Medium" | "Urgent";
// //   deadline: string;
// //   createdAt: Date;
// //   section: "To Do" | "In Progress" | "Under Review" | "Finished";
// // }

// // const Dashboard = () => {
// //   const [toDo, setToDo] = useState<Task[]>([]);
// //   const [inProgress, setInProgress] = useState<Task[]>([]);
// //   const [underReview, setUnderReview] = useState<Task[]>([]);
// //   const [finished, setFinished] = useState<Task[]>([]);

// //   const [newTicketTitle, setNewTicketTitle] = useState<string>("");
// //   const [newTicketDescription, setNewTicketDescription] = useState<string>("");
// //   const [newTicketPriority, setNewTicketPriority] = useState<
// //     "Normal" | "Medium" | "Urgent"
// //   >("Normal");
// //   const [newTicketDeadline, setNewTicketDeadline] = useState<string>("");
// //   const [newTicketSection, setNewTicketSection] = useState<
// //     "To Do" | "In Progress" | "Under Review" | "Finished"
// //   >("To Do");

// //   const handleAddTicket = () => {
// //     if (
// //       newTicketTitle.trim() !== "" &&
// //       newTicketDescription.trim() !== "" &&
// //       newTicketDeadline.trim() !== ""
// //     ) {
// //       const newTask: Task = {
// //         title: newTicketTitle,
// //         description: newTicketDescription,
// //         priority: newTicketPriority,
// //         deadline: newTicketDeadline,
// //         createdAt: new Date(),
// //         section: newTicketSection,
// //       };

// //       switch (newTicketSection) {
// //         case "To Do":
// //           setToDo([...toDo, newTask]);
// //           break;
// //         case "In Progress":
// //           setInProgress([...inProgress, newTask]);
// //           break;
// //         case "Under Review":
// //           setUnderReview([...underReview, newTask]);
// //           break;
// //         case "Finished":
// //           setFinished([...finished, newTask]);
// //           break;
// //         default:
// //           setToDo([...toDo, newTask]);
// //           break;
// //       }

// //       setNewTicketTitle("");
// //       setNewTicketDescription("");
// //       setNewTicketPriority("Normal");
// //       setNewTicketDeadline("");
// //       setNewTicketSection("To Do");
// //     }
// //   };

// //   const handleDragStart = (
// //     e: React.DragEvent<HTMLDivElement>,
// //     task: Task,
// //     sourceColumn: string
// //   ) => {
// //     e.dataTransfer.setData("task", JSON.stringify(task));
// //     e.dataTransfer.setData("sourceColumn", sourceColumn);
// //   };

// //   const handleDrop = (
// //     e: React.DragEvent<HTMLDivElement>,
// //     targetColumn: string
// //   ) => {
// //     const task = JSON.parse(e.dataTransfer.getData("task")) as Task;
// //     const sourceColumn = e.dataTransfer.getData("sourceColumn");

// //     if (targetColumn !== sourceColumn) {
// //       switch (targetColumn) {
// //         case "To Do":
// //           setToDo([...toDo, task]);
// //           break;
// //         case "In Progress":
// //           setInProgress([...inProgress, task]);
// //           break;
// //         case "Under Review":
// //           setUnderReview([...underReview, task]);
// //           break;
// //         case "Finished":
// //           setFinished([...finished, task]);
// //           break;
// //         default:
// //           break;
// //       }

// //       switch (sourceColumn) {
// //         case "To Do":
// //           setToDo(toDo.filter((t) => t.title !== task.title));
// //           break;
// //         case "In Progress":
// //           setInProgress(inProgress.filter((t) => t.title !== task.title));
// //           break;
// //         case "Under Review":
// //           setUnderReview(underReview.filter((t) => t.title !== task.title));
// //           break;
// //         case "Finished":
// //           setFinished(finished.filter((t) => t.title !== task.title));
// //           break;
// //         default:
// //           break;
// //       }
// //     }
// //   };

// //   const handleDeleteTask = (task: Task, section: string) => {
// //     switch (section) {
// //       case "To Do":
// //         setToDo(toDo.filter((t) => t.title !== task.title));
// //         break;
// //       case "In Progress":
// //         setInProgress(inProgress.filter((t) => t.title !== task.title));
// //         break;
// //       case "Under Review":
// //         setUnderReview(underReview.filter((t) => t.title !== task.title));
// //         break;
// //       case "Finished":
// //         setFinished(finished.filter((t) => t.title !== task.title));
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="flex justify-center items-center py-4">
// //         <input
// //           type="text"
// //           value={newTicketTitle}
// //           onChange={(e) => setNewTicketTitle(e.target.value)}
// //           placeholder="Enter title"
// //           className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
// //         />
// //         <input
// //           type="text"
// //           value={newTicketDescription}
// //           onChange={(e) => setNewTicketDescription(e.target.value)}
// //           placeholder="Enter description"
// //           className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
// //         />
// //         <select
// //           value={newTicketPriority}
// //           onChange={(e) =>
// //             setNewTicketPriority(e.target.value as "Normal" | "Medium" | "Urgent")
// //           }
// //           className="mr-2 p-2 border border-gray-300 rounded-lg"
// //         >
// //           <option value="Normal">Normal</option>
// //           <option value="Medium">Medium</option>
// //           <option value="Urgent">Urgent</option>
// //         </select>
// //         <input
// //           type="date"
// //           value={newTicketDeadline}
// //           onChange={(e) => setNewTicketDeadline(e.target.value)}
// //           className="mr-2 p-2 border border-gray-300 rounded-lg"
// //         />
// //         <select
// //           value={newTicketSection}
// //           onChange={(e) =>
// //             setNewTicketSection(
// //               e.target.value as "To Do" | "In Progress" | "Under Review" | "Finished"
// //             )
// //           }
// //           className="mr-2 p-2 border border-gray-300 rounded-lg"
// //         >
// //           <option value="To Do">To Do</option>
// //           <option value="In Progress">In Progress</option>
// //           <option value="Under Review">Under Review</option>
// //           <option value="Finished">Finished</option>
// //         </select>
// //         <button
// //           onClick={handleAddTicket}
// //           className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
// //         >
// //           Add Task
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-4 gap-4 px-4">
// //         <Column
// //           title="To Do"
// //           tasks={toDo}
// //           onDrop={(e) => handleDrop(e, "To Do")}
// //           onDragStart={handleDragStart}
// //           onDeleteTask={handleDeleteTask}
// //         />
// //         <Column
// //           title="In Progress"
// //           tasks={inProgress}
// //           onDrop={(e) => handleDrop(e, "In Progress")}
// //           onDragStart={handleDragStart}
// //           onDeleteTask={handleDeleteTask}
// //         />
// //         <Column
// //           title="Under Review"
// //           tasks={underReview}
// //           onDrop={(e) => handleDrop(e, "Under Review")}
// //           onDragStart={handleDragStart}
// //           onDeleteTask={handleDeleteTask}
// //         />
// //         <Column
// //           title="Finished"
// //           tasks={finished}
// //           onDrop={(e) => handleDrop(e, "Finished")}
// //           onDragStart={handleDragStart}
// //           onDeleteTask={handleDeleteTask}
// //         />
// //       </div>
// //     </>
// //   );
// // };

// // interface ColumnProps {
// //   title: string;
// //   tasks: Task[];
// //   onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
// //   onDragStart: (
// //     e: React.DragEvent<HTMLDivElement>,
// //     task: Task,
// //     title: string
// //   ) => void;
// //   onDeleteTask: (task: Task, section: string) => void;
// // }

// // const Column = ({ title, tasks, onDrop, onDragStart, onDeleteTask }: ColumnProps) => {
// //   const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

// //   const toggleMenu = (index: number) => {
// //     setActiveMenuIndex(activeMenuIndex === index ? null : index);
// //   };

// //   const closeMenu = () => {
// //     setActiveMenuIndex(null);
// //   };

// //   return (
// //     <div
// //       className="bg-gray-100 p-4 rounded-lg"
// //       onDragOver={(e) => e.preventDefault()}
// //       onDrop={onDrop}
// //     >
// //       <h3 className="text-lg font-semibold mb-4">{title}</h3>
// //       {tasks.map((task, index) => (
// //         <div
// //           key={index}
// //           className="relative cursor-move"
// //           draggable
// //           onDragStart={(e) => onDragStart(e, task, title)}
// //         >
// //           <div className="bg-white p-3 rounded-md mb-3 shadow-sm">
// //             <h4 className="text-md font-medium">{task.title}</h4>
// //             <p className="text-sm">{task.description}</p>
// //             <p className="text-xs text-gray-500">
// //               Deadline: {moment(task.deadline).format("MMMM Do YYYY")}
// //             </p>
// //             <p className="text-xs text-gray-500">
// //               Priority: <span className="font-semibold">{task.priority}</span>
// //             </p>
// //           </div>

// //           {/* 3-dot Menu */}
// //           <button
// //             className="absolute top-2 right-2"
// //             onClick={() => toggleMenu(index)}
// //           >
// //             •••
// //           </button>
// //           {activeMenuIndex === index && (
// //             <div
// //               className="absolute top-8 right-2 bg-white shadow-md rounded-lg p-2 z-10"
// //               onBlur={closeMenu}
// //               tabIndex={-1}
// //             >
// //               <button
// //                 className="text-red-500 hover:underline"
// //                 onClick={() => onDeleteTask(task, title)}
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// "use client";
// import React, { useState } from "react";
// import moment from "moment";

// interface Task {
//   title: string;
//   description: string;
//   priority: "Normal" | "Medium" | "Urgent";
//   deadline: string;
//   createdAt: Date;
//   section: "To Do" | "In Progress" | "Under Review" | "Finished";
// }

// const Dashboard = () => {
//   const [toDo, setToDo] = useState<Task[]>([]);
//   const [inProgress, setInProgress] = useState<Task[]>([]);
//   const [underReview, setUnderReview] = useState<Task[]>([]);
//   const [finished, setFinished] = useState<Task[]>([]);
//   const [editTask, setEditTask] = useState<Task | null>(null);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [editSection, setEditSection] = useState<string>("");

//   const [newTicketTitle, setNewTicketTitle] = useState<string>("");
//   const [newTicketDescription, setNewTicketDescription] = useState<string>("");
//   const [newTicketPriority, setNewTicketPriority] = useState<
//     "Normal" | "Medium" | "Urgent"
//   >("Normal");
//   const [newTicketDeadline, setNewTicketDeadline] = useState<string>("");
//   const [newTicketSection, setNewTicketSection] = useState<
//     "To Do" | "In Progress" | "Under Review" | "Finished"
//   >("To Do");

//   const handleAddTicket = () => {
//     if (
//       newTicketTitle.trim() !== "" &&
//       newTicketDescription.trim() !== "" &&
//       newTicketDeadline.trim() !== ""
//     ) {
//       const newTask: Task = {
//         title: newTicketTitle,
//         description: newTicketDescription,
//         priority: newTicketPriority,
//         deadline: newTicketDeadline,
//         createdAt: new Date(),
//         section: newTicketSection,
//       };

//       switch (newTicketSection) {
//         case "To Do":
//           setToDo([...toDo, newTask]);
//           break;
//         case "In Progress":
//           setInProgress([...inProgress, newTask]);
//           break;
//         case "Under Review":
//           setUnderReview([...underReview, newTask]);
//           break;
//         case "Finished":
//           setFinished([...finished, newTask]);
//           break;
//         default:
//           setToDo([...toDo, newTask]);
//           break;
//       }

//       setNewTicketTitle("");
//       setNewTicketDescription("");
//       setNewTicketPriority("Normal");
//       setNewTicketDeadline("");
//       setNewTicketSection("To Do");
//     }
//   };

//   const handleEditTask = () => {
//     if (editTask && editIndex !== null) {
//       const updatedTask: Task = { ...editTask, createdAt: new Date() };
//       switch (editSection) {
//         case "To Do":
//           const updatedToDo = [...toDo];
//           updatedToDo[editIndex] = updatedTask;
//           setToDo(updatedToDo);
//           break;
//         case "In Progress":
//           const updatedInProgress = [...inProgress];
//           updatedInProgress[editIndex] = updatedTask;
//           setInProgress(updatedInProgress);
//           break;
//         case "Under Review":
//           const updatedUnderReview = [...underReview];
//           updatedUnderReview[editIndex] = updatedTask;
//           setUnderReview(updatedUnderReview);
//           break;
//         case "Finished":
//           const updatedFinished = [...finished];
//           updatedFinished[editIndex] = updatedTask;
//           setFinished(updatedFinished);
//           break;
//         default:
//           break;
//       }
//       setEditTask(null); // Close the edit modal after updating
//     }
//   };

//   const handleDragStart = (
//     e: React.DragEvent<HTMLDivElement>,
//     task: Task,
//     sourceColumn: string
//   ) => {
//     e.dataTransfer.setData("task", JSON.stringify(task));
//     e.dataTransfer.setData("sourceColumn", sourceColumn);
//   };

//   const handleDrop = (
//     e: React.DragEvent<HTMLDivElement>,
//     targetColumn: string
//   ) => {
//     const task = JSON.parse(e.dataTransfer.getData("task")) as Task;
//     const sourceColumn = e.dataTransfer.getData("sourceColumn");

//     if (targetColumn !== sourceColumn) {
//       switch (targetColumn) {
//         case "To Do":
//           setToDo([...toDo, task]);
//           break;
//         case "In Progress":
//           setInProgress([...inProgress, task]);
//           break;
//         case "Under Review":
//           setUnderReview([...underReview, task]);
//           break;
//         case "Finished":
//           setFinished([...finished, task]);
//           break;
//         default:
//           break;
//       }

//       switch (sourceColumn) {
//         case "To Do":
//           setToDo(toDo.filter((t) => t.title !== task.title));
//           break;
//         case "In Progress":
//           setInProgress(inProgress.filter((t) => t.title !== task.title));
//           break;
//         case "Under Review":
//           setUnderReview(underReview.filter((t) => t.title !== task.title));
//           break;
//         case "Finished":
//           setFinished(finished.filter((t) => t.title !== task.title));
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const handleDeleteTask = (task: Task, section: string) => {
//     switch (section) {
//       case "To Do":
//         setToDo(toDo.filter((t) => t.title !== task.title));
//         break;
//       case "In Progress":
//         setInProgress(inProgress.filter((t) => t.title !== task.title));
//         break;
//       case "Under Review":
//         setUnderReview(underReview.filter((t) => t.title !== task.title));
//         break;
//       case "Finished":
//         setFinished(finished.filter((t) => t.title !== task.title));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleEditClick = (task: Task, index: number, section: string) => {
//     setEditTask(task);
//     setEditIndex(index);
//     setEditSection(section);
//   };

//   return (
//     <>
//       {/* Modal for editing a task */}
//       {editTask && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
//             <input
//               type="text"
//               value={editTask.title}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, title: e.target.value })
//               }
//               className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
//             />
//             <textarea
//               value={editTask.description}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, description: e.target.value })
//               }
//               className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Edit description"
//             />
//             <select
//               value={editTask.priority}
//               onChange={(e) =>
//                 setEditTask({
//                   ...editTask,
//                   priority: e.target.value as "Normal" | "Medium" | "Urgent",
//                 })
//               }
//               className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
//             >
//               <option value="Normal">Normal</option>
//               <option value="Medium">Medium</option>
//               <option value="Urgent">Urgent</option>
//             </select>
//             <input
//               type="date"
//               value={moment(editTask.deadline).format("YYYY-MM-DD")}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, deadline: e.target.value })
//               }
//               className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
//             />
//             <select
//               value={editTask.section}
//               onChange={(e) =>
//                 setEditTask({
//                   ...editTask,
//                   section: e.target.value as
//                     | "To Do"
//                     | "In Progress"
//                     | "Under Review"
//                     | "Finished",
//                 })
//               }
//               className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
//             >
//               <option value="To Do">To Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Finished">Finished</option>
//             </select>
//             <button
//               onClick={handleEditTask}
//               className="bg-blue-500 text-white p-2 rounded-lg"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center items-center py-4">
//         <input
//           type="text"
//           value={newTicketTitle}
//           onChange={(e) => setNewTicketTitle(e.target.value)}
//           placeholder="Enter title"
//           className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
//         />
//         <input
//           type="text"
//           value={newTicketDescription}
//           onChange={(e) => setNewTicketDescription(e.target.value)}
//           placeholder="Enter description"
//           className="mr-2 p-2 border border-gray-300 rounded-lg flex-grow"
//         />
//         <select
//           value={newTicketPriority}
//           onChange={(e) => setNewTicketPriority(e.target.value as "Normal" | "Medium" | "Urgent")}
//           className="mr-2 p-2 border border-gray-300 rounded-lg"
//         >
//           <option value="Normal">Normal</option>
//           <option value="Medium">Medium</option>
//           <option value="Urgent">Urgent</option>
//         </select>
//         <input
//           type="date"
//           value={newTicketDeadline}
//           onChange={(e) => setNewTicketDeadline(e.target.value)}
//           className="mr-2 p-2 border border-gray-300 rounded-lg"
//         />
//         <select
//           value={newTicketSection}
//           onChange={(e) => setNewTicketSection(e.target.value as "To Do" | "In Progress" | "Under Review" | "Finished")}
//           className="mr-2 p-2 border border-gray-300 rounded-lg"
//         >
//           <option value="To Do">To Do</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Under Review">Under Review</option>
//           <option value="Finished">Finished</option>
//         </select>
//         <button
//           onClick={handleAddTicket}
//           className="bg-blue-500 text-white p-2 rounded-lg"
//         >
//           Add Task
//         </button>
//       </div>

//       <div className="flex space-x-4 p-4">
//         {/* To Do Column */}
//         <div
//           className="w-1/4 bg-gray-200 p-2 rounded-md"
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleDrop(e, "To Do")}
//         >
//           <h2 className="text-lg font-semibold mb-2">To Do</h2>
//           {toDo.map((task, index) => (
//             <div
//               key={index}
//               className="bg-white p-2 mb-2 rounded-md shadow-md"
//               draggable
//               onDragStart={(e) => handleDragStart(e, task, "To Do")}
//             >
//               <h3 className="font-semibold">{task.title}</h3>
//               <p>{task.description}</p>
//               <p className="text-sm text-gray-600">Priority: {task.priority}</p>
//               <p className="text-sm text-gray-600">
//                 Deadline: {moment(task.deadline).format("YYYY-MM-DD")}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Created At: {moment(task.createdAt).format("YYYY-MM-DD")}
//               </p>
//               <button
//                 onClick={() => handleEditClick(task, index, "To Do")}
//                 className="bg-yellow-500 text-white p-1 rounded-md mt-2 mr-1"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteTask(task, "To Do")}
//                 className="bg-red-500 text-white p-1 rounded-md mt-2"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* In Progress Column */}
//         <div
//           className="w-1/4 bg-gray-200 p-2 rounded-md"
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleDrop(e, "In Progress")}
//         >
//           <h2 className="text-lg font-semibold mb-2">In Progress</h2>
//           {inProgress.map((task, index) => (
//             <div
//               key={index}
//               className="bg-white p-2 mb-2 rounded-md shadow-md"
//               draggable
//               onDragStart={(e) => handleDragStart(e, task, "In Progress")}
//             >
//               <h3 className="font-semibold">{task.title}</h3>
//               <p>{task.description}</p>
//               <p className="text-sm text-gray-600">Priority: {task.priority}</p>
//               <p className="text-sm text-gray-600">
//                 Deadline: {moment(task.deadline).format("YYYY-MM-DD")}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Created At: {moment(task.createdAt).format("YYYY-MM-DD")}
//               </p>
//               <button
//                 onClick={() => handleEditClick(task, index, "In Progress")}
//                 className="bg-yellow-500 text-white p-1 rounded-md mt-2 mr-1"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteTask(task, "In Progress")}
//                 className="bg-red-500 text-white p-1 rounded-md mt-2"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Under Review Column */}
//         <div
//           className="w-1/4 bg-gray-200 p-2 rounded-md"
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleDrop(e, "Under Review")}
//         >
//           <h2 className="text-lg font-semibold mb-2">Under Review</h2>
//           {underReview.map((task, index) => (
//             <div
//               key={index}
//               className="bg-white p-2 mb-2 rounded-md shadow-md"
//               draggable
//               onDragStart={(e) => handleDragStart(e, task, "Under Review")}
//             >
//               <h3 className="font-semibold">{task.title}</h3>
//               <p>{task.description}</p>
//               <p className="text-sm text-gray-600">Priority: {task.priority}</p>
//               <p className="text-sm text-gray-600">
//                 Deadline: {moment(task.deadline).format("YYYY-MM-DD")}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Created At: {moment(task.createdAt).format("YYYY-MM-DD")}
//               </p>
//               <button
//                 onClick={() => handleEditClick(task, index, "Under Review")}
//                 className="bg-yellow-500 text-white p-1 rounded-md mt-2 mr-1"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteTask(task, "Under Review")}
//                 className="bg-red-500 text-white p-1 rounded-md mt-2"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Finished Column */}
//         <div
//           className="w-1/4 bg-gray-200 p-2 rounded-md"
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleDrop(e, "Finished")}
//         >
//           <h2 className="text-lg font-semibold mb-2">Finished</h2>
//           {finished.map((task, index) => (
//             <div
//               key={index}
//               className="bg-white p-2 mb-2 rounded-md shadow-md"
//               draggable
//               onDragStart={(e) => handleDragStart(e, task, "Finished")}
//             >
//               <h3 className="font-semibold">{task.title}</h3>
//               <p>{task.description}</p>
//               <p className="text-sm text-gray-600">Priority: {task.priority}</p>
//               <p className="text-sm text-gray-600">
//                 Deadline: {moment(task.deadline).format("YYYY-MM-DD")}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Created At: {moment(task.createdAt).format("YYYY-MM-DD")}
//               </p>
//               <button
//                 onClick={() => handleEditClick(task, index, "Finished")}
//                 className="bg-yellow-500 text-white p-1 rounded-md mt-2 mr-1"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteTask(task, "Finished")}
//                 className="bg-red-500 text-white p-1 rounded-md mt-2"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

"use client";
import React, { useState } from "react";
import moment from "moment";

interface Task {
  title: string;
  description: string;
  priority: "Normal" | "Medium" | "Urgent";
  deadline: string;
  createdAt: Date;
  section: "To Do" | "In Progress" | "Under Review" | "Finished";
}

const Dashboard = () => {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [underReview, setUnderReview] = useState<Task[]>([]);
  const [finished, setFinished] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editSection, setEditSection] = useState<string>("");

  const [newTicketTitle, setNewTicketTitle] = useState<string>("");
  const [newTicketDescription, setNewTicketDescription] = useState<string>("");
  const [newTicketPriority, setNewTicketPriority] = useState<
    "Normal" | "Medium" | "Urgent"
  >("Normal");
  const [newTicketDeadline, setNewTicketDeadline] = useState<string>("");
  const [newTicketSection, setNewTicketSection] = useState<
    "To Do" | "In Progress" | "Under Review" | "Finished"
  >("To Do");

  const handleAddTicket = () => {
    if (
      newTicketTitle.trim() !== "" &&
      newTicketDescription.trim() !== "" &&
      newTicketDeadline.trim() !== ""
    ) {
      const newTask: Task = {
        title: newTicketTitle,
        description: newTicketDescription,
        priority: newTicketPriority,
        deadline: newTicketDeadline,
        createdAt: new Date(),
        section: newTicketSection,
      };

      switch (newTicketSection) {
        case "To Do":
          setToDo([...toDo, newTask]);
          break;
        case "In Progress":
          setInProgress([...inProgress, newTask]);
          break;
        case "Under Review":
          setUnderReview([...underReview, newTask]);
          break;
        case "Finished":
          setFinished([...finished, newTask]);
          break;
        default:
          setToDo([...toDo, newTask]);
          break;
      }

      setNewTicketTitle("");
      setNewTicketDescription("");
      setNewTicketPriority("Normal");
      setNewTicketDeadline("");
      setNewTicketSection("To Do");
    }
  };

  const handleEditTask = () => {
    if (editTask && editIndex !== null) {
      const updatedTask: Task = { ...editTask, createdAt: new Date() };

      // Remove task from its current section
      switch (editSection) {
        case "To Do":
          setToDo(toDo.filter((_, i) => i !== editIndex));
          break;
        case "In Progress":
          setInProgress(inProgress.filter((_, i) => i !== editIndex));
          break;
        case "Under Review":
          setUnderReview(underReview.filter((_, i) => i !== editIndex));
          break;
        case "Finished":
          setFinished(finished.filter((_, i) => i !== editIndex));
          break;
        default:
          break;
      }

      // Add task to the new section
      switch (updatedTask.section) {
        case "To Do":
          setToDo([...toDo, updatedTask]);
          break;
        case "In Progress":
          setInProgress([...inProgress, updatedTask]);
          break;
        case "Under Review":
          setUnderReview([...underReview, updatedTask]);
          break;
        case "Finished":
          setFinished([...finished, updatedTask]);
          break;
        default:
          break;
      }

      setEditTask(null); // Close the edit modal after updating
      setEditIndex(null);
      setEditSection("");
    }
  };

  const handleCancelEdit = () => {
    setEditTask(null); // Close the edit modal without saving
    setEditIndex(null);
    setEditSection("");
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    sourceColumn: string
  ) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: string
  ) => {
    const task = JSON.parse(e.dataTransfer.getData("task")) as Task;
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (targetColumn !== sourceColumn) {
      switch (targetColumn) {
        case "To Do":
          setToDo([...toDo, task]);
          break;
        case "In Progress":
          setInProgress([...inProgress, task]);
          break;
        case "Under Review":
          setUnderReview([...underReview, task]);
          break;
        case "Finished":
          setFinished([...finished, task]);
          break;
        default:
          break;
      }

      switch (sourceColumn) {
        case "To Do":
          setToDo(toDo.filter((t) => t.title !== task.title));
          break;
        case "In Progress":
          setInProgress(inProgress.filter((t) => t.title !== task.title));
          break;
        case "Under Review":
          setUnderReview(underReview.filter((t) => t.title !== task.title));
          break;
        case "Finished":
          setFinished(finished.filter((t) => t.title !== task.title));
          break;
        default:
          break;
      }
    }
  };

  const handleDeleteTask = (task: Task, section: string) => {
    switch (section) {
      case "To Do":
        setToDo(toDo.filter((t) => t.title !== task.title));
        break;
      case "In Progress":
        setInProgress(inProgress.filter((t) => t.title !== task.title));
        break;
      case "Under Review":
        setUnderReview(underReview.filter((t) => t.title !== task.title));
        break;
      case "Finished":
        setFinished(finished.filter((t) => t.title !== task.title));
        break;
      default:
        break;
    }
  };

  const handleEditClick = (task: Task, index: number, section: string) => {
    setEditTask(task);
    setEditIndex(index);
    setEditSection(section);
  };

  return (
    <>
      {/* Modal for editing a task */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Edit description"
            />
            <select
              value={editTask.priority}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  priority: e.target.value as "Normal" | "Medium" | "Urgent",
                })
              }
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
            <input
              type="date"
              value={moment(editTask.deadline).format("YYYY-MM-DD")}
              onChange={(e) =>
                setEditTask({ ...editTask, deadline: e.target.value })
              }
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            <select
              value={editTask.section}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  section: e.target.value as
                    | "To Do"
                    | "In Progress"
                    | "Under Review"
                    | "Finished",
                })
              }
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Finished">Finished</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={handleEditTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 p-4">
        {/* To Do Column */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "To Do")}
          className="bg-gray-100 p-4 rounded-md"
        >
          <h2 className="text-lg font-semibold mb-2">To Do</h2>
          {toDo.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, task, "To Do")}
              className="bg-white p-2 mb-2 rounded-md shadow-sm"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">{task.priority}</p>
              <p className="text-sm text-gray-500">
                {moment(task.deadline).format("MMM DD, YYYY")}
              </p>
              <button
                onClick={() => handleEditClick(task, index, "To Do")}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task, "To Do")}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "In Progress")}
          className="bg-gray-100 p-4 rounded-md"
        >
          <h2 className="text-lg font-semibold mb-2">In Progress</h2>
          {inProgress.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, task, "In Progress")}
              className="bg-white p-2 mb-2 rounded-md shadow-sm"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">{task.priority}</p>
              <p className="text-sm text-gray-500">
                {moment(task.deadline).format("MMM DD, YYYY")}
              </p>
              <button
                onClick={() => handleEditClick(task, index, "In Progress")}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task, "In Progress")}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Under Review Column */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "Under Review")}
          className="bg-gray-100 p-4 rounded-md"
        >
          <h2 className="text-lg font-semibold mb-2">Under Review</h2>
          {underReview.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, task, "Under Review")}
              className="bg-white p-2 mb-2 rounded-md shadow-sm"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">{task.priority}</p>
              <p className="text-sm text-gray-500">
                {moment(task.deadline).format("MMM DD, YYYY")}
              </p>
              <button
                onClick={() => handleEditClick(task, index, "Under Review")}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task, "Under Review")}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Finished Column */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "Finished")}
          className="bg-gray-100 p-4 rounded-md"
        >
          <h2 className="text-lg font-semibold mb-2">Finished</h2>
          {finished.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, task, "Finished")}
              className="bg-white p-2 mb-2 rounded-md shadow-sm"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">{task.priority}</p>
              <p className="text-sm text-gray-500">
                {moment(task.deadline).format("MMM DD, YYYY")}
              </p>
              <button
                onClick={() => handleEditClick(task, index, "Finished")}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task, "Finished")}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Form for adding new tickets */}
      <div className="bg-white p-4 rounded-md shadow-md mt-4">
        <h3 className="text-lg font-semibold mb-4">Add New Ticket</h3>
        <input
          type="text"
          value={newTicketTitle}
          onChange={(e) => setNewTicketTitle(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
          placeholder="Title"
        />
        <textarea
          value={newTicketDescription}
          onChange={(e) => setNewTicketDescription(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
          placeholder="Description"
        />
        <select
          value={newTicketPriority}
          onChange={(e) => setNewTicketPriority(e.target.value as "Normal" | "Medium" | "Urgent")}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="Normal">Normal</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          value={newTicketDeadline}
          onChange={(e) => setNewTicketDeadline(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <select
          value={newTicketSection}
          onChange={(e) => setNewTicketSection(e.target.value as "To Do" | "In Progress" | "Under Review" | "Finished")}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Finished">Finished</option>
        </select>
        <button
          onClick={handleAddTicket}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Ticket
        </button>
      </div>
    </>
  );
};

export default Dashboard;
