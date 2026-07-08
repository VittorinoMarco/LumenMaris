export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded";

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string | null;
          description: string | null;
          price_cents: number;
          size: string;
          image_url: string | null;
          gender: "uomo" | "donna" | "unisex" | null;
          family: string | null;
          badge: string | null;
          top_notes: string[];
          heart_notes: string[];
          base_notes: string[];
          stripe_price_id: string | null;
          active: boolean;
          inventory: number | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline?: string | null;
          description?: string | null;
          price_cents: number;
          size?: string;
          image_url?: string | null;
          gender?: "uomo" | "donna" | "unisex" | null;
          family?: string | null;
          badge?: string | null;
          top_notes?: string[];
          heart_notes?: string[];
          base_notes?: string[];
          stripe_price_id?: string | null;
          active?: boolean;
          inventory?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          price_cents?: number;
          size?: string;
          image_url?: string | null;
          gender?: "uomo" | "donna" | "unisex" | null;
          family?: string | null;
          badge?: string | null;
          top_notes?: string[];
          heart_notes?: string[];
          base_notes?: string[];
          stripe_price_id?: string | null;
          active?: boolean;
          inventory?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          status: OrderStatus;
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          customer_email: string | null;
          customer_name: string | null;
          shipping_address: Json | null;
          subtotal_cents: number;
          shipping_cents: number;
          total_cents: number;
          currency: string;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          status?: OrderStatus;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          customer_email?: string | null;
          customer_name?: string | null;
          shipping_address?: Json | null;
          subtotal_cents: number;
          shipping_cents: number;
          total_cents: number;
          currency?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          status?: OrderStatus;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          customer_email?: string | null;
          customer_name?: string | null;
          shipping_address?: Json | null;
          subtotal_cents?: number;
          shipping_cents?: number;
          total_cents?: number;
          currency?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_slug: string;
          product_name: string;
          unit_price_cents: number;
          quantity: number;
          image_url: string | null;
          size: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_slug: string;
          product_name: string;
          unit_price_cents: number;
          quantity: number;
          image_url?: string | null;
          size?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_slug?: string;
          product_name?: string;
          unit_price_cents?: number;
          quantity?: number;
          image_url?: string | null;
          size?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type DbProduct = Database["public"]["Tables"]["products"]["Row"];
export type DbOrder = Database["public"]["Tables"]["orders"]["Row"];
export type DbOrderItem = Database["public"]["Tables"]["order_items"]["Row"];
