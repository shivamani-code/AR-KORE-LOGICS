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
begin
  insert into public.users (id, name, email, role, career_path)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'New User'),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'student'),
    coalesce(new.raw_user_meta_data->>'careerPath', 'Artificial Intelligence')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed initial mentors
insert into public.mentors (id, name, title, company, expertise, experience, bio, availability, rating, session_count)
values 
('m_ananya', 'Dr. Ananya Sharma', 'AI Research Scientist', 'Google DeepMind', array['Python', 'Machine Learning', 'Neural Networks', 'AI Ethics'], '8+ Years', 'CBSE curriculum advisor. Specializes in making complex AI/ML concepts easy to grasp for school and college beginners.', 'Mon, Wed, Fri at 4:00 PM', 4.9, 142),
('m_rohan', 'Rohan Varma', 'Senior Data Scientist', 'AR Kore Logics', array['Data Science', 'Python', 'Gen AI', 'Prompt Engineering'], '6 Years', 'Passionate about teaching Python programming, data analytics, and generative AI systems.', 'Tue, Thu at 3:00 PM', 4.8, 98)
on conflict (id) do nothing;

-- Seed initial posts
insert into public.posts (id, author_id, author_name, author_role, title, content, tags, upvotes, comment_count, created_at, upvoted_by)
values
('p_cbse_prep', 'm_ananya', 'Dr. Ananya Sharma', 'Mentor', 'CBSE Class 9 AI Study Guide & Exam Blueprint', 'Hello students! I have compiled the official CBSE Class 9 AI syllabus study guide. Focus heavily on the 5 stages of the AI Project Cycle (especially the 4Ws canvas) and Python programming basics (lists, variables, and loops). Make sure to practice the sample questions posted in the resources section. Good luck with your preparation!', array['Study Group', 'Resources'], 18, 2, timezone('utc'::text, '2026-06-24T10:00:00.000Z'::timestamp), array[]::text[]),
('p_python_tips', 'm_rohan', 'Rohan Varma', 'Mentor', 'Mastering Python Loops & Lists for Class 9 AI', 'Python list syntax and nested loops can be tricky at first. Remember that Python uses 0-based indexing. For loops are perfect for iterating over list items, and while loops work best when you don''t know the exact count beforehand. Let me know if you want to run a mock coding session!', array['Project Showcase', 'Questions'], 12, 0, timezone('utc'::text, '2026-06-24T09:00:00.000Z'::timestamp), array[]::text[])
on conflict (id) do nothing;

-- Seed initial comments
insert into public.comments (id, post_id, author_id, author_name, content, created_at)
values
('c_c1', 'p_cbse_prep', 'system', 'mani', 'Thank you Dr. Ananya! The Python loop exercises were really helpful. Will we get questions from matrices too?', timezone('utc'::text, '2026-06-24T10:30:00.000Z'::timestamp)),
('c_c2', 'p_cbse_prep', 'm_ananya', 'Dr. Ananya Sharma (Mentor)', 'Yes, basic matrix representation is part of the Math for AI week. Just focus on visual grids and dimensions, no complex math calculations needed!', timezone('utc'::text, '2026-06-24T11:00:00.000Z'::timestamp))
on conflict (id) do nothing;
