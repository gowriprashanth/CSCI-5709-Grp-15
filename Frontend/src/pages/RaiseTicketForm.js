import { UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import React, { useState } from 'react';
import { uploadFile } from '../FirebaseStorageService';
import axiosHelper from "../helper/axioshelper";
const RaiseTicketForm = ({ onTicketRaised, teamId }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [fileList, setFileList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const upload_props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            const isPDF = file.type === 'application/pdf';
            if (!isImage && !isPDF) {
                messageApi.error('You can only upload JPG/PNG/PDF file!');
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                messageApi.error('File must smaller than 5MB!');
                return false;
            }

            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };


    const onFormSubmit = (values) => {
        values.files = [];
        values.teamId = teamId
        Promise.all(fileList.map(async (file) => {
            const data = await uploadFile(file);
            return data;
        })).then((filesData) => {
            setFileList([]);
            values.files = filesData;
            axiosHelper.post('/tickets/create', values).then((response) => {
                if (onTicketRaised) {
                    onTicketRaised(values);
                }
            });
        });
        setTimeout(() => {
            setConfirmLoading(true);
            form.resetFields();
            setOpen(false);
            setConfirmLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Ticket raised successfully!',
                duration: 2,
            });
        }, 500);
    }

    return (
        <>
            {contextHolder}
            <Button type="primary" className="ant-btn-sm ant-btn-block" style={{ marginTop: "4px" }} onClick={showModal}>
                Raise Ticket
            </Button>
            <Modal
                title="Raise Ticket"
                open={open}
                onOk={handleOk}
                okText="Submit"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Alert message="Please go through the FAQ before raising a ticket." type="info" showIcon style={{ margin: "10px 0" }} />
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFormSubmit}
                    initialValues={{
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item label="Title" name="title" rules={[
                        {
                            required: true,
                            message: 'Please enter title',
                        },
                    ]}>
                        <Input placeholder="Enter title" />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[
                        {
                            required: true,
                            message: 'Please enter description',
                        },
                    ]}>
                        <TextArea rows={4} placeholder="Enter short description..." />
                    </Form.Item>
                    <Upload defaultFileList={fileList} {...upload_props} maxCount={5} accept=".jpg,.png,.pdf">
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form>
            </Modal>
        </>
    );
};
export default RaiseTicketForm;
