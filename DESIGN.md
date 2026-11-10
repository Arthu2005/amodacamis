# A Moda Camis: análise da marca e direção de arte

## 1. O que o Instagram mostra (análise de 10/11/2026)

**Perfil:** @amodacamis, "Camis Roupas e Acessórios", 7,4 mil seguidores.
**Bio:** "Vestindo com elegância e modernidade do PP ao G1." Loja física em Curvelo/MG.
Seg–sex 10h às 19h, sáb 9h30 às 13h. Compra online pelo WhatsApp wa.me/5538998908899.
**Destaques:** Resort 2026, Coleção Celebrar, Coleção Primavera, Primavera 2026, Horário de Funcionamento,
Política de Troca, Nossa Loja, Reinauguração.

**Logo:** a palavra "CAMIS" escrita à mão em preto, com um coração no pingo do "i", dentro de uma moldura retangular fina,
e "ROUPAS E ACESSÓRIOS" logo abaixo, sobre fundo salmão/pêssego.
→ Elementos que adotamos: **moldura fina retangular**, **pêssego** como cor-assinatura e **preto** como tinta.
→ Falta: o arquivo vetorial (SVG/PDF) do logo. O site usa uma versão tipográfica até a loja enviar o original.

**Como a loja posta:** cada peça aparece em um trio de fotos:
1. **Foto de campanha** (estúdio bege, mercado municipal, vila mediterrânea), com luz de revista;
2. **Foto na loja**, com a dona ou a equipe vestindo a peça entre as araras;
3. **Reel** mostrando caimento e movimento.

**Cenário da loja (fotos internas):** parede azul-céu suave, araras douradas, cabides de madeira,
prateleira com flores amarelas, piso de madeira clara e roupas organizadas em degradê de tons pastel
(off-white, amarelo-manteiga, verde-água, azul).

**Tom de voz:** próximo, entusiasmado e curto ("Vestido Tule maravilhoso!", "Um look jeans para arrasar!"),
sempre com a grade de tamanhos ("Disponível 38 ao 46").

**Peças públicas identificadas (posts de 20/10 a 04/11/2026):**
| Peça | Legenda real | Tamanhos | Fotos |
|---|---|---|---|
| Vestido Tule (degradê marrom/azul) | "Vestido Tule maravilhoso!" | 38 ao 46 | campanha + loja + reel |
| Look jeans (colete + saia longa) | "Um look jeans para arrasar!" #docetrama | 34 ao 46 | estúdio + loja + reel |
| Vestido azul-claro frente única | sem legenda | não informado | campanha externa + loja + reel |
| Vestido longo estampado marinho | sem legenda | não informado | estúdio frente/costas + loja |

Nenhum post informa preço. **O site não inventa preços:** mostra "Consulte o valor" até a loja cadastrar.
Os nomes das duas últimas peças são descritivos e ficam marcados como "a confirmar" no painel.

**Atenção sobre direitos:** as fotos de campanha (estúdio, mercado, vila) parecem ser das marcas fornecedoras
(ex.: Doce Trama). Antes de publicar, a loja precisa confirmar que tem permissão para usá-las. As fotos feitas
na loja são próprias.

## 2. Conceito

**"A boutique da cidade, com olhar de revista."**
O Instagram já tem o essencial: luz bonita, peças com caimento e a dona vestindo a roupa. O site organiza isso
como um editorial: fotos grandes, muito respiro, tipografia de revista e o WhatsApp como o "provador".

Três ideias guiam tudo:
1. **Fotografia em primeiro lugar.** A interface fica neutra para a roupa ser a cor da página.
2. **Moldura Camis.** A moldura fina do logo vira o elemento gráfico do site (selos, legendas, CTA).
3. **Conversa, não checkout.** Cada caminho termina em uma mensagem pronta no WhatsApp.

## 3. Paleta

A paleta vem do logo (pêssego e preto) e da loja (azul-céu, dourado e madeira). Usamos pouca cor:
o pêssego é assinatura, não fundo de tudo.

| Token | Hex | Papel |
|---|---|---|
| `ink` | `#171412` | texto, botões principais, logo |
| `porcelain` | `#FAF7F3` | fundo base |
| `linen` | `#F1EAE2` | seções alternadas, cartões |
| `peach` | `#EBB39B` | cor-assinatura (selos, detalhes, rodapé) |
| `peach-deep` | `#B9735A` | textos de destaque sobre claro (contraste AA) |
| `sky` | `#D9E6EE` | eco da parede da loja (uso raro) |
| `gold` | `#B08D57` | filetes e microdetalhes (eco das araras) |
| `stone` | `#7A706A` | texto secundário |
| `line` | `#E4DAD0` | divisórias |
| `whatsapp` | `#1FA855` | só no botão de WhatsApp |

## 4. Tipografia

- **Display: Bodoni Moda** (serifa didone de alto contraste, a linguagem das revistas de moda).
  Títulos grandes, itálico para ênfase, tracking levemente negativo.
- **Texto e interface: Jost** (geométrica no espírito da Futura, clássica em moda).
  Menus e rótulos em caixa alta com espaçamento largo (0,2em).
- Escala: 12 / 14 / 16 / 20 / 28 / 40 / 64 / 96 px. No celular o display vai até 56 px.

## 5. Layout e ritmo

- Grade de 12 colunas, margem de 6vw no desktop e 20px no celular.
- Espaço generoso: seções de 120–160px no desktop e 80px no celular.
- Imagens sempre em proporção de retrato (3:4 ou 4:5), como no Instagram, sem cortar a peça.
- Composições assimétricas (imagem grande + imagem deslocada + texto) no lugar de grades iguais.
- Cantos retos (raio 0) nas fotos, como em revista. Botões em formato de pílula só no WhatsApp.

## 6. Movimento

- Entrada das seções: fade + deslocamento de 24px, 700ms, ease `cubic-bezier(.2,.7,.1,1)`.
- Fotos: zoom lento de 1,0 → 1,04 no hover (1,2s). Hero com Ken Burns muito sutil.
- Links: sublinhado que cresce da esquerda.
- Tudo desligado com `prefers-reduced-motion`.

## 7. Componentes-chave

- **Header**: transparente sobre o hero, sólido ao rolar; logo central no celular; botão "Atendimento".
- **Selo Camis**: texto em caixa alta dentro da moldura fina (ex.: NOVIDADE, PRIMAVERA 2026).
- **Cartão de peça**: foto 3:4 com troca para a 2ª foto no hover, nome em Jost, preço ou "Consulte o valor".
- **Botão WhatsApp**: verde, pílula, sempre com o texto da ação ("Consultar no WhatsApp").
- **Sacola de interesse**: gaveta lateral; no celular ocupa a tela inteira.

## 8. Evitar

Gradientes, sombras pesadas, ícones decorativos, cores de marketplace, cartões com borda arredondada
e sombra, carrosséis automáticos rápidos e qualquer texto institucional inventado.
