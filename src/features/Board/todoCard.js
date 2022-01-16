import React, { useState, useEffect } from 'react';
import '../todo.css';
import {useDispatch} from "react-redux";
import {removeTask,updateTask} from "./todoSlice";
import serverApis from "../../ServerApis/serverApis";
import { Modal, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import checkImg from '../../images/check.svg';
import closeImg from '../../images/close.svg';


const { confirm } = Modal;

const  TodoCard =(props) => {

    const dispatch = useDispatch();

    const deleteCard = () => {
        serverApis.del('/todo/',props.cardId,(result) => {
            dispatch(removeTask(props.cardId))
        }, err => {alert(err.message)});
    }

    const showDeleteConfirm = () => {
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

    const doneClick = () => {
        serverApis.put('/todo/',props.cardId, (result)=>{
            dispatch(updateTask(props.cardId));
        }, (err)=>{

        })
    }

    const getAttachmentSrc = () =>{
        if(props.attachment_id != null) {
            return <img src={serverApis.getServerAddress() + "/todo/attachment/" + props.attachment_id} className={'card_attachmet'} />;
        }
        else {
            return <></>;
        }
    }

    return (
        <div className={'todo_card'}>
            <div>
                <div className={props.isCompleted ? 'card_title card_title_completed' : 'card_title'}>{props.title}</div>
                <div className={ props.isCompleted ? 'card_content card_content_completed' : 'card_content'}>{props.content}</div>
                <div>
                    {getAttachmentSrc()}
                </div>
                <div className={'card_duedate'}>{props.dueDate}</div>
                {props.visible ?
                    <Tooltip title="Set task as completed">
                        <img src={checkImg} className={'btn_task_completed'}  onClick={doneClick} />
                    </Tooltip>
                    : null
                }
            </div>
            <Tooltip title="Delete task">
                <img src={closeImg} className={'card_close_btn'} onClick={showDeleteConfirm} />
            </Tooltip>
        </div>
    )
}

export default TodoCard;