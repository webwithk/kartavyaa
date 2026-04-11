import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const response= await supabase
        .from('portfolio_expertise')
        .select('*')

        console.log("env:", import.meta.env)

        console.log("full response:", response)
        const { data, error } = response;

        console.log("data:", data)
        console.log("error:", error)
  } catch (err) {
    console.log("CATCH ERROR:", err)}
}