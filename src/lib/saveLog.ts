// src/lib/saveLog.ts
import { supabase } from './supabaseClient';

export async function saveLog(entry: { date: string; menu: string; note: string }) {
  const { data, error } = await supabase.from('logs').insert([entry]);
  if (error) {
    console.error('保存失敗:', error.message);
  }
  return { data, error };
}
