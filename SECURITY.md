# 🔒 Política de Segurança

## 🛡️ Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 1.1.x  | ✅ Sim             |
| 1.0.x  | ✅ Sim             |
| < 1.0  | ❌ Não             |

## 🚨 Relatando Vulnerabilidades

### 📧 Como Reportar
Se você descobrir uma vulnerabilidade de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Envie um email para: [seu-email@exemplo.com]
3. Inclua o máximo de detalhes possível

### 📝 Informações Necessárias
- Descrição da vulnerabilidade
- Passos para reproduzir
- Impacto potencial
- Versão afetada
- Navegador/ambiente onde foi encontrada

### ⏱️ Tempo de Resposta
- **Confirmação:** 48 horas
- **Avaliação inicial:** 7 dias
- **Correção:** 30 dias (dependendo da severidade)

### 🏆 Reconhecimento
Contribuidores que reportarem vulnerabilidades válidas serão:
- Creditados no CHANGELOG.md
- Mencionados na seção de agradecimentos
- Adicionados à lista de colaboradores de segurança

## 🔍 Escopo de Segurança

### ✅ Incluído
- Vulnerabilidades de XSS
- Problemas de CSRF
- Injeção de código
- Vazamento de dados
- Problemas de autenticação/autorização

### ❌ Não Incluído
- Problemas de usabilidade
- Bugs funcionais sem impacto de segurança
- Problemas de performance
- Questões de compatibilidade

## 🛠️ Medidas de Segurança Implementadas

### 🌐 Frontend
- ✅ Sanitização de inputs
- ✅ Validação de dados
- ✅ HTTPS obrigatório (GitHub Pages)
- ✅ Content Security Policy headers
- ✅ Sem armazenamento de dados sensíveis

### 📦 Dependências
- ✅ Projeto sem dependências externas
- ✅ Código JavaScript vanilla
- ✅ Sem bibliotecas de terceiros
- ✅ Sem CDNs externos

### 🔒 Hospedagem
- ✅ GitHub Pages com HTTPS
- ✅ Domínio verificado
- ✅ Deploy automático seguro
- ✅ Sem processamento server-side

## 📋 Checklist de Segurança

### Para Contribuidores
- [ ] Não adicionar dependências desnecessárias
- [ ] Validar todos os inputs do usuário
- [ ] Não usar `eval()` ou `innerHTML` com dados não sanitizados
- [ ] Testar contra XSS básico
- [ ] Verificar se não há vazamento de dados

### Para Revisores
- [ ] Revisar código para vulnerabilidades conhecidas
- [ ] Verificar sanitização de inputs
- [ ] Confirmar que não há execução de código não confiável
- [ ] Testar funcionalidades de segurança

## 🚀 Atualizações de Segurança

### 📢 Notificações
Atualizações de segurança serão comunicadas via:
- Release notes no GitHub
- Atualização do CHANGELOG.md
- Badge de versão no README.md

### ⚡ Correções Urgentes
Para vulnerabilidades críticas:
- Correção imediata
- Release de emergência
- Notificação em todas as plataformas

## 📞 Contato de Segurança

- **Email:** [seu-email@exemplo.com]
- **GitHub:** [@makiprodan](https://github.com/makiprodan)
- **Resposta esperada:** 48 horas

---

**Obrigado por ajudar a manter o projeto seguro! 🛡️**