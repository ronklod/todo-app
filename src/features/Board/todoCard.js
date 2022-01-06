import React, { useState, useEffect } from 'react';
import '../todo.css';
import {useDispatch} from "react-redux";
import {removeTask,updateTask} from "./todoSlice";
import serverApis from "../../ServerApis/serverApis";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const  TodoCard =(props)=>{

    const dispatch = useDispatch();

    const deleteCard = ()=>{
        serverApis.del('/todo/',props.cardId,(result) => {
            dispatch(removeTask(props.cardId))
        }, err => {alert(err.message)});
    }

    function showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteCard();
            },
            onCancel() {
                return false;
            },
        });
    }

    const doneClick = ()=>{
        serverApis.put('/todo/',props.cardId, (result)=>{
            dispatch(updateTask(props.cardId));
        }, (err)=>{

        })
    }

    return (
        <div className={'todo_card'}>
            <div>
                <div className={'card_title'}>{props.title}</div>
                <div className={'card_content'}>{props.content}</div>
                <div>{props.dueDate}</div>
            </div>
            <span className={'card_close_btn'} onClick={showDeleteConfirm}>X</span>
            {props.visible ?
                <input type="button" onClick={doneClick} value="Done" />
                : null
            }
        </div>
    )
}

export default TodoCard;