export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          type: 'fund' | 'expense'
          amount: number
          description: string
          category: string
          date: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          type: 'fund' | 'expense'
          amount: number
          description: string
          category: string
          date: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'fund' | 'expense'
          amount?: number
          description?: string
          category?: string
          date?: string
          user_id?: string
          created_at?: string
        }
      }
      settings: {
        Row: {
          user_id: string
          currency: string
          timezone: string
        }
        Insert: {
          user_id: string
          currency?: string
          timezone: string
        }
        Update: {
          user_id?: string
          currency?: string
          timezone?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}