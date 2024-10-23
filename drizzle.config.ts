import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:o8E5ryfbnwSX@ep-royal-cloud-a1yao7af.ap-southeast-1.aws.neon.tech/Kiddos%20tales?sslmode=require',
  },
  verbose: true,
  strict: true,
})