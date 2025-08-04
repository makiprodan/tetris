# 🎮 Tetris - Jogo Original

Um jogo Tetris completo e responsivo, fiel ao clássico original, desenvolvido com HTML5, CSS3 e JavaScript puro.

![Tetris Game](https://img.shields.io/badge/Game-Tetris-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Design-Responsive-blue)

## 🚀 Demonstração

[🎮 **Jogar Agora**](https://seu-usuario.github.io/tetris) *(substitua pelo seu link do GitHub Pages)*

## ✨ Características

### 🎯 Fiel ao Original
- **7 peças clássicas** (I, O, T, S, Z, J, L) com cores originais
- **Mecânicas autênticas** de rotação e movimento
- **Sistema de pontuação** baseado no Tetris original
- **Progressão de níveis** com aumento de velocidade
- **Detecção de linhas completas** com remoção automática

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
- `ESPAÇO` Pausar/Despausar

**Mobile:**
- Botões touch para todas as ações
- Interface otimizada para toque

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura e Canvas
- **CSS3** - Estilos responsivos e animações
- **JavaScript ES6+** - Lógica do jogo
- **Canvas API** - Renderização gráfica

## 📦 Instalação e Uso

### Método 1: Download Direto
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tetris.git

# Entre no diretório
cd tetris

# Abra o index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
```

### Método 2: GitHub Pages
1. Faça fork do repositório
2. Ative o GitHub Pages nas configurações
3. Acesse: `https://seu-usuario.github.io/tetris`

## 🎯 Como Jogar

1. **Objetivo**: Complete linhas horizontais para ganhar pontos
2. **Movimento**: Use as setas para mover e rotacionar as peças
3. **Pontuação**: 
   - 1 linha = 40 pontos × nível
   - 2 linhas = 100 pontos × nível
   - 3 linhas = 300 pontos × nível
   - 4 linhas (Tetris) = 1200 pontos × nível
4. **Níveis**: A cada 10 linhas completadas, o nível aumenta
5. **Velocidade**: Peças caem mais rápido a cada nível

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

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Sistema de high scores local
- [ ] Efeitos sonoros
- [ ] Modo multiplayer
- [ ] Temas personalizáveis
- [ ] Modo ghost piece (peça fantasma)
- [ ] Sistema de hold (segurar peça)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- Inspirado no Tetris original criado por Alexey Pajitnov
- Comunidade de desenvolvedores JavaScript
- Contribuidores do projeto

---

⭐ **Se você gostou do projeto, deixe uma estrela!** ⭐