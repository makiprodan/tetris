# 📋 Notas de Release - Tetris

## 🚀 v1.1.0 - Melhorias de Responsividade e Tradução
**Data de Lançamento:** Janeiro 2025

### ✨ Novas Funcionalidades
- **Responsividade vertical aprimorada** para desktop
- **Interface totalmente traduzida** para português brasileiro
- **Correção da rotação da peça I** (tetromino linha)

### 🔧 Melhorias Técnicas
- Canvas adapta-se automaticamente à altura da viewport (70%)
- Função `resizeCanvas` otimizada para diferentes tamanhos de tela
- Listener de redimensionamento de janela adicionado
- Proporção 1:2 mantida em todas as resoluções

### 🌐 Localização Completa
- Todos os textos do jogo traduzidos para português brasileiro
- Documentação completamente em português
- URLs atualizadas para o repositório correto
- Commits padronizados em português

### 🐛 Correções de Bugs
- **Peça I agora rotaciona corretamente** (horizontal ↔ vertical)
- **Overflow removido** para evitar scroll desnecessário no desktop
- **Canvas responsivo** que se adapta sem distorção

### 📱 Compatibilidade
- ✅ Desktop: Adaptação vertical perfeita
- ✅ Tablet: Layout responsivo mantido
- ✅ Mobile: Controles touch otimizados
- ✅ Redimensionamento dinâmico da janela

---

## 🎮 v1.0.0 - Lançamento Inicial
**Data de Lançamento:** Janeiro 2025

### ✨ Funcionalidades Principais
- **Jogo Tetris completo** com todas as mecânicas originais
- **7 peças clássicas** (I, O, T, S, Z, J, L) com cores fiéis ao original
- **Sistema de rotação** completo para todas as peças
- **Detecção de linhas completas** com remoção automática
- **Sistema de pontuação** baseado no Tetris original
- **Progressão de níveis** com aumento de velocidade
- **Visualização da próxima peça**

### 🎨 Interface e Design
- **Design totalmente responsivo** para desktop, tablet e mobile
- **Controles adaptativos** - teclado no desktop, botões touch no mobile
- **Sistema de pausa** completo
- **Tela de Fim de Jogo** com pontuação final
- **Efeitos visuais 3D** nos blocos
- **Animações suaves** e transições
- **Tema escuro** com gradientes azuis

### 🎮 Controles
**Desktop:**
- `←→` Mover peça horizontalmente
- `↓` Acelerar descida
- `↑` Rotacionar peça
- `ESPAÇO` Pausar/Despausar

**Mobile:**
- Botões touch otimizados para todas as ações
- Interface responsiva para dispositivos móveis

### 🔧 Características Técnicas
- **HTML5 Canvas** para renderização
- **JavaScript ES6+** com programação orientada a objetos
- **CSS3** com media queries para responsividade
- **Sistema de eventos** para controles
- **Loop de jogo** otimizado com requestAnimationFrame
- **Detecção de colisões** precisa
- **Algoritmo de limpeza de linhas** eficiente

---

## 📥 Como Baixar e Instalar

### Opção 1: Jogar Online
🎮 **[Jogar Agora](https://makiprodan.github.io/tetris)**

### Opção 2: Download Local
```bash
# Clone o repositório
git clone https://github.com/makiprodan/tetris.git

# Entre no diretório
cd tetris

# Abra o index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
```

## 🤝 Contribuições
Contribuições são bem-vindas! Veja o [README.md](README.md) para instruções detalhadas.

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.