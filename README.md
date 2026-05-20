# Notes - Elevate Your Thoughts

A sophisticated, secure, and beautifully designed notes application with real-time synchronization. Built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## Features

✨ **Beautiful UI/UX** - Clean, modern design with elegant gradients and smooth animations  
🔐 **Secure Authentication** - Email/password and Google OAuth login  
🚀 **Real-time Sync** - Notes update instantly across all devices  
🏷️ **Tags & Search** - Organize notes with tags and search by title or content  
✏️ **CRUD Operations** - Create, edit, and delete notes with ease  
🛡️ **SQL Injection Proof** - All database operations use parameterized queries  
🔒 **Row Level Security** - Users can only access their own notes  

## Screenshots

### Landing Page
A stunning welcome page that showcases the app's features and invites users to get started.

![Landing Page]("https://github.com/user-attachments/assets/d50d316d-1344-40d8-ac5a-50fa72570a6c)

### Sign Up
Create an account with Google OAuth or email/password in a beautifully designed interface.

![Sign Up](https://github.com/user-attachments/assets/08b8cfb0-f382-4569-b1b9-8363cf877df3)

### Dashboard
Your personal notes dashboard with search, tags, and real-time updates.

![Dashboard](https://github.com/user-attachments/assets/41a5b996-c043-4f10-b780-bf4399c73625)

## Tech Stack

- **Next.js 16** - Modern React framework with App Router
- **TypeScript** - Type-safe development
- **Supabase** - Backend as a Service (authentication, database, real-time)
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yassine-ren56/note-app.git
   cd note-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at https://supabase.com
   - Copy your Supabase URL and Anon Key
   - Run the `supabase/schema.sql` in your Supabase SQL Editor

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

1. **Create a Supabase project** at https://supabase.com
2. **Enable Google Authentication** (optional):
   - Go to Authentication → Providers → Google
   - Enable the provider and configure your OAuth credentials
3. **Run the schema**:
   - Go to SQL Editor → New Query
   - Paste and run the content of `supabase/schema.sql`
4. **Enable Realtime**:
   - Go to Database → Replication
   - Make sure the `notes` table is in the `supabase_realtime` publication

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. **Connect your GitHub repo** to Vercel
2. **Add environment variables** in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy!**

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```
note-app/
├── app/
│   ├── dashboard/      # Notes dashboard page
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   ├── globals.css     # Global styles and animations
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── lib/
│   └── supabase.ts     # Supabase client configuration
├── supabase/
│   └── schema.sql      # Database schema and RLS policies
├── types/
│   └── index.ts        # TypeScript type definitions
└── package.json
```

## Security

This application is built with security in mind:

- **No SQL Injection**: All database operations use Supabase's parameterized query builder
- **Row Level Security**: Users can only view, create, update, and delete their own notes
- **Secure Authentication**: Uses Supabase Auth with OAuth and Email/Password providers
- **No Client-Side SQL**: All database operations go through Supabase's secure API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
