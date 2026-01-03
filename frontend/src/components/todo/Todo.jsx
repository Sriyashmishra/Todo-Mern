import React, { useState, useEffect } from "react";
import "./Todo.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [showBody, setShowBody] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Backend Base URL
  const BASE_URL = "http://localhost:1000/api/v2";

  // Retrieve User ID safely
  const id = sessionStorage.getItem("id");

  // --- FETCH TASKS ON LOAD ---
  useEffect(() => {
    const fetchTasks = async () => {
      if (id) {
        try {
          const res = await axios.get(`${BASE_URL}/getTasks/${id}`);
          if (res.data.list) {
            setTodoList(res.data.list);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    fetchTasks();
  }, [id]);

  // --- SUBMIT / UPDATE LOGIC ---
  const submitTodo = async () => {
    if (title === "" && body === "") {
      toast.error("Please enter a title or body.");
      return;
    }

    if (id) {
      if (editId) {
        // 🔄 UPDATE TASK
        try {
          await axios.put(`${BASE_URL}/UpdateTask/${editId}`, {
            title,
            body,
          });

          const updatedList = todoList.map((item) =>
            item._id === editId ? { ...item, title, body } : item
          );
          setTodoList(updatedList);
          setEditId(null);
          toast.success("Task Updated Successfully");
        } catch (error) {
          toast.error("Failed to update task on server");
        }
      } else {
        // ➕ ADD NEW TASK
        try {
          const res = await axios.post(`${BASE_URL}/addTask`, {
            title,
            body,
            id: id,
          });
          setTodoList([...todoList, res.data.list]);
          toast.success("Task Added Successfully");
        } catch (error) {
          toast.error("Failed to add task");
        }
      }
    } else {
      // 👤 GUEST MODE
      const newTodo = { title, body, _id: Date.now() };
      setTodoList([...todoList, newTodo]);
      toast.error("Task Not Saved! Please Signin");
    }

    setTitle("");
    setBody("");
    setShowBody(false);
  };

  // --- DELETE LOGIC ---
  const deleteTodo = async (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      if (id) {
        try {
          // Sending the user 'id' in the 'data' body as required by your backend logic
          await axios.delete(`${BASE_URL}/DeleteTask/${taskId}`, {
            data: { id: id },
          });

          setTodoList(todoList.filter((item) => item._id !== taskId));
          toast.success("Task Deleted Successfully");
        } catch (error) {
          toast.error("Server Error: Delete failed");
        }
      } else {
        setTodoList(todoList.filter((item) => item._id !== taskId));
        toast.success("Local Task Deleted");
      }
    }
  };

  const startUpdate = (item) => {
    setTitle(item.title);
    setBody(item.body);
    setEditId(item._id);
    setShowBody(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="todo-container container-fluid py-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="todo-card shadow p-4 mb-5 bg-white rounded">
            <h3 className="text-center mb-4 font-weight-bold">
              {editId ? "Update Task" : "Add a New Task"}
            </h3>
            <div className="d-flex flex-column">
              <input
                type="text"
                placeholder="TITLE"
                className="todo-input my-2 p-3"
                value={title}
                onClick={() => setShowBody(true)}
                onChange={(e) => setTitle(e.target.value)}
              />

              {showBody && (
                <textarea
                  placeholder="BODY..."
                  className="todo-input body-input my-2 p-3"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              )}

              <button className="btn btn-add-task w-100 mt-3" onClick={submitTodo}>
                {editId ? "Update Task" : "Add Task"}
              </button>

              {editId && (
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setBody("");
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="todo-list">
            {todoList &&
              todoList.map((item, index) => (
                <div
                  key={index}
                  className="todo-item-box shadow-sm p-3 mb-3 bg-white rounded"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="todo-title mb-1">{item.title}</h5>
                      <p className="todo-body text-muted mb-0">{item.body}</p>
                    </div>
                    <div className="todo-actions">
                      <button
                        className="btn btn-sm btn-outline-info me-2"
                        onClick={() => startUpdate(item)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTodo(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;