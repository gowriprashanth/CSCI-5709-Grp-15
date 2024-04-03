import { useState } from "react";

import {
  Col,
  Row,
  Form,
  Select,
  Button,
  Upload,
  List,
  Tooltip,
  message,
  Comment,
  Popconfirm
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import TextArea from "antd/es/input/TextArea";
import { useLocation } from "react-router-dom"
import * as TicketService from "../../services/TicketService"

const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' }
]

const statuses = [
    { value: 'Not Started', label: 'Not Started' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Awaiting Customer Response', label: 'Awaiting Customer Response' },
    { value: 'Resolved', label: 'Resolved' }
]

const users = ["Kuldeep", "Dhruvik", "Darshit", "Bhautik", "Nisarg", "Gawri", "Rushi", "Shruti", "Nikita", "Priyanka"].map(e=>({ label: e, value: e }))

const props = {
    defaultFileList: [
      {
        uid: '1',
        name: 'issue.png',
        status: 'done',
        url: 'https://fastly.picsum.photos/id/668/536/354.jpg?hmac=-5KjsjYvCq7naU7b-I9yZQ3u6OVE2isy32RP7ElDzNw',
      }
    ],
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false
    },
};

const commentAvatar = "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzMuanBn.jpg" 
const commentData = [
    {
        author: 'User A',
        avatar: commentAvatar,
        content: (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD HH:mm:ss')}
            >
                <span>
                    {moment()
                    .subtract(1, 'days')
                    .fromNow()}
                </span>
            </Tooltip>
        ),
    },
    {
        author: 'User B',
        avatar: commentAvatar,
        content: (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                .subtract(2, 'days')
                .format('YYYY-MM-DD HH:mm:ss')}
            >
                <span>
                    {moment()
                    .subtract(2, 'days')
                    .fromNow()}
                </span>
            </Tooltip>
        ),
    },
];

export default function TicketDetail() {
    const { state } = useLocation();
    const [selectedPriority, updatePriority] = useState('low');
    const [selectedStatus, updateStatus] = useState(state.status.st);
    const [selectedUser, updateAssignee] = useState(state.assignee?.map(e=> ({ label: e, value: e })));
    let [comments, addComments] = useState(commentData)
    const [newComment, setNewComment] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [modifiedDate, updateModifyDate] = useState("Wed, 28 Feb 2024 04:55:48 GMT")

    const confirm = (e) => {
        message.success('Ticket Escalated Successfully');
    };

    const cancel = (e) => {
        message.error('You denied to confirmation');
    };
    
    const changeUpdateAssignee = (value) => {
        updateAssignee(value)
        messageApi.open({
            type: 'success',
            content: 'Assignee Changed Successfully',
        });
        updateModifyDate(moment(new Date(), moment.defaultFormat).toDate().toUTCString())
    }

    const changeUpdateStatus = async (value) => {
        // updateStatus(value)
        await TicketService.UpdateTicketStatus({ ticketId: state?.id, status: value })
        messageApi.open({
            type: 'success',
            content: 'Status Updated Successfully',
        });
    }

    const changeUpdatePriority = (value) => {
        updatePriority(value)
        messageApi.open({
            type: 'success',
            content: 'Priority Updated Successfully',
        });
    }

    addComments = () => {
        if(newComment !== "") {
            comments.push({
                author: 'Current User',
                avatar: commentAvatar,
                content: (
                    <p>{newComment}</p>
                ),
                datetime: (
                    <Tooltip
                        title={moment()
                        .format('YYYY-MM-DD HH:mm:ss')}
                    >
                        <span>
                            {moment()
                            .fromNow()}
                        </span>
                    </Tooltip>
                ),
            })
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

    return(
        <>
            {contextHolder}
            <h1>Ticket Details</h1>
            <Form name="ticket-detail-form">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <Form.Item label="ID">
                            <b><span>{state?.id}</span></b>
                        </Form.Item>
                        <hr />
                        <Form.Item label="Title">
                            <b><span>{state?.title}</span></b>
                        </Form.Item>
                        <hr />
                        <Form.Item label="Description">
                            <span>{state?.description}</span>
                        </Form.Item>
                        <hr />
                        <Form.Item label="Created At">
                            <span>Wed, 28 Feb 2024 04:55:48 GMT</span>
                        </Form.Item>
                        <hr />
                        <Form.Item label="Modified At">
                            <span>{modifiedDate}</span>
                        </Form.Item>
                        <hr />
                    </Col>
                    <Col xs={24} sm={24} md={24} xl={12}>
                        <Form.Item label="Assignee">
                            <Select
                                defaultValue={selectedUser}
                                mode="multiple"
                                onChange={changeUpdateAssignee}
                                options={users}
                            />
                        </Form.Item>
                        <hr />
                        <Form.Item label="Status">
                            <Select
                                defaultValue={selectedStatus}
                                onChange={changeUpdateStatus}
                                options={statuses}
                            />
                        </Form.Item>
                        <hr />
                        <Form.Item label="Priority">
                            <Select
                                defaultValue={selectedPriority}
                                onChange={changeUpdatePriority}
                                options={priorities}
                            />
                        </Form.Item>
                        <hr />
                    </Col>
                </Row>
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
                <h2>Attachments</h2>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Add Attachment</Button>
                </Upload>
                <br />
                <h2>Comments</h2>
                <List
                    header={`${comments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <li>
                            <Comment {...item} />
                        </li>
                    )}
                />
                <div>
                    <h3>Add Comment</h3>
                    <Form.Item>
                        <TextArea rows={4} value={newComment} onChange={e => setNewComment(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" onClick={addComments}>
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}