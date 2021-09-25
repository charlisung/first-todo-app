import React from "react";
import { FaSave } from "react-icons/fa";

export default function AddForm({ inputHandle, inputSubmit, todo }) {
  return (
    <form onSubmit={inputSubmit} className="form-control">
      <input
        type="text"
        placeholder="write todo..."
        value={todo.text}
        onChange={inputHandle}
      />
      <button>
        <FaSave />
      </button>
    </form>
  );
}
