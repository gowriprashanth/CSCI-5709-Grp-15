import React, { useEffect, useState } from "react";

import { Button, Form, Input, Modal, Row, message } from "antd";

import Tasks from "../../components/Dashboard/Teams";
import { tasks } from "../../mock/MockDataDashboard";

import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";
import "../../pages/home/Dashboard.css";
// import axios from "axios";
import axiosHelper from "../../helper/axioshelper";

function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [teams, setTeams] = useState([]);

  const [form] = Form.useForm();

  const changeId = () => {
    setTeams(
      teams.map((item) => {
        return { ...item, id: item._id };
      })
    );
    console.log(teams);
  };

  const getAllTeams = async () => {
    try {
      const response = await axiosHelper.get(
        "http://localhost:3001/teams/get-teams"
      );
      console.log("hihi", response.data);
      setTeams(response.data);
      console.log("afterhihi", teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
    //changeId();
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  const handleDeleteColumn = async (id) => {
    try {
      const response = await axiosHelper.put(
        "http://localhost:3001/teams/mark-delete/" + id
      );
      getAllTeams();
    } catch (error) {
      console.error("Error Deleting Team", error);
    }
  };

  const handleEditTeam = async (id, newTeamName, newDescription) => {
    try {
      const response = await axiosHelper.put(
        "http://localhost:3001/teams/update/" + id,
        { name: newTeamName, description: newDescription }
      );
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
          .post("http://localhost:3001/teams/create-team", {
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
        <Button
          type="primary"
          onClick={addColumn}
          style={{
            marginRight: "20px",
          }}
        >
          Create Team
        </Button>
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
