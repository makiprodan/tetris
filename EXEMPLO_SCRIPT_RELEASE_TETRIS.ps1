# 🎮 EXEMPLO PRÁTICO: Script que funcionou no Projeto Tetris
# Este é o script exato que foi usado com sucesso para criar a release v1.2.0

# ========================================
# CONFIGURAÇÃO UTF-8 (ESSENCIAL!)
# ========================================
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

Write-Host "🎮 Criando Release v1.2.0 do Tetris..." -ForegroundColor Green

# ========================================
# VERIFICAÇÃO DE AUTENTICAÇÃO
# ========================================
Write-Host "🔐 Verificando autenticação GitHub..." -ForegroundColor Yellow
$authStatus = & "C:\Program Files\GitHub CLI\gh.exe" auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro: Você precisa fazer login primeiro!" -ForegroundColor Red
    Write-Host "💡 Execute: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Autenticado com sucesso!" -ForegroundColor Green

# ========================================
# CRIAÇÃO DO ARQUIVO DE NOTAS (UTF-8)
# ========================================
Write-Host "📝 Criando arquivo de notas da release..." -ForegroundColor Yellow

# Criar arquivo temporário para as notas
$tempFile = [System.IO.Path]::GetTempFileName()

# Conteúdo das notas da release (EXEMPLO REAL DO TETRIS)
$releaseNotes = @"
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
1. **Sons:** Clique no botão de som na interface
2. **Temas:** Use o seletor de tema para escolher
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

# ========================================
# SALVAR ARQUIVO COM UTF-8 (CRÍTICO!)
# ========================================
# Esta linha é ESSENCIAL para evitar problemas de codificação
[System.IO.File]::WriteAllText($tempFile, $releaseNotes, [System.Text.Encoding]::UTF8)

Write-Host "✅ Arquivo de notas criado com UTF-8!" -ForegroundColor Green

# ========================================
# CRIAR RELEASE NO GITHUB
# ========================================
try {
    Write-Host "🚀 Criando Release v1.2.0 no GitHub..." -ForegroundColor Yellow
    
    # Comando que funcionou perfeitamente
    & "C:\Program Files\GitHub CLI\gh.exe" release create "v1.2.0" --title "v1.2.0 - Sons, Temas e Animações" --notes-file $tempFile --latest
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Release v1.2.0 criada com sucesso!" -ForegroundColor Green
        Write-Host "🔗 Nova versão disponível em: https://github.com/makiprodan/tetris/releases/tag/v1.2.0" -ForegroundColor Cyan
        Write-Host "📋 Todas as releases: https://github.com/makiprodan/tetris/releases" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Erro ao criar release v1.2.0" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erro ao criar release v1.2.0: $_" -ForegroundColor Red
    exit 1
} finally {
    # ========================================
    # LIMPEZA (SEMPRE EXECUTAR)
    # ========================================
    if (Test-Path $tempFile) {
        Remove-Item $tempFile
        Write-Host "🧹 Arquivo temporário removido" -ForegroundColor Gray
    }
}

Write-Host "✅ Processo concluído com sucesso!" -ForegroundColor Green

# ========================================
# VERIFICAÇÃO FINAL
# ========================================
Write-Host "🔍 Verificando se a release foi criada..." -ForegroundColor Yellow
& "C:\Program Files\GitHub CLI\gh.exe" release list

Write-Host ""
Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. Verificar se a release aparece corretamente no GitHub" -ForegroundColor White
Write-Host "2. Testar todos os links da release" -ForegroundColor White
Write-Host "3. Verificar se os acentos estão corretos" -ForegroundColor White
Write-Host "4. Fazer commit deste script para o repositório" -ForegroundColor White