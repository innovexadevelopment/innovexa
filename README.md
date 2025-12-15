# Innovexa - Company Website

A complete, production-ready company website built with Next.js 14+ App Router, TypeScript, Tailwind CSS v4, Supabase, and Framer Motion.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14+ App Router, TypeScript, Tailwind CSS v4
- **Database Integration**: Supabase for read-only data fetching
- **Smooth Animations**: Framer Motion for professional animations and transitions
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **SEO Optimized**: Meta tags and semantic HTML on every page
- **8 Complete Pages**:
  - Home (Hero, About, Services, Portfolio, Clients, CTA)
  - About (Mission, Vision, Values, Timeline)
  - Services Listing & Detail Pages
  - Portfolio Listing & Detail Pages (with category filtering)
  - Clients (with testimonials)
  - Contact (with form and map)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account and project
- Supabase database with the required tables (see Database Schema below)

## 🛠️ Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd /home/alam/Desktop/dua-foundation/innovexa
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON=your-anon-key-here
   ```

## 📊 Database Schema

Your Supabase project should have the following tables:

### company_services
```sql
- id: UUID (Primary Key)
- title: VARCHAR
- description: TEXT
- icon_url: TEXT
- created_at: TIMESTAMP
```

### company_portfolio
```sql
- id: UUID (Primary Key)
- title: VARCHAR
- description: TEXT
- category: VARCHAR
- cover_image: TEXT
- created_at: TIMESTAMP
```

### company_portfolio_media
```sql
- id: UUID (Primary Key)
- portfolio_id: UUID (Foreign Key → company_portfolio.id)
- media_url: TEXT
- created_at: TIMESTAMP
```

### company_clients
```sql
- id: UUID (Primary Key)
- name: VARCHAR
- logo_url: TEXT
- created_at: TIMESTAMP
```

### settings
```sql
- id: SERIAL (Primary Key)
- site_type: VARCHAR
- site_name: VARCHAR
- logo_url: TEXT
- address: TEXT
- email: VARCHAR
- phone: VARCHAR
- facebook: TEXT
- instagram: TEXT
- linkedin: TEXT
- youtube: TEXT
- created_at: TIMESTAMP
```

### media (for hero images, etc.)
```sql
- id: UUID (Primary Key)
- url: TEXT
- folder: VARCHAR
- alt_text: TEXT
- created_at: TIMESTAMP
```

## 🗂️ Storage Bucket

Create a **public** storage bucket named `company-media` in your Supabase project to store:
- Service icons
- Portfolio images
- Client logos
- Hero/banner images

## 🎯 Running the Project

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
├── components/          # Reusable components
│   ├── AnimatedFadeIn.tsx
│   ├── ClientLogo.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── PortfolioCard.tsx
│   ├── SectionTitle.tsx
│   └── ServiceCard.tsx
├── lib/                 # Utilities and types
│   ├── supabaseClient.ts
│   └── types.ts
├── about/              # About page
│   └── page.tsx
├── services/           # Services pages
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── portfolio/          # Portfolio pages
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── clients/            # Clients page
│   └── page.tsx
├── contact/            # Contact page
│   └── page.tsx
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page
```

## 🎨 Customization

### Colors
The primary color scheme uses blue (`#3b82f6`). To change it, edit `app/globals.css`:

```css
:root {
  --primary: #3b82f6;      /* Your brand color */
  --primary-dark: #2563eb; /* Darker shade */
}
```

### Company Information
Update the `settings` table in Supabase with your company details:
- Company name
- Address
- Contact information
- Social media links

## 🔍 Key Features Explained

### Read-Only Architecture
This website is designed as a **read-only** frontend. It fetches data from Supabase but does not perform any INSERT/UPDATE/DELETE operations.

### Animations
All pages use Framer Motion for smooth animations:
- Fade-in on scroll
- Hover effects on cards
- Stagger animations for lists
- Hero text slide-in

### SEO
Each page has unique meta tags for better search engine optimization.

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚨 Important Notes

- The contact form is **not functional** (read-only website)
- All images must be uploaded to the Supabase `company-media` bucket
- Image paths in the database can be either:
  - Full URLs (`https://...`)
  - Relative paths (`icons/service-1.png`) - will auto-generate public URLs

## 📝 License

This project is proprietary software for Innovexa.

## 🤝 Support

For questions or issues, contact the development team.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase
