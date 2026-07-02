# JumperFour Tecnologia — MazyOS

Esse workspace é a operação do negócio. Aqui ficam as regras de como
o Claude lê o contexto, aprende com correções e executa tarefas no
padrão da JumperFour.

## O que é esse workspace

Operação da JumperFour Tecnologia. Projetos de engenharia, materiais
comerciais, conteúdo institucional e ferramentas internas — tudo
organizado por área, com processos e entregas documentados.

**Estrutura de pastas:**
- `_memoria/` — quem é a empresa, como falamos, foco atual
- `identidade/` — marca aplicada em tudo que o sistema gera
- `saidas/` — entregas geradas (site, propostas, materiais)
- `dados/` — arquivos a analisar
- `marketing/` — campanhas, conteúdo, mídia paga
- `scripts/` — automações e scripts internos

## Sobre a empresa

JumperFour Tecnologia é uma empresa de engenharia e tecnologia B2B.
Atuamos em Automação Predial, Segurança Eletrônica, Infraestrutura de TI
e Carregadores Veiculares Elétricos, atendendo ambientes de Missão Crítica:
aeroportos, hospitais, data centers, arenas, portos e indústrias.
Equipe de engenheiros especializados, muitos ex-Honeywell, com capacidade
de projeto, implantação, comissionamento e manutenção 24/7.

## Setores e frentes

- **Comercial:** propostas técnicas, apresentações, materiais de venda
- **Engenharia:** projetos executivos, documentação técnica, SOPs
- **Marketing:** site institucional, conteúdo, presença digital
- **Operações:** contratos de manutenção, monitoramento remoto, processos internos

## O que mais fazemos aqui

- Propostas técnicas e comerciais para licitações e clientes diretos
- Site e portal institucional com simulação de monitoramento BMS/SCA
- Materiais de apresentação para calls e reuniões de vendas
- Conteúdo institucional com linguagem técnica e de autoridade

## Tom de voz

Corporativo, técnico e seguro. Passa solidez de engenharia — dados
concretos, referências a normas, foco em Missão Crítica e Life Safety.
Interno pode ser mais direto; externo mantém autoridade e credibilidade.

Evitar: linguagem de guru, promessas vagas, emojis em documentos formais,
termos como "alavancar", "sinergia", "simples e fácil".

## Regras do sistema

- Contexto do negócio: ler `_memoria/empresa.md`, `_memoria/preferencias.md`
  e `_memoria/estrategia.md` antes de qualquer resposta ou entrega
- Identidade visual: ler `identidade/design-guide.md` antes de qualquer
  tarefa visual (carrossel, site, proposta, slide)
- Skills: verificar `.claude/skills/` antes de executar qualquer tarefa —
  se existir skill relevante, seguir ela
- Entregas do site: salvar em `saidas/jumperfour-site/`
- Propostas e materiais comerciais: salvar em `saidas/`
- Ao corrigir algo com valor duradouro, perguntar se salva na memória
- Ao concluir tarefa que mudou contexto relevante, perguntar se atualiza
- Ao concluir tarefa sem skill mas claramente repetível, perguntar se vira skill

## Aprender com correções

Quando o usuário corrigir algo ou dar instrução permanente ("sempre que...",
"evita...", "da próxima vez...", "prefiro assim"), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde salvar:
- Sobre o negócio → `_memoria/empresa.md`
- Sobre estilo e tom → `_memoria/preferencias.md`
- Sobre prioridades → `_memoria/estrategia.md`
- Regra de comportamento → `CLAUDE.md`

## Manter contexto atualizado

Ao terminar tarefa que mudou algo relevante (cliente novo, skill nova,
mudança de foco, ferramenta instalada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo inteiro.

Não perguntar em tarefas pontuais, perguntas simples ou mudanças já salvas.
Rode `/atualizar` pra uma varredura completa quando houver dúvida.

## Criação de skills

1. Verificar se existe template em `templates/skills/`
2. Perguntar se é específica desse projeto ou universal:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md`
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md`
3. Calibrar com `_memoria/empresa.md` e `_memoria/preferencias.md`
4. Criar arquivos de apoio dentro da pasta da skill se necessário
5. Seguir o fluxo da skill-creator nativa do Claude Code

## Ferramentas conectadas

- [ ] Notion
- [ ] Gmail
- [ ] Google Calendar
- [ ] Google Ads
- [ ] Meta Ads
- [ ] Instagram (Meta Graph API — skill `/aprovar-post`)
