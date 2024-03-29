export const teams = [
  {
    id: 1,
    name: "Killam Memorial Library",
    description: "ABC",
    order: 1,
    isDeleted: false,
  },
  {
    id: 2,
    name: "W.K. Kellogg Health Sciences",
    description: "DEF",
    order: 2,
    isDeleted: false,
  },
  {
    id: 3,
    name: "Sir James Dunn Law Library",
    description: "GHI",
    order: 3,
    isDeleted: false,
  },
  {
    id: 4,
    name: "Wallace McCain Library",
    description: "JKL",
    order: 4,
    isDeleted: false,
  },
  {
    id: 5,
    name: "Sexton Design & Technology",
    description: "MNO",
    order: 5,
    isDeleted: false,
  },
  {
    id: 6,
    name: "MacRae Library",
    description: "PQR",
    order: 6,
    isDeleted: false,
  },
];


export const tasks = [
  { "id": 1, "col_id": 1, "title": "Network Troubleshooting", "description": "Investigate and resolve network connectivity issues" },
  { "id": 2, "col_id": 2, "title": "Software Bug Fix", "description": "Identify and fix critical software bugs to improve system stability" },
  { "id": 3, "col_id": 3, "title": "Database Optimization", "description": "Optimize database performance to enhance application responsiveness" },
  { "id": 4, "col_id": 4, "title": "Security Audit", "description": "Conduct a comprehensive security audit to identify and mitigate vulnerabilities" },
  { "id": 5, "col_id": 5, "title": "IT Infrastructure Review", "description": "Review and update IT infrastructure to support organizational growth" },
  { "id": 6, "col_id": 1, "title": "Hardware Replacement", "description": "Replace outdated hardware to ensure optimal performance and reliability" },
  { "id": 7, "col_id": 2, "title": "Cloud Migration", "description": "Plan and execute a cloud migration to improve scalability and cost-efficiency" },
  { "id": 8, "col_id": 3, "title": "Cybersecurity Measures", "description": "Implement advanced cybersecurity measures to protect against data breaches" },
  { "id": 9, "col_id": 4, "title": "Data Recovery", "description": "Recover lost data and restore system functionality after a disaster" },
  { "id": 10, "col_id": 5, "title": "IT Project Management", "description": "Manage IT projects to ensure timely delivery and quality standards" },
  { "id": 11, "col_id": 1, "title": "Technical Documentation", "description": "Create comprehensive technical documentation to support product usage and maintenance" },
  { "id": 12, "col_id": 2, "title": "IT Support Ticket Management", "description": "Manage IT support tickets to ensure efficient problem resolution" },
  { "id": 13, "col_id": 3, "title": "IT Service Level Agreement (SLA) Review", "description": "Review and update IT SLAs to align with business needs and customer expectations" },
  { "id": 14, "col_id": 4, "title": "IT Budgeting", "description": "Prepare IT budgets to allocate resources effectively and meet strategic goals" },
  { "id": 15, "col_id": 5, "title": "Technology Upgrade", "description": "Upgrade technology to leverage new features and enhance user experience" },
  { "id": 16, "col_id": 1, "title": "IT Strategy Planning", "description": "Develop and implement IT strategies to support business objectives and innovation" },
  { "id": 17, "col_id": 2, "title": "IT Disaster Recovery", "description": "Implement disaster recovery plans to ensure business continuity" },
  { "id": 18, "col_id": 3, "title": "IT Compliance Check", "description": "Conduct compliance checks to ensure adherence to legal and regulatory requirements" },
  { "id": 19, "col_id": 4, "title": "IT Cost Management", "description": "Manage IT costs to ensure efficiency and financial sustainability" },
  { "id": 20, "col_id": 5, "title": "IT Risk Assessment", "description": "Assess IT risks to identify potential threats and vulnerabilities" },
  { "id": 21, "col_id": 1, "title": "Technology Adoption", "description": "Promote and facilitate the adoption of new technologies within the organization" },
  { "id": 22, "col_id": 2, "title": "IT Performance Monitoring", "description": "Monitor IT performance to identify bottlenecks and ensure optimal operation" },
  { "id": 23, "col_id": 3, "title": "IT Innovation", "description": "Innovate IT solutions to address emerging business challenges and opportunities" },
  { "id": 24, "col_id": 4, "title": "IT Service Delivery", "description": "Ensure timely and efficient delivery of IT services to meet customer needs" },
  { "id": 25, "col_id": 5, "title": "IT Project Risk Management", "description": "Manage risks associated with IT projects to ensure successful outcomes" },
  { "id": 26, "col_id": 1, "title": "IT Asset Management", "description": "Manage IT assets to ensure their optimal use and lifecycle management" },
  { "id": 27, "col_id": 2, "title": "IT Change Management", "description": "Manage changes to IT systems to minimize disruption and ensure smooth transitions" },
  { "id": 28, "col_id": 3, "title": "IT Quality Assurance", "description": "Ensure IT solutions meet quality standards and business requirements" },
  { "id": 29, "col_id": 4, "title": "IT Capacity Planning", "description": "Plan IT capacity to support current and future business needs" },
  { "id": 30, "col_id": 5, "title": "IT Governance", "description": "Establish IT governance frameworks to ensure alignment with business objectives and regulatory compliance" }
].map((task) => {
  return {
    ...task,
    status: [{ st: "Not Started", color: "red" }, { st: "In Progress", color: "orange" }, { st: "On Hold", color: "blue" }, { st: "Resolved", color: "green" }][Math.floor(Math.random() * 4)],
    assignee: ["Kuldeep", "Dhruvik", "Darshit", "Bhautik", "Nisarg", "Gawri", "Rushi", "Shruti", "Nikita", "Priyanka"].slice(0, Math.floor(Math.random() * 9 + 1)),
  };
});

export const demoMembers = [
  { id: 1, name: "Kuldeep" },
  { id: 2, name: "Dhruvik" },
  { id: 3, name: "Darshit" },
  { id: 4, name: "Bhautik" },
  { id: 5, name: "Nisarg" },
  { id: 6, name: "Gawri" },
  { id: 7, name: "Rushi" },
  { id: 8, name: "Shruti" },
  { id: 9, name: "Nikita" },
  { id: 10, name: "Priyanka" },
];
