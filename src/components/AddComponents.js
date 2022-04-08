import React, { useState, useRef, useEffect } from 'react'


const AddComponents = ({ job, handleChangeInput, dispatch, addJob, setJob }) => {
    // Change theme
    const [theme, setTheme] = useState('dark')
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    } // => use Context Provider 
    const inputFocus = useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addJob(job));
        dispatch(setJob(''));
        inputFocus.current.focus()
    }
    return (
        <div>
            <div className="main">
                <input className='task-input'
                    ref={inputFocus}
                    value={job}
                    placeholder="Enter your list..."
                    onChange={handleChangeInput}
                />
                <button className='button-add' onClick={handleSubmit} type='submit'>Add</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className='button-theme' onClick={changeTheme}> Change Theme </button>
            </div>
        </div>

    )
}

export default AddComponents  