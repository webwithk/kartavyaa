import { supabase } from "../lib/supabase";

export const testSupabaseConnection = async () => {
    console.log("=== TESTING SUPABASE ===");

    //Test each table one by one
    const tables = [
        "portfolio_expertise",
        "portfolio_projects",
        "portfolio_services",
        "portfolio_stats",
    ]

    for (const table of tables) {
        console.log(`\n--- Testing table: ${table} ---`);
        try {
            const { data, error } = await supabase
                .from(table)
                .select('*');

                if (error) {
                    console.error(`ERROR in ${table}:`, error);
                } else {
                    console.log(`SUCCESS in ${table}:`, data);
                } 
            } catch (err) {
                console.error(`CRASH in ${table}:`, err);
            }
        }
               
}