/**
 * @author Dhruvik
 */
import { Button, Card, Col, Collapse, Input, Row, Space, message } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import React, { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import axiosHelper from "../helper/axioshelper";

const { Panel } = Collapse;

/**
 * Renders the FAQ page.
 * @returns {JSX.Element} The FAQ page component.
 */
function FAQ() {
  // State variables
  let [kbaseTitle, setKbaseTitle] = useState("");
  let token = localStorage.getItem("token");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [knowledgeBase, setKnowledgeBase] = useState([]);
  const [role, setRole] = useState("");

  // Event handler for onChange event
  const onChange = (key) => {
    console.log(key);
  };

  // Fetch user information from the server
  const fetchUserInfo = async () => {
    try {
      const response = await axiosHelper.get("user/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setRole(response.data.role);

      // Assuming response.data contains user information
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error.message);
      throw error;
    }
  };

  // Fetch all knowledge base items from the server
  const getALlKnowledgeBase = () => {
    axiosHelper
      .get("/knowledgebase/get-allkbase")
      .then((response) => {
        console.log("Get all base >>>>>>>>>" + response.data);
        let data = response.data;
        data.map((item) => {
          item = { ...item, visible: false };
          return null;
        });
        setKnowledgeBase(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch user information and knowledge base items on component mount
  useEffect(() => {
    getALlKnowledgeBase();
    fetchUserInfo();
  });

  // Add FAQ to a knowledge base by title
  const addFaqToKbaseByTitle = (title, faq) => {
    axiosHelper
      .post("/knowledgebase/add-faq", { title, faq })
      .then((response) => {
        // Handle the response data
        if (response.status === 201) {
          getALlKnowledgeBase();
          message.success("FAQ Added Successfully");
          console.log(response.data);
        }
      })
      .catch((error) => {
        message.error("Error Adding FAQ");
        console.error(error);
        // Handle the error
      });
  };

  // Delete a knowledge base by title
  const deleteKbaseByTitle = (title) => {
    axiosHelper
      .post("/knowledgebase/delete-kbase", { title })
      .then((response) => {
        // Handle the response data
        if (response.status === 200) {
          getALlKnowledgeBase();
          message.success("Knowledge Base Deleted Successfully");
          console.log(response.data);
        }
      })
      .catch((error) => {
        message.error("Error Deleting Knowledge Base");
        console.error(error);
        // Handle the error
      });
  };

  // Create a new knowledge base
  const createKbase = (title) => {
    axiosHelper
      .post("/knowledgebase/create-kbase", { title })
      .then((response) => {
        // Handle the response data
        if (response.status === 201) {
          getALlKnowledgeBase();
          message.success("Knowledge Base Created Successfully");
          console.log(response.data);
        }
      })
      .catch((error) => {
        message.error("Error Creating Knowledge Base");
        console.error(error);
        // Handle the error
      });
  };

  // Toggle visibility of a knowledge base item
  const toggleVisible = (index) => {
    knowledgeBase[index].visible = !knowledgeBase[index].visible;
    setKnowledgeBase([...knowledgeBase]);
  };

  return (
    <>
      {/* Header */}
      <div
        className="profile-nav-bg"
        style={{
          textAlign: "center",
          backgroundImage: "url(" + BgProfile + ")",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            width: "100%",
            color: "black",
            fontSize: "42px",
          }}
          className="font-semibold "
        >
          Knowldege Base
        </h1>
      </div>
      <br />

      {/* Create New Knowledge Base (visible to Admin only) */}
      {role === "Admin" && (
        <Card
          title="Create New Knowledge Base"
          marginBottom="16px"
          style={{ width: "100%" }}
        >
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Name of Knowledge Base"
              onChange={(e) => {
                setKbaseTitle(e.target.value);
                console.log(e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                const title = kbaseTitle;
                console.log(title);
                if (knowledgeBase.find((item) => item.title === title)) {
                  message.error("Knowledge Base with this name already exists");
                } else if (title) {
                  createKbase(title);
                } else {
                  message.error("Please fill the field");
                }
              }}
            >
              Create Knowldegebase
            </Button>
          </Space.Compact>
        </Card>
      )}
      <br />

      {/* Display Knowledge Base items */}
      <Row align="center">
        <Row gutter={[16, 16]}>
          {knowledgeBase.map((item, index) => {
            return (
              <Col key={index} style={{ width: "100%" }}>
                <Card
                  bordered={false}
                  extra={
                    role === "Admin" && (
                      <Row>
                        <Button
                          type="primary"
                          ghost
                          onClick={() => {
                            toggleVisible(index);
                            setDescription(null);
                            setTitle(null);
                          }}
                        >
                          Add FAQ
                        </Button>
                        <Button
                          type="dashed"
                          style={{ marginLeft: "10px" }}
                          danger
                          onClick={() => {
                            deleteKbaseByTitle(item.title);
                          }}
                        >
                          Delete this Knowledge Base
                        </Button>
                      </Row>
                    )
                  }
                  title={
                    <h1
                      style={{
                        fontSize: "28px",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginBottom: "0",
                      }}
                    >
                      {item.title}
                    </h1>
                  }
                  style={{
                    borderColor: "#ADADAD",
                    borderRadius: 10,
                    width: "100%",
                  }}
                >
                  {/* Card content */}
                  {item.visible && (
                    <>
                      <div style={{ textAlign: "end" }}>
                        <Input
                          placeholder="Title"
                          maxLength={20}
                          onInput={(e) => {
                            setTitle(e.target.value);
                            console.log(e.target.value);
                          }}
                          value={title}
                        />
                        <br />
                        <br />
                        <TextArea
                          placeholder="Description"
                          showCount
                          maxLength={100}
                          onInput={(e) => setDescription(e.target.value)}
                          value={description}
                        />
                        <br />
                        <div style={{ display: "flex", textAlign: "end" }}>
                          <Button
                            onClick={() => {
                              toggleVisible(index);
                            }}
                            danger
                            style={{
                              flex: 1,
                              marginTop: "10px",
                            }}
                          >
                            Discard
                          </Button>
                          <Button
                            onClick={() => {
                              if (title && description) {
                                toggleVisible(index);
                                console.log(title, description);
                                addFaqToKbaseByTitle(item.title, {
                                  question: title,
                                  answer: description,
                                });
                              } else {
                                message.error("Please fill all the fields");
                              }
                            }}
                            type="primary"
                            style={{
                              flex: 1,
                              marginLeft: "10px",
                              marginTop: "10px",
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                      <br />
                    </>
                  )}
                  {item.faq.length > 0 ? (
                    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                      {item.faq.map((item, index) => {
                        return (
                          <Panel header={item.question} key={index}>
                            <p>{item.answer}</p>
                          </Panel>
                        );
                      })}
                    </Collapse>
                  ) : (
                    <p>
                      No FAQs available for this Knowledge Base. Please ask your
                      Admin to update Knowldegebase
                    </p>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Row>
    </>
  );
}

export default FAQ;
