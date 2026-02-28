// --- Base de Datos de Enfermedades y Soluciones ---
// En una aplicación real, esto vendría de una base de datos o API.
const tratamientosData = [
    {
        id: 1,
        enfermedad: "Moho Gris (Botrytis cinerea)",
        descripcion: "El problema más común. Aparece una vellosidad gris en frutos en maduración, pudriéndolos rápidamente, especialmente en clima húmedo.",
        sintomasDetallados: "Comienza como manchas marrones en los frutos que se ablandan. Luego, una masa de esporas grises y polvorientas cubre la superficie. Afecta también a flores y pedúnculos.",
        // Imágenes de placeholder (Reemplazar con las reales)
        imgEnferma: "https://placehold.co/600x400/e57373/white?text=Fresa+con+Moho+Gris",
        
        productoNombre: "BotriGras Pro",
        productoDescripcion: "Fungicida sistémico de acción rápida que detiene la esporulación de Botrytis.",
        productoPresentacion: "Garrafa 1 Litro",
        productoPrecio: 120000,
        productoDosis: "1.5 ml por litro de agua",
        imgSolucionProducto: "https://placehold.co/400x400/2196F3/white?text=Producto+BotriGras+Pro",
        
        resultadoEsperado: "Frutos limpios, firmes y con mayor vida post-cosecha.",
        imgSana: "https://images.unsplash.com/photo-1615485501624-2c210e508319?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        enfermedad: "Oídio o Ceniza (Podosphaera aphanis)",
        descripcion: "Un polvo blanco visible cubre el envés de las hojas, deformándolas y reduciendo la fotosíntesis.",
        sintomasDetallados: "Manchas blancas polvorientas en hojas y tallos. Las hojas se enrollan hacia arriba. Los frutos afectados no maduran correctamente y pueden agrietarse.",
        imgEnferma: "https://placehold.co/600x400/bdbdbd/333?text=Hojas+con+Oidio+Polvo+Blanco",
        
        productoNombre: "SulfurMax Active",
        productoDescripcion: "Fungicida a base de azufre micronizado con acción preventiva y curativa por contacto y vapor.",
        productoPresentacion: "Bolsa 5 Kg",
        productoPrecio: 85000,
        productoDosis: "3 gr por litro de agua",
        imgSolucionProducto: "https://placehold.co/400x400/ffb300/333?text=Producto+SulfurMax",
        
        resultadoEsperado: "Hojas verdes y brillantes, desarrollo vegetativo vigoroso sin deformaciones.",
        imgSana: "https://images.unsplash.com/photo-1589134755498-c56f29909c62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        enfermedad: "Antracnosis (Colletotrichum spp.)",
        descripcion: "Manchas negras y hundidas en los frutos y lesiones necróticas en los estolones que pueden matar la planta.",
        sintomasDetallados: "Lesiones circulares hundidas y oscuras en frutos verdes y maduros (conocido como 'ojo de buey'). Marchitez repentina de la planta por afectación de la corona.",
        imgEnferma: "https://placehold.co/600x400/5d4037/white?text=Fresa+con+Antracnosis+(Mancha+Negra)",
        
        productoNombre: "AnthraShield Duo",
        productoDescripcion: "Potente combinación de dos ingredientes activos para un control de amplio espectro contra la antracnosis.",
        productoPresentacion: "Frasco 500 cc",
        productoPrecio: 155000,
        productoDosis: "1 ml por litro de agua",
        imgSolucionProducto: "https://placehold.co/400x400/7b1fa2/white?text=Producto+AnthraShield",
        
        resultadoEsperado: "Coronas sanas, ausencia de lesiones en estolones y frutos de alta calidad.",
        imgSana: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
    }
];

// --- Elementos del DOM ---
const gridContainer = document.getElementById('disease-grid');
const priceTableBody = document.getElementById('price-table-body');
const modal = document.getElementById('treatment-modal');
const modalBodyContent = document.getElementById('modal-body-content');
const closeModalBtn = document.querySelector('.close-modal');

// --- Funciones Principales ---

// 1. Función para formatear moneda
function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
}

// 2. Renderizar las tarjetas de diagnóstico en la cuadrícula
function renderDiseaseGrid() {
    tratamientosData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('disease-card');
        // Añadimos un listener para abrir el modal al hacer clic en la tarjeta
        card.addEventListener('click', () => openModal(item));

        card.innerHTML = `
            <div class="card-image">
                <img src="${item.imgEnferma}" alt="${item.enfermedad}">
            </div>
            <div class="card-content">
                <h3>${item.enfermedad}</h3>
                <p>${item.descripcion}</p>
            </div>
            <div class="card-footer">
                Ver Solución <i class="fas fa-arrow-right"></i>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

// 3. Renderizar la tabla de precios rápida
function renderPriceTable() {
    tratamientosData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.productoNombre}</strong></td>
            <td>${item.enfermedad}</td>
            <td>${item.productoPresentacion}</td>
            <td style="color: var(--primary-green); font-weight: bold;">${formatCurrency(item.productoPrecio)}</td>
        `;
        priceTableBody.appendChild(row);
    });
}

// 4. Función para abrir y construir el Modal con detalles
function openModal(data) {
    // Construimos el HTML interno del modal dinámicamente basado en los datos recibidos
    modalBodyContent.innerHTML = `
        <div class="modal-header-styled">
            <h2>Diagnóstico: ${data.enfermedad}</h2>
        </div>
        <div class="modal-body-styled">
            <p><strong>Síntomas Detallados:</strong> ${data.sintomasDetallados}</p>
            
            <div class="workflow-grid">
                <div class="workflow-step step-sick">
                    <img src="${data.imgEnferma}" alt="Cultivo Enfermo">
                    <p><strong>1. El Problema</strong><br>Cultivo afectado</p>
                </div>
                <div class="workflow-step step-solution">
                    <img src="${data.imgSolucionProducto}" style="object-fit: contain; padding: 20px;" alt="Producto Solución">
                    <p><strong>2. La Solución</strong><br>Aplicación del tratamiento</p>
                </div>
                <div class="workflow-step step-healthy">
                    <img src="${data.imgSana}" alt="Cultivo Sano">
                    <p><strong>3. El Resultado</strong><br>Cosecha recuperada</p>
                </div>
            </div>

            <div class="solution-box">
                <h3><i class="fas fa-flask"></i> Tratamiento Recomendado: ${data.productoNombre}</h3>
                <p>${data.productoDescripcion}</p>
                <ul style="margin: 20px 0; padding-left: 20px;">
                    <li><strong>Dosis:</strong> ${data.productoDosis}</li>
                    <li><strong>Presentación:</strong> ${data.productoPresentacion}</li>
                </ul>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                    <div>Precio sugerido: <span class="price-tag">${formatCurrency(data.productoPrecio)}</span></div>
                    <button class="btn-primary"><i class="fas fa-shopping-cart"></i> Solicitar Pedido</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    // Deshabilitar el scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

// 5. Cerrar el modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Reactivar scroll
}

// --- Event Listeners e Inicialización ---

// Evento para el botón de cerrar (X)
closeModalBtn.addEventListener('click', closeModal);

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

// Inicializar la página cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderDiseaseGrid();
    renderPriceTable();
    console.log("FresaSana Solutions App Iniciada correctamente.");
});
