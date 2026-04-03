-- Habilitar a extensão UUID (se já não estiver)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. Criação das Tabelas
-- ==============================================================================

-- Tabela: PROFILES
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    documento_cpf TEXT UNIQUE,
    telefone TEXT,
    role TEXT DEFAULT 'user' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: ASSINATURAS
CREATE TABLE public.assinaturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL DEFAULT 'incomplete',
    plan_id TEXT,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: MULTAS
CREATE TABLE public.multas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    auto_infracao TEXT NOT NULL,
    data_infracao TIMESTAMPTZ NOT NULL,
    orgao_autuador TEXT,
    uf_infracao VARCHAR(2),
    placa TEXT NOT NULL,
    valor DECIMAL(10, 2),
    desconto_disponivel BOOLEAN DEFAULT false,
    status_multa TEXT DEFAULT 'pendente',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: DEFESAS
CREATE TABLE public.defesas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    multa_id UUID REFERENCES public.multas(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'rascunho',
    conteudo_gerado JSONB,
    url_documento TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: PAGAMENTOS
CREATE TABLE public.pagamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    multa_id UUID REFERENCES public.multas(id) ON DELETE SET NULL,
    assinatura_id UUID REFERENCES public.assinaturas(id) ON DELETE SET NULL,
    valor DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. Triggers (Updated_At auto)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_assinaturas_updated
    BEFORE UPDATE ON public.assinaturas FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_multas_updated
    BEFORE UPDATE ON public.multas FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_defesas_updated
    BEFORE UPDATE ON public.defesas FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_pagamentos_updated
    BEFORE UPDATE ON public.pagamentos FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ==============================================================================
-- 3. Trigger & Function: Auto Create Profile
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger disparado sempre que um novo registro entrar no auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 4. RLS - Row Level Security (Políticas)
-- ==============================================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assinaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;

-- ----------------------------
-- PROFILES RLS
-- ----------------------------
CREATE POLICY "Usuários podem ver seu próprio perfil"
ON public.profiles FOR SELECT
USING ( auth.uid() = id );

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );

-- ----------------------------
-- ASSINATURAS RLS
-- ----------------------------
CREATE POLICY "Usuários podem visualizar a própria assinatura"
ON public.assinaturas FOR SELECT
USING ( auth.uid() = user_id );
-- Nenhuma policy de INSERT/UPDATE, pois o sistema/webhook deve gerenciar as assinaturas usando a Service Role.

-- ----------------------------
-- MULTAS RLS
-- ----------------------------
CREATE POLICY "Usuários podem gerenciar as próprias multas"
ON public.multas FOR ALL
USING ( auth.uid() = user_id )
WITH CHECK ( auth.uid() = user_id );

-- ----------------------------
-- DEFESAS RLS
-- ----------------------------
CREATE POLICY "Usuários podem gerenciar as próprias defesas/casos"
ON public.defesas FOR ALL
USING ( auth.uid() = user_id )
WITH CHECK ( auth.uid() = user_id );

-- ----------------------------
-- PAGAMENTOS RLS
-- ----------------------------
CREATE POLICY "Usuários podem gerenciar seus próprios pagamentos locais/registro"
ON public.pagamentos FOR ALL
USING ( auth.uid() = user_id )
WITH CHECK ( auth.uid() = user_id );
