import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  'https://blwspnikhuxviqiuhrgl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd3NwbmlraHV4dmlxaXVocmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5OTMxNjIsImV4cCI6MjA0MjU2OTE2Mn0.UNebBZjIX-VGvpbRuIqn_pDTGw1gAEUvr24tYBqmQ3k';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
