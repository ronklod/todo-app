import React, { useState, useEffect } from 'react';
import '../todo.css';
import {useDispatch, useSelector} from "react-redux";
import {removeTask} from "./todoSlice";
import serverApis from "../../ServerApis/serverApis";

const  TodoCard =(props)=>{

    const dispatch = useDispatch();

    const deleteCard = ()=>{
        serverApis.del('/todo/',props.cardId,(result) => {
            dispatch(removeTask(props.cardId))
        }, err => {alert(err.message)});
    }

    return (
        <div className={'todo_card'}>
            <div>
                <div className={'card_title'}>{props.title}</div>
                <div className={'card_content'}>{props.content}</div>
                <div>{props.dueDate}</div>
                {/*<span>{datetime}</span>*/}
            </div>
            <span className={'card_close_btn'} onClick={deleteCard}>X</span>
        </div>
    )
}

export default TodoCard;