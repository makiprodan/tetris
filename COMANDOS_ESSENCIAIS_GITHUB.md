# ⚡ Comandos Essenciais GitHub - Guia Rápido

## 🎯 Comandos que Funcionaram no Projeto Tetris

### 🔐 Autenticação
```bash
# Login no GitHub CLI
gh auth login

# Verificar status da autenticação
gh auth status
```

### 📦 Releases
```bash
# Listar todas as releases
gh release list

# Ver detalhes de uma release específica
gh release view v1.2.0

# Criar release com arquivo de notas
gh release create v1.2.0 --title "v1.2.0 - Sons, Temas e Animações" --notes-file release_notes.txt --latest

# Deletar release (se necessário)
gh release delete v1.2.0 --yes
```

### 🏷️ Tags
```bash
# Listar todas as tags
git tag -l

# Criar tag anotada
git tag -a v1.2.0 -m "Release v1.2.0: Sons, Temas e Animações"

# Push da tag para o repositório remoto
git push origin v1.2.0

# Verificar tags no repositório remoto
git ls-remote --tags origin

# Deletar tag local
git tag -d v1.2.0

# Deletar tag remota
git push origin --delete v1.2.0
```

### 📝 Git Básico
```bash
# Status do repositório
git status

# Adicionar arquivos
git add arquivo.txt
git add .  # todos os arquivos

# Commit
git commit -m "feat: adiciona nova funcionalidade"

# Push para o repositório remoto
git push origin master
git push origin main

# Pull do repositório remoto
git pull origin master

# Ver histórico de commits
git log --oneline
```

### 🔍 Verificações
```bash
# Verificar repositório atual
gh repo view

# Ver informações do repositório
gh repo view --json owner,name

# Verificar branches
git branch -a

# Verificar remote
git remote -v
```

## 🛠️ PowerShell Específico (Windows)

### 📋 Comandos que Funcionaram
```powershell
# Executar script PowerShell
powershell -ExecutionPolicy Bypass -File "script.ps1"

# Comando completo para criar release (funcionou perfeitamente)
powershell -Command "& 'C:\Program Files\GitHub CLI\gh.exe' release create v1.2.0 --title 'v1.2.0 - Sons, Temas e Animações' --notes-file 'release_notes.txt' --latest"

# Verificar encoding UTF-8 no PowerShell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```

### 🔧 Configurações UTF-8
```powershell
# No início de qualquer script PowerShell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

# Salvar arquivo com UTF-8
[System.IO.File]::WriteAllText($arquivo, $conteudo, [System.Text.Encoding]::UTF8)
```

## 🚀 Fluxo Completo que Funcionou

### 1️⃣ Preparação
```bash
# Verificar autenticação
gh auth status

# Verificar status do repositório
git status
```

### 2️⃣ Criar Conteúdo da Release
```bash
# Criar arquivo com notas da release (UTF-8)
# Exemplo: release_notes_v1.2.0.txt
```

### 3️⃣ Criar Release
```powershell
# Usar o script PowerShell ou comando direto
gh release create v1.2.0 --title "v1.2.0 - Sons, Temas e Animações" --notes-file "release_notes_v1.2.0.txt" --latest
```

### 4️⃣ Verificação
```bash
# Verificar se a release foi criada
gh release list

# Ver detalhes da release
gh release view v1.2.0
```

### 5️⃣ Commit dos Scripts
```bash
# Adicionar scripts ao repositório
git add *.ps1 *.txt *.md

# Commit
git commit -m "docs: adiciona scripts e documentação de release"

# Push
git push origin master
```

## ❌ Problemas Comuns e Soluções

### Problema: Caracteres especiais quebrados
```
❌ Aparece: "AnimaÃ§Ãµes", "configuraÃ§Ã£o"
✅ Solução: Usar UTF-8 no PowerShell
```
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[System.IO.File]::WriteAllText($arquivo, $conteudo, [System.Text.Encoding]::UTF8)
```

### Problema: GitHub CLI não encontrado
```
❌ Erro: 'gh' is not recognized
✅ Solução: Instalar GitHub CLI
```
```bash
# Windows
winget install GitHub.cli

# Ou usar caminho completo
"C:\Program Files\GitHub CLI\gh.exe"
```

### Problema: Tag já existe
```
❌ Erro: tag already exists
✅ Solução: Deletar e recriar
```
```bash
git tag -d v1.2.0
git push origin --delete v1.2.0
gh release delete v1.2.0 --yes
```

### Problema: Release sem descrição
```
❌ Release aparece vazia
✅ Solução: Usar arquivo UTF-8 separado
```
```bash
# Criar arquivo .txt com UTF-8
# Usar --notes-file em vez de --notes
gh release create v1.2.0 --notes-file "notas.txt"
```

## 🎯 Checklist Rápido

### ✅ Antes de Criar Release
- [ ] Código commitado e pushed
- [ ] Tag criada (opcional, gh cria automaticamente)
- [ ] Arquivo de notas preparado em UTF-8
- [ ] GitHub CLI autenticado
- [ ] Versão incrementada corretamente

### ✅ Após Criar Release
- [ ] Release aparece na lista (`gh release list`)
- [ ] Descrição está correta (sem caracteres quebrados)
- [ ] Links funcionando
- [ ] Marcada como "Latest" (se aplicável)
- [ ] Scripts commitados no repositório

## 🔗 Links Úteis Testados

- **Releases do Projeto:** `https://github.com/usuario/projeto/releases`
- **Release Específica:** `https://github.com/usuario/projeto/releases/tag/v1.2.0`
- **Issues:** `https://github.com/usuario/projeto/issues`
- **GitHub CLI Docs:** `https://cli.github.com/manual/`

---

**💡 Dica:** Sempre teste os comandos em um repositório de teste primeiro!