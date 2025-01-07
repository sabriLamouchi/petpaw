# PetPaw - Pet Care Services App

A comprehensive mobile application for pet owners, service providers, and vendors, built with React Native and Supabase.

## Features

- User Authentication
- Pet Profiles Management
- Veterinary Services
- Pet Sitting Services
- Pet Products Marketplace
- Pet Adoption Platform
- Appointment Scheduling
- Order Management

## Tech Stack

- Frontend: React Native with Expo (TypeScript)
- Backend: Supabase (PostgreSQL)
- Storage: Supabase Storage
- Authentication: Supabase Auth

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Supabase Account

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project:
   - Go to https://supabase.com
   - Create a new project
   - Copy the SQL from `supabase/schema.sql` and run it in the SQL editor
   - Get your project URL and anon key

4. Create a `.env` file in the root directory:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm start
```

6. Run on your preferred platform:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Project Structure

```
app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API and service integrations
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── assets/             # Images, fonts, etc.
├── supabase/           # Supabase related files
└── App.tsx            # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
