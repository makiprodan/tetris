# Script PowerShell para criar release v1.2.0 do Tetris
# Execute este script após fazer login no GitHub CLI

Write-Host "Criando Release v1.2.0 do Tetris..." -ForegroundColor Green

# Verificar se está autenticado
Write-Host "Verificando autenticação..." -ForegroundColor Yellow
$authStatus = & "C:\Program Files\GitHub CLI\gh.exe" auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro: Você precisa fazer login primeiro!" -ForegroundColor Red
    Write-Host "Execute: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "Autenticado com sucesso!" -ForegroundColor Green

# Criar Release v1.2.0
Write-Host "Criando Release v1.2.0..." -ForegroundColor Yellow

$release_notes = @"
## 🎵 Tetris v1.2.0 - Sons, Temas e Animações

### 🚀 Principais Novidades

#### 🔊 Sistema de Efeitos Sonoros
- **Sons sintéticos** gerados com Web Audio API
- **6 tipos de sons** diferentes:
  - 🎵 Som de movimento horizontal
  - 🔄 Som de rotação de peças
  - ⬇️ Som de queda/colocação
  - ✨ Som de line clear (1-3 linhas)
  - 🎆 Som especial de Tetris (4 linhas)
  - 💀 Som de game over
- **Controle de áudio** com botão toggle na interface
- **Configuração persistente** salva automaticamente

#### 🎨 Temas Personalizáveis
Agora você pode escolher entre **4 temas únicos**:
- 🔵 **Tema Clássico** - Design original azul
- 💫 **Tema Neon** - Cores vibrantes e luminosas
- 📼 **Tema Retrô** - Estilo vintage anos 80/90
- 🌙 **Tema Escuro** - Interface dark mode elegante

#### ✨ Animações Aprimoradas
- **Efeitos visuais** para linhas completas
- **Animação de escala** dinâmica nos blocos
- **Mudança de cor** progressiva durante a animação
- **Bordas brilhantes** com efeito glow
- **Duração otimizada** de 500ms
- **Cores diferentes** para line clear vs Tetris

### 🔧 Melhorias Técnicas
- **Web Audio API** para reprodução de sons sintéticos
- **Sistema de temas** com CSS dinâmico
- **Animações baseadas em keyframes** CSS
- **Gerenciamento de configurações** centralizado
- **Performance otimizada** para animações complexas

### 📱 Compatibilidade Total
- **Desktop:** Windows, macOS, Linux
- **Mobile:** iOS Safari, Android Chrome
- **Tablets:** iPad, Android tablets
- **Navegadores:** Chrome, Firefox, Safari, Edge

### 🎮 Como Usar
1. **Sons:** Clique no botão "🔊 Som: ON/OFF"
2. **Temas:** Use o seletor "Tema:" para escolher
3. **Animações:** Complete linhas para ver os efeitos

### 🔄 Migração da v1.1.0
- **Saves existentes** são preservados
- **High scores** mantidos
- **Configurações** migradas automaticamente
- **Sem perda de dados**

---

**🎮 [Jogar Agora](https://makiprodan.github.io/tetris)**

**🐛 [Reportar Bug](https://github.com/makiprodan/tetris/issues/new?template=bug_report.md)**

**💡 [Sugerir Funcionalidade](https://github.com/makiprodan/tetris/issues/new?template=feature_request.md)**
"@

try {
    & "C:\Program Files\GitHub CLI\gh.exe" release create "v1.2.0" --title "v1.2.0 - Sons, Temas e Animações" --notes $release_notes --latest
    Write-Host "Release v1.2.0 criada com sucesso!" -ForegroundColor Green
    Write-Host "🎉 Nova versão disponível em: https://github.com/makiprodan/tetris/releases/tag/v1.2.0" -ForegroundColor Cyan
} catch {
    Write-Host "Erro ao criar release v1.2.0: $_" -ForegroundColor Red
    Write-Host "Verifique se a tag v1.2.0 foi enviada para o GitHub" -ForegroundColor Yellow
}

Write-Host "Processo concluído!" -ForegroundColor Green
Write-Host "Veja todas as releases em: https://github.com/makiprodan/tetris/releases" -ForegroundColor Cyan