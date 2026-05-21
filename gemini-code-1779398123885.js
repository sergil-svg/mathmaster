document.addEventListener('DOMContentLoaded', () => {
    StorageMgr.init();
    renderSidebar();
    loadTopic(Temario[0].id);

    document.getElementById('btn-exam').addEventListener('click', startExamMode);
});

function renderSidebar() {
    const list = document.getElementById('theme-list');
    list.innerHTML = '';
    Temario.forEach(tema => {
        const li = document.createElement('li');
        li.innerText = tema.title;
        if (StorageMgr.data.completedTopics.includes(tema.id)) {
            li.innerHTML += ' <i class="fas fa-check-circle" style="color: var(--success)"></i>';
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
        html += `<div class="theory-section">
                    <h3>${sec.subtitle}</h3>
                    ${sec.content}
                 </div>`;
    });

    // Añadir Mini Test si existe
    if (Ejercicios[topicId]) {
        html += `<div class="quiz-container">
                    <h3>Mini Test Autocorregible</h3>
                    <div id="quiz-area-${topicId}"></div>
                 </div>`;
    }

    html += `<button class="btn-primary" onclick="markAsDone('${topic.id}')"><i class="fas fa-check"></i> Marcar Tema como Completado</button>`;
    
    contentArea.innerHTML = html;
    
    // Renderizar MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([contentArea]);
    }

    if (Ejercicios[topicId]) {
        renderQuiz(topicId, `quiz-area-${topicId}`);
    }
}

function renderQuiz(topicId, containerId) {
    const container = document.getElementById(containerId);
    const questions = Ejercicios[topicId];
    let html = '';

    questions.forEach((q, qIndex) => {
        html += `<div class="question-block" style="margin-bottom: 1.5rem;">
                    <p><strong>${qIndex + 1}. ${q.pregunta}</strong></p>`;
        q.opciones.forEach((opt, oIndex) => {
            html += `<button class="quiz-option" onclick="checkAnswer(this, ${qIndex}, ${oIndex}, '${topicId}')">${opt}</button>`;
        });
        html += `<div id="exp-${topicId}-${qIndex}" class="trick-box hidden"></div>`;
        html += `</div>`;
    });
    container.innerHTML = html;
}

function checkAnswer(btn, qIndex, oIndex, topicId) {
    const q = Ejercicios[topicId][qIndex];
    const siblings = btn.parentElement.querySelectorAll('.quiz-option');
    siblings.forEach(b => b.disabled = true); // Disable after click

    const expBox = document.getElementById(`exp-${topicId}-${qIndex}`);

    if (oIndex === q.correcta) {
        btn.classList.add('correct');
        StorageMgr.addCorrectExercise();
        expBox.innerHTML = `<strong>¡Correcto!</strong> ${q.explicacion || ''}`;
    } else {
        btn.classList.add('incorrect');
        siblings[q.correcta].classList.add('correct');
        expBox.innerHTML = `<strong>Incorrecto.</strong> ${q.explicacion || ''}`;
    }
    expBox.classList.remove('hidden');
    if (window.MathJax) MathJax.typesetPromise([expBox]);
}

function markAsDone(topicId) {
    StorageMgr.markTopicCompleted(topicId);
    renderSidebar();
    alert("¡Gran trabajo! Tema superado. Sigue así, el 10 está más cerca.");
}

function startExamMode() {
    const contentArea = document.getElementById('content-display');
    document.getElementById('current-title').innerText = "Simulacro de Examen Final";
    
    let html = `
        <div class="alert-box">
            <h3><i class="fas fa-stopwatch"></i> Tienes 60 minutos</h3>
            <p>Este modo simula las condiciones reales. Resuelve sin mirar los apuntes.</p>
        </div>
        <div id="exam-questions"></div>
        <button class="btn-primary mt-auto" onclick="finishExam()">Entregar Examen</button>
    `;
    contentArea.innerHTML = html;
    
    // Aquí se renderizaría un array mezclado de ejercicios de todos los temas.
    // Para el prototipo, cargamos los globales.
    renderQuiz('examenGlobal', 'exam-questions');
    if (window.MathJax) MathJax.typesetPromise([contentArea]);
}

function finishExam() {
    alert("¡Examen entregado! Calculando nota... (En producción esto contaría los aciertos vs fallos).");
}