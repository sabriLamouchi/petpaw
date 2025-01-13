
-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  email text,
  phone text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create pets table
create table pets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  breed text,
  gender text check (gender in ('male', 'female')),
  description text,
  photos text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create veterinarians table
create table veterinarians (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  specialization text,
  location text,
  contact_details text,
  rating numeric(2,1) check (rating >= 0 and rating <= 5),
  available_slots text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create pet_sitters table
create table pet_sitters (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  services text[],
  location text,
  rate numeric(10,2),
  rating numeric(2,1) check (rating >= 0 and rating <= 5),
  available_slots text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table
create table products (
  id uuid default uuid_generate_v4() primary key,
  vendor_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  description text,
  category text,
  price numeric(10,2) not null,
  stock integer not null default 0,
  image_urls text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create adoption_listings table
create table adoption_listings (
  id uuid default uuid_generate_v4() primary key,
  pet_name text not null,
  species text not null,
  breed text,
  age integer,
  gender text check (gender in ('male', 'female')),
  location text,
  description text,
  photos text[],
  contact_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create appointments table
create table appointments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  service_provider_id uuid not null,
  service_type text check (service_type in ('vet', 'sitter')),
  appointment_date timestamp with time zone not null,
  status text check (status in ('pending', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  total numeric(10,2) not null,
  status text check (status in ('pending', 'processing', 'shipped', 'delivered')),
  shipping_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_items table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  quantity integer not null,
  price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chat_rooms table
create table chat_rooms (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) not null,
  provider_id uuid references auth.users(id) not null,
  provider_type text check (provider_type in ('vet', 'sitter')) not null,
  last_message_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  chat_room_id uuid references chat_rooms(id) on delete cascade not null,
  sender_id uuid references auth.users(id) not null,
  content text not null,
  read_at timestamp with time zone
);

-- Create indexes for better query performance
create index chat_rooms_user_id_idx on chat_rooms(user_id);
create index chat_rooms_provider_id_idx on chat_rooms(provider_id);
create index messages_chat_room_id_idx on messages(chat_room_id);

-- Create function to update last_message_at
create or replace function update_chat_room_last_message() returns trigger as $$
begin
  update chat_rooms
  set last_message_at = NEW.created_at
  where id = NEW.chat_room_id;
  return NEW;
end;
$$ language plpgsql;

-- Create trigger to automatically update last_message_at
create trigger update_chat_room_last_message_trigger
  after insert on messages
  for each row
  execute function update_chat_room_last_message();

-- Create RLS policies
alter table profiles enable row level security;
alter table pets enable row level security;
alter table veterinarians enable row level security;
alter table pet_sitters enable row level security;
alter table products enable row level security;
alter table adoption_listings enable row level security;
alter table appointments enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table chat_rooms enable row level security;
alter table messages enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Chat rooms policies
create policy "Users can view their own chat rooms"
  on chat_rooms for select
  using (auth.uid() = user_id or auth.uid() = provider_id);

create policy "Users can create chat rooms"
  on chat_rooms for insert
  with check (auth.uid() = user_id);

-- Messages policies
create policy "Users can view messages in their chat rooms"
  on messages for select
  using (
    exists (
      select 1 from chat_rooms
      where chat_rooms.id = messages.chat_room_id
      and (chat_rooms.user_id = auth.uid() or chat_rooms.provider_id = auth.uid())
    )
  );

create policy "Users can send messages to their chat rooms"
  on messages for insert
  with check (
    exists (
      select 1 from chat_rooms
      where chat_rooms.id = messages.chat_room_id
      and (chat_rooms.user_id = auth.uid() or chat_rooms.provider_id = auth.uid())
    )
  );