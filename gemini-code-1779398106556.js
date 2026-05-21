const Temario = [
    {
        id: "tema1",
        title: "TEMA 1 — Números Reales",
        sections: [
            {
                subtitle: "1. Lenguaje Matemático y Números Reales",
                content: `
                    <p>Los números reales ($\\mathbb{R}$) incluyen todos los números racionales (fracciones, enteros, naturales) e irracionales (como $\\pi$ o $\\sqrt{2}$).</p>
                    <div class="example-box">
                        <strong>Ejemplo paso a paso:</strong> Clasifica el número $-5.4$.<br>
                        1. ¿Es entero? No, tiene decimales.<br>
                        2. ¿Se puede expresar como fracción? Sí, $-54/10$.<br>
                        3. Por tanto, es un número Racional ($\\mathbb{Q}$) y, en consecuencia, un número Real ($\\mathbb{R}$).
                    </div>
                    <div class="alert-box"><strong>Error común:</strong> Pensar que las raíces de números negativos (como $\\sqrt{-4}$) son reales. ¡No lo son! Pertenecen a los números complejos (Tema 8).</div>
                `
            },
            {
                subtitle: "2. Intervalos",
                content: `
                    <p>Un intervalo es un conjunto de números reales comprendidos entre dos extremos.</p>
                    <ul>
                        <li><strong>Abierto $(a, b)$ o $]a, b[$:</strong> No incluye los extremos.</li>
                        <li><strong>Cerrado $[a, b]$:</strong> Sí incluye los extremos.</li>
                    </ul>
                    <div class="trick-box"><strong>Truco de examen:</strong> Fíjate bien en si la inecuación tiene $\\le$ (cerrado, corchete) o $<$ (abierto, paréntesis). En el infinito $\\infty$ SIEMPRE va paréntesis.</div>
                `
            },
            {
                subtitle: "3. Radicales y Logaritmos",
                content: `
                    <p>El logaritmo es la operación inversa a la exponenciación: $\\log_a(x) = y \\iff a^y = x$.</p>
                    <div class="example-box">
                        <strong>Resolución paso a paso:</strong> $\\log_2(8)$<br>
                        ¿A qué número tengo que elevar la base (2) para que me dé 8?<br>
                        $2^1 = 2$<br>
                        $2^2 = 4$<br>
                        $2^3 = 8$ $\\rightarrow$ Por lo tanto, $\\log_2(8) = 3$.
                    </div>
                `
            }
        ]
    },
    {
        id: "tema2",
        title: "TEMA 2 — Álgebra",
        sections: [
            {
                subtitle: "Ecuaciones y Sistemas Lineales",
                content: "<p>Para aplicar el método de Gauss, buscamos triangular la matriz de coeficientes...</p><p><em>(Estructura preparada. Ampliar contenido aquí)</em></p>"
            }
        ]
    },
    { id: "tema3", title: "TEMA 3 — Trigonometría", sections: [{ subtitle: "Razones Trigonométricas", content: "<p>Seno, coseno, tangente...</p>"}] },
    { id: "tema4", title: "TEMA 4 — Fórmulas trigonométricas", sections: [{ subtitle: "Ángulo Doble", content: "<p>$$ \\sin(2\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha) $$</p>"}] },
    { id: "tema5", title: "TEMA 5 — Vectores", sections: [{ subtitle: "Producto Escalar", content: "<p>Operaciones vectoriales...</p>"}] },
    { id: "tema6", title: "TEMA 6 — Geometría Analítica", sections: [{ subtitle: "Ecuaciones de la recta", content: "<p>Punto-pendiente, general, implícita...</p>"}] },
    // Tema 7 Omitido por instrucciones
    { id: "tema8", title: "TEMA 8 — Números complejos", sections: [{ subtitle: "Forma Binómica", content: "<p>$z = a + bi$</p>"}] },
    { id: "tema9", title: "TEMA 9 — Funciones", sections: [{ subtitle: "Dominio y Recorrido", content: "<p>Análisis de funciones...</p>"}] },
    { id: "tema10", title: "TEMA 10 — Límites y continuidad", sections: [{ subtitle: "Cálculo de Límites", content: "<p>Indeterminaciones...</p>"}] }
];