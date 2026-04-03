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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          documento_cpf: string | null
          telefone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          documento_cpf?: string | null
          telefone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      multas: {
        Row: {
          id: string
          user_id: string
          numero_auto: string
          data_infracao: string
          tipo_infracao: string | null
          descricao: string | null
          orgao_autuador: string | null
          uf_infracao: string | null
          placa: string
          valor: number | null
          desconto_disponivel: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          numero_auto: string
          data_infracao: string
          tipo_infracao?: string | null
          descricao?: string | null
          orgao_autuador?: string | null
          uf_infracao?: string | null
          placa: string
          valor?: number | null
          desconto_disponivel?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['multas']['Insert']>
      }
      defesas: {
        Row: {
          id: string
          user_id: string
          multa_id: string | null
          status: string
          conteudo_gerado: Json | null
          url_documento: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          multa_id?: string | null
          status?: string
          conteudo_gerado?: Json | null
          url_documento?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['defesas']['Insert']>
      }
      ia_testes: {
        Row: {
          id: string
          user_id: string
          entrada: string
          resposta: string | null
          nota: number | null
          observacao: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          entrada: string
          resposta?: string | null
          nota?: number | null
          observacao?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['ia_testes']['Insert']>
      }
      assinaturas: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: string
          plan_id: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: string
          plan_id?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['assinaturas']['Insert']>
      }
      pagamentos: {
        Row: {
          id: string
          user_id: string
          multa_id: string | null
          assinatura_id: string | null
          valor: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          multa_id?: string | null
          assinatura_id?: string | null
          valor: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['pagamentos']['Insert']>
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
