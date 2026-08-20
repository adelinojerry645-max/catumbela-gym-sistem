-- =====================================================================
-- CATUMBELA GYM SYSTEM — ESQUEMA DA BASE DE DADOS (PostgreSQL)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. UTILIZADORES E PERFIS
-- ---------------------------------------------------------------------
CREATE TYPE perfil_utilizador AS ENUM ('administrador', 'recepcionista', 'personal_trainer', 'membro');

CREATE TABLE utilizadores (
    id              SERIAL PRIMARY KEY,
    nome_completo   VARCHAR(150) NOT NULL,
    email           VARCHAR(150) UNIQUE,
    telefone        VARCHAR(30) UNIQUE,
    senha_hash      TEXT NOT NULL,
    perfil          perfil_utilizador NOT NULL,
    foto_url        TEXT,
    ativo           BOOLEAN DEFAULT TRUE,
    criado_em       TIMESTAMP DEFAULT NOW(),
    atualizado_em   TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 2. PLANOS
-- ---------------------------------------------------------------------
CREATE TABLE planos (
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(80) NOT NULL,           -- Mensal, Trimestral, Anual, etc.
    descricao       TEXT,
    duracao_dias    INTEGER NOT NULL,               -- 30, 90, 365...
    preco_kz        NUMERIC(12,2) NOT NULL,
    ativo           BOOLEAN DEFAULT TRUE,
    criado_em       TIMESTAMP DEFAULT NOW(),
    atualizado_em   TIMESTAMP DEFAULT NOW()
);

-- Histórico de alterações de preço de cada plano (auditoria específica de preços)
CREATE TABLE planos_historico_precos (
    id              SERIAL PRIMARY KEY,
    plano_id        INTEGER REFERENCES planos(id) NOT NULL,
    preco_anterior  NUMERIC(12,2) NOT NULL,
    preco_novo      NUMERIC(12,2) NOT NULL,
    alterado_por    INTEGER REFERENCES utilizadores(id),
    alterado_em     TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 3. MEMBROS
-- ---------------------------------------------------------------------
CREATE TYPE estado_membro AS ENUM ('ativo', 'vencido', 'suspenso', 'cancelado');

CREATE TABLE membros (
    id                  SERIAL PRIMARY KEY,
    utilizador_id       INTEGER REFERENCES utilizadores(id),   -- login opcional (área do membro)
    numero_membro       VARCHAR(20) UNIQUE NOT NULL,           -- CG-000125
    nome_completo       VARCHAR(150) NOT NULL,
    telefone            VARCHAR(30),
    email               VARCHAR(150),
    data_nascimento     DATE,
    endereco            TEXT,
    foto_url            TEXT,
    contacto_emergencia VARCHAR(150),
    observacoes         TEXT,
    plano_id            INTEGER REFERENCES planos(id),
    data_inscricao      DATE NOT NULL DEFAULT CURRENT_DATE,
    data_vencimento     DATE,
    estado              estado_membro DEFAULT 'ativo',
    qr_code             TEXT UNIQUE,                            -- token único do cartão
    criado_em           TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 4. FUNCIONÁRIOS (recepcionistas, personal trainers, admin)
-- ---------------------------------------------------------------------
CREATE TABLE funcionarios (
    id              SERIAL PRIMARY KEY,
    utilizador_id   INTEGER REFERENCES utilizadores(id) NOT NULL,
    cargo           VARCHAR(80),
    salario_kz      NUMERIC(12,2),
    data_admissao   DATE,
    ativo           BOOLEAN DEFAULT TRUE
);

CREATE TABLE registos_ponto (
    id              SERIAL PRIMARY KEY,
    funcionario_id  INTEGER REFERENCES funcionarios(id) NOT NULL,
    data            DATE NOT NULL,
    hora_entrada    TIME,
    hora_saida      TIME,
    estado          VARCHAR(20),   -- Presente, Falta, Atraso
    horas_extra     NUMERIC(4,2) DEFAULT 0
);

CREATE TABLE turnos_caixa (
    id                  SERIAL PRIMARY KEY,
    funcionario_id      INTEGER REFERENCES funcionarios(id) NOT NULL,
    aberto_em           TIMESTAMP NOT NULL,
    fechado_em          TIMESTAMP,
    total_dinheiro_kz   NUMERIC(12,2) DEFAULT 0,
    total_tpa_kz        NUMERIC(12,2) DEFAULT 0,
    total_express_kz    NUMERIC(12,2) DEFAULT 0,
    total_referencia_kz NUMERIC(12,2) DEFAULT 0,
    total_geral_kz      NUMERIC(12,2) DEFAULT 0
);

-- ---------------------------------------------------------------------
-- 5. PAGAMENTOS E RECIBOS
-- ---------------------------------------------------------------------
CREATE TYPE metodo_pagamento AS ENUM ('dinheiro', 'tpa', 'express', 'referencia', 'transferencia', 'outro');
CREATE TYPE tipo_pagamento AS ENUM ('mensalidade', 'produto', 'personal_training', 'outro');
CREATE TYPE estado_aprovacao AS ENUM ('pendente', 'aprovado', 'rejeitado');

CREATE TABLE pagamentos (
    id              SERIAL PRIMARY KEY,
    membro_id       INTEGER REFERENCES membros(id),
    funcionario_id  INTEGER REFERENCES funcionarios(id),   -- quem recebeu
    tipo            tipo_pagamento NOT NULL,
    valor_kz        NUMERIC(12,2) NOT NULL,
    metodo          metodo_pagamento NOT NULL,
    referencia_txn  VARCHAR(100),        -- nº de referência/TPA quando aplicável
    observacao      TEXT,
    turno_caixa_id  INTEGER REFERENCES turnos_caixa(id),
    criado_em       TIMESTAMP DEFAULT NOW()
);

-- Transferências bancárias (IBAN ou nº de telefone) registadas pela recepção/administrador
-- ficam pendentes até o administrador aprovar, mediante verificação do comprovativo anexado.
CREATE TABLE pagamentos_pendentes (
    id                  SERIAL PRIMARY KEY,
    membro_id           INTEGER REFERENCES membros(id) NOT NULL,
    valor_kz            NUMERIC(12,2) NOT NULL,
    destino             VARCHAR(20) NOT NULL,     -- 'iban' ou 'telefone'
    comprovativo_url    TEXT NOT NULL,            -- imagem/print do comprovativo, obrigatório
    submetido_por       INTEGER REFERENCES utilizadores(id) NOT NULL,
    estado              estado_aprovacao DEFAULT 'pendente',
    aprovado_por        INTEGER REFERENCES utilizadores(id),
    pagamento_id        INTEGER REFERENCES pagamentos(id),  -- preenchido quando aprovado
    criado_em           TIMESTAMP DEFAULT NOW(),
    resolvido_em        TIMESTAMP
);

CREATE TABLE recibos (
    id              SERIAL PRIMARY KEY,
    numero_recibo   VARCHAR(30) UNIQUE NOT NULL,   -- REC-2026-000458
    pagamento_id    INTEGER REFERENCES pagamentos(id) NOT NULL,
    qr_validacao    TEXT UNIQUE,
    emitido_em      TIMESTAMP DEFAULT NOW()
);

-- Fatura: documento fiscal formal, distinto do recibo simples
CREATE TABLE faturas (
    id              SERIAL PRIMARY KEY,
    numero_fatura   VARCHAR(30) UNIQUE NOT NULL,   -- FAT-2026-000123
    membro_id       INTEGER REFERENCES membros(id) NOT NULL,
    pagamento_id    INTEGER REFERENCES pagamentos(id),
    valor_kz        NUMERIC(12,2) NOT NULL,
    descricao       TEXT,
    emitida_por     INTEGER REFERENCES utilizadores(id),
    emitida_em      TIMESTAMP DEFAULT NOW()
);

-- Personal Trainers (dados específicos, para além do registo em utilizadores/funcionarios)
CREATE TABLE personal_trainers (
    id              SERIAL PRIMARY KEY,
    funcionario_id  INTEGER REFERENCES funcionarios(id) NOT NULL,
    especialidade   VARCHAR(150),
    ativo           BOOLEAN DEFAULT TRUE
);

-- ---------------------------------------------------------------------
-- 6. CONTROLO DE ACESSOS
-- ---------------------------------------------------------------------
CREATE TABLE acessos (
    id              SERIAL PRIMARY KEY,
    membro_id       INTEGER REFERENCES membros(id) NOT NULL,
    entrada_em      TIMESTAMP NOT NULL,
    saida_em        TIMESTAMP,
    metodo_deteccao VARCHAR(20),   -- qr_code, numero, nome
    registado_por   INTEGER REFERENCES funcionarios(id)
);

-- ---------------------------------------------------------------------
-- 7. STOCK E VENDAS (POS)
-- ---------------------------------------------------------------------
CREATE TABLE produtos (
    id              SERIAL PRIMARY KEY,
    codigo          VARCHAR(30) UNIQUE NOT NULL,
    nome            VARCHAR(120) NOT NULL,
    categoria       VARCHAR(60),
    stock_atual     INTEGER DEFAULT 0,
    stock_minimo    INTEGER DEFAULT 5,
    preco_compra_kz NUMERIC(12,2),
    preco_venda_kz  NUMERIC(12,2) NOT NULL,
    fornecedor      VARCHAR(120),
    ativo           BOOLEAN DEFAULT TRUE,
    criado_em       TIMESTAMP DEFAULT NOW()
);

CREATE TYPE tipo_movimento AS ENUM ('entrada', 'saida');

CREATE TABLE movimentos_stock (
    id              SERIAL PRIMARY KEY,
    produto_id      INTEGER REFERENCES produtos(id) NOT NULL,
    tipo            tipo_movimento NOT NULL,
    quantidade      INTEGER NOT NULL,
    motivo          VARCHAR(120),      -- Compra, Venda, Ajuste, Perda...
    registado_por   INTEGER REFERENCES funcionarios(id),
    criado_em       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vendas (
    id              SERIAL PRIMARY KEY,
    membro_id       INTEGER REFERENCES membros(id),        -- opcional
    funcionario_id  INTEGER REFERENCES funcionarios(id) NOT NULL,
    turno_caixa_id  INTEGER REFERENCES turnos_caixa(id),
    total_kz        NUMERIC(12,2) NOT NULL,
    metodo          metodo_pagamento NOT NULL,
    criado_em       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE venda_itens (
    id              SERIAL PRIMARY KEY,
    venda_id        INTEGER REFERENCES vendas(id) NOT NULL,
    produto_id      INTEGER REFERENCES produtos(id) NOT NULL,
    quantidade      INTEGER NOT NULL,
    preco_unit_kz   NUMERIC(12,2) NOT NULL,
    subtotal_kz     NUMERIC(12,2) NOT NULL
);

-- ---------------------------------------------------------------------
-- 8. NOTIFICAÇÕES
-- ---------------------------------------------------------------------
CREATE TABLE notificacoes (
    id              SERIAL PRIMARY KEY,
    membro_id       INTEGER REFERENCES membros(id) NOT NULL,
    titulo          VARCHAR(150),
    mensagem        TEXT NOT NULL,
    tipo            VARCHAR(40),     -- vencimento_proximo, vencido, promocao
    lida            BOOLEAN DEFAULT FALSE,
    enviada_em      TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 9. AUDITORIA
-- ---------------------------------------------------------------------
CREATE TABLE auditoria (
    id              SERIAL PRIMARY KEY,
    utilizador_id   INTEGER REFERENCES utilizadores(id) NOT NULL,
    acao            VARCHAR(150) NOT NULL,     -- "Registou pagamento", "Alterou preço do plano"
    entidade        VARCHAR(60),               -- tabela/entidade afetada
    entidade_id     INTEGER,
    valor_anterior  JSONB,
    valor_novo      JSONB,
    criado_em       TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- ÍNDICES ÚTEIS
-- ---------------------------------------------------------------------
CREATE INDEX idx_membros_numero ON membros(numero_membro);
CREATE INDEX idx_membros_estado ON membros(estado);
CREATE INDEX idx_pagamentos_membro ON pagamentos(membro_id);
CREATE INDEX idx_acessos_membro ON acessos(membro_id);
CREATE INDEX idx_acessos_entrada ON acessos(entrada_em);
CREATE INDEX idx_produtos_codigo ON produtos(codigo);
CREATE INDEX idx_auditoria_utilizador ON auditoria(utilizador_id);
