import React, { useState } from "react";

const TodoList = ({ todos, setTodos, setEditTodo, editTodo }) => {
    const handleDelete = ({ id }) => {
        setTodos(todos.filter((todo) => todo.id !== id))

    }
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            })
        );

    };

    const handleEdit = ({ id }) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);

    }
    // function handleEditInputChange(e) {
    //             setCurrentTodo((p) => {
    //                 return { ...p, title: e.target.value }
    //             });
    //         }
    return (
        <div>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    <input type='text' value={todo.title}
                        className={`list ${todo.completed ? "complete" : ""} `}
                        onChange={(e) => e.preventDefault()} />

                    <div>
                        <button className='button-complete' onClick={() => handleComplete(todo)}> <i className='fa fa-check-circle'></i></button>
                    </div>
                    <div>
                        <button className='button-edit' onClick={() => handleEdit(todo)}> <i className='fa fa-edit'></i>

                        </button>
                    </div>
                    <button className='button-delete' onClick={() => handleDelete(todo)}> Delete</button>
                </li>
            ))
            }
        </div>
    )
}
export default TodoList;
