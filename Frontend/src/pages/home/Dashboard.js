import React, { useEffect, useState } from "react";

import { Button, Form, Input, Modal, Row, message } from "antd";

import Tasks from "../../components/Dashboard/Teams";
import { tasks } from "../../mock/MockDataDashboard";

import "../../assets/css/main.css";
import "../../assets/css/responsive.css";
import "../../pages/home/Dashboard.css";
import axiosHelper from "../../helper/axioshelper";

function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [teams, setTeams] = useState([]);

  const [form] = Form.useForm();

  const role = localStorage.getItem("role");

  const getAllTeams = async () => {
    try {
      const response = await axiosHelper.get("/teams/get-teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  const handleDeleteColumn = async (id) => {
    try {
      await axiosHelper.put("/teams/mark-delete/" + id);
      getAllTeams();
    } catch (error) {
      console.error("Error Deleting Team", error);
    }
  };

  const handleEditTeam = async (id, newTeamName, newDescription) => {
    try {
      await axiosHelper.put("/teams/update/" + id, {
        name: newTeamName,
        description: newDescription,
      });
      getAllTeams();
    } catch (error) {
      console.error("Error Updating Team", error);
    }
  };

  const handleOk = (values) => {
    form
      .validateFields()
      .then((values) => {
        let len = teams.length;
        axiosHelper
          .post("/teams/create-team", {
            id: len + 1,
            name: values.name,
            description: values.description,
            order: len + 1,
            isDeleted: false,
          })
          .then(async () => {
            getAllTeams();
            setIsModalVisible(false);
            message.success("Team Added Successfully!");
          });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addColumn = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <div className="dashboard">
      <Row justify="end">
        {role.toLocaleLowerCase() === "admin" && (
          <Button
            type="primary"
            onClick={addColumn}
            style={{
              marginRight: "20px",
            }}
          >
            Create Team
          </Button>
        )}
      </Row>

      <Modal
        title="Add a new team"
        open={isModalVisible}
        cancelText="Cancel"
        okText="Submit"
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form
          id="formdetails"
          form={form}
          onFinish={(values) => {
            handleOk(values);
          }}
        >
          <Form.Item
            label="Team name"
            name="name"
            rules={[{ required: true, message: "Please enter team name" }]}
          >
            <Input placeholder="Enter team name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter team description" },
            ]}
          >
            <Input.TextArea rows={5} placeholder="Enter team description" />
          </Form.Item>
        </Form>
      </Modal>

      <Tasks
        tasks={tasks}
        columns={teams}
        handleDeleteColumn={handleDeleteColumn}
        handleEditTeam={handleEditTeam}
      />
    </div>
  );
}

export default Dashboard;
