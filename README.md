
# StudyNotion

Welcome to StudyNotion, an educational platform designed to facilitate learning and knowledge sharing. This project aims to provide a comprehensive and user-friendly environment for students and educators alike.

## Tech Stack
    MERN STACK
**Client:** React, Redux, TailwindCSS

**Server:** Node, Express, MongoDB

## Table of Contents

- [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Authors](#Authors)
- [Contact](#Contact)
## Features

- Teacher Functionality: Empower educators to effortlessly create and manage courses through a dedicated dashboard, tracking income, students, and courses.
- Student Experience: Provide students with personalized dashboards, showcasing enrolled courses, a user-friendly cart, and profile management.
- Admin Control: Administrators enjoy their own comprehensive dashboard, enabling efficient management of course categories, revenue insights, and system settings.
- Course Progress Tracking: Each course features a progress bar, allowing students to monitor their learning journey seamlessly.
- Payment Integration: Smooth transactions powered by Razorpay, enhancing user experience during course purchases.
- User Authentication & Email Notifications: Secure user authentication and timely email notifications for enhanced communication.
- Fully Responsive Design: Ensure optimal user experience across all devices for seamless learning on-the-go.
- Efficient Hosting: Hosted on Vercel & Render for reliability and scalability.

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**

    ```bash
    git clone https://github.com/rRahul0/StudyNotion.git
    cd StudyNotion
    ```

2. **Install dependencies**

    ```bash
    npm i
    cd ./server
    npm i
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add the necessary configuration variables. Example:

### Backend Environment Variables

To run this project, you will need to add the following environment variables to your ./server/.env file

`PORT`

`DATABASE_URI`

`FRONTEND_URL`

`JWT_SECRET`

Mail Environment Variables :

`MAIL_HOST`
`MAIL_USER`
`MAIL_PASS`


Cludinary Environment Variables

`FOLDER_NAME`
`CLOUD_NAME` 
`API_KEY` 
`API_SECRET` 

Cludinary Environment Variables:

`RAZORPAY_KEY` 
`RAZORPAY_SECRET`

Admin Register Key:

`ADMIN_KEY`=your_secret_key



### Frontend Environment Variables

   To run this project, you will need to add the following environment variables to your ./client/.env file

`VITE_BASE_URL`

`VITE_RAZORPAY_KEY`

`VITE_RAZORPAY_SECRET`


4. **Run the application**

    ```bash
    npm run dev
    ```
    ```bash
    cd server
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.
    ## Usage

Once the application is up and running, you can access the following features:

- **Sign Up/Login**: Register a new account or log in with an existing one.
- **Browse Courses**: Explore the available courses on the platform.
- **Enroll in Courses**: Enroll in courses to start learning.
- **Upload Content**: If you are an instructor, you can upload learning materials.
- **Participate in Forums**: Engage in discussions and share insights with others.
- **Track Progress**: Monitor your learning journey and progress through the courses.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors
- [Rahul Karmakar](https://github.com/rRahul0)

## Contact

Rahul - [https://www.linkedin.com/in/rahul-karmakar-605509257/](https://www.linkedin.com/in/rahul-karmakar-605509257/)

Email : `karmakarrahul503@gmail.com`

Project Link: [https://github.com/rRahul0/StudyNotion](https://github.com/rRahul0/StudyNotion)
