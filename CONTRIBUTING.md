# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o projeto Tetris! Este documento fornece diretrizes para contribuições.

## 🚀 Como Contribuir

### 1. 🍴 Fork do Repositório
```bash
# Clone seu fork
git clone https://github.com/SEU_USUARIO/tetris.git
cd tetris
```

### 2. 🌿 Crie uma Branch
```bash
# Crie uma branch para sua funcionalidade
git checkout -b feature/nova-funcionalidade
# ou para correção de bug
git checkout -b fix/correcao-bug
```

### 3. 💻 Desenvolvimento Local
```bash
# Inicie um servidor local para testar
python -m http.server 8000
# Acesse: http://localhost:8000
```

### 4. ✅ Teste suas Mudanças
- 🎮 Teste o jogo completamente
- 📱 Verifique responsividade mobile
- 🌐 Teste em diferentes navegadores
- 🎯 Confirme que não quebrou funcionalidades existentes

### 5. 📝 Commit e Push
```bash
# Adicione suas mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: adiciona nova funcionalidade X"
# ou
git commit -m "fix: corrige bug Y"

# Push para seu fork
git push origin feature/nova-funcionalidade
```

### 6. 🔄 Pull Request
- Abra um Pull Request para a branch `master`
- Use o template fornecido
- Descreva claramente suas mudanças
- Adicione screenshots se aplicável

## 📋 Padrões de Código

### 🎨 Estilo CSS
```css
/* Use nomes descritivos */
.game-board { }
.tetris-piece { }

/* Organize por seções */
/* === LAYOUT === */
/* === COMPONENTS === */
/* === RESPONSIVE === */
```

### 🔧 JavaScript
```javascript
// Use camelCase para variáveis
const gameBoard = [];
const currentPiece = {};

// Funções descritivas
function rotatePiece() { }
function checkLineClear() { }

// Comentários em português
// Verifica se a linha está completa
```

### 📱 HTML
```html
<!-- Use classes semânticas -->
<div class="game-container">
  <div class="game-board"></div>
  <div class="game-info"></div>
</div>
```

## 🎯 Tipos de Contribuição

### 🐛 Correção de Bugs
- Reporte bugs usando o template de issue
- Inclua passos para reproduzir
- Teste a correção completamente

### ✨ Novas Funcionalidades
- Discuta a ideia em uma issue primeiro
- Mantenha compatibilidade com mobile
- Documente a nova funcionalidade

### 📚 Documentação
- Mantenha README.md atualizado
- Use português brasileiro
- Inclua exemplos quando necessário

### 🎨 Melhorias Visuais
- Mantenha o tema atual
- Teste em diferentes tamanhos de tela
- Considere acessibilidade

## 🔍 Processo de Review

### ✅ Critérios de Aprovação
- [ ] Código funciona corretamente
- [ ] Não quebra funcionalidades existentes
- [ ] Responsivo em mobile
- [ ] Compatível com navegadores principais
- [ ] Documentação atualizada (se necessário)
- [ ] Testes realizados

### 🚫 Critérios de Rejeição
- Código que quebra o jogo
- Não funciona em mobile
- Não segue padrões do projeto
- Falta de documentação em mudanças significativas

## 🎮 Áreas de Contribuição

### 🔥 Alta Prioridade
- 🐛 Correção de bugs
- 📱 Melhorias de responsividade
- ⚡ Otimizações de performance

### 🟡 Média Prioridade
- ✨ Novas funcionalidades de gameplay
- 🎨 Melhorias visuais
- 🔊 Sistema de áudio

### 🟢 Baixa Prioridade
- 🏆 Sistema de conquistas
- 📊 Estatísticas avançadas
- 🌐 Funcionalidades sociais

## 📞 Contato

- 🐛 **Bugs:** Use o template de issue
- ✨ **Funcionalidades:** Use o template de feature request
- ❓ **Dúvidas:** Use o template de pergunta
- 💬 **Discussões:** Abra uma issue de discussão

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](LICENSE).

---

**Obrigado por contribuir! 🚀**