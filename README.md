# CodeAlpha_Social-Media-Platform


# 🚀 Mini Social Media Platform (Node.js & Express)

A lightweight, single-file social media application built with **Node.js** and **Express**. This project demonstrates core web development concepts including CRUD operations (Create, Read, Update, Delete), state management, and server-side rendering.

## 🛠 Features & Conditions

This implementation covers the following social media requirements:

* **Post Creation**: Users can submit posts with a username and content.
* **Validation Logic**: Prevents empty posts or names exceeding character limits.
* **Real-time Interaction**: Users can "Like" posts and see the count update instantly.
* **Content Management**: Users can delete specific posts from the feed.
* **Dynamic UI**: The interface updates automatically when the database state changes.
* **Responsive Design**: A clean, mobile-friendly UI using CSS-in-JS.

---

## 🏗 Project Structure

Unlike traditional apps that use multiple folders, this project is optimized for learning and quick deployment into a single logic file:

* `app.js`: Contains the Express server, all backend routes, and the HTML/CSS template.
* `package.json`: Manages project dependencies (Express).

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher)
* npm (installed automatically with Node)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/social-media-platform.git

```


2. **Navigate to the folder**:
```bash
cd social-media-platform

```


3. **Install dependencies**:
```bash
npm install

```



### Running the App

Start the server using Node:

```bash
node app.js

```

The application will be live at: **`http://localhost:3000`**

---

## 🧠 Logic Breakdown

The application follows the **Model-View-Controller (MVC)** pattern:

1. **Model**: An in-memory array (`posts`) handles the data storage during the session.
2. **View**: A template literal function (`renderUI`) generates the HTML/CSS dynamically.
3. **Controller**: Express routes (`app.post`, `app.get`) handle the logic for liking, deleting, and adding posts.

---

## 📝 License

This project is open-source and available under the MIT License.
