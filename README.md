# Lumi Learn

## Overview

Lumi Learn is a mobile-first online learning platform designed for accessible and effective knowledge sharing, especially supporting visually impaired users. It fosters a collaborative environment where anyone can contribute diverse educational content, aiming to build an inclusive learning ecosystem.

## Demo

## Table of Contents

- [Lumi Learn](#lumi-learn)
  - [Short Description/Overview](#short-descriptionoverview)
  - [Screenshots/GIFs/Demo](#screenshotsgifsdemo)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [Backend Installation](#backend-installation)
    - [Frontend Installation](#frontend-installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Tech Stack/Built With](#tech-stackbuilt-with)
  - [Contributing](#contributing)
  - [Roadmap](#roadmap)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgements/Credits](#acknowledgementscredits)

## Requirements

- Node.js 20
- MySQL
- .NET 8

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
    (You might want to add more specific instructions here, e.g., "Using your preferred MySQL client, connect to the database and execute the script found in `path/to/your/SQL_data`.")
5.  Execute the commands found in the `dotnet aws credential config.txt` file located on Google Drive.
    (It's generally better to include the commands directly or explain the setup rather than linking to an external private file. If these are sensitive, provide guidance on what needs to be configured.)
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

(Explain how to use the application after installation.
- How does a user start interacting with it?
- Are there default login credentials for testing?
- Provide examples of main functionalities.)
## Features

(List the key features of Lumi Learn. Use bullet points for clarity.)
- Feature 1: (e.g., User Authentication)
- Feature 2: (e.g., Course Management)
- Feature 3: (e.g., Interactive Learning Modules)
- ...

## Tech Stack/Built With

- **Backend:**
    - .NET 8
    - Entity Framework Core (implied by `dotnet ef`)
    - MySQL
    - (Any other relevant backend technologies, e.g., ASP.NET Core)
- **Frontend:**
    - Node.js (v20 for the development environment)
    - Expo
    - (Specify the framework used with Expo, e.g., React Native)
    - (Any other relevant frontend libraries, e.g., Redux, Axios)
- **Database:**
    - MySQL
- **Other Tools/Services:**
    - (e.g., AWS services if `dotnet aws credential config.txt` implies usage)

## Contributing

We welcome contributions to Lumi Learn! If you'd like to contribute, please follow these steps:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us. (You would need to create this file if you want detailed contribution guidelines).

## Roadmap

(Outline the future plans and features for Lumi Learn. This shows users and potential contributors where the project is heading.)
- [ ] Feature A - In progress
- [ ] Feature B - Planned for Q3
- [ ] Enhancement C - Under consideration

See the [open issues](link_to_your_issues_page) for a full list of proposed features (and known issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
(Make sure to add a `LICENSE` file to your repository. You can easily create one on GitHub when creating the repository or add it manually. The MIT license is a common choice.)

## Contact

Your Name / Organization Name – [@your_twitter_handle](https://twitter.com/your_twitter_handle) – your.email@example.com

Project Link: [https://github.com/your_username/lumi-learn](https://github.com/your_username/lumi-learn)
(Replace with your actual project link)

## Acknowledgements/Credits

(Give credit to any resources, libraries, or individuals that helped you or inspired you in this project.)
- Hat tip to anyone whose code was used
- Inspiration
- etc.
