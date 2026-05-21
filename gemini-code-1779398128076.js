document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('ai-toggle');
    const chatBox = document.getElementById('ai-chat');
    const settingsBtn = document.getElementById('ai-settings-btn');
    const settingsPanel = document.getElementById('ai-settings');
    const saveKeyBtn = document.getElementById('save-api-key');
    const apiKeyInput = document.getElementById('api-key-input');
    const apiProviderSelect = document.getElementById('api-provider');
    const sendBtn = document.getElementById('send-msg');
    const chatInput = document.getElementById('chat-input');
    const messagesArea = document.getElementById('chat-messages');

    // Cargar credenciales guardadas
    apiKeyInput.value = StorageMgr.data.apiKey;
    apiProviderSelect.value = StorageMgr.data.apiProvider;

    toggleBtn.addEventListener('click', () => {
        chatBox.classList.toggle('hidden');
    });

    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    saveKeyBtn.addEventListener('click', () => {
        StorageMgr.data.apiKey = apiKeyInput.value;
        StorageMgr.data.apiProvider = apiProviderSelect.value;
        StorageMgr.save();
        settingsPanel.classList.add('hidden');
        addMessage("IA", "¡Configuración guardada! Listo para resolver dudas.");
    });

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage("Usuario", text);
        chatInput.value = "";

        if (!StorageMgr.data.apiKey) {
            addMessage("IA", "Por favor, configura tu API Key en la ⚙️ (rueda dentada) primero.");
            return;
        }

        // Mock UI loading
        const typingId = addMessage("IA", "Pensando paso a paso...");
        
        try {
            // AQUÍ ES DONDE CONECTAS LA API REAL. 
            // Como este código va a GitHub Pages (Frontend), hacemos la llamada directa.
            // *Nota de seguridad: Nunca subas la API Key hardcodeada a GitHub, por eso usamos localStorage.
            
            let responseText = "";

            if (StorageMgr.data.apiProvider === "openai") {
                responseText = await callOpenAI(text, StorageMgr.data.apiKey);
            } else {
                responseText = "Conexión a " + StorageMgr.data.apiProvider + " lista para implementar. (Devuelto modo prueba: " + text + ")";
            }

            updateMessage(typingId, responseText);
            if (window.MathJax) MathJax.typesetPromise([messagesArea]);

        } catch (error) {
            updateMessage(typingId, "Error de conexión. Revisa tu API Key y CORS.");
        }
    }

    function addMessage(sender, text) {
        const div = document.createElement('div');
        const id = 'msg-' + Date.now();
        div.id = id;
        div.className = `msg ${sender === "IA" ? "ai" : "user"}`;
        div.innerHTML = text;
        messagesArea.appendChild(div);
        messagesArea.scrollTop = messagesArea.scrollHeight;
        return id;
    }

    function updateMessage(id, text) {
        document.getElementById(id).innerHTML = text;
    }

    // Plantilla de conexión real a OpenAI
    async function callOpenAI(prompt, key) {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "system", content: "Eres un profesor experto en matemáticas. Resuelves paso a paso, buscas errores comunes, y respondes en formato Markdown y LaTeX para fórmulas."},
                    {role: "user", content: prompt}
                ]
            })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    }
});