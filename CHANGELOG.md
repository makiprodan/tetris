# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-01-15

### ✨ Adicionado
- **Jogo Tetris completo** com todas as mecânicas originais
- **7 peças clássicas** (I, O, T, S, Z, J, L) com cores fiéis ao original
- **Sistema de rotação** completo para todas as peças
- **Detecção de linhas completas** com remoção automática
- **Sistema de pontuação** baseado no Tetris original (40, 100, 300, 1200 pontos)
- **Progressão de níveis** com aumento de velocidade
- **Visualização da próxima peça**
- **Design totalmente responsivo** para desktop, tablet e mobile
- **Controles adaptativos** - teclado no desktop, botões touch no mobile
- **Sistema de pausa** completo
- **Tela de Fim de Jogo** com pontuação final
- **Efeitos visuais 3D** nos blocos
- **Animações suaves** e transições
- **Prevenção de scroll** em dispositivos móveis
- **Canvas redimensionável** que se adapta ao tamanho da tela

### 🎮 Controles Implementados
- **Desktop**: Setas direcionais + Espaço para pausar
- **Mobile**: Botões touch otimizados

### 🎨 Interface
- **Tema escuro** com gradientes azuis
- **Cores neon** para destaque (verde para bordas, texto)
- **Layout responsivo** com flexbox
- **Tipografia** Courier New para estética retrô
- **Efeitos hover** e animações nos botões

### 🔧 Características Técnicas
- **HTML5 Canvas** para renderização
- **JavaScript ES6+** com programação orientada a objetos
- **CSS3** com media queries para responsividade
- **Sistema de eventos** para controles
- **Loop de jogo** otimizado com requestAnimationFrame
- **Detecção de colisões** precisa
- **Algoritmo de limpeza de linhas** eficiente

### 📱 Responsividade
- **Breakpoints** para tablet (768px) e mobile (480px)
- **Redimensionamento automático** do canvas
- **Controles adaptativos** baseados no dispositivo
- **Layout flexível** que se adapta a diferentes telas

## [1.1.0] - 2024-01-20

### ✨ Adicionado
- **🏆 Sistema de High Score Local** - Pontuação máxima salva automaticamente no localStorage
- **👻 Peça Fantasma** - Visualização semi-transparente da posição onde a peça atual cairá
- **📦 Sistema Hold** - Capacidade de segurar uma peça para uso posterior (tecla C)
- **📊 Estatísticas Detalhadas** em tempo real:
  - Contador de peças colocadas
  - Cronômetro de jogo (MM:SS)
  - PPS (Peças Por Segundo)
  - Contador específico de Tetris (4 linhas)
- **🎮 Botão Hold Mobile** - Controle touch dedicado para dispositivos móveis
- **📱 Painel de Estatísticas** - Interface lateral com todas as informações do jogo

### 🔄 Modificado
- **Interface reorganizada** com painel lateral para estatísticas
- **Controles mobile atualizados** com novo botão para hold
- **Sistema de pontuação aprimorado** com salvamento automático do high score
- **Responsividade melhorada** para acomodar novas funcionalidades

### 🔧 Melhorias Técnicas
- **Código modularizado** com funções específicas para cada funcionalidade
- **Gerenciamento de estado** otimizado para hold e ghost piece
- **Performance melhorada** na atualização das estatísticas
- **Compatibilidade mantida** com todos os dispositivos

## [Planejado] - Próximas Versões

### 🎵 v1.2.0 - Áudio e Efeitos
- [ ] Efeitos sonoros para ações
- [ ] Música de fundo
- [ ] Controle de volume
- [ ] Efeitos visuais para linha completa

### 🎨 v1.3.0 - Personalização
- [ ] Temas personalizáveis
- [ ] Cores customizáveis das peças
- [ ] Diferentes estilos de blocos
- [ ] Modo escuro/claro

### 🌐 v2.0.0 - Recursos Avançados
- [ ] Modo multijogador local
- [ ] Sistema de conquistas
- [ ] Diferentes modos de jogo
- [ ] Integração com redes sociais

---

## Formato das Versões

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas de forma compatível
- **PATCH**: Correções de bugs compatíveis

## Tipos de Mudanças

- **✨ Adicionado** para novas funcionalidades
- **🔄 Modificado** para mudanças em funcionalidades existentes
- **❌ Removido** para funcionalidades removidas
- **🐛 Corrigido** para correções de bugs
- **🔒 Segurança** para vulnerabilidades corrigidas