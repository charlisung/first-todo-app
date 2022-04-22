import { useState, useEffect } from "react";

import TodoList from "./TodoList";
import AddForm from "./AddForm";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [num, setNum] = useState(0);
  const [percent, setPerncet] = useState(0);
  const [editId, setEditId] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    let total = todos.filter((todo) => todo.completed === true).length;
    let percentage = Math.floor((num / todos.length) * 100);
    setNum(total);
    setPerncet(percentage);
  });

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  const toggleHandle = (id) => {
    let updatedTodos = [...todos].map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(updatedTodos);
  };

  const inputHandle = (e) => {
    const newTodo = {
      id: Math.random() * 10000,
      text: e.target.value,
      completed: false,
    };
    setTodo(newTodo);
  };

  const inputSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      alert("Enter something...");
    } else {
      setTodos([...todos, todo]);
      setTodo({ ...todo, text: "" });
    }
  };

  const editClickHandle = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
    setEditId(todo.id);
  };

  const editInputHandle = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const editOnSubmit = (e) => {
    e.preventDefault();
    editFunc(currentTodo.id, currentTodo);
    setIsEditing(false);
  };

  const editFunc = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === id ? newText : todo;
    });
    setTodos(updatedTodos);
    setIsEditing(false);
  };

  const deleteChecked = () => {
    let updateTodos = [...todos].filter((todo) => todo.completed === false);
    setTodos(updateTodos);
  };

  return (
    <div className="container">
      <h1>TodoList</h1>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        deleteTodo={deleteTodo}
        editClickHandle={editClickHandle}
        currentTodo={currentTodo}
        editInputHandle={editInputHandle}
        editOnSubmit={editOnSubmit}
        editId={editId}
        isEditing={isEditing}
        toggleHandle={toggleHandle}
      />

      <AddForm
        inputHandle={inputHandle}
        inputSubmit={inputSubmit}
        todo={todo}
      />

      <div className="progress">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span> {`${num} of ${todos.length} tasks completed`}</span>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={deleteChecked}
      >
        Remove checked
      </button>
    </div>
  );
}
