# Brainly

Brainly is a personal dashboard for collecting and organizing tweets, YouTube videos, and your own notes—all in one place. Secured with token-based authentication and backed by MongoDB for reliable storage, it lets you create shareable links for easy access or sharing. Built with Vite, React, TypeScript, and Tailwind CSS.

---

# 🧠 Brainly – Curate What Inspires You
<img width="1166" alt="image" src="https://github.com/user-attachments/assets/48df4639-08b4-4e92-b1bc-a46f7526be2d" />

Brainly is a personal content dashboard where you can collect and organize tweets, YouTube videos, and written thoughts — all in one place.

---

## 🚀 Features

### 🔐 Authentication

* Supports:

  * `/signup` – Register a new account.
  * `/signin` – Log into your account.
* Uses **token-based authentication** to manage user sessions securely.

### 📂 Dashboard

* `/dashboard` – Your personalized space to manage and view saved content.
* Add content easily:

  * 🐦 Tweets from Twitter
  * 📺 YouTube videos
  * ✏️ Written notes or thoughts
* Organize what you want to **see**, **read**, or **revisit** later.

### 🔗 Shareable Content

* Every thought or brain you create has a **unique shareable link**, so you can:

  * Share it with friends or on social media.
  * Access it later.

### 📺 Platform Support

* **Twitter** embeds
* **YouTube** embeds

---

## 🌐 Running Locally

By default, the app runs on `http://localhost:3000`, which means:

> ⚠️ This is only accessible on your **own computer**.

### 🔧 Setup

```bash
# Clone the repository
git clone https://github.com/your-username/brainly.git

# Navigate into the project
cd brainly

# Install dependencies
npm install

# Start the development server
npm run dev

# Open in browser
http://localhost:3000
