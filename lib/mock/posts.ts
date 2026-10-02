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
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/elementor-vs-divi-cual-elegir-para-tu-sitio-en-wordpress.webp',
    excerpt: 'Los dos page builders más usados en WordPress, comparados desde la experiencia real de construir sitios con ambos. Cuál conviene según tu proyecto.',
    tags: ['WordPress', 'Elementor', 'Divi', 'Comparativa'],
    sections: [
      {
        heading: '',
        body: 'Elementor y Divi son los dos constructores visuales más usados en WordPress, y la pregunta de "cuál es mejor" es la equivocada: la que importa es cuál conviene para tu proyecto. Esto no es una comparación de especificaciones sacada de una tabla de marketing, sino lo que aprendí construyendo sitios corporativos y tiendas con ambos.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Para un sitio corporativo, los dos dan un resultado profesional. Elementor conviene si querés el editor más ágil, el ecosistema de addons más grande o diseñar a fondo una tienda WooCommerce con su Theme Builder. Divi conviene si vas a hacer varios sitios y te sirve su licencia de por vida. Si tu sitio ya está hecho en uno de los dos, casi siempre conviene quedarse donde estás.',
      },
      {
        heading: 'Comparativa rápida',
        body: 'Estas son las diferencias que en la práctica pesan al elegir.',
        table: {
          head: ['Criterio', 'Elementor', 'Divi'],
          rows: [
            ['Modelo de licencia', 'Versión gratuita + Elementor Pro con suscripción anual', 'Suscripción anual o licencia de por vida para sitios ilimitados'],
            ['Editor', 'Panel lateral, rápido y muy usado', 'Edición visual sobre la página, con su propio tema'],
            ['Ecosistema', 'El más grande de addons y plantillas de terceros', 'Más cerrado, con plantillas propias de Elegant Themes'],
            ['WooCommerce', 'Theme Builder para fichas, carrito y checkout (Pro)', 'Módulos para WooCommerce integrados'],
            ['Rendimiento', 'Depende de la configuración y los addons', 'Depende de la configuración; requiere optimizar'],
            ['Facilidad para el cliente', 'Muy conocido: es fácil encontrar quien lo edite', 'Menos profesionales disponibles en el mercado'],
          ],
        },
      },
      {
        heading: 'Qué tienen en común',
        body: 'Los dos son editores visuales de arrastrar y soltar, no requieren saber programar para armar una página, tienen un ecosistema amplio de plantillas y funcionan bien con WooCommerce. Para un sitio corporativo estándar, cualquiera de los dos permite un resultado profesional, siempre que quien lo construya cuide la estructura, la velocidad y la consistencia del diseño.',
      },
      {
        heading: 'Dónde se nota la diferencia',
        body: 'Elementor tiene una interfaz que se siente más ágil y un ecosistema enorme de addons de terceros, lo que facilita resolver casi cualquier necesidad sin código. Divi viene con su propio tema y una licencia de por vida que cubre sitios ilimitados, algo atractivo si manejás varios proyectos. La contracara de Elementor es que el costo de Pro y de algunos addons se renueva cada año; la de Divi, que el ecosistema es más cerrado.',
      },
      {
        heading: 'Rendimiento y velocidad',
        body: 'Ningún builder es lento o rápido por sí solo. Un sitio con diez addons, imágenes sin optimizar y hosting barato va a cargar mal en cualquiera de los dos, y uno bien configurado (caché, imágenes en WebP o AVIF, CSS y JS optimizados, buen hosting) puede pasar Core Web Vitals en ambos. Lo que sí suma peso es la cantidad de elementos anidados: diseñar con estructura simple es más importante que el builder elegido.',
      },
      {
        heading: 'Quién va a editar el sitio después',
        body: 'Es un criterio que se olvida: si tu equipo va a actualizar páginas, conviene la herramienta que les resulte más cómoda, y si algún día cambiás de proveedor, conviene una que muchos profesionales manejen. Elementor tiene ventaja en ese punto porque es el builder más extendido, así que es más fácil encontrar a alguien que lo edite.',
      },
      {
        heading: 'Cuál elegiría para tu proyecto',
        body: 'Para un sitio corporativo simple, cualquiera funciona. Para una tienda WooCommerce donde las fichas de producto y el checkout son clave, Elementor Pro da más control con su Theme Builder. Para quien hace varios sitios y quiere un costo fijo, Divi es razonable. Y si tu sitio ya está construido en uno de los dos, reconstruir todo solo para cambiar de builder rara vez se justifica: mejor optimizar lo que hay.',
      },
      {
        heading: 'En la práctica',
        body: 'La herramienta importa menos que quien la usa. Trabajo con ambos según lo que cada proyecto necesita, en vez de forzar siempre la misma solución, y en algunos casos conviene directamente un tema liviano o desarrollo a medida sin builder, cuando la prioridad absoluta es la velocidad.',
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
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/como-elegir-una-agencia-web-o-freelancer-sin-arrepentirte.webp',
    excerpt: 'Contratar a quien construya tu sitio es una decisión cara de revertir después. Estas son las preguntas que realmente importan antes de firmar.',
    tags: ['Guía', 'Freelance', 'Agencia'],
    sections: [
      {
        heading: '',
        body: 'Elegir quién construye tu sitio web es una decisión cara de revertir, no solo en plata, también en tiempo. No se trata de encontrar el portafolio más grande o el precio más bajo, sino de hacer las preguntas correctas antes de firmar. Esta guía reúne esas preguntas y las señales que separan a un buen proveedor de uno que te va a dar problemas.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Para elegir una agencia o un freelancer web, revisá sitios reales que haya construido (no capturas), preguntá quién hace el trabajo y quién será tu contacto, exigí una propuesta que detalle qué incluye y qué no, confirmá que el dominio y los accesos queden a tu nombre, y aclará qué pasa después del lanzamiento.',
      },
      {
        heading: 'Las preguntas que conviene hacer',
        body: 'Con estas preguntas, en una sola reunión sabés casi todo lo que necesitás.',
        table: {
          head: ['Pregunta', 'Respuesta que da confianza', 'Señal de alerta'],
          rows: [
            ['¿Puedo ver sitios en línea que hayas construido?', 'Varios links reales, que cargan rápido en el celular', 'Solo capturas o mockups'],
            ['¿Quién hace el trabajo y quién es mi contacto?', 'Un nombre concreto, de principio a fin', '"El equipo" sin nadie identificable'],
            ['¿Qué incluye y qué no incluye la propuesta?', 'Detalle por ítem: páginas, revisiones, contenido, capacitación', 'Un solo número sin desglose'],
            ['¿A nombre de quién queda el dominio y el hosting?', 'A nombre de tu empresa, con accesos entregados', 'A nombre del proveedor'],
            ['¿Qué pasa después del lanzamiento?', 'Soporte o mantenimiento definido por escrito', '"Ahí vemos"'],
            ['¿Cómo se mide si el sitio funciona?', 'Analítica, Search Console y objetivos de contacto o venta', 'Solo que "se vea bien"'],
          ],
        },
      },
      {
        heading: 'Pedí ver proyectos reales, no solo el portafolio',
        body: 'Pedí sitios en producción, no capturas. Abrilos en el celular, fijate si cargan rápido y si se pueden usar con una mano. Y preguntá por un proyecto concreto: cuál era el problema del cliente, qué se hizo y qué resultado dejó. Si no pueden contarlo con detalle, probablemente no lo pensaron así.',
      },
      {
        heading: 'Preguntá quién hace el trabajo, no solo quién lo vende',
        body: 'En muchas agencias, la persona que vende el proyecto no es la que después lo construye, y cada cambio pasa por un ejecutivo antes de llegar al diseñador o al programador. Preguntá directamente quién va a ser tu contacto durante el desarrollo y si va a ser la misma persona de principio a fin.',
      },
      {
        heading: 'Que todo quede a tu nombre',
        body: 'El dominio, el hosting, las cuentas de Google (Analytics, Search Console, Business Profile) y los accesos de administrador del sitio deben quedar a nombre de tu empresa. Es el punto que más problemas genera cuando una relación con un proveedor se termina: si el dominio está a nombre de otro, tu sitio depende de él.',
      },
      {
        heading: 'Aclará qué pasa después del lanzamiento',
        body: 'Preguntá quién arregla algo si se rompe, si existe un acuerdo de mantenimiento, cuánto tardan en responder ante una caída y qué pasa si en seis meses querés hacer cambios. Un sitio entregado sin plan de qué sigue suele ser el inicio de sorpresas caras.',
      },
      {
        heading: 'Fijate en la comunicación, no solo en el precio',
        body: 'La cotización más barata no siempre termina siendo la más económica si la comunicación es lenta o requiere varias vueltas para resolver algo simple. Cómo responden y qué te preguntan mientras cotizan es una buena señal de cómo será trabajar con ellos: un buen proveedor pregunta por tu negocio antes de hablar de colores.',
      },
      {
        heading: 'Freelancer o agencia',
        body: 'Una agencia suma estructura y especialistas, a costa de intermediarios entre vos y quien hace el trabajo. Un freelancer con experiencia real ofrece trato directo y cambios más rápidos, a cambio de depender de una sola persona. Para sitios corporativos y tiendas de tamaño pequeño o mediano, el trato directo suele ganar; para proyectos con muchos frentes en paralelo, una agencia puede tener sentido.',
      },
    ],
  },
  {
    _id: 'mock-errores-tienda-online',
    title: 'Errores comunes al crear una tienda online (y cómo evitarlos)',
    seoTitle: 'Errores comunes al crear una tienda online',
    slug: { current: 'errores-al-crear-una-tienda-online' },
    publishedAt: '2026-05-28',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/errores-comunes-al-crear-una-tienda-online-y-como-evitarlos.webp',
    excerpt: 'Lo que frena las ventas de una tienda online rara vez es el diseño: son decisiones tomadas (o salteadas) antes de lanzar. Los errores más comunes.',
    tags: ['E-commerce', 'WooCommerce', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Muchos de los problemas que frenan las ventas de una tienda online no son de diseño: son decisiones tomadas, o salteadas, antes de lanzar. Estos son los errores que más se repiten en tiendas que recién parten, y cómo evitarlos desde el inicio.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Los errores más caros al crear una tienda online son: un checkout largo o que obliga a crear cuenta, mostrar el costo de envío recién al final, fichas de producto incompletas, un sitio que no fue pensado para el celular, pocos medios de pago, velocidad ignorada y lanzar sin plan para después. Todos se pueden evitar si se definen antes de construir.',
      },
      {
        heading: 'Los errores y cómo evitarlos',
        body: 'Un resumen para revisar tu tienda o la que estás por lanzar.',
        table: {
          head: ['Error', 'Qué provoca', 'Cómo evitarlo'],
          rows: [
            ['Checkout largo u obligado a crear cuenta', 'Carritos abandonados', 'Compra como invitado y solo los campos necesarios'],
            ['Costo de envío oculto hasta el final', 'Abandono en el último paso', 'Mostrar el envío por comuna o región antes del checkout'],
            ['Fichas sin información clave', 'El cliente busca la respuesta en otro lado', 'Tallas, medidas, stock, despacho y devoluciones en cada ficha'],
            ['No pensar en el celular', 'Ventas perdidas en silencio', 'Diseñar primero para móvil y probar el checkout en un celular real'],
            ['Un solo medio de pago', 'Clientes sin forma de pagar', 'Tarjeta más una alternativa de transferencia'],
            ['Ignorar la velocidad', 'Menos conversiones y peor posición en Google', 'Imágenes optimizadas, caché y hosting adecuado'],
          ],
        },
      },
      {
        heading: 'Checkout con demasiados pasos',
        body: 'Cada paso o campo de más en el checkout es una oportunidad para que alguien abandone el carrito. Pedí solo la información necesaria para despachar y facturar, permití comprar como invitado y dejá la creación de cuenta como opción después de la compra.',
      },
      {
        heading: 'Sorpresas en el costo de envío',
        body: 'Que el envío aparezca recién en el último paso es una de las causas más comunes de abandono. Mostrá el costo o una tabla de envíos por zona antes del checkout, o un umbral de envío gratis visible desde la ficha de producto.',
      },
      {
        heading: 'Fichas de producto sin la información que el cliente necesita',
        body: 'Si faltan tallas, especificaciones, plazos de despacho o la política de devolución, el cliente se va a buscar esa respuesta a otro lado y muchas veces no vuelve. Una buena ficha responde las dudas antes de que se conviertan en una razón para no comprar, con fotos propias desde varios ángulos.',
      },
      {
        heading: 'No pensar el sitio para el celular',
        body: 'La mayor parte del tráfico de una tienda online llega desde el celular. Que el sitio "se vea" en el teléfono no es lo mismo que haber sido pensado para ese uso: botones chicos, menús difíciles, precios poco legibles o un checkout incómodo pierden ventas sin que nadie se queje directamente.',
      },
      {
        heading: 'Pocas señales de confianza',
        body: 'Una tienda nueva tiene que demostrar que es real: datos de contacto visibles, WhatsApp o chat, políticas de envío y devolución claras, medios de pago reconocidos y, cuando existan, reseñas de clientes. Sin eso, el comprador duda justo en el momento de pagar.',
      },
      {
        heading: 'Lanzar sin un plan de qué pasa después',
        body: 'Una tienda no está terminada el día del lanzamiento. Inventario, promociones, recuperación de carritos abandonados, medición de qué se vende y contenido para posicionar en Google necesitan atención continua, o la tienda se estanca apenas pasa el entusiasmo inicial.',
      },
    ],
  },
  {
    _id: 'mock-wordpress-vs-wix-vs-squarespace',
    title: 'WordPress vs. Wix vs. Squarespace: ¿cuál conviene para tu empresa?',
    seoTitle: 'WordPress vs. Wix vs. Squarespace: ¿cuál usar?',
    slug: { current: 'wordpress-vs-wix-vs-squarespace' },
    publishedAt: '2026-05-14',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/wordpress-vs-wix-vs-squarespace-cual-conviene-para-tu-empresa.webp',
    excerpt: 'Los constructores "todo incluido" prometen simplicidad, WordPress promete control. Antes de elegir, conviene entender qué estás sacrificando en cada opción.',
    tags: ['WordPress', 'Comparativa', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Wix y Squarespace venden simplicidad: te registrás, elegís una plantilla y en un día tenés un sitio publicado. WordPress vende control: podés construir cualquier cosa, pero requiere más decisiones. Ninguno es "el mejor": la pregunta correcta es qué estás dispuesto a sacrificar a cambio de qué, sobre todo si tu sitio es una herramienta de negocio.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Elegí Wix o Squarespace si necesitás un sitio simple, rápido de lanzar, sin planes de crecer mucho y sin presupuesto para mantenimiento. Elegí WordPress si tu sitio va a crecer en contenido, productos o integraciones, si el posicionamiento en Google es importante para tu negocio, o si querés que el sitio sea tuyo y poder llevarlo a otro proveedor.',
      },
      {
        heading: 'Comparativa',
        body: 'Las diferencias que más pesan para una empresa.',
        table: {
          head: ['Criterio', 'WordPress', 'Wix', 'Squarespace'],
          rows: [
            ['Modelo', 'Software libre en tu hosting', 'Plataforma cerrada por suscripción', 'Plataforma cerrada por suscripción'],
            ['Mantenimiento', 'A tu cargo o de quien contrates', 'Incluido', 'Incluido'],
            ['Flexibilidad', 'Casi ilimitada (plugins, código)', 'Limitada a sus apps', 'Limitada a sus bloques'],
            ['SEO técnico', 'Control total de URLs, datos estructurados y velocidad', 'Lo básico, con menos control', 'Lo básico, con menos control'],
            ['Tienda online', 'WooCommerce, sin comisión de plataforma', 'Incluida en planes de pago', 'Incluida en planes de pago'],
            ['Llevarte el sitio', 'Completo, a cualquier hosting', 'Muy limitado', 'Exportación parcial de contenido'],
          ],
        },
      },
      {
        heading: 'Simplicidad vs. control',
        body: 'Wix y Squarespace resuelven el hosting, la seguridad y las actualizaciones dentro de un ecosistema cerrado: es cómodo, pero estás limitado a lo que la plataforma ofrece. WordPress te da acceso al código y a miles de plugins, y a cambio la responsabilidad de mantenerlo actualizado y seguro recae en vos o en quien contrates para eso.',
      },
      {
        heading: 'Qué pasa cuando tu negocio crece',
        body: 'Un catálogo que crece, una integración con un sistema interno, un área de clientes o un blog pensado para posicionar son cosas que WordPress resuelve sin pelear con la plataforma. Los constructores todo-en-uno suelen quedarse cortos justo cuando el negocio empieza a necesitar más, y ahí aparece el problema más serio: salir de ellos.',
      },
      {
        heading: 'El costo de irse',
        body: 'En WordPress, el sitio completo (archivos y base de datos) se puede llevar a cualquier hosting. En las plataformas cerradas, el diseño no se puede exportar y el contenido solo en parte, así que cambiarse suele significar rehacer el sitio y planificar redirecciones para no perder posiciones en Google. Conviene pensarlo antes de elegir, no cuando ya hay años de contenido adentro.',
      },
      {
        heading: 'SEO y velocidad',
        body: 'Los tres pueden posicionar si están bien configurados, pero WordPress da más margen de ajuste fino: control sobre el hosting, la caché, la estructura de URLs, los datos estructurados y la optimización de imágenes. En las plataformas cerradas, parte de eso no se puede tocar, y cuando algo frena el rendimiento no siempre hay forma de corregirlo.',
      },
      {
        heading: 'Cuál elegiría según el caso',
        body: 'Para una página personal o un emprendimiento que recién parte y necesita estar en línea esta semana, un constructor todo-en-uno reduce fricción. Para un sitio que es una herramienta de negocio y va a evolucionar (más servicios, más productos, más contenido, más integraciones), WordPress da el margen que después vas a necesitar, sin quedar atado a una plataforma.',
      },
    ],
  },
  {
    _id: 'mock-cuanto-tiempo-toma-pagina-web',
    title: '¿Cuánto tiempo toma hacer una página web? Plazos reales',
    seoTitle: '¿Cuánto tiempo toma hacer una página web?',
    slug: { current: 'cuanto-tiempo-toma-hacer-una-pagina-web' },
    publishedAt: '2026-04-30',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/cuanto-tiempo-toma-hacer-una-pagina-web-plazos-reales.webp',
    excerpt: 'Los plazos que ves en una cotización rara vez cuentan toda la historia. Esto es lo que realmente determina cuánto tarda un sitio en estar listo.',
    tags: ['Guía', 'WordPress', 'Proceso'],
    sections: [
      {
        heading: '',
        body: 'Una landing page simple puede estar lista en una semana. Una tienda online con catálogo grande puede tomar dos meses o más. La diferencia casi nunca es la velocidad de quien construye: es cuánto hay que definir y reunir antes de empezar a construir. Esta guía muestra plazos reales por tipo de sitio y qué hacer para que el tuyo no se alargue.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Una landing page toma de 1 a 2 semanas; un sitio corporativo de varias páginas, de 3 a 5 semanas; una tienda WooCommerce con catálogo mediano, de 6 a 10 semanas. Lo que más alarga un proyecto no es el desarrollo, sino esperar contenido, las rondas de revisión y las integraciones con terceros.',
      },
      {
        heading: 'Plazos aproximados por tipo de sitio',
        body: 'Son rangos de proyectos reales, no promesas: cada proyecto tiene sus variables.',
        table: {
          head: ['Tipo de sitio', 'Plazo típico', 'Qué lo alarga'],
          rows: [
            ['Landing page', '1 a 2 semanas', 'Textos de venta sin definir'],
            ['Sitio corporativo', '3 a 5 semanas', 'Contenido de varias páginas, fotos, aprobaciones'],
            ['Tienda WooCommerce', '6 a 10 semanas', 'Carga del catálogo, pasarela de pago, envíos, facturación'],
            ['Rediseño de un sitio existente', 'Similar a uno nuevo', 'Migrar contenido y mantener el SEO ganado'],
          ],
        },
      },
      {
        heading: 'Cómo se reparte el tiempo',
        body: 'En un sitio corporativo típico, el tiempo se reparte en etapas que se pueden planificar: una reunión inicial y propuesta (pocos días), el diseño de la arquitectura y la interfaz (alrededor de una semana, más la revisión), el desarrollo (una a dos semanas), la revisión del cliente con ajustes, y la publicación con verificaciones finales. Cuando cada etapa tiene fecha y responsable, el proyecto avanza; cuando no, se estanca entre etapas.',
      },
      {
        heading: 'Lo que realmente alarga un proyecto',
        body: 'Esperar textos y fotos que no estaban listos, rondas de revisión que se estiran sin un límite acordado, decisiones de diseño que cambian a mitad de camino y aprobaciones que dependen de varias personas suelen sumar más tiempo que el desarrollo en sí. En tiendas online hay un factor extra: algunas integraciones dependen de terceros, como la validación técnica de Webpay de Transbank, que puede tomar más que programar la integración.',
      },
      {
        heading: 'Qué podés tener listo antes de empezar',
        body: 'Logo en buena calidad, textos de cada servicio o producto, fotos propias, accesos al dominio y hosting si ya existen, y dos o tres sitios de referencia. En una tienda, además, el catálogo en una planilla (nombre, precio, descripción, stock, imágenes). Llegar con esto resuelto puede acortar el proyecto en semanas.',
      },
      {
        heading: 'Cómo acortar el plazo sin apurar mal el proyecto',
        body: 'Definir de antemano quién aprueba cada etapa, limitar las rondas de revisión a las acordadas, dar feedback consolidado (una lista, no mensajes sueltos) y lanzar con lo esencial dejando mejoras para una segunda etapa. Un sitio publicado y bien hecho que después crece le gana a uno perfecto que nunca sale.',
      },
      {
        heading: 'Una señal de alerta',
        body: 'Desconfiá de un plazo que suena demasiado corto para la complejidad del proyecto: generalmente significa que algo se va a saltar, como pruebas, optimización de velocidad o contenido pensado con cuidado. Un plazo realista dicho de entrada ahorra sorpresas después.',
      },
    ],
  },
  {
    _id: 'mock-senales-pagina-web-pierde-clientes',
    title: 'Señales de que tu página web te está haciendo perder clientes',
    seoTitle: 'Señales de que tu web te hace perder clientes',
    slug: { current: 'senales-de-que-tu-pagina-web-pierde-clientes' },
    publishedAt: '2026-04-16',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/senales-de-que-tu-pagina-web-te-esta-haciendo-perder-clientes.webp',
    excerpt: 'Muchas páginas web pierden clientes en silencio, sin quejas ni reclamos visibles. Estas son las señales más comunes de que la tuya podría estar entre ellas.',
    tags: ['Guía', 'Conversión', 'UX'],
    sections: [
      {
        heading: '',
        body: 'Nadie te va a escribir para avisarte que se fue de tu sitio sin contactarte. Esa pérdida pasa en silencio, y las señales suelen estar a la vista si sabés dónde mirar.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Tu página web pierde clientes si tarda más de 3 segundos en cargar, si al entrar no queda claro qué ofrecés y qué hacer, si se usa mal en el celular, si la única forma de contacto es un formulario, o si no muestra quién está detrás. Todas se pueden comprobar en una tarde con herramientas gratuitas.',
      },
      {
        heading: 'Cómo revisar tu sitio en una tarde',
        body: 'Cada señal tiene una forma concreta de comprobarla.',
        table: {
          head: ['Señal', 'Cómo comprobarla', 'Qué hacer'],
          rows: [
            ['Carga lenta', 'PageSpeed Insights, versión móvil', 'Optimizar imágenes, caché y hosting'],
            ['Mensaje confuso', 'Mostrá la portada 5 segundos a alguien y preguntale qué hacés', 'Titular que diga qué hacés y para quién'],
            ['Contacto difícil', 'Contá cuántos clics hay desde la portada hasta escribirte', 'WhatsApp y teléfono visibles en todas las páginas'],
            ['Mal en el celular', 'Usá tu sitio con una mano, en tu propio teléfono', 'Botones grandes, texto legible, menú simple'],
            ['Sin señales de confianza', 'Buscá quién está detrás, clientes y reseñas', 'Equipo, proyectos reales, testimonios, datos de contacto'],
          ],
        },
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
      {
        heading: 'Cómo saber si el problema es real',
        body: 'Las intuiciones engañan; los datos no. En Google Analytics, revisá cuántas visitas terminan en un contacto (formulario, clic en WhatsApp o en el teléfono) y desde qué páginas. En Search Console, mirá qué búsquedas te muestran y cuántos clics reciben. Si hay visitas pero casi no hay contactos, el problema está en el sitio; si no hay visitas, está en la visibilidad. Son soluciones distintas.',
      },
    ],
  },
  {
    _id: 'mock-seo-tecnico-wordpress-basico',
    title: 'SEO técnico para WordPress: lo básico que todo sitio necesita',
    seoTitle: 'SEO técnico para WordPress: lo básico',
    slug: { current: 'seo-tecnico-para-wordpress-lo-basico' },
    publishedAt: '2026-04-02',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/seo-tecnico-para-wordpress-lo-basico-que-todo-sitio-necesita.webp',
    excerpt: 'Antes de pensar en estrategias avanzadas de SEO, hay una base técnica que todo sitio en WordPress necesita tener resuelta. Esto es lo esencial.',
    tags: ['SEO', 'WordPress', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'El SEO técnico no es la parte más vistosa del posicionamiento, pero es la base sobre la que todo lo demás funciona. Un sitio con buen contenido pero mala base técnica compite en desventaja frente a uno más simple pero bien resuelto.',
      },
      {
        heading: 'Respuesta corta',
        body: 'El SEO técnico básico de un sitio WordPress cubre cinco cosas: que cargue rápido (Core Web Vitals en verde), que Google pueda rastrear e indexar las páginas correctas (sitemap, robots.txt, sin noindex accidentales), una estructura clara de URLs y encabezados, datos estructurados que describan tu negocio, y una experiencia pensada primero para el celular.',
      },
      {
        heading: 'Checklist de SEO técnico',
        body: 'Lo mínimo que todo sitio WordPress debería tener resuelto.',
        table: {
          head: ['Elemento', 'Qué revisar', 'Herramienta'],
          rows: [
            ['Velocidad', 'LCP, INP y CLS en verde en móvil', 'PageSpeed Insights'],
            ['Indexación', 'Que las páginas importantes estén indexadas y las inútiles no', 'Search Console, informe de páginas'],
            ['Sitemap', 'Que exista, esté enviado y solo tenga URLs válidas', 'Search Console, Sitemaps'],
            ['robots.txt', 'Que no bloquee páginas ni recursos importantes', 'Visitar /robots.txt'],
            ['Títulos y descripciones', 'Únicos por página y con la búsqueda principal', 'Plugin de SEO'],
            ['Encabezados', 'Un solo H1 por página y H2 que ordenen el contenido', 'Inspeccionar la página'],
            ['Datos estructurados', 'Organization, LocalBusiness, Article o Product según el sitio, sin errores', 'Prueba de resultados enriquecidos de Google'],
            ['HTTPS y redirecciones', 'Todo en https, una sola versión (con o sin www)', 'Navegador y Search Console'],
          ],
        },
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
      {
        heading: 'Señales de que algo anda mal',
        body: 'En Search Console, el informe de páginas muestra las que Google no indexó y por qué: errores 404, páginas con redirección, duplicadas sin canonical o excluidas con noindex. Un aumento repentino de páginas no indexadas, o una caída de clics sin cambios en el contenido, suele indicar un problema técnico. Revisarlo una vez al mes evita enterarse tarde.',
      },
    ],
  },
  {
    _id: 'mock-rediseno-web-cuando-conviene',
    title: 'Rediseño web: cuándo conviene y qué esperar del proceso',
    seoTitle: 'Rediseño web: cuándo conviene y qué esperar',
    slug: { current: 'rediseno-web-cuando-conviene-y-que-esperar' },
    publishedAt: '2026-03-19',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/rediseno-web-cuando-conviene-y-que-esperar-del-proceso.webp',
    excerpt: 'No todo sitio que "se ve viejo" necesita rediseño, y no todo rediseño resuelve el problema de fondo. Esto es lo que conviene evaluar antes de empezar de nuevo.',
    tags: ['Guía', 'Rediseño', 'UX'],
    sections: [
      {
        heading: '',
        body: 'Rediseñar un sitio por estética suele ser la razón equivocada. Vale la pena rediseñar cuando el sitio actual frena el negocio, no solo cuando ya no gusta cómo se ve. Y bien hecho, un rediseño conserva lo que funciona, en especial las posiciones que ya ganaste en Google.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Conviene rediseñar cuando el sitio no funciona bien en el celular, es lento, no refleja lo que vendés hoy, no genera consultas pese a recibir visitas, o es tan difícil de editar que nadie lo actualiza. Si el problema es solo el mensaje o un llamado a la acción, alcanza con ajustes, no hace falta rehacerlo.',
      },
      {
        heading: 'Rediseñar o ajustar',
        body: 'No todo problema necesita un sitio nuevo.',
        table: {
          head: ['Síntoma', 'Qué conviene', 'Por qué'],
          rows: [
            ['Se ve mal o se rompe en el celular', 'Rediseñar', 'Es un problema de estructura, no de colores'],
            ['Carga lento', 'Primero optimizar; rediseñar si la base es el problema', 'Muchas veces se resuelve con imágenes, caché y hosting'],
            ['No refleja tus servicios actuales', 'Reestructurar contenido', 'Depende de cuánto cambió el negocio'],
            ['Recibe visitas pero no consultas', 'Ajustar mensaje y llamados a la acción', 'El diseño puede no ser la causa'],
            ['Nadie puede editarlo sin un programador', 'Rediseñar sobre un CMS editable', 'Un sitio que no se actualiza envejece rápido'],
          ],
        },
      },
      {
        heading: 'Señales de que sí conviene',
        body: 'El sitio no se ve bien en el celular, tarda en cargar, usa tecnología que ya no se mantiene, no refleja los servicios o productos actuales o no genera consultas a pesar del tráfico que recibe. Son problemas estructurales que un cambio visual menor no resuelve.',
      },
      {
        heading: 'Cuando el problema no es el diseño',
        body: 'A veces el sitio se ve bien pero no convierte porque el mensaje no es claro, no hay un llamado a la acción visible o el tráfico que llega no es el público correcto. Rediseñar sin resolver eso significa gastar en un sitio nuevo que repite el mismo problema con otro color. Por eso un buen rediseño empieza mirando los datos: de dónde llegan las visitas, qué páginas ven y dónde se van.',
      },
      {
        heading: 'Qué conviene conservar',
        body: 'Un rediseño no tiene por qué empezar de cero. El contenido que ya posiciona, las URLs con autoridad acumulada y las integraciones que funcionan deberían mantenerse. Si alguna URL cambia, necesita un redirect 301 a su nueva dirección; tirar todo y reconstruir sin ese cuidado suele costar posiciones ganadas durante años.',
      },
      {
        heading: 'Qué esperar del proceso',
        body: 'Un rediseño serio sigue estas etapas: auditoría del sitio actual (qué funciona, qué no, qué trae tráfico), propuesta de arquitectura y diseño, desarrollo en un entorno de pruebas, migración del contenido con su mapa de redirecciones, revisión y publicación, y monitoreo en Search Console las semanas siguientes. En plazos, se parece a construir un sitio nuevo: de 3 a 5 semanas para un sitio corporativo.',
      },
      {
        heading: 'Cómo medir si el rediseño funcionó',
        body: 'Antes de empezar, anotá cuántas consultas o ventas genera el sitio por mes, la velocidad en PageSpeed Insights y el tráfico orgánico en Search Console. Compará esos mismos números dos o tres meses después del lanzamiento. Un rediseño que se ve mejor pero genera menos contactos no funcionó.',
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
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/como-migrar-tu-tienda-a-woocommerce-sin-perder-seo.webp',
    excerpt: 'Mal hecha, una migración cuesta posiciones en Google y ventas durante semanas. Cómo pasar tu tienda a WooCommerce sin perder lo que ya funciona.',
    tags: ['WooCommerce', 'E-commerce', 'SEO', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Migrar una tienda de plataforma no es solo copiar productos de un lado a otro. Cada URL indexada en Google, cada ficha con historial y cada integración con la que ya contás se pueden perder si la migración se hace sin plan. Bien ejecutada, una migración a WooCommerce pasa casi desapercibida para tus clientes y para Google. Esta guía explica el proceso completo, paso a paso.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Para migrar a WooCommerce sin perder ventas ni SEO: exportá e importá el catálogo completo, armá un mapa de redirecciones 301 de cada URL antigua a su equivalente nueva, probá la tienda nueva entera (pagos, envíos, correos) antes del cambio, y después del lanzamiento monitoreá Search Console durante algunas semanas.',
      },
      {
        heading: 'Antes de mover nada: auditá lo que tenés',
        body: 'Exportá el catálogo completo (productos, variantes, precios, imágenes, descripciones, SKUs), los clientes y el historial de pedidos si lo necesitás. En Google Search Console, descargá la lista de páginas indexadas y las que reciben clics. Esa lista es la base del mapa de redirecciones: ninguna URL con tráfico puede quedar sin destino.',
      },
      {
        heading: 'El paso que más gente se salta: las redirecciones',
        body: 'Cada plataforma usa su propio formato de URL, así que casi nunca coinciden. Cada página antigua necesita un redirect 301 a su equivalente en la tienda nueva; sin esto, Google encuentra páginas caídas donde antes había fichas indexadas y la autoridad acumulada durante años se pierde.',
        table: {
          head: ['Página', 'Ejemplo en Shopify', 'Ejemplo en WooCommerce'],
          rows: [
            ['Producto', '/products/zapatilla-negra', '/producto/zapatilla-negra'],
            ['Categoría', '/collections/zapatillas', '/categoria-producto/zapatillas'],
            ['Página', '/pages/contacto', '/contacto'],
            ['Artículo del blog', '/blogs/noticias/guia-tallas', '/blog/guia-tallas'],
          ],
        },
      },
      {
        heading: 'Migrar el catálogo sin perder datos',
        body: 'WooCommerce tiene un importador que acepta CSV con productos, variantes, precios e inventario, y hay herramientas específicas para migrar desde Shopify, PrestaShop u otras plataformas conservando SKUs, imágenes y reseñas. Conviene migrar primero a un entorno de pruebas, revisar una muestra de productos con variantes complejas, y recién después hacer la importación final.',
      },
      {
        heading: 'Lo que no se migra solo',
        body: 'Las contraseñas de los clientes normalmente no se pueden trasladar (por seguridad), así que hay que avisar que deberán crear una nueva. Las apps de la plataforma anterior tampoco se migran: cada funcionalidad (reseñas, envíos, email marketing, facturación) necesita su equivalente en WooCommerce. Hacé la lista de integraciones antes de empezar, no después.',
      },
      {
        heading: 'Probar antes de apagar la tienda vieja',
        body: 'La tienda nueva debería estar completa y probada (checkout, pasarela de pago, cálculo de envío, correos de confirmación, documentos tributarios) antes de apuntar el dominio. Trabajarla en un dominio de pruebas mientras la tienda antigua sigue vendiendo evita quedarte sin tienda durante la transición.',
      },
      {
        heading: 'El día del cambio y después',
        body: 'Elegí un momento de bajo tráfico, aplicá las redirecciones, cambiá el DNS y verificá que las URLs antiguas más visitadas redirijan bien. Enviá el sitemap nuevo a Search Console y monitoreá las semanas siguientes los errores de indexación y el tráfico orgánico. Es normal una fluctuación breve; una caída sostenida indica redirecciones faltantes. Una migración no termina cuando la tienda nueva está online: termina cuando confirmás que nada se rompió.',
      },
    ],
  },
  {
    _id: 'mock-plugins-esenciales-wordpress',
    title: 'Plugins esenciales de WordPress para un sitio profesional (y cuáles evitar)',
    seoTitle: 'Plugins esenciales de WordPress (y cuáles evitar)',
    slug: { current: 'plugins-esenciales-de-wordpress-y-cuales-evitar' },
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/plugins-esenciales-de-wordpress-y-cuales-evitar.webp',
    excerpt: 'Qué plugins de WordPress valen la pena en un sitio profesional, y las señales de los que conviene evitar antes de que te rompan el sitio.',
    tags: ['WordPress', 'Plugins', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Cada plugin instalado es código extra corriendo en tu sitio: suma funcionalidad, pero también suma peso, superficie de ataque y una actualización más que mantener al día. La pregunta no es cuántos plugins tener, sino cuáles realmente ganan su lugar.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Un sitio WordPress profesional necesita pocos plugins y buenos: uno de SEO, uno de caché, uno de seguridad, uno de backups y, según el sitio, uno de formularios y uno para optimizar imágenes. Evitá los plugins abandonados (sin actualizaciones en meses), los que repiten funciones de otro y los "todo en uno" que prometen resolver todo.',
      },
      {
        heading: 'Las categorías que sí valen la pena',
        body: 'Una referencia de qué cubrir y con qué. Los nombres son ejemplos conocidos, no la única opción.',
        table: {
          head: ['Categoría', 'Para qué sirve', 'Ejemplos conocidos'],
          rows: [
            ['SEO', 'Títulos, descripciones, sitemap y datos estructurados', 'Yoast SEO, Rank Math'],
            ['Caché y rendimiento', 'Servir páginas ya generadas y optimizar CSS y JS', 'WP Rocket, LiteSpeed Cache'],
            ['Seguridad', 'Firewall y protección contra intentos de acceso', 'Wordfence'],
            ['Backups', 'Copias automáticas guardadas fuera del hosting', 'UpdraftPlus'],
            ['Formularios', 'Contacto y cotizaciones', 'Contact Form 7, WPForms'],
            ['Imágenes', 'Comprimir y convertir a WebP o AVIF', 'ShortPixel, Imagify'],
          ],
        },
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
      {
        heading: 'Antes de instalar un plugin nuevo',
        body: 'Revisá cuándo se actualizó por última vez, cuántas instalaciones activas tiene, si es compatible con tu versión de WordPress y qué dicen las reseñas recientes. Preguntate también si la función que buscás ya la cubre algo que tenés instalado, o si se resuelve con unas líneas de código. Y probalo primero en un entorno de pruebas si el sitio vende o recibe consultas todos los días.',
      },
    ],
  },
  {
    _id: 'mock-proceso-crear-pagina-web-paso-a-paso',
    title: 'Cómo es el proceso de crear una página web, paso a paso',
    seoTitle: 'El proceso de crear una página web, paso a paso',
    slug: { current: 'como-es-el-proceso-de-crear-una-pagina-web-paso-a-paso' },
    publishedAt: '2026-08-04',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/como-es-el-proceso-de-crear-una-pagina-web-paso-a-paso.webp',
    excerpt: 'Qué esperar en cada etapa de encargar un sitio web: el proceso real, desde la primera reunión hasta el soporte después del lanzamiento.',
    tags: ['Guía', 'Proceso', 'WordPress'],
    sections: [
      {
        heading: '',
        body: 'Encargar una página web se siente menos riesgoso cuando sabés qué esperar en cada etapa. Este es el proceso, de principio a fin, tal como debería verse con quien lo hace en serio.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Crear una página web profesional tiene siete etapas: reunión inicial, propuesta, diseño, desarrollo, revisión, publicación y soporte. En un sitio corporativo, todo el proceso toma de 3 a 5 semanas, y lo que más influye en el plazo es tener listo el contenido y que las aprobaciones no se demoren.',
      },
      {
        heading: 'El proceso en una tabla',
        body: 'Qué pasa en cada etapa, qué se necesita de tu parte y cuánto suele tomar en un sitio corporativo.',
        table: {
          head: ['Etapa', 'Qué pasa', 'Qué se necesita de vos', 'Duración aproximada'],
          rows: [
            ['Reunión inicial', 'Entender el negocio y el objetivo del sitio', '30 minutos', '1 día'],
            ['Propuesta', 'Alcance, páginas, plazos y precio por escrito', 'Revisarla y aprobarla', 'Pocos días'],
            ['Diseño', 'Arquitectura de páginas e interfaz', 'Referencias, logo y feedback', '1 a 2 semanas'],
            ['Desarrollo', 'Construcción en WordPress', 'Textos y fotos', '1 a 2 semanas'],
            ['Revisión', 'Pruebas y ajustes acordados', 'Feedback consolidado', 'Pocos días'],
            ['Publicación', 'Dominio, SSL, verificaciones', 'Accesos al dominio', '1 día'],
            ['Soporte', 'Resolver dudas y problemas', 'Avisar si algo falla', 'Continuo'],
          ],
        },
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
      {
        heading: 'Qué recibís al final',
        body: 'El sitio publicado, los accesos de administrador, el dominio registrado a nombre de tu empresa, las cuentas de Google Analytics y Search Console configuradas, y una capacitación para editar textos e imágenes por tu cuenta. Si algo de esa lista queda en manos del proveedor, preguntá por qué antes de firmar.',
      },
    ],
  },
  {
    _id: 'mock-wordpress-lento-causas-y-solucion',
    title: 'WordPress lento: causas comunes y cómo solucionarlo',
    seoTitle: 'WordPress lento: causas comunes y cómo solucionarlo',
    slug: { current: 'wordpress-lento-causas-comunes-y-como-solucionarlo' },
    publishedAt: '2026-08-03',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/wordpress-lento-causas-comunes-y-como-solucionarlo.webp',
    excerpt: 'Un sitio lento pierde visitas y posiciones en Google. Las causas más comunes de lentitud en WordPress, en el orden en que conviene revisarlas.',
    tags: ['WordPress', 'Performance', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Un WordPress lento casi nunca tiene una sola causa: es la suma de varias decisiones chicas, como un hosting insuficiente, imágenes sin optimizar o demasiados plugins. La buena noticia es que la mayoría de las causas comunes tienen solución sin reconstruir el sitio. Esta guía las ordena según su impacto y cuánto cuesta resolverlas.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Las causas más comunes de un WordPress lento son imágenes pesadas, falta de caché, plugins de más o mal hechos, un tema pesado, scripts externos y un hosting insuficiente. Empezá por medir con PageSpeed Insights, después optimizá imágenes y activá caché (lo de mayor impacto por menor esfuerzo), y recién al final evaluá cambiar de tema o de hosting.',
      },
      {
        heading: 'Qué medir primero',
        body: 'Google evalúa la experiencia con tres métricas, las Core Web Vitals, medidas en usuarios reales. PageSpeed Insights las muestra para tu sitio (si tiene suficiente tráfico) y además da un diagnóstico de laboratorio con recomendaciones concretas.',
        table: {
          head: ['Métrica', 'Qué mide', 'Umbral bueno'],
          rows: [
            ['LCP (Largest Contentful Paint)', 'Cuánto tarda en verse el contenido principal', 'Menos de 2,5 s'],
            ['INP (Interaction to Next Paint)', 'Qué tan rápido responde al tocar o hacer clic', 'Menos de 200 ms'],
            ['CLS (Cumulative Layout Shift)', 'Cuánto se mueve la página mientras carga', 'Menos de 0,1'],
          ],
        },
      },
      {
        heading: 'Las causas, de la más común a la menos',
        body: 'Este orden también sirve como plan de trabajo: arriba lo que más impacto tiene con menos esfuerzo.',
        table: {
          head: ['Causa', 'Síntoma', 'Solución'],
          rows: [
            ['Imágenes sin optimizar', 'LCP alto, página pesada', 'Comprimir, servir WebP o AVIF y el tamaño correcto por pantalla'],
            ['Sin caché', 'Todo el sitio responde lento', 'Plugin de caché de página y, si se puede, caché del servidor'],
            ['Plugins de más o mal hechos', 'Lentitud general y en el administrador', 'Auditar, desactivar y eliminar los que no se usan o pesan mucho'],
            ['Scripts externos', 'Interacción lenta (INP alto)', 'Cargar chat, píxeles y analítica de forma diferida'],
            ['Tema pesado', 'Mucho CSS y JS sin usar', 'Tema liviano o desactivar módulos que no se usan'],
            ['Hosting insuficiente', 'Lento incluso con lo anterior resuelto', 'Plan con más recursos, VPS o hosting administrado'],
          ],
        },
      },
      {
        heading: 'Imágenes sin optimizar',
        body: 'Es la causa más común y la más fácil de resolver: fotos subidas tal cual salen de la cámara, de varios megas cada una, sin formatos modernos ni dimensiones definidas. Comprimir, convertir a WebP o AVIF y servir el tamaño adecuado para cada pantalla suele ser la mejora de mayor impacto por menor esfuerzo. Definir ancho y alto de cada imagen además evita que la página salte mientras carga.',
      },
      {
        heading: 'Caché, plugins y base de datos',
        body: 'Sin caché, WordPress reconstruye cada página desde la base de datos en cada visita. Configurarla es de las mejoras más baratas en relación a su impacto. Después, revisá los plugins: el número importa menos que la calidad, y uno mal hecho puede pesar más que varios buenos juntos. Con los años, la base de datos también acumula revisiones de páginas y datos temporales que conviene limpiar.',
      },
      {
        heading: 'Scripts externos y tema',
        body: 'Chats, píxeles de publicidad, mapas y widgets de redes sociales cargan código de otros servidores que compite con tu sitio, sobre todo en celulares. Cargarlos de forma diferida, cuando el navegador queda libre, mejora la respuesta de la página sin perder la medición. Algunos temas, a su vez, cargan estilos y scripts de funciones que el sitio ni siquiera usa.',
      },
      {
        heading: 'Cuándo el problema es el hosting',
        body: 'Si el sitio sigue lento después de optimizar imágenes, caché y plugins, o se cae en horas de más tráfico, el hosting es la causa raíz. Una tienda WooCommerce en particular necesita más recursos que un sitio informativo, porque el carrito y el checkout no se pueden servir desde caché.',
      },
      {
        heading: 'Por dónde empezar',
        body: 'Corré PageSpeed Insights en la página de inicio y en tu página más visitada, anotá las tres métricas y aplicá las mejoras en el orden de la tabla. Volvé a medir después de cada cambio: así sabés qué funcionó y evitás cambiar de hosting o de tema cuando el problema eran las imágenes.',
      },
    ],
  },
  {
    _id: 'mock-pagina-web-vs-redes-sociales',
    title: '¿Página web o solo redes sociales? Lo que tu negocio realmente necesita',
    seoTitle: 'Página web o redes sociales: qué necesita tu negocio',
    slug: { current: 'pagina-web-o-redes-sociales-que-necesita-tu-negocio' },
    publishedAt: '2026-09-30',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/pagina-web-o-redes-sociales-que-necesita-tu-negocio.webp',
    excerpt: 'Instagram y Facebook sirven para que te descubran, pero no son tuyos. Por qué depender solo de redes es un riesgo y qué rol cumple una web propia.',
    tags: ['Estrategia', 'Redes sociales', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Muchos negocios en Chile venden solo por Instagram o WhatsApp, y les funciona — hasta que deja de funcionar. Las redes sociales son un gran canal para que te descubran, pero son terreno arrendado: las reglas, el alcance y hasta tu cuenta dependen de una empresa que no sos vos.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Un negocio necesita las dos cosas, pero no cumplen el mismo rol. Las redes sociales sirven para que te descubran y mantener el contacto; la página web es tuya, aparece cuando alguien busca en Google lo que vendés y concentra la información para convertir esa atención en consultas o ventas. Depender solo de redes es construir sobre terreno arrendado.',
      },
      {
        heading: 'Qué hace cada una',
        body: 'No compiten: se complementan.',
        table: {
          head: ['Criterio', 'Redes sociales', 'Página web'],
          rows: [
            ['De quién es', 'De la plataforma', 'Tuya'],
            ['Cómo te encuentran', 'Algoritmo y seguidores', 'Búsquedas en Google con intención de compra'],
            ['Alcance', 'Puede caer por un cambio de algoritmo', 'Crece con el contenido acumulado'],
            ['Información', 'Dispersa en publicaciones', 'Ordenada: servicios, catálogo, precios, contacto'],
            ['Medición', 'Métricas de la plataforma', 'Analítica completa de visitas y conversiones'],
            ['Riesgo', 'Cuenta suspendida o hackeada', 'Bajo, si está mantenida y respaldada'],
          ],
        },
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
      {
        heading: 'Cómo conectar ambas',
        body: 'El enlace de tu perfil puede llevar a una página pensada para quien llega desde redes, no a la portada. Cada publicación sobre un producto o servicio puede enlazar a su página con toda la información. Y en la web, un botón de WhatsApp visible y los perfiles de redes enlazados cierran el círculo. Medir cuántas visitas llegan desde cada red te dice dónde vale la pena invertir.',
      },
    ],
  },
  {
    _id: 'mock-landing-page-o-sitio-web',
    title: 'Landing page o sitio web completo: cuál necesitás y cuándo',
    seoTitle: 'Landing page o sitio web completo: cuál necesitás',
    slug: { current: 'landing-page-o-sitio-web-completo' },
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/landing-page-o-sitio-web-completo.webp',
    excerpt: 'Una landing page y un sitio web resuelven problemas distintos. Cómo saber cuál conviene según tu objetivo, tu presupuesto y la etapa de tu negocio.',
    tags: ['Estrategia', 'Landing page', 'Guía'],
    sections: [
      {
        heading: '',
        body: 'Una landing page es una sola página con un solo objetivo: que el visitante haga una acción concreta, como dejar sus datos o comprar un producto. Un sitio web completo tiene varias secciones y sirve para presentar el negocio entero. Elegir mal no es grave, pero sí puede significar pagar por algo que no necesitás todavía, o quedarte corto.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Elegí una landing page si tenés un solo objetivo, una campaña pagada o una idea por validar, y necesitás algo en 1 a 2 semanas. Elegí un sitio web completo si ofrecés varios servicios, querés aparecer en Google para distintas búsquedas o necesitás mostrar trayectoria. Se puede empezar con una landing y crecer después, si la base técnica lo permite.',
      },
      {
        heading: 'Comparativa',
        body: 'Las diferencias que más importan al decidir.',
        table: {
          head: ['Criterio', 'Landing page', 'Sitio web completo'],
          rows: [
            ['Objetivo', 'Una sola acción: contacto, compra o registro', 'Presentar el negocio completo'],
            ['Páginas', 'Una', 'Varias: servicios, empresa, proyectos, contacto'],
            ['Plazo típico', '1 a 2 semanas', '3 a 5 semanas'],
            ['Tráfico ideal', 'Campañas pagadas y redes sociales', 'Búsquedas orgánicas en Google'],
            ['SEO', 'Una búsqueda principal', 'Muchas búsquedas, una por página'],
            ['Crecimiento', 'Limitado, salvo que sea la base de un sitio', 'Se le suman páginas y contenido'],
          ],
        },
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
      {
        heading: 'Qué tiene una landing que convierte',
        body: 'Un titular que diga en una frase qué ofrecés y para quién, un solo llamado a la acción repetido a lo largo de la página, beneficios concretos en vez de características, pruebas de confianza (clientes, testimonios, cifras), respuesta a las objeciones más comunes y un formulario o botón de WhatsApp sin fricción. Todo lo que distrae de esa acción, sobra.',
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
    updatedAt: '2026-10-01',
    coverUrl: '/images/blog/que-necesitas-antes-de-encargar-tu-pagina-web.webp',
    excerpt: 'Los proyectos web no se atrasan por el desarrollo, sino por el contenido. Lo que conviene tener listo para que tu sitio salga a tiempo.',
    tags: ['Guía', 'Proceso', 'Contenido'],
    sections: [
      {
        heading: '',
        body: 'El cuello de botella más común en un proyecto web no es el diseño ni la programación: es esperar textos, fotos o accesos que el cliente todavía no tiene. Preparar esto antes de empezar acorta semanas el proyecto y mejora el resultado final.',
      },
      {
        heading: 'Respuesta corta',
        body: 'Antes de encargar tu página web, tené listo: el objetivo del sitio y a quién apunta, el logo en buena calidad, los textos de cada servicio o producto, fotos propias, los accesos al dominio y hosting si ya existen, y dos o tres sitios de referencia. Con eso resuelto, el proyecto puede acortarse en semanas.',
      },
      {
        heading: 'Checklist',
        body: 'Qué preparar, en qué formato y qué hacer si todavía no lo tenés.',
        table: {
          head: ['Qué', 'Formato ideal', 'Si todavía no lo tenés'],
          rows: [
            ['Logo', 'Vector: SVG, AI o PDF', 'Resolver la identidad antes o como parte del proyecto'],
            ['Textos', 'Un documento por página o servicio', 'Contratar redacción, pero la información base la das vos'],
            ['Fotos', 'Propias, en alta resolución', 'Una sesión de fotos o, como último recurso, banco de imágenes'],
            ['Dominio', 'A nombre de tu empresa', 'Registrarlo (por ejemplo, el .cl en NIC Chile)'],
            ['Hosting', 'Accesos al panel', 'Elegirlo junto con quien construye el sitio'],
            ['Referencias', '2 o 3 sitios con lo que te gusta y lo que no', 'Revisar sitios de tu competencia'],
          ],
        },
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
      {
        heading: 'Accesos que conviene ordenar',
        body: 'Además del dominio y el hosting, reuní los accesos a las cuentas que se van a conectar al sitio: Google (para Analytics, Search Console y el perfil de empresa), redes sociales, pasarela de pago si vas a vender y la herramienta de email marketing si usás una. Que todas estén a nombre de la empresa, con un correo corporativo y no personal, evita problemas cuando alguien deja el equipo.',
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
