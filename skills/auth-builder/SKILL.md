# Auth Builder Skill - Production-Ready Supabase Auth via CLI

You are an expert at scaffolding production-ready authentication using Supabase Auth. Your goal is to eliminate auth as a blocker for new projects by automating the entire setup in < 10 minutes.

## Your Mission

Set up complete, working authentication with:
- Backend auth infrastructure (Supabase)
- Frontend auth components (framework-specific)
- Security best practices by default
- Local development environment
- Production deployment ready

## Step 1: Understand the Project Context

First, gather information:

1. **Detect existing setup:**
   - Check if Supabase is already initialized (`supabase/config.toml` exists)
   - Check what framework is being used (package.json, file structure)
   - Check if Docker is running (`docker ps`)

2. **Ask user questions** (use AskUserQuestion tool):

**Question 1: Framework**
- Header: "Framework"
- Question: "Which framework are you using?"
- Options:
  - React (Create React App or Vite)
  - Next.js (App Router or Pages Router)
  - Vue 3 (Composition API)
  - Svelte/SvelteKit
  - Vanilla JS (any bundler)

**Question 2: Auth Method**
- Header: "Auth Method"
- Question: "Which authentication methods do you want?"
- Options:
  - Email + Password only (Recommended - simplest)
  - Email + Password + Social OAuth (Google, GitHub)
  - Email + Password + Social OAuth + Phone OTP
  - All methods (kitchen sink)
- multiSelect: false

**Question 3: Email Confirmation**
- Header: "Email Confirm"
- Question: "Require email confirmation on signup?"
- Options:
  - No (Recommended - users can login immediately)
  - Yes (More secure, but requires email provider setup)
- multiSelect: false

**Question 4: User Profiles**
- Header: "User Profiles"
- Question: "Include user profile management?"
- Options:
  - Yes (Adds profile table + CRUD UI)
  - No (Just authentication, no profiles)
- multiSelect: false

## Step 2: Initialize Supabase Backend

Execute these steps using the Bash tool:

### 2.1 Check Prerequisites

```bash
# Check Docker is running
docker ps
```

If Docker is not running, tell user to start Docker Desktop first.

### 2.2 Initialize Supabase (if not exists)

```bash
# Check if already initialized
if [ ! -d "supabase" ]; then
  npx supabase init
fi
```

### 2.3 Install Supabase Client

Detect package manager (check for pnpm-lock.yaml, yarn.lock, package-lock.json):

```bash
# Use appropriate package manager
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### 2.4 Start Local Supabase

```bash
npx supabase start
```

Save the output - it contains:
- `API URL`: http://127.0.0.1:54321
- `anon key`: (public key)
- `service_role key`: (admin key - never expose to frontend)

### 2.5 Configure Auth Settings

Edit `supabase/config.toml` based on user's answers:

```toml
[auth]
enabled = true
site_url = "http://localhost:3000"  # Adjust based on framework
additional_redirect_urls = ["http://localhost:3000"]

# Email confirmation
enable_signup = true
enable_confirmations = false  # Set to true if user wants email confirmation

# Session settings
jwt_expiry = 604800  # 7 days

# External OAuth providers (add if user selected OAuth)
[auth.external.google]
enabled = true  # Only if OAuth selected
client_id = "env(GOOGLE_CLIENT_ID)"
secret = "env(GOOGLE_CLIENT_SECRET)"

[auth.external.github]
enabled = true  # Only if OAuth selected
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_CLIENT_SECRET)"
```

### 2.6 Create User Profile Table (if requested)

If user wants profiles, create migration:

```bash
npx supabase migration new create_profiles
```

Then write to the migration file (in `supabase/migrations/`):

```sql
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Apply migration:

```bash
npx supabase db reset  # Applies all migrations
```

### 2.7 Generate TypeScript Types

```bash
npx supabase gen types typescript --local > src/types/supabase.ts
```

## Step 3: Scaffold Frontend Code

Based on the framework selected, scaffold the appropriate files:

### 3.1 Environment Variables

Create `.env.local` (or `.env` for non-Next.js):

```bash
# For Next.js (prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key_from_supabase_start>

# For Vite (prefix with VITE_)
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<anon_key_from_supabase_start>

# For other frameworks
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<anon_key_from_supabase_start>
```

Add to `.gitignore`:

```bash
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore
```

Create `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3.2 Supabase Client

Read the appropriate template from `templates/` directory based on framework.

**For React/Next.js:** Create `src/lib/supabase.ts`
**For Vue:** Create `src/lib/supabase.js`
**For Svelte:** Create `src/lib/supabase.ts`

See templates directory for framework-specific implementations.

### 3.3 Auth Context/Provider

Create auth context that provides:
- `user` - current user object or null
- `session` - current session or null
- `signUp(email, password)` - register new user
- `signIn(email, password)` - login
- `signOut()` - logout
- `resetPassword(email)` - send password reset email
- `loading` - authentication state loading

### 3.4 Auth Components

Scaffold these UI components:

1. **LoginForm** - Email/password login form
2. **SignupForm** - Registration form
3. **PasswordReset** - Forgot password form
4. **AuthGuard** - Protected route wrapper
5. **UserProfile** - Profile edit form (if profiles enabled)

Use the templates in `templates/` directory for each framework.

### 3.5 Protected Route Example

Create an example protected page/route to demonstrate the auth guard.

## Step 4: Verify Setup

After scaffolding, create a checklist for the user:

```markdown
## Auth Setup Complete!

### Test Your Auth Flow

1. **Start your dev server:**
   \`npm run dev\` (or appropriate command)

2. **Test signup:**
   - Navigate to /signup (or your signup route)
   - Create a test account
   - Verify you're redirected to the app

3. **Test login:**
   - Log out
   - Navigate to /login
   - Sign in with test account
   - Verify you're authenticated

4. **Test protected routes:**
   - Try accessing protected pages while logged out
   - Verify redirect to login

5. **Test logout:**
   - Click logout button
   - Verify session cleared

### What Was Created

- ✓ Supabase local instance (Docker)
- ✓ Auth configuration in \`supabase/config.toml\`
- ✓ TypeScript types generated
- ✓ Auth client in \`src/lib/supabase\`
- ✓ Auth context/provider
- ✓ Login/Signup/Reset components
- ✓ Protected route guard
${user_wants_profiles ? '- ✓ User profiles table + CRUD UI' : ''}

### Next Steps

**For production deployment:**

1. Create Supabase project at https://supabase.com
2. Link your project: \`npx supabase link --project-ref <your-project-ref>\`
3. Push database: \`npx supabase db push\`
4. Update \`.env.local\` with production keys
5. Deploy your app

**To add OAuth providers:**

1. Get OAuth credentials (Google Cloud Console, GitHub Apps)
2. Add to Supabase dashboard under Authentication > Providers
3. Update \`supabase/config.toml\` with client IDs
4. Uncomment OAuth buttons in components

**To enable email confirmation:**

1. Set up email provider (Resend, SendGrid, etc.)
2. Update \`supabase/config.toml\`: \`enable_confirmations = true\`
3. Customize email templates in Supabase dashboard

### Resources

- Supabase Local Development: https://supabase.com/docs/guides/cli
- Auth Helpers: https://supabase.com/docs/guides/auth
- Row Level Security: https://supabase.com/docs/guides/auth/row-level-security
```

## Important Notes

1. **Security Defaults:**
   - Use HTTP-only cookies for session storage
   - Never expose service_role key to frontend
   - Enable Row Level Security on all tables
   - Use prepared statements (Supabase does this automatically)

2. **Local Development:**
   - Supabase runs in Docker (ports 5432, 54321, 54323)
   - Database resets on `npx supabase stop --no-backup`
   - Migrations are version controlled in `supabase/migrations/`

3. **Framework-Specific Considerations:**
   - **Next.js App Router:** Use Server Components for auth checks when possible
   - **Next.js Pages Router:** Use `getServerSideProps` for protected pages
   - **React SPA:** Client-side auth only, use auth guard components
   - **SvelteKit:** Use hooks for server-side auth checks

4. **Error Handling:**
   - Always check `error` in Supabase responses
   - Show user-friendly messages
   - Log errors for debugging

5. **Type Safety:**
   - Regenerate types after schema changes: `npx supabase gen types typescript --local`
   - Use generated types for autocomplete

## Templates Reference

Use templates from `skills/auth-builder/templates/` directory:

- `react-client.ts` - React/Vite Supabase client
- `nextjs-client.ts` - Next.js Supabase client
- `vue-client.js` - Vue 3 Supabase client
- `svelte-client.ts` - Svelte Supabase client
- `react-auth-context.tsx` - React auth provider
- `react-login-form.tsx` - React login component
- `react-signup-form.tsx` - React signup component
- etc.

## Output Format

Provide clear, step-by-step output showing:
1. What you're doing
2. Files being created/modified
3. Commands being run
4. Any errors encountered
5. Final checklist for user

Use the TodoWrite tool to track progress:
- Initialize Supabase
- Configure auth settings
- Create migrations (if profiles)
- Generate types
- Scaffold frontend code
- Create example protected route
- Verify setup

Mark each step complete as you finish it.
