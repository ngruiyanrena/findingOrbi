import { createClient } from '@supabase/supabase-js'

export const supabase = createClient (
    "https://usdkpglbmcrjdwveyjkv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZGtwZ2xibWNyamR3dmV5amt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ1ODkyNTgsImV4cCI6MTk3MDE2NTI1OH0.f0nF1DbZ1ERAQy03Kz2RBkkX7bx341ACIFBL4tyVwjY"
)