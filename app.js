// ============================================
// SEÑASCONECTA - Juego de Aprendizaje de Lengua de Señas
// ============================================

// Estado global de la aplicación
// Estado global de la aplicación
// Estado global de la aplicación
// Estado global de la aplicación
const GameState = {
    currentScreen: 'home-screen',
    playerType: null, // 'hearing' o 'deaf'
    gameMode: null, // 'story' o 'practice'
    currentLesson: 0,
    currentChapter: 0,
    currentScene: 0,
    pendingDecision: null, // Decisión pendiente para continuar
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
        showSubtitles: true, // Controla si se ven los textos (Hard Mode si es false)
        signLanguage: 'lsm'
    }
};

// ...

// ============================================
// CONFIGURACIÓN Y VISUALIZACIÓN
// ============================================

function setupSettingsListeners() {
    // Sincronización entre pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'senasconecta-settings') {
            loadSettings();
        }
    });
}

function applySettings() {
    // La configuración visual global se ha simplificado.
    // showSubtitles se chequea dinámicamente en renderizado.
}

function loadSettings() {
    const saved = localStorage.getItem('senasconecta-settings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            GameState.settings = { ...GameState.settings, ...parsed };
            applySettings();
        } catch (e) {
            console.error('Error cargando configuración:', e);
        }
    }
}

function saveSettings() {
    try {
        localStorage.setItem('senasconecta-settings', JSON.stringify(GameState.settings));
        applySettings();
    } catch (e) {
        console.error('Error guardando configuración:', e);
    }
}
// Datos de las lecciones de señas básicas
const Lessons = [
    {
        id: 1,
        sign: 'hola',
        description: 'Seña: Hola',
        correctAnswer: 'Hola',
        options: ['Hola', 'Gracias', 'Adiós'],
        help: 'Para hacer la seña de "Hola", levanta la mano izquierda, ciérrala y abrela continuamente.'
    },
    {
        id: 2,
        sign: 'gracias',
        description: 'Seña: Gracias',
        correctAnswer: 'Gracias',
        options: ['Hola', 'Gracias', 'Adiós'],
        help: 'Para hacer la seña de "Gracias", lleva la mano abierta desde la barbilla hacia adelante, como si estuvieras soplando un beso.'
    },
    {
        id: 3,
        sign: 'adios',
        description: 'Seña: Adiós',
        correctAnswer: 'Adiós',
        options: ['Hola', 'Gracias', 'Adiós'],
        help: 'Para hacer la seña de "Adiós", levante la mano derecha con los dedos extendidos a excepcion del pulgar hacia su frente y muévela hacia adelante.'
    },
    {
        id: 4,
        sign: 'por-favor',
        description: 'Seña: Por favor',
        correctAnswer: 'Por favor',
        options: ['Por favor', 'Gracias', 'Hola'],
        help: 'Para hacer la seña de "Por favor", frota la palma de la mano en círculos sobre el pecho.'
    },
    {
        id: 5,
        sign: 'perdon',
        description: 'Seña: Perdón',
        correctAnswer: 'Perdón',
        options: ['Perdón', 'Gracias', 'Adiós'],
        help: 'Para hacer la seña de "Perdón", coloca las palmas de tus manos una sobre la otra y toca las yemas de los dedos.'
    },
    {
        id: 6,
        sign: 'por-qué',
        description: 'Seña: ¿Por qué?',
        correctAnswer: '¿Por qué?',
        options: ['¿Cuándo?', 'Hola', '¿Por qué?'],
        help: 'Para hacer la seña de "¿Por qué?", coloca los dedos extendidos a excepcion del medio, dirigelo hacia tu frente y luego vuelve a la posición inicial.'
    },
    {
        id: 7,
        sign: 'cuándo',
        description: 'Seña: ¿Cuándo?',
        correctAnswer: '¿Cuándo?',
        options: ['¿Cuándo?', 'Hola', '¿Dónde?'],
        help: 'Para hacer la seña de "¿Cuándo?", extiede el índice de ambas manos y gira el dedo derecho sobre el izquierdo.'
    },
    {
        id: 8,
        sign: 'dónde',
        description: 'Seña: ¿Dónde?',
        correctAnswer: '¿Dónde?',
        options: ['Adiós', '¿Dónde?', '¿Por qué?'],
        help: 'Para hacer la seña de "¿Dónde?", coloca ambos manos extendidas en posición horizontal y muévelas en dicha dirección.'
    },
    {
        id: 9,
        sign: 'quién',
        description: 'Seña: ¿Quién?',
        correctAnswer: '¿Quién?',
        options: ['Gracias', '¿Cuándo?', '¿Quién?'],
        help: 'Para hacer la seña de "¿Quién?", forma una L en tu dedo pulgar e índice, colocalo en tu barbilla y mueve el dedo índice.'
    },
    {
        id: 10,
        sign: 'porFavorNecesitoInformacion',
        description: 'Seña: Por favor, necesito información',
        correctAnswer: 'Por favor, necesito información',
        options: ['Gracias', 'Por favor', 'Por favor, necesito información'],
        help: 'Para decir "Por favor, necesito información", frota tu pecho con la palma derecha en círculos, luego haz un "gancho" con los dedos pulgar e índice y, finalmente, toca tu frente y boca simultáneamente para luego alejar las manos y regresarlas a su posición original.'
    },
    {
        id: 11,
        sign: 'estaBien',
        description: 'Seña: Está bien',
        correctAnswer: 'Está bien',
        options: ['Despacio', '¿Por qué?', 'Está bien'],
        help: 'Para hacer la seña de "Está bien", realiza un okay con tu mano.'
    },
    {
        id: 12,
        sign: 'despacio',
        description: 'Seña: Despacio',
        correctAnswer: 'Despacio',
        options: ['Despacio', 'Por favor, necesito información', 'Perdón'],
        help: 'Para la seña de "Despacio", mantén ambas manos con los dedos extendidos hacia el frente y deslízalas suavemente de adelante hacia atrás de forma paralela.'
    },
    {
        id: 13,
        sign: 'comoEstas',
        description: 'Seña: ¿Cómo estás?',
        correctAnswer: '¿Cómo estás?',
        options: ['¿Dónde?', '¿Quién?', '¿Cómo estás?'],
        help: 'Para hacer la seña de "¿Cómo estás?", haz tu mano como si bostezaras y luego llevala hacia tu pecho apuntando solo el dedo del medio al pecho.'
    }
];

// Ruta de videos por seña (el desarrollador coloca los archivos en estas rutas)
const SignMedia = {
    hola: 'assets/videos/signs/hola.mp4',
    gracias: 'assets/videos/signs/gracias.mp4',
    adios: 'assets/videos/signs/adios.mp4',
    'por-favor': 'assets/videos/signs/por-favor.mp4',
    perdon: 'assets/videos/signs/perdon.mp4',
    'por-qué': 'assets/videos/signs/por-qué.mp4',
    cuándo: 'assets/videos/signs/cuándo.mp4',
    dónde: 'assets/videos/signs/dónde.mp4',
    quién: 'assets/videos/signs/quién.mp4',
    porFavorNecesitoInformacion: 'assets/videos/signs/porFavorNecesitoInformacion.mp4',
    estaBien: 'assets/videos/signs/estaBien.mp4',
    despacio: 'assets/videos/signs/despacio.mp4',
    comoEstas: 'assets/videos/signs/comoEstas.mp4'
};

// Datos de la historia
const StoryChapters = [
    {
        id: 1,
        title: 'Capítulo 1 - Encuentro en la Escuela',
        scenes: [
            {
                id: 1,
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
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar la pantalla solicitada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        GameState.currentScreen = screenId;

        // Actualizar aria-live para lectores de pantalla
        targetScreen.setAttribute('aria-live', 'polite');

        // Actualizar contenido específico de cada pantalla
        if (screenId === 'progress-map-screen') {
            updateProgressMap();
        }
    }
}

// Actualizar indicador de progreso global basado en capítulos completados
function updateGlobalProgress() {
    const progressPercentage = document.getElementById('progress-percentage');
    if (progressPercentage) {
        const totalChapters = GameState.progress.totalChapters || 4;
        const completed = GameState.progress.chaptersCompleted || 0;
        const percentage = Math.round((completed / totalChapters) * 100);
        progressPercentage.textContent = `${percentage}%`;
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

function init() {
    // Cargar configuración guardada
    loadSettings();

    // Cargar progreso guardado
    loadProgress();

    // Configurar event listeners
    setupEventListeners();

    // Mostrar pantalla inicial
    showScreen('home-screen');

    // Actualizar progreso global si existe
    updateGlobalProgress();
}

function setupEventListeners() {
    // Pantalla de inicio
    const startAdventureBtn = document.getElementById('start-adventure-btn');
    const continueStoryBtn = document.getElementById('continue-story-btn');
    const learnBasicsBtn = document.getElementById('learn-basics-btn');
    const guideBtn = document.getElementById('guide-btn');
    const viewProgressMapHomeBtn = document.getElementById('view-progress-map-home-btn');
    const settingsLink = document.getElementById('settings-link');

    if (startAdventureBtn) {
        startAdventureBtn.addEventListener('click', () => {
            // Ir directamente a la historia
            GameState.playerType = 'hearing'; // Default player type
            GameState.gameMode = 'story';
            startStoryMode();
        });
    }

    if (continueStoryBtn) {
        continueStoryBtn.addEventListener('click', () => {
            continueFromLastPosition();
        });
    }

    if (learnBasicsBtn) {
        learnBasicsBtn.addEventListener('click', () => {
            // Redirigir al nuevo archivo de señas básicas
            window.location.href = 'senasbasicas.html';
        });
    }

    if (guideBtn) {
        guideBtn.addEventListener('click', () => {
            // Redirigir al nuevo archivo de guía
            window.location.href = 'guia.html';
        });
    }

    if (viewProgressMapHomeBtn) {
        viewProgressMapHomeBtn.addEventListener('click', () => {
            // Redirigir a historias.html mostrando el mapa de progreso
            window.location.href = 'historias.html?screen=progress-map';
        });
    }



    // Pantalla de modo de juego
    setupGameModeListeners();

    // Pantalla de configuración
    setupSettingsListeners();

    // Pantalla de lecciones
    setupLessonListeners();

    // Pantalla de historia
    setupStoryListeners();

    // Pantalla de resultados
    setupResultListeners();

    // Pantalla de mapa de progreso
    setupProgressMapListeners();

    // Pantalla de guía
    setupGuideListeners();

    // Verificar si hay progreso guardado para mostrar botón continuar
    checkSavedProgress();
}

function setupGameModeListeners() {
    const hearingCard = document.getElementById('hearing-player-card');
    const deafCard = document.getElementById('deaf-player-card');
    const storyModeBtn = document.getElementById('story-mode-btn');
    const practiceModeBtn = document.getElementById('practice-mode-btn');
    const backFromModeBtn = document.getElementById('back-from-mode-btn');

    if (hearingCard) {
        hearingCard.addEventListener('click', () => {
            selectPlayerType('hearing', hearingCard, deafCard);
        });
    }

    if (deafCard) {
        deafCard.addEventListener('click', () => {
            selectPlayerType('deaf', hearingCard, deafCard);
        });
    }

    if (storyModeBtn) {
        storyModeBtn.addEventListener('click', () => {
            if (GameState.playerType) {
                GameState.gameMode = 'story';
                startStoryMode();
            } else {
                showFeedback('Por favor, selecciona un tipo de jugador primero', 'error');
            }
        });
    }

    if (practiceModeBtn) {
        practiceModeBtn.addEventListener('click', () => {
            if (GameState.playerType) {
                GameState.gameMode = 'practice';
                startLessonMode();
            } else {
                showFeedback('Por favor, selecciona un tipo de jugador primero', 'error');
            }
        });
    }

    if (backFromModeBtn) {
        backFromModeBtn.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }
}

function selectPlayerType(type, hearingCard, deafCard) {
    GameState.playerType = type;

    if (hearingCard && deafCard) {
        if (type === 'hearing') {
            hearingCard.setAttribute('aria-pressed', 'true');
            deafCard.setAttribute('aria-pressed', 'false');
        } else {
            hearingCard.setAttribute('aria-pressed', 'false');
            deafCard.setAttribute('aria-pressed', 'true');
        }
    }
}

// ============================================
// CONFIGURACIÓN
// ============================================

// ============================================
// CONFIGURACIÓN Y VISUALIZACIÓN
// ============================================

function setupSettingsListeners() {
    // Esta función se mantiene por compatibilidad si existen controles en index.html,
    // pero la configuración principal ahora ocurre en settings.html.
    // Solo escuchamos cambios globales si es necesario.
    window.addEventListener('storage', (e) => {
        if (e.key === 'senasconecta-settings') {
            loadSettings(); // Recargar si cambian en otra pestaña
        }
    });
}

function applySettings() {
    const s = GameState.settings;

    // 1. Tamaño de Fuente
    document.documentElement.style.fontSize = `${s.fontSize}px`;

    // 2. Alto Contraste
    if (s.highContrast) {
        document.body.setAttribute('data-contrast', 'high');
    } else {
        document.body.removeAttribute('data-contrast');
    }

    // 3. Reducir Movimiento / Feedback Visual
    if (s.visualHints) {
        document.body.classList.add('visual-hints-enabled');
    } else {
        document.body.classList.remove('visual-hints-enabled');
    }

    // 4. Modo Espejo (Se aplica a videos/contenedores)
    if (s.mirrorMode) {
        document.body.classList.add('mirror-mode-enabled');
    } else {
        document.body.classList.remove('mirror-mode-enabled');
    }

    // 5. Subtítulos (Se maneja en la lógica de lección)
}

function loadSettings() {
    const saved = localStorage.getItem('senasconecta-settings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Fusionar con defaults para asegurar que existan nuevas keys
            GameState.settings = { ...GameState.settings, ...parsed };
            applySettings();
        } catch (e) {
            console.error('Error cargando configuración:', e);
        }
    }
}

function saveSettings() {
    try {
        localStorage.setItem('senasconecta-settings', JSON.stringify(GameState.settings));
        applySettings();
    } catch (e) {
        console.error('Error guardando configuración:', e);
    }
}

// ============================================
// SISTEMA DE LECCIONES
// ============================================

function startLessonMode() {
    GameState.currentLesson = 0;
    showScreen('learn-basics-screen');
    loadLesson(GameState.currentLesson);
}

function setupLessonListeners() {
    // Usar event delegation para opciones que se cargan dinámicamente
    const answerOptionsContainer = document.querySelector('.answer-options');
    const continueBtn = document.getElementById('continue-lesson-btn');
    const backFromLearnBtn = document.getElementById('back-from-learn-btn');
    const helpBtn = document.getElementById('lesson-help-btn');

    if (answerOptionsContainer) {
        answerOptionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.answer-option');
            if (option && !option.disabled) {
                handleAnswerSelection(option);
            }
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            nextLesson();
        });
    }

    if (backFromLearnBtn) {
        backFromLearnBtn.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            showLessonHelp();
        });
    }
}

function loadLesson(lessonIndex) {
    if (lessonIndex >= Lessons.length) {
        // Completar todas las lecciones
        showResultScreen();
        return;
    }

    const lesson = Lessons[lessonIndex];
    const signDescription = document.getElementById('sign-description');
    const answerOptions = document.querySelectorAll('.answer-option');
    const feedbackMessage = document.getElementById('feedback-message');
    const continueBtn = document.getElementById('continue-lesson-btn');
    const progressBar = document.getElementById('lesson-progress-bar');
    const progressText = document.querySelector('.lesson-progress .progress-text');

    // Actualizar descripción
    if (signDescription) {
        if (GameState.settings.showSubtitles) {
            signDescription.textContent = lesson.description;
            signDescription.style.visibility = 'visible';
        } else {
            signDescription.style.visibility = 'hidden'; // Ocultar pero mantener espacio
        }
    }

    // Actualizar opciones de respuesta
    answerOptions.forEach((option, index) => {
        if (lesson.options[index]) {
            option.textContent = lesson.options[index].charAt(0).toUpperCase() + lesson.options[index].slice(1);
            option.setAttribute('data-answer', lesson.options[index]);
            option.classList.remove('correct', 'incorrect');
            option.setAttribute('aria-checked', 'false');
            option.disabled = false;
        }
    });

    // Limpiar feedback
    if (feedbackMessage) {
        feedbackMessage.style.display = 'none';
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';
    }

    // Deshabilitar botón continuar
    if (continueBtn) {
        continueBtn.disabled = true;
    }

    // Actualizar animación de seña
    const signAnimation = document.getElementById('sign-animation');
    if (signAnimation) {
        signAnimation.setAttribute('data-sign', lesson.sign);
    }

    // Cargar ilustración de la seña
    const signImageContainer = document.getElementById('sign-image-container');
    if (signImageContainer) {
        loadSignIllustration(signImageContainer, lesson.sign);
    }

    // Actualizar progreso
    const progress = ((lessonIndex + 1) / Lessons.length) * 100;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }

    if (progressText) {
        progressText.textContent = `Lección ${lessonIndex + 1} de ${Lessons.length}`;
    }
}

function handleAnswerSelection(selectedOption) {
    const lesson = Lessons[GameState.currentLesson];
    const answerOptions = document.querySelectorAll('.answer-option');
    const feedbackMessage = document.getElementById('feedback-message');
    const continueBtn = document.getElementById('continue-lesson-btn');
    const selectedAnswer = selectedOption.getAttribute('data-answer');
    const isCorrect = selectedAnswer === lesson.correctAnswer;

    // Preservar el texto de la opción seleccionada
    const selectedText = selectedOption.textContent.trim();

    // Deshabilitar todas las opciones
    answerOptions.forEach(option => {
        option.disabled = true;
        option.setAttribute('aria-checked', 'false');
    });

    // Asegurar que el texto se preserve antes de cambiar estilos
    if (!selectedOption.textContent.trim()) {
        selectedOption.textContent = selectedText || selectedAnswer.charAt(0).toUpperCase() + selectedAnswer.slice(1);
    }

    // Marcar la opción seleccionada (solo resaltar borde - no cambiar fondo ni texto)
    selectedOption.setAttribute('aria-checked', 'true');
    // Asegurar que el fondo y color del texto se mantengan
    selectedOption.style.backgroundColor = '';
    selectedOption.style.background = '';
    selectedOption.style.color = '';

    // Mostrar feedback
    if (feedbackMessage) {
        feedbackMessage.style.display = 'block';
        if (isCorrect) {
            feedbackMessage.textContent = '¡Correcto! ¡Bien hecho!';
            feedbackMessage.className = 'feedback-message success';
            selectedOption.classList.add('correct');

            // Actualizar estadísticas
            GameState.progress.signsLearned++;
            GameState.progress.lessonsCompleted++;
        } else {
            feedbackMessage.textContent = `Incorrecto. La respuesta correcta es "${lesson.correctAnswer.charAt(0).toUpperCase() + lesson.correctAnswer.slice(1)}".`;
            feedbackMessage.className = 'feedback-message error';
            selectedOption.classList.add('incorrect');

            // Marcar la respuesta correcta
            answerOptions.forEach(option => {
                if (option.getAttribute('data-answer') === lesson.correctAnswer) {
                    option.classList.add('correct');
                    // Asegurar que el texto se preserve
                    if (!option.textContent.trim()) {
                        const answerText = lesson.correctAnswer.charAt(0).toUpperCase() + lesson.correctAnswer.slice(1);
                        option.textContent = answerText;
                    }
                }
            });
        }
    }

    // Habilitar botón continuar
    if (continueBtn) {
        continueBtn.disabled = false;
    }

    // Actualizar precisión
    updateAccuracy();
}

function nextLesson() {
    GameState.currentLesson++;
    if (GameState.currentLesson < Lessons.length) {
        loadLesson(GameState.currentLesson);
    } else {
        showResultScreen();
    }
}

function showLessonHelp() {
    const lesson = Lessons[GameState.currentLesson];
    const tooltip = document.getElementById('help-tooltip');
    const tooltipContent = document.getElementById('tooltip-content');
    const helpBtn = document.getElementById('lesson-help-btn');

    if (tooltip && tooltipContent && helpBtn) {
        tooltipContent.textContent = lesson.help;
        tooltip.style.display = 'block';
        tooltip.setAttribute('aria-hidden', 'false');

        // Posicionar tooltip cerca del botón de ayuda
        const rect = helpBtn.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        // Calcular posición vertical - preferir arriba si no hay espacio abajo
        const spaceBelow = windowHeight - rect.bottom;
        const spaceAbove = rect.top;
        const tooltipHeight = 150; // Altura estimada del tooltip

        if (spaceBelow < tooltipHeight && spaceAbove > tooltipHeight) {
            // Mostrar arriba del botón
            tooltip.style.top = `${rect.top - tooltipHeight - 10}px`;
            tooltip.classList.add('tooltip-above');
        } else {
            // Mostrar abajo del botón
            tooltip.style.top = `${rect.bottom + 10}px`;
            tooltip.classList.remove('tooltip-above');
        }

        // Calcular posición horizontal - centrar respecto al botón
        const tooltipWidth = 350; // Ancho estimado del tooltip
        let leftPos = rect.left + (rect.width / 2) - (tooltipWidth / 2);

        // Asegurar que no se salga de la pantalla
        if (leftPos < 10) {
            leftPos = 10;
        } else if (leftPos + tooltipWidth > windowWidth - 10) {
            leftPos = windowWidth - tooltipWidth - 10;
        }

        tooltip.style.left = `${leftPos}px`;
        tooltip.style.right = 'auto';
        tooltip.style.position = 'fixed';

        // Cerrar al hacer clic fuera o después de 5 segundos
        const closeTooltip = () => {
            tooltip.style.display = 'none';
            tooltip.setAttribute('aria-hidden', 'true');
            document.removeEventListener('click', handleOutsideClick);
        };

        const handleOutsideClick = (e) => {
            if (!tooltip.contains(e.target) && e.target !== helpBtn) {
                closeTooltip();
            }
        };

        setTimeout(closeTooltip, 5000);
        document.addEventListener('click', handleOutsideClick);
    }
}

// ============================================
// SISTEMA DE HISTORIA
// ============================================

function startStoryMode() {
    // Redirigir a la página de historias
    window.location.href = 'historias.html';
}

function continueFromLastPosition() {
    // Redirigir a la página de historias
    window.location.href = 'historias.html';
}

function checkSavedProgress() {
    const continueBtn = document.getElementById('continue-story-btn');
    if (continueBtn && (GameState.progress.lastChapter > 0 || GameState.progress.lastScene > 0)) {
        continueBtn.style.display = 'block';
    }
}

function setupStoryListeners() {
    // Usar event delegation para opciones que se cargan dinámicamente
    const decisionOptionsContainer = document.querySelector('.decision-options');
    const backFromStoryBtn = document.getElementById('back-from-story-btn');
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

    if (viewMapStoryBtn) {
        viewMapStoryBtn.addEventListener('click', () => {
            showScreen('progress-map-screen');
            updateProgressMap();
        });
    }

    if (backFromStoryBtn) {
        backFromStoryBtn.addEventListener('click', () => {
            showScreen('home-screen');
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
        // Siguiente capítulo
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
    checkSavedProgress();

    const chapterTitle = document.getElementById('chapter-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const decisionOptions = document.querySelectorAll('.decision-option');
    const decisionFeedback = document.getElementById('decision-feedback');
    const continueStoryBtn = document.getElementById('continue-story-btn');
    const progressBar = document.getElementById('chapter-progress-bar');
    const progressText = document.getElementById('chapter-progress-text');

    // Actualizar título del capítulo
    if (chapterTitle) {
        chapterTitle.textContent = chapter.title;
    }

    // Actualizar descripción del escenario
    if (scenarioDescription) {
        if (GameState.settings.showSubtitles) {
            scenarioDescription.textContent = scene.description;
            scenarioDescription.style.visibility = 'visible';
        } else {
            scenarioDescription.style.visibility = 'hidden';
        }
    }

    // Guardar ayuda del escenario
    GameState.currentSceneHelp = scene.help || 'No hay ayuda disponible para esta escena.';

    // Verificar si es el final del capítulo (sin decisiones)
    const isEndOfChapter = !scene.decisions || scene.decisions.length === 0;

    // Actualizar opciones de decisión
    decisionOptions.forEach((option, index) => {
        if (scene.decisions && scene.decisions[index]) {
            const decision = scene.decisions[index];
            option.textContent = decision.text;
            option.setAttribute('data-decision', decision.id);
            option.classList.remove('selected');
            option.style.display = 'block';
            option.disabled = false; // Rehabilitar opciones
        } else {
            option.style.display = 'none';
        }
    });

    // Si es el final del capítulo, mostrar botón de ver mapa
    const continueSceneBtn = document.getElementById('continue-scene-btn');
    const viewMapStoryBtn = document.getElementById('view-map-story-btn');

    if (isEndOfChapter) {
        // Ocultar opciones de decisión
        const decisionOptionsContainer = document.querySelector('.decision-options');
        if (decisionOptionsContainer) {
            decisionOptionsContainer.style.display = 'none';
        }

        // Mostrar botón de ver mapa
        if (continueSceneBtn) {
            continueSceneBtn.style.display = 'none';
            continueSceneBtn.disabled = true;
        }
        if (viewMapStoryBtn) {
            viewMapStoryBtn.style.display = 'block';
            viewMapStoryBtn.disabled = false;
            // Asegurar que el botón sea visible
            viewMapStoryBtn.style.visibility = 'visible';
            viewMapStoryBtn.style.opacity = '1';
        }
    } else {
        // Mostrar opciones de decisión
        const decisionOptionsContainer = document.querySelector('.decision-options');
        if (decisionOptionsContainer) {
            decisionOptionsContainer.style.display = 'block';
        }

        // Ocultar botón de ver mapa
        if (continueSceneBtn) {
            continueSceneBtn.style.display = 'none';
            continueSceneBtn.disabled = true;
        }
        if (viewMapStoryBtn) {
            viewMapStoryBtn.style.display = 'none';
        }
    }

    // Limpiar feedback
    if (decisionFeedback) {
        decisionFeedback.style.display = 'none';
        decisionFeedback.textContent = '';
        decisionFeedback.className = 'decision-feedback';
    }

    // Actualizar progreso
    const totalScenes = chapter.scenes.length;
    const progress = ((sceneIndex + 1) / totalScenes) * 100;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
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

    // Guardar la decisión para usarla cuando se haga clic en continuar
    GameState.pendingDecision = decision;

    // Deshabilitar todas las opciones
    decisionOptions.forEach(option => {
        option.classList.remove('selected');
        option.disabled = true;
    });

    // Marcar la opción seleccionada (resaltar con color especial)
    selectedOption.classList.add('selected');

    // Mostrar feedback
    if (decisionFeedback) {
        decisionFeedback.style.display = 'block';
        decisionFeedback.textContent = decision.feedback;
        decisionFeedback.className = `decision-feedback ${decision.correct ? 'success' : 'error'}`;
    }

    // Actualizar progreso si es correcto
    if (decision.correct) {
        GameState.progress.signsLearned++;
    }

    // Verificar si es el final del capítulo
    const isEndOfChapter = !decision.nextScene;

    // Mostrar botón de continuar o botón de ver mapa
    const continueSceneBtn = document.getElementById('continue-scene-btn');
    const viewMapStoryBtn = document.getElementById('view-map-story-btn');

    if (isEndOfChapter) {
        // Es el final del capítulo - mostrar botón de ver mapa
        if (continueSceneBtn) {
            continueSceneBtn.style.display = 'none';
            continueSceneBtn.disabled = true;
        }
        if (viewMapStoryBtn) {
            viewMapStoryBtn.style.display = 'block';
        }
    } else {
        // Hay más escenas - mostrar botón de continuar
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

    // Limpiar decisión pendiente
    GameState.pendingDecision = null;

    // Continuar a la siguiente escena
    if (decision.nextScene) {
        GameState.currentScene = decision.nextScene - 1;
        loadStoryScene(GameState.currentChapter, GameState.currentScene);
    } else {
        // Fin del capítulo - mostrar pantalla de resultados con opción de ver mapa
        GameState.progress.chaptersCompleted++;
        GameState.progress.lastChapter = GameState.currentChapter + 1;
        GameState.progress.lastScene = 0;
        saveProgress();

        // Mostrar pantalla de resultados (que incluye botón para ver mapa)
        showResultScreen();
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
            if (GameState.gameMode === 'story') {
                GameState.currentChapter++;
                if (GameState.currentChapter < StoryChapters.length) {
                    GameState.currentScene = 0;
                    GameState.gameMode = 'story';
                    showScreen('story-screen');
                    loadStoryScene(GameState.currentChapter, GameState.currentScene);
                } else {
                    // Todos los capítulos completados, mostrar mapa
                    showScreen('progress-map-screen');
                    updateProgressMap();
                }
            } else {
                GameState.currentLesson++;
                if (GameState.currentLesson < Lessons.length) {
                    startLessonMode();
                } else {
                    showScreen('progress-map-screen');
                    updateProgressMap();
                }
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
            if (GameState.gameMode === 'story') {
                startStoryMode();
            } else {
                startLessonMode();
            }
        });
    }
}

function updateResultScreen() {
    const progressBar = document.querySelector('.chapter-progress-section .progress-bar');
    const progressText = document.querySelector('.chapter-progress-section .progress-text');
    const statBoxes = document.querySelectorAll('.stats-container .stat-box');

    // Actualizar progreso del capítulo
    const chapterProgress = (GameState.progress.lessonsCompleted / GameState.progress.totalLessons) * 100;
    if (progressBar) {
        progressBar.style.width = `${chapterProgress}%`;
        progressBar.setAttribute('aria-valuenow', chapterProgress);
    }

    if (progressText) {
        progressText.textContent = `${GameState.progress.lessonsCompleted} de ${GameState.progress.totalLessons} lecciones completadas`;
    }

    // Actualizar estadísticas
    if (statBoxes.length >= 2) {
        const signsNumber = statBoxes[0].querySelector('.stat-number');
        const accuracyNumber = statBoxes[1].querySelector('.stat-number');

        if (signsNumber) {
            signsNumber.textContent = GameState.progress.signsLearned;
            signsNumber.setAttribute('aria-label', `${GameState.progress.signsLearned} señas aprendidas`);
        }

        if (accuracyNumber) {
            const acc = Math.round(GameState.progress.accuracy);
            accuracyNumber.textContent = `${acc}%`;
            accuracyNumber.setAttribute('aria-label', `${acc} por ciento de precisión`);
        }
    }
}

// ============================================
// MAPA DE PROGRESO
// ============================================

function setupProgressMapListeners() {
    const continueAdventureBtn = document.getElementById('continue-adventure-btn');
    const backFromMapBtn = document.getElementById('back-from-map-btn');
    const chapterItems = document.querySelectorAll('.chapter-item.clickable');

    // Hacer los capítulos clickeables
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            const chapterIndex = parseInt(item.getAttribute('data-chapter'));
            if (!isNaN(chapterIndex)) {
                startChapterFromMap(chapterIndex);
            }
        });
    });

    if (continueAdventureBtn) {
        continueAdventureBtn.addEventListener('click', () => {
            if (GameState.progress.lastChapter > 0 || GameState.progress.lastScene > 0) {
                continueFromLastPosition();
            } else {
                if (GameState.gameMode === 'story') {
                    startStoryMode();
                } else {
                    startLessonMode();
                }
            }
        });
    }

    if (backFromMapBtn) {
        backFromMapBtn.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }
}

function startChapterFromMap(chapterIndex) {
    // Verificar si el capítulo está disponible
    const chapter = StoryChapters[chapterIndex];
    if (!chapter) return;

    // Todos los capítulos están desbloqueados - iniciar directamente
    GameState.currentChapter = chapterIndex;
    GameState.currentScene = 0;
    GameState.gameMode = 'story';
    showScreen('story-screen');
    loadStoryScene(GameState.currentChapter, GameState.currentScene);
}

function updateProgressMap() {
    const chapters = document.querySelectorAll('.chapter-item');
    const totalChapters = StoryChapters.length;

    chapters.forEach((chapter, index) => {
        if (index >= totalChapters) {
            chapter.style.display = 'none';
            return;
        }

        const chapterData = StoryChapters[index];
        const chapterTitle = chapter.querySelector('h3');
        const chapterStatus = chapter.querySelector('.chapter-status');
        const progressBar = chapter.querySelector('.progress-bar');

        // Actualizar título
        if (chapterTitle) {
            chapterTitle.textContent = chapterData.title;
        }

        // Calcular progreso del capítulo
        let chapterProgress = 0;
        let statusText = '';

        if (index < GameState.progress.chaptersCompleted) {
            // Capítulo completado
            chapter.classList.remove('in-progress', 'locked');
            chapter.classList.add('completed');
            chapterProgress = 100;
            statusText = 'Completado';
        } else if (index === GameState.progress.chaptersCompleted) {
            // Capítulo en progreso
            chapter.classList.remove('completed', 'locked');
            chapter.classList.add('in-progress');

            // Calcular progreso basado en escenas
            if (GameState.progress.lastChapter === index) {
                const totalScenes = chapterData.scenes.length;
                chapterProgress = ((GameState.progress.lastScene + 1) / totalScenes) * 100;
            } else {
                chapterProgress = 0;
            }
            statusText = 'En progreso';
        } else {
            // Capítulo disponible (todos desbloqueados)
            chapter.classList.remove('completed', 'in-progress', 'locked');
            statusText = 'Disponible';
            chapterProgress = 0;
        }

        // Actualizar estado y progreso
        if (chapterStatus) {
            chapterStatus.textContent = statusText;
        }

        if (progressBar) {
            progressBar.style.width = `${chapterProgress}%`;
            progressBar.setAttribute('aria-valuenow', chapterProgress);
            if (chapterProgress === 100) {
                progressBar.classList.add('filled');
            } else {
                progressBar.classList.remove('filled');
            }
        }
    });

    // Actualizar estadísticas globales
    const statBoxes = document.querySelectorAll('.global-stats .stat-box');
    if (statBoxes.length >= 3) {
        const chaptersStat = statBoxes[0].querySelector('.stat-number');
        const signsStat = statBoxes[1].querySelector('.stat-number');
        const timeStat = statBoxes[2].querySelector('.stat-number');

        if (chaptersStat) {
            chaptersStat.textContent = `${GameState.progress.chaptersCompleted}/${totalChapters}`;
        }

        if (signsStat) {
            signsStat.textContent = GameState.progress.signsLearned;
        }

        if (timeStat) {
            // Calcular tiempo estimado (puedes mejorar esto con tiempo real)
            const estimatedMinutes = GameState.progress.chaptersCompleted * 15;
            if (estimatedMinutes < 60) {
                timeStat.textContent = `${estimatedMinutes}m`;
            } else {
                const hours = Math.floor(estimatedMinutes / 60);
                const minutes = estimatedMinutes % 60;
                timeStat.textContent = `${hours}h ${minutes}m`;
            }
        }
    }
}

// ============================================
// UTILIDADES
// ============================================

function showFeedback(message, type = 'info') {
    // Crear elemento de feedback temporal
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;
    feedback.style.position = 'fixed';
    feedback.style.top = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.zIndex = '10000';
    feedback.style.padding = '1rem 2rem';
    feedback.style.borderRadius = '8px';
    feedback.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function updateAccuracy() {
    // Calcular precisión basada en respuestas correctas
    const total = GameState.progress.lessonsCompleted;
    const correct = GameState.progress.signsLearned;
    if (total > 0) {
        GameState.progress.accuracy = (correct / total) * 100;
    }
}

function updateGlobalProgress() {
    const globalProgress = document.getElementById('global-progress');
    const progressPercentage = document.getElementById('progress-percentage');

    if (globalProgress && progressPercentage) {
        // Calcular porcentaje basado en capítulos completados (4 capítulos = 100%)
        const totalChapters = GameState.progress.totalChapters || 4;
        const completed = GameState.progress.chaptersCompleted || 0;
        const totalProgress = (completed / totalChapters) * 100;
        // Clamp to 0-100 to avoid confusing numbers like 120%
        const validProgress = Math.min(Math.max(0, Math.round(totalProgress)), 100);
        progressPercentage.textContent = `${validProgress}%`;

        // Siempre mostrar el indicador de progreso
        globalProgress.style.display = 'block';
    }
}

// ============================================
// ILUSTRACIONES DE SEÑAS
// ============================================

function loadSignIllustration(container, signName) {
    // Limpiar contenedor
    container.innerHTML = '';
    container.classList.remove('loaded', 'has-video');

    const videoSrc = SignMedia[signName];
    if (videoSrc) {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.className = 'sign-video';
        video.controls = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('aria-label', `Video de la seña ${signName}`);

        video.addEventListener('loadeddata', () => {
            container.classList.add('loaded', 'has-video');
        });

        container.appendChild(video);
    } else {
        // Fallback: informar que falta el recurso
        container.innerHTML = `<div style="text-align: center; color: #6366F1; font-size: 1rem; font-weight: 600; padding: 2rem;">Falta el video para "${signName}". Colócalo en ${SignMedia[signName] || 'assets/videos/signs/<seña>.mp4'}.</div>`;
    }
}



// ============================================
// INICIALIZAR APLICACIÓN
// ============================================

// Esperar a que el DOM esté listo
// Esperar a que el DOM esté listo
// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof init === 'function') init();
    });
} else {
    if (typeof init === 'function') init();
}

// ============================================
// BOTÓN DE AYUDA FLOTANTE
// ============================================

function showFloatingHelpButton() {
    // El botón de ayuda ahora está inline, no necesita mostrarse/ocultarse
}

function hideFloatingHelpButton() {
    // El botón de ayuda ahora está inline, no necesita mostrarse/ocultarse
}

function showStoryHelp() {
    const helpText = GameState.currentSceneHelp || 'No hay ayuda disponible para esta escena.';
    const tooltip = document.getElementById('help-tooltip');
    const tooltipContent = document.getElementById('tooltip-content');
    const helpBtn = document.getElementById('story-help-btn');

    if (tooltip && tooltipContent && helpBtn) {
        tooltipContent.textContent = helpText;
        tooltip.style.display = 'block';
        tooltip.setAttribute('aria-hidden', 'false');

        // Posicionar cerca del botón de ayuda
        const rect = helpBtn.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        // Calcular posición vertical - preferir arriba si no hay espacio abajo
        const spaceBelow = windowHeight - rect.bottom;
        const spaceAbove = rect.top;
        const tooltipHeight = 150; // Altura estimada del tooltip

        if (spaceBelow < tooltipHeight && spaceAbove > tooltipHeight) {
            // Mostrar arriba del botón
            tooltip.style.top = `${rect.top - tooltipHeight - 10}px`;
            tooltip.classList.add('tooltip-above');
        } else {
            // Mostrar abajo del botón
            tooltip.style.top = `${rect.bottom + 10}px`;
            tooltip.classList.remove('tooltip-above');
        }

        // Calcular posición horizontal - centrar respecto al botón
        const tooltipWidth = 350; // Ancho estimado del tooltip
        let leftPos = rect.left + (rect.width / 2) - (tooltipWidth / 2);

        // Asegurar que no se salga de la pantalla
        if (leftPos < 10) {
            leftPos = 10;
        } else if (leftPos + tooltipWidth > windowWidth - 10) {
            leftPos = windowWidth - tooltipWidth - 10;
        }

        tooltip.style.left = `${leftPos}px`;
        tooltip.style.right = 'auto';
        tooltip.style.position = 'fixed';

        // Cerrar al hacer clic fuera o después de 8 segundos
        const closeTooltip = () => {
            tooltip.style.display = 'none';
            tooltip.setAttribute('aria-hidden', 'true');
            document.removeEventListener('click', handleOutsideClick);
        };

        const handleOutsideClick = (e) => {
            if (!tooltip.contains(e.target) && e.target !== helpBtn) {
                closeTooltip();
            }
        };

        setTimeout(closeTooltip, 8000);
        document.addEventListener('click', handleOutsideClick);
    }
}

// ============================================
// PANTALLA DE GUÍA
// ============================================

function setupGuideListeners() {
    const backFromGuideBtn = document.getElementById('back-from-guide-btn');

    if (backFromGuideBtn) {
        backFromGuideBtn.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }
}



// ============================================
// GUARDADO Y CARGA DE PROGRESO
// ============================================

function saveProgress() {
    try {
        localStorage.setItem('senasconecta-progress', JSON.stringify(GameState.progress));
    } catch (e) {
        console.error('Error guardando progreso:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('senasconecta-progress');
        if (saved) {
            const progress = JSON.parse(saved);
            GameState.progress = { ...GameState.progress, ...progress };
            updateGlobalProgress();
            checkSavedProgress();
        }
    } catch (e) {
        console.error('Error cargando progreso:', e);
    }
}

// Guardar progreso al salir
window.addEventListener('beforeunload', () => {
    saveProgress();
});

// Cargar progreso guardado al iniciar
window.addEventListener('load', () => {
    loadProgress();
});

// ============================================
// SISTEMA DE NAVEGACIÓN POR TECLADO
// ============================================

// Estado del sistema de navegación por teclado
const KeyboardNavState = {
    isUsingKeyboard: false,
    lastFocusedElement: null,
    keyboardHintTimeout: null,
    focusableElements: []
};

// Obtener todos los elementos enfocables de la pantalla activa
function getFocusableElements() {
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return [];

    const focusable = activeScreen.querySelectorAll(
        'button:not([disabled]):not([style*="display: none"]), ' +
        'a[href]:not([style*="display: none"]), ' +
        'input:not([disabled]):not([style*="display: none"]), ' +
        'select:not([disabled]):not([style*="display: none"]), ' +
        '[tabindex]:not([tabindex="-1"]):not([style*="display: none"])'
    );

    // Filtrar elementos ocultos
    return Array.from(focusable).filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
    });
}

// Detectar si el usuario está usando el teclado
function detectKeyboardUser() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter' || e.key === 'Escape' || e.key === 'CapsLock') {
            KeyboardNavState.isUsingKeyboard = true;
            document.body.classList.add('keyboard-navigation');
            showKeyboardHint();
        }
    });

    document.addEventListener('mousedown', () => {
        KeyboardNavState.isUsingKeyboard = false;
        document.body.classList.remove('keyboard-navigation');
        hideKeyboardHint();
    });
}

// Mostrar indicador de ayuda para teclado
function showKeyboardHint() {
    const hint = document.getElementById('keyboard-hint');
    if (hint && KeyboardNavState.isUsingKeyboard) {
        hint.classList.add('visible');

        // Ocultar después de 5 segundos
        if (KeyboardNavState.keyboardHintTimeout) {
            clearTimeout(KeyboardNavState.keyboardHintTimeout);
        }
        KeyboardNavState.keyboardHintTimeout = setTimeout(() => {
            hideKeyboardHint();
        }, 5000);
    }
}

function hideKeyboardHint() {
    const hint = document.getElementById('keyboard-hint');
    if (hint) {
        hint.classList.remove('visible');
    }
}

// Configurar navegación global por teclado
function setupKeyboardNavigation() {
    detectKeyboardUser();

    // Manejar tecla Escape para volver
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            handleEscapeKey();
        }
    });

    // Navegación con Tab (siguiente) y CapsLock (anterior)
    setupTabCapsLockNavigation();

    // Manejar Enter en elementos enfocables
    setupEnterKeyHandler();
}

// Navegación con Tab y CapsLock
function setupTabCapsLockNavigation() {
    document.addEventListener('keydown', (e) => {
        // CapsLock para retroceder
        if (e.key === 'CapsLock') {
            e.preventDefault();

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) return;

            const currentElement = document.activeElement;
            let currentIndex = focusableElements.indexOf(currentElement);

            // Si no hay elemento enfocado, empezar desde el final
            if (currentIndex === -1) {
                currentIndex = focusableElements.length;
            }

            // Ir al elemento anterior
            const newIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[newIndex].focus();

            // Anunciar para lectores de pantalla
            announceCurrentElement(focusableElements[newIndex]);
        }

        // Tab para avanzar (comportamiento natural del navegador, solo anunciamos)
        if (e.key === 'Tab' && !e.shiftKey) {
            // Dejamos que Tab funcione normalmente, pero anunciamos después
            setTimeout(() => {
                if (document.activeElement) {
                    announceCurrentElement(document.activeElement);
                }
            }, 10);
        }
    });
}

// Anunciar elemento actual para lectores de pantalla
function announceCurrentElement(element) {
    let announcer = document.getElementById('element-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'element-announcer';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'assertive');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
    }

    // Obtener texto descriptivo del elemento
    const text = element.textContent?.trim() ||
        element.getAttribute('aria-label') ||
        element.getAttribute('title') ||
        'Elemento';

    announcer.textContent = text;
}

// Manejar tecla Escape para volver a la pantalla anterior
function handleEscapeKey() {
    const currentScreen = GameState.currentScreen;

    const backMapping = {
        'game-mode-screen': 'home-screen',
        'settings-screen': 'home-screen',
        'learn-basics-screen': 'home-screen',
        'story-screen': 'home-screen',
        'result-screen': 'home-screen',
        'progress-map-screen': 'home-screen',
        'guide-screen': 'home-screen'
    };

    if (backMapping[currentScreen]) {
        showScreen(backMapping[currentScreen]);
        announceScreenChange(backMapping[currentScreen]);
    }
}

// Anunciar cambio de pantalla para lectores de pantalla
function announceScreenChange(screenId) {
    const screenNames = {
        'home-screen': 'Pantalla principal',
        'game-mode-screen': 'Selección de modo de juego',
        'settings-screen': 'Configuración',
        'learn-basics-screen': 'Aprender señas básicas',
        'story-screen': 'Historia interactiva',
        'result-screen': 'Resultados',
        'progress-map-screen': 'Mapa de progreso',
        'guide-screen': 'Guía de uso'
    };

    const announcement = screenNames[screenId] || 'Nueva pantalla';

    // Crear elemento de anuncio para lectores de pantalla
    let announcer = document.getElementById('screen-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'screen-announcer';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
    }

    announcer.textContent = `Navegando a: ${announcement}`;

    // Enfocar el primer elemento interactivo de la nueva pantalla
    setTimeout(() => {
        focusFirstInteractiveElement(screenId);
    }, 100);
}

// Enfocar el primer elemento interactivo de una pantalla
function focusFirstInteractiveElement(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        const focusable = screen.querySelector(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) {
            focusable.focus();
        }
    }
}

// Manejar Enter en elementos que pueden no tener handler de click
function setupEnterKeyHandler() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
            const clickable = e.target.closest('[onclick], [role="button"]');
            if (clickable) {
                e.preventDefault();
                clickable.click();
            }
        }
    });
}

// Mejorar showScreen para soportar navegación por teclado
const originalShowScreen = showScreen;
showScreen = function (screenId) {
    originalShowScreen(screenId);

    if (KeyboardNavState.isUsingKeyboard) {
        announceScreenChange(screenId);
    }
};

// Inicializar navegación por teclado
document.addEventListener('DOMContentLoaded', () => {
    setupKeyboardNavigation();
});
