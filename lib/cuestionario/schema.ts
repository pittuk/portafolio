import { z } from 'zod'

export const PROJECT_TYPES = ['Sitio nuevo', 'Rediseño', 'Tienda online', 'Landing page', 'Otro'] as const
export const YES_NO_UNSURE = ['Sí', 'No', 'No sé'] as const
export const LOGO_OPTIONS = ['Sí, tengo logo', 'No, necesito uno', 'Tengo, pero quiero renovarlo'] as const
export const COPY_OPTIONS = ['Sí, tengo los textos', 'No, necesito ayuda redactando', 'Algo tengo, falta pulir'] as const
export const IMAGES_OPTIONS = ['Tengo fotos/videos propios', 'Necesito banco de imágenes', 'Ambos'] as const
export const MAINTENANCE_OPTIONS = ['Sí', 'No', 'Tal vez más adelante'] as const

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

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values).or(z.literal('')).optional()

export const cuestionarioSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  company: z.string().optional(),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  industry: z.string().optional(),
  projectType: optionalEnum(PROJECT_TYPES),

  mainGoal: z.string().min(10, 'Cuéntame un poco más sobre el objetivo'),
  targetAudience: z.string().optional(),
  mainCTA: z.string().optional(),

  pagesEstimate: z.string().optional(),
  sections: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  hasDomain: optionalEnum(YES_NO_UNSURE),
  domainName: z.string().optional(),
  hasHosting: optionalEnum(YES_NO_UNSURE),

  hasLogo: optionalEnum(LOGO_OPTIONS),
  hasCopy: optionalEnum(COPY_OPTIONS),
  hasImages: optionalEnum(IMAGES_OPTIONS),

  colorPalette: z.string().optional(),
  fonts: z.string().optional(),
  stylePreferences: z.array(z.string()).optional(),
  likedSites: z.string().optional(),
  dislikedSites: z.string().optional(),
  competitorSites: z.string().optional(),

  needsSEO: optionalEnum(YES_NO_UNSURE),
  keywords: z.string().optional(),
  wantsMaintenance: optionalEnum(MAINTENANCE_OPTIONS),

  deadline: z.string().optional(),
  decisionMaker: z.string().optional(),
  additionalNotes: z.string().optional(),

  honeypot: z.string().max(0),
})

export type CuestionarioData = z.infer<typeof cuestionarioSchema>
