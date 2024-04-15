# IssueStack

Internal Support Ticket Management System

- _Date Created_: 27 Jan 2024
- _Last Modification Date_: 10 April 2024
- _Git URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15>
- _Gowri Prashanth Kanagaraj - Branch URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15/-/tree/develop/gowri-kanagaraj>
- _Nisarg Sharadkumar Vaghela - Branch URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15/-/tree/develop/nisarg-vaghela>
- _Bhautik Rameshbhai Koshiya - Branch URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15/-/tree/develop/bhautik-koshiya>
- _Darshit Mukeshbhai Dhameliya - Branch URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15/-/tree/develop/darshit-dhameliya>
- _Kuldeep Rajeshbhai Gajera - Branch URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15/-/tree/develop/kuldeep-gajera>
- _Dhruvik Maheshbhai Kakadiya - Branch URL_: <https://git.cs.dal.ca/kanagaraj/csci-5708-grp-15/-/tree/develop/dhruvik-kakadiya>

## Authors

* [Gowri Prashanth Kanagaraj](gowri,kanagaraj@dal.ca) - *(Owner)*
* [Nisarg Sharadkumar Vaghela ](nvaghela@dal.ca  ) - *(Owner)*
* [Bhautik Rameshbhai Koshiya ](bh889463@dal.ca ) - *(Owner)*
* [Darshit Mukeshbhai Dhameliya](dr773233@dal.ca ) - *(Owner)*
* [Kuldeep Rajeshbhai Gajera ](kl210309@dal.ca ) - *(Owner)*
* [Dhruvik Maheshbhai Kakadiya](dhruvik.kakadiya@dal.ca) - _(Owner)_

### Application Details
IssueStack is a web application designed to modernize the way of handling internal support requests in any organization. It provides a central place for employees to send requests for help, whether it's with IT problems, HR matters, administrative questions, payroll issues or any other. IssueStack makes it easier for employees to communicate their needs and let support staff solving problems quickly, which ultimately boosts morale and productivity.

## Deployment

* *Deployment URL*:  <https://csci5709-web-project.netlify.app/>

## Getting Started

### Prerequisites

You’ll need to have __Node 14.0.0__ or later version on your local development machine (but it’s not required on the server). I recommend using the latest LTS version.

There are two separate applications (Frontend and Backend) in this repository. This is necessary to run both togther with the required environment variables (see Environment Variables section).

Run __cd Frontend__ command to start frontend application

### Installing

A step by step series of examples that tell you how to get a development env running

Make sure that you are on the root directory of the repository.

Install node modules

```
npm install
```

Build application

```
npm run build
```
Start application

```
npm start
```

To run backend application, First run __cd Backend__ and then start with the above command except build for Backend.

## Built With

* [React](https://react.dev/) - The web framework used
* [Ant Design](https://ant.design/) - High-quality UI components
* [Moment](https://momentjs.com/) - Date Formatting/Manipulation
* [React Router Dom](https://www.npmjs.com/package/react-router-dom) -  Declarative routing for React web applications
* [Express.js](https://expressjs.com) - Backend frameowk

All the images are taken from [StorySet](https://storyset.com/).

### Environment Variables

#### Backend
Please set below environment variables before running the backend application

|Variable Name | Mandatory | Description |
|---|---|---|
| DATABASE_URL | Yes  | MongoDB Database URL for connection |
| JWT_SECRET | Yes | Secret key to generate JWT |
| USERNAME | Yes | Username of service account for sending email |
| PASSWORD | Yes | Password of service account for sending email |
| PORT | No | Port value on which server listens to incoming requests |

#### Frontend
Please set below environment variables before running the backend application

|Variable Name | Mandatory | Description |
|---|---|---|
| REACT_APP_API_URL | Yes  | Backend API Base URL |

## Sources Used

### Analytics.js

*Lines 31 - 47*

```
const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

```

The code above was created by adapting the code in [freecodecamp](https://www.freecodecamp.org/news/how-to-use-svg-icons-in-react-with-react-icons-and-font-awesome/#:~:text=After%20finding%20the%20icon%20you,and%20copy%20it%20as%20JSX.&text=With%20that%20icon%20copied%2C%20create,our%20SVG%20within%20that%20component.) as shown below: 

```
const Globe = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

```

### RaiseTicketForm.js

*Lines 16 - 40*

```
const upload_props = {
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const isPDF = file.type === 'application/pdf';
    if (!isImage && !isPDF) {
        messageApi.error('You can only upload JPG/PNG/PDF file!');
        return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        messageApi.error('File must smaller than 5MB!');
        return false;
    }

    setFileList([...fileList, file]);
    return false;
  },
  fileList,
}
```

The code above was created by adapting the code in [stackoverflow](https://stackoverflow.com/questions/74286482/how-to-show-image-base64-with-upload-manually-in-ant-design) as shown below: 

```
const uploadProps = {
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    setFileList([...fileList, file]);
    return false;
  },
  listType: 'picture-card',
  fileList,
};

```

### settings.js

*Lines 193 - 196*

```
pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
message: "Password must contain at least one symbol, one number, one lowercase letter, one uppercase letter, and be at least 8 characters long.",

```

The code above was created by adapting the code in [stackoverflow](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a) as shown below: 

```
(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"

```