import React from "react";
import EditForm from "./EditForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
export default function TodoList({
  todos,
  setTodos,
  deleteTodo,
  editClickHandle,
  currentTodo,
  editInputHandle,
  editOnSubmit,
  editId,
  isEditing,
  toggleHandle,
}) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => {
              return (
                <>
                  {editId === todo.id && isEditing === true ? (
                    <EditForm
                      currentTodo={currentTodo}
                      editInputHandle={editInputHandle}
                      editOnSubmit={editOnSubmit}
                    />
                  ) : (
                    <Draggable
                      key={todo.id}
                      draggableId={`${todo.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={todo.id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="input-group mb-3 todo-item"
                        >
                          <li
                            className="list"
                            style={
                              todo.completed
                                ? { textDecoration: "line-through" }
                                : null
                            }
                          >
                            <div className="todo-li">
                              <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => {
                                  toggleHandle(todo.id);
                                }}
                              />
                              {todo.text}
                            </div>
                            <div>
                              <button onClick={() => editClickHandle(todo)}>
                                <FaEdit />
                              </button>

                              <button onClick={() => deleteTodo(todo.id)}>
                                <FaTrash />
                              </button>
                            </div>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  )}
                </>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
