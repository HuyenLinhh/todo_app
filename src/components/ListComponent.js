import React, { useState } from 'react'


const ListComponent = ({ jobs, handleDelete, handleUpdate, setCurrentTodo, currentTodo }) => {



    function handleEditInputChange(e) {
        setCurrentTodo((p) => {
            return { ...p, title: e.target.value }
        });
    }
    return (
        <div>
            <ul>
                {jobs.map((job, index) => {
                    return (
                        <li className='list-item' key={index}>
                            {currentTodo.id === job.id ? (
                                <input
                                    name="editTodo"
                                    type="text"
                                    onChange={handleEditInputChange}
                                    value={currentTodo.title}
                                />
                            ) : (
                                <p>{job.title}</p>
                            )}

                            <button className='button-complete'> <i className='fa fa-check-circle'></i></button>
                            <div>
                                <button className='button-edit' onClick={() => {
                                    setCurrentTodo((p) => {
                                        if (p.id === job.id) {
                                            handleUpdate(p)
                                            return {}
                                        }
                                        return job
                                    });
                                }}> <i className='fa fa-edit'></i>

                                </button>
                            </div>
                            <button className='button-delete' onClick={() => handleDelete(job.id)}> Delete</button>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}

export default ListComponent