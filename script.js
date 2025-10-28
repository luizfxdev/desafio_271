// Elementos do DOM
const energyInput = document.getElementById('energy-input');
const detectBtn = document.getElementById('detect-btn');
const returnBtn = document.getElementById('return-btn');
const resultContent = document.getElementById('result-content');
const resultSection = document.getElementById('result-section');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');
const themeAudio = document.getElementById('theme-audio');

// Controles de áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
});

// Função principal: detecta ciclo profano
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

// Função para calcular intensidade máxima
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

// Função para exibir resultado detalhado
function displayResult(readings) {
  const cycleResult = detectProfaneCycle(readings);
  const { maxIntensity, maxCycle } = calculateMaxIntensity(readings);

  let html = '';

  // Passo 1: Entrada
  html += `
        <div class="step">
            <div class="step-title">📊 Entrada de Energia:</div>
            <div class="step-content">[${readings.join(', ')}]</div>
        </div>
    `;

  // Passo 2: Análise
  html += `
        <div class="step">
            <div class="step-title">🔍 Análise do Ritual:</div>
            <div class="step-content">Buscando sequências de três valores consecutivos em ordem crescente...</div>
        </div>
    `;

  // Passo 3: Verificação de cada tripla
  let foundCycles = [];
  let failedCycles = [];

  for (let i = 0; i < readings.length - 2; i++) {
    const a = readings[i];
    const b = readings[i + 1];
    const c = readings[i + 2];
    const isAscending = a < b && b < c;

    if (isAscending) {
      foundCycles.push({ index: i, values: [a, b, c], sum: a + b + c });
    } else {
      // Identifica por que falhou
      let reason = '';
      if (a >= b && b >= c) {
        reason = `${a} ≥ ${b} ≥ ${c} (sequência decrescente)`;
      } else if (a >= b) {
        reason = `${a} ≥ ${b} (primeiro não é menor que segundo)`;
      } else if (b >= c) {
        reason = `${b} ≥ ${c} (segundo não é menor que terceiro)`;
      } else {
        reason = `não forma sequência crescente estrita`;
      }

      failedCycles.push({
        index: i,
        values: [a, b, c],
        positions: [i, i + 1, i + 2],
        reason: reason
      });
    }
  }

  if (foundCycles.length > 0) {
    html += `
            <div class="step">
                <div class="step-title">✨ Ciclos Detectados:</div>
                <div class="step-content">
        `;

    foundCycles.forEach((cycle, idx) => {
      html += `<div style="margin: 8px 0;">
                Ciclo ${idx + 1}: [${cycle.values.join(', ')}] → 
                ${cycle.values[0]} < ${cycle.values[1]} < ${cycle.values[2]} ✓ 
                (Intensidade: ${cycle.sum})
            </div>`;
    });

    html += `</div></div>`;

    // Passo 4: Intensidade máxima
    html += `
            <div class="step">
                <div class="step-title">⚡ Cálculo da Intensidade Máxima:</div>
                <div class="step-content">
                    Ciclo mais poderoso: [${maxCycle.join(', ')}]<br>
                    Soma: ${maxCycle[0]} + ${maxCycle[1]} + ${maxCycle[2]} = ${maxIntensity}
                </div>
            </div>
        `;
  } else {
    // Mostrar todas as tentativas que falharam
    html += `
            <div class="step">
                <div class="step-title">❌ Verificação Detalhada:</div>
                <div class="step-content">
                    Nenhuma sequência de três valores consecutivos em ordem crescente foi encontrada.<br><br>
                    <strong>Análise de todas as triplas:</strong>
        `;

    failedCycles.forEach((cycle, idx) => {
      html += `<div style="margin: 10px 0; padding: 8px; background: rgba(255, 36, 0, 0.1); border-left: 2px solid #ff2400; border-radius: 3px;">
                <strong>Posições ${cycle.positions[0]}, ${cycle.positions[1]}, ${
        cycle.positions[2]
      }:</strong> [${cycle.values.join(', ')}]<br>
                ➤ ${cycle.reason} ✗
            </div>`;
    });

    html += `</div></div>`;

    // Mostrar resumo da falha
    html += `
            <div class="step">
                <div class="step-title">📉 Resultado da Verificação:</div>
                <div class="step-content">
                    O ciclo de ascensão falhou em todas as ${failedCycles.length} possíveis sequências.<br>
                    Nenhuma tripla consecutiva atende ao critério: a < b < c
                </div>
            </div>
        `;
  }

  // Resultado final
  if (cycleResult.found) {
    html += `
            <div class="final-result cycle-found">
                <div class="final-result-title">🕯️ CICLO PROFANO DETECTADO! 🕯️</div>
                <div class="step-content" style="margin: 10px 0;">
                    <strong>Resultado:</strong> True<br>
                    <strong>Intensidade Profana:</strong> ${maxIntensity}
                </div>
                <div class="final-result-value">
                    "Força máxima da invocação necromante: ${maxIntensity}"
                </div>
            </div>
        `;
  } else {
    html += `
            <div class="final-result cycle-not-found">
                <div class="final-result-title">💀 RITUAL FALHOU 💀</div>
                <div class="step-content" style="margin: 10px 0;">
                    <strong>Resultado:</strong> False<br>
                    <strong>Intensidade Profana:</strong> 0
                </div>
                <div class="final-result-value">
                    "Nenhum ciclo de ascensão: o ritual falha!"
                </div>
            </div>
        `;
  }

  resultContent.innerHTML = html;

  // Scroll suave para o resultado
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// Event listener para o botão DETECTAR
detectBtn.addEventListener('click', () => {
  const input = energyInput.value.trim();

  if (!input) {
    resultContent.innerHTML = `
            <div class="step">
                <div class="step-title">⚠️ Aviso:</div>
                <div class="step-content">Por favor, insira as leituras de energia espiritual.</div>
            </div>
        `;
    return;
  }

  try {
    // Processar entrada (números separados por vírgula)
    const readings = input.split(',').map(num => {
      const parsed = parseFloat(num.trim());
      if (isNaN(parsed)) {
        throw new Error('Entrada inválida');
      }
      return parsed;
    });

    if (readings.length < 3) {
      resultContent.innerHTML = `
                <div class="step">
                    <div class="step-title">⚠️ Aviso:</div>
                    <div class="step-content">São necessários pelo menos 3 valores para realizar o ritual.</div>
                </div>
            `;
      return;
    }

    displayResult(readings);
  } catch (error) {
    resultContent.innerHTML = `
            <div class="step">
                <div class="step-title">❌ Erro:</div>
                <div class="step-content">Entrada inválida. Use apenas números separados por vírgula (ex: 2, 5, 3, 8).</div>
            </div>
        `;
  }
});

// Event listener para o botão RETORNAR
returnBtn.addEventListener('click', () => {
  energyInput.value = '';
  resultContent.innerHTML = `
        <p class="placeholder-text">Aguardando invocação...</p>
    `;
  energyInput.focus();
});

// Permitir Enter para detectar
energyInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    detectBtn.click();
  }
});
