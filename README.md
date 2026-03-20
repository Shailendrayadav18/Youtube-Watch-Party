# 🎬 YouTube Watch Party

## 🚀 Live Demo

Frontend: https://youtubewatch-ifs4hu19p-shailendra-yadavs-projects-5ac84230.vercel.app
Backend: https://youtube-watch-party-m7q9.onrender.com

---

## 📌 Features

* Real-time video synchronization (play, pause, seek, change video)
* Room-based system (create/join rooms)
* Role-based access:

  * Host
  * Moderator
  * Participant
* Live participant list with roles
* Chat system
* Playlist (Next Video functionality)

---

## 🛠 Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Real-time: Socket.IO
* Database: MongoDB (optional)
* Video: YouTube IFrame API

---

## ⚙️ Run Locally

### Backend

cd backend
npm install
npm start

### Frontend

cd frontend/vite-project
npm install
npm run dev

---

## 🌐 Deployment

* Frontend: Vercel
* Backend: Render

---

## 🧠 Key Concepts

* WebSockets for real-time sync
* Role-based access control
* Event-driven architecture
* State synchronization across clients

---

## 🎯 Future Improvements

* Better UI (Tailwind)
* Video URL input
* Auto sync correction
* Authentication system

---

## 🏗 Architecture Overview

The application follows a client-server architecture with WebSocket-based communication.

1. The frontend (React) connects to the backend using Socket.IO.
2. When a user joins a room, the server assigns a role (Host/Participant).
3. The server maintains the room state:

   * videoId
   * currentTime
   * playState
4. When a Host/Moderator performs an action (play, pause, seek, change video):

   * Event is sent to server
   * Server validates role permissions
   * Server broadcasts updated state to all clients
5. All clients receive `sync_state` and update their YouTube player.