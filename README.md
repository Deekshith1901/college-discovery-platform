# 🎓 College Discovery Platform

A production-grade full-stack **College Discovery + Decision Platform** built using **Next.js, TypeScript, Tailwind CSS, Supabase, and Vercel**.

Designed to help students explore, compare, and evaluate engineering colleges across India through advanced search, detailed profiles, side-by-side comparisons, and personalized saved dashboards.

---

# 🚀 Live Demo

**Live App:** [https://college-discovery-platform-beta.vercel.app/](https://college-discovery-platform-beta.vercel.app/)

# 📂 GitHub Repository

**Repository:** [https://github.com/Deekshith1901/college-discovery-platform](https://github.com/Deekshith1901/college-discovery-platform)

---

# 📌 Features Implemented

## 🔍 1. College Listing + Search

* Dynamic college listing from PostgreSQL database
* Search by college name
* Filters:

  * Location
  * Fees
  * Courses
* Responsive college cards displaying:

  * Name
  * Location
  * Fees
  * Rating
* Pagination / scalable UI
* Loading + error states

---

## 🏫 2. College Detail Page

* Dynamic routing (`/college/[id]`)
* Detailed overview including:

  * Fees
  * Courses Offered
  * Placement Percentage
  * Reviews
* Sectioned UI:

  * Overview
  * Courses
  * Placements
  * Reviews
* Save college functionality for authenticated users

---

## ⚖️ 3. Compare Colleges

* Compare up to 3 colleges simultaneously
* Side-by-side comparison table
* Metrics:

  * Fees
  * Placement %
  * Rating
  * Location
  * Courses
* Save comparison feature
* Decision-focused UX

---

## 🔐 4. Authentication + User Dashboard

* Supabase Auth integration
* Email/password signup/login
* Protected user dashboard
* Saved colleges management
* Saved comparisons management
* User-specific secure data storage

---

# 🧱 Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Responsive design

## Backend

* Supabase
* PostgreSQL
* REST APIs
* Row Level Security (RLS)

## Deployment

* Vercel (Frontend)
* Supabase (Backend + DB + Auth)

---

# 🗄️ Database Schema

## Tables:

### `colleges`

* id
* name
* location
* fees_inr_per_year
* rating
* placement_percentage
* courses_offered
* reviews

### `saved_colleges`

* user_id
* college_id

### `saved_comparisons`

* user_id
* college_ids

---

# ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# 🛠️ Installation & Setup

## Clone repository:

```bash
git clone https://github.com/Deekshith1901/college-discovery-platform.git
cd college-discovery-platform
```

## Install dependencies:

```bash
npm install
```

## Run development server:

```bash
npm run dev
```

---

# 🌐 Deployment

## Frontend:

* Vercel

## Backend:

* Supabase

---

# 📈 Scalability Highlights

* Modular reusable components
* Clean architecture
* Configurable filters
* Secure authentication
* Database-backed persistence
* Responsive mobile-ready design
* Production deployment ready

---

# 🎯 Evaluation Goals Addressed

✔ End-to-end product build
✔ Real database integration
✔ User authentication
✔ Full deployment
✔ Production-grade UI/UX
✔ Decision-support comparison system
✔ Ownership over product execution

---

# 📹 Demo Walkthrough

Include Loom walkthrough link here:

```txt
YOUR_LOOM_VIDEO_LINK
```

---

# 📚 Future Enhancements

* College predictor tool
* Multi-language support
* AI-based recommendations
* Advanced analytics dashboard
* CSV bulk upload admin panel
* Scholarship filters

---

# 👨‍💻 Developer

**Deekshith Mamidi**

Full Stack Developer Intern Candidate
Focused on building scalable, user-centric educational technology solutions.

---

# 🏁 Final Note

This project was built to demonstrate:

* Full-stack engineering capability
* Product ownership
* Real-world deployment
* Practical system design
* Rapid execution under startup-style constraints

---

## ⭐ If you found this project useful, consider starring the repository.
