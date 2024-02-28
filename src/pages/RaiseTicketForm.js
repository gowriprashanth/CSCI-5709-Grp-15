import { UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import React, { useState } from 'react';
const RaiseTicketForm = ({ onTicketRaised }) => {
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
        if (onTicketRaised) {
            onTicketRaised(values);
        }
        setConfirmLoading(true);
        setTimeout(() => {
            form.resetFields();
            setOpen(false);
            setConfirmLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Ticket raised successfully!',
                duration: 2,
            });
        }, 100);
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

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
                    <Form.Item label="Files" name="files" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload {...upload_props} maxCount={5} multiple>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default RaiseTicketForm;
