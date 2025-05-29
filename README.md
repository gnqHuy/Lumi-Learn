# Lumi Learn

## Overview

Lumi Learn is a mobile-first online learning platform designed for accessible and effective knowledge sharing, especially supporting visually impaired users. It fosters a collaborative environment where anyone can contribute diverse educational content, aiming to build an inclusive learning ecosystem.

## Demo
[Video Demo](https://drive.google.com/drive/folders/1cWGZR_exRaej8YTmivf7owkorkEZvnIq?usp=drive_link)


## Installation

Follow these steps to set up the Lumi Learn application locally.

### Backend Installation

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  In the `appsettings.json` file, under the `ConnectionStrings` section, modify the `userid` and `password` to match your local MySQL credentials.
3.  Open a terminal and run the following commands:
    ```bash
    dotnet tool install --global dotnet-ef
    dotnet ef migrations add Initial
    dotnet ef database update
    ```
4.  Import the data from the `SQL_data` file into the newly created database.
5.  Execute the commands found in the `dotnet aws credential config.txt` file located on Google Drive.
6.  Run the server using the following command:
    ```bash
    dotnet run
    ```
    The backend server should now be running.

### Frontend Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    # Or if you are in the root directory: cd frontend
    ```
2.  Open a terminal and run the following commands:
    ```bash
    npm i --legacy-peer-deps
    npx expo start
    ```
    This will start the development server for the frontend application. Follow the instructions in the terminal to open the app on a simulator or physical device.

## Usage

To get started with Lumi Learn after installation, follow these general steps:

1.  **Launch the Application:** Open the Lumi Learn app on your mobile device.
2.  **Account Access:**
    * **New Users:** Register for a new account to access the platform's features.
    * **Existing Users:** Log in using your credentials.
3.  **General User Flow (Learners):**
    * **Find Courses:** Navigate to the course discovery section. Use the search bar to look for specific topics or keywords. You can also apply filters (e.g., by subject, difficulty, rating) to narrow down your choices.
    * **Enroll in a Course:** Once you find an interesting course, view its details (description, lesson, instructor information) and enroll to gain access to its content.
    * **Engage with Content:** Access the enrolled course to study lessons, view learning materials (including flashcards), and participate in any interactive exercises.
    * **Track Progress & Test Knowledge:** Complete quizzes and tests provided within the course to assess your understanding and track your learning progress.
4.  **Content Creator Flow (Instructors):**
    * **Navigate to Creation Tools:** After logging in, access the section for course creation.
    * **Develop Course Material:** Input course details (title, description, target audience), upload or create lesson content, design flashcards, and set up quizzes. Ensure content is accessible.
    * **Submit for Publication:** Once the course is complete, submit it for review by administrators before it becomes available to learners.
5.  **Accessibility:**
    * Visually impaired users can leverage built-in screen reader compatibility and other accessibility features for navigation and interaction with course content.
  
## Features

- **User Authentication:** Secure login and registration for all user roles (learners, instructors, administrators).
- **Accessible Learning for All:** Designed with robust accessibility features to strongly support visually impaired users, ensuring an inclusive experience alongside general users.
- **Collaborative Content Creation:** Empowers instructors and community contributors to create, share, and manage diverse educational content, including courses, lessons, flashcards, and quizzes.
- **Comprehensive Course Management:**
    - For Instructors: Easily create detailed courses with rich content (text, audio descriptions), structure lessons, and submit them for platform review.
    - For Learners: Intuitively search, filter (by topic, rating, etc.), and enroll in courses that align with their learning goals.
- **Interactive Learning Modules:** Engage with learning materials through various formats, including detailed lesson content and interactive flashcards designed for effective knowledge acquisition and retention.
- **Knowledge Assessment & Feedback:** Take quizzes and tests linked to lessons or entire courses to evaluate understanding, with mechanisms for receiving results and identifying areas for improvement.
- **Advanced Course Discovery:** Utilize a powerful search function and filtering options to efficiently find courses based on keywords, subjects, user ratings, or the number of lessons.
- **Support for Multiple User Roles:** Caters to different user types including general learners, visually impaired learners, content contributors (instructors), supporters/volunteers, and administrators, each with relevant functionalities.

## Built With

- **Backend:**
    - .NET 8
    - Entity Framework Core
    - MySQL
    - ASP.NET Core
- **Frontend:**
    - React Native 
    - Expo
    - Typescript
- **Database:**
    - MySQL
- **Other Services:**
    - AWS services
