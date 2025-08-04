# Script PowerShell para criar releases do GitHub
# Execute este script apos fazer login no GitHub CLI

Write-Host "Criando Releases do Tetris..." -ForegroundColor Green

# Verificar se esta autenticado
Write-Host "Verificando autenticacao..." -ForegroundColor Yellow
$authStatus = & "C:\Program Files\GitHub CLI\gh.exe" auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro: Voce precisa fazer login primeiro!" -ForegroundColor Red
    Write-Host "Execute: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "Autenticado com sucesso!" -ForegroundColor Green

# Criar Release v1.0.0
Write-Host "Criando Release v1.0.0..." -ForegroundColor Yellow

$release1_notes = "## Tetris - Lancamento Inicial`n`n### Funcionalidades Principais`n- Jogo Tetris completo com todas as mecanicas originais`n- 7 pecas classicas (I, O, T, S, Z, J, L) com cores fieis ao original`n- Sistema de rotacao completo para todas as pecas`n- Deteccao de linhas completas com remocao automatica`n- Sistema de pontuacao baseado no Tetris original`n- Progressao de niveis com aumento de velocidade`n- Visualizacao da proxima peca`n`n### Interface e Design`n- Design totalmente responsivo para desktop, tablet e mobile`n- Controles adaptativos - teclado no desktop, botoes touch no mobile`n- Sistema de pausa completo`n- Tela de Fim de Jogo com pontuacao final`n- Efeitos visuais 3D nos blocos`n- Animacoes suaves e transicoes`n- Tema escuro com gradientes azuis`n`n### Controles`nDesktop:`n- Setas para mover e rotacionar`n- Espaco para pausar`n`nMobile:`n- Botoes touch otimizados`n`n### Jogar Agora: https://makiprodan.github.io/tetris"

try {
    & "C:\Program Files\GitHub CLI\gh.exe" release create "v1.0.0" --title "v1.0.0 - Lancamento Inicial do Tetris" --notes $release1_notes
    Write-Host "Release v1.0.0 criada com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar release v1.0.0: $_" -ForegroundColor Red
}

# Criar Release v1.1.0
Write-Host "Criando Release v1.1.0..." -ForegroundColor Yellow

$release2_notes = "## Melhorias de Responsividade e Traducao`n`n### Novas Funcionalidades`n- Responsividade vertical aprimorada para desktop`n- Interface totalmente traduzida para portugues brasileiro`n- Correcao da rotacao da peca I (tetromino linha)`n`n### Melhorias Tecnicas`n- Canvas adapta-se automaticamente a altura da viewport (70%)`n- Funcao resizeCanvas otimizada para diferentes tamanhos de tela`n- Listener de redimensionamento de janela adicionado`n- Proporcao 1:2 mantida em todas as resolucoes`n`n### Localizacao Completa`n- Todos os textos do jogo traduzidos para portugues brasileiro`n- Documentacao completamente em portugues`n- URLs atualizadas para o repositorio correto`n- Commits padronizados em portugues`n`n### Correcoes de Bugs`n- Peca I agora rotaciona corretamente (horizontal vertical)`n- Overflow removido para evitar scroll desnecessario no desktop`n- Canvas responsivo que se adapta sem distorcao`n`n### Compatibilidade`n- Desktop: Adaptacao vertical perfeita`n- Tablet: Layout responsivo mantido`n- Mobile: Controles touch otimizados`n- Redimensionamento dinamico da janela`n`n### Jogar Agora: https://makiprodan.github.io/tetris`n`n### Como Baixar e Instalar`n`nOpcao 1: Jogar Online`nhttps://makiprodan.github.io/tetris`n`nOpcao 2: Download Local`ngit clone https://github.com/makiprodan/tetris.git`ncd tetris`nAbra o index.html no navegador"

try {
    & "C:\Program Files\GitHub CLI\gh.exe" release create "v1.1.0" --title "v1.1.0 - Melhorias de Responsividade e Traducao" --notes $release2_notes --latest
    Write-Host "Release v1.1.0 criada com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao criar release v1.1.0: $_" -ForegroundColor Red
}

Write-Host "Processo concluido!" -ForegroundColor Green
Write-Host "Veja suas releases em: https://github.com/makiprodan/tetris/releases" -ForegroundColor Cyan