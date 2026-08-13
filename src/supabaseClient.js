import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://bhxjoeslbqfrxcmijfwi.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeGpvZXNsYnFmcnhjbWlqZndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1OTc0OTcsImV4cCI6MjEwMjE3MzQ5N30.4WhipcyPJP-CU3Y5kX417uyqLM3qfcdvJ9swz_qljws';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
