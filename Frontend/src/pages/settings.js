/**
 * Represents the settings page component.
 *
 * @returns {JSX.Element} The settings page component.
 */
import { Row, Col, Card, Avatar as AntAvatar, message } from "antd";
import { Button, Form, Input } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import axiosHelper from "../helper/axioshelper";

function Settings() {
  // Retrieve the token from local storage
  let token = localStorage.getItem("token");

  // Define state variables
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");
  let [currentpassword, setCurrentPassword] = useState("");
  let [newpassword, setNewPassword] = useState("");

  // Generate configuration for Avatar component using the token
  const config = genConfig(token);

  // Handle form submission
  const onFinish = () => {
    console.log("Current Password:", currentpassword);
    console.log("New Password:", newpassword);

    // Update password using an asynchronous function
    const UpdatePassword = async () => {
      try {
        const response = await axiosHelper.post(
          "/user/update-password",
          {
            password: currentpassword,
            newPassword: newpassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        // Display success message if password is updated successfully
        if (response.status === 200) {
          message.success({
            content: "Password Updated Successfully!",
            style: {
              marginTop: "10vh",
            },
          });
        } else {
          // Display error message if password update fails
          message.error({
            content: "Password Update Failed!",
            style: {
              marginTop: "10vh",
            },
          });
        }
      } catch (error) {
        // Handle error if password is invalid
        if (error.response.status === 401) {
          message.error({
            content: "Invalid Password",
            style: {
              marginTop: "10vh",
            },
          });
          console.error("Error checking password:", error.message);
        }
      }
    };
    UpdatePassword();
  };

  // Fetch user information using an asynchronous function
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosHelper.get("user/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        // Update state variables with user information
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);

        // Assuming response.data contains user information
        return response.data;
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        throw error;
      }
    };
    fetchUserInfo();
    console.log(name, email, role);
  });

  return (
    <>
      {/* Background image for the profile */}
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      {/* Card displaying the user's profile information */}
      <Card
        className="card-profile-head"
        bordered={false}
        bodyStyle={{ display: "none" }}
        style={{
          borderRadius: 10,
          boxShadow: "0 0 10px 0 rgba(183, 183, 183, 0.9)",
        }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <AntAvatar.Group>
                {/* User avatar */}
                <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{name}</h4>
                  <p>{role}</p>
                </div>
              </AntAvatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row align="center">
        <Col span={1} md={12} className="mb-24">
          {/* Card for editing the user's profile */}
          <Card
            bordered={false}
            title={<h1 style={{ marginBottom: "0" }}>Edit Profile</h1>}
            style={{ borderColor: "#ADADAD", borderRadius: 10, width: "100%" }}
          >
            <Form layout="vertical" onFinish={onFinish}>
              {/* Display the user's full name */}
              {name && (
                <Form.Item label="Full Name" name="fullname">
                  <Input defaultValue={name} disabled />
                </Form.Item>
              )}

              {/* Display the user's email address */}
              {email && (
                <Form.Item label="Email Address" name="email">
                  <Input defaultValue={email} disabled />
                </Form.Item>
              )}

              {/* Input field for the current password */}
              <Form.Item
                label="Current Password"
                name="currentpassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your Current Password"
                  style={{ borderRadius: 7 }}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </Form.Item>

              {/* Input field for the new password */}
              <Form.Item
                label="New Password"
                name="newpassword"
                rules={[
                  {
                    message: "Please input your new password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long!",
                  },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message:
                      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your New Password"
                  style={{ borderRadius: 7 }}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </Form.Item>

              {/* Button to save the changes */}
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Settings;
