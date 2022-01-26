import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import TodoCard from "./todoCard";
import '../todo.css';
import { selectTodo} from "./todoSlice";
import TodoCardModal from "./todoCardModal";

const TodosList = () => {

    //redux state
    const todoArr = useSelector(selectTodo);

    return (
        <>
            <TodoCardModal />
            <div className={'todo_list'}>
                <div className={'todo_list_uncompleted_container'}>
                    <div className={'todo_list_title'}>Open Tasks</div>
                    <div className={'todo_list_uncompleted'}>
                        {
                            todoArr.map((todo) => {
                                return !todo.isCompleted &&  <TodoCard title={todo.title}
                                                                       content={todo.content}
                                                                       cardId={todo.id}
                                                                       dueDate={todo.dueDate}
                                                                       attachment_id={todo.attachment_id}
                                                                       visible={true}
                                                                       category_id={todo.category_id}/>
                            })
                        }
                    </div>
                </div>
                <div className={'todo_list_completed_container'}>
                    <div className={'todo_list_title'}>Completed Tasks</div>
                    <div className={'todo_list_completed'}>
                        {
                            todoArr.map((todo) => {
                                return todo.isCompleted &&  <TodoCard title={todo.title}
                                                                      isCompleted={todo.isCompleted}
                                                                      content={todo.content}
                                                                      cardId={todo.id}
                                                                      dueDate={todo.dueDate}
                                                                      attachment_id={todo.attachment_id}
                                                                      visible={false}
                                                                      category_id={todo.category_id}  />
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}


export default TodosList;