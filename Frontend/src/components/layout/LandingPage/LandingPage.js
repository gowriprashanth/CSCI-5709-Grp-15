/**
 * @author Darshit Dhameliya
 */
import React from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Statistic,
  Card,
  Form,
  Input,
  message,
  Select,
  Collapse
} from "antd";
import "./LandingPage.css"
import { TypeAnimation } from 'react-type-animation';
import bannerImage from "../../../assets/images/banner.png"
import contactImage from "../../../assets/images/contactus-imagebg.png"
import aboutImage from "../../../assets/images/about-bg.gif"
import faqImage from "../../../assets/images/faqs.gif"
import { ArrowRightOutlined, SolutionOutlined } from "@ant-design/icons";
import Header from "../HeaderAuthentication";

const { Footer } = Layout;
const { Panel } = Collapse;

/**
 * Landing Page comnponent
 */
export default function LandingPage() {

    const [form] = Form.useForm();
    const onFinish = (values) => {
        message.success('This is a success message');
    };

    return (
        <>
            <Layout className="layout-default layout-signin">
                <Header />
                <div className="issuestack-carousel-section">
                    <Row className="carousel-content-wrapper">
                    <Col md={24} xl={12}>
                        <div className="carousel-title-wrapper">
                            <p className="supportive-text"><span>Empowering Efficiency,</span></p>
                            <span className="supportive-text">Resolving with Precision:</span>
                            <p>Your support needs are our top priority, ensuring swift and accurate resolutions to empower your journey.</p>
                            <h1 className="title-text">
                                <TypeAnimation
                                    sequence={[
                                        'Your Support, Our Commitment.',
                                        1500,
                                        'Your Concerns, Our Priority.',
                                        1500,
                                    ]}
                                    wrapper="span"
                                    speed={20}
                                    repeat={Infinity}
                                />
                            </h1>
                        </div>
                        <div className="carousel-button-wrapper">
                            <Button type="primary" href="/sign-in" icon={<ArrowRightOutlined />}>
                                Try Our Product
                            </Button>
                        </div>
                    </Col>
                    <Col md={24} xl={12}>
                        <img src={bannerImage} className="carousel-image" alt="issuestack-carousel-section" />
                    </Col>
                    </Row>
                </div>
                <section id="features" className="issuestack-section features-section">
                    <div className="section-title">
                        <h1>Features we offer</h1>
                    </div>
                    <div className="feature-content-wrapper">
                        <Row gutter={[24, 0]}>
                            <Col md={24} xl={24}>
                                <Row gutter={[24, 0]}>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>                                                        
                                                        <h6>Enhance Employee Experience</h6>
                                                        <p>Facilitate convenient access for employees to obtain what they require.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try it!</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Knowledge Management</h6>
                                                        <p>Enhance operational effectiveness by facilitating seamless knowledge sharing and collaboration within the business.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Service Catalog</h6>
                                                        <p>Enhance self-service capabilities by providing products and services through a contemporary and user-friendly storefront.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Service Portal</h6>
                                                        <p>A user-friendly self-service experience utilizing a responsive portal interface.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Service Portal</h6>
                                                        <p>A user-friendly self-service experience utilizing a responsive portal interface.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Service Portal</h6>
                                                        <p>A user-friendly self-service experience utilizing a responsive portal interface.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Service Portal</h6>
                                                        <p>A user-friendly self-service experience utilizing a responsive portal interface.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={6} xl={6} className="mb-24">
                                        <Card bordered={false} className="widget h-full">
                                            <Statistic
                                                title={
                                                    <>
                                                        <div className="icon"><SolutionOutlined style={{color: "white", fontSize: "32px"}}/></div>
                                                        <h6>Service Portal</h6>
                                                        <p>A user-friendly self-service experience utilizing a responsive portal interface.</p>
                                                    </>
                                                }
                                                prefix={<Button type="primary">Try Our Product</Button>}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section id="about" className="issuestack-section about-section">
                    <div className="section-title">
                        <h1>About Us</h1>
                    </div>
                    <div className="about-content-wrapper">
                        <Row>
                            <Col md={24} xl={24}>
                                <Row justify="space-around">
                                    <Col
                                        xs={{ span: 24}}
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        className="about-description-wrapper"
                                    >
                                        <>
                                            <h1>Our Vision</h1>
                                            <p>At IssueStack, we envision a future where seamless and efficient issue resolution transforms the customer experience. Our vision is to be at the forefront of innovating service ticket management, providing cutting-edge solutions that empower businesses to deliver unparalleled support and satisfaction.</p>
                                            <h1>Our Mission</h1>
                                            <p>Our mission is to revolutionize service ticket management by offering a robust and user-friendly platform that streamlines processes, enhances communication, and accelerates issue resolution. We are dedicated to empowering organizations of all sizes with the tools they need to optimize customer support, boost operational efficiency, and foster long-lasting relationships. Through continuous innovation and a commitment to excellence, we strive to be the trusted partner in transforming how businesses handle service tickets, setting new standards for customer service excellence</p>
                                            <p className="about-tagline"><b>One platform, one architecture, one data model. That embodies the influential prowess of our platform.</b></p>
                                        </>
                                    </Col>
                                    <Col
                                        className="about-image-wrapper"
                                        xs={{ span: 24 }}
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                    >
                                        <img src={aboutImage} alt="About Banner" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section id="contact" className="issuestack-section contact-section">
                    <div className="section-title">
                        <h1>Contact us</h1>
                    </div>
                    <div className="contact-content-wrapper">
                        <Row>
                            <Col md={24} xl={24}>
                                <Row justify="space-around">
                                    <Col
                                        className="contact-image-wrapper"
                                        xs={{ span: 24 }}
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                    >
                                        <img src={contactImage} alt="Contact Banner" />
                                    </Col>
                                    <Col
                                        xs={{ span: 24}}
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        className="contact-form-wrapper"
                                    >
                                        <Form
                                            form={form}
                                            onFinish={onFinish}
                                            layout="vertical"
                                            initialValues={{
                                                requiredMarkValue: "required",
                                            }}
                                            requiredMark="required"
                                        >
                                            <Form.Item name="name" label="Name" required tooltip="Your name"
                                                rules={[
                                                    () => ({
                                                        validator(_, value) {
                                                            const letterRegEx = /^[a-zA-Z]+$/;
                                                            if (!value) {
                                                                return Promise.reject(new Error('Please enter your name'));
                                                            }
                                                            else if (!letterRegEx.test(value)) {
                                                                return Promise.reject(new Error('Name should only contain letter'));
                                                            }
                                                            else {
                                                                return Promise.resolve();
                                                            }
                                                        },
                                                    })
                                                ]}>
                                                <Input placeholder="Enter your name" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Email"
                                                tooltip='Your email'
                                                name="email"
                                                required
                                                rules={[
                                                    () => ({
                                                        validator(_, value) {
                                                            const emailRegExp = /^[a-zA-Z0-9][a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
                                                            if (!value) {
                                                                return Promise.reject(new Error('Please enter email address'));
                                                            }
                                                            else if (!emailRegExp.test(value)) {
                                                                return Promise.reject(new Error('Please enter valid email address'));
                                                            }
                                                            else {
                                                                return Promise.resolve();
                                                            }
                                                        },
                                                    })
                                                ]}
                                            >
                                                <Input placeholder="Enter your email" />
                                            </Form.Item>
                                            <Form.Item label="Phone" required tooltip="Your phone" name="phone"
                                                rules={[
                                                    () => ({
                                                        validator(_, value) {
                                                            const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                                                            if (!value) {
                                                                return Promise.reject(new Error('Please enter phone number'));
                                                            }
                                                            else if (!phoneRegExp.test(value)) {
                                                                return Promise.reject(new Error('Please enter valid phone number'));
                                                            }
                                                            else {
                                                                return Promise.resolve();
                                                            }
                                                        },
                                                    })
                                                ]}>
                                                <Input placeholder="Enter your phone" />
                                            </Form.Item>
                                            <Form.Item label="Reason" required tooltip="Select the reason for contact" name="reason"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please select the reason"
                                                    }
                                                ]}>
                                                <Select
                                                    options={[
                                                        {
                                                            value: 'Product Detail',
                                                            label: 'Product Detail',
                                                        }, {
                                                            value: 'Sales Query',
                                                            label: 'Sales Query',
                                                        }, {
                                                            value: 'Marketing',
                                                            label: 'Marketing',
                                                        }
                                                    ]}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="description"
                                                label="Describe the reason"
                                                required
                                                tooltip="Description"
                                                rules={[{
                                                    required: true,
                                                    message: 'Please enter description',
                                                }]}
                                            >
                                                <Input.TextArea showCount maxLength={100} />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">Submit</Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section id="faqs" className="issuestack-section faq-section">
                    <div className="section-title">
                        <h1>FAQ</h1>
                    </div>
                    <div className="faq-content-wrapper">
                        <Row>
                            <Col md={24} xl={24}>
                                <Row justify="space-around">
                                    <Col
                                        xs={{ span: 24}}
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        className="faq-description-wrapper"
                                    >
                                        <>
                                        <Collapse defaultActiveKey={['1','2','3']}>
                                            <Panel header="How does the support ticket creation process work?" key="1">
                                                <p>The support ticket creation process is simple. Users can log in to their accounts, navigate to the support section, and submit a detailed description of their issue. The system will then generate a unique ticket number for easy tracking.</p>
                                            </Panel>
                                            <Panel header="Can I track the status of my support ticket in real-time?" key="2">
                                                <p>Yes, IssueStack provides real-time status updates. Once a ticket is submitted, users can log in to their accounts to check the current status, including whether it's under review, in progress, or resolved.</p>
                                            </Panel>
                                            <Panel header="How does the system prioritize support tickets?" key="3">
                                                <p>Our system employs a priority-based approach, considering factors such as the nature of the issue, its impact on operations, and the urgency of resolution. Critical issues affecting multiple users or causing significant disruption are prioritized for faster resolution.</p>
                                            </Panel>
                                            <Panel header="Is there a knowledge base or self-help resources available?" key="4">
                                                <p>Yes, we offer a comprehensive knowledge base and self-help resources within the system. Users can access articles, guides, and FAQs to find solutions to common issues or learn more about utilizing various features of the IssueStack.</p>
                                            </Panel>
                                            <Panel header="What information should I include when submitting a support ticket?" key="5">
                                                <p>To expedite the resolution process, it's helpful to provide a detailed description of the issue, relevant screenshots or attachments, and any other information that might assist our support team in understanding and addressing your concern.</p>
                                            </Panel>
                                        </Collapse>
                                        </>
                                    </Col>
                                    <Col
                                        className="faq-image-wrapper"
                                        xs={{ span: 24 }}
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                    >
                                        <img src={faqImage} alt="FAQ Banner" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </section>
                <Footer>
                    <Menu mode="horizontal">
                        <Menu.Item>Developed by Group 15</Menu.Item>
                    </Menu>
                </Footer>
            </Layout>
        </>
    )
}