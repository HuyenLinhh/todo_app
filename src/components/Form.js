import React, { useEffect, useRef } from "react";
import { v4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, setEditTodo, editTodo }) => {

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => { return (todo.id === id ? { title, id, completed } : todo) });
        setTodos(newTodo);
        setEditTodo("");
    };

    const inputFocus = useRef()
    const onInputChange = (e) => {
        setInput(e.target.value);
    };
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput, editTodo]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!editTodo) {
            setTodos([...todos, { id: v4(), title: input, completed: false }])
            setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
        inputFocus.current.focus();

    }
    return (
        <form onSubmit={onFormSubmit}>
            <input type='text'
                placeholder='Enter your list'
                className="task-input"
                value={input}
                required
                ref={inputFocus}
                onChange={onInputChange} />
            <button className="button-add" type="submit"> {editTodo ? "Done" : "Add"} </button>

        </form>
    )
}
export default Form;