// ===============================================
// ESTRUCTURA DE DATOS (NOVENA Y PERSONAJES)
// ===============================================

// Datos para las "Cartas" (Modal) de los Personajes
const novenaInfo = {
    "Niño Jesús": { titulo: "DÍA 9 - El Niño Jesús", reflexion: "Dios eligió nacer como un niño indefenso. La Navidad nos invita a redescubrir la pureza, la inocencia y el amor incondicional.", oracion: "Niño Jesús, Dios hecho pequeño por amor a nosotros, enséñanos la sencillez y la humildad. Amén." },
    "María": { titulo: "DÍA 8 - María, la Madre del Sí", reflexion: "María nos enseña que la verdadera grandeza está en la obediencia amorosa a Dios. Su 'sí' cambió la historia de la humanidad.", oracion: "Bendita María, tú que dijiste 'sí' al plan de Dios, ayúdanos a abrir nuestros corazones a la voluntad divina. Amén." },
    "San José": { titulo: "DÍA 7 - San José, el Padre Fiel", reflexion: "José nos muestra que la paternidad se vive en los actos concretos de amor y sacrificio. Su silencio es un testimonio de fe y obediencia.", oracion: "San José, padre justo y trabajador, intercede por todas las familias. Amén." },
    "Reyes Magos": { titulo: "DÍA 6 - Los Reyes Magos", reflexion: "Los Magos nos muestran que la búsqueda de Dios requiere esfuerzo, discernimiento y generosidad. Dieron lo mejor que tenían (oro, incienso y mirra).", oracion: "Señor, hoy rememoramos a los Reyes Magos, enséñanos a buscarte con perseverancia y a dar lo mejor de nosotros. Amén." },
    "Pastores": { titulo: "DÍA 3 - Los Pastores", reflexion: "Los pastores, los más humildes, fueron elegidos para ser los primeros testigos. La sencillez abre las puertas del cielo.", oracion: "Señor, hoy conmemoramos a los humildes pastores. Amén." },
    "El Buey": { titulo: "DÍA 1 - El Buey", reflexion: "El buey representa la fuerza del servicio silencioso. Nos invita a valorar el esfuerzo cotidiano y la humildad en el trabajo.", oracion: "Bondadoso señor, mediante el buey, recuérdanos el valor del trabajo humilde y constante. Amén." },
    "La Mula": { titulo: "DÍA 2 - La Mula", reflexion: "La mula nos enseña la resistencia y fidelidad. Nos recuerda que, con la gracia de Dios, podemos continuar el camino a pesar de las cargas.", oracion: "Señor hoy recordamos a la paciente mula, enséñanos la paciencia y la resistencia. Amén." },
    "Ángeles": { titulo: "DÍA 5 - Los Ángeles Mensajeros", reflexion: "Los ángeles nos recuerdan que Dios siempre tiene un mensaje de esperanza. Su canto es una invitación a vivir en armonía.", oracion: "Señor, hoy recordamos a tus ángeles, mensajeros de buenas nuevas. Amén." },
};

// Data completa para la paginación del LIBRO (9 Días)
const finalNovenaData = [
    novenaInfo["El Buey"],
    novenaInfo["La Mula"],
    novenaInfo["Pastores"],
    // Se añade el Día 4 (Estrella) para completar los 9 días:
    { titulo: "DÍA 4 - La Estrella de Belén", reflexion: "La Estrella nos recuerda que Dios siempre nos da señales para encontrarlo. Debemos estar atentos a su luz para que dé sentido a nuestra existencia.", oracion: "Hoy evocamos a la luminosa Estrella de Belén, ilumina nuestro camino. Amén." },
    novenaInfo["Ángeles"], 
    novenaInfo["Reyes Magos"],
    novenaInfo["San José"],
    novenaInfo["María"],
    novenaInfo["Niño Jesús"]
];


// ===============================================
// LÓGICA DE LA ESCENA (index.html)
// ===============================================
if (document.body.classList.contains('scene-page')) {
    const interactivePoints = document.querySelectorAll('.interactive-point');
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalReflection = document.getElementById('modal-reflection');
    const modalPrayer = document.getElementById('modal-prayer');
    const closeModalButton = document.querySelector('.close-button');
    const musicToggle = document.getElementById('toggle-music');
    
    // --- Lógica del Modal (Carta de Información del Personaje) ---
    interactivePoints.forEach(point => {
        point.addEventListener('click', () => {
            const characterName = point.getAttribute('data-info');
            const data = novenaInfo[characterName];

            if (data) {
                modalTitle.textContent = `${data.titulo} (${characterName})`;
                modalReflection.textContent = `REFLEXIÓN: ${data.reflexion}`;
                modalPrayer.textContent = `ORACIÓN: ${data.oracion}`;
                modal.style.display = 'block';
            }
        });
    });

    closeModalButton.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- Lógica del Reproductor de YouTube para la Música ---
    let player;
    const youtubeVideoId = 'b22jdueoZkA'; // Villancico de ejemplo

    // Función que se llama automáticamente cuando la API de YouTube está lista
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            videoId: youtubeVideoId,
            playerVars: {
                'autoplay': 1,
                'loop': 1,
                'playlist': youtubeVideoId,
                'controls': 0,
                'mute': 1, 
                'disablekb': 1,
                'modestbranding': 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        musicToggle.addEventListener('click', () => {
            if (player.isMuted()) {
                player.unMute();
                player.setVolume(50); 
                musicToggle.textContent = '🎵 Pausar Música';
            } else {
                player.mute();
                musicToggle.textContent = '🎶 Reanudar Música';
            }
        });
    }
}


// ===============================================
// LÓGICA DEL LIBRO (libro.html)
// ===============================================
if (document.body.classList.contains('book-page')) {
    let currentPage = 0; 

    const bookContent = document.getElementById('book-content');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageIndicator = document.getElementById('page-indicator');

    function renderPage(index) {
        const item = finalNovenaData[index];
        bookContent.innerHTML = `
            <h3>${item.titulo}</h3>
            <p class="reflection"><strong>REFLEXIÓN:</strong> ${item.reflexion}</p>
            <p class="prayer"><strong>ORACIÓN:</strong> ${item.oracion}</p>
        `;
        
        pageIndicator.textContent = `Día ${index + 1} / ${finalNovenaData.length}`;

        prevButton.disabled = index === 0;
        nextButton.disabled = index === finalNovenaData.length - 1;
    }

    // Eventos de los botones de navegación
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < finalNovenaData.length - 1) {
            currentPage++;
            renderPage(currentPage);
        }
    });

    // Cargar la primera página (Día 1) al iniciar la vista de libro
    renderPage(currentPage);
}