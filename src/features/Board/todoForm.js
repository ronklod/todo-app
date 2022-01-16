import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTask, selectTodo} from "./todoSlice";
import '../todo.css';
import { Form, Input, DatePicker, Button } from 'antd';
import serverApis from "../../ServerApis/serverApis";
import axios from "axios";


const  TodoForm = ()=> {
    //redux state
    const todoArr = useSelector(selectTodo);
    const dispatch = useDispatch();
    //component state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [alertRequired, setAlert] = useState(false);
    const [dueDate, setDuedate] = useState('');
    const [attachment, setAttachment] = useState(null);

    //antd from hook
    const [form] = Form.useForm();

    const isAlertRequired = (val)=> {
        setAlert(!alertRequired);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleDueDateChange = (value) =>{
        let date = value.format('ddd DD MMM YYYY HH:mm');
        setDuedate(date);
    }

    const handleFileUpload = (e) => {
        setAttachment(e.target.files[0]);
    }

    const saveTask = () =>{
        let task = {'title': title, 'content': content, 'dueDate': dueDate};

        saveTaskOnServer(task);
        //redux state update
        //not required while using antd forms, since i'm clearing the forms after submit and i'm not allowing adding empty strings, the input fields are set to reuiqred
        setTitle("");
        setContent("");
        setAttachment(null);
    }

    const saveTaskOnServer = (task) =>{
        let formData = new FormData();
        formData.append("file", attachment);
        formData.append("task", JSON.stringify(task));

        const headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }}

        serverApis.post('/todo/',formData, headers , (taskData)=> {dispatch(addTask(taskData.data))}, (err)=>{alert(err.message)});
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {
        saveTask();
        form.resetFields();
    };

    return (
        <div className={'left_panel_content'}>
           <div className={'add_task_title'}>Add new Task</div>
            <Form {...layout} form={form} name="nest-messages"  onFinish={onFinish}  validateMessages={validateMessages}>
                <Form.Item label="Title" name={['todo', 'title']} rules={[{ required: true }]}>
                    <Input value={title} onChange={handleTitleChange} />
                </Form.Item>
                <Form.Item name={['todo', 'content']} label="Content" >
                    <Input.TextArea  value={content} onChange={handleContentChange}   />
                </Form.Item>
                <Form.Item label="Due Date">
                    <DatePicker onChange={handleDueDateChange} onOk={handleDueDateChange} showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"/>
                </Form.Item>
                <Form.Item label="attachment">
                    <input type="file" name="attachment" onChange={handleFileUpload}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                    <Button type="primary" htmlType="submit"  >
                        Save Task
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default TodoForm;