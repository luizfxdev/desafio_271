# 🕯️ Ritual das Sombras: A Caçada do Ciclo Profano 💀

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

Uma aplicação web interativa que detecta padrões de sequências crescentes (Ciclos Profanos) em conjuntos de dados numéricos, com interface temática necromante e cálculos detalhados de validação.

---

## 📜 Sobre o Desafio

### **Ritual das Sombras: A Caçada do Ciclo Profano**

No coração de uma noite sinistra, uma bruxa poderosa desenha runas incandescentes diante de uma lua cheia, realizando um ritual necromante que invoca forças ocultas e manipula os fluxos energéticos dos mortos. Entre os espíritos e espectros evocados, ela busca identificar um padrão raro — o **Ciclo Profano** — dentro das energias de almas que cruzam a barreira entre a vida e a morte.

### **Regras do Desafio**

Implemente a função que, dado um conjunto de leituras de energia espiritual, detecta se existe uma sequência de três valores consecutivos em ordem estritamente crescente (um ciclo profano de ascensão espectral).

**Saída obrigatória:**

* **Booleano:** `True` se o padrão existe, `False` caso contrário.
* Implemente também a função que ao detectar um ciclo profano, calcula a **intensidade máxima** do ritual necromante
* Some os valores desses três números crescentes consecutivos para revelar a força total da invocação.
* Caso não seja detectado, retorne zero.

**Saída esperada:**
* Output booleano original (verdadeiro/falso)
* Output numérico adicional: intensidade máxima do ciclo encontrado, seguido de uma mensagem ritualística.

---

## 🎯 Aplicações em Projetos Reais

Este algoritmo de detecção de padrões sequenciais tem diversas aplicações práticas:

### 📈 **Análise de Mercado Financeiro**
- Detectar tendências de alta em sequências de preços
- Identificar padrões de crescimento consecutivo em ações
- Alertas automáticos para oportunidades de compra

### 🏥 **Monitoramento de Saúde**
- Detectar aumentos progressivos em sinais vitais (pressão arterial, glicose)
- Identificar padrões de deterioração em condições de pacientes
- Sistemas de alerta precoce para emergências médicas

### 🌡️ **Análise de Séries Temporais**
- Detectar tendências de aquecimento em dados climáticos
- Identificar padrões de crescimento em sensores IoT
- Monitoramento de consumo energético crescente

### 📊 **Análise de Dados e Business Intelligence**
- Detectar crescimento sustentado em métricas de negócio
- Identificar padrões de engajamento crescente
- Análise de tendências em dados de usuários

### 🔐 **Segurança e Detecção de Anomalias**
- Identificar padrões suspeitos de acessos crescentes
- Detectar tentativas de ataque progressivas
- Monitoramento de tráfego de rede anômalo

---

## 🧮 Lógica e Algoritmo

### **Abordagem Técnica**

O algoritmo utiliza uma **iteração linear única** (`O(n)`) para detectar sequências crescentes:

#### **1. Detecção de Ciclo Profano**
```javascript
function detectProfaneCycle(readings) {
    for (let i = 0; i < readings.length - 2; i++) {
        if (readings[i] < readings[i + 1] && readings[i + 1] < readings[i + 2]) {
            return {
                found: true,
                index: i,
                values: [readings[i], readings[i + 1], readings[i + 2]]
            };
        }
    }
    return { found: false };
}
```

**Complexidade:** `O(n)` - onde n é o tamanho do array
**Espaço:** `O(1)` - usa apenas variáveis auxiliares

#### **2. Cálculo de Intensidade Máxima**
```javascript
function calculateMaxIntensity(readings) {
    let maxIntensity = 0;
    let maxCycle = null;
    
    for (let i = 0; i < readings.length - 2; i++) {
        if (readings[i] < readings[i + 1] && readings[i + 1] < readings[i + 2]) {
            const intensity = readings[i] + readings[i + 1] + readings[i + 2];
            if (intensity > maxIntensity) {
                maxIntensity = intensity;
                maxCycle = [readings[i], readings[i + 1], readings[i + 2]];
            }
        }
    }
    
    return { maxIntensity, maxCycle };
}
```

### **Processo de Validação**

1. **Iteração por Janela Deslizante:** O algoritmo percorre o array usando uma janela de 3 elementos consecutivos
2. **Verificação Estrita:** Para cada tripla `(a, b, c)`, verifica se `a < b AND b < c`
3. **Tracking de Máximo:** Mantém registro do ciclo com maior soma
4. **Early Return:** Para `detectProfaneCycle`, retorna imediatamente ao encontrar o primeiro ciclo (otimização)

### **Características**

- ✅ **Eficiência:** Complexidade linear O(n)
- ✅ **Precisão:** Verificação estrita de ordem crescente
- ✅ **Completude:** Analisa todas as possíveis triplas consecutivas
- ✅ **Rastreamento:** Identifica não apenas existência, mas também valores e posições
- ✅ **Diagnóstico:** Em caso de falha, mostra por que cada tripla não qualificou

---

## 📊 Exemplos de Uso

### **Exemplo 1 - Ciclo Detectado** ✅
```javascript
Entrada: [2, 5, 3, 8, 6, 9, 7]

Análise:
- [2, 5, 3]: 2 < 5 ✓, mas 5 > 3 ✗
- [5, 3, 8]: 5 > 3 ✗
- [3, 8, 6]: 3 < 8 ✓, mas 8 > 6 ✗
- [8, 6, 9]: 8 > 6 ✗
- [6, 9, 7]: 6 < 9 ✓, mas 9 > 7 ✗

Saída:
✓ Ciclo Profano detectado: False
✗ Intensidade Profana: 0
💀 Mensagem: "Nenhum ciclo de ascensão: o ritual falha!"
```

### **Exemplo 2 - Ciclo Detectado** ✅
```javascript
Entrada: [1, 3, 5, 2, 4, 6, 8]

Análise:
- [1, 3, 5]: 1 < 3 < 5 ✓ (Intensidade: 9)
- [3, 5, 2]: 3 < 5 ✓, mas 5 > 2 ✗
- [5, 2, 4]: 5 > 2 ✗
- [2, 4, 6]: 2 < 4 < 6 ✓ (Intensidade: 12)
- [4, 6, 8]: 4 < 6 < 8 ✓ (Intensidade: 18) ← MÁXIMO

Saída:
✓ Ciclo Profano detectado: True
⚡ Intensidade Profana: 18
🕯️ Mensagem: "Força máxima da invocação necromante: 18"
```

### **Exemplo 3 - Múltiplos Ciclos** ✅
```javascript
Entrada: [10, 20, 30, 5, 15, 25]

Análise:
- [10, 20, 30]: 10 < 20 < 30 ✓ (Intensidade: 60) ← MÁXIMO
- [20, 30, 5]: 20 < 30 ✓, mas 30 > 5 ✗
- [30, 5, 15]: 30 > 5 ✗
- [5, 15, 25]: 5 < 15 < 25 ✓ (Intensidade: 45)

Saída:
✓ Ciclo Profano detectado: True
⚡ Intensidade Profana: 60
🕯️ Mensagem: "Força máxima da invocação necromante: 60"
```

### **Exemplo 4 - Sem Ciclo** ❌
```javascript
Entrada: [10, 8, 6, 4, 2]

Análise:
- [10, 8, 6]: 10 ≥ 8 (sequência decrescente) ✗
- [8, 6, 4]: 8 ≥ 6 (sequência decrescente) ✗
- [6, 4, 2]: 6 ≥ 4 (sequência decrescente) ✗

Saída:
✗ Ciclo Profano detectado: False
💀 Intensidade Profana: 0
⚠️ Mensagem: "Nenhum ciclo de ascensão: o ritual falha!"
```

---

## 🚀 Como Executar

1. **Clone o repositório:**
```bash
git clone https://github.com/luizfxdev/desafio_271.git
cd desafio_271
```

2. **Adicione os assets:**
   - Coloque seu vídeo `background.mp4` na pasta `assets/`
   - Coloque seu áudio `theme.mp3` na pasta `assets/`

3. **Abra o projeto:**
   - Abra o arquivo `index.html` em um navegador moderno
   - Ou use um servidor local (Live Server, http-server, etc.)

---

## 🎨 Características da Interface

- 🎥 **Vídeo de fundo em fullscreen** (3840x2160)
- 🎵 **Controles de áudio** integrados
- 🌙 **Tema dark necromante** com cores vibrantes
- ✨ **Animações suaves** e efeitos de brilho
- 📱 **Design totalmente responsivo**
- 🔍 **Validação detalhada** com passo a passo
- 📊 **Visualização clara** dos resultados

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com animações
- **JavaScript (ES6+)** - Lógica e interatividade
- **Design Responsivo** - Mobile-first approach

---

## 📁 Estrutura do Projeto

```
desafio_271/
├── index.html          # Estrutura principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica do algoritmo
├── assets/
│   ├── background.mp4  # Vídeo de fundo
│   └── theme.mp3       # Música tema
└── README.md           # Documentação
```

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

## ⭐ Mostre seu Apoio

Se este projeto foi útil para você, considere dar uma ⭐️ no repositório!

---

<div align="center">
  <p>Desenvolvido com 🕯️ e 💀 por Luiz Felipe</p>
  <p><i>Erga-se!🌙<i></p>
</div>
