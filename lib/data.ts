export type Service = {
  icon: string;
  name: string;
  description: string;
  schedule: string;
  /** Link externo a la foto de portada (se pega desde el panel de administración, ej. un link de Google Imágenes). */
  image?: string;
};

export const services: Service[] = [
  {
    icon: "💪",
    name: "Musculación",
    description: "Zona de pesas libres y máquinas de última generación para ganar fuerza y volumen.",
    schedule: "Lun - Dom, 05:00 - 23:00",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "🔥",
    name: "CrossFit",
    description: "Entrenamiento funcional de alta intensidad en grupo, con coach certificado.",
    schedule: "Lun - Sáb, 06:00 - 21:00",
    image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "🧘",
    name: "Yoga",
    description: "Clases de flexibilidad, respiración y equilibrio para cuerpo y mente.",
    schedule: "Mar - Dom, 07:00 - 19:00",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "🚴",
    name: "Spinning",
    description: "Cardio intenso al ritmo de la música en nuestras bicicletas indoor premium.",
    schedule: "Lun - Vie, 06:00 - 20:00",
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "🥊",
    name: "Box",
    description: "Técnica de boxeo y kickboxing para mejorar resistencia, fuerza y coordinación.",
    schedule: "Lun - Sáb, 08:00 - 21:00",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "💃",
    name: "Zumba",
    description: "Baile fitness dinámico y divertido para quemar calorías al ritmo latino.",
    schedule: "Lun, Mié, Vie, 18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "🏃",
    name: "Entrenamiento Funcional",
    description: "Ejercicios multiarticulares que mejoran fuerza, movilidad y rendimiento diario.",
    schedule: "Lun - Dom, 06:00 - 22:00",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: "🏆",
    name: "Personal Training",
    description: "Entrenamiento 1 a 1 totalmente personalizado según tus objetivos.",
    schedule: "Con cita previa",
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80&auto=format&fit=crop",
  },
];

export type Plan = {
  name: string;
  icon: string;
  priceMonthly: number;
  featured?: boolean;
  benefits: { text: string; included: boolean }[];
};

export const plans: Plan[] = [
  {
    name: "Básico",
    icon: "💰",
    priceMonthly: 29,
    benefits: [
      { text: "Acceso a zona de pesas y cardio", included: true },
      { text: "Horario limitado (6:00 - 16:00)", included: true },
      { text: "1 clase grupal por semana", included: true },
      { text: "Casillero incluido", included: false },
      { text: "Entrenador personal", included: false },
      { text: "Acceso a las 3 sedes", included: false },
    ],
  },
  {
    name: "Premium",
    icon: "⭐",
    priceMonthly: 49,
    featured: true,
    benefits: [
      { text: "Acceso ilimitado a instalaciones", included: true },
      { text: "Horario completo (5:00 - 23:00)", included: true },
      { text: "Clases grupales ilimitadas", included: true },
      { text: "Casillero incluido", included: true },
      { text: "1 sesión de personal training/mes", included: true },
      { text: "Acceso a las 3 sedes", included: false },
    ],
  },
  {
    name: "VIP",
    icon: "👑",
    priceMonthly: 79,
    benefits: [
      { text: "Acceso ilimitado a instalaciones", included: true },
      { text: "Horario completo 24/7", included: true },
      { text: "Clases grupales ilimitadas", included: true },
      { text: "Casillero + toalla incluidos", included: true },
      { text: "4 sesiones de personal training/mes", included: true },
      { text: "Acceso a las 3 sedes", included: true },
    ],
  },
];

export type Trainer = {
  name: string;
  specialty: string;
  certification: string;
  initials: string;
  /** Link externo a la foto real (se pega desde el panel de administración, ej. un link de Google Imágenes). */
  photo?: string;
};

export const trainers: Trainer[] = [
  { name: "Carlos Ramírez", specialty: "Musculación y Fuerza", certification: "NSCA-CPT", initials: "CR", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&q=80&auto=format&fit=crop" },
  { name: "Valeria Torres", specialty: "CrossFit y Funcional", certification: "CrossFit Level 2", initials: "VT", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80&auto=format&fit=crop" },
  { name: "Diego Fernández", specialty: "Boxeo y Kickboxing", certification: "AIBA Certified", initials: "DF", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80&auto=format&fit=crop" },
  { name: "Ana Morales", specialty: "Yoga y Movilidad", certification: "RYT-500", initials: "AM", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&q=80&auto=format&fit=crop" },
  { name: "Jorge Castillo", specialty: "Personal Training", certification: "ACE-CPT", initials: "JC", photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&q=80&auto=format&fit=crop" },
  { name: "Lucía Herrera", specialty: "Spinning y Cardio", certification: "Schwinn Certified", initials: "LH", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&q=80&auto=format&fit=crop" },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Mariana López",
    role: "Miembro Premium — 2 años",
    quote:
      "Baje 15 kilos en 6 meses gracias al plan personalizado y al apoyo constante de los entrenadores. El ambiente es increíble.",
    rating: 5,
    initials: "ML",
  },
  {
    name: "Roberto Sánchez",
    role: "Miembro VIP — 3 años",
    quote:
      "Las instalaciones son de primer nivel y siempre están limpias. Los coaches realmente se preocupan por tu progreso.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Camila Rojas",
    role: "Miembro Básico — 8 meses",
    quote:
      "Empecé sin experiencia y hoy entreno con mucha confianza. Las clases de CrossFit cambiaron mi forma de ver el ejercicio.",
    rating: 5,
    initials: "CR",
  },
  {
    name: "Andrés Paredes",
    role: "Miembro Premium — 1 año",
    quote:
      "El horario extendido me permite entrenar antes del trabajo. La app y el proceso de reserva de clases son muy sencillos.",
    rating: 4,
    initials: "AP",
  },
];

export type GalleryImage = {
  id: number;
  label: string;
  /** Link externo a la foto real (se pega desde el panel de administración, ej. un link de Google Imágenes). */
  src?: string;
};

export const galleryImages: GalleryImage[] = [
  { id: 1, label: "Zona de Pesas Libres", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop" },
  { id: 2, label: "Clase de CrossFit", src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80&auto=format&fit=crop" },
  { id: 3, label: "Área de Cardio", src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80&auto=format&fit=crop" },
  { id: 4, label: "Estudio de Yoga", src: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?w=800&q=80&auto=format&fit=crop" },
  { id: 5, label: "Ring de Boxeo", src: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&q=80&auto=format&fit=crop" },
  { id: 6, label: "Zona Funcional", src: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80&auto=format&fit=crop" },
  { id: 7, label: "Transformación — Antes y Después", src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80&auto=format&fit=crop" },
  { id: 8, label: "Clase Grupal de Spinning", src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80&auto=format&fit=crop" },
  { id: 9, label: "Entrenamiento Personalizado", src: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&q=80&auto=format&fit=crop" },
];

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/planes", label: "Planes" },
  { href: "/entrenadores", label: "Entrenadores" },
  { href: "/resenas", label: "Reseñas" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
];

export const about = {
  intro:
    "Power Fitness Gym nació hace más de 5 años con un propósito simple: ayudar a las personas a alcanzar su mejor versión a través del entrenamiento, la constancia y una comunidad que las impulsa a superar sus límites. Hoy somos más de 2,000 miembros activos, con instalaciones de primer nivel y un equipo de entrenadores certificados internacionalmente.",
  mission:
    "Brindar un espacio de entrenamiento accesible, seguro y motivador, con instalaciones de primer nivel y entrenadores certificados que acompañen a cada miembro en su proceso de transformación física y personal.",
  vision:
    "Ser el gimnasio de referencia en la ciudad, reconocido por la calidad de sus instalaciones, el profesionalismo de su equipo y el impacto real en la vida de nuestra comunidad.",
};

export type Value = {
  icon: string;
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    icon: "🤝",
    title: "Compromiso",
    description: "Nos comprometemos con cada meta que te propongas, dentro y fuera del gimnasio.",
  },
  {
    icon: "🔥",
    title: "Disciplina",
    description: "Creemos en la constancia como el camino más corto hacia resultados reales.",
  },
  {
    icon: "👥",
    title: "Comunidad",
    description: "Construimos un ambiente donde todos se sienten motivados a superarse juntos.",
  },
  {
    icon: "🏆",
    title: "Excelencia",
    description: "Instalaciones de primer nivel y entrenadores certificados internacionalmente.",
  },
  {
    icon: "✨",
    title: "Respeto",
    description: "Un espacio inclusivo para cada nivel, edad y objetivo.",
  },
  {
    icon: "🚀",
    title: "Superación",
    description: "Te acompañamos a romper tus propios límites, un entrenamiento a la vez.",
  },
];

export type UserSegment = {
  segment: string;
  description: string;
  mainNeed: string;
  expectedAction: string;
};

export const userSegments: UserSegment[] = [
  {
    segment: "Principiante en fitness",
    description: "Nunca ha entrenado o retoma la actividad física después de un tiempo.",
    mainNeed: "Guía, seguridad y motivación desde el primer día",
    expectedAction: "Agendar una clase de evaluación gratuita",
  },
  {
    segment: "Deportista experimentado",
    description: "Entrena de forma regular y busca resultados medibles de fuerza y rendimiento.",
    mainNeed: "Equipamiento avanzado y planes de entrenamiento exigentes",
    expectedAction: "Elegir el plan Premium o VIP",
  },
  {
    segment: "Profesional con poco tiempo",
    description: "Agenda laboral ajustada, busca entrenar de forma eficiente.",
    mainNeed: "Horarios flexibles y clases de alta intensidad y corta duración",
    expectedAction: "Reservar el horario que se adapte a su agenda",
  },
  {
    segment: "Estudiante",
    description: "Presupuesto limitado, busca comunidad y un ambiente motivador.",
    mainNeed: "Precio accesible y beneficios básicos completos",
    expectedAction: "Elegir el plan Básico",
  },
  {
    segment: "Adulto mayor / rehabilitación",
    description: "Busca mejorar su salud y movilidad de forma segura y guiada.",
    mainNeed: "Entrenamiento personalizado y de bajo impacto",
    expectedAction: "Agendar sesión con un entrenador personal",
  },
  {
    segment: "Empresa / corporativo",
    description: "Busca bienestar físico para sus colaboradores como beneficio laboral.",
    mainNeed: "Planes grupales y convenios corporativos",
    expectedAction: "Contactar para solicitar una cotización empresarial",
  },
];
