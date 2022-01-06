import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import TodoCard from "./todoCard";
import '../todo.css';
import {selectTodo} from "./todoSlice";


const TodosList = ()=> {
    //redux state
    const todoArr = useSelector(selectTodo);

    return (
        <div className={'todo_list'}>
            {
                todoArr.map((todo) => {
                    return <TodoCard title={todo.title} content={todo.content} cardId={todo.id} dueDate={todo.dueDate}/>
                })
            }
        </div>
    )
}


export default TodosList;