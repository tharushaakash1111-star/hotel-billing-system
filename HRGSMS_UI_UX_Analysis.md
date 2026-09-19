# UI/UX & Design System Architecture Analysis
## Hotel Reservation and Guest Services Management System (HRGSMS)
**Target Software:** SkyNest Hotels Management Suite  
**Design System Name:** Aura Premium Hospitality ("Elevated Serenity")  
**Core Technologies:** React + Vite + Tailwind CSS + Material Symbols + Glassmorphism  
**Document Version:** 4.0 (Final Architecture - Interactive Login Modal & Complete 6-View Specification)  

---

## 1. Brand Identity & Design System Specification

The HRGSMS visual system is built on the **Aura Premium Hospitality Design System**, defined by the concept of *"Elevated Serenity"*. It pairs luxury boutique hotel aesthetics with high-efficiency enterprise management controls.

```
+-----------------------------------------------------------------------------------+
|                            AURA DESIGN SYSTEM PALETTE                             |
+-----------------------------------------------------------------------------------+
|  PRIMARY:             Deep Sapphire (#00152f)   - Main buttons, headers, active tabs|
|  SECONDARY:           Champagne Gold (#735c00)  - Badges, VIP tags, metrics       |
|  SECONDARY CONTAINER: Gold Accent (#fed65b)     - Maintenance status, highlights  |
|  SURFACE TINT:        Slate Blue (#485f82)      - Checked-in status, secondary  |
|  BACKGROUND/SURFACE:  Cloud White (#f9f9ff)     - Main canvas background          |
|  SURFACE CONTAINER:   Ice Blue (#e7eeff)        - Available room grid cells       |
+-----------------------------------------------------------------------------------+
```

### 1.1 Typography Hierarchy

| Style Token | Font Family | Size / Line Height | Weight & Style | Application |
| :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Playfair Display | 48px / 1.2 | 700 (Bold), -0.02em | Main Page Titles (e.g., *Room Availability*) |
| `headline-md` | Playfair Display | 32px / 1.3 | 600 (SemiBold) | Section & Card Headers, Key KPI values |
| `headline-sm` | Playfair Display | 24px / 1.4 | 600 (SemiBold) | Component Titles, Modal Headers |
| `body-lg` | Inter | 18px / 1.6 | 400 (Regular) | Hero Subtitles, Lead Paragraphs |
| `body-md` | Inter | 16px / 1.5 | 400 (Regular) | Table Rows, Input Values, General Copy |
| `label-md` | Inter | 14px / 1.2 | 500 (Medium), 0.05em | Form Labels, Navigation Menu Items |
| `label-sm` | Inter | 12px / 1.2 | 600 (SemiBold), 0.1em UPPERCASE | Table Headers, Status Badges, Metadata |

---

## 2. Complete Screen-by-Screen UI Architecture & Interactive Behaviors

### View 1 & 2: Public Landing Page with Interactive Glassmorphic Login Modal (`/`) — *SRS Figure 2*

```
+-----------------------------------------------------------------------------------+
| TopNav: [SN Logo] SkyNest Hotels | Nav: Our Story | Experiences | Contact         |
+-----------------------------------------------------------------------------------+
| HERO BANNER: Luxury Infinity Pool & Skyline Background                            |
|   Title: WELCOME TO HOTEL SKYNEST                                                 |
|   CTA:   [ MANAGEMENT PORTAL -> ] (Triggers Glassmorphic Modal Overlay)           |
+-----------------------------------------------------------------------------------+
| INTERACTIVE MODAL OVERLAY (#login-modal):                                         |
|   - Scale Transition: scale-95 -> scale-100 with opacity & backdrop-blur-sm       |
|   - Staff ID / Email Input Field                                                  |
|   - Password Input Field                                                          |
|   - Branch Selection Dropdown (Colombo / Kandy / Galle)                           |
|   - Close Button (#close-login-btn) & Backdrop Dismiss                            |
|   - Submit CTA: [ SIGN IN ]                                                       |
+-----------------------------------------------------------------------------------+
| SUB-SECTION & FOOTER:                                                             |
|   "Dedicated to providing the highest level of comfort and serenity across         |
|    Sri Lanka."  | Branch Pills: [ COLOMBO ] [ KANDY ] [ GALLE ]                   |
+-----------------------------------------------------------------------------------+
```

#### Interactive Modal Mechanics & Javascript Logic:
```javascript
// Smooth scale-fade modal transition
function openModal() {
    modal.classList.remove('hidden');
    void modal.offsetWidth; // Trigger DOM reflow
    modal.classList.remove('opacity-0');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
}
```
- **Authentication Endpoint:** Submits to `POST /api/auth/login`, validates credentials, sets JWT session token, initializes `BranchID` in React context, and redirects to appropriate dashboard based on `UserRole`.

---

### View 3: Executive Branch Overview (`/manager/dashboard`) — *SRS Figure 3*

- **KPI Metrics:** Occupancy ($85\%$), Active Bookings ($42$), Revenue Today ($\$12,400$).
- **Branch Performance Cards:** Colombo ($92\%$ Occupancy) vs. Kandy ($78\%$ Occupancy).
- **Live Activity Feed:** Real-time WebSocket event stream (`audit:log`).

---

### View 4: Room Availability Matrix (`/frontdesk/availability`) — *SRS Figure 4*

- **Interactive Timeline Grid:** 7-day calendar matrix ($S-401, S-402, D-301, D-302$).
- **Color Coding System:** Navy (Booked), Slate Blue (Checked-In), Gold (Maintenance), Soft Blue (Available).
- **Hover Tooltips:** Displaying Conf # (`#SN-8842`), Check-in/out timestamps, and VIP notes.

---

### View 5: Create Reservation Modal (`#booking-modal`)

- **3-Step Form Wizard:** Guest Details $\rightarrow$ Stay Information $\rightarrow$ Tax & Financial Calculation ($\text{Rate} \times \text{Nights} + \text{Taxes}$).

---

### View 6: Guest Services & Operations Queue (`/frontdesk/services`) — *SRS Figure 5*

- **Live Service Queue:** Pending, In-Progress, Completed status cards.
- **Active Guest Folio List:** Dues tracking with quick `+ Add` service charge actions.
- **Service Catalogue:** Centralized pricing and catalog manager.

---

## 3. Comprehensive Database & Endpoint Binding Matrix

| UI Component | Event / Trigger | Backend Endpoint | Database Entities Affected |
| :--- | :--- | :--- | :--- |
| **Landing Portal Button** | Click `#open-login-btn` | Client Modal Toggle | None |
| **Login Modal Form** | Submit Sign In | `POST /api/auth/login` | `User`, `AuditLog` |
| **Branch Selector** | Select Branch Dropdown | Refetch Session Scope | Session Context |
| **Branch Overview** | View Metrics | `GET /api/reports/occupancy` | Data Aggregations |
| **Room Availability** | Date / Branch Filter | `GET /api/reservations/availability` | `Room`, `Booking`, `RoomType` |
| **Booking Modal** | Confirm Booking | `POST /api/reservations` | `Booking`, `BookingRoom`, `Guest` |
| **Service Queue Item** | Update Status | `PATCH /api/services/usage/:id` | `ServiceUsage`, `Booking` |

---

## 4. Final Documentation Verification

All scenario specifications, SRS alignment, design tokens, and interactive modal transitions are completely analyzed and finalized:
- 📄 [HRGSMS_UI_UX_Analysis.md](file:///Users/akashinduwara/micro%20maze/HOTEL%20BILLING%20Database%20/HRGSMS_UI_UX_Analysis.md)
- 📄 [HRGSMS_Scenario_Analysis.md](file:///Users/akashinduwara/micro%20maze/HOTEL%20BILLING%20Database%20/HRGSMS_Scenario_Analysis.md)
