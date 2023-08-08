<div id="header" align="center">
    <h1>🎬 Movie Book 📖</h1>
    <h3><strong><em>A Playlist app for your Favourite Movies and series</em></strong></h3>
  <img src="https://i.ibb.co/4pVVPgg/Screenshot-from-2023-08-08-15-36-36.png" alt="home page of the website"><br>
    <!-- to change tagline if necessary -->
    </div> <br>

# 🙌 Welcome to Movie Book App

 # 🚀 About

- The app is designed to help you save your favorite movies and series in a playlist, allowing you to keep track of them.
- The app fetches data from the free-tier API provided by  [omdbAPI](https://www.omdbapi.com/)

# 💰 Features
- Login or sign up using an **Email ID and Password**.
- Access the app by logging in with your Email ID and Password.
- The app provides the following services:
  - **Create Playlist**: Organize your favorite movies and series.
  - **Check Public Playlists**: Explore playlists shared by others.
  - **Search for Movies**: Discover movies using the app's search functionality.
  - **Delete from Your Playlist**: Remove items from your playlists.
- In the "User" section, you can view all public playlists and access their details by clicking on them.
- Enjoy the flexibility to **log out** as needed.
- Delete **your own playlists** with ease.

# 🛠️ Tech Stack

This project uses: <br><br>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/pnpm-%2320232a.svg?style=for-the-badge&logo=pnpm&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%3FA037.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![IMDBAPI](https://img.shields.io/badge/IMDBAPI-%23646CFF.svg?style=for-the-badge&logo=link&logoColor=blue)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Prerequisites

Before installation, you need to have installed/knowledge of the following:
<br><br>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## 🤝 Contributing
### How to Run this project Locally

1. clone the **dev** branch to your local machine
```markdown
git clone --branch dev https://github.com/JasonDsouza212/moviebook.git
```
2. change the present working directory

```markdown
cd moviebook
```
3. change the present working directory to backend

```markdown
cd backend
```
4. Set the **.env** file with the value in the backend folder
- PORT= **4000**
- MONGO_URI=**Your MongoDB URL**
- SECRET= **Any string with minimun 40 characters**

5. Open CMD in your current directory and install pnpm packages using command:

```markdown
pnpm install
```

6. Run it locally using

```
pnpm start
```

7. Change the present working directory to **client** by opening a new terminal window and executing the following command:

```markdown
cd ..
cd client
```

8. Set the **.env** file with the value in the client folder
- REACT_APP_APIKEY = **Your OMDBAPI APIKEY**

9. Open the Command Prompt (CMD) in your current directory and install pnpm packages using the following command:

```markdown
pnpm install
```

> Run it locally using

```
pnpm start
```

10. You can now access the application at :
```
http://localhost:3000/
```

<br>
<div align="center">
<h4>This project has been created as a means to practice and develop my skills. Please feel free to upgrade and enhance it, as this collaborative effort can serve as a valuable learning experience for both of us. </h4>
</div>