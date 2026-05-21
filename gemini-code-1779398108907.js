const Ejercicios = {
    tema1: [
        {
            pregunta: "¿A qué conjunto pertenece el número $\\pi$?",
            opciones: ["Racional ($\\mathbb{Q}$)", "Irracional", "Entero ($\\mathbb{Z}$)", "Natural ($\\mathbb{N}$)"],
            correcta: 1,
            explicacion: "Pi tiene infinitos decimales no periódicos, no se puede expresar como fracción."
        },
        {
            pregunta: "El intervalo $(-3, 5]$ significa que:",
            opciones: [
                "Incluye el -3 y el 5",
                "No incluye el -3 pero sí el 5",
                "Incluye el -3 pero no el 5",
                "No incluye ni el -3 ni el 5"
            ],
            correcta: 1,
            explicacion: "El paréntesis ( abierto ) excluye al extremo, el corchete [ cerrado ] lo incluye."
        }
    ],
    // Simulacro Global extrae de aquí
    examenGlobal: [
        { pregunta: "Resuelve: $\\log_3(81)$", opciones: ["3", "4", "9", "27"], correcta: 1 },
        { pregunta: "Si $\\vec{u} = (1, 2)$ y $\\vec{v} = (-1, 3)$, su producto escalar es:", opciones: ["5", "6", "-1", "0"], correcta: 0 }
    ]
};