# ChatApplication‑Sockets

A real-time chat application powered by *Node.js, **Socket.io, **React + Vite, and **MongoDB*. Supports multi-user chat rooms with live updates and concurrency handled via WebSockets.

---

## 🚀 Tech Stack

•⁠  ⁠*Backend*: Node.js + Express + Socket.io  
•⁠  ⁠*Frontend*: React + Vite + Socket.io-client  
•⁠  ⁠*Database*: MongoDB (for user/session/chat‐history storage)  
•⁠  ⁠*Communication*: WebSockets (real-time, bi‑directional)

---

## 🏗 Architecture & Concurrency

1.⁠ ⁠*Server*  
   - Built with Express, wrapped with an HTTP server and integrated with Socket.io.  
   - Listens for ⁠ connection ⁠ events.  
   - Manages user join/leave, broadcasting, and room handling.
   - Stores chat messages (and optionally user metadata) in MongoDB via Mongoose.
   - Each socket connection is handled independently, supporting concurrent real-time messaging.

2.⁠ ⁠*Client*  
   - Built using React and Vite.  
   - Connects via Socket.io client to the server.  
   - Supports joining chat rooms, sending/receiving messages, and live UI updates.

3.⁠ ⁠*Concurrency Handling*  
   - Real-time concurrency is managed natively by Socket.io event queues.  
   - Server emits updates to all clients in relevant rooms.  
   - Multiple users can chat simultaneously without race conditions due to event-driven, single-threaded Node.js runtime.

---

## ⚙️ Getting Started

### Prerequisites

•⁠  ⁠[Node.js](https://nodejs.org/) (v14+ recommended)  
•⁠  ⁠[MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

## bash
```
git clone https://github.com/tamanna155/ChatApplication-Sockets.git
cd ChatApplication-Sockets
```
## Backend
```
cd server
npm install
```
## Frontend
```
npm install
```

## Start the server
```
npm run dev
```
## Navigate to locally hosted server
```
Navigate to the URL shown in the terminal (e.g., http://localhost:3000/).
```


Working Link: https://chatapplication-sockets.onrender.com
