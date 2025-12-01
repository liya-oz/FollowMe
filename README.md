<div>
<img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue">
<img alt="React" src="https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react">
<img alt="Vite" src="https://img.shields.io/badge/Vite-5.0.0-purple?logo=vite">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-v22-green?logo=node.js">
<img alt="Express" src="https://img.shields.io/badge/Express-5.1.0-lightgrey?logo=express">
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-7.0.0-4EA94B?logo=mongodb">
<img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-4.7.4-black?logo=socket.io">
<img alt="JWT" src="https://img.shields.io/badge/JWT-auth-orange?logo=jsonwebtokens">
<img alt="Sass" src="https://img.shields.io/badge/Sass-1.57-pink?logo=sass">
</div>

# [**FollowMe App**](https://c50-group-a-eb9c219c9326.herokuapp.com/)

**FollowMe** is a social platform for discovering, hosting, and joining in-person events. It features real-time private chat, rich filtering, and responsive design that makes it simple to connect and meet new people.

This platform makes it easy to:

- Find meetups happening in town
- Connect with like-minded people
- Join events and chat before you meet

---
<img width="1394" height="707" alt="image" src="https://github.com/user-attachments/assets/d3cb2c85-9774-4c54-ba5a-c6e2b16c8431" />

---
[DEMO: Click here to try the app!](https://c50-group-a-eb9c219c9326.herokuapp.com/)

## Main Features

- **Browse and Discover Events**: Filter and search by city, category, and title. Each event has a cover image, description, host info, location, time, and list of participants.
- **Join and Host Events**: Sign up, create your own events, or join others with one click.
- **User Profiles**: Personalize your profile with photo, age, hobbies, city, interests. View public profiles of event attendees.
- **Friends List**: Add users as friends or search attendees; sort, filter, and chat with friends.
- **Real-Time Messaging**: One-on-one real-time chats powered by Socket.IO. Chat with friends before or after events.
- **Secure Authentication**: JWT-based login, password hashing, and profile privacy settings.
- **Mobile-Friendly UI**: Responsive burger menu sidebar and touch-friendly navigation.

---

## Quick Start

### Prerequisites

- **Node.js (v22+)**
- **MongoDB**
- **npm**
- **Git**

### Setup Instructions

```bash
git clone https://github.com/hyf-final-project/followme-app.git
cd followme-app

npm install
npm run setup      # initializes client and server

# Create .env files from respective .env.example in client and server
npm run dev        # runs both client and server in development
```

---

## 🛠 Tech Stack

**Frontend**

- React 19 & Vite
- Sass
- React Testing Library & Jest

**Backend**

- Node.js, Express.js
- MongoDB & Mongoose
- JWT and bcrypt
- Supertest & Jest for API

**Real-Time Features**

- Socket.IO

**Dev Tools**

- ESLint, Prettier, Husky
- Cypress
- Dotenv, Concurrently

---

## Structure

```plaintext
client/
├── public/
└── src/
    ├── __tests__/
    ├── __testUtils__/
    ├── components/
    ├── hooks/
    ├── pages/
        ├── __tests__/
        └── components/
    ├── util/
    └── index.jsx
cypress/
    ├── fixtures/
    ├── integration/
    ├── plugins/
    └── support/
server/
└── src/
    ├── __tests__/
    ├── __testUtils__/
    ├── controllers/
    ├── db/
    ├── models/
    ├── routes/
    ├── util/
    └── index.js
```

---

## License MIT

---
