import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../todo.css';
import { selectLargeCardModalVisibleState,selectLargeCard, isLargeCardVisible} from "./todoSlice";
import { Modal, Tooltip } from 'antd';
import serverApis from "../../ServerApis/serverApis";
import utils from "../../utils/utils";

const TodoCardModal = () => {
    //redux state
    const showLargeCard = useSelector(selectLargeCardModalVisibleState);
    const largeCardObj = useSelector(selectLargeCard);
    const dispatch = useDispatch();

    const setLargeCardModal = (value) => {
        dispatch(isLargeCardVisible(value));
    }

    const getCategory = (category) => {

        let categoryColor = null;

        switch (category) {
            case utils.CATEGORIES.NONE:
                categoryColor = "category-card-modal-none";
                break;
            case utils.CATEGORIES.RED:
                categoryColor =  "category-card-modal-red";
                break;
            case utils.CATEGORIES.BLUE:
                categoryColor =  "category-card-modal-blue";
                break;
        }

        return categoryColor;

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
                                <span className={'card_title'}>Category:</span>
                                <span className={getCategory(largeCardObj.category_id)}></span>
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