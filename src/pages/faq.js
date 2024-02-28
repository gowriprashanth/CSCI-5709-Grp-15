import { Button, Card, Col, Collapse, Input, Row, message } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";

const { Panel } = Collapse;

let knbase1 = [
  {
    title: "How to create a new project?",
    content: "This is the content related to creating a new project.",
  },
  {
    title: "How to add a new team member?",
    content: "This is the content related to adding a new team member.",
  },
  {
    title: "How to add a new task?",
    content: "This is the content related to adding a new task.",
  },
  {
    title: "How to delete a project?",
    content: "This is the content related to deleting a project.",
  },
  {
    title: "How to assign a task to a team member?",
    content:
      "This is the content related to assigning a task to a team member.",
  },
  {
    title: "How to mark a task as completed?",
    content: "This is the content related to marking a task as completed.",
  },
];

let knbase2 = [
  {
    title: "How to create a new project?",
    content: "This is the content related to creating a new project.",
  },
  {
    title: "How to add a new team member?",
    content: "This is the content related to adding a new team member.",
  },
  {
    title: "How to add a new task?",
    content: "This is the content related to adding a new task.",
  },
  {
    title: "How to delete a project?",
    content: "This is the content related to deleting a project.",
  },
  {
    title: "How to assign a task to a team member?",
    content:
      "This is the content related to assigning a task to a team member.",
  },
  {
    title: "How to mark a task as completed?",
    content: "This is the content related to marking a task as completed.",
  },
];

let knbase3 = [
  {
    title: "How to create a new project?",
    content: "This is the content related to creating a new project.",
  },
  {
    title: "How to add a new team member?",
    content: "This is the content related to adding a new team member.",
  },
  {
    title: "How to add a new task?",
    content: "This is the content related to adding a new task.",
  },
  {
    title: "How to delete a project?",
    content: "This is the content related to deleting a project.",
  },
  {
    title: "How to assign a task to a team member?",
    content:
      "This is the content related to assigning a task to a team member.",
  },
  {
    title: "How to mark a task as completed?",
    content: "This is the content related to marking a task as completed.",
  },
];

function FAQ() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  let [title1, setTitle1] = useState("");
  let [description1, setDescription1] = useState("");
  let [title2, setTitle2] = useState("");
  let [description2, setDescription2] = useState("");
  let [title3, setTitle3] = useState("");
  let [description3, setDescription3] = useState("");
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          textAlign: "center",
          backgroundImage: "url(" + BgProfile + ")",
          display: "flex",
          alignItems: "center", // Add this line
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

      {/* <Row align="center">
        <Search
          className="card-profile-head"
          placeholder="Search Knowledge Base"
          style={{
            borderRadius: 10,
            justifyContent: "center",
            width: "50%",
            alignSelf: "center",
          }}
          enterButton
        />
      </Row> */}
      <br />

      <Row align="center">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card
              bordered={false}
              extra={
                <Button
                  onClick={() => {
                    setVisible1(true);
                    setDescription1(null);
                    setTitle1(null);
                  }}
                >
                  Add
                </Button>
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
                  Creating Teams
                </h1>
              }
              style={{
                borderColor: "#ADADAD",
                borderRadius: 10,
                width: "100%",
              }}
            >
              {visible1 && (
                <>
                  <div style={{ textAlign: "end" }}>
                    <Input
                      placeholder="Title"
                      maxLength={20}
                      //   onChange={onChange}
                      onInput={(e) => {
                        setTitle1(e.target.value);
                        console.log(e.target.value);
                      }}
                      value={title1}
                    />
                    <br />
                    <br />
                    <TextArea
                      placeholder="Description"
                      showCount
                      maxLength={100}
                      //   onChange={onChange}
                      onInput={(e) => setDescription1(e.target.value)}
                      value={description1}
                    />
                    <br />
                    <div style={{ display: "flex", textAlign: "end" }}>
                      <Button
                        onClick={() => {
                          setVisible1(false);
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
                          if (title1 && description1) {
                            setVisible1(false);
                            console.log(title1, description1);
                            knbase1.push({
                              title: title1,
                              content: description1,
                            });
                            message.success("Saved Successfully");
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

              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                {knbase1.map((item, index) => {
                  return (
                    <Panel header={item.title} key={index}>
                      <p>{item.content}</p>
                    </Panel>
                  );
                })}
              </Collapse>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              extra={
                <Button
                  onClick={() => {
                    setVisible2(true);
                    setDescription2(null);
                    setTitle2(null);
                  }}
                >
                  Add
                </Button>
              }
              bordered={false}
              title={
                <h1
                  style={{
                    fontSize: "28px",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "0",
                  }}
                >
                  Creating Tickets
                </h1>
              }
              style={{
                borderColor: "#ADADAD",
                borderRadius: 10,
                width: "100%",
              }}
            >
              {visible2 && (
                <>
                  <div style={{ textAlign: "end" }}>
                    <Input
                      placeholder="Title"
                      maxLength={20}
                      //   onChange={onChange}
                      onInput={(e) => setTitle2(e.target.value)}
                      value={title2}
                    />
                    <br />
                    <br />
                    <TextArea
                      placeholder="Description"
                      showCount
                      maxLength={100}
                      //   onChange={onChange}
                      onInput={(e) => setDescription2(e.target.value)}
                      value={description2}
                    />
                    <br />
                    <div style={{ display: "flex", textAlign: "end" }}>
                      <Button
                        onClick={() => {
                          setVisible2(false);
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
                          if (title2 && description2) {
                            setVisible2(false);
                            knbase2.push({
                              title: title2,
                              content: description2,
                            });
                            message.success("Saved Successfully");
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
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                {knbase2.map((item, index) => {
                  return (
                    <Panel header={item.title} key={index}>
                      <p>{item.content}</p>
                    </Panel>
                  );
                })}
              </Collapse>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              extra={
                <Button
                  onClick={() => {
                    setVisible3(true);
                    setDescription3(null);
                    setTitle3(null);
                  }}
                >
                  Add
                </Button>
              }
              bordered={false}
              title={
                <h1
                  style={{
                    fontSize: "28px",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "0",
                  }}
                >
                  New Projects
                </h1>
              }
              style={{
                borderColor: "#ADADAD",
                borderRadius: 10,
                width: "100%",
              }}
            >
              {visible3 && (
                <>
                  <div style={{ textAlign: "end" }}>
                    <Input
                      placeholder="Title"
                      maxLength={20}
                      //   onChange={onChange}
                      onInput={(e) => setTitle3(e.target.value)}
                      value={title3}
                    />
                    <br />
                    <br />
                    <TextArea
                      placeholder="Description"
                      showCount
                      maxLength={100}
                      //   onChange={onChange}
                      onInput={(e) => setDescription3(e.target.value)}
                      value={description3}
                    />
                    <br />
                    <div style={{ display: "flex", textAlign: "end" }}>
                      <Button
                        onClick={() => {
                          setVisible3(false);
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
                          if (title3 && description3) {
                            setVisible3(false);
                            knbase3.push({
                              title: title3,
                              content: description3,
                            });
                            message.success("Saved Successfully");
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
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                {knbase3.map((item, index) => {
                  return (
                    <Panel header={item.title} key={index}>
                      <p>{item.content}</p>
                    </Panel>
                  );
                })}
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default FAQ;
