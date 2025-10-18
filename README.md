CareerIQ — AI-Powered Intelligent Job & Candidate Matching Platform

### 🚀 Overview

**CareerIQ** is an AI-powered microservices-based recruitment platform that connects **candidates** and **employers** intelligently using **resume parsing, skill matching**, and **fraud detection**.

It eliminates manual resume screening and helps job seekers find roles that best match their skills.

---

## 🧭 Problem Statement

Recruiters waste hours scanning resumes and filtering unqualified candidates.  
Candidates apply blindly without knowing how suitable their profile really is.

**CareerIQ solves this by:**
- Automatically analyzing resumes and job descriptions
- Computing real-time *match scores*
- Recommending best-fit candidates and jobs using AI

---

## 🧠 Core Features

### 👩‍💻 Candidate Portal
- Upload resume (PDF → Parsed via NLP)
- Get job match recommendations & scores
- Skill gap visualization with analytics dashboard

### 🏢 Employer Portal
- Post job listings with required skills
- Automatically get ranked candidate suggestions
- Shortlist or reject candidates with insights

### 🛡️ Admin Portal
- Manage users, jobs, and resumes
- Detect and prevent fraud/spam activity
- Monitor usage & job posting analytics

---

## ⚙️ Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React + Tailwind CSS + Recharts | Interactive dashboards for all portals |
| **Backend (Auth/Jobs)** | Node.js + Express | Authentication, job posting, notification APIs |
| **AI Service** | Python + Flask | Resume parsing, skill extraction, AI matching |
| **Database** | MongoDB | Separate collections for users, jobs, resumes, matches |
| **Storage** | Cloudinary | Resume PDF storage |
| **Message Broker (optional)** | RabbitMQ | Async communication between Node ↔ Flask |
| **Authentication** | JWT + bcrypt | Secure login & session management |
| **NLP Engine** | spaCy / NLTK | Skill and keyword extraction |
| **Visualization** | Recharts | Match score and job analytics |

---

## 🧩 Microservices Architecture

careerIQ/
│
├── gateway/ # API Gateway (Node.js)
│
├── services/
│ ├── auth-service/ # Authentication & User Management
│ ├── job-service/ # Job posting & Application handling
│ ├── ai-service/ # AI Resume Parsing & Skill Matching (Python Flask)
│ └── admin-service/ # Admin analytics & fraud detection
│
├── shared/ # Shared configs, models, and utilities
│
├── frontend/
│ ├── candidate-app/ # React + Tailwind candidate portal
│ ├── employer-app/ # Employer portal
│ └── admin-app/ # Admin dashboard
│
├── docker-compose.yml # Container orchestration
├── README.md
└── package.json

yaml
Copy code

---

## 🧪 Installation & Setup

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/<your-username>/CareerIQ.git
cd CareerIQ
2️⃣ Start MongoDB
Make sure MongoDB is running locally or provide a MongoDB Atlas URI in .env.

3️⃣ Setup each service
🟢 Auth Service
bash
Copy code
cd services/auth-service
npm install
npm run dev
🟣 Job Service
bash
Copy code
cd services/job-service
npm install
npm run dev
🔵 AI Service
bash
Copy code
cd services/ai-service
pip install -r requirements.txt
python app.py
🌐 API Endpoints
Auth Service
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/profile	Get user profile

Job Service
Method	Endpoint	Description
POST	/api/jobs	Create a new job
GET	/api/jobs	List all jobs
GET	/api/employer/applications	Get all applications for an employer

AI Service
Method	Endpoint	Description
POST	/api/ai/parse-resume	Parse resume & extract skills
POST	/api/ai/match	Match candidate with job description

🧰 Tools Used
Postman → API testing

Swagger / OpenAPI → API documentation

Docker → Containerization (optional)

GitHub Actions → CI/CD pipeline setup

📊 Example Dashboard (Planned UI)
Candidate match score visualization

Employer job analytics

Admin fraud activity chart

🚧 Future Enhancements
🧠 AI-based candidate ranking (via cosine similarity / embeddings)

🧾 Smart fraud detection on resumes

📬 Real-time notifications (Socket.io)

🌎 Multilingual support with i18next

👥 Contributors
Name	              Role
Risha Mondal   	Full Stack Developer (React, Node.js, Python)

🪪 License
This project is licensed under the MIT License — free to use and modify.
