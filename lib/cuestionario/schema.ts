import { z } from 'zod'

export const PROJECT_TYPES = ['Sitio nuevo', 'Rediseño', 'Tienda online', 'Landing page', 'Otro'] as const
export const YES_NO_UNSURE = ['Sí', 'No', 'No sé'] as const
export const LOGO_OPTIONS = ['Sí, tengo logo', 'No, necesito uno', 'Tengo, pero quiero renovarlo'] as const
export const COPY_OPTIONS = ['Sí, tengo los textos', 'No, necesito ayuda redactando', 'Algo tengo, falta pulir'] as const
export const IMAGES_OPTIONS = ['Tengo fotos/videos propios', 'Necesito banco de imágenes', 'Ambos'] as const
export const MAINTENANCE_OPTIONS = ['Sí', 'No', 'Tal vez más adelante'] as const
export const WEBSITE_OBJECTIVES = ['Captar leads/contactos', 'Solo información', 'Posicionar marca y visibilidad', 'Prestación de servicios online', 'Otra'] as const
export const TONE_PREFERENCE = ['Claro / limpio', 'Oscuro / profundo', 'Mixto / sin preferencia'] as const
export const TYPOGRAPHY_STYLE = ['Serif (clásica, elegante)', 'Sans Serif (moderna, limpia)', 'Handwritten (cercana, creativa)', 'Mixta', 'Sin preferencia'] as const

export const SECTION_OPTIONS = [
  'Inicio', 'Sobre nosotros', 'Servicios/Productos', 'Portafolio/Galería', 'Blog',
  'Testimonios', 'Preguntas frecuentes', 'Contacto', 'Tienda online', 'Reservas/Agenda', 'Otro',
]

export const FEATURE_OPTIONS = [
  'Formulario de contacto', 'Chat/WhatsApp', 'Newsletter', 'Multi-idioma',
  'Integración redes sociales', 'Reservas online', 'Blog', 'Área de clientes', 'Otro',
]

export const STYLE_OPTIONS = [
  'Minimalista', 'Corporativo / Serio', 'Moderno / Tech', 'Elegante / Lujoso',
  'Colorido / Playful', 'Rústico / Artesanal', 'Oscuro / Bold', 'Cálido / Cercano', 'Otro',
]

export const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values).or(z.literal('')).optional()

const attachmentSchema = z.object({
  name: z.string(),
  type: z.string(),
  base64: z.string().max(Math.ceil(MAX_ATTACHMENT_BYTES / 3) * 4, 'Archivo muy grande'),
}).optional()

export const cuestionarioSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  company: z.string().optional(),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  industry: z.string().optional(),
  projectType: optionalEnum(PROJECT_TYPES),

  // ADN de marca
  personalityDescription: z.string().optional(),
  coreValues: z.string().optional(),
  valueProposition: z.string().optional(),
  languages: z.string().optional(),

  // Objetivos
  mainGoal: z.string().min(10, 'Cuéntame un poco más sobre el objetivo'),
  targetAudience: z.string().optional(),
  websiteObjective: optionalEnum(WEBSITE_OBJECTIVES),
  mainCTA: z.string().optional(),
  secondaryCTA: z.string().optional(),

  // Estructura y funcionalidades
  pagesEstimate: z.string().optional(),
  sections: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  hasDomain: optionalEnum(YES_NO_UNSURE),
  domainName: z.string().optional(),
  hasHosting: optionalEnum(YES_NO_UNSURE),

  // Contenido
  hasLogo: optionalEnum(LOGO_OPTIONS),
  hasCopy: optionalEnum(COPY_OPTIONS),
  hasImages: optionalEnum(IMAGES_OPTIONS),
  brandManualLink: z.string().optional(),
  brandManualFile: attachmentSchema,

  // Diseño y estilo
  colorPalette: z.string().optional(),
  colorsToAvoid: z.string().optional(),
  tonePreference: optionalEnum(TONE_PREFERENCE),
  fonts: z.string().optional(),
  typographyStyle: optionalEnum(TYPOGRAPHY_STYLE),
  stylePreferences: z.array(z.string()).optional(),
  ref1Url: z.string().optional(),
  ref1Notes: z.string().optional(),
  ref2Url: z.string().optional(),
  ref2Notes: z.string().optional(),
  ref3Url: z.string().optional(),
  ref3Notes: z.string().optional(),
  dislikedSites: z.string().optional(),
  comp1Url: z.string().optional(),
  comp1Notes: z.string().optional(),
  comp2Url: z.string().optional(),
  comp2Notes: z.string().optional(),
  comp3Url: z.string().optional(),
  comp3Notes: z.string().optional(),

  // Técnico
  needsSEO: optionalEnum(YES_NO_UNSURE),
  keywords: z.string().optional(),
  wantsMaintenance: optionalEnum(MAINTENANCE_OPTIONS),

  // Logística
  deadline: z.string().optional(),
  decisionMaker: z.string().optional(),
  additionalNotes: z.string().optional(),

  honeypot: z.string().max(0),
})

export type CuestionarioData = z.infer<typeof cuestionarioSchema>
