import type { Post } from '@/types'

export const MOCK_POSTS: Post[] = [
  {
    _id: 'mock-cuanto-cuesta-pagina-web',
    title: '¿Cuánto cuesta una página web en Chile? Guía de precios',
    seoTitle: '¿Cuánto cuesta una página web en Chile?',
    slug: { current: 'cuanto-cuesta-una-pagina-web-en-chile' },
    publishedAt: '2026-07-20',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/cuanto-cuesta-una-pagina-web-en-chile-guia-de-precios.webp',
    excerpt: 'El precio de una página web en Chile depende de lo que realmente necesitás. Qué factores mueven el precio y qué preguntar antes de cotizar.',
    tags: ['Precios', 'WordPress', 'Guía'],
    sections: [
      {
        heading: '',
        body: '"¿Cuánto cuesta una página web?" no tiene una respuesta única: depende de lo que estés construyendo. Una landing page simple y una tienda online con cientos de productos no cuestan lo mismo, ni deberían. Esta guía explica qué factores mueven realmente el precio de un sitio web en Chile, qué costos aparecen después del lanzamiento y qué preguntar para comparar cotizaciones con criterio, en vez de comparar números sueltos.',
      },
      {
        heading: 'Respuesta corta',
        body: 'El precio de una página web depende de cinco cosas: el tipo de sitio (landing, corporativo o tienda online), la cantidad de páginas, si el diseño es a medida o sobre plantilla, las funcionalidades que necesita (pagos, reservas, integraciones) y quién lo construye. A eso se suman costos recurrentes que casi nadie cotiza al inicio: dominio, hosting y mantenimiento. Una cotización seria detalla todo eso; una que es solo un número, no.',
      },
      {
        heading: 'Los tres tipos de sitio y qué los diferencia',
        body: 'Una landing page es una sola página con un objetivo, como captar contactos para un servicio o una campaña. Es lo más rápido y económico de construir. Un sitio corporativo tiene varias secciones (servicios, empresa, proyectos, contacto) y suma trabajo de arquitectura de información y contenido. Una tienda online con WooCommerce suma catálogo, pasarela de pago, envíos y muchas más pruebas antes de publicar. El precio escala con la complejidad real del proyecto, no con el tamaño de la empresa que lo pide.',
        table: {
          head: ['Tipo de sitio', 'Para qué sirve', 'Plazo típico', 'Qué más pesa en el precio'],
          rows: [
            ['Landing page', 'Un objetivo: captar contactos o vender un servicio puntual', '1 a 2 semanas', 'Calidad del texto y del diseño de conversión'],
            ['Sitio corporativo', 'Presentar la empresa y generar consultas desde Google', '3 a 5 semanas', 'Número de páginas, diseño a medida, contenido'],
            ['Tienda WooCommerce', 'Vender online con pago y despacho', '6 a 10 semanas', 'Tamaño del catálogo, pasarela, envíos e integraciones'],
          ],
        },
      },
      {
        heading: 'Qué mueve realmente el precio',
        body: 'Primero, el diseño: una plantilla adaptada cuesta menos que un diseño a medida, pero también se parece a miles de otros sitios. Segundo, las funcionalidades: cada integración (pasarela de pago, sistema de reservas, CRM, facturación electrónica, multi-idioma) suma horas de desarrollo y de pruebas. Tercero, el contenido: si hay que escribir los textos, producir fotos o cargar cientos de productos, eso es trabajo aparte. Cuarto, el rendimiento y el SEO técnico: un sitio pensado para cargar rápido y posicionar en Google requiere más cuidado que uno que solo "se ve bien". Dos sitios que se ven parecidos pueden costar muy distinto si uno está construido para crecer y el otro no.',
      },
      {
        heading: 'Lo que casi nadie cotiza (y después cuesta caro)',
        body: 'El dominio (.cl en NIC Chile o .com), el hosting, el certificado SSL, las licencias de plugins o temas premium, el mantenimiento mensual y los backups suelen quedar fuera de la cotización inicial y aparecen después como gastos sorpresa. Antes de aceptar una propuesta conviene preguntar explícitamente qué pasa después del lanzamiento: quién actualiza el sitio, quién responde si algo se rompe y qué cubre el precio más allá de la entrega.',
        table: {
          head: ['Costo', 'Frecuencia', 'Qué preguntar'],
          rows: [
            ['Dominio', 'Anual', '¿Queda registrado a nombre de mi empresa?'],
            ['Hosting', 'Mensual o anual', '¿Cuál es el precio de renovación, no solo el del primer año?'],
            ['Licencias premium', 'Anual', '¿Qué plugins o temas de pago usa el sitio y quién los renueva?'],
            ['Mantenimiento', 'Mensual', '¿Incluye actualizaciones, backups y soporte ante caídas?'],
          ],
        },
      },
      {
        heading: 'Freelancer o agencia',
        body: 'Una agencia suma estructura y varios especialistas, pero también intermediarios entre vos y quien realmente hace el trabajo, y ese costo de coordinación se refleja en el precio. Un freelancer con experiencia real en diseño, desarrollo y SEO técnico puede ofrecer trato directo y cambios más rápidos, a cambio de depender de una sola persona. Ninguna opción es mejor en abstracto: depende de la complejidad del proyecto y de cuánto valorás hablar directo con quien construye tu sitio.',
      },
      {
        heading: 'Cómo comparar cotizaciones sin equivocarte',
        body: 'Pedí que cada cotización detalle: número de páginas, si el diseño es a medida o plantilla, cuántas rondas de revisión incluye, si incluye carga de contenido, capacitación, plazos de entrega y qué queda fuera (hosting, textos, fotografía). Compará ítem por ítem, no el total. Si una cotización es mucho más barata que el resto, casi siempre es porque algo de esa lista no está incluido.',
      },
      {
        heading: 'Señales de alerta',
        body: 'Desconfiá de una cotización que no detalla qué incluye, de un plazo demasiado corto para el alcance, de un proveedor que registra el dominio a su nombre o que no te entrega los accesos de administrador, y de quien no puede mostrar sitios reales construidos por él. Un sitio web es un activo de tu empresa: tiene que quedar a tu nombre y bajo tu control.',
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
    excerpt: 'Los dos page builders más usados en WordPress, comparados desde la experiencia real de construir sitios con ambos. Cuál conviene según tu proyecto.',
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
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/woocommerce-o-shopify-cual-conviene-para-tu-tienda-online.webp',
    excerpt: 'Control total con más responsabilidad, o simplicidad con menos personalización. Qué estás comprando realmente al elegir la plataforma de tu tienda.',
    tags: ['E-commerce', 'WooCommerce', 'Shopify', 'Comparativa'],
    sections: [
      {
        heading: '',
        body: 'La pregunta no es cuál plataforma es "mejor" en abstracto, sino qué trade-off le conviene a tu negocio: control total con más responsabilidad encima, o simplicidad a cambio de menos margen de personalización. Después de construir más de 47 tiendas WooCommerce, esta es la comparación honesta, con lo que pesa especialmente cuando vendés en Chile.',
      },
      {
        heading: 'Respuesta corta',
        body: 'WooCommerce conviene si querés control total, combinar la tienda con contenido para posicionar en Google, o ya tenés un sitio en WordPress. Shopify conviene si querés lanzar rápido, tu equipo no es técnico y preferís pagar una mensualidad para no pensar en hosting ni actualizaciones. En Chile hay un factor extra: la integración con pasarelas y medios de pago locales.',
      },
      {
        heading: 'Cómo funciona cada una',
        body: 'WooCommerce es un plugin gratuito que corre sobre WordPress: la tienda vive en tu propio hosting y vos (o quien mantenga el sitio) son responsables de actualizaciones, seguridad y backups. Shopify es un servicio por suscripción: la plataforma aloja y mantiene la tienda, y pagás una mensualidad por eso.',
        table: {
          head: ['Criterio', 'WooCommerce', 'Shopify'],
          rows: [
            ['Modelo', 'Plugin gratuito sobre WordPress, en tu hosting', 'Suscripción mensual, alojado por Shopify'],
            ['Control del código', 'Total', 'Limitado a temas y apps de su ecosistema'],
            ['Mantenimiento', 'A tu cargo o de quien contrates', 'Incluido en la plataforma'],
            ['Contenido y SEO', 'WordPress completo: blog, páginas, plugins SEO', 'Blog básico, menos flexible'],
            ['Pasarelas chilenas', 'Plugins para Webpay, Mercado Pago, Flow, Khipu', 'Vía apps de terceros, con comisión adicional de la plataforma'],
            ['Velocidad de lanzamiento', 'Más configuración inicial', 'Más rápido para empezar'],
          ],
        },
      },
      {
        heading: 'Costos: qué se paga en cada una',
        body: 'Con WooCommerce no hay mensualidad de plataforma ni comisión por venta de la plataforma, pero sí pagás hosting, mantenimiento y, a veces, plugins premium; costos que controlás directamente y podés ajustar. Con Shopify pagás una mensualidad que sube con el plan, y si no usás su sistema de pagos propio (Shopify Payments, que no opera en Chile) la plataforma cobra una comisión adicional por cada venta procesada con una pasarela externa, que se suma a la comisión de la pasarela. En tiendas con mucho volumen, esa diferencia pesa.',
      },
      {
        heading: 'Personalización y control',
        body: 'WooCommerce te da acceso al código: prácticamente cualquier funcionalidad es posible con desarrollo a medida, desde fichas de producto con especificaciones técnicas hasta integraciones con sistemas de inventario o facturación. Shopify es más cerrado: lo que no ofrece un tema o una app requiere developers que conozcan Liquid, su lenguaje de plantillas. A cambio, la experiencia lista para usar de Shopify es muy pulida.',
      },
      {
        heading: 'Contenido y posicionamiento en Google',
        body: 'Si tu estrategia incluye atraer clientes desde Google con guías, comparativas y páginas de categoría bien trabajadas, WooCommerce tiene ventaja: vive dentro de WordPress, el CMS más usado para contenido, con control fino sobre URLs, metadatos, datos estructurados y velocidad. Shopify cubre lo básico de SEO, pero con menos flexibilidad en la estructura de URLs y el contenido.',
      },
      {
        heading: 'Mantenimiento y seguridad',
        body: 'En WooCommerce, mantener la tienda actualizada y segura es responsabilidad tuya o de quien contrates. Bien hecho, implica actualizaciones probadas, backups fuera del hosting y monitoreo. En Shopify, la plataforma se encarga: es menos de qué preocuparte, pero también menos margen de acción si algo específico falla.',
      },
      {
        heading: 'Cuál elegiría según el caso',
        body: 'Elegí WooCommerce si ya tenés un sitio en WordPress, si tu catálogo tiene especificaciones o reglas complejas, si el contenido y el SEO son parte importante de cómo conseguís clientes, o si querés evitar comisiones de plataforma. Elegí Shopify si necesitás lanzar en pocos días, no tenés a nadie técnico y valorás que todo esté incluido en una mensualidad. Y si ya vendés en una y te queda chica, migrar es posible sin perder posiciones en Google, con un plan de redirecciones.',
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
    excerpt: 'Lo que frena las ventas de una tienda online rara vez es el diseño: son decisiones tomadas (o salteadas) antes de lanzar. Los errores más comunes.',
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
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/mantenimiento-wordpress-que-incluye-y-cuanto-cuesta.webp',
    excerpt: 'Un sitio en WordPress no se termina el día que se publica. Esto es lo que un mantenimiento serio debería cubrir, y por qué saltárselo suele salir más caro.',
    tags: ['WordPress', 'Mantenimiento', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'WordPress es un software, no un objeto terminado: el núcleo, el tema y cada plugin reciben actualizaciones, y algunas corrigen vulnerabilidades de seguridad reales. Un sitio publicado y nunca más tocado es, con el tiempo, un sitio expuesto. Esta guía explica qué debería incluir un mantenimiento serio, con qué frecuencia y cómo saber si el que pagás hoy realmente funciona.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Un mantenimiento WordPress serio incluye cuatro cosas: actualizaciones probadas de núcleo, tema y plugins; backups automáticos guardados fuera del hosting; monitoreo de disponibilidad y seguridad; y alguien que responda y resuelva cuando algo falla. Si falta cualquiera de las cuatro, el sitio queda expuesto aunque se esté pagando por mantenerlo.',
      },
      {
        heading: 'Qué se hace y cada cuánto',
        body: 'El mantenimiento no es una tarea única, sino una rutina. Esta es una frecuencia razonable para un sitio corporativo o una tienda pequeña; una tienda con muchas ventas diarias necesita backups y monitoreo más frecuentes.',
        table: {
          head: ['Tarea', 'Frecuencia', 'Por qué importa'],
          rows: [
            ['Monitoreo de disponibilidad', 'Continuo', 'Detectar una caída antes que tus clientes'],
            ['Backup completo (archivos y base de datos)', 'Diario o semanal, según cuánto cambie el sitio', 'Poder volver atrás si algo se rompe o te hackean'],
            ['Actualizaciones de plugins y tema', 'Semanal o quincenal, probadas', 'Cerrar vulnerabilidades conocidas'],
            ['Actualización del núcleo de WordPress', 'Cuando sale una versión, tras verificar compatibilidad', 'Seguridad y compatibilidad'],
            ['Escaneo de seguridad', 'Semanal', 'Encontrar código malicioso que no se ve a simple vista'],
            ['Revisión de velocidad y errores', 'Mensual', 'Evitar que el sitio se ponga lento de a poco'],
            ['Prueba de restauración de backup', 'Trimestral', 'Un backup que nunca se probó puede no servir'],
          ],
        },
      },
      {
        heading: 'Lo que pasa si no se hace',
        body: 'Los plugins desactualizados son la puerta de entrada más común para sitios hackeados en WordPress. Y no siempre se nota de inmediato: a veces el sitio sigue funcionando mientras inyecta contenido malicioso o enlaces a sitios de spam que no ves, pero que Google detecta. El resultado puede ser una advertencia de "sitio peligroso" en el navegador, la caída en el ranking o el bloqueo del hosting. Limpiar un sitio comprometido y recuperar las posiciones perdidas cuesta bastante más que mantenerlo.',
      },
      {
        heading: 'Actualizar no es solo hacer clic en "actualizar"',
        body: 'Una actualización de plugin puede romper algo que dependía de su versión anterior: un formulario que deja de enviar, un checkout que falla, un diseño que se desarma. Actualizar bien implica tener un backup reciente antes de cada cambio, probar en un entorno de staging cuando el sitio es crítico, y revisar después que lo importante siga funcionando. Actualizar a ciegas en producción es la forma más común de "arreglar" un sitio y dejarlo peor.',
      },
      {
        heading: 'Qué no suele incluir',
        body: 'Un mantenimiento cubre que el sitio funcione, esté seguro y al día. Los rediseños, secciones nuevas, funcionalidades a medida o campañas suelen cotizarse aparte. Los cambios menores de texto e imágenes muchas veces sí están incluidos. Lo importante es que esté escrito: qué cubre la mensualidad, en cuánto tiempo responden ante una caída y qué se cobra por fuera.',
      },
      {
        heading: 'Cuánto deberías pagar',
        body: 'El valor depende del tamaño del sitio y de qué tan crítico es que nunca esté caído: un sitio informativo no necesita el mismo nivel de vigilancia que una tienda que factura todos los días. En vez de buscar el precio más bajo, compará qué tareas de la tabla anterior cubre cada propuesta y cuál es el tiempo de respuesta comprometido.',
      },
      {
        heading: 'Cómo evaluar si tu mantenimiento actual sirve',
        body: 'Preguntá tres cosas: cuándo fue el último backup y si alguna vez se probó restaurarlo; cuándo se actualizó el sitio por última vez y qué se revisó después; y qué pasaría si el sitio cayera hoy (¿alguien se entera antes que un cliente?). Si no hay respuestas claras, probablemente no hay mantenimiento real, aunque se esté pagando por él.',
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
    excerpt: 'Mal hecha, una migración cuesta posiciones en Google y ventas durante semanas. Cómo pasar tu tienda a WooCommerce sin perder lo que ya funciona.',
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
    excerpt: 'Qué plugins de WordPress valen la pena en un sitio profesional, y las señales de los que conviene evitar antes de que te rompan el sitio.',
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
    excerpt: 'Qué esperar en cada etapa de encargar un sitio web: el proceso real, desde la primera reunión hasta el soporte después del lanzamiento.',
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
    excerpt: 'Un sitio lento pierde visitas y posiciones en Google. Las causas más comunes de lentitud en WordPress, en el orden en que conviene revisarlas.',
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
  {
    _id: 'mock-pagina-web-vs-redes-sociales',
    title: '¿Página web o solo redes sociales? Lo que tu negocio realmente necesita',
    seoTitle: 'Página web o redes sociales: qué necesita tu negocio',
    slug: { current: 'pagina-web-o-redes-sociales-que-necesita-tu-negocio' },
    publishedAt: '2026-09-30',
    coverUrl: '/images/blog/pagina-web-o-redes-sociales-que-necesita-tu-negocio.webp',
    excerpt: 'Instagram y Facebook sirven para que te descubran, pero no son tuyos. Por qué depender solo de redes es un riesgo y qué rol cumple una web propia.',
    tags: ['Estrategia', 'Redes sociales', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Muchos negocios en Chile venden solo por Instagram o WhatsApp, y les funciona — hasta que deja de funcionar. Las redes sociales son un gran canal para que te descubran, pero son terreno arrendado: las reglas, el alcance y hasta tu cuenta dependen de una empresa que no sos vos.',
      },
      {
        heading: 'El problema de construir sobre terreno arrendado',
        body: 'El alcance orgánico de una publicación puede caer de un mes a otro por un cambio de algoritmo, y una cuenta suspendida o hackeada puede borrar años de seguidores en un día. Si todas tus ventas pasan por ahí, todo tu negocio depende de algo que no controlás.',
      },
      {
        heading: 'Lo que una página web hace y las redes no',
        body: 'Una web aparece cuando alguien busca en Google lo que vendés — gente con intención de compra, no alguien que pasaba scrolleando. Además da credibilidad (muchos clientes buscan el sitio antes de comprar), concentra la información en un solo lugar y te permite medir de dónde vienen tus clientes.',
      },
      {
        heading: 'No es una cosa o la otra',
        body: 'La estrategia que mejor funciona combina las dos: las redes generan atención y comunidad, y la web convierte esa atención en consultas o ventas. Cada publicación puede llevar a una página con toda la información, el catálogo o un formulario, en vez de depender de responder lo mismo por mensaje directo.',
      },
      {
        heading: 'Cuándo dar el paso',
        body: 'Si respondés las mismas preguntas una y otra vez por WhatsApp, si perdés ventas porque la gente no encuentra precios o catálogo, o si querés vender a clientes que no te siguen todavía, ya es momento. Una web simple y bien hecha suele pagarse sola con las consultas que antes se perdían.',
      },
    ],
  },
  {
    _id: 'mock-landing-page-o-sitio-web',
    title: 'Landing page o sitio web completo: cuál necesitás y cuándo',
    seoTitle: 'Landing page o sitio web completo: cuál necesitás',
    slug: { current: 'landing-page-o-sitio-web-completo' },
    publishedAt: '2026-09-29',
    coverUrl: '/images/blog/landing-page-o-sitio-web-completo.webp',
    excerpt: 'Una landing page y un sitio web resuelven problemas distintos. Cómo saber cuál conviene según tu objetivo, tu presupuesto y la etapa de tu negocio.',
    tags: ['Estrategia', 'Landing page', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Una landing page es una sola página con un solo objetivo: que el visitante haga una acción concreta, como dejar sus datos o comprar un producto. Un sitio web completo tiene varias secciones y sirve para presentar el negocio entero. Elegir mal no es grave, pero sí puede significar pagar por algo que no necesitás todavía, o quedarte corto.',
      },
      {
        heading: 'Cuándo conviene una landing page',
        body: 'Para lanzar un producto o servicio puntual, para campañas pagadas en Google o Meta, o para validar una idea antes de invertir en un sitio completo. Al tener un solo mensaje y un solo botón, suele convertir mejor que una página de inicio llena de opciones.',
      },
      {
        heading: 'Cuándo conviene un sitio web completo',
        body: 'Si ofrecés varios servicios, si querés aparecer en Google para distintas búsquedas, o si tu negocio necesita mostrar trayectoria, proyectos y equipo para generar confianza. Cada página de servicio es una puerta de entrada más desde los buscadores, algo que una sola landing no puede cubrir.',
      },
      {
        heading: 'La diferencia en SEO',
        body: 'Una landing apunta a una búsqueda principal; un sitio con varias páginas y un blog puede posicionarse para decenas. Si la estrategia depende de tráfico orgánico a largo plazo, el sitio completo gana. Si depende de publicidad pagada a corto plazo, la landing suele ser suficiente.',
      },
      {
        heading: 'Empezar chico y crecer',
        body: 'Una opción sensata es partir con una landing bien hecha sobre WordPress y sumar páginas a medida que el negocio crece, sin rehacer todo. Lo importante es que la base técnica permita crecer: una landing hecha en una herramienta cerrada después obliga a empezar de cero.',
      },
    ],
  },
  {
    _id: 'mock-pasarelas-de-pago-chile-woocommerce',
    title: 'Pasarelas de pago en Chile para WooCommerce: Webpay, Mercado Pago, Flow y más',
    seoTitle: 'Pasarelas de pago en Chile para WooCommerce',
    slug: { current: 'pasarelas-de-pago-en-chile-para-woocommerce' },
    publishedAt: '2026-09-28',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/pasarelas-de-pago-en-chile-para-woocommerce.webp',
    excerpt: 'Webpay, Mercado Pago, Flow y Khipu comparadas: comisiones, plazos de abono y medios de pago para elegir la pasarela de tu tienda en Chile.',
    tags: ['WooCommerce', 'E-commerce', 'Chile', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'La pasarela de pago es la parte de la tienda donde se cierra la venta, y también donde más se pierden. Comisiones, plazos de abono y medios de pago aceptados varían entre proveedores, y conviene elegir con esa información en mano, no solo por costumbre. Esta guía compara las pasarelas más usadas en Chile para tiendas WooCommerce y explica cómo probarlas antes de lanzar.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Para la mayoría de las tiendas en Chile, la combinación que mejor funciona es una pasarela principal con tarjetas de débito y crédito (Webpay Plus o Mercado Pago) más una alternativa de transferencia (Khipu o transferencia manual). Webpay genera más confianza en el comprador chileno; Mercado Pago es más rápido de activar; Flow agrupa varios medios en una sola integración.',
      },
      {
        heading: 'Comparativa de pasarelas en Chile',
        body: 'Las condiciones comerciales exactas (comisiones y plazos de abono) cambian y dependen del plan y del volumen de cada comercio, así que conviene confirmarlas directamente con cada proveedor antes de decidir. Lo que sí se puede comparar de forma estable es qué ofrece cada una y para qué tipo de tienda conviene.',
        table: {
          head: ['Pasarela', 'Medios de pago', 'Activación', 'Conviene para'],
          rows: [
            ['Webpay Plus (Transbank)', 'Débito y crédito de todos los bancos chilenos', 'Afiliación comercial y validación técnica de la integración', 'Tiendas que quieren la opción más reconocida por el comprador chileno'],
            ['Mercado Pago', 'Tarjetas, saldo en cuenta, cuotas', 'Rápida, con cuenta de Mercado Pago', 'Empezar a vender pronto, sin contrato de afiliación complejo'],
            ['Flow', 'Webpay, transferencia y otros medios en una sola integración', 'Registro en Flow', 'Ofrecer varios medios sin integrar cada uno por separado'],
            ['Khipu', 'Transferencia bancaria automatizada', 'Registro en Khipu', 'Clientes que prefieren no usar tarjeta'],
            ['Transferencia manual', 'Transferencia con confirmación manual', 'Inmediata', 'Pedidos grandes o B2B; requiere revisar cada pago a mano'],
          ],
        },
      },
      {
        heading: 'Webpay Plus (Transbank)',
        body: 'Es la opción que más confianza genera en el comprador chileno, porque acepta tarjetas de débito y crédito de todos los bancos con una interfaz que la gente reconoce. Tiene plugin oficial para WooCommerce. Antes de pasar a producción, Transbank exige un proceso de afiliación y una validación técnica de la integración; hay que considerarlo en los plazos del proyecto, porque puede tomar más que el desarrollo mismo.',
      },
      {
        heading: 'Mercado Pago',
        body: 'Se activa rápido, sin contrato de afiliación complejo, y acepta tarjetas, saldo en cuenta y pago en cuotas. Su plugin para WooCommerce está bien mantenido. Es una buena opción para empezar a vender pronto o para tiendas que ya usan Mercado Pago en otros canales. Revisá la comisión y el plazo de liberación del dinero según la modalidad que elijas.',
      },
      {
        heading: 'Flow, Khipu y transferencias',
        body: 'Flow agrupa varios medios (incluido Webpay) en una sola integración, lo que simplifica la configuración. Khipu permite pagar con transferencia bancaria automatizada, algo que mucha gente en Chile prefiere frente a ingresar datos de tarjeta. Ofrecer transferencia como alternativa recupera ventas de clientes que abandonarían el checkout si la única opción fuera la tarjeta.',
      },
      {
        heading: 'Cómo elegir la tuya',
        body: 'Compará cuatro cosas: la comisión por transacción, el plazo en que el dinero llega a tu cuenta, los medios de pago que acepta y la calidad del plugin para WooCommerce (actualizaciones recientes, compatibilidad con la versión actual, soporte). Muchas tiendas terminan usando dos pasarelas: una principal con tarjetas y una alternativa con transferencia. Más opciones no siempre es mejor: tres o cuatro botones de pago confunden más de lo que ayudan.',
      },
      {
        heading: 'Facturación y conciliación',
        body: 'Vender online también implica emitir boleta o factura electrónica por cada venta. Existen proveedores de facturación electrónica con integración para WooCommerce que generan el documento automáticamente al confirmarse el pago. Conviene resolverlo desde el inicio, porque emitir boletas a mano no escala cuando la tienda empieza a vender todos los días.',
      },
      {
        heading: 'Probar antes de lanzar',
        body: 'Todas las pasarelas tienen un modo de pruebas. Antes de publicar la tienda hay que hacer compras de prueba completas (pago aprobado, rechazado y anulado) y revisar que el pedido cambie de estado correctamente, que se descuente el stock, que llegue el correo de confirmación al cliente y que se genere el documento tributario. Un checkout que falla en silencio es la forma más cara de perder ventas.',
      },
    ],
  },
  {
    _id: 'mock-que-necesito-para-hacer-mi-pagina-web',
    title: 'Qué necesitás tener listo antes de encargar tu página web',
    seoTitle: 'Qué necesitás antes de encargar tu página web',
    slug: { current: 'que-necesitas-antes-de-encargar-tu-pagina-web' },
    publishedAt: '2026-09-27',
    coverUrl: '/images/blog/que-necesitas-antes-de-encargar-tu-pagina-web.webp',
    excerpt: 'Los proyectos web no se atrasan por el desarrollo, sino por el contenido. Lo que conviene tener listo para que tu sitio salga a tiempo.',
    tags: ['Guía', 'Proceso', 'Contenido'],
    sections: [
      {
        heading: '',
        body: 'El cuello de botella más común en un proyecto web no es el diseño ni la programación: es esperar textos, fotos o accesos que el cliente todavía no tiene. Preparar esto antes de empezar acorta semanas el proyecto y mejora el resultado final.',
      },
      {
        heading: 'Objetivo y público claros',
        body: '¿Qué tiene que lograr el sitio: consultas, ventas, reservas? ¿Quién es tu cliente ideal y qué busca? Tener esto claro define la estructura, los textos y los llamados a la acción. Un sitio sin objetivo definido termina siendo un folleto bonito que no genera contactos.',
      },
      {
        heading: 'Logo e identidad visual',
        body: 'El logo en buena calidad (idealmente en vector: SVG, AI o PDF), los colores de marca y las tipografías si las hay. Si todavía no tenés identidad definida, conviene resolverlo antes o como parte del proyecto, no improvisarlo en el camino.',
      },
      {
        heading: 'Textos y fotos',
        body: 'Descripción de servicios o productos, información de la empresa, preguntas frecuentes y datos de contacto. Las fotos propias del negocio, del equipo o de los productos generan mucha más confianza que las de banco de imágenes. Si escribir no es lo tuyo, se puede contratar redacción, pero la información base solo la tenés vos.',
      },
      {
        heading: 'Dominio, hosting y accesos',
        body: 'Si ya tenés dominio (por ejemplo en NIC Chile) o hosting, hay que tener a mano los accesos. Si no, conviene que el dominio quede registrado a tu nombre, no al de quien hace el sitio: es un activo de tu empresa y tiene que ser tuyo.',
      },
      {
        heading: 'Referencias',
        body: 'Dos o tres sitios que te gusten (y por qué), y también alguno que no te guste. Las referencias ahorran muchas rondas de revisión porque ponen en imágenes lo que es difícil explicar con palabras.',
      },
    ],
  },
  {
    _id: 'mock-como-elegir-hosting-wordpress-chile',
    title: 'Cómo elegir hosting para WordPress en Chile sin pagar de más',
    seoTitle: 'Cómo elegir hosting para WordPress en Chile',
    slug: { current: 'como-elegir-hosting-para-wordpress-en-chile' },
    publishedAt: '2026-09-26',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/como-elegir-hosting-para-wordpress-en-chile.webp',
    excerpt: 'El hosting define la velocidad, estabilidad y seguridad de tu sitio. Qué mirar al elegir uno para WordPress en Chile y qué promesas ignorar.',
    tags: ['WordPress', 'Hosting', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'El hosting es el servidor donde vive tu sitio. Es fácil elegirlo solo por precio, pero un hosting inadecuado se paga después en lentitud, caídas y horas de soporte. No hace falta el plan más caro: hace falta el adecuado para tu tipo de sitio. Esta guía explica qué tipos de hosting existen, qué mirar al elegir uno para WordPress en Chile y qué promesas conviene ignorar.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Para un sitio corporativo con tráfico moderado alcanza un hosting compartido de buena calidad, con PHP actualizado, discos SSD o NVMe, SSL gratuito y backups automáticos. Para una tienda WooCommerce o un sitio con más visitas conviene un VPS o un hosting administrado para WordPress. En cualquier caso, mirá el precio de renovación y la calidad del soporte, no solo el precio del primer año.',
      },
      {
        heading: 'Tipos de hosting',
        body: 'La diferencia principal está en cuántos recursos son tuyos y quién se encarga de administrar el servidor.',
        table: {
          head: ['Tipo', 'Para quién', 'Ventaja', 'Límite'],
          rows: [
            ['Compartido', 'Sitios corporativos y blogs con tráfico moderado', 'Económico y sin administración técnica', 'Comparte recursos con otros sitios; se resiente con picos de tráfico'],
            ['VPS', 'Tiendas y sitios con más visitas', 'Recursos dedicados y más control', 'Requiere saber administrar el servidor, o pagar a quien lo haga'],
            ['WordPress administrado', 'Empresas que no quieren ocuparse de la parte técnica', 'Caché, backups y actualizaciones gestionadas', 'Más caro; a veces restringe plugins'],
            ['Cloud', 'Proyectos con tráfico variable o alto', 'Escala según la demanda', 'Costos menos predecibles y configuración más compleja'],
          ],
        },
      },
      {
        heading: 'Lo que sí importa',
        body: 'Versión actual de PHP (WordPress rinde mejor y es más seguro con versiones recientes), discos SSD o NVMe, certificado SSL gratuito, backups automáticos que puedas restaurar vos mismo, acceso a staging para probar cambios y soporte que responda en horario útil y en español. La ubicación del servidor influye en la velocidad: uno con buena latencia hacia Chile ayuda, aunque un CDN puede compensar si el servidor está lejos.',
      },
      {
        heading: 'Promesas que conviene ignorar',
        body: '"Ancho de banda ilimitado", "sitios ilimitados" y "almacenamiento ilimitado" suelen venir con límites de CPU, memoria o procesos escondidos en la letra chica, que son justamente los que frenan a WordPress. El precio promocional del primer año también engaña: hay que mirar el precio de renovación, que puede ser bastante mayor. Y desconfiá de un hosting que no permite descargar tus propios backups.',
      },
      {
        heading: 'Hosting para WooCommerce',
        body: 'Una tienda online exige más que un sitio informativo: el carrito, el checkout y la cuenta del cliente no se pueden servir desde caché, así que cada una de esas páginas se procesa en el servidor en cada visita. Para WooCommerce conviene un plan con recursos dedicados o un VPS, sobre todo si se esperan campañas o fechas de alto tráfico como el CyberDay o el Black Friday, cuando un hosting justo se cae en el peor momento.',
      },
      {
        heading: 'Dominio y hosting: separados es mejor',
        body: 'Conviene que el dominio esté registrado a nombre de tu empresa (por ejemplo, el .cl en NIC Chile) y, si es posible, separado del hosting. Así, si algún día cambiás de proveedor, solo hay que apuntar el dominio al servidor nuevo, sin depender de que el proveedor anterior te libere nada.',
      },
      {
        heading: 'Señales de que es hora de cambiar',
        body: 'Caídas frecuentes, un sitio lento incluso después de optimizar imágenes y configurar caché, errores 500 en horas de más tráfico, avisos de "límite de recursos alcanzado" o un soporte que tarda días en responder. Migrar de hosting es un proceso conocido y, bien hecho (con backup completo, prueba en el servidor nuevo y cambio de DNS planificado), no implica perder posiciones en Google.',
      },
    ],
  },
]
