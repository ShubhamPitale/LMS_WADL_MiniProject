<a name="readme-top"></a>

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ShubhamPitale/LMS_WADL_MiniProject">
    <img src="./client/src/img/logo.png" alt="Logo" width="250" height="80">
  </a>

<h3 align="center">Bookmate</h3>

  <p align="center">
    The project "Bookmate" is a web application designed as a library management system. It caters to two types of users: administrators and normal users (students). Administrators possess a range of functions such as viewing the entire library book collection, adding new books to the system, issuing books to students, and managing the return of borrowed books. Users, on the other hand, can also explore the library's book catalog, search for specific books, and filter books by genre.Pagination has been incorporated to manage large book collections efficiently. Users can monitor their own book issues and access related details. This project essentially streamlines book management for administrators and enhances user experience for students through a user-friendly web interface.
    <br />
    <br />
    <a href="https://lms-4.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/ShubhamPitale/LMS_WADL_MiniProject">Report Bug</a>
    ·
    <a href="https://github.com/ShubhamPitale/LMS_WADL_MiniProject">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://lms-4.onrender.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![MongoDB][mongodb.com]][mongodb-url]
- [![Express][express.com]][express-url]
- [![React][react.js]][react-url]
- [![Node][node.com]][node-url]
- [![JWT][jwt.com]][jwt-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Your machine must have latest version of npm installed.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   https://github.com/ShubhamPitale/LMS_WADL_MiniProject
   ```
2. Install NPM packages for both client and server.
   ```sh
   npm install
   ```
3. You need to make a .env file and add your own variables if want to preview this project.
   ```js
   MONGO_URI = 'Your MongoDB database';
   ```
   ```js
   JWT_SECRET = 'Your JWT secret key';
   PORT = 'Your PORT';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[Shubham Pitale](https://www.linkedin.com/in/shubham-pitale-b07692218/) - shubhampitale45@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: ./client/src/img/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[mongodb.com]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[express.com]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com/
[node.com]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[jwt.com]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[jwt-url]: https://jwt.io/
