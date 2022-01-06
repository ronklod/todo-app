import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import TodoCard from "./todoCard";
import '../todo.css';
import {selectTodo} from "./todoSlice";


const TodosList = ()=> {
    //redux state
    const todoArr = useSelector(selectTodo);

    return (
        <div className={'todo_list'}>
            <div className={'todo_list_uncompleted_container'}>
                <div className={'todo_list_title'}>Open Tasks</div>
                <div className={'todo_list_uncompleted'}>
                    {
                        todoArr.map((todo) => {
                            return !todo.isCompleted &&  <TodoCard title={todo.title} content={todo.content} cardId={todo.id} dueDate={todo.dueDate} visible={true}/>
                        })
                    }
                </div>
            </div>
            <div className={'todo_list_completed_container'}>
                <div className={'todo_list_title'}>Completed Tasks</div>
                <div className={'todo_list_completed'}>
                    {
                        todoArr.map((todo) => {
                            return todo.isCompleted &&  <TodoCard title={todo.title} isCompleted={todo.isCompleted} content={todo.content} cardId={todo.id} dueDate={todo.dueDate} visible={false}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default TodosList;