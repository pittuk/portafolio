import type { Post } from '@/types'

export const MOCK_POSTS: Post[] = [
  {
    _id: 'mock-cuanto-cuesta-pagina-web',
    title: '¿Cuánto cuesta una página web en Chile? Guía de precios',
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
]
