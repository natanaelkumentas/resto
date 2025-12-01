import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
            .from("menu_items")
            .select("*")
            .eq("menu_id", id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (!data) {
            return NextResponse.json({ error: "Menu not found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: "Server error", detail: String(err) },
            { status: 500 }
        );
    }
}
