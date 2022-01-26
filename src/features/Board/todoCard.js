import React, { useState, useEffect } from 'react';
import '../todo.css';
import {useDispatch} from "react-redux";
import {removeTask,updateTask, isLargeCardVisible, setLargeCard} from "./todoSlice";
import serverApis from "../../ServerApis/serverApis";
import { Modal, Tooltip,Popover } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import checkImg from '../../images/check.svg';
import closeImg from '../../images/close.svg';
import resizeImg from '../../images/resize.png';
import utils from "../../utils/utils"

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
            title: 'Are you sure to delete this task?',
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

    const getImage = (className) => {
        return <img src={serverApis.getServerAddress() + "/todo/attachment/" + props.attachment_id} className={className} />;
    }

    const getAttachmentSrc = () =>{
        if(props.attachment_id != null) {
            return (<div>
                        <Popover content={getImage('card_attachmet_popover')} >
                            {getImage('card_attachmet')}
                        </Popover>
                    </div>);

        }
        else {
            return <></>;
        }
    }

    const showLargeCardModal = ()=>{
        dispatch(isLargeCardVisible(true));
        dispatch(setLargeCard(props.cardId));
    }

    const card_class = () => {
        switch (props.category_id) {
            case utils.CATEGORIES.NONE:
                return "card-category-none";
            case utils.CATEGORIES.RED:
                return "card-category-red";
            case utils.CATEGORIES.BLUE:
                return "card-category-blue";
        }
    }

    return (
        <div className={'todo_card ' + card_class()}>
            <div>
                <div className={props.isCompleted ? 'card_title card_title_completed' : 'card_title'}>
                    <Tooltip title={props.title}>
                        {props.title}
                    </Tooltip>
                </div>
                <div className={ props.isCompleted ? 'card_content card_content_completed' : 'card_content'}>{props.content}</div>
                <div>
                    {getAttachmentSrc()}
                </div>
                <div className={props.isCompleted ? 'card_duedate_completed' : 'card_duedate'}>{props.dueDate}</div>
                {props.visible ?
                    <Tooltip title="Set task as completed">
                        <img src={checkImg} className={'btn_task_completed'}  onClick={doneClick} />
                    </Tooltip>
                    : null
                }
            </div>
            <Tooltip title="Open in bigger window">
                <img src={resizeImg} className={'card_enlarge_btn'} onClick={showLargeCardModal} />
            </Tooltip>
            <Tooltip title="Delete task">
                <img src={closeImg} className={'card_close_btn'} onClick={showDeleteConfirm} />
            </Tooltip>
        </div>
    )
}

export default TodoCard;