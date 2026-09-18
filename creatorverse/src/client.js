import { createClient } from '@supabase/supabase-js';

const URL = 'https://qhgstgmczzznlgeommev.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZ3N0Z21jenp6bmxnZW9tbWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NzE2MzksImV4cCI6MjA3MDM0NzYzOX0.QbMGQiYYeudodriCx18OvToIjHYJcGcEmaFc8BhoBEM';
export const supabase = createClient(URL, API_KEY);