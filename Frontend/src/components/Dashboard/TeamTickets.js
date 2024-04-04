import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  List,
  Menu,
  Modal,
  Row,
  Space,
  Tooltip,
  message,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axiosHelper from "../../helper/axioshelper";
import { demoMembers } from "../../mock/MockDataDashboard";
import RaiseTicketForm from "../../pages/RaiseTicketForm";

const { Option } = Select;
export const TeamTickets = (props) => {
  const [isMembersVisible, setIsMembersVisible] = useState(false);
  const [members, setMembers] = useState([]);

  const [memberForm] = Form.useForm();
  const [editMemberForm] = Form.useForm();
  const [isMemberModalVisible, setIsMemberModalVisible] = useState(false);
  const [isMemberEditModalVisible, setIsMemberEditModalVisible] =
    useState(false);
  const [ticketsData, updateTicketsData] = useState([]);

  const [options, setOptions] = useState([]);

  const {
    pid,
    id,
    name,
    description,
    handleDeleteColumn,
    handleEditTeam,
    handleSubmitRaiseTicket,
    isSortingContainer,
  } = props;
  const style = {
    boxShadow: "",
    border: "1px solid #dcdcdc",
    cursor: "auto",
    touchAction: "auto",
  };

  const fetchData = async () => {
    try {
      const response = await axiosHelper.get(
        "http://localhost:3001/users/getall"
      );

      const data = response.data.map((item) => ({
        name: item.name,
        email: item.email,
        id: item._id,
      }));
      const presentIds = members.map((member) => member.id);
      setOptions(data.filter((item) => !presentIds.includes(item.id)));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchDataSequentially = async () => {
    try {
      await getAllMembers();
      await fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataSequentially();
  }, []);

  const getAllMembers = async () => {
    try {
      const response = await axiosHelper.get(
        "http://localhost:3001/team-members/" + pid
      );
      const promises = response.data.map(async (member) => {
        const response1 = await axiosHelper.get(
          "http://localhost:3001/users/user/" + member
        );
        return {
          id: response1.data._id,
          name: response1.data.name,
          email: response1.data.email,
        };
      });

      const membersInTeam = await Promise.all(promises);

      setMembers(membersInTeam);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleOk = () => {
    setIsMembersVisible(false);
  };

  const handleCancel = () => {
    setIsMembersVisible(false);
  };

  const handleKick = (memberId) => {
    Modal.confirm({
      title: "Confirm Remove",
      content: "Are you sure you want to remove this member?",
      onOk: async () => {
        try {
          const response = await axiosHelper
            .delete(
              "http://localhost:3001/team-members/" +
                pid +
                "/members/" +
                memberId
            )
            .then((response) => {
              fetchDataSequentially();
            });
        } catch (error) {
          console.error("Error removing member:", error);
        }
        message.success("Member removed Successfully!");
      },
      onCancel: () => {
        console.log("remove cancelled");
      },
    });
  };

  const handleEdit = () => {
    editMemberForm.resetFields();
    setIsMemberEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this team?",
      onOk: async () => {
        handleDeleteColumn(pid);
        message.success("Team Deleted Successfully!");
      },
      onCancel: () => {
        console.log("Delete cancelled");
      },
    });
  };

  const handleMembers = () => {
    setIsMembersVisible(true);
  };

  const handleAddMember = () => {
    memberForm.resetFields();
    setIsMemberModalVisible(true);
  };

  const settingsMenu = (
    <Menu>
      <Menu.Item
        key="Members"
        icon={<UsergroupAddOutlined />}
        onClick={handleMembers}
      >
        Members
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={handleEdit}>
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={handleDelete}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleMemberCancel = () => {
    setIsMemberModalVisible(false);
  };

  const handleEditMemberCancel = () => {
    setIsMemberEditModalVisible(false);
  };
  const memberHandleOk = (values) => {
    memberForm
      .validateFields()
      .then((values) => {
        values.select.forEach((element) => {
          const response = axiosHelper
            .post("http://localhost:3001/team-members/" + pid + "/add-member", {
              userId: element.split("-")[2],
            })
            .then((response) => {
              console.log("in then of add member");
              fetchDataSequentially();
              console.log("after add", members);
              setIsMemberModalVisible(false);
              message.success("Member Added Successfully!");
            });
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const memberHandleEditOk = (values) => {
    editMemberForm
      .validateFields()
      .then((values) => {
        handleEditTeam(pid, values.name, values.description);
        setIsMemberEditModalVisible(false);
        message.success("Team Details Updated Successfully!");
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const getTicketsByTeamId = async () => {
    const response = await axiosHelper.get(`/tickets/get/${pid}`);
    if (response && response.data && response.data.length > 0)
      updateTicketsData(response.data);
  };

  useEffect(() => {
    getTicketsByTeamId();
  }, []);

  return (
    <div className="board-column" style={style}>
      <div
        className="board-column-header"
        style={{
          cursor: "auto",
        }}
      >
        {name}

        <div style={{ float: "right", position: "relative" }}>
          <Space>
            <Dropdown overlay={settingsMenu} trigger={["click"]}>
              <Button
                icon={<SettingOutlined />}
                type="text"
                size="small"
              ></Button>
            </Dropdown>
          </Space>
        </div>
        <br />
        <RaiseTicketForm
          teamId={pid}
          onTicketRaised={(values) => {
            getTicketsByTeamId();
          }}
        />
      </div>
      <div className="board-column-list">
        <SortableContext
          items={ticketsData}
          strategy={verticalListSortingStrategy}
        >
          {ticketsData.map((item, _index) => {
            return (
              <FieldItem
                key={_index}
                item={item}
                disabled={isSortingContainer}
              />
            );
          })}
        </SortableContext>

        <Modal
          title={
            <div
              style={{
                marginRight: "36px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Members</span>
              <Button type="primary" onClick={handleAddMember}>
                Add Members
              </Button>
            </div>
          }
          visible={isMembersVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <List
              itemLayout="horizontal"
              dataSource={members}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleKick(item.id)}
                      style={{ marginRight: "30px" }}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<UserOutlined />}
                    title={item.name}
                    description={
                      <span style={{ fontSize: "12px" }}>{item.email}</span>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </Modal>

        <Modal
          title="Add a new member"
          open={isMemberModalVisible}
          cancelText="Cancel"
          okText="Add"
          onOk={() => memberForm.submit()}
          onCancel={handleMemberCancel}
        >
          <Form
            id="membersformdetails"
            form={memberForm}
            onFinish={(values) => {
              memberHandleOk(values);
            }}
          >
            <Form.Item
              name="select"
              label="Select"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select
                placeholder="Select members"
                mode="multiple"
                onFocus={fetchDataSequentially}
              >
                {options.map((item, index) => (
                  <Option
                    key={index}
                    value={item.email + "-" + item.name + "-" + item.id}
                  >
                    <div>{item.name}</div>
                    <div style={{ fontSize: "12px" }}>{item.email}</div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Edit Team"
          open={isMemberEditModalVisible}
          cancelText="Cancel"
          okText="Modify"
          onOk={() => editMemberForm.submit()}
          onCancel={handleEditMemberCancel}
        >
          <Form
            id="editmembersformdetails"
            initialValues={{ name, description }}
            form={editMemberForm}
            onFinish={(values) => {
              memberHandleEditOk(values);
            }}
          >
            <Form.Item
              label="Team Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the team name" },
              ]}
            >
              <Input placeholder="Enter the member name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea rows={5} placeholder="Enter team description" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export const FieldItem = (props) => {
  const { item } = props;

  const history = useHistory();

  const onTicketClick = () => {
    history.push("/ticket-detail", { ...item });
  };

  return (
    <div
      className="card"
      style={{
        cursor: "auto",
        touchAction: "auto",
      }}
    >
      <div>
        <Row justify="space-between">
          <Col span={20}>
            <div onClick={onTicketClick}>
              <h6
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </h6>
              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.description}
              </span>
            </div>
            <Row
              style={{ marginTop: "4px", marginLeft: "4px" }}
              align="middle"
              justify="space-between"
            >
              <Badge
                count={item.status.name}
                showZero
                color={item.status.color}
              />
              {item.assignee && item.assignee.length > 0 ? (
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{ backgroundColor: "#1890ff" }}
                >
                  {item.assignee.map((assignee, index) => {
                    return (
                      <Tooltip key={index} title={assignee} placement="top">
                        <Avatar
                          key={index}
                          style={{
                            backgroundColor: "#1890ff",
                            verticalAlign: "middle",
                          }}
                          size="small"
                        >
                          {assignee.name[0]}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
                </Avatar.Group>
              ) : null}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
