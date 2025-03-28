## AI Review Website - MVP Backend

This project is a Next.js application that allows users to review AI tools and services.

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Supabase project:
   - Create a new project at [https://supabase.com](https://supabase.com)
   - Create the following tables in your Supabase database:
     - `users`: User profiles
     - `products`: AI products/tools to be reviewed
     - `reviews`: User reviews for products
   - See the database schema in `src/types/database.ts` for required fields

4. Set up your environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase project details:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Features

- User authentication (signup, login, logout)
- Product listing and details
- Product reviews (create, read, update, delete)
- User profile management

### API Routes

- Authentication:
  - POST `/api/auth/signup`: Register a new user
  - POST `/api/auth/login`: Authenticate a user
  - POST `/api/auth/logout`: Sign out a user
  - POST `/api/auth/reset-password`: Request password reset
  - GET `/api/auth/user`: Get current user info

- Products:
  - GET `/api/products`: List all products
  - POST `/api/products`: Create a new product
  - GET `/api/products/[id]`: Get a specific product
  - GET `/api/products/search`: Search products

- Reviews:
  - GET `/api/products/[id]/reviews`: Get reviews for a product
  - POST `/api/products/[id]/reviews`: Add a review for a product
  - PUT `/api/reviews/[id]`: Update a review
  - DELETE `/api/reviews/[id]`: Delete a review
  - GET `/api/users/me/reviews`: Get current user's reviews

### Technologies

- Next.js (App Router)
- TypeScript
- Supabase (Auth & Database)
- Tailwind CSS
- shadcn UI

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
