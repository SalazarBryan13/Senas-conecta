// ============================================
// SEÑASCONECTA - Módulo de Historias
// ============================================

// Estado global de las historias
const GameState = {
    currentScreen: 'story-screen',
    playerType: 'hearing',
    gameMode: 'story',
    currentChapter: 0,
    currentScene: 0,
    pendingDecision: null,
    currentSceneHelp: '',
    progress: {
        lessonsCompleted: 0,
        totalLessons: 5,
        accuracy: 0,
        signsLearned: 0,
        chaptersCompleted: 0,
        totalChapters: 4,
        lastChapter: 0,
        lastScene: 0
    },
    settings: {
        showSubtitles: true,
        signLanguage: 'lsm'
    }
};

// Datos de la historia
// Las imágenes deben colocarse en: assets/images/
// Nomenclatura sugerida: escenaX_Y.png (X=capítulo, Y=escena)
const StoryChapters = [
    {
        id: 1,
        title: 'Capítulo 1 - Encuentro en la Escuela',
        scenes: [
            {
                id: 1,
                image: 'assets/images/escena1_1.png', // ← Imagen de ejemplo cargada
                description: 'Estás en la escuela y conoces a una persona sorda. Ella intenta comunicarse contigo usando señas. ¿Qué haces?',
                help: 'Recuerda: las personas sordas se comunican principalmente a través de la lengua de señas. Hablar en voz alta no les ayuda si no pueden escucharte.',
                decisions: [
                    {
                        id: 'speak',
                        text: 'Intentar hablar en voz alta',
                        feedback: 'La persona no puede escucharte. Las personas sordas no pueden oír, por lo que hablar no es efectivo. Intenta usar señas básicas o escribir.',
                        nextScene: 2,
                        correct: false
                    },
                    {
                        id: 'signs',
                        text: 'Usar señas básicas que conoces',
                        feedback: '¡Excelente! La persona te entiende y se alegra de que intentes comunicarte en su idioma. Te enseña la seña de "Hola" correctamente.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'write',
                        text: 'Escribir en papel o teléfono',
                        feedback: 'Es una buena alternativa temporal, pero aprender señas muestra respeto por su cultura y permite una comunicación más fluida.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: '', // assets/images/escena1_2.png
                description: 'La persona sorda te pregunta si quieres aprender más señas. Te explica que la lengua de señas es su idioma natural. ¿Qué respondes?',
                help: 'La lengua de señas no es solo gestos, es un idioma completo con su propia gramática y estructura. Aprenderla muestra respeto y empatía.',
                decisions: [
                    {
                        id: 'yes',
                        text: 'Sí, quiero aprender más',
                        feedback: '¡Perfecto! La persona está emocionada de enseñarte. Aprenderás que la lengua de señas tiene su propia gramática y estructura.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'maybe',
                        text: 'Tal vez después',
                        feedback: 'La persona respeta tu decisión, pero te explica que aprender señas es importante para la inclusión. Te anima a intentarlo cuando estés listo.',
                        nextScene: 3,
                        correct: false
                    },
                    {
                        id: 'no',
                        text: 'No, gracias',
                        feedback: 'Perdiste una oportunidad valiosa. Aprender lengua de señas abre puertas a una comunidad rica en cultura y te permite comunicarte de manera inclusiva.',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: '', // assets/images/escena1_3.png
                description: 'Has aprendido varias señas básicas. La persona te explica que las personas sordas forman una comunidad con su propia cultura. ¿Qué haces ahora?',
                help: 'La comunidad sorda tiene su propia cultura, historia y tradiciones. Es importante respetar y valorar esta diversidad.',
                decisions: [
                    {
                        id: 'practice',
                        text: 'Practicar más señas y preguntar sobre su cultura',
                        feedback: '¡Excelente decisión! Aprender sobre la cultura sorda te ayuda a entender mejor y ser más inclusivo. La práctica constante es clave.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'stop',
                        text: 'Tomar un descanso',
                        feedback: 'Está bien descansar, pero recuerda que la práctica regular es importante para retener lo aprendido.',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: '', // assets/images/escena1_4.png
                description: 'Has completado el primer capítulo. Has aprendido que la comunicación inclusiva es fundamental. ¡Felicidades!',
                help: 'Has dado el primer paso hacia una comunicación más inclusiva. Continúa aprendiendo y practicando.',
                decisions: []
            }
        ]
    },
    {
        id: 2,
        title: 'Capítulo 2 - Encuentro en el Parque',
        scenes: [
            {
                id: 1,
                image: '', // assets/images/escena2_1.png
                description: 'Estás en el parque y ves a un grupo de personas sordas conversando en lengua de señas. Te das cuenta de que se comunican de manera muy expresiva. ¿Qué haces?',
                help: 'Las personas sordas usan expresiones faciales y movimientos corporales como parte de su comunicación. Esto es natural y necesario en la lengua de señas.',
                decisions: [
                    {
                        id: 'approach',
                        text: 'Acercarte y saludar con señas',
                        feedback: '¡Bien! Te acercas respetuosamente y usas las señas que aprendiste. El grupo te recibe amablemente y te invita a practicar.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'observe',
                        text: 'Observar desde lejos',
                        feedback: 'Observar puede ser útil para aprender, pero participar activamente es mejor. Las personas sordas generalmente aprecian cuando intentas comunicarte.',
                        nextScene: 2,
                        correct: false
                    },
                    {
                        id: 'ignore',
                        text: 'Ignorar y seguir tu camino',
                        feedback: 'Perdiste una oportunidad de practicar y conocer más sobre la comunidad sorda. La interacción social es importante para el aprendizaje.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: '', // assets/images/escena2_2.png
                description: 'Una persona del grupo te explica que las expresiones faciales son parte esencial de la lengua de señas, no solo decoración. ¿Cómo reaccionas?',
                help: 'En la lengua de señas, las expresiones faciales transmiten información gramatical y emocional. Son tan importantes como las palabras en el lenguaje hablado.',
                decisions: [
                    {
                        id: 'understand',
                        text: 'Entender y practicar con expresiones',
                        feedback: '¡Perfecto! Entiendes que las expresiones faciales son parte del idioma. Practicas y mejoras tu comunicación.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'confused',
                        text: 'Sentirte confundido',
                        feedback: 'Es normal sentirse confundido al principio. Pide ayuda y practica. La persona te anima a seguir intentando.',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: '', // assets/images/escena2_3.png
                description: 'Has aprendido sobre la importancia de las expresiones faciales. El grupo te invita a un evento de la comunidad sorda. ¿Aceptas?',
                help: 'Participar en eventos de la comunidad sorda es una excelente manera de aprender, practicar y conocer más sobre la cultura sorda.',
                decisions: [
                    {
                        id: 'accept',
                        text: 'Sí, acepto la invitación',
                        feedback: '¡Excelente! Participar en eventos de la comunidad sorda te ayudará a mejorar y entender mejor su cultura.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'decline',
                        text: 'Declinar amablemente',
                        feedback: 'Es tu decisión, pero perderás una valiosa oportunidad de aprendizaje y conexión con la comunidad.',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: '', // assets/images/escena2_4.png
                description: 'Has completado el segundo capítulo. Has aprendido sobre la importancia de las expresiones faciales y la comunidad sorda. ¡Bien hecho!',
                help: 'Cada capítulo te acerca más a una comunicación verdaderamente inclusiva. Sigue aprendiendo.',
                decisions: []
            }
        ]
    },
    {
        id: 3,
        title: 'Capítulo 3 - Inclusión en el Trabajo',
        scenes: [
            {
                id: 1,
                image: '', // assets/images/escena3_1.png
                description: 'En tu trabajo, un nuevo compañero es sordo. Tu jefe te pide que le ayudes a integrarse. ¿Cómo te preparas?',
                help: 'La inclusión en el trabajo es fundamental. Prepararte con antelación muestra profesionalismo y empatía.',
                decisions: [
                    {
                        id: 'prepare',
                        text: 'Aprender señas básicas del trabajo',
                        feedback: '¡Excelente! Te preparas aprendiendo señas relacionadas con el trabajo. Esto facilitará la comunicación y la inclusión.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'improvise',
                        text: 'Improvisar cuando llegue',
                        feedback: 'Aunque puedes improvisar, prepararte de antemano muestra respeto y hace que la comunicación sea más fluida desde el inicio.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: '', // assets/images/escena3_2.png
                description: 'Tu compañero sordo llega. Te das cuenta de que las reuniones no son accesibles para él. ¿Qué haces?',
                help: 'La accesibilidad es un derecho. Las personas sordas necesitan intérpretes o subtítulos en tiempo real para participar plenamente en reuniones.',
                decisions: [
                    {
                        id: 'suggest-interpreter',
                        text: 'Sugerir un intérprete de señas',
                        feedback: '¡Perfecto! Sugerir un intérprete muestra que entiendes las necesidades de accesibilidad. Tu jefe contrata uno y todos pueden participar equitativamente.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'write-notes',
                        text: 'Ofrecerte a tomar notas',
                        feedback: 'Es un buen gesto, pero no es suficiente. Las personas sordas necesitan acceso completo a la información en tiempo real.',
                        nextScene: 3,
                        correct: false
                    },
                    {
                        id: 'nothing',
                        text: 'No hacer nada',
                        feedback: 'No hacer nada excluye a tu compañero. La inclusión requiere acción y consideración de las necesidades de todos.',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: '', // assets/images/escena3_3.png
                description: 'Con el intérprete, tu compañero puede participar plenamente. Te das cuenta de que la inclusión beneficia a todos. ¿Qué aprendes?',
                help: 'La inclusión no es solo lo correcto, también mejora el ambiente de trabajo y la productividad de todos.',
                decisions: [
                    {
                        id: 'learn-more',
                        text: 'Aprender más sobre accesibilidad',
                        feedback: '¡Excelente! Entiendes que la accesibilidad es un derecho y beneficia a todos. Te conviertes en un aliado de la inclusión.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'status-quo',
                        text: 'Mantener el status quo',
                        feedback: 'Aunque el intérprete ayuda, hay más que puedes hacer para promover la inclusión. Cada acción cuenta.',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: '', // assets/images/escena3_4.png
                description: 'Has completado el tercer capítulo. Has aprendido sobre inclusión laboral y accesibilidad. ¡Felicidades por ser un aliado de la inclusión!',
                help: 'La inclusión es un proceso continuo. Sigue aprendiendo y abogando por la accesibilidad en todos los espacios.',
                decisions: []
            }
        ]
    },
    {
        id: 4,
        title: 'Capítulo 4 - Familia y Amistad',
        scenes: [
            {
                id: 1,
                image: '', // assets/images/escena4_1.png
                description: 'Conoces a una familia donde los padres son sordos y los hijos oyentes. Te invitan a cenar. ¿Cómo te preparas?',
                help: 'Muchas familias tienen miembros sordos y oyentes. La comunicación inclusiva fortalece los lazos familiares.',
                decisions: [
                    {
                        id: 'learn-family-signs',
                        text: 'Aprender señas familiares básicas',
                        feedback: '¡Perfecto! Aprender señas familiares muestra respeto y te permite comunicarte directamente con los padres sordos.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'rely-on-kids',
                        text: 'Confiar en que los hijos traduzcan',
                        feedback: 'Aunque los hijos pueden ayudar, comunicarte directamente con los padres muestra respeto y evita que los hijos sean siempre traductores.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: '', // assets/images/escena4_2.png
                description: 'En la cena, te das cuenta de que la familia se comunica principalmente en señas. Los hijos son bilingües (señas y español). ¿Qué haces?',
                help: 'Los hijos de padres sordos a menudo crecen siendo bilingües. Esto es natural y enriquecedor para su desarrollo.',
                decisions: [
                    {
                        id: 'participate',
                        text: 'Participar usando tus señas aprendidas',
                        feedback: '¡Excelente! Participas activamente en la conversación. La familia aprecia tu esfuerzo y te ayuda a mejorar.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'observe-only',
                        text: 'Solo observar y hablar con los hijos',
                        feedback: 'Aunque es cómodo, participar directamente en señas muestra respeto y te permite conocer mejor a toda la familia.',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: '', // assets/images/escena4_3.png
                description: 'Has aprendido que las familias sordas tienen dinámicas únicas y valiosas. ¿Qué valoras más de esta experiencia?',
                help: 'Cada familia tiene su propia forma de comunicarse. Las familias sordas muestran que hay muchas formas válidas de conexión.',
                decisions: [
                    {
                        id: 'appreciate-diversity',
                        text: 'Apreciar la diversidad y riqueza cultural',
                        feedback: '¡Perfecto! Entiendes que la diversidad enriquece nuestras vidas. Has ganado una nueva perspectiva valiosa.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'see-challenge',
                        text: 'Ver solo los desafíos',
                        feedback: 'Aunque hay desafíos, también hay muchas fortalezas y riqueza cultural. Intenta ver el panorama completo.',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: '', // assets/images/escena4_4.png
                description: 'Has completado el cuarto capítulo. Has aprendido sobre las familias sordas y la importancia de la comunicación inclusiva en todos los contextos. ¡Excelente trabajo!',
                help: 'La inclusión comienza en casa y se extiende a todos los aspectos de la vida. Sigue aprendiendo y practicando.',
                decisions: []
            }
        ]
    }
];

// ============================================
// FUNCIONES DE NAVEGACIÓN
// ============================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        GameState.currentScreen = screenId;
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Cargar configuración
    loadSettings();

    // Cargar progreso
    loadProgress();

    // Obtener parámetros desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const chapterParam = urlParams.get('chapter');
    const screenParam = urlParams.get('screen');

    if (chapterParam !== null) {
        GameState.currentChapter = parseInt(chapterParam) || 0;
        GameState.currentScene = 0; // Siempre empezar desde la escena 0 del capítulo
    }

    // Configurar event listeners
    setupStoryListeners();
    setupResultListeners();
    setupProgressMapListeners();

    // Verificar si se debe mostrar el mapa de progreso directamente
    if (screenParam === 'progress-map') {
        showScreen('progress-map-screen');
        updateProgressMap();
    } else {
        // Cargar escena inicial
        loadStoryScene(GameState.currentChapter, GameState.currentScene);
    }
});

// ============================================
// CONFIGURACIÓN
// ============================================

function loadSettings() {
    const saved = localStorage.getItem('senasconecta-settings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            GameState.settings = { ...GameState.settings, ...parsed };
        } catch (e) {
            console.error('Error cargando configuración:', e);
        }
    }
}

function loadProgress() {
    const saved = localStorage.getItem('senasconecta-progress');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            GameState.progress = { ...GameState.progress, ...parsed };
        } catch (e) {
            console.error('Error cargando progreso:', e);
        }
    }
}

function saveProgress() {
    try {
        localStorage.setItem('senasconecta-progress', JSON.stringify(GameState.progress));
    } catch (e) {
        console.error('Error guardando progreso:', e);
    }
}

// ============================================
// SISTEMA DE HISTORIA
// ============================================

function setupStoryListeners() {
    const decisionOptionsContainer = document.querySelector('.decision-options');
    const continueSceneBtn = document.getElementById('continue-scene-btn');
    const viewMapStoryBtn = document.getElementById('view-map-story-btn');
    const storyHelpBtn = document.getElementById('story-help-btn');

    if (decisionOptionsContainer) {
        decisionOptionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.decision-option');
            if (option && !option.disabled) {
                handleDecision(option);
            }
        });
    }

    if (continueSceneBtn) {
        continueSceneBtn.addEventListener('click', () => {
            continueToNextScene();
        });
    }

    // Botón Ver mapa - siempre va al mapa
    if (viewMapStoryBtn) {
        viewMapStoryBtn.addEventListener('click', () => {
            showScreen('progress-map-screen');
            updateProgressMap();
        });
    }

    // Botón Siguiente capítulo - va al siguiente capítulo
    const nextChapterBtn = document.getElementById('next-chapter-btn');
    if (nextChapterBtn) {
        nextChapterBtn.addEventListener('click', () => {
            GameState.currentChapter++;
            GameState.currentScene = 0;
            GameState.progress.lastChapter = GameState.currentChapter;
            GameState.progress.lastScene = 0;
            saveProgress();
            showScreen('story-screen');
            loadStoryScene(GameState.currentChapter, GameState.currentScene);
        });
    }

    if (storyHelpBtn) {
        storyHelpBtn.addEventListener('click', () => {
            showStoryHelp();
        });
    }
}

function loadStoryScene(chapterIndex, sceneIndex) {
    if (chapterIndex >= StoryChapters.length) {
        showResultScreen();
        return;
    }

    const chapter = StoryChapters[chapterIndex];
    const scene = chapter.scenes[sceneIndex];

    if (!scene) {
        GameState.currentChapter++;
        GameState.currentScene = 0;
        if (GameState.currentChapter < StoryChapters.length) {
            loadStoryScene(GameState.currentChapter, GameState.currentScene);
        } else {
            showResultScreen();
        }
        return;
    }

    // Guardar progreso
    GameState.progress.lastChapter = chapterIndex;
    GameState.progress.lastScene = sceneIndex;
    saveProgress();

    const chapterTitle = document.getElementById('chapter-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const decisionOptions = document.querySelectorAll('.decision-option');
    const decisionFeedback = document.getElementById('decision-feedback');
    const progressBar = document.getElementById('chapter-progress-bar');
    const progressText = document.getElementById('chapter-progress-text');

    if (chapterTitle) {
        chapterTitle.textContent = chapter.title;
    }

    if (scenarioDescription) {
        if (GameState.settings.showSubtitles) {
            scenarioDescription.textContent = scene.description;
            scenarioDescription.style.visibility = 'visible';
        } else {
            scenarioDescription.style.visibility = 'hidden';
        }
    }

    // Cargar imagen de la escena si existe
    const sceneImg = document.getElementById('scene-img');
    const imageFrame = document.getElementById('image-frame');
    const placeholder = document.getElementById('illustration-placeholder');

    if (scene.image && scene.image.trim() !== '') {
        // Hay imagen para esta escena
        if (sceneImg) {
            sceneImg.src = scene.image;
            sceneImg.alt = `Ilustración: ${scene.description.substring(0, 50)}...`;
            sceneImg.style.display = 'block';
        }
        if (imageFrame) {
            imageFrame.classList.add('has-image');
        }
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    } else {
        // No hay imagen, mostrar placeholder
        if (sceneImg) {
            sceneImg.src = '';
            sceneImg.style.display = 'none';
        }
        if (imageFrame) {
            imageFrame.classList.remove('has-image');
        }
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
    }

    GameState.currentSceneHelp = scene.help || 'No hay ayuda disponible para esta escena.';

    const isEndOfChapter = !scene.decisions || scene.decisions.length === 0;

    decisionOptions.forEach((option, index) => {
        if (scene.decisions && scene.decisions[index]) {
            const decision = scene.decisions[index];
            option.textContent = decision.text;
            option.setAttribute('data-decision', decision.id);
            option.classList.remove('selected');
            option.style.display = 'block';
            option.disabled = false;
        } else {
            option.style.display = 'none';
        }
    });

    const continueSceneBtn = document.getElementById('continue-scene-btn');
    const viewMapStoryBtn = document.getElementById('view-map-story-btn');
    const decisionOptionsContainer = document.querySelector('.decision-options');

    // ========================================
    // IMPORTANTE: SIEMPRE ocultar AMBOS botones al cargar cualquier escena
    // Los botones solo aparecerán después de que el usuario responda
    // ========================================
    if (continueSceneBtn) {
        continueSceneBtn.style.display = 'none';
        continueSceneBtn.disabled = true;
    }
    if (viewMapStoryBtn) {
        viewMapStoryBtn.style.display = 'none';
    }

    if (isEndOfChapter) {
        // ========================================
        // ESCENA FINAL SIN DECISIONES
        // Mostrar botones de ver mapa + siguiente capítulo
        // ========================================
        if (decisionOptionsContainer) {
            decisionOptionsContainer.style.display = 'none';
        }

        // Marcar capítulo como completado
        if (GameState.progress.chaptersCompleted <= GameState.currentChapter) {
            GameState.progress.chaptersCompleted = GameState.currentChapter + 1;
        }
        saveProgress();

        // Mostrar botones según si es el último capítulo o no
        const isLastChapter = GameState.currentChapter >= StoryChapters.length - 1;
        const nextChapterBtn = document.getElementById('next-chapter-btn');

        if (isLastChapter) {
            // Último capítulo - solo mostrar "Historia Completada"
            if (viewMapStoryBtn) {
                viewMapStoryBtn.textContent = '🎉 ¡Historia Completada! Ver mapa';
                viewMapStoryBtn.style.display = 'block';
            }
            if (nextChapterBtn) {
                nextChapterBtn.style.display = 'none';
            }
        } else {
            // Capítulos 1-3 - mostrar AMBOS botones
            if (viewMapStoryBtn) {
                viewMapStoryBtn.textContent = '🗺️ Ver mapa de avance';
                viewMapStoryBtn.style.display = 'block';
            }
            if (nextChapterBtn) {
                nextChapterBtn.style.display = 'block';
            }
        }
    } else {
        // ========================================
        // ESCENA NORMAL CON DECISIONES
        // Mostrar opciones, ocultar botones (aparecerán al responder)
        // ========================================
        if (decisionOptionsContainer) {
            decisionOptionsContainer.style.display = 'block';
        }
        // Los botones YA están ocultos arriba
        const nextChapterBtn = document.getElementById('next-chapter-btn');
        if (nextChapterBtn) {
            nextChapterBtn.style.display = 'none';
        }
    }

    if (decisionFeedback) {
        decisionFeedback.style.display = 'none';
        decisionFeedback.textContent = '';
        decisionFeedback.className = 'decision-feedback';
    }

    const totalScenes = chapter.scenes.length;
    const progress = ((sceneIndex + 1) / totalScenes) * 100;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (progressText) {
        progressText.textContent = `Escena ${sceneIndex + 1} de ${totalScenes}`;
    }
}

function handleDecision(selectedOption) {
    const chapter = StoryChapters[GameState.currentChapter];
    const scene = chapter.scenes[GameState.currentScene];
    const decisionId = selectedOption.getAttribute('data-decision');
    const decision = scene.decisions.find(d => d.id === decisionId);
    const decisionOptions = document.querySelectorAll('.decision-option');
    const decisionFeedback = document.getElementById('decision-feedback');

    if (!decision) return;

    GameState.pendingDecision = decision;

    decisionOptions.forEach(option => {
        option.classList.remove('selected');
        option.disabled = true;
    });

    selectedOption.classList.add('selected');

    if (decisionFeedback) {
        decisionFeedback.style.display = 'block';
        decisionFeedback.textContent = decision.feedback;
        decisionFeedback.className = `decision-feedback ${decision.correct ? 'success' : 'error'}`;
    }

    if (decision.correct) {
        GameState.progress.signsLearned++;
    }

    const isEndOfChapter = !decision.nextScene;
    const isLastChapter = GameState.currentChapter >= StoryChapters.length - 1;
    const continueSceneBtn = document.getElementById('continue-scene-btn');
    const viewMapStoryBtn = document.getElementById('view-map-story-btn');

    if (isEndOfChapter) {
        // Marcar capítulo como completado inmediatamente
        if (GameState.progress.chaptersCompleted <= GameState.currentChapter) {
            GameState.progress.chaptersCompleted = GameState.currentChapter + 1;
        }
        saveProgress();

        // Ocultar botón continuar - NO debe aparecer al final del capítulo
        if (continueSceneBtn) {
            continueSceneBtn.style.display = 'none';
            continueSceneBtn.disabled = true;
        }

        // Mostrar solo el botón de siguiente capítulo/ver mapa
        if (isLastChapter) {
            if (viewMapStoryBtn) {
                viewMapStoryBtn.textContent = '🎉 ¡Historia Completada! Ver mapa';
                viewMapStoryBtn.style.display = 'block';
            }
        } else {
            if (viewMapStoryBtn) {
                viewMapStoryBtn.textContent = 'Siguiente capítulo →';
                viewMapStoryBtn.style.display = 'block';
            }
        }
    } else {
        // Escena intermedia - mostrar botón continuar, ocultar ver mapa
        if (continueSceneBtn) {
            continueSceneBtn.style.display = 'block';
            continueSceneBtn.disabled = false;
        }
        if (viewMapStoryBtn) {
            viewMapStoryBtn.style.display = 'none';
        }
    }
}

function continueToNextScene() {
    const decision = GameState.pendingDecision;

    if (!decision) return;

    GameState.pendingDecision = null;

    if (decision.nextScene) {
        // Ir a la siguiente escena del mismo capítulo
        GameState.currentScene = decision.nextScene - 1;
        loadStoryScene(GameState.currentChapter, GameState.currentScene);
    } else {
        // Fin del capítulo - esto no debería ejecutarse porque usamos el botón viewMapStoryBtn
        // Pero por si acaso, ir al siguiente capítulo
        const isLastChapter = GameState.currentChapter >= StoryChapters.length - 1;
        if (isLastChapter) {
            showScreen('progress-map-screen');
            updateProgressMap();
        } else {
            GameState.currentChapter++;
            GameState.currentScene = 0;
            GameState.progress.lastChapter = GameState.currentChapter;
            GameState.progress.lastScene = 0;
            saveProgress();
            loadStoryScene(GameState.currentChapter, GameState.currentScene);
        }
    }
}

function showStoryHelp() {
    const tooltip = document.getElementById('help-tooltip');
    const tooltipContent = document.getElementById('tooltip-content');

    if (tooltip && tooltipContent) {
        tooltipContent.textContent = GameState.currentSceneHelp;
        tooltip.style.display = 'block';

        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// PANTALLA DE RESULTADOS
// ============================================

function showResultScreen() {
    showScreen('result-screen');
    updateResultScreen();
}

function setupResultListeners() {
    const nextLevelBtn = document.getElementById('next-level-btn');
    const viewProgressMapBtn = document.getElementById('view-progress-map-btn');
    const retryLessonBtn = document.getElementById('retry-lesson-btn');

    if (nextLevelBtn) {
        nextLevelBtn.addEventListener('click', () => {
            GameState.currentChapter++;
            if (GameState.currentChapter < StoryChapters.length) {
                GameState.currentScene = 0;
                showScreen('story-screen');
                loadStoryScene(GameState.currentChapter, GameState.currentScene);
            } else {
                showScreen('progress-map-screen');
                updateProgressMap();
            }
        });
    }

    if (viewProgressMapBtn) {
        viewProgressMapBtn.addEventListener('click', () => {
            showScreen('progress-map-screen');
            updateProgressMap();
        });
    }

    if (retryLessonBtn) {
        retryLessonBtn.addEventListener('click', () => {
            GameState.currentScene = 0;
            showScreen('story-screen');
            loadStoryScene(GameState.currentChapter, GameState.currentScene);
        });
    }
}

function updateResultScreen() {
    const progressBar = document.querySelector('.chapter-progress-section .progress-bar');
    const progressText = document.querySelector('.chapter-progress-section .progress-text');
    const statBoxes = document.querySelectorAll('.stats-container .stat-box');

    const chapterProgress = (GameState.progress.chaptersCompleted / GameState.progress.totalChapters) * 100;
    if (progressBar) {
        progressBar.style.width = `${chapterProgress}%`;
    }

    if (progressText) {
        progressText.textContent = `${GameState.progress.chaptersCompleted} de ${GameState.progress.totalChapters} capítulos completados`;
    }

    if (statBoxes.length >= 2) {
        const signsNumber = statBoxes[0].querySelector('.stat-number');
        const accuracyNumber = statBoxes[1].querySelector('.stat-number');

        if (signsNumber) {
            signsNumber.textContent = GameState.progress.signsLearned;
        }

        if (accuracyNumber) {
            const acc = Math.round(GameState.progress.accuracy) || 85;
            accuracyNumber.textContent = `${acc}%`;
        }
    }
}

// ============================================
// MAPA DE PROGRESO
// ============================================

function setupProgressMapListeners() {
    const continueAdventureBtn = document.getElementById('continue-adventure-btn');
    const chapterItems = document.querySelectorAll('.chapter-item.clickable');
    const pathNodes = document.querySelectorAll('.path-node');

    // Listeners para items de capítulo (diseño antiguo)
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            const chapterIndex = parseInt(item.getAttribute('data-chapter'));
            if (!isNaN(chapterIndex)) {
                startChapterFromMap(chapterIndex);
            }
        });
    });

    // Listeners para nodos del mapa (diseño nuevo - todos disponibles)
    pathNodes.forEach(node => {
        node.style.cursor = 'pointer';
        node.addEventListener('click', () => {
            const chapterIndex = parseInt(node.getAttribute('data-chapter'));
            if (!isNaN(chapterIndex)) {
                startChapterFromMap(chapterIndex);
            }
        });
        // También permitir con Enter
        node.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const chapterIndex = parseInt(node.getAttribute('data-chapter'));
                if (!isNaN(chapterIndex)) {
                    startChapterFromMap(chapterIndex);
                }
            }
        });
    });

    if (continueAdventureBtn) {
        continueAdventureBtn.addEventListener('click', () => {
            if (GameState.progress.lastChapter > 0 || GameState.progress.lastScene > 0) {
                GameState.currentChapter = GameState.progress.lastChapter;
                GameState.currentScene = GameState.progress.lastScene;
            } else {
                GameState.currentChapter = 0;
                GameState.currentScene = 0;
            }
            showScreen('story-screen');
            loadStoryScene(GameState.currentChapter, GameState.currentScene);
        });
    }
}

function startChapterFromMap(chapterIndex) {
    const chapter = StoryChapters[chapterIndex];
    if (!chapter) return;

    GameState.currentChapter = chapterIndex;
    GameState.currentScene = 0;
    showScreen('story-screen');
    loadStoryScene(GameState.currentChapter, GameState.currentScene);
}

function updateProgressMap() {
    // Buscar nodos del nuevo diseño o del diseño antiguo
    let chapters = document.querySelectorAll('.path-node');
    if (chapters.length === 0) {
        chapters = document.querySelectorAll('.chapter-item');
    }

    const totalChapters = StoryChapters.length;

    chapters.forEach((chapter, index) => {
        if (index >= totalChapters) {
            chapter.style.display = 'none';
            return;
        }

        const chapterData = StoryChapters[index];

        // Buscar elementos (compatibilidad con ambos diseños)
        const chapterTitle = chapter.querySelector('h3') || chapter.querySelector('.node-content h3');
        const chapterStatus = chapter.querySelector('.chapter-status') || chapter.querySelector('.node-badge');
        const progressBar = chapter.querySelector('.progress-bar') || chapter.querySelector('.node-progress-bar');

        let statusText = '';
        let badgeIcon = '';
        let chapterProgress = 0;

        // Determinar estado del capítulo - TODOS DESBLOQUEADOS
        if (index < GameState.progress.chaptersCompleted) {
            statusText = 'Completado';
            badgeIcon = '⭐';
            chapterProgress = 100;
            chapter.classList.add('completed');
            chapter.classList.remove('in-progress', 'available', 'locked');
        } else if (index === GameState.progress.lastChapter && GameState.progress.lastScene > 0) {
            statusText = 'En progreso';
            badgeIcon = '🎯';
            chapterProgress = ((GameState.progress.lastScene + 1) / chapterData.scenes.length) * 100;
            chapter.classList.add('in-progress', 'current');
            chapter.classList.remove('completed', 'available', 'locked');
        } else {
            // TODOS LOS CAPÍTULOS DISPONIBLES (no bloqueados)
            statusText = 'Disponible';
            badgeIcon = '🔓';
            chapterProgress = 0;
            chapter.classList.add('available');
            chapter.classList.remove('completed', 'in-progress', 'locked');
        }

        // Actualizar badge si existe (nuevo diseño)
        if (chapterStatus && chapterStatus.classList.contains('node-badge')) {
            const badgeIconEl = chapterStatus.querySelector('.badge-icon');
            if (badgeIconEl) {
                badgeIconEl.textContent = badgeIcon;
            }
            // Actualizar texto del badge
            chapterStatus.innerHTML = `<span class="badge-icon">${badgeIcon}</span> ${statusText}`;
            // Actualizar clase del badge - TODOS DISPONIBLES
            chapterStatus.className = 'node-badge';
            if (index < GameState.progress.chaptersCompleted) {
                chapterStatus.classList.add('completed-badge');
            } else if (index === GameState.progress.lastChapter && GameState.progress.lastScene > 0) {
                chapterStatus.classList.add('progress-badge');
            } else {
                chapterStatus.classList.add('available-badge');
            }
        } else if (chapterStatus) {
            chapterStatus.textContent = statusText;
        }

        if (progressBar) {
            progressBar.style.width = `${chapterProgress}%`;
        }
    });

    // Actualizar estadísticas globales - nuevo diseño
    const statsPanel = document.querySelector('.stats-panel');
    if (statsPanel) {
        const statItems = statsPanel.querySelectorAll('.stat-item');
        if (statItems.length >= 2) {
            const chaptersValue = statItems[0].querySelector('.stat-value');
            const signsValue = statItems[1].querySelector('.stat-value');

            if (chaptersValue) {
                chaptersValue.innerHTML = `${GameState.progress.chaptersCompleted}<span class="stat-total">/${totalChapters}</span>`;
            }
            if (signsValue) {
                signsValue.textContent = GameState.progress.signsLearned;
            }
        }
    }

    // Fallback: diseño antiguo
    const statBoxes = document.querySelectorAll('.global-stats .stat-box');
    if (statBoxes.length >= 3) {
        const chaptersNum = statBoxes[0].querySelector('.stat-number');
        const signsNum = statBoxes[1].querySelector('.stat-number');

        if (chaptersNum) {
            chaptersNum.textContent = `${GameState.progress.chaptersCompleted}/${totalChapters}`;
        }
        if (signsNum) {
            signsNum.textContent = GameState.progress.signsLearned;
        }
    }
}
