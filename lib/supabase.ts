import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export type Tables = {
  transactions: {
    id: string;
    type: 'fund' | 'expense';
    amount: number;
    description: string;
    category: string;
    date: string;
    user_id: string;
    created_at: string;
  };
  settings: {
    user_id: string;
    currency: string;
    timezone: string;
  };
};