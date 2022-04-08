import React from 'react';
import Content from '../components/Content';
import '../App.css'

function Header(theme) {
    return (
        <div className='header'>
            <h1> To Do List</h1>
            <div className={theme}>
                <Content />
            </div>

        </div>
    );
}
export default Header;
