**AI-assisted DCA management reimagined for modern enterprises**

---

## About This Prototype

DebtFlow  is a **conceptual demonstration** of how Fortune 100 logistics teams could move beyond spreadsheets into intelligent, structured debt recovery workflows [web:21][web:25]. This mock prototype focuses on showcasing the **user experience, interaction design, and AI-assisted guidance** rather than production-grade infrastructure.

---

## ✨ What You'll See

### FedEx Ops Dashboard
A centralized view with lightweight KPIs and an SLA-style heatmap that hints at case risk levels without deep backend complexity [web:21].

### DCA Portal – "My Cases"
Clean, filterable case list with priority badges (High/Medium/Low) and a detail view showing how agents would interact with their assignments [web:25].

### Recovery Copilot™ (The Showpiece)
Right-hand panel suggesting 2–3 next actions (Email/SMS/Call) with plain-English reasoning like *"Debtor opened email 3x but didn't click → Try SMS"* [web:28]. Logic is intentionally simple but makes the AI co-pilot concept tangible.

### Action Logging
Dropdown to record agent actions and outcomes (contacted, no answer, promise-to-pay), creating the sense of an audit trail [web:24].

### AI Scoring (Simulated)
Priority scores and explanations generated from mock data to demonstrate explainable ML without requiring trained models [web:25][web:28].

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind/shadcn for modern UI [web:22][web:23]
- **Backend**: Minimal API endpoints for auth and mock case data
- **Data**: Synthetic cases designed to tell a compelling demo story [web:30]

---

## 🚀 Quick Start

Clone repository:
git clone <YOUR_REPO_URL>
cd debtflow-prototype

Install dependencies:
npm install

Start dev server:
npm run dev

text

Visit `http://localhost:5173` and log in with demo credentials (check login page).

---

## 📋 Demo Flow

1. **Login** as FedEx Admin or DCA Agent
2. **View dashboard** with mock KPIs and case heatmap
3. **Open a case** to see Recovery Copilot suggestions
4. **Log an action** and watch the UI update
5. **Check analytics** to see simulated performance metrics

---

## 🎯 Purpose

This prototype sells the **story and interaction flow** of AI-assisted debt recovery [web:21][web:28]. Heavy integrations, real ML models, and full compliance controls are intentionally left for production phase—keeping the demo fast, focused, and judge-friendly.