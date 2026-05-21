// ==========================================
// 1. DATOS DE LA APP (Temario y Ejercicios)
// ==========================================
const Temario = [
    {
        id: "tema1",
        title: "TEMA 1 — Números Reales",
        sections: [
            {
                subtitle: "1. Lenguaje Matemático",
                content: `<p>Los números reales incluyen todos los racionales e irracionales.</p>
                          <div class="example-box"><strong>Ejemplo:</strong> $-5.4$ es Racional.</div>`
            }
        ]
    },
    { id: "tema2", title: "TEMA 2 — Álgebra", sections: [{ subtitle: "Ecuaciones", content: "<p>Contenido de álgebra...</p>" }] },
    { id: "tema3", title: "TEMA 3 — Trigonometría", sections: [{ subtitle: "Seno y Coseno", content: "<p>Contenido de trigonometría...</p>" }] }
];

const Ejercicios = {
    tema1: [
        {
            pregunta: "¿A qué conjunto pertenece el número pi?",
            opciones: ["Racional", "Irracional", "Entero"],
            correcta: 1,
            explicacion: "Pi tiene infinitos decimales no periódicos."
        }
    ]
};

// ==========================================
// 2. SISTEMA DE GUARDADO (LocalStorage)
// ==========================================
const StorageMgr = {
    data: { completedTopics: [], timeStudied: 0, streakDays: 0, apiKey: "" },
    init() {
        const stored = localStorage.getItem('MathMasterData');
        if (stored) this.data = { ...this.data, ...JSON.parse(stored) };
        setInterval(() => { this.data.timeStudied++; this.save(); }, 60000);
    },
    save() {
        localStorage.setItem('MathMasterData', JSON.stringify(this.data));
        this.updateUI();
    },
    markTopicCompleted(topicId) {
        if (!this.data.completedTopics.includes(topicId)) {
            this.data.completedTopics.push(topicId);
            this.save();
        }
    },
    updateUI() {
        document.getElementById('time-studied').innerText = this.data.timeStudied;
        const progress = Math.round((this.data.completedTopics.length / Temario.length) * 100) || 0;
        document.getElementById('global-progress').innerText = progress;
        document.getElementById('progress-fill').style.width = progress + '%';
    }
};

// ==========================================
// 3. CONTROL DE LA INTERFAZ (Botones y Menús)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    StorageMgr.init();
    StorageMgr.updateUI();
    renderSidebar();
    
    // Configurar IA
    setupAI();
});

function renderSidebar() {
    const list = document.getElementById('theme-list');
    list.innerHTML = '';
    Temario.forEach(tema => {
        const li = document.createElement('li');
        li.innerText = tema.title;
        if (StorageMgr.data.completedTopics.includes(tema.id)) {
            li.innerHTML += ' ✅';
        }
        li.addEventListener('click', () => loadTopic(tema.id));
        list.appendChild(li);
    });
}

function loadTopic(topicId) {
    const topic = Temario.find(t => t.id === topicId);
    document.getElementById('current-title').innerText = topic.title;
    const contentArea = document.getElementById('content-display');
    
    let html = '';
    topic.sections.forEach(sec => {
        html += `<div class="theory-section"><h3>${sec.subtitle}</h3>${sec.content}</div>`;
    });

    if (Ejercicios[topicId]) {
        html += `<div class="quiz-container">
                    <h3>Mini Test</h3>
                    <div id="quiz-area"></div>
                 </div>`;
    }

    html += `<button class="btn-primary" onclick="markAsDone('${topic.id}')"><i class="fas fa-check"></i> Completar Tema</button>`;
    contentArea.innerHTML = html;

    if (Ejercicios[topicId]) renderQuiz(topicId);
    if (window.MathJax) MathJax.typesetPromise([contentArea]);
}

function renderQuiz(topicId) {
    const container = document.getElementById('quiz-area');
    const q = Ejercicios[topicId][0]; // Mostramos la primera de ejemplo
    let html = `<p><strong>${q.pregunta}</strong></p>`;
    q.opciones.forEach((opt, idx) => {
        html += `<button class="quiz-option" onclick="checkAnswer(this, ${idx}, ${q.correcta})">${opt}</button>`;
    });
    container.innerHTML = html;
}

function checkAnswer(btn, selected, correct) {
    if (selected === correct) {
        btn.classList.add('correct');
        alert("¡Correcto! 😎");
    } else {
        btn.classList.add('incorrect');
    }
}

function markAsDone(topicId) {
    StorageMgr.markTopicCompleted(topicId);
    renderSidebar();
}

// ==========================================
// 4. CHAT IA
// ==========================================
function setupAI() {
    const toggleBtn = document.getElementById('ai-toggle');
    const chatBox = document.getElementById('ai-chat');
    const sendBtn = document.getElementById('send-msg');
    const chatInput = document.getElementById('chat-input');
    const messagesArea = document.getElementById('chat-messages');
    
    toggleBtn.addEventListener('click', () => chatBox.classList.toggle('hidden'));
    
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Mensaje Usuario
        messagesArea.innerHTML += `<div class="msg user">${text}</div>`;
        chatInput.value = "";
        
        // Respuesta simulada IA
        setTimeout(() => {
            messagesArea.innerHTML += `<div class="msg ai">Esta es una respuesta simulada. Para conectar la IA real, necesitaremos añadir tu clave de API, pero primero vamos a dejar el diseño perfecto. 🤖</div>`;
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }, 1000);
    });
}