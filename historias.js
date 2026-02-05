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
        title: 'Capítulo 1 - El Poder de las Manos',
        scenes: [
            {
                id: 1,
                image: 'assets/images/1.1.png',
                altText: 'Niño sonriente en un parque soleado saludando con señas a otros niños. El parque tiene árboles verdes y juegos coloridos de fondo. El niño mueve sus manos de forma expresiva.',
                description: 'Llegas a un parque nuevo y ves a un niño saludando a otros moviendo sus manos de forma divertida pero sin decir nada. ¿Qué piensas?',
                help: 'A veces las personas usan sus manos para hablar. Se llama Lengua de Señas.',
                decisions: [
                    {
                        id: 'curiosity',
                        text: '¡Qué interesante! Me acerco a mirar',
                        feedback: '¡Genial! La curiosidad es el primer paso para hacer nuevos amigos. El niño te ve y sonríe.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'ask-adult',
                        text: 'Le pregunto a un adulto qué está haciendo',
                        feedback: 'Buena idea preguntar, pero también puedes acercarte tú mismo para descubrirlo.',
                        nextScene: 2,
                        correct: false
                    },
                    {
                        id: 'ignore',
                        text: 'Seguro está jugando solo, mejor me voy',
                        feedback: 'Te pierdes la oportunidad de conocer a alguien especial. ¡Intenta ser más curioso!',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: 'assets/images/1.2.png',
                altText: 'Niño haciendo la seña del pulgar arriba con una sonrisa amigable. Su mano está levantada mostrando el gesto universal de aprobación. Expresión de bienvenida y amistad.',
                description: 'El niño hace una seña con su mano cerrada y el pulgar hacia arriba. Parece que te está saludando. ¿Cómo respondes?',
                help: 'Muchas señas son gestos que ya conocemos, como el pulgar arriba para decir "bien" o "hola".',
                decisions: [
                    {
                        id: 'wave',
                        text: 'Le devuelvo el saludo con la mano',
                        feedback: '¡Muy bien! Un saludo es el inicio de una gran comunicación. Él se pone muy feliz.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'thumbs-up',
                        text: 'Le hago también el pulgar arriba',
                        feedback: '¡Excelente! Usaste el mismo gesto que él. ¡Están comunicándose!',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'stare',
                        text: 'Me quedo quieto sin saber qué hacer',
                        feedback: 'Es normal no saber qué hacer, pero un simple gesto puede ayudar mucho.',
                        nextScene: 3,
                        correct: false
                    },
                    {
                        id: 'talk-loud',
                        text: 'Le digo "¡Hola!" muy fuerte',
                        feedback: 'Hablar fuerte no siempre ayuda. Mejor usa gestos visuales como él lo hace.',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: 'assets/images/1.3.png',
                altText: 'Niño señalando sus oídos y haciendo un gesto de negación con la cabeza. Expresión tranquila mientras explica que es sordo. Otro niño observa con curiosidad y atención.',
                description: 'Él señala sus oídos y luego hace una seña de "no". Te das cuenta de que no puede oírte. ¿Qué haces ahora?',
                help: 'Si alguien no oye, puedes usar tus manos, gestos o dibujos para que te entienda.',
                decisions: [
                    {
                        id: 'gestures',
                        text: 'Uso mis manos y gestos para comunicarme',
                        feedback: '¡Excelente! Estás usando el "Poder de las Manos". Él entiende que quieres ser su amigo.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'draw',
                        text: 'Dibujo en la arena para explicarme',
                        feedback: '¡Muy creativo! Los dibujos son una forma visual de comunicarse.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'shout',
                        text: 'Gritar muy fuerte para que me oiga',
                        feedback: 'Gritar no ayuda si alguien no puede oír. Lo mejor es usar señales visuales.',
                        nextScene: 4,
                        correct: false
                    },
                    {
                        id: 'leave',
                        text: 'Me alejo porque es difícil comunicarse',
                        feedback: 'No te rindas tan fácil. La comunicación tiene muchas formas, ¡inténtalo!',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: 'assets/images/1.4.png',
                altText: 'Dos niños frente a frente haciendo la seña de amigo juntos. Expresiones felices mientras aprenden a comunicarse. Parque colorido con sol brillante al fondo.',
                description: '¡Has descubierto que las manos pueden hablar! Tu nuevo amigo te enseña la seña de "amigo". ¿Qué quieres hacer?',
                help: 'La amistad no necesita palabras, solo ganas de entenderse.',
                decisions: [
                    {
                        id: 'learn-more',
                        text: 'Quiero aprender más señas',
                        feedback: '¡Fantástico! Aprender lengua de señas te abrirá un mundo de amistades.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'teach-others',
                        text: 'Quiero enseñar a mis otros amigos',
                        feedback: '¡Excelente idea! Compartir lo que aprendes hace el mundo más inclusivo.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'play-together',
                        text: 'Jugar juntos sin importar cómo hablamos',
                        feedback: '¡Perfecto! La amistad va más allá de las palabras.',
                        nextScene: 5,
                        correct: true
                    }
                ]
            },
            {
                id: 5,
                image: 'assets/images/1.4.png',
                altText: 'Los dos niños celebrando su nueva amistad en el parque. Ambos sonríen y hacen señas juntos. Ambiente alegre y colorido que representa la conexión entre ellos.',
                description: '🎉 ¡Felicidades! Has completado el Capítulo 1. Moraleja: La amistad no necesita palabras, solo ganas de entenderse.',
                help: '¡Has dado el primer paso hacia la inclusión!',
                decisions: []
            }
        ]
    },
    {
        id: 2,
        title: 'Capítulo 2 - El Tesoro del Silencio',
        scenes: [
            {
                id: 1,
                image: 'assets/images/2.1.png',
                altText: 'Escuela con pasillos coloridos. Niña sorda deja caer su estuche en el suelo. Otra niña intenta llamar su atención pero ella no voltea porque no puede escuchar.',
                description: 'En la escuela, una niña sorda deja caer su estuche. Intentas llamarla por su nombre pero no voltea. ¿Cómo captas su atención?',
                help: 'Para llamar a alguien que no oye, puedes tocar suavemente su hombro o mover tu mano en su campo visual.',
                decisions: [
                    {
                        id: 'tap-shoulder',
                        text: 'Le toco el hombro con suavidad',
                        feedback: '¡Perfecto! Un toque suave es una forma respetuosa de llamar la atención de una persona sorda.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'wave-front',
                        text: 'Me pongo frente a ella y saludo',
                        feedback: '¡Muy bien! Ponerte donde pueda verte es una forma efectiva de comunicarte.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'push',
                        text: 'La empujo para que me vea',
                        feedback: '¡Cuidado! Empujar puede asustar. Siempre sé amable y suave.',
                        nextScene: 2,
                        correct: false
                    },
                    {
                        id: 'yell',
                        text: 'Grito más fuerte su nombre',
                        feedback: 'Gritar no funcionará si ella no puede oír. Prueba con señales visuales.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: 'assets/images/2.2.png',
                altText: 'Niña sorda mirando atentamente los labios de quien le habla. Expresión concentrada mientras lee los labios. Ambiente escolar con luz natural.',
                description: 'Ella voltea y te mira a la cara. Te das cuenta de que mira mucho tus labios. ¿Cómo debes hablarle?',
                help: 'Muchas personas sordas leen los labios. Habla claro, sin taparte la boca y de frente.',
                decisions: [
                    {
                        id: 'clear-talk',
                        text: 'Hablo de frente y con calma',
                        feedback: '¡Excelente! Al hablar de frente y claro, ella puede entender mejor lo que dices.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'slow-speech',
                        text: 'Hablo despacio y vocalizando bien',
                        feedback: '¡Muy bien! Vocalizar claramente ayuda a que pueda leer tus labios.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'cover-mouth',
                        text: 'Me tapo la boca al hablar por pena',
                        feedback: 'Si te tapas la boca, ella no podrá leer tus labios. ¡Muestra tu sonrisa!',
                        nextScene: 3,
                        correct: false
                    },
                    {
                        id: 'look-away',
                        text: 'Miro hacia otro lado mientras hablo',
                        feedback: 'Si no te ve la cara, no puede leer tus labios. Mírale siempre de frente.',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: 'assets/images/2.3.png',
                altText: 'Niña sorda haciendo la seña de gracias tocando su barbilla y moviendo la mano hacia adelante. Sonríe agradecida. El estuche está en su mano.',
                description: 'Le devuelves su estuche y ella hace un gesto tocando su barbilla y moviendo la mano hacia adelante. ¡Es la seña de "Gracias"! ¿Qué haces?',
                help: 'Aprender señas básicas como "gracias" hace que el mundo sea más inclusivo.',
                decisions: [
                    {
                        id: 'repeat-sign',
                        text: 'Intento repetir la seña para decirle "de nada"',
                        feedback: '¡Qué lindo detalle! Tratar de usar su lengua la hace sentir muy incluida y feliz.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'smile',
                        text: 'Le sonrío y asiento con la cabeza',
                        feedback: '¡Bien hecho! Una sonrisa también es comunicación universal.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'ask-meaning',
                        text: 'Le pregunto qué significa con gestos',
                        feedback: '¡Excelente curiosidad! Preguntar es una forma de aprender.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'run-away',
                        text: 'Me voy corriendo porque me dio pena',
                        feedback: 'No tengas miedo a lo nuevo. La comunicación es un puente, ¡no huyas de ella!',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: 'assets/images/2.4.png',
                altText: 'Grupo de niños sentados juntos en el patio de la escuela. La niña sorda invita a sentarse a su lado. Expresiones amigables de todos los niños.',
                description: 'Has aprendido a comunicarte de una forma nueva. Ella te invita a sentarte con sus amigos. ¿Qué decides?',
                help: 'Los ojos son los oídos de quienes no pueden escuchar.',
                decisions: [
                    {
                        id: 'join',
                        text: 'Me siento con ellos y trato de aprender más señas',
                        feedback: '¡Maravilloso! Hacer nuevos amigos te enriquece.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'introduce',
                        text: 'Me presento a sus amigos con gestos',
                        feedback: '¡Excelente iniciativa! Estás rompiendo barreras.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'invite-others',
                        text: 'Invito a mis amigos también para que nos conozcan',
                        feedback: '¡Fantástico! Juntar grupos hace comunidades más fuertes.',
                        nextScene: 5,
                        correct: true
                    }
                ]
            },
            {
                id: 5,
                image: 'assets/images/2.4.png',
                altText: 'Grupo feliz de niños incluyendo a la niña sorda, todos juntos sonriendo en el patio escolar. Ambiente de amistad y unión que celebra la comunicación.',
                description: '🎉 ¡Felicidades! Has completado el Capítulo 2. Moraleja: Los ojos son los oídos de quienes no pueden escuchar.',
                help: '¡El silencio tiene tesoros maravillosos!',
                decisions: []
            }
        ]
    },
    {
        id: 3,
        title: 'Capítulo 3 - Un Mundo de Colores Vibrantes',
        scenes: [
            {
                id: 1,
                image: 'assets/images/3.1.png',
                altText: 'Salón de fiestas con luces de colores y música. Niño sordo coloca sus manos sobre una mesa de madera y sonríe sintiendo las vibraciones del ritmo.',
                description: 'Hay una fiesta en el salón con música muy fuerte. Notas que tu amigo sordo pone sus manos sobre una mesa de madera y sonríe. ¿Por qué crees que lo hace?',
                help: 'El sonido es vibración. Las personas sordas pueden "sentir" la música a través de las vibraciones en objetos.',
                decisions: [
                    {
                        id: 'vibrations',
                        text: '¡Está sintiendo el ritmo en sus manos!',
                        feedback: '¡Exacto! El cuerpo también puede "escuchar" a través de las vibraciones. ¡Es asombroso!',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'curious',
                        text: 'Le pregunto qué siente en la mesa',
                        feedback: '¡Excelente curiosidad! Él te explica que siente el ritmo de la música.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'broken',
                        text: 'Creo que está cansado y se apoya',
                        feedback: 'En realidad, está disfrutando la música de una forma diferente. ¡Todos sentimos el ritmo!',
                        nextScene: 2,
                        correct: false
                    },
                    {
                        id: 'bored',
                        text: 'Pienso que está aburrido',
                        feedback: '¡Al contrario! Está participando a su manera. Las personas sordas también disfrutan la música.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: 'assets/images/3.2.png',
                altText: 'Dos niños bailando juntos en la fiesta. Uno muestra los pasos de baile al otro. Luces de colores y globos decoran el ambiente festivo.',
                description: 'Quieres bailar con él, pero te preocupa que no sepa los pasos porque no "oye" la letra. ¿Cómo lo invitas?',
                help: 'Bailar es movimiento y sentimiento. No hace falta oír la letra para disfrutar el ritmo juntos.',
                decisions: [
                    {
                        id: 'dance-together',
                        text: 'Lo invito a bailar imitando mis pasos',
                        feedback: '¡Bravo! El baile es un lenguaje universal. Juntos crean su propio ritmo.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'hand-signal',
                        text: 'Le hago señas de "baila conmigo"',
                        feedback: '¡Perfecto! Usas la comunicación visual para incluirlo.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'show-moves',
                        text: 'Bailo frente a él para que vea los movimientos',
                        feedback: '¡Excelente idea! Así puede seguir tus pasos visualmente.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'sit-down',
                        text: 'Mejor me siento con él para que no se sienta mal',
                        feedback: 'A él también le gusta divertirse. No lo limites, ¡invítalo a participar!',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: 'assets/images/3.3.png',
                altText: 'Niños bailando con globos de colores en sus manos. El niño sordo siente las vibraciones de la música a través del globo. Expresiones de alegría en todos.',
                description: 'Durante el baile, usan globos para sentir mejor las vibraciones. Tu amigo está muy emocionado. ¿Qué aprendes de esto?',
                help: 'Existen muchas formas creativas de incluir a todos en las actividades, solo hay que usar la imaginación.',
                decisions: [
                    {
                        id: 'creativity',
                        text: 'La inclusión se logra con creatividad',
                        feedback: '¡Así es! Un simple globo ayudó a que todos disfrutaran la música por igual.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'everyone',
                        text: 'Que todos pueden disfrutar de formas diferentes',
                        feedback: '¡Perfecto! La diversidad enriquece nuestras experiencias.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'share-idea',
                        text: 'Compartiré esta idea con mi escuela',
                        feedback: '¡Fantástico! Difundir ideas inclusivas ayuda a muchos más.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'magic',
                        text: 'Que los globos son mágicos',
                        feedback: 'La verdadera magia es tu deseo de que nadie se quede fuera de la diversión.',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: 'assets/images/3.4.png',
                altText: 'Niño sordo haciendo la seña de música con sus manos mientras sonríe. La fiesta termina con todos los niños felices y conectados.',
                description: 'La fiesta termina y todos están felices. Tu amigo te enseña la seña de "música". ¿Cómo te sientes?',
                help: 'La música se siente en el corazón y en la piel.',
                decisions: [
                    {
                        id: 'grateful',
                        text: 'Agradecido por aprender algo nuevo',
                        feedback: '¡Hermoso! Aprender de otros siempre nos hace crecer.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'happy',
                        text: 'Feliz porque hicimos recuerdos juntos',
                        feedback: '¡Exacto! Los momentos compartidos son los mejores tesoros.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'inspired',
                        text: 'Inspirado para hacer más fiestas inclusivas',
                        feedback: '¡Maravilloso! Tu entusiasmo hará del mundo un lugar mejor.',
                        nextScene: 5,
                        correct: true
                    }
                ]
            },
            {
                id: 5,
                image: 'assets/images/3.4.png',
                altText: 'Grupo de niños celebrando al final de la fiesta. Globos y luces de fondo. Todos felices compartiendo un momento especial de conexión e inclusión.',
                description: '🎉 ¡Felicidades! Has completado el Capítulo 3. Moraleja: No hay barreras cuando el corazón quiere compartir la alegría.',
                help: '¡La música conecta corazones!',
                decisions: []
            }
        ]
    },
    {
        id: 4,
        title: 'Capítulo 4 - El Puente de la Amistad',
        scenes: [
            {
                id: 1,
                image: 'assets/images/4.1.png',
                altText: 'Grupo de niños en el patio de la escuela. Una niña sorda está sola mientras otros niños no quieren jugar con ella. Expresión de preocupación en el observador.',
                description: 'Ves a un grupo de niños que no quieren jugar con una niña sorda porque dicen que es "difícil" entenderse. ¿Qué haces?',
                help: 'Ser un aliado significa ayudar a otros a entender que la comunicación es posible para todos.',
                decisions: [
                    {
                        id: 'teach-others',
                        text: 'Les enseño las señas que yo ya sé',
                        feedback: '¡Eres un gran líder! Al enseñarles, estás rompiendo el miedo a lo desconocido.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'invite-all',
                        text: 'Invito a todos a jugar juntos',
                        feedback: '¡Excelente iniciativa! Incluir a todos es el primer paso.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'explain',
                        text: 'Les explico que es fácil comunicarse con gestos',
                        feedback: '¡Muy bien! Educar a otros sobre la comunicación inclusiva es importante.',
                        nextScene: 2,
                        correct: true
                    },
                    {
                        id: 'ignore-group',
                        text: 'Juego solo con ella y no les digo nada',
                        feedback: 'Es bueno jugar con ella, pero es aún mejor ayudar a que todos sean amigos.',
                        nextScene: 2,
                        correct: false
                    }
                ]
            },
            {
                id: 2,
                image: 'assets/images/4.2.png',
                altText: 'Niños aprendiendo el abecedario de señas juntos en el salón de clases. Un cartel con las letras en lengua de señas está visible. Expresiones de interés y curiosidad.',
                description: '¡Ahora todos están aprendiendo señas! Quieren poner un cartel en el salón con el abecedario de señas. ¿Dónde lo pondrías?',
                help: 'La visibilidad ayuda a recordar lo aprendido y a que nuevos niños también se interesen.',
                decisions: [
                    {
                        id: 'visible-place',
                        text: 'En la entrada para que todos lo vean',
                        feedback: '¡Excelente ubicación! Así, todos los que entren sabrán que este es un lugar inclusivo.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'classroom',
                        text: 'Junto al pizarrón para verlo siempre',
                        feedback: '¡Muy práctico! Así podrán consultarlo durante las clases.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'playground',
                        text: 'En el patio de recreo',
                        feedback: '¡Buena idea! Ahí todos juegan y pueden practicar.',
                        nextScene: 3,
                        correct: true
                    },
                    {
                        id: 'hidden-place',
                        text: 'En un cajón para que no se ensucie',
                        feedback: 'Si está guardado, nadie aprenderá. ¡Lo importante es que se vea!',
                        nextScene: 3,
                        correct: false
                    }
                ]
            },
            {
                id: 3,
                image: 'assets/images/4.3.png',
                altText: 'Presentación en el salón de clases con niños hablando en voz y señas al mismo tiempo. Público de niños y maestros aplaudiendo. Ambiente de celebración educativa.',
                description: 'Al final del curso, todos hacen una presentación en señas y voz al mismo tiempo. Sientes mucha satisfacción. ¿Cuál es el mayor logro?',
                help: 'Lograr que todos se comuniquen y se respeten es la base de una sociedad mejor.',
                decisions: [
                    {
                        id: 'inclusion-win',
                        text: 'Haber creado un ambiente donde todos cuentan',
                        feedback: '¡Exacto! Ese es el Puente de la Amistad que has construido con tus manos y tu corazón.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'new-friends',
                        text: 'Haber hecho nuevos amigos',
                        feedback: '¡Hermoso! Las amistades que rompen barreras son las más valiosas.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'learned',
                        text: 'Haber aprendido una nueva forma de comunicarme',
                        feedback: '¡Fantástico! Ahora tienes una habilidad que te acompañará siempre.',
                        nextScene: 4,
                        correct: true
                    },
                    {
                        id: 'victory',
                        text: 'Haber sacado la mejor nota',
                        feedback: 'Las notas son importantes, pero la amistad y la inclusión valen mucho más.',
                        nextScene: 4,
                        correct: false
                    }
                ]
            },
            {
                id: 4,
                image: 'assets/images/4.4.png',
                altText: 'Niño haciendo una promesa con la mano en el corazón. A su alrededor, amigos sordos y oyentes unidos. Expresión de compromiso y esperanza.',
                description: '¡Eres un experto en conectar mundos! ¿Qué promesa te haces para el futuro?',
                help: 'La Lengua de Señas no solo mueve manos, mueve corazones hacia la inclusión.',
                decisions: [
                    {
                        id: 'keep-learning',
                        text: 'Seguir aprendiendo lengua de señas',
                        feedback: '¡Excelente compromiso! Cada seña que aprendas abrirá más puertas.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'teach-family',
                        text: 'Enseñar a mi familia lo que aprendí',
                        feedback: '¡Maravilloso! Compartir conocimiento multiplica la inclusión.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'be-ally',
                        text: 'Ser siempre un aliado de las personas sordas',
                        feedback: '¡Perfecto! El mundo necesita más aliados como tú.',
                        nextScene: 5,
                        correct: true
                    },
                    {
                        id: 'include-all',
                        text: 'Incluir a todos en mis juegos y actividades',
                        feedback: '¡Increíble! La inclusión empieza con pequeñas acciones diarias.',
                        nextScene: 5,
                        correct: true
                    }
                ]
            },
            {
                id: 5,
                image: 'assets/images/4.4.png',
                altText: 'Gran celebración final con todos los personajes juntos. Niños sordos y oyentes haciendo señas de alegría. Confeti y globos en el ambiente festivo de logro.',
                description: '🎉 ¡Felicidades! Has completado toda la aventura. Moraleja: La Lengua de Señas no solo mueve manos, mueve corazones hacia la inclusión. ¡Eres increíble!',
                help: '¡Has terminado toda la aventura!',
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
    const sceneImgDesc = document.getElementById('scene-img-desc');
    const imageFrame = document.getElementById('image-frame');
    const placeholder = document.getElementById('illustration-placeholder');

    if (scene.image && scene.image.trim() !== '') {
        // Hay imagen para esta escena
        if (sceneImg) {
            sceneImg.src = scene.image;
            // Usar altText descriptivo si existe, sino usar descripción truncada
            const imageAlt = scene.altText || `Ilustración: ${scene.description.substring(0, 100)}...`;
            sceneImg.alt = imageAlt;
            sceneImg.setAttribute('aria-label', imageAlt);
            if (sceneImgDesc) {
                sceneImgDesc.textContent = imageAlt;
            }
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
            sceneImg.alt = '';
            sceneImg.removeAttribute('aria-label');
            sceneImg.style.display = 'none';
        }
        if (sceneImgDesc) {
            sceneImgDesc.textContent = 'No hay ilustración disponible para esta escena.';
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
