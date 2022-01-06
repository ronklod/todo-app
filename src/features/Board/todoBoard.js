import React, { useState, useEffect } from 'react';
import '../todo.css';
import TodoForm from "./todoForm";
import TodosList from  "./todosList"
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "./todoSlice";
import serverApis from '../../ServerApis/serverApis';

const  TodoBoard = ()=>{
    const dispatch = useDispatch();

    const loadTasks = (tasks)=>{
        for(let task of tasks.data){
            dispatch(addTask({'title': task.title, 'content': task.content, 'id': task.id, dueDate: task.dueDate}));
        }
    }

    useEffect(()=>{
        serverApis.get('/todo/', loadTasks, ()=>{});
    })

    return (
        <div className={'flex_container'}>
            <div className={'left_panel'}>
                <TodoForm />
            </div>
            <div className={'right_panel'}>
                <TodosList />
            </div>
        </div>
    )
}

export default TodoBoard;