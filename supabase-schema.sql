-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create public.users table (linked to auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null unique,
  role text not null default 'student' check (role in ('student', 'mentor', 'admin')),
  career_path text,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on users
alter table public.users enable row level security;

-- Create policies for public.users
create policy "Public profiles are viewable by everyone" on public.users
  for select using (true);

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- Create public.mentors table
create table public.mentors (
  id text primary key,
  name text not null,
  title text not null,
  company text not null,
  expertise text[] not null,
  experience text not null,
  bio text not null,
  availability text not null,
  rating numeric default 5.0 check (rating >= 0 and rating <= 5),
  session_count integer default 0
);

-- Enable RLS on mentors
alter table public.mentors enable row level security;

-- Create policies for public.mentors
create policy "Mentors are viewable by everyone" on public.mentors
  for select using (true);

create policy "Only admins can modify mentors" on public.mentors
  for all using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create sessions table
create table public.sessions (
  id text primary key,
  student_id uuid references public.users(id) on delete cascade not null,
  mentor_id text references public.mentors(id) on delete cascade not null,
  type text not null,
  date text not null,
  status text not null check (status in ('pending', 'confirmed', 'cancelled')) default 'confirmed',
  notes text
);

-- Enable RLS on sessions
alter table public.sessions enable row level security;

-- Create policies for public.sessions
create policy "Users can view their own sessions" on public.sessions
  for select using (auth.uid() = student_id);

create policy "Users can insert their own sessions" on public.sessions
  for insert with check (auth.uid() = student_id);

create policy "Users can update their own sessions" on public.sessions
  for update using (auth.uid() = student_id);

-- Create public.posts table
create table public.posts (
  id text primary key,
  author_id text not null, -- Can be uuid string (student) or text (mentor seed ID)
  author_name text not null,
  author_role text not null,
  title text not null,
  content text not null,
  tags text[] default '{}'::text[] not null,
  upvotes integer default 0 not null,
  comment_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  upvoted_by text[] default '{}'::text[] not null
);

-- Enable RLS on posts
alter table public.posts enable row level security;

-- Create policies for public.posts
create policy "Posts are viewable by everyone" on public.posts
  for select using (true);

create policy "Authenticated users can create posts" on public.posts
  for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own posts" on public.posts
  for update using (
    author_id = auth.uid()::text or 
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create public.comments table
create table public.comments (
  id text primary key,
  post_id text references public.posts(id) on delete cascade not null,
  author_id text not null,
  author_name text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on comments
alter table public.comments enable row level security;

-- Create policies for public.comments
create policy "Comments are viewable by everyone" on public.comments
  for select using (true);

create policy "Authenticated users can create comments" on public.comments
  for insert with check (auth.role() = 'authenticated');

-- Create public.progress table
create table public.progress (
  user_id uuid references public.users(id) on delete cascade primary key,
  career_path text not null,
  completed_modules integer[] default '{}'::integer[] not null,
  current_module_id integer default 1 not null,
  completion_percentage integer default 0 not null,
  streak_days integer default 0 not null,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on progress
alter table public.progress enable row level security;

-- Create policies for public.progress
create policy "Users can view their own progress" on public.progress
  for select using (auth.uid() = user_id);

create policy "Users can update their own progress" on public.progress
  for update using (auth.uid() = user_id);

create policy "Users can insert their own progress" on public.progress
  for insert with check (auth.uid() = user_id);

-- Trigger to automatically create a public.users profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
declare
  user_role text;
begin
  if lower(new.email) = 'hpmani91@gmail.com' then
    user_role := 'admin';
  else
    user_role := coalesce(new.raw_user_meta_data->>'role', 'student');
  end if;

  insert into public.users (id, name, email, role, career_path)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'New User'),
    new.email,
    user_role,
    coalesce(new.raw_user_meta_data->>'careerPath', 'Artificial Intelligence')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-grant full admin & unlocked access to hpmani91@gmail.com
update public.users set role = 'admin' where lower(email) = 'hpmani91@gmail.com';

-- Mentors, Posts, and Comments tables are created empty by default.


