import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Compila tutti i campi" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    const admin = createAdminClient();
    if (!admin) {
      console.info("Contact form (no Supabase):", body);
      return NextResponse.json({ ok: true, mode: "local" });
    }

    const { error } = await admin.from("contact_messages").insert({
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
    });

    if (error) {
      console.error("contact_messages insert:", error);
      return NextResponse.json(
        { error: "Impossibile inviare il messaggio" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}
