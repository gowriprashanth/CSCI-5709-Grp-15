import React, { useState } from "react";

import { Button, Form, Input, Modal, Row, message } from "antd";

import Tasks from "../../components/Dashboard/Teams";
import { tasks } from "../../mock/MockDataDashboard";

import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";
import { teams } from "../../mock/MockDataDashboard";
import "../../pages/home/Dashboard.css";
function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [cols, setColumns] = useState(teams);

  const [form] = Form.useForm();

  const handleDeleteColumn = (id) => {
    setColumns(
      cols.map((item) => (item.id === id ? { ...item, isDeleted: true } : item))
    );
  };

  const handleEditTeam = (id, newTeamName, newDescription) => {
    setColumns(
      cols.map((item) =>
        item.id === id
          ? { ...item, name: newTeamName, description: newDescription }
          : item
      )
    );
  };

  const handleOk = (values) => {
    form
      .validateFields()
      .then((values) => {
        let len = cols.length;
        setColumns([
          ...cols,
          {
            id: len + 1,
            name: values.name,
            description: values.description,
            order: len + 1,
            isDeleted: false,
          },
        ]);
        setIsModalVisible(false);
        message.success("Team Added Successfully!");
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
        <Button type="primary" onClick={addColumn} style={{
          marginRight: "20px",
        }}>
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
        columns={cols}
        handleDeleteColumn={handleDeleteColumn}
        handleEditTeam={handleEditTeam}
      />
    </div>
  );
}

export default Dashboard;
