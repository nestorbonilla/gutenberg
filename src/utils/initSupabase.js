import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qexoogbqjgjsjupjwxhe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQzMDY2NDQyLCJleHAiOjE5NTg2NDI0NDJ9.CSd-FHtNqdeRPqw9sii7_zvBkOnqMFkPb1J0_SsADM4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)    