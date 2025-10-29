# Temple Crowd Management System  
Demo - [BhaktQueue](https://bhaktqueue.netlify.app/)  

## 🧭 Project Overview  
In many temples, crowd management becomes a major operational challenge — long queues, unpredictable crowd influx, & physical discomfort for devotees.  
This project — **Temple Crowd Management System (BhaktQueue)** — aims to modernize and streamline how devotees wait, queue and enter temple premises. It empowers both the temple administration and the devotees with real-time data, better scheduling, and smoother experiences.

**Use-cases include:**  
- Allow devotees to register ahead of time / check estimated wait-time before visit.  
- Provide administrators with a dashboard to monitor crowd levels, manage slots & direct traffic.  
- Reduce physical queueing in real life by integrating digital token/slot systems.  
- Improve safety (especially during high-traffic periods) by enabling better crowd throughput control.

---

## 🧑‍💼 Admin Panel  
**URL:** `https://bhaktqueue.netlify.app/admin`  
Use this route to access the admin dashboard (ensure you have the appropriate credentials).  
Features include:  
- Login / authentication for administrators.  
- Dashboard overview: queue length, active visits, upcoming slots.  
- Management view: create/edit/delete time-slots, adjust capacity per slot.  
- Visitor view: list of active/pending tokens, ability to mark them as checked-in/out.  
- Reporting: view past data, export CSV/JSON analytics.

---

## 🛠 Tech Stack  
The key technologies used in this project include:

| Layer            | Technology                                               |
|------------------|----------------------------------------------------------|
| Front-end        | React.js / Next.js (or your specific library)            |
| Back-end         | Node.js + Express (or alternate)                          |
| Database         | MongoDB / PostgreSQL / Firebase (choose what you used)   |
| Authentication   | Firebase Auth / JWT-based / OAuth2                        |
| Hosting / Infra  | Netlify (for front-end) & Heroku / AWS / DigitalOcean (for backend) |
| Admin Panel      | Built using React + Ant Design (or Material-UI)          |
| Real-time / Updates| Socket.io / Firebase Realtime / WebSockets             |

> _Note:_ Replace above with your actual stack — e.g., if you used Firebase Firestore for database, mention “Firebase Firestore”.

---

## 🎯 Features & Functionality  

### For Devotees  
- Browse upcoming time-slots & visit windows.  
- Obtain a digital token for queueing or join a virtual queue.  
- View estimated wait time and queue status in real-time.  
- Receive notifications when it’s time to visit or when the slot opens.  
- Access mobile-friendly UI for on-the-go usage.

### For Temple Administration  
- Admin panel access: `/admin`  
- View live crowd statistics: current visitors, pending tokens, avg wait time.  
- Manage time-slots & visitor batches (e.g., morning shift, afternoon shift).  
- Approve or cancel tokens, mark visitors as entered/exited.  
- Configure thresholds for crowd limits (safety/regulatory compliance).  
- Export analytics or view historical crowd trends.

---


 

