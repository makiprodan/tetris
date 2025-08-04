# 🎮 Tetris - Jogo Clássico Completo

Um jogo Tetris completo e responsivo com funcionalidades avançadas, fiel ao clássico original, desenvolvido com HTML5, CSS3 e JavaScript puro.

![Tetris Game](https://img.shields.io/badge/Game-Tetris-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Design-Responsive-blue)

![GitHub last commit](https://img.shields.io/github/last-commit/makiprodan/tetris)
![GitHub issues](https://img.shields.io/github/issues/makiprodan/tetris)
![GitHub stars](https://img.shields.io/github/stars/makiprodan/tetris)
![GitHub forks](https://img.shields.io/github/forks/makiprodan/tetris)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fmakiprodan.github.io%2Ftetris)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-brightgreen)
![GitHub repo size](https://img.shields.io/github/repo-size/makiprodan/tetris)

## 🚀 Demo Online
🎮 **[Jogar Agora](https://makiprodan.github.io/tetris)**

## ✨ Funcionalidades

### 🎯 Gameplay Clássico
- **7 peças clássicas** (I, O, T, S, Z, J, L) com cores originais
- **Mecânicas autênticas** de rotação e movimento
- **Sistema de pontuação** baseado no Tetris original
- **Progressão de níveis** com aumento de velocidade
- **Detecção de linhas completas** com remoção automática

### 🆕 Funcionalidades Avançadas (v1.1.0)
- **🏆 High Score Local** - Pontuação máxima salva automaticamente
- **👻 Peça Fantasma** - Visualização da posição de queda
- **📦 Sistema Hold** - Segurar peça para uso posterior (tecla C)
- **📊 Estatísticas Detalhadas** - Peças, tempo, PPS e contagem de Tetris

### 🎵 Novas Funcionalidades (v1.2.0)
- **🔊 Efeitos Sonoros** - Sons para movimento, rotação, drop e line clear
- **🎨 Temas Personalizáveis** - Clássico, Neon, Retrô e Escuro
- **✨ Animações Aprimoradas** - Efeitos visuais para linhas completas

### 📱 Totalmente Responsivo
- **Design adaptativo** para desktop, tablet e mobile
- **Controles touch** otimizados para dispositivos móveis
- **Interface moderna** com efeitos visuais 3D
- **Canvas redimensionável** que se adapta à tela

### 🎮 Controles Intuitivos
**Desktop:**
- `←→` Mover peça horizontalmente
- `↓` Acelerar descida
- `↑` Rotacionar peça
- `C` Segurar/trocar peça
- `ESPAÇO` Pausar/Despausar

**Mobile:**
- Botões touch para todas as ações
- Interface otimizada para toque
- Botão dedicado para hold

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura e Canvas
- **CSS3** - Estilos responsivos e animações
- **JavaScript ES6+** - Lógica do jogo
- **Canvas API** - Renderização gráfica

## 📥 Instalação e Uso

### Opção 1: Online
🌐 **[Acessar Online](https://makiprodan.github.io/tetris)**

### Opção 2: Local
```bash
# Clone o repositório
git clone https://github.com/makiprodan/tetris.git

# Entre no diretório
cd tetris

# Abra o index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
```

## 🎮 Como Usar

1. **Objetivo**: Complete linhas horizontais para ganhar pontos
2. **Movimento**: Use as setas para mover e rotacionar as peças
3. **Hold**: Pressione 'C' para segurar uma peça para uso posterior
4. **Pontuação**: 
   - 1 linha = 40 pontos × nível
   - 2 linhas = 100 pontos × nível
   - 3 linhas = 300 pontos × nível
   - 4 linhas (Tetris) = 1200 pontos × nível
5. **Níveis**: A cada 10 linhas completadas, o nível aumenta
6. **Velocidade**: Peças caem mais rápido a cada nível
7. **Estatísticas**: Acompanhe seu desempenho em tempo real

## 🏗️ Estrutura do Projeto

```
tetris/
├── index.html          # Estrutura principal
├── style.css           # Estilos e responsividade
├── script.js           # Lógica do jogo
├── README.md           # Documentação
└── CHANGELOG.md        # Histórico de versões
```

## 🎨 Características Técnicas

### Peças (Tetrominos)
- **I-Piece** (Ciano) - Linha reta
- **O-Piece** (Amarelo) - Quadrado
- **T-Piece** (Roxo) - Formato T
- **S-Piece** (Verde) - Formato S
- **Z-Piece** (Vermelho) - Formato Z
- **J-Piece** (Azul) - Formato J
- **L-Piece** (Laranja) - Formato L

### Sistema de Pontuação
```javascript
const POINTS = {
    1: 40,   // 1 linha
    2: 100,  // 2 linhas
    3: 300,  // 3 linhas
    4: 1200  // 4 linhas (Tetris)
};
```

## 🔧 Personalização

### Modificar Cores
Edite o objeto `COLORS` em `script.js`:
```javascript
const COLORS = {
    I: '#00f0f0', // Ciano
    O: '#f0f000', // Amarelo
    // ... outras cores
};
```

### Ajustar Velocidade
Modifique a função de velocidade em `script.js`:
```javascript
const dropInterval = Math.max(50, 1000 - (level - 1) * 100);
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Leia nosso [Guia de Contribuição](CONTRIBUTING.md) para detalhes completos.

### 🚀 Formas de Contribuir:
- 🐛 [Reportar bugs](https://github.com/makiprodan/tetris/issues/new?template=bug_report.md)
- ✨ [Sugerir funcionalidades](https://github.com/makiprodan/tetris/issues/new?template=feature_request.md)
- ❓ [Fazer perguntas](https://github.com/makiprodan/tetris/issues/new?template=question.md)
- 🔧 Enviar pull requests
- 📚 Melhorar a documentação

### 📋 Processo Rápido:
1. 🍴 Fork do projeto
2. 🌿 Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. 💻 Desenvolva e teste localmente
4. 📝 Commit (`git commit -m 'feat: adiciona nova funcionalidade'`)
5. 🚀 Push (`git push origin feature/nova-funcionalidade`)
6. 🔄 Abra um Pull Request

### 🛡️ Segurança
Para reportar vulnerabilidades, consulte nossa [Política de Segurança](SECURITY.md).

## 📱 Compatibilidade
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ Todos os navegadores modernos

## 📝 Roadmap

- [x] Sistema de pontuações máximas local ✅ v1.1.0
- [x] Modo peça fantasma ✅ v1.1.0
- [x] Sistema de segurar peça ✅ v1.1.0
- [x] Estatísticas detalhadas ✅ v1.1.0
- [x] Efeitos sonoros ✅ v1.2.0
- [x] Temas personalizáveis ✅ v1.2.0
- [x] Animações de linha completa aprimoradas ✅ v1.2.0
- [ ] Modo multijogador
- [ ] Sistema de ranking online
- [ ] Modo sprint (40 linhas)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Maki Prodan**
- GitHub: [@makiprodan](https://github.com/makiprodan)
- LinkedIn: [Maki Prodan](https://linkedin.com/in/makiprodan)

## 🙏 Agradecimentos

- Inspirado no Tetris original criado por Alexey Pajitnov
- Comunidade de desenvolvedores JavaScript
- Contribuidores do projeto

---

⭐ **Se você gostou do projeto, deixe uma estrela!** ⭐