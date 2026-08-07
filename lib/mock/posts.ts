import type { Post } from '@/types'

export const MOCK_POSTS: Post[] = [
  {
    _id: 'mock-cuanto-cuesta-pagina-web',
    title: '¿Cuánto cuesta una página web en Chile? Guía de precios',
    seoTitle: '¿Cuánto cuesta una página web en Chile?',
    slug: { current: 'cuanto-cuesta-una-pagina-web-en-chile' },
    publishedAt: '2026-07-20',
    coverUrl: '/images/blog/cuanto-cuesta-una-pagina-web-en-chile-guia-de-precios.webp',
    excerpt: 'El precio de una página web varía muchísimo según lo que realmente necesites. Esta guía explica qué factores mueven el precio, para que sepas qué preguntar antes de cotizar.',
    tags: ['Precios', 'WordPress', 'Guía'],
    sections: [
      {
        heading: '',
        body: '"¿Cuánto cuesta una página web?" no tiene una respuesta única — depende de lo que estés construyendo. Un landing page simple y una tienda online con cientos de productos no cuestan lo mismo, ni deberían. Esta guía explica qué factores realmente mueven el precio, para que puedas cotizar con criterio en vez de comparar números sueltos.',
      },
      {
        heading: 'Qué mueve realmente el precio',
        body: 'El tipo de sitio (landing, corporativo, tienda online), la cantidad de páginas, si el diseño es a medida o sobre una plantilla, las funcionalidades que necesita (pasarela de pago, reservas, multi-idioma, integraciones) y quién lo construye — freelancer o agencia — son los factores que más impactan el precio final. Dos sitios que "se ven parecidos" pueden costar muy distinto si uno tiene una arquitectura pensada para escalar y el otro no.',
      },
      {
        heading: 'Landing page vs. sitio corporativo vs. tienda online',
        body: 'Una landing page (una sola página orientada a un objetivo, como captar leads) es lo más rápido y económico de construir. Un sitio corporativo con varias secciones (servicios, nosotros, contacto, blog) suma tiempo de arquitectura de información y contenido. Una tienda online con WooCommerce suma pasarela de pago, gestión de inventario, envíos y, generalmente, más pruebas antes de publicar. El precio escala con la complejidad real, no con el tamaño de la empresa que lo pide.',
      },
      {
        heading: 'Lo que casi nadie cotiza (y después cuesta caro)',
        body: 'Hosting, dominio, certificado SSL, mantenimiento, actualizaciones de seguridad y backups suelen quedar fuera de la cotización inicial y aparecen después como gastos "sorpresa". Antes de aceptar una propuesta, vale la pena preguntar explícitamente qué pasa después del lanzamiento: quién actualiza el sitio, quién responde si algo se rompe, y qué cubre el precio más allá de la entrega.',
      },
      {
        heading: 'Cómo cotizar sin sorpresas',
        body: 'Pedí que la cotización especifique qué incluye (número de páginas, revisiones, capacitación), qué no incluye (hosting, contenido, fotografía), y los plazos de entrega. Un proveedor serio no debería tener problema en desglosar esto — si una cotización es un solo número sin detalle, es una señal de alerta.',
      },
      {
        heading: '¿Freelancer o agencia?',
        body: 'Una agencia suma estructura y varios especialistas, pero también intermediarios entre vos y quien realmente hace el trabajo. Un freelancer con experiencia real en diseño, desarrollo y SEO técnico puede ofrecer trato directo, cambios más rápidos y menos capas de comunicación — a cambio de depender de una sola persona en vez de un equipo. Ninguna opción es mejor en abstracto; depende de la complejidad del proyecto y de cuánto valorás el contacto directo con quien construye tu sitio.',
      },
    ],
  },
  {
    _id: 'mock-elementor-vs-divi',
    title: 'Elementor vs. Divi: ¿cuál elegir para tu sitio en WordPress?',
    seoTitle: 'Elementor vs. Divi: ¿cuál elegir?',
    slug: { current: 'elementor-vs-divi' },
    publishedAt: '2026-07-08',
    coverUrl: '/images/blog/elementor-vs-divi-cual-elegir-para-tu-sitio-en-wordpress.webp',
    excerpt: 'Los dos page builders más usados en WordPress resuelven lo mismo de forma distinta. Una comparación honesta, desde la experiencia real de construir sitios con ambos.',
    tags: ['WordPress', 'Elementor', 'Divi', 'Comparativa'],
    sections: [
      {
        heading: '',
        body: 'Elementor y Divi son los dos constructores visuales más usados en WordPress, y la pregunta de "cuál es mejor" es la equivocada — la que importa es cuál conviene para tu proyecto. Esto no es una comparación de specs sacada de una tabla: es lo que aprendí construyendo sitios corporativos y tiendas con ambos.',
      },
      {
        heading: 'Qué tienen en común',
        body: 'Los dos son editores visuales de arrastrar y soltar, no requieren saber programar para armar una página, tienen un ecosistema enorme de plantillas y ambos funcionan bien con WooCommerce. Para un sitio corporativo estándar, cualquiera de los dos te va a dar un resultado profesional.',
      },
      {
        heading: 'Dónde se nota la diferencia',
        body: 'Elementor tiene una interfaz más moderna y un editor que se siente más ágil, además de un ecosistema gigante de addons de terceros. Divi viene con su propio tema integrado y una licencia de por vida que resuelve varios sitios sin pagar de nuevo — pero puede sentirse un poco más pesado si no se optimiza bien.',
      },
      {
        heading: 'Rendimiento y velocidad',
        body: 'Ningún builder es "lento" o "rápido" por sí solo — un sitio mal optimizado en cualquiera de los dos va a cargar mal, y un sitio bien configurado (caché, imágenes optimizadas, buen hosting) puede rendir bien en ambos. El builder es una parte de la ecuación, no toda.',
      },
      {
        heading: 'Cuál elegiría para tu proyecto',
        body: 'Para un sitio corporativo simple, cualquiera funciona. Para una tienda con WooCommerce, Elementor Pro tiene una integración nativa con el WooCommerce Builder que hace más directo diseñar fichas de producto y checkout. Y si tu sitio actual ya está construido en uno de los dos, generalmente conviene mantenerlo — reconstruir todo solo para cambiar de builder rara vez vale la pena.',
      },
      {
        heading: 'En la práctica',
        body: 'La herramienta importa menos que quien la usa. Yo trabajo con ambos según lo que cada proyecto necesita, en vez de forzar siempre la misma solución porque es la que más domino.',
      },
    ],
  },
  {
    _id: 'mock-woocommerce-o-shopify',
    title: 'WooCommerce o Shopify: ¿cuál conviene para tu tienda online?',
    seoTitle: 'WooCommerce o Shopify: ¿cuál elegir?',
    slug: { current: 'woocommerce-o-shopify' },
    publishedAt: '2026-06-25',
    coverUrl: '/images/blog/woocommerce-o-shopify-cual-conviene-para-tu-tienda-online.webp',
    excerpt: 'Antes de elegir plataforma para tu tienda, conviene entender qué estás comprando: control total con más responsabilidad, o simplicidad con menos margen de personalización.',
    tags: ['E-commerce', 'WooCommerce', 'Shopify', 'Comparativa'],
    sections: [
      {
        heading: '',
        body: 'La pregunta no es cuál plataforma es "mejor" en abstracto, sino qué trade-off le conviene a tu negocio: control total con más responsabilidad encima, o simplicidad a cambio de menos margen de personalización.',
      },
      {
        heading: 'Cómo funciona cada una',
        body: 'WooCommerce es un plugin gratuito que corre sobre WordPress: el sitio vive en tu propio hosting y vos (o quien te mantenga el sitio) sos responsable de actualizaciones, seguridad y backups. Shopify es un SaaS — todo está alojado y mantenido por ellos, y pagás una mensualidad por ese servicio.',
      },
      {
        heading: 'Costos reales',
        body: 'Con WooCommerce no hay mensualidad de plataforma, pero el hosting, el mantenimiento y algunos plugins de pago suman costos que vos controlás directamente. Con Shopify pagás una mensualidad fija que crece según el plan, e incluye hosting, seguridad y soporte — pero las comisiones por transacción y las apps premium también suman con el tiempo. Los números exactos varían según el proyecto, así que no sirve comparar "precio de plataforma" sin mirar el resto.',
      },
      {
        heading: 'Personalización y control',
        body: 'WooCommerce te da acceso al código: prácticamente cualquier funcionalidad es posible con desarrollo a medida, y se integra de forma nativa con todo el ecosistema de WordPress (blog, SEO, plugins). Shopify es más cerrado a su propio ecosistema de apps — los cambios profundos requieren developers que sepan Liquid — pero la experiencia lista para usar es más pulida y rápida de lanzar.',
      },
      {
        heading: 'Mantenimiento y seguridad',
        body: 'En WooCommerce, la responsabilidad de mantener el sitio actualizado y seguro es tuya o de quien contrates para eso. En Shopify, la plataforma se encarga — es menos de qué preocuparte, pero también menos margen de acción si algo específico falla y necesitás resolverlo vos mismo.',
      },
      {
        heading: 'Cuál elegiría según el caso',
        body: 'Si ya tenés presencia en WordPress, un catálogo complejo, o querés combinar tienda con contenido fuerte orientado a SEO, WooCommerce tiene más sentido. Si querés lanzar rápido, sin pensar en mantenimiento técnico, y tu equipo no es técnico, Shopify reduce fricción. Ninguna es la respuesta correcta para todos los casos.',
      },
    ],
  },
  {
    _id: 'mock-como-elegir-agencia-web',
    title: 'Cómo elegir una agencia web (o freelancer) sin arrepentirte',
    seoTitle: 'Cómo elegir una agencia web sin arrepentirte',
    slug: { current: 'como-elegir-una-agencia-web' },
    publishedAt: '2026-06-10',
    coverUrl: '/images/blog/como-elegir-una-agencia-web-o-freelancer-sin-arrepentirte.webp',
    excerpt: 'Contratar a quien construya tu sitio es una decisión cara de revertir después. Estas son las preguntas que realmente importan antes de firmar.',
    tags: ['Guía', 'Freelance', 'Agencia'],
    sections: [
      {
        heading: '',
        body: 'Elegir quién construye tu sitio web es una decisión que después es cara de revertir — no solo en plata, también en tiempo. No se trata de encontrar el portafolio más grande o el precio más bajo, sino de hacer las preguntas correctas antes de firmar.',
      },
      {
        heading: 'Pedí ver proyectos reales, no solo el portafolio',
        body: 'Pedí sitios en producción, no capturas o mockups. Abrilos en el celular, fijate si cargan rápido, si se ven bien. Y preguntá por un proyecto en concreto: cuál era el problema del cliente, qué se hizo, y qué resultado dejó. Si no pueden contarte eso con detalle, probablemente no lo pensaron así.',
      },
      {
        heading: 'Preguntá quién hace el trabajo, no solo quién lo vende',
        body: 'En muchas agencias, la persona que te vende el proyecto no es la que después lo construye. Preguntá directamente quién va a ser tu contacto durante el desarrollo, y si va a ser la misma persona de principio a fin.',
      },
      {
        heading: 'Aclará qué pasa después del lanzamiento',
        body: 'Preguntá sobre mantenimiento posterior: quién arregla algo si se rompe, si existe algún acuerdo de soporte, y qué pasa si en seis meses querés hacer cambios. Un sitio entregado sin ningún plan de qué sigue después suele ser el inicio de sorpresas caras.',
      },
      {
        heading: 'Fijate en la comunicación, no solo en el precio',
        body: 'La cotización más barata no siempre termina siendo la más económica si la comunicación es lenta o requiere varias vueltas para resolver algo simple. Cómo responden y qué preguntan durante el proceso de cotizar es una buena señal de cómo va a ser trabajar con ellos después.',
      },
      {
        heading: 'Freelancer o agencia, otra vez',
        body: 'Una agencia suma estructura y especialistas, a costa de intermediarios entre vos y quien hace el trabajo. Un freelancer con experiencia real ofrece trato directo y cambios más rápidos, a cambio de depender de una sola persona. Ninguna opción es automáticamente mejor — depende de la complejidad de tu proyecto y de cuánto valorás hablar directo con quien construye tu sitio.',
      },
    ],
  },
  {
    _id: 'mock-errores-tienda-online',
    title: 'Errores comunes al crear una tienda online (y cómo evitarlos)',
    seoTitle: 'Errores comunes al crear una tienda online',
    slug: { current: 'errores-al-crear-una-tienda-online' },
    publishedAt: '2026-05-28',
    coverUrl: '/images/blog/errores-comunes-al-crear-una-tienda-online-y-como-evitarlos.webp',
    excerpt: 'Muchos de los problemas que frenan las ventas de una tienda online no son de diseño — son decisiones tomadas (o salteadas) antes de lanzar. Estos son los más comunes.',
    tags: ['E-commerce', 'WooCommerce', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Muchos de los problemas que frenan las ventas de una tienda online no son de diseño — son decisiones tomadas, o salteadas, antes de lanzar. Estos son los errores más comunes que veo repetirse.',
      },
      {
        heading: 'Checkout con demasiados pasos',
        body: 'Cada paso de más en el checkout es una oportunidad para que alguien abandone el carrito. Pedí solo la información necesaria, y si podés ofrecer compra como invitado sin obligar a crear una cuenta, hacelo — cada fricción de más cuesta ventas.',
      },
      {
        heading: 'Fichas de producto sin la información que el cliente necesita',
        body: 'Faltan tallas, especificaciones, costos de envío o política de devolución, y el cliente se va a buscar esa respuesta a otro lado. Una ficha de producto tiene que responder las dudas antes de que se conviertan en una razón para no comprar.',
      },
      {
        heading: 'No pensar el sitio para el celular',
        body: 'La mayoría del tráfico de una tienda online es mobile. Que el sitio "se vea" en el celular no es lo mismo que haber sido pensado para ese uso — botones chicos, precios difíciles de leer o imágenes lentas pierden ventas de forma silenciosa, sin que nadie se queje directamente.',
      },
      {
        heading: 'Velocidad de carga ignorada hasta que ya es tarde',
        body: 'Imágenes sin optimizar, demasiados plugins y hosting insuficiente para el tráfico real de una tienda no solo afectan el puntaje de Core Web Vitals — afectan conversiones concretas. Es más barato resolver esto antes de lanzar que después de perder ventas por meses.',
      },
      {
        heading: 'Lanzar sin un plan de qué pasa después',
        body: 'Una tienda no está "terminada" el día del lanzamiento. Inventario, promociones, seguimiento de carritos abandonados y contenido para SEO necesitan atención continua, o la tienda se estanca apenas pasa el entusiasmo inicial.',
      },
    ],
  },
  {
    _id: 'mock-wordpress-vs-wix-vs-squarespace',
    title: 'WordPress vs. Wix vs. Squarespace: ¿cuál conviene para tu empresa?',
    seoTitle: 'WordPress vs. Wix vs. Squarespace: ¿cuál usar?',
    slug: { current: 'wordpress-vs-wix-vs-squarespace' },
    publishedAt: '2026-05-14',
    coverUrl: '/images/blog/wordpress-vs-wix-vs-squarespace-cual-conviene-para-tu-empresa.webp',
    excerpt: 'Los constructores "todo incluido" prometen simplicidad, WordPress promete control. Antes de elegir, conviene entender qué estás sacrificando en cada opción.',
    tags: ['WordPress', 'Comparativa', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Wix y Squarespace venden simplicidad: te registrás, elegís una plantilla y en un día tenés un sitio publicado. WordPress vende control: podés construir cualquier cosa, pero requiere más decisiones. Ninguno es "el mejor" — la pregunta correcta es qué estás dispuesto a sacrificar a cambio de qué.',
      },
      {
        heading: 'Simplicidad vs. control',
        body: 'Wix y Squarespace resuelven el hosting, la seguridad y las actualizaciones por vos, dentro de un ecosistema cerrado. WordPress te da acceso al código y a miles de plugins, pero la responsabilidad de mantenerlo actualizado y seguro recae en vos o en quien contrates para eso.',
      },
      {
        heading: 'Qué pasa cuando tu negocio crece',
        body: 'Un catálogo de productos que crece, una integración puntual con un sistema interno, o un blog pensado para SEO técnico son cosas que WordPress resuelve sin pelear con la plataforma. Los constructores todo-en-uno pueden empezar a quedarse cortos justo cuando el negocio empieza a necesitar más.',
      },
      {
        heading: 'SEO y velocidad',
        body: 'Los tres pueden posicionar bien si están bien configurados, pero WordPress da más margen de ajuste fino — control sobre el hosting, caché, estructura de URLs y datos estructurados — que las plataformas cerradas no siempre permiten tocar.',
      },
      {
        heading: 'Cuál elegiría según el caso',
        body: 'Si necesitás algo simple, sin plan de crecer mucho y sin presupuesto para mantenimiento, un constructor todo-en-uno reduce fricción. Si tu sitio es una herramienta de negocio que va a evolucionar — más productos, más contenido, más integraciones — WordPress da el margen que después vas a necesitar.',
      },
    ],
  },
  {
    _id: 'mock-cuanto-tiempo-toma-pagina-web',
    title: '¿Cuánto tiempo toma hacer una página web? Plazos reales',
    seoTitle: '¿Cuánto tiempo toma hacer una página web?',
    slug: { current: 'cuanto-tiempo-toma-hacer-una-pagina-web' },
    publishedAt: '2026-04-30',
    coverUrl: '/images/blog/cuanto-tiempo-toma-hacer-una-pagina-web-plazos-reales.webp',
    excerpt: 'Los plazos que ves en una cotización rara vez cuentan toda la historia. Esto es lo que realmente determina cuánto tarda un sitio en estar listo.',
    tags: ['Guía', 'WordPress', 'Proceso'],
    sections: [
      {
        heading: '',
        body: 'Una landing page simple puede estar lista en una semana. Una tienda online con catálogo grande puede tomar dos meses o más. La diferencia casi nunca es la velocidad de quien construye — es cuánto hay que definir antes de empezar a construir.',
      },
      {
        heading: 'Lo que realmente alarga un proyecto',
        body: 'Esperar contenido y fotos que no estaban listas, rondas de revisión que se estiran, o decisiones de diseño que cambian a mitad de camino suelen agregar más tiempo que el desarrollo en sí. El código se escribe rápido; las decisiones tardan.',
      },
      {
        heading: 'Plazos aproximados por tipo de sitio',
        body: 'Una landing page: 1 a 2 semanas. Un sitio corporativo de varias páginas: 3 a 5 semanas. Una tienda WooCommerce con catálogo mediano: 6 a 10 semanas, dependiendo de cuántos productos y qué integraciones necesite. Estos son rangos, no promesas — cada proyecto tiene sus propias variables.',
      },
      {
        heading: 'Cómo acortar el plazo sin apurar mal el proyecto',
        body: 'Tener el contenido (textos, fotos, logo) listo antes de empezar, definir de antemano quién aprueba cada etapa, y limitar las rondas de revisión a lo esencial son las formas más efectivas de acortar un proyecto sin sacrificar calidad.',
      },
      {
        heading: 'Una señal de alerta',
        body: 'Desconfiá de un plazo que suena demasiado corto para la complejidad del proyecto — generalmente significa que algo se va a saltar: pruebas, optimización, o contenido pensado con cuidado. Un plazo realista dicho de entrada ahorra sorpresas después.',
      },
    ],
  },
  {
    _id: 'mock-senales-pagina-web-pierde-clientes',
    title: 'Señales de que tu página web te está haciendo perder clientes',
    seoTitle: 'Señales de que tu web te hace perder clientes',
    slug: { current: 'senales-de-que-tu-pagina-web-pierde-clientes' },
    publishedAt: '2026-04-16',
    coverUrl: '/images/blog/senales-de-que-tu-pagina-web-te-esta-haciendo-perder-clientes.webp',
    excerpt: 'Muchas páginas web pierden clientes en silencio, sin quejas ni reclamos visibles. Estas son las señales más comunes de que la tuya podría estar entre ellas.',
    tags: ['Guía', 'Conversión', 'UX'],
    sections: [
      {
        heading: '',
        body: 'Nadie te va a escribir para avisarte que se fue de tu sitio sin contactarte. Esa pérdida pasa en silencio, y las señales suelen estar a la vista si sabés dónde mirar.',
      },
      {
        heading: 'Tarda más de 3 segundos en cargar',
        body: 'Cada segundo extra de carga aumenta la probabilidad de que alguien se vaya antes de ver tu contenido. Si tu sitio se siente lento en el celular con datos móviles, probablemente ya estás perdiendo visitas que ni siquiera aparecen en tus métricas de contacto.',
      },
      {
        heading: 'No queda claro qué hacer al entrar',
        body: 'Si un visitante nuevo tarda más de unos segundos en entender qué ofrecés y qué se supone que haga después, gran parte se va sin actuar. Un mensaje claro y un botón de acción visible valen más que un diseño elaborado.',
      },
      {
        heading: 'El formulario de contacto es la única forma de escribirte',
        body: 'No todos quieren llenar un formulario para hacer una pregunta simple. Un WhatsApp visible, un correo directo o un botón de llamada reducen la fricción para quien está listo para conversar ahora, no después.',
      },
      {
        heading: 'No se ve bien en el celular',
        body: 'La mayoría de tus visitantes llegan desde el celular. Si el sitio se ve "aceptable" pero no fue pensado para esa pantalla — textos chicos, botones difíciles de tocar, imágenes que tardan — estás perdiendo conversiones de forma silenciosa.',
      },
      {
        heading: 'No transmite quién está detrás',
        body: 'Sin fotos reales, sin casos concretos y sin ninguna señal de que hay una persona o empresa real detrás, un sitio genera dudas en vez de confianza — incluso si el diseño es lindo. La confianza se construye con evidencia, no solo con estética.',
      },
    ],
  },
  {
    _id: 'mock-seo-tecnico-wordpress-basico',
    title: 'SEO técnico para WordPress: lo básico que todo sitio necesita',
    seoTitle: 'SEO técnico para WordPress: lo básico',
    slug: { current: 'seo-tecnico-para-wordpress-lo-basico' },
    publishedAt: '2026-04-02',
    coverUrl: '/images/blog/seo-tecnico-para-wordpress-lo-basico-que-todo-sitio-necesita.webp',
    excerpt: 'Antes de pensar en estrategias avanzadas de SEO, hay una base técnica que todo sitio en WordPress necesita tener resuelta. Esto es lo esencial.',
    tags: ['SEO', 'WordPress', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'El SEO técnico no es la parte más vistosa del posicionamiento, pero es la base sobre la que todo lo demás funciona. Un sitio con buen contenido pero mala base técnica compite en desventaja frente a uno más simple pero bien resuelto.',
      },
      {
        heading: 'Velocidad de carga',
        body: 'Google usa Core Web Vitals (LCP, INP, CLS) como señal de ranking. Imágenes optimizadas, buen hosting y un tema liviano importan más para el SEO técnico que cualquier plugin de "SEO todo en uno" mal configurado.',
      },
      {
        heading: 'Indexación y estructura',
        body: 'Un sitemap XML actualizado, un robots.txt que no bloquee por error páginas importantes, y URLs limpias y descriptivas son la base para que Google encuentre e indexe correctamente cada página del sitio.',
      },
      {
        heading: 'Datos estructurados (Schema)',
        body: 'Marcar tu sitio con Schema.org (Organization, Article, Product, FAQ) ayuda a los buscadores a entender de qué trata cada página, y puede desbloquear resultados enriquecidos en Google — desde estrellas de reseña hasta preguntas frecuentes desplegadas directamente en el resultado de búsqueda.',
      },
      {
        heading: 'Mobile-first, de verdad',
        body: 'Google indexa principalmente la versión móvil de tu sitio. Un tema "responsive" que solo reacomoda elementos no es lo mismo que un sitio pensado mobile-first, con jerarquía visual y velocidad optimizadas para esa pantalla primero.',
      },
      {
        heading: 'Lo que no resuelve un plugin',
        body: 'Los plugins de SEO ayudan a completar metadatos, pero no arreglan un hosting lento, un tema mal codificado o contenido débil. El SEO técnico es tanto trabajo de desarrollo como de configuración — y por eso conviene resolverlo con quien entienda ambos lados.',
      },
    ],
  },
  {
    _id: 'mock-rediseno-web-cuando-conviene',
    title: 'Rediseño web: cuándo conviene y qué esperar del proceso',
    seoTitle: 'Rediseño web: cuándo conviene y qué esperar',
    slug: { current: 'rediseno-web-cuando-conviene-y-que-esperar' },
    publishedAt: '2026-03-19',
    coverUrl: '/images/blog/rediseno-web-cuando-conviene-y-que-esperar-del-proceso.webp',
    excerpt: 'No todo sitio que "se ve viejo" necesita rediseño, y no todo rediseño resuelve el problema de fondo. Esto es lo que conviene evaluar antes de empezar de nuevo.',
    tags: ['Guía', 'Rediseño', 'UX'],
    sections: [
      {
        heading: '',
        body: 'Rediseñar un sitio por estética suele ser la razón equivocada. Vale la pena rediseñar cuando el sitio actual frena el negocio — no solo cuando ya no gusta cómo se ve.',
      },
      {
        heading: 'Señales de que sí conviene',
        body: 'El sitio no se ve bien en el celular, tarda demasiado en cargar, no refleja los servicios o productos actuales, o simplemente no genera consultas a pesar del tráfico que recibe. Estos son problemas estructurales que un ajuste visual menor no resuelve.',
      },
      {
        heading: 'Cuando el problema no es el diseño',
        body: 'A veces el sitio se ve bien pero no convierte porque el mensaje no es claro, no hay un llamado a la acción visible, o el tráfico que llega no es el público correcto. Rediseñar sin resolver eso significa gastar en un sitio nuevo que repite el mismo problema con otro color.',
      },
      {
        heading: 'Qué conviene conservar',
        body: 'Un rediseño no tiene por qué empezar de cero. El contenido que ya posiciona bien en Google, las URLs que ya tienen autoridad acumulada, y cualquier integración que funciona bien deberían mantenerse — tirar todo y reconstruir desde cero suele costar posiciones de SEO ganadas con tiempo.',
      },
      {
        heading: 'Qué esperar del proceso',
        body: 'Un rediseño serio empieza con una auditoría del sitio actual (qué funciona, qué no, qué mueve tráfico), sigue con una propuesta de arquitectura y diseño, y solo después con desarrollo. Saltarse la auditoría inicial es la forma más común de repetir los mismos errores con una capa nueva de pintura.',
      },
    ],
  },
  {
    _id: 'mock-mantenimiento-wordpress-que-incluye',
    title: 'Mantenimiento web WordPress: qué incluye y cuánto deberías pagar',
    seoTitle: 'Mantenimiento WordPress: qué incluye y cuánto cuesta',
    slug: { current: 'mantenimiento-wordpress-que-incluye-y-cuanto-cuesta' },
    publishedAt: '2026-08-07',
    coverUrl: '/images/blog/mantenimiento-wordpress-que-incluye-y-cuanto-cuesta.webp',
    excerpt: 'Un sitio en WordPress no se termina el día que se publica. Esto es lo que un mantenimiento serio debería cubrir, y por qué saltárselo suele salir más caro.',
    tags: ['WordPress', 'Mantenimiento', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'WordPress es un software, no un objeto terminado — el núcleo, el tema y cada plugin reciben actualizaciones, y algunas corrigen vulnerabilidades de seguridad reales. Un sitio publicado y nunca más tocado es, con el tiempo, un sitio expuesto. El mantenimiento no es un gasto extra: es la parte del servicio que sigue después del lanzamiento.',
      },
      {
        heading: 'Qué debería incluir un mantenimiento serio',
        body: 'Actualizaciones de núcleo, tema y plugins probadas antes de aplicarse (no solo un clic automático), backups periódicos guardados fuera del propio hosting, monitoreo de que el sitio esté online, y un canal para resolver algo si se rompe. Sin esto, "mantenimiento" es solo una palabra en una cotización.',
      },
      {
        heading: 'Lo que pasa si no se hace',
        body: 'Plugins desactualizados son la puerta de entrada más común para sitios hackeados en WordPress. Y no siempre se nota de inmediato: a veces el sitio sigue funcionando mientras inyecta contenido malicioso invisible que Google penaliza en el ranking antes de que el dueño se entere.',
      },
      {
        heading: 'Actualizar no es solo hacer clic en "actualizar"',
        body: 'Una actualización de plugin puede romper algo que dependía de su versión anterior. Actualizar bien implica probar en un entorno de staging antes de aplicar el cambio al sitio real, o al menos tener un backup reciente para revertir si algo falla. Actualizar a ciegas en producción es la forma más común de "arreglar" un sitio y dejarlo peor.',
      },
      {
        heading: 'Cuánto cuesta',
        body: 'El rango varía mucho según el tamaño del sitio y qué tan crítico es que nunca esté caído — un blog simple no necesita el mismo nivel de vigilancia que una tienda que factura todos los días. Lo importante no es encontrar el precio más bajo, sino entender exactamente qué cubre esa mensualidad y qué pasa el día que algo falla.',
      },
      {
        heading: 'Cómo evaluar si tu mantenimiento actual sirve',
        body: 'Preguntá cuándo fue el último backup verificado (no solo generado), cuándo se actualizó el sitio por última vez, y qué pasaría si el sitio cayera hoy: ¿alguien se entera antes que un cliente? Si no hay respuestas claras, probablemente no hay mantenimiento real, aunque se esté pagando por él.',
      },
    ],
  },
  {
    _id: 'mock-como-migrar-a-woocommerce',
    title: 'Cómo migrar tu tienda a WooCommerce sin perder ventas ni SEO',
    seoTitle: 'Cómo migrar tu tienda a WooCommerce sin perder SEO',
    slug: { current: 'como-migrar-tu-tienda-a-woocommerce-sin-perder-seo' },
    publishedAt: '2026-08-06',
    coverUrl: '/images/blog/como-migrar-tu-tienda-a-woocommerce-sin-perder-seo.webp',
    excerpt: 'Cambiar de plataforma es una decisión con riesgo real: mal hecha, puede costar posiciones en Google y ventas durante semanas. Así se migra sin perder lo que ya funciona.',
    tags: ['WooCommerce', 'E-commerce', 'SEO', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Migrar una tienda de plataforma no es solo copiar productos de un lado a otro. Cada URL, cada ficha indexada en Google y cada integración con la que ya contás son cosas que se pueden perder si la migración se hace sin plan. Bien ejecutada, una migración a WooCommerce puede pasar casi desapercibida para tus clientes.',
      },
      {
        heading: 'Antes de mover nada: auditá lo que tenés',
        body: 'Exportá el catálogo completo (productos, variantes, precios, imágenes, descripciones), y hacé una lista de qué URLs están indexadas en Google Search Console y cuáles reciben tráfico real. Esa lista es la que después vas a usar para no perder ni una posición ganada.',
      },
      {
        heading: 'El paso que más gente se salta: los redirects',
        body: 'Si las URLs de la tienda nueva no coinciden con las anteriores, cada producto necesita un redirect 301 de la URL vieja a la nueva. Sin esto, Google encuentra páginas caídas donde antes había fichas indexadas, y esa autoridad acumulada durante meses o años se pierde de un día para otro.',
      },
      {
        heading: 'Migrar el catálogo sin perder datos',
        body: 'WooCommerce tiene herramientas de importación que aceptan CSV con productos, variantes e inventario, y hay plugins específicos para migrar desde Shopify, PrestaShop u otras plataformas conservando SKUs e imágenes. Migrar producto por producto a mano solo tiene sentido si el catálogo es muy chico.',
      },
      {
        heading: 'Probar antes de apagar la tienda vieja',
        body: 'La tienda nueva debería estar completa y probada — checkout, pasarela de pago, cálculo de envío, emails de confirmación — antes de apagar la anterior. Correr ambas en paralelo por unos días, con la nueva en un dominio de pruebas, evita el escenario de quedarte sin tienda funcionando durante la transición.',
      },
      {
        heading: 'Después de migrar',
        body: 'Monitoreá Search Console las semanas siguientes para detectar errores de indexación o caídas de tráfico temprano, y confirmá que las integraciones que tenías (email marketing, contabilidad, pasarela de pago) sigan funcionando en el nuevo entorno. Una migración no termina cuando el sitio nuevo está online — termina cuando confirmás que nada se rompió.',
      },
    ],
  },
  {
    _id: 'mock-plugins-esenciales-wordpress',
    title: 'Plugins esenciales de WordPress para un sitio profesional (y cuáles evitar)',
    seoTitle: 'Plugins esenciales de WordPress (y cuáles evitar)',
    slug: { current: 'plugins-esenciales-de-wordpress-y-cuales-evitar' },
    publishedAt: '2026-08-05',
    coverUrl: '/images/blog/plugins-esenciales-de-wordpress-y-cuales-evitar.webp',
    excerpt: 'No todos los plugins que promete resolver algo lo resuelven bien. Estos son los que realmente valen la pena en un sitio profesional, y las señales de los que conviene evitar.',
    tags: ['WordPress', 'Plugins', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Cada plugin instalado es código extra corriendo en tu sitio: suma funcionalidad, pero también suma peso, superficie de ataque y una actualización más que mantener al día. La pregunta no es cuántos plugins tener, sino cuáles realmente ganan su lugar.',
      },
      {
        heading: 'Los que sí valen la pena',
        body: 'Un plugin de SEO (Yoast o Rank Math) para manejar metadatos y sitemap, uno de caché para velocidad, uno de seguridad para protección básica contra fuerza bruta, y un plugin de backups que guarde copias fuera del propio hosting. Cuatro categorías cubren la mayoría de lo esencial — el resto depende del proyecto.',
      },
      {
        heading: 'Señales de un plugin problemático',
        body: 'Sin actualizaciones hace más de un año, pocas instalaciones activas, reseñas recientes con quejas de errores, o un desarrollador que no responde soporte. Un plugin abandonado es un riesgo de seguridad que crece con el tiempo, aunque hoy funcione sin problemas aparentes.',
      },
      {
        heading: 'El error de "un plugin para cada cosa"',
        body: 'Instalar un plugin distinto para cada función chica (uno para popups, otro para formularios, otro para redes sociales) suma peso y puntos de falla que se podrían resolver con un plugin más completo o directamente con código. Cada plugin de más es una actualización más que puede romper algo.',
      },
      {
        heading: 'Plugins todo-en-uno: la trampa de la comodidad',
        body: 'Los plugins que prometen resolver SEO, velocidad, seguridad y formularios en uno solo suenan convenientes, pero suelen hacer cada cosa peor que un plugin especializado, y si falla, falla en varios frentes a la vez. Mejor pocos plugins buenos en su categoría que uno que promete todo.',
      },
      {
        heading: 'Cómo mantenerlos sanos',
        body: 'Revisá periódicamente qué plugins están instalados y desactivá (y eliminá) los que ya no se usan — un plugin desactivado sigue siendo código vulnerable si nunca se actualiza. Menos plugins activos significa menos superficie de ataque y menos cosas que pueden romperse con la próxima actualización de WordPress.',
      },
    ],
  },
  {
    _id: 'mock-proceso-crear-pagina-web-paso-a-paso',
    title: 'Cómo es el proceso de crear una página web, paso a paso',
    seoTitle: 'El proceso de crear una página web, paso a paso',
    slug: { current: 'como-es-el-proceso-de-crear-una-pagina-web-paso-a-paso' },
    publishedAt: '2026-08-04',
    coverUrl: '/images/blog/como-es-el-proceso-de-crear-una-pagina-web-paso-a-paso.webp',
    excerpt: 'Saber qué esperar en cada etapa reduce la incertidumbre de encargar un sitio web. Este es el proceso real, desde la primera reunión hasta el soporte después del lanzamiento.',
    tags: ['Guía', 'Proceso', 'WordPress'],
    sections: [
      {
        heading: '',
        body: 'Encargar una página web se siente menos riesgoso cuando sabés qué esperar en cada etapa. Este es el proceso, de principio a fin, tal como debería verse con quien lo hace en serio.',
      },
      {
        heading: '1. Reunión inicial',
        body: 'Una conversación de 30 minutos para entender el negocio, el objetivo del sitio y qué problema tiene que resolver — no para hablar de colores todavía. Esta etapa define si el proyecto tiene sentido antes de invertir tiempo en una propuesta.',
      },
      {
        heading: '2. Propuesta',
        body: 'Con lo conversado, se arma una propuesta concreta: alcance, páginas, funcionalidades, plazos y precio. Una propuesta seria detalla qué incluye y qué no, para que no haya sorpresas después de aceptarla.',
      },
      {
        heading: '3. Diseño',
        body: 'Se define la arquitectura de información (qué páginas y en qué orden) y el diseño visual, generalmente con una etapa de revisión antes de pasar a desarrollo. Cambiar el diseño acá es rápido; cambiarlo después de construido, no.',
      },
      {
        heading: '4. Desarrollo',
        body: 'El diseño aprobado se convierte en un sitio funcional: WordPress, el tema o builder elegido, WooCommerce si hay tienda, formularios, integraciones. Es la etapa que más tiempo toma y la que menos debería sorprender, si las anteriores estuvieron bien definidas.',
      },
      {
        heading: '5. Revisión y ajustes',
        body: 'El cliente prueba el sitio antes de publicarlo: contenido, funcionamiento en celular, formularios, velocidad. Acotar esta etapa a rondas definidas de antemano evita que se estire indefinidamente.',
      },
      {
        heading: '6. Publicación',
        body: 'El sitio pasa a producción: dominio, hosting, certificado SSL, y las verificaciones finales antes de que quede visible al público. Una buena publicación incluye probar que todo funcione en el entorno real, no solo en el de pruebas.',
      },
      {
        heading: '7. Soporte',
        body: 'El trabajo no termina el día del lanzamiento. Un buen proceso deja claro quién responde si algo falla después, y qué cubre ese soporte — esa claridad es la que reduce el riesgo percibido de encargar un sitio nuevo.',
      },
    ],
  },
  {
    _id: 'mock-wordpress-lento-causas-y-solucion',
    title: 'WordPress lento: causas comunes y cómo solucionarlo',
    seoTitle: 'WordPress lento: causas comunes y cómo solucionarlo',
    slug: { current: 'wordpress-lento-causas-comunes-y-como-solucionarlo' },
    publishedAt: '2026-08-03',
    coverUrl: '/images/blog/wordpress-lento-causas-comunes-y-como-solucionarlo.webp',
    excerpt: 'Un sitio lento pierde visitas y posiciones en Google en silencio. Estas son las causas más comunes de lentitud en WordPress, en el orden en que conviene revisarlas.',
    tags: ['WordPress', 'Performance', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Un WordPress lento casi nunca tiene una sola causa — es la suma de varias decisiones chicas: un hosting insuficiente, imágenes sin optimizar, demasiados plugins. La buena noticia es que la mayoría de las causas comunes tienen solución sin reconstruir el sitio desde cero.',
      },
      {
        heading: 'Hosting insuficiente para el tráfico real',
        body: 'Un hosting compartido barato puede andar bien con poco tráfico y volverse el cuello de botella apenas el sitio crece. Si el sitio se siente lento incluso con caché y optimización aplicada, el hosting suele ser la causa raíz, no el síntoma.',
      },
      {
        heading: 'Imágenes sin optimizar',
        body: 'Es la causa más común y la más fácil de resolver: imágenes pesadas, sin comprimir, sin formatos modernos (WebP o AVIF) y sin dimensiones definidas suman segundos de carga innecesarios. Comprimir y servir el tamaño correcto para cada pantalla suele ser la mejora de mayor impacto por menor esfuerzo.',
      },
      {
        heading: 'Demasiados plugins, o plugins mal hechos',
        body: 'Cada plugin activo carga su propio código en cada visita, aunque solo se use en una sección del sitio. Un plugin mal optimizado puede pesar más que varios buenos juntos — el número de plugins importa menos que la calidad de cada uno.',
      },
      {
        heading: 'Sin caché configurada',
        body: 'Sin un plugin de caché, WordPress reconstruye cada página desde la base de datos en cada visita, en vez de servir una versión ya generada. Configurar caché es de las mejoras más baratas de aplicar en relación al impacto que tiene en velocidad.',
      },
      {
        heading: 'Un tema pesado o mal codificado',
        body: 'Algunos temas cargan estilos y scripts para funciones que el sitio ni siquiera usa. Un tema liviano, bien codificado, suele rendir mejor que uno cargado de opciones aunque el diseño final se vea parecido.',
      },
      {
        heading: 'Por dónde empezar',
        body: 'Corré una prueba de velocidad (PageSpeed Insights o GTmetrix) para ver qué recomienda específicamente en tu caso, y priorizá imágenes y caché antes de pensar en cambiar de hosting o de tema — son los cambios más rápidos de aplicar y suelen dar la mejora más visible primero.',
      },
    ],
  },
]
