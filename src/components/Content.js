import React, { useState, useReducer, } from 'react';
import '../App.css'
import AddComponents from './AddComponents';
import ListComponent from './ListComponent';
import uuid from 'react-uuid'

class JobModel {
    constructor(data) {
        if (!data) {
            data = {};
        }
        this.id = uuid();
        this.title = data;

    }
}
// state
const initialState = {
    job: '',
    jobs: []

}
//Action
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'
const UPDATE_JOB = 'update_job'

const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}

const addJob = payload => {
    return {
        type: ADD_JOB,
        // job: '', //tranh lam nhu nay nen boc tach no ra
        payload
    }
}
const deleteJob = (payload) => {
    return {
        type: DELETE_JOB,
        payload
    }
}
const updateJob = (payload) => {
    return {
        type: UPDATE_JOB,
        payload
    }
}

//Reducer
const reducer = (state, action) => {


    switch (action.type) {
        case SET_JOB:
            return { ...state, job: action.payload }
        case ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, new JobModel(action.payload)]
            }
        case DELETE_JOB:
            const newJobs = [...state.jobs]
            const newList = newJobs.filter((item) => item.id !== action.payload)
            return {

                ...state,
                jobs: newList

            }
        case UPDATE_JOB:
            const newUpdateJobs = [...state.jobs]
            const currentUpdate = newUpdateJobs.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                } else {
                    return item

                }
            })

            return {
                ...state,
                jobs: currentUpdate
            }

        default: throw new Error('Invalid data')
    }

}

function Content() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { job, jobs } = state

    // const handleKeypress = e => {
    //     if (e.keyCode === 13)
    //         handleSubmit();
    // }
    const handleChangeInput = e => {
        dispatch(setJob(e.target.value))
    }
    const handleDelete = e => {
        dispatch(deleteJob(e))
    }
    const handleUpdate = e => {
        dispatch(updateJob(e))
    }
    const [currentTodo, setCurrentTodo] = useState({});

    return (
        <div className='content'>
            <AddComponents job={job} setJob={setJob} handleChangeInput={handleChangeInput} dispatch={dispatch} addJob={addJob} />
            <ListComponent handleDelete={handleDelete} currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} jobs={jobs} handleUpdate={handleUpdate} />
        </div>
    )
}
export default Content
