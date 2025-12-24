# Auth Builder - Production-Ready Supabase Authentication

Eliminate auth as a blocker for new projects. Get working email/password authentication in < 10 minutes with this automated Supabase setup.

## Why This Exists

Building auth from scratch is a time sink:
- OAuth callback configuration hell
- Session management complexity
- Database schema design
- Security best practices (RLS, CSRF, etc.)
- Email templates
- Password reset flows

This skill automates all of it using Supabase's battle-tested auth infrastructure.

## What Gets Built

### Backend Infrastructure
- **Local Supabase instance** via Docker (Postgres + Auth + Storage)
- **Database tables** with Row Level Security policies
- **Email templates** for confirmation and password reset
- **OAuth providers** (optional) - Google, GitHub, etc.
- **TypeScript types** auto-generated from your schema

### Frontend Code
- **Auth context/provider** with React hooks
- **Login/Signup/Reset forms** with validation
- **Protected route guards** for private pages
- **User profile management** (optional)
- **Loading states** and error handling

## Prerequisites

### Required
- **Docker Desktop** - For running local Supabase
  - Mac: https://docs.docker.com/desktop/install/mac-install/
  - Windows: https://docs.docker.com/desktop/install/windows-install/
  - Linux: https://docs.docker.com/desktop/install/linux-install/

- **Node.js 18+** - For Supabase CLI and package management
  - Check version: `node --version`
  - Install: https://nodejs.org/

### Optional (for production deployment)
- **Supabase account** - Free tier includes 50,000 MAUs
  - Sign up: https://supabase.com

## Quick Start

1. **Run the skill:**
   ```
   Setup authentication for my React app
   ```

2. **Answer 4 questions:**
   - Which framework? (React, Next.js, Vue, etc.)
   - Auth methods? (Email/password, OAuth, phone)
   - Email confirmation? (No = faster, Yes = more secure)
   - User profiles? (Yes = adds profile table + UI)

3. **Wait ~5 minutes** for scaffolding

4. **Test your auth:**
   - Start dev server: `npm run dev`
   - Navigate to `/signup`
   - Create test account
   - Verify login works

## Frameworks Supported

### React (Vite, Create React App)
- Client-side routing with React Router
- Context API for auth state
- Tailwind CSS for styling (optional)

### Next.js
- **App Router** (recommended) - Server components + client components
- **Pages Router** (legacy) - getServerSideProps for auth checks
- Middleware for route protection

### Vue 3
- Composition API
- Vue Router
- Pinia for state management (optional)

### Svelte/SvelteKit
- Svelte stores for auth state
- SvelteKit hooks for server-side auth
- Progressive enhancement

### Vanilla JS
- Works with any bundler (Webpack, Parcel, Rollup)
- Plain JavaScript auth client
- HTML/CSS components

## Authentication Methods

### 1. Email + Password (Default)
**Pros:**
- Fastest setup (no OAuth config)
- Works offline (local dev)
- No external dependencies

**Cons:**
- Users must remember passwords
- Requires password reset flow

**Best for:** MVPs, internal tools, prototypes

### 2. Social OAuth
**Supported providers:**
- Google
- GitHub
- GitLab
- Facebook
- Twitter/X
- Discord
- Slack

**Pros:**
- No passwords to manage
- Faster signup (one click)
- Users trust known providers

**Cons:**
- Requires OAuth app setup
- External service dependencies
- More complex callback handling

**Best for:** Consumer apps, public SaaS products

### 3. Phone + OTP
**Requires:** SMS provider (Twilio, Vonage, MessageBird)

**Pros:**
- No email required
- Works globally
- Good for mobile apps

**Cons:**
- SMS costs money
- Phone number verification complexity
- International number formats

**Best for:** Mobile-first apps, marketplaces

### 4. Magic Links (Not Recommended)
**Why not recommended:**
- Email delays (30 sec - 5 min)
- Users don't check email during signup
- Mobile UX nightmare (app switching)
- Email providers block/spam them

**When to use:** Never use as primary auth. Only as fallback for password reset.

## Email Confirmation

### Disabled (Recommended for MVP)
- Users can login immediately after signup
- Faster onboarding
- Better conversion rates
- Can enable later

### Enabled (More Secure)
- Users must click email link before login
- Verifies email ownership
- Reduces spam signups
- Requires email provider setup (Resend, SendGrid, etc.)

**Recommendation:** Start disabled, enable when you have real users.

## User Profiles

### Without Profiles
- Only authentication (login/logout)
- User email stored in `auth.users`
- Good for simple apps

### With Profiles
- Adds `public.profiles` table
- Fields: `id`, `email`, `full_name`, `avatar_url`, `created_at`, `updated_at`
- Auto-creates profile on signup (trigger)
- Row Level Security policies included
- CRUD UI components scaffolded

**Recommendation:** Include profiles if you'll need any user data beyond email.

## Architecture

### How Supabase Auth Works

```
┌─────────────────────────────────────────────────┐
│                   Your App                       │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Frontend   │──────│   Backend    │        │
│  │  Components  │      │  (optional)  │        │
│  └──────────────┘      └──────────────┘        │
│         │                      │                 │
└─────────┼──────────────────────┼────────────────┘
          │                      │
          ▼                      ▼
┌─────────────────────────────────────────────────┐
│              Supabase (Local/Cloud)              │
│  ┌──────────────┐      ┌──────────────┐        │
│  │     Auth     │      │   Postgres   │        │
│  │   Service    │──────│   Database   │        │
│  └──────────────┘      └──────────────┘        │
└─────────────────────────────────────────────────┘
```

### Authentication Flow

1. **Signup:**
   ```
   User submits email + password
   → Supabase creates auth.users record
   → Trigger creates public.profiles record (if enabled)
   → Returns JWT token
   → Frontend stores token in localStorage
   ```

2. **Login:**
   ```
   User submits credentials
   → Supabase validates password
   → Returns JWT token + user object
   → Frontend updates auth context
   ```

3. **Session Management:**
   ```
   JWT token in Authorization header
   → Supabase validates token
   → Returns user if valid
   → Auto-refreshes token before expiry
   ```

4. **Protected Routes:**
   ```
   User navigates to /dashboard
   → AuthGuard checks for session
   → Redirects to /login if not authenticated
   → Renders page if authenticated
   ```

## Security Features (Built-In)

### Row Level Security (RLS)
Every table has policies that control access:
```sql
-- Users can only read their own profile
create policy "Users can read own profile"
  on profiles for select
  using ( auth.uid() = id );

-- Users can only update their own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );
```

### JWT Token Security
- Signed with secret key (not exposed to frontend)
- Auto-refresh before expiry (7 days default)
- Stored in httpOnly cookies (XSS protection)
- CSRF protection built-in

### Password Requirements
- Minimum 6 characters (configurable)
- Hashed with bcrypt
- Salted per user
- Never stored in plaintext

### Rate Limiting
- Login attempts: 5 per minute per IP
- Signup: 10 per hour per IP
- Password reset: 3 per hour per email

## Local Development

### Starting Supabase

```bash
npx supabase start
```

This starts:
- **Postgres** on `localhost:5432`
- **API Gateway** on `localhost:54321`
- **Studio UI** on `localhost:54323`
- **Inbucket (Email)** on `localhost:54324`

### Viewing Emails (Local)

Magic links and password reset emails are caught by Inbucket:
- Open http://localhost:54324
- See all sent emails
- Click links to test flows

### Database Studio

Visual database editor:
- Open http://localhost:54323
- View tables, run SQL queries
- Manage users in auth.users
- Configure RLS policies

### Stopping Supabase

```bash
# Stop but keep data
npx supabase stop

# Stop and delete data
npx supabase stop --no-backup
```

## Production Deployment

### 1. Create Supabase Project

```bash
# Sign up at supabase.com
# Create new project (free tier)
# Copy project URL and anon key
```

### 2. Link Local Project

```bash
npx supabase link --project-ref your-project-ref
```

### 3. Push Database

```bash
# Push schema and migrations
npx supabase db push
```

### 4. Update Environment Variables

```env
# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

### 5. Configure Email Provider

**Recommended: Resend** (99% deliverability, generous free tier)

1. Sign up at https://resend.com
2. Get API key
3. Go to Supabase Dashboard → Authentication → Email Templates
4. Configure SMTP settings:
   ```
   Host: smtp.resend.com
   Port: 465
   Username: resend
   Password: <your-resend-api-key>
   ```

**Alternatives:**
- SendGrid (free 100 emails/day)
- Mailgun (free 5,000 emails/month)
- AWS SES (cheapest at scale)

### 6. Enable OAuth (Optional)

#### Google OAuth
1. Go to Google Cloud Console
2. Create OAuth 2.0 Client ID
3. Add redirect URL: `https://yourproject.supabase.co/auth/v1/callback`
4. Copy Client ID + Secret
5. Add to Supabase Dashboard → Authentication → Providers

#### GitHub OAuth
1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Create new OAuth app
3. Callback URL: `https://yourproject.supabase.co/auth/v1/callback`
4. Copy Client ID + Secret
5. Add to Supabase Dashboard

### 7. Deploy Your App

**Vercel (Recommended for Next.js):**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy --prod
```

**Railway/Render/Fly.io:**
```bash
# Follow their deployment docs
```

## Customization

### Changing Session Duration

Edit `supabase/config.toml`:
```toml
[auth]
jwt_expiry = 604800  # 7 days in seconds
# 3600 = 1 hour
# 86400 = 1 day
# 2592000 = 30 days
```

Then restart Supabase:
```bash
npx supabase stop
npx supabase start
```

### Adding Profile Fields

1. Create migration:
```bash
npx supabase migration new add_profile_fields
```

2. Edit migration file:
```sql
alter table public.profiles
  add column bio text,
  add column website text,
  add column twitter text;
```

3. Apply migration:
```bash
npx supabase db reset
```

4. Regenerate types:
```bash
npx supabase gen types typescript --local > src/types/supabase.ts
```

### Custom Email Templates

1. Go to http://localhost:54323 (Studio)
2. Click Authentication → Email Templates
3. Customize HTML templates for:
   - Confirmation email
   - Magic link
   - Password reset
   - Email change

Variables available:
- `{{ .ConfirmationURL }}` - Confirmation link
- `{{ .Token }}` - OTP token
- `{{ .Email }}` - User's email
- `{{ .SiteURL }}` - Your app URL

### Styling Auth Components

The scaffolded components use Tailwind CSS classes. To customize:

1. **Change colors:**
```tsx
// Replace blue-600 with your brand color
className="bg-blue-600 hover:bg-blue-700"
// becomes
className="bg-purple-600 hover:bg-purple-700"
```

2. **Use your design system:**
```tsx
// Replace with your Button component
<button className="...">Login</button>
// becomes
<Button variant="primary">Login</Button>
```

3. **Add your styling library:**
```bash
npm install @mui/material  # Material UI
# or
npm install @chakra-ui/react  # Chakra UI
```

## Troubleshooting

### "Docker is not running"

**Solution:**
1. Open Docker Desktop
2. Wait for Docker to start (whale icon in menu bar)
3. Verify: `docker ps`
4. Run `npx supabase start` again

### "Port 5432 already in use"

**Cause:** Another Postgres instance is running

**Solution 1:** Stop other Postgres
```bash
# Mac
brew services stop postgresql

# Linux
sudo systemctl stop postgresql

# Windows
net stop postgresql
```

**Solution 2:** Change Supabase port
Edit `supabase/config.toml`:
```toml
[db]
port = 5433  # Use different port
```

### "Supabase CLI not found"

**Solution:**
```bash
# Install globally
npm install -g supabase

# Or use npx (no install needed)
npx supabase start
```

### "Types not updating"

**Cause:** You changed database schema but types are stale

**Solution:**
```bash
npx supabase gen types typescript --local > src/types/supabase.ts
```

**Tip:** Add to package.json:
```json
{
  "scripts": {
    "types": "supabase gen types typescript --local > src/types/supabase.ts"
  }
}
```

### "Auth not working after deploy"

**Checklist:**
- [ ] Updated environment variables with production URLs
- [ ] Pushed database migrations: `npx supabase db push`
- [ ] Configured email provider in Supabase dashboard
- [ ] Added production URL to `site_url` in dashboard
- [ ] OAuth redirect URLs include production domain

### "User stuck in 'confirming' state"

**Cause:** Email confirmation enabled but email not sent

**Solution:**
1. Disable confirmation in `supabase/config.toml`:
```toml
[auth]
enable_confirmations = false
```

2. Or manually confirm user in SQL:
```sql
update auth.users
set email_confirmed_at = now()
where email = 'user@example.com';
```

### "Session lost on page refresh"

**Cause:** Session not persisting to localStorage

**Solution:** Check Supabase client config:
```typescript
export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,  // Must be true
    autoRefreshToken: true,
  },
})
```

## Cost Analysis

### Free Tier (Supabase)
- **50,000 MAUs** (monthly active users)
- **500 MB database space**
- **1 GB file storage**
- **2 GB bandwidth**
- **50,000 monthly emails**

**Good for:** MVPs, side projects, early startups

### Pro Tier ($25/month)
- **100,000 MAUs** ($0.00325 per additional MAU)
- **8 GB database space**
- **100 GB file storage**
- **50 GB bandwidth**
- **100,000 monthly emails**

**Break-even vs Clerk:** ~15,000 MAUs

### Comparison to Alternatives

| Provider | Free MAUs | Pro Price | Cost per MAU |
|----------|-----------|-----------|--------------|
| **Supabase** | 50,000 | $25/mo | $0.00325 |
| **Clerk** | 10,000 | $25/mo | $0.02 |
| **Auth0** | 7,500 | $35/mo | ~$0.05 |
| **Firebase** | Unlimited* | Pay-as-you-go | $0.006 |

*Firebase free tier has daily limits, not monthly

## Migration from Other Auth

### From Firebase Auth

1. Export users from Firebase console
2. Import to Supabase:
```bash
npx supabase db seed
```

3. Update frontend imports:
```typescript
// Before
import { getAuth } from 'firebase/auth'

// After
import { supabase } from './lib/supabase'
```

### From Auth0

1. Use Auth0 export API
2. Transform users to Supabase format
3. Bulk insert via SQL

### From NextAuth.js

1. Keep database schema
2. Add Supabase alongside NextAuth
3. Gradually migrate users (dual auth)
4. Remove NextAuth once migration complete

## FAQ

### Can I use Supabase Auth with my existing database?

Yes, but requires manual setup:
1. Install Supabase Auth extension in your Postgres
2. Run migration scripts
3. Configure connection settings

**Easier:** Let Supabase manage the database.

### Do I need a Supabase account for local dev?

No. Local Supabase runs entirely in Docker, no cloud account needed.

### Can I self-host Supabase in production?

Yes. Supabase is open-source:
- Use their Docker Compose files
- Deploy to your own infra
- Still free, just more work

### What if Supabase shuts down?

- Supabase is open-source (Apache 2.0 license)
- Export data: `pg_dump` your database
- Self-host if needed
- Postgres is portable (any provider)

### Can I use this with a mobile app?

Yes:
- React Native: Use `@supabase/supabase-js`
- Flutter: Use `supabase_flutter`
- iOS/Android: Use `supabase-swift` / `supabase-kt`

### How do I add roles/permissions?

1. Add `role` column to profiles:
```sql
alter table public.profiles
  add column role text default 'user';
```

2. Create role enum:
```sql
create type user_role as enum ('user', 'admin', 'moderator');
```

3. Update RLS policies:
```sql
create policy "Admins can do anything"
  on profiles for all
  using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );
```

### Can I customize the login UI?

Yes, the scaffolded components are yours to modify:
- Change styling (Tailwind classes)
- Add brand logo
- Custom validation
- Social login buttons
- Password strength indicator

### How do I test auth flows?

1. **Unit tests:** Mock Supabase client
```typescript
jest.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      signIn: jest.fn(),
      signUp: jest.fn(),
    },
  },
}))
```

2. **Integration tests:** Use test database
```bash
npx supabase start --db-test
```

3. **E2E tests:** Use Playwright/Cypress with test users

## Resources

### Official Docs
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)

### Related
- [Auth Thoughts & Research](../../docs/auth_thoughts.md)
- [Supabase vs Alternatives](../../docs/auth_thoughts.md#also-considered-but-not-recommended)

## Support

### Skill Issues
If the skill fails or produces incorrect code:
1. Check Docker is running: `docker ps`
2. Check Supabase CLI installed: `npx supabase --version`
3. Report issue with error logs

### Supabase Issues
If Supabase itself has problems:
1. Check Supabase status: https://status.supabase.com
2. Search GitHub issues: https://github.com/supabase/supabase/issues
3. Ask in Discord: https://discord.supabase.com

## License

MIT License - See LICENSE file in root directory

---

**Built for builders who want to ship products, not fiddle with auth.**
