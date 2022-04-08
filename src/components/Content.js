import React, { useState, useEffect, useReducer, useRef } from 'react';
import '../App.css'
// state
const initState = {
    job: '',
    jobs: []
}
//Action
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}

const addJob = payload => {
    console.log(payload)
    return {
        type: ADD_JOB,
        // job: '', //tranh lam nhu nay nen boc tach no ra
        payload
    }
}
const deleteJob = payload => {
    return {
        type: DELETE_JOB,
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
                jobs: [...state.jobs, action.payload]
            }
        case DELETE_JOB:
            const newJobs = [...state.jobs]
            newJobs.splice(action.payload, 1)

            return {

                ...state,
                jobs: newJobs

            }

        default: throw new Error('Invalid data')
    }

}
function Content() {
    const [state, dispatch] = useReducer(reducer, initState)

    const { job, jobs } = state
    // const [title, setTitle] = useState('');

    /*  useEffect(() => {
          console.log('Mounted');
      } */
    const inputFocus = useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addJob(job));
        dispatch(setJob(''));
        inputFocus.current.focus()
    }
    // Change theme
    const [theme, setTheme] = useState('dark')
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    } // => use Context Provider 

    const handleKeypress = e => {
        if (e.keyCode === 13)
            handleSubmit();
    }
    return (
        <div>
            <div>
                <div className={theme}>
                    <button className='button-theme' onClick={changeTheme}> Change Theme </button>
                </div>
                <input className='task-input'
                    ref={inputFocus}
                    value={job}
                    placeholder="Enter your list..."
                    onChange={e => { dispatch(setJob(e.target.value)) }}
                    onKeyPress={handleKeypress} />
                <button className='button-add' onClick={handleSubmit} type='submit'>Add</button>
            </div>


            <ul>
                {jobs.map((job, index) => (
                    <li className='list-item' key={index}>{job}
                        <button className='button-delete' onClick={() => dispatch(deleteJob(index))}> Delete </button>
                        <button className='button-complete'> <i className='fa fa-check-circle'></i></button>
                        <button className='button-edit'> <i className='fa fa-edit'></i></button>
                        <button className='button-delete' onClick={() => dispatch(deleteJob(index))}> <i className='fa fa-trash'></i></button>
                    </li>

                ))}
            </ul>
        </div>
    )
}
export default Content;
