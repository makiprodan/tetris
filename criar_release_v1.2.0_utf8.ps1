# Script PowerShell para criar release v1.2.0 do Tetris com UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

Write-Host "Criando Release v1.2.0 do Tetris..." -ForegroundColor Green

# Verificar autenticacao
$authStatus = & "C:\Program Files\GitHub CLI\gh.exe" auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro: Voce precisa fazer login primeiro!" -ForegroundColor Red
    exit 1
}

Write-Host "Autenticado com sucesso!" -ForegroundColor Green

# Criar Release v1.2.0 com descricao em UTF-8
Write-Host "Criando Release v1.2.0..." -ForegroundColor Yellow

# Criar arquivo temporario com as notas da release
$tempFile = [System.IO.Path]::GetTempFileName()
$releaseNotes = @"
## 🎵 Tetris v1.2.0 - Sons, Temas e Animacoes

### 🚀 Principais Novidades

#### 🔊 Sistema de Efeitos Sonoros
- **Sons sinteticos** gerados com Web Audio API
- **6 tipos de sons** diferentes:
  - 🎵 Som de movimento horizontal
  - 🔄 Som de rotacao de pecas
  - ⬇️ Som de queda/colocacao
  - ✨ Som de line clear (1-3 linhas)
  - 🎆 Som especial de Tetris (4 linhas)
  - 💀 Som de game over
- **Controle de audio** com botao toggle na interface
- **Configuracao persistente** salva automaticamente

#### 🎨 Temas Personalizaveis
Agora voce pode escolher entre **4 temas unicos**:
- 🔵 **Tema Classico** - Design original azul
- 💫 **Tema Neon** - Cores vibrantes e luminosas
- 📼 **Tema Retro** - Estilo vintage anos 80/90
- 🌙 **Tema Escuro** - Interface dark mode elegante

#### ✨ Animacoes Aprimoradas
- **Efeitos visuais** para linhas completas
- **Animacao de escala** dinamica nos blocos
- **Mudanca de cor** progressiva durante a animacao
- **Bordas brilhantes** com efeito glow
- **Duracao otimizada** de 500ms
- **Cores diferentes** para line clear vs Tetris

### 🔧 Melhorias Tecnicas
- **Web Audio API** para reproducao de sons sinteticos
- **Sistema de temas** com CSS dinamico
- **Animacoes baseadas em keyframes** CSS
- **Gerenciamento de configuracoes** centralizado
- **Performance otimizada** para animacoes complexas

### 📱 Compatibilidade Total
- **Desktop:** Windows, macOS, Linux
- **Mobile:** iOS Safari, Android Chrome
- **Tablets:** iPad, Android tablets
- **Navegadores:** Chrome, Firefox, Safari, Edge

### 🎮 Como Usar
1. **Sons:** Clique no botao de som na interface
2. **Temas:** Use o seletor de tema para escolher
3. **Animacoes:** Complete linhas para ver os efeitos

### 🔄 Migracao da v1.1.0
- **Saves existentes** sao preservados
- **High scores** mantidos
- **Configuracoes** migradas automaticamente
- **Sem perda de dados**

---

**🎮 [Jogar Agora](https://makiprodan.github.io/tetris)**

**🐛 [Reportar Bug](https://github.com/makiprodan/tetris/issues/new?template=bug_report.md)**

**💡 [Sugerir Funcionalidade](https://github.com/makiprodan/tetris/issues/new?template=feature_request.md)**
"@

# Salvar as notas em arquivo temporario com UTF-8
[System.IO.File]::WriteAllText($tempFile, $releaseNotes, [System.Text.Encoding]::UTF8)

try {
    & "C:\Program Files\GitHub CLI\gh.exe" release create "v1.2.0" --title "v1.2.0 - Sons, Temas e Animacoes" --notes-file $tempFile --latest
    Write-Host "Release v1.2.0 criada com sucesso!" -ForegroundColor Green
    Write-Host "🎉 Nova versao disponivel em: https://github.com/makiprodan/tetris/releases/tag/v1.2.0" -ForegroundColor Cyan
} catch {
    Write-Host "Erro ao criar release v1.2.0: $_" -ForegroundColor Red
} finally {
    # Limpar arquivo temporario
    if (Test-Path $tempFile) {
        Remove-Item $tempFile
    }
}

Write-Host "Processo concluido!" -ForegroundColor Green