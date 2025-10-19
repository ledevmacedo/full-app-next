# Guia de Configuração: Better Auth + Supabase + Prisma

Este guia explica passo a passo como configurar autenticação completa (email/password e OAuth) usando Better Auth, Supabase como banco de dados PostgreSQL e Prisma como ORM em um projeto Next.js.

---

## 📋 Pré-requisitos

- Node.js instalado
- Projeto Next.js criado
- Conta no Supabase (gratuita)
- Yarn ou npm

---

## 🎯 O que será implementado

- ✅ Autenticação com email e senha
- ✅ Registro de novos usuários
- ✅ Login de usuários existentes
- ✅ Sessões gerenciadas automaticamente
- ✅ Banco de dados PostgreSQL (Supabase)
- ✅ ORM Prisma para type-safety
- ✅ Suporte para OAuth (GitHub, Google) - opcional

---

## 📦 Passo 1: Instalar Dependências

### 1.1 Instalar Better Auth e Prisma

```bash
yarn add better-auth @prisma/client @prisma/adapter-pg
yarn add -D prisma
```

**O que cada pacote faz:**
- `better-auth` - Biblioteca de autenticação
- `@prisma/client` - Cliente Prisma para queries no banco
- `@prisma/adapter-pg` - Adaptador PostgreSQL para Better Auth
- `prisma` - CLI do Prisma (dev dependency)

---

## 🗄️ Passo 2: Configurar Supabase

### 2.1 Criar projeto no Supabase

1. Acesse https://supabase.com
2. Crie uma conta (gratuita)
3. Clique em "New Project"
4. Escolha um nome e senha para o banco de dados
5. Aguarde a criação do projeto (~2 minutos)

### 2.2 Obter credenciais de conexão

1. No dashboard do Supabase, vá em **Settings** → **Database**
2. Role até **Connection String**
3. Copie as duas connection strings:
   - **Connection Pooling** (porta 6543) - para runtime
   - **Direct Connection** (porta 5432) - para migrations

### 2.3 Adicionar variáveis de ambiente

Crie ou edite o arquivo `.env` na raiz do projeto:

```env
# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here-generate-a-random-string
BETTER_AUTH_URL=http://localhost:3000

# Supabase Database (via Prisma)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Project
NEXT_PUBLIC_URL_BASE_APP=http://localhost:3000
```

**Importante:**
- Substitua `[PROJECT_REF]`, `[PASSWORD]` e `[REGION]` pelos valores reais do Supabase
- Gere um `BETTER_AUTH_SECRET` aleatório (pode usar: `openssl rand -base64 32`)

---

## 🔧 Passo 3: Configurar Prisma

### 3.1 Inicializar Prisma

```bash
npx prisma init
```

Isso cria a pasta `prisma/` com o arquivo `schema.prisma`.

### 3.2 Configurar o schema do Prisma

Edite `prisma/schema.prisma`:

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider  = "postgresql"
    url       = env("DATABASE_URL")
    directUrl = env("DIRECT_URL")
}

model User {
    id            String    @id @default(cuid())
    name          String?
    email         String    @unique
    emailVerified Boolean   @default(false)
    image         String?
    createdAt     DateTime  @default(now())
    updatedAt     DateTime  @updatedAt
    sessions      Session[]
    accounts      Account[]
}

model Session {
    id        String   @id @default(cuid())
    expiresAt DateTime
    token     String   @unique
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    ipAddress String?
    userAgent String?
    userId    String
    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
    id                    String    @id @default(cuid())
    accountId             String
    providerId            String
    userId                String
    accessToken           String?
    refreshToken          String?
    idToken               String?
    accessTokenExpiresAt  DateTime?
    refreshTokenExpiresAt DateTime?
    scope                 String?
    password              String?
    createdAt             DateTime  @default(now())
    updatedAt             DateTime  @updatedAt
    user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@unique([providerId, accountId])
}

model Verification {
    id         String   @id @default(cuid())
    identifier String
    value      String
    expiresAt  DateTime
    createdAt  DateTime @default(now())
    updatedAt  DateTime @updatedAt

    @@unique([identifier, value])
}
```

**O que cada model faz:**
- `User` - Armazena dados dos usuários
- `Session` - Gerencia sessões ativas
- `Account` - Armazena credenciais (senha hash) e OAuth tokens
- `Verification` - Tokens para verificação de email e reset de senha

### 3.3 Criar as tabelas no Supabase

```bash
npx prisma migrate dev --name init
```

Isso vai:
- Criar as tabelas no PostgreSQL do Supabase
- Gerar o Prisma Client
- Criar a pasta `prisma/migrations/`

### 3.4 Gerar o Prisma Client

```bash
npx prisma generate
```

---

## 🔐 Passo 4: Configurar Better Auth

### 4.1 Criar arquivo de configuração do servidor

Crie `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
});
```

### 4.2 Criar arquivo de configuração do cliente

Crie `lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URL_BASE_APP || "http://localhost:3000"
});

export const { signIn, signUp, useSession } = authClient;
```

### 4.3 Criar rotas de API

Crie `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth.handler);
```

Isso cria automaticamente todas as rotas necessárias:
- `/api/auth/sign-up/email` - Registro
- `/api/auth/sign-in/email` - Login
- `/api/auth/sign-out` - Logout
- `/api/auth/session` - Verificar sessão
- E outras...

---

## 📝 Passo 5: Criar Schemas de Validação

### 5.1 Schema de Login

Crie `schemas/sign-in-schema.ts`:

```typescript
import * as z from "zod";

export const signInSchema = z.object({
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres.",
    }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
```

### 5.2 Schema de Registro

Crie `schemas/sign-up-schema.ts`:

```typescript
import * as z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter no mínimo 2 caracteres.",
    }).max(100, {
        message: "O nome deve ter no máximo 100 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres.",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
```

---

## 🎨 Passo 6: Implementar Formulários

### 6.1 Formulário de Login

A lógica principal do formulário de login:

```typescript
import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInSchema } from "@/schemas/sign-in-schema";

async function onSubmit(values: SignInSchema) {
    try {
        const { data, error } = await signIn.email({
            email: values.email,
            password: values.password,
        });

        if (error) {
            // Tratar erro
            console.error("Erro ao fazer login:", error);
            return;
        }

        // Login bem-sucedido - redirecionar
        window.location.href = "/dashboard";
    } catch (err) {
        console.error("Erro inesperado:", err);
    }
}
```

### 6.2 Formulário de Registro

A lógica principal do formulário de registro:

```typescript
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpSchema } from "@/schemas/sign-up-schema";

async function onSubmit(values: SignUpSchema) {
    try {
        const { data, error } = await signUp.email({
            email: values.email,
            password: values.password,
            name: values.name,
        });

        if (error) {
            // Tratar erro
            console.error("Erro ao criar conta:", error);
            return;
        }

        // Registro bem-sucedido - redirecionar
        window.location.href = "/dashboard";
    } catch (err) {
        console.error("Erro inesperado:", err);
    }
}
```

---

## 🔒 Passo 7: Proteger Rotas (Opcional)

### 7.1 Verificar sessão em componentes

```typescript
import { useSession } from "@/lib/auth-client";

export function ProtectedComponent() {
    const { data: session, isPending } = useSession();

    if (isPending) return <p>Carregando...</p>;
    if (!session) return <p>Você precisa fazer login</p>;

    return (
        <div>
            <p>Bem-vindo, {session.user.name}!</p>
            <p>Email: {session.user.email}</p>
        </div>
    );
}
```

### 7.2 Criar middleware para proteger rotas (Server-side)

Crie `middleware.ts` na raiz:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("better-auth.session_token");

    // Se não tem sessão e está tentando acessar rota protegida
    if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/signIn", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
```

---

## ⚠️ Passo 8: Configurar RLS no Supabase (IMPORTANTE)

### 8.1 Desabilitar RLS

Como você está usando Better Auth (não Supabase Auth), o RLS pode bloquear suas queries.

**No Supabase Dashboard:**
1. Vá em **Database** → **Tables**
2. Para cada tabela (User, Session, Account, Verification):
   - Clique na tabela
   - Vá em **RLS** (Row Level Security)
   - Clique em **Disable RLS**

**Por quê?**
- Supabase RLS é para quando você usa Supabase Auth
- Com Better Auth, sua aplicação acessa o banco diretamente via Prisma
- RLS habilitado bloquearia todas as queries

---

## 🧪 Passo 9: Testar

### 9.1 Iniciar o servidor

```bash
yarn dev
```

### 9.2 Testar registro

1. Acesse `http://localhost:3000/signUp`
2. Preencha o formulário
3. Clique em "Create Account"
4. Deve redirecionar para `/dashboard`

### 9.3 Verificar no Supabase

1. Vá no Supabase Dashboard
2. **Table Editor** → **User**
3. Você deve ver o usuário criado

### 9.4 Testar login

1. Acesse `http://localhost:3000/signIn`
2. Use o email/senha criados
3. Clique em "Sign In"
4. Deve redirecionar para `/dashboard`

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se as connection strings no `.env` estão corretas
- Certifique-se de que substituiu `[PASSWORD]`, `[PROJECT_REF]` e `[REGION]`

### Erro: "Email already exists"
- O email já foi registrado
- Use outro email ou delete o usuário no Supabase

### Erro: "Invalid credentials"
- Email ou senha incorretos
- Verifique se está usando o email/senha corretos

### Não redireciona após login/registro
- Verifique se a página `/dashboard` existe
- Veja o console do navegador para erros

### RLS bloqueando queries
- Desabilite RLS em todas as tabelas no Supabase
- Veja o Passo 8.1

---

## 📚 Recursos Adicionais

### Documentação Oficial
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)

### OAuth (Opcional)

Para adicionar login com GitHub/Google:

1. Configure o provider no Better Auth (`lib/auth.ts`):
```typescript
socialProviders: {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
}
```

2. Adicione as credenciais no `.env`
3. Use no formulário:
```typescript
authClient.signIn.social({ 
    provider: "github", 
    callbackURL: "/dashboard" 
})
```

---

## ✅ Checklist Final

- [ ] Dependências instaladas
- [ ] Projeto criado no Supabase
- [ ] Variáveis de ambiente configuradas
- [ ] Schema do Prisma criado
- [ ] Migrations executadas
- [ ] Better Auth configurado (servidor e cliente)
- [ ] Rotas de API criadas
- [ ] Schemas de validação criados
- [ ] Formulários implementados
- [ ] RLS desabilitado no Supabase
- [ ] Testado registro e login
- [ ] Usuários aparecendo no Supabase

---

## 🎉 Conclusão

Agora você tem um sistema de autenticação completo e seguro com:
- ✅ Registro de usuários
- ✅ Login com email/senha
- ✅ Sessões gerenciadas automaticamente
- ✅ Banco de dados PostgreSQL (Supabase)
- ✅ Type-safety com Prisma
- ✅ Pronto para produção

**Próximos passos sugeridos:**
- Adicionar verificação de email
- Implementar reset de senha
- Adicionar OAuth (GitHub, Google)
- Criar sistema de roles/permissões
- Implementar refresh tokens
