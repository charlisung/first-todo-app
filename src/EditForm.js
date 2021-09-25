import React from "react";
import { FaSave } from "react-icons/fa";

export default function EditForm({
  currentTodo,
  editInputHandle,
  editOnSubmit,
}) {
  return (
    <form onSubmit={editOnSubmit} className="form-control">
      <input type="text" value={currentTodo.text} onChange={editInputHandle} />
      <button>
        <FaSave />
      </button>
    </form>
  );
}
