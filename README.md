# SeñasConecta - Prototipo de Alta Fidelidad

Aplicación educativa interactiva que enseña el lenguaje de señas a través de historias con decisiones múltiples. Diseñada con enfoque en usabilidad (heurísticas de Nielsen) y accesibilidad (WCAG 2.1).

## 🎯 Características Principales

- **Historias interactivas completas** con decisiones múltiples y narrativa envolvente
- **Lecciones de lengua de señas** con animaciones visuales y feedback inmediato
- **Sistema de progreso** visual y accesible con mapa de avance
- **Diseño inclusivo y atractivo** para personas sordas y oyentes
- **Configuración de accesibilidad** personalizable
- **Elementos visuales vibrantes** con gradientes, animaciones y efectos modernos
- **Ilustraciones elaboradas** para cada escena (escuela, parque, trabajo)

## 📋 Heurísticas de Nielsen Implementadas

### 1. Visibilidad del Estado del Sistema ✅

- **Indicadores de progreso visuales**: Barras de progreso en lecciones y capítulos
- **Feedback inmediato**: Mensajes claros al seleccionar respuestas o tomar decisiones
- **Estado de navegación**: Indicadores de pantalla actual para lectores de pantalla
- **Progreso global**: Indicador en la pantalla principal mostrando el avance total
- **Estados de botones**: Deshabilitados cuando no son aplicables, con estados hover/focus claros

**Ejemplos**:
- Barras de progreso animadas con porcentajes
- Mensajes de éxito/error con colores distintivos
- Indicadores de capítulo completado/en progreso/bloqueado

### 2. Correspondencia entre el Sistema y el Mundo Real ✅

- **Lenguaje familiar**: Textos en español claro, sin jerga técnica
- **Iconografía reconocible**: Iconos de escuela, parque, trabajo
- **Metáforas familiares**: "Mapa de avance", "Comenzar aventura"
- **Contextos reales**: Escenarios como escuela, parque, trabajo

**Ejemplos**:
- Iconos visuales que representan cada capítulo (edificio escolar, árbol, candado)
- Textos descriptivos que contextualizan las situaciones

### 3. Control y Libertad del Usuario ✅

- **Navegación de regreso**: Botón "Volver" en todas las pantallas
- **Control de animaciones**: Opción para desactivar animaciones automáticas
- **Reintentar lecciones**: Opción para repetir lecciones completadas
- **Salida de estados**: Posibilidad de salir de cualquier pantalla
- **Navegación por teclado**: Soporte completo para navegación sin mouse

**Ejemplos**:
- Botón "← Volver" consistente en todas las pantallas
- Configuración para pausar animaciones de carruseles
- Opción "Reintentar lección" después de completar

### 4. Consistencia y Estándares ✅

- **Diseño consistente**: Misma estructura en todas las pantallas
- **Colores consistentes**: 
  - Botones primarios: gris oscuro (#2C3E50)
  - Botones secundarios: blanco con borde
  - Éxito: verde (#27AE60)
  - Error: rojo (#E74C3C)
- **Iconografía uniforme**: Mismos iconos para mismas acciones
- **Navegación estándar**: Patrones de navegación web familiares
- **Estándares HTML/ARIA**: Uso correcto de roles y atributos semánticos

**Ejemplos**:
- Todos los botones primarios tienen el mismo estilo
- Los enlaces de "Volver" siempre están en la misma posición
- Estructura de tarjetas consistente para opciones

### 5. Prevención de Errores ✅

- **Validación antes de continuar**: No se puede continuar sin seleccionar una respuesta
- **Confirmación visual**: Estados claros de selección antes de confirmar
- **Mensajes preventivos**: Advertencia si se intenta continuar sin seleccionar tipo de jugador
- **Formato perdonable**: Las respuestas se muestran claramente antes de confirmar
- **Restricciones visuales**: Botones deshabilitados cuando no son aplicables

**Ejemplos**:
- Botón "Continuar" deshabilitado hasta seleccionar respuesta
- Mensaje de error si se intenta iniciar modo sin seleccionar tipo de jugador
- Feedback inmediato al seleccionar opciones incorrectas

### 6. Reconocimiento más que Recuerdo ✅

- **Opciones visibles**: Todas las opciones están siempre visibles
- **Progreso visible**: El usuario siempre sabe dónde está
- **Información contextual**: Tooltips y ayuda disponible cuando se necesita
- **Historial de progreso**: Mapa de avance muestra capítulos completados
- **Estadísticas visibles**: Señas aprendidas y precisión siempre visibles

**Ejemplos**:
- Mapa de avance muestra claramente qué capítulos están completados
- Estadísticas de progreso en pantalla de resultados
- Ayuda contextual disponible con botón "?"

### 7. Flexibilidad y Eficiencia de Uso ✅

- **Atajos de teclado** para usuarios expertos:
  - `Ctrl/Cmd + 1`: Ir a inicio
  - `Ctrl/Cmd + 2`: Ir a modo de juego
  - `Ctrl/Cmd + 3`: Ir a aprender básicos
  - `Ctrl/Cmd + ,`: Ir a configuración
  - `Escape`: Volver atrás
- **Navegación rápida**: Acceso directo a diferentes secciones
- **Información contextual**: Tooltips para ayuda rápida
- **Modos de práctica**: Modo libre para práctica sin restricciones

**Ejemplos**:
- Atajos de teclado documentados y funcionales
- Modo de práctica libre disponible
- Configuración rápida accesible desde inicio

### 8. Diseño Estético y Minimalista ✅

- **Interfaz limpia**: Diseño minimalista sin elementos innecesarios
- **Jerarquía visual clara**: Títulos, subtítulos y contenido bien diferenciados
- **Espaciado adecuado**: Respiración visual entre elementos
- **Información relevante**: Solo se muestra lo necesario en cada pantalla
- **Iconos claros**: Iconografía simple y comprensible

**Ejemplos**:
- Pantallas con máximo 3-4 elementos principales
- Espaciado generoso entre secciones
- Colores usados con propósito (no decorativo)

### 9. Ayuda a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores ✅

- **Mensajes de error descriptivos**: Explican qué salió mal y por qué
- **Lenguaje humano**: Sin términos técnicos o jerga
- **Mensajes constructivos**: No culpan al usuario
- **Sugerencias de solución**: Indican qué hacer a continuación
- **Feedback visual**: Colores y iconos para identificar errores rápidamente

**Ejemplos**:
- "Por favor, selecciona primero tu tipo de jugador" (en lugar de "Error: playerType null")
- "Incorrecto. La respuesta correcta es 'Hola'." (con la respuesta correcta resaltada)
- Mensajes en verde para éxito, rojo para error

### 10. Ayuda y Documentación ✅

- **Ayuda contextual**: Botón de ayuda (?) disponible en lecciones
- **Tooltips informativos**: Información adicional sobre señas
- **Configuración de accesibilidad**: Guía para personalizar la experiencia
- **Texto descriptivo**: Descripciones claras de cada modo y opción
- **Etiquetas ARIA**: Textos alternativos para lectores de pantalla

**Ejemplos**:
- Botón "?" en pantalla de lecciones con información sobre la seña
- Descripciones en cada botón y opción
- Configuración con explicaciones claras

## ♿ Accesibilidad (WCAG 2.1)

### Nivel de Conformidad: AA (objetivo AAA donde sea posible)

#### 1. Perceptible

- **Contraste de colores**: 
  - Texto normal: mínimo 4.5:1 (WCAG AA)
  - Texto grande: mínimo 3:1
  - Modo alto contraste disponible
- **Tamaño de texto**: 
  - Tamaño base: 16px (mínimo recomendado)
  - Ajustable de 14px a 24px
  - Texto escalable sin pérdida de funcionalidad
- **Textos alternativos**: 
  - Todas las imágenes tienen `alt` o `aria-label`
  - Iconos decorativos marcados con `aria-hidden="true"`
- **Subtítulos**: Opción para mostrar subtítulos en videos (preparado para futuras implementaciones)

#### 2. Operable

- **Navegación por teclado**: 
  - Todos los elementos interactivos son accesibles por teclado
  - Orden de tabulación lógico
  - Indicadores de foco visibles (outline de 3px)
- **Tamaño de área táctil**: 
  - Mínimo 44x44px (WCAG recomendado: 48x48px)
  - Botones con padding adecuado
- **Sin trampas de teclado**: 
  - Navegación fluida entre elementos
  - Escape para salir de estados
- **Control de animaciones**: 
  - Opción para desactivar animaciones
  - Respeta `prefers-reduced-motion`

#### 3. Comprensible

- **Lenguaje claro**: 
  - Textos en español simple
  - Sin jerga técnica
  - Instrucciones claras
- **Navegación predecible**: 
  - Estructura consistente
  - Mismos elementos en mismas posiciones
- **Ayuda para entrada**: 
  - Etiquetas claras en todos los campos
  - Instrucciones antes de acciones
  - Mensajes de error descriptivos

#### 4. Robusto

- **HTML semántico**: 
  - Uso correcto de elementos HTML5
  - Estructura jerárquica adecuada
- **ARIA**: 
  - Roles apropiados (`main`, `button`, `progressbar`, `alert`)
  - Estados (`aria-pressed`, `aria-checked`, `aria-disabled`)
  - Etiquetas (`aria-label`, `aria-describedby`)
  - Regiones vivas (`aria-live`) para actualizaciones dinámicas

### Consideraciones Específicas para Usuarios Sordos y Oyentes

#### Para Usuarios Sordos:
- **Contenido visual**: 
  - Ilustraciones claras de señas
  - Animaciones de movimientos de manos
  - Iconografía visual rica
- **Lenguaje de señas**: 
  - Opción para seleccionar LSM (Lengua de Señas Mexicana) o ASL
  - Preparado para múltiples variantes
- **Texto claro**: 
  - Lenguaje sencillo y directo
  - Sin dependencia de audio
  - Información visual completa

#### Para Usuarios Oyentes:
- **Aprendizaje progresivo**: 
  - Modo "Jugador oyente" con explicaciones desde cero
  - Lecciones estructuradas paso a paso
  - Feedback constante
- **Contexto cultural**: 
  - Historias que contextualizan el uso de señas
  - Explicaciones sobre la importancia de la comunicación inclusiva

#### Mecanismos Alternativos de Interacción:
- **Teclado**: Navegación completa sin mouse
- **Táctil**: Áreas de toque grandes y espaciadas
- **Visual**: Toda la información es visual, sin dependencia de audio
- **Configuración**: Personalización de tamaño de texto, contraste, animaciones

## 🎨 Diseño Visual

### Paleta de Colores Vibrantes

- **Primario**: #6366F1 (Índigo vibrante) - Color principal con gradientes
- **Secundario**: #EC4899 (Rosa vibrante) - Para acciones importantes
- **Acento**: #F59E0B (Ámbar dorado) - Para destacar elementos
- **Éxito**: #10B981 (Verde esmeralda) - Feedback positivo
- **Info**: #3B82F6 (Azul cielo) - Información adicional
- **Fondo**: Gradientes suaves y modernos
- **Efectos**: Sombras, brillos y animaciones para mayor atractivo visual

### Elementos Visuales Destacados

- **Gradientes modernos** en botones, tarjetas y fondos
- **Animaciones fluidas** en iconos, ilustraciones y transiciones
- **Ilustraciones elaboradas** para cada escena:
  - **Escuela**: Edificio detallado con ventanas animadas, nubes en movimiento
  - **Parque**: Árboles con frutos, banco, sol y elementos naturales
  - **Trabajo**: Edificio de oficina con ventanas iluminadas
- **Efectos de hover** mejorados con transformaciones y sombras
- **Animaciones de señas** más realistas y atractivas

### Tipografía

- **Familia**: System fonts (-apple-system, Segoe UI, Roboto)
- **Tamaños**: 14px - 32px (ajustable)
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Espaciado

- Sistema de espaciado consistente: 0.5rem, 1rem, 1.5rem, 2rem, 3rem
- Márgenes y padding uniformes

## 🚀 Uso

1. Abrir `index.html` en un navegador moderno
2. La aplicación se carga automáticamente en la pantalla de inicio
3. Navegar usando los botones o atajos de teclado
4. Personalizar la experiencia en "Configuración / Accesibilidad"

## 📱 Responsive

- Diseño adaptable para diferentes tamaños de pantalla
- Breakpoints:
  - Desktop: > 768px
  - Tablet: 480px - 768px
  - Mobile: < 480px

## 🔧 Tecnologías

- HTML5 semántico
- CSS3 (Variables, Flexbox, Grid, Animaciones)
- JavaScript vanilla (ES6+)
- Sin dependencias externas

## 📝 Notas de Implementación

- **Estado persistente**: La configuración se guarda en `localStorage`
- **Progreso**: El progreso se mantiene durante la sesión
- **Animaciones**: Respetan `prefers-reduced-motion` y pueden desactivarse
- **Accesibilidad**: Probado con lectores de pantalla (preparado)
- **Historia completa**: 3 capítulos con múltiples escenas y decisiones
- **Elementos visuales**: Ilustraciones CSS puras, sin dependencias de imágenes externas
- **Rendimiento**: Optimizado con animaciones CSS y transiciones suaves

## 📖 Historia

La aplicación incluye una historia completa y entretenida sobre inclusión y comunicación:

### Capítulo 1: Un Nuevo Amigo (Escuela)
- Conoces a Sofía, una estudiante sorda
- Aprendes a comunicarte usando señas y tecnología
- Te unes a la comunidad de lengua de señas
- Desarrollas una amistad significativa

### Capítulo 2: Aventura en el Parque
- Ayudas a un niño sordo perdido
- Conoces a la comunidad sorda local
- Asistes a un festival de cultura sorda
- Expandes tu comprensión de la inclusión

### Capítulo 3: El Mundo Profesional
- Entrevista de trabajo con un empleador sordo
- Aprendes sobre inclusión en el lugar de trabajo
- Te conviertes en un aliado de inclusión
- Haces una diferencia real en el mundo profesional

## 🎯 Próximas Mejoras Sugeridas

- [ ] Videos reales de lengua de señas
- [ ] Más capítulos y lecciones
- [ ] Sistema de logros
- [ ] Modo multijugador
- [ ] Sincronización de progreso en la nube
- [ ] Soporte para más idiomas de señas

---

**Desarrollado con enfoque en inclusión y accesibilidad universal**

