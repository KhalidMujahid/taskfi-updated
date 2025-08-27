create table users (
  id uuid default uuid_generate_v4() primary key,
  wallet_address text unique not null,
  full_name text not null,
  email text not null,
  role text not null check (role in ('hirer', 'freelancer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table gigs (
  id uuid default uuid_generate_v4() primary key,
  freelancer_id uuid references users(id) not null,
  title text not null,
  description text not null,
  price numeric not null,
  category text not null,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table jobs (
  id uuid default uuid_generate_v4() primary key,
  gig_id uuid references gigs(id) not null,
  hirer_id uuid references users(id) not null,
  freelancer_id uuid references users(id) not null,
  price numeric not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'completed', 'cancelled', 'disputed')),
  escrow_account text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);