
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lpbdnkbvpijcinjhkwjl.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYmRua2J2cGlqY2luamhrd2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODQ0OTYsImV4cCI6MjA1MjI2MDQ5Nn0.MoKO02bwx_j1Or0sX0C1V2qKBu9rhlKlB6xcJkgKE8A"
export const supabase = createClient(supabaseUrl, supabaseKey)

