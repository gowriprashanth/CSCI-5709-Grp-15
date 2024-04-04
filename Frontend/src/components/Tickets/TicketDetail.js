import { useCallback, useEffect, useState } from "react";

import {
  Col,
  Row,
  Form,
  Select,
  Button,
  Upload,
  List,
  message,
  Comment,
  Popconfirm
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useLocation, useHistory } from "react-router-dom"
import * as TicketService from "../../services/TicketService"
import { uploadFile } from "../../FirebaseStorageService"

const commentAvatar = "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzMuanBn.jpg" 

export default function TicketDetail() {
    const { state } = useLocation();
    const [users, updateAssignee] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [ticketData, updateTicketData] = useState({})
    const [statuses, updateStatuses] = useState([])
    const [priorities, updatePriorities] = useState([])
    const history = useHistory();

    if(!state._id) {
        history.push("/dashboard")
    }

    const confirm = (e) => {
        message.success('Ticket Escalated Successfully');
    };

    const cancel = (e) => {
        message.error('You denied to confirmation');
    };
    
    const changeUpdateAssignee = async (value) => {
        await TicketService.UpdateTicketAssignee({ ticketId: state?._id, assignee: value })
        getTicketData()
        messageApi.open({
            type: 'success',
            content: 'Assignee Changed Successfully',
        });
    }

    const changeUpdateStatus = async (value) => {
        await TicketService.UpdateTicketStatus({ ticketId: state?._id, status: value })
        getTicketData()
        messageApi.open({
            type: 'success',
            content: 'Status Updated Successfully',
        });
    }

    const changeUpdatePriority = async (value) => {
        await TicketService.UpdateTicketPriority({ ticketId: state?._id, priority: value })
        getTicketData()
        messageApi.open({
            type: 'success',
            content: 'Priority Updated Successfully',
        });
    }

    const getTicketData = useCallback(async () => {
        const response = await TicketService.GetTicketDetail(state?._id)
        if (response && response.data) {
            response.data.attachments = response.data.attachments.map(e => ({
                uid: e._id,
                name: e.name,
                status: "done",
                url: e.url
            }))
            response.data.comments = response.data.comments.map(e => ({
                author: e.userId.name,
                avatar: commentAvatar,
                content: e.comment,
                datetime: e.createdAt
            }))
            updateTicketData(response.data)
        }
    }, [state?._id])

    const getStatuses = async () => {
        const response = await TicketService.GetStatuses()
        if (response && response.data && response.data.length > 0) {
            updateStatuses(response.data.map(e => ({ value: e._id, label: e.name })))
        }
    }

    const getPriorties = async () => {
        const response = await TicketService.GetPriorities()
        if (response && response.data && response.data.length > 0)
            updatePriorities(response.data.map(e => ({ value: e._id, label: e.name })))
    }

    const getUsers = async () => {
        const response = await TicketService.GetUsers()
        if (response && response.data && response.data.length > 0){
            updateAssignee(response.data)
        }
    }

    const addComment = async () => {
        if(newComment !== "") {
            await TicketService.AddComment({ ticketId: ticketData._id, comment: newComment })
            getTicketData()
            messageApi.open({
                type: 'success',
                content: 'Comment Added Successfully',
            });
            setNewComment('')
        } else {
            messageApi.open({
                type: 'error',
                content: 'Please write Comment',
            });
        }
    }

    useEffect(() => {
        getTicketData()
    },[getTicketData])

    useEffect(() => {
        getStatuses()
        getUsers()
        getPriorties()
    }, [])

    const startUploading = async (file) => {
        try {
            const data = await uploadFile(file)
            await TicketService.AddAttachment({ ticketId: ticketData._id, files: [data]})
            getTicketData()
            messageApi.open({
                type: 'success',
                content: 'File Uploaded Successfully',
            });
            return false
        } catch(error) {
            messageApi.open({
                type: 'error',
                content: 'Error Upload file',
            });
        }
    }

    const uploadAttachmentHandler = async (file) => {
        try {
            await startUploading(file)
            return false;
        } catch(error) {
        }
    }

    const props = {
        beforeUpload: uploadAttachmentHandler,
        showUploadList: {
          showDownloadIcon: false,
          showRemoveIcon: false
        },
    };

    return(
        <>
            {contextHolder}
            <h1>Ticket Details</h1>
            <Form name="ticket-detail-form">
                {ticketData && ticketData._id && (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} xl={12}>
                            <Form.Item label="ID">
                                <b><span>{state?._id}</span></b>
                            </Form.Item>
                            <hr />
                            <Form.Item label="Title">
                                <b><span>{ticketData?.title}</span></b>
                            </Form.Item>
                            <hr />
                            <Form.Item label="Description">
                                <span>{ticketData?.description}</span>
                            </Form.Item>
                            <hr />
                            <Form.Item label="Created At">
                                <span>{ticketData?.createdAt}</span>
                            </Form.Item>
                            <hr />
                            <Form.Item label="Modified At">
                                <span>{ticketData?.updatedAt}</span>
                            </Form.Item>
                            <hr />
                        </Col>
                        <Col xs={24} sm={24} md={24} xl={12}>
                            {ticketData && users && (
                                <Form.Item label="Assignee">
                                    <Select
                                        defaultValue={ticketData.assignee.map(e => (e._id))}
                                        mode="multiple"
                                        onChange={changeUpdateAssignee}
                                        options={users.map(e => ({
                                            label: `${e.name} (${e.email})`,
                                            value: e._id
                                        }))}
                                    />
                                </Form.Item>                                
                            )}
                            <hr />
                            {ticketData && ticketData.status && (
                                <Form.Item label="Status">
                                    <Select
                                        defaultValue={ticketData?.status?._id}
                                        onChange={changeUpdateStatus}
                                        options={statuses}
                                    />
                                </Form.Item>
                            )}
                            <hr />
                            {ticketData && ticketData.priority && (
                                <Form.Item label="Priority">
                                    <Select
                                        defaultValue={ticketData?.priority?._id}
                                        onChange={changeUpdatePriority}
                                        options={priorities}
                                    />
                                </Form.Item>
                            )}
                            <hr />
                        </Col>
                    </Row>
                )}
                
                <Popconfirm
                    title="Are you sure to escalate this ticket?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary">Escalate</Button>
                </Popconfirm>
                
                <br />
                <p></p>
                <h2>Attachments</h2>
                {ticketData && ticketData.attachments && (
                    <Upload defaultFileList={ticketData.attachments} {...props}>
                        <Button icon={<UploadOutlined />}>Add Attachment</Button>
                    </Upload>
                )}
                <br />
                <h2>Comments</h2>
                {ticketData && ticketData.comments && (
                    <List
                        header={`${ticketData.comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={ticketData.comments}
                        renderItem={item => (
                            <li>
                                <Comment {...item} />
                            </li>
                        )}
                    />
                )}
                <div>
                    <h3>Add Comment</h3>
                    <Form.Item>
                        <TextArea rows={4} value={newComment} onChange={e => setNewComment(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" onClick={addComment}>
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}