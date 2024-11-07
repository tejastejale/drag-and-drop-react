import React, { useState } from "react";
import logo from "./logo.svg";

function App() {
  const [data, setData] = useState([
    { id: 1, title: "todo 1", status: "todo" },
    { id: 2, title: "todo 2", status: "todo" },
    { id: 3, title: "todo 3", status: "todo" },
  ]);
  const [Indicator, setIndicator] = useState("");

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragEnd = (e) => {
    e.dataTransfer.clearData();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskID = parseInt(e.dataTransfer.getData("text/plain"));
    setData((prev) => {
      return prev.map((item) => {
        if (item.id === taskID) {
          return { ...item, status };
        }
        return item;
      });
    });
    setIndicator("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIndicator(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };

  const renderTasks = (status) => {
    return data
      .filter((item) => item.status === status)
      .map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragEnd={(e) => handleDragEnd(e)}
          className="w-50 bg-gray-200 p-4 rounded-md"
        >
          {item.title}
        </div>
      ));
  };

  return (
    <div className="flex md:flex-row flex-col p-10 gap-5 w-screen h-[50vh]">
      <div
        id="todo"
        onDrop={(e) => handleDrop(e, "todo")}
        onDragOver={(e) => handleDragOver(e)}
        className={`border-2 w-full h-full gap-4 p-4 flex flex-col rounded ${
          Indicator === "todo" ? "bg-blue-400 opacity-30" : "bg-white"
        }`}
      >
        {renderTasks("todo")}
      </div>{" "}
      <div
        id="progress"
        onDrop={(e) => handleDrop(e, "progress")}
        onDragOver={(e) => handleDragOver(e)}
        className={`border-2 w-full h-full gap-4 p-4 flex flex-col rounded ${
          Indicator === "progress" ? "bg-blue-400 bg-opacity-30 " : "bg-white"
        }`}
      >
        {renderTasks("progress")}
      </div>{" "}
      <div
        id="done"
        onDrop={(e) => handleDrop(e, "done")}
        onDragOver={(e) => handleDragOver(e)}
        className={`border-2 w-full h-full gap-4 p-4 flex flex-col rounded ${
          Indicator === "done" ? "bg-blue-400 opacity-30" : "bg-white"
        }`}
      >
        {renderTasks("done")}
      </div>
    </div>
  );
}

export default App;
