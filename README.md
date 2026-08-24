# Bora pro Carrinho?

Escala de turnos do testemunho público com carrinho. PWA em JavaScript puro, sem framework, hospedado no GitHub Pages, com entrada por e-mail e senha (Firebase Authentication) e escala sincronizada no Firestore.

## Arquivos

| Arquivo | Para que serve |
| --- | --- |
| `index.html` | Página do app. **É aqui que ficam os dados do Firebase.** |
| `estilo.css` | Todo o visual: paletas, modo escuro, fontes, componentes. |
| `app.js` | O aplicativo: agenda, turnos, participantes, locais, login e sincronização. |
| `sw.js` | Service worker (funciona offline). Tem a constante `VERSAO`. |
| `manifest.webmanifest` | Nome, cores e ícones da instalação. |
| `instalar.html` | Página de instalação para mandar no grupo. |
| `icone-192.png`, `icone-512.png`, `icone-maskable-512.png`, `icone-180.png`, `favicon.png` | Ícones do app (feitos a partir da imagem do carrinho). |
| `logo-app.png` | A mesma imagem, redonda, usada no logo da tela de entrada. |
| `.nojekyll` | Impede o GitHub Pages de processar os arquivos com Jekyll. |

## Ver no computador

Basta abrir o `index.html` com dois cliques — o app roda direto do arquivo. O que **só funciona publicado em https** (GitHub Pages) é a instalação como aplicativo e o modo offline do service worker.

## Publicar no GitHub Pages

1. Crie o repositório e envie todos os arquivos na raiz (não em subpasta).
2. No repositório: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Espere um ou dois minutos e abra `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

> A cada publicação, **troque o número em `sw.js`** (`const VERSAO = "bora-v1"` → `"bora-v2"` → ...). Sem isso o celular continua abrindo a versão antiga que está em cache.

## Configurar o Firebase

Sem essa parte o app funciona igual, mas salvando **só no aparelho**. Com ela, a mesma escala aparece em todos os celulares.

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e crie um projeto.
2. **Authentication → Sign-in method → E-mail/senha → Ativar.**
3. **Firestore Database → Criar banco de dados** (pode escolher modo produção; as regras estão abaixo).
4. **Configurações do projeto → Seus apps → Web `</>`** → registre o app e copie o objeto `firebaseConfig`.
5. Cole os valores em `index.html`, dentro de `window.FIREBASE_CONFIG`:

```js
window.FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

6. **Authentication → Settings → Authorized domains**: adicione `seu-usuario.github.io`.

Essas chaves são públicas por natureza (ficam no navegador de quem usa). Quem protege os dados são as regras do Firestore.

### Regras do Firestore

Sem publicar as regras, o Firestore recusa tudo e o app mostra o ponto vermelho de "Sincronização com erro". Cole em **Firestore Database → Regras** e clique em **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /carrinhos/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Ou seja: só quem entrou com e-mail e senha lê e escreve — que é o que permite a congregação editar a mesma escala. Se quiser fechar mais, troque a condição por uma lista de códigos permitidos, por exemplo:

```
allow read, write: if request.auth != null
  && (doc == "u_" + request.auth.uid || doc in ["carrinho-central", "carrinho-norte"]);
```

### Quando aparece o ponto vermelho

Em Configurações, toque na linha do seu e-mail: o app mostra o código do erro e qual documento está tentando usar.

| O que aparece | O que fazer |
| --- | --- |
| `permission-denied` | As regras acima não foram publicadas. |
| `not-found` / `failed-precondition` | O Firestore Database ainda não foi criado no projeto. |
| `unavailable` | Sem internet no momento; ele sincroniza sozinho quando voltar. |
| `unauthenticated` | Saia da conta e entre de novo. |

Também confira, em **Authentication → Settings → Authorized domains**, se `seu-usuario.github.io` está na lista.

### Código do grupo

Dentro do app: **engrenagem → Conta e sincronização → Código do grupo**. Todo mundo que digitar o mesmo código vê e edita a mesma escala. Em branco, os dados ficam só na conta de quem entrou.

## Como os dados são guardados

- No aparelho: `localStorage`, nas chaves `bora:db` (escala) e `bora:cfg` (preferências).
- Na nuvem: coleção `carrinhos`, um documento por grupo (ou por usuário), com `{ dados, atualizadoEm, por }`.
- A junção é por item e por horário de alteração (`at`): vence a versão mais recente. Nada é apagado de verdade — itens excluídos ficam marcados com `rm: true`, o que evita que voltem do outro aparelho.

## Personalização rápida

- **Cores:** a lista `PALETAS`, no começo de `app.js`. O fundo do app é calculado a partir da cor escolhida.
- **Fontes:** a lista `FONTES` em `app.js` — se acrescentar uma, inclua também no `<link>` do Google Fonts em `index.html`.
- **Modalidades** (Carrinho, Display, Mesa): a lista `MODALIDADES` em `app.js`.
- **Versão do SDK do Firebase:** a constante `SDK` em `app.js`.

---

Desenvolvido por Alan Correa ©
