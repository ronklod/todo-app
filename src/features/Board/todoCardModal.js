import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../todo.css';
import { selectLargeCardModalVisibleState,selectLargeCard, isLargeCardVisible} from "./todoSlice";
import { Modal, Tooltip } from 'antd';
import serverApis from "../../ServerApis/serverApis";

const TodoCardModal = () => {
    //redux state
    const showLargeCard = useSelector(selectLargeCardModalVisibleState);
    const largeCardObj = useSelector(selectLargeCard);
    const dispatch = useDispatch();

    const setLargeCardModal = (value) => {
        dispatch(isLargeCardVisible(value));
    }

    const drawLargeCardModalContent = () => {
        let largeCard = <></>;
        if (largeCardObj != null) {
            largeCard = <>
                <div>
                    <span className={'card_title'}>Title:</span>
                    <span>{largeCardObj.title}</span>
                </div>
                <div>
                    <span className={'card_title'}>Content:</span>
                    <span>{largeCardObj.content}</span>
                </div>
                <div>
                    <span className={'card_title'}>Due Date:</span>
                    <span>{largeCardObj.dueDate}</span>
                </div>
                <div>
                    {largeCardObj.attachment_id != null ?
                        <div>
                            <span className={'large_card_attachment_text card_title'}>Attachment:</span>
                            <div className={'large_card_img'}>
                                <img src={serverApis.getServerAddress() + "/todo/attachment/" + largeCardObj.attachment_id} className={'large_card_attachment'}/>
                            </div>
                        </div>

                        : <></>
                    }
                </div>
            </>;
        }

        return largeCard;
    }

    return (
        <>
            <Modal
                title={'Task Details'}
                centered
                width={700}
                visible={showLargeCard}
                onOk={() => setLargeCardModal(false)}
                onCancel={() => setLargeCardModal(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                {drawLargeCardModalContent()}

            </Modal>

        </>
    )
}


export default TodoCardModal;