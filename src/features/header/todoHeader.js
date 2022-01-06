import React, { useState, useEffect } from 'react';
import '../todo.css';


const  TodoHeader = ()=>{
    return (
        <div className={'todo_header'}>
            <span className={'header_text'}>ToDo App</span>
        </div>
    )
}

export default TodoHeader;