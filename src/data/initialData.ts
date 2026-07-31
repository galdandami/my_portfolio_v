import { Achievement, ProfileInfo } from '../types';

export const defaultProfile: ProfileInfo = {
  name: {
    ru: 'Галиуллин Данис Дамирович',
    en: 'Galiullin Danis Damirovich',
  },
  nameFontEn: 'font-outfit',
  title: {
    ru: 'Senior Frontend Developer & UI/UX Архитектор',
    en: 'Senior Frontend Developer & UI/UX Architect',
  },
  bio: {
    ru: 'Создаю масштабируемые веб-приложения, премиальные интерфейсы и интерактивные цифровые продукты с акцентом на высокую производительность и элегантный дизайн.',
    en: 'Building scalable web applications, premium interfaces, and interactive digital products with a focus on high performance and refined design.',
  },
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  location: {
    ru: 'Казань / Удаленно',
    en: 'Kazan / Remote',
  },
  contactEmail: 'alex.orlov.dev@example.com',
  socials: {
    github: 'https://github.com',
    telegram: 'https://t.me',
    linkedin: 'https://linkedin.com',
  },
};

export const sampleAchievements: Achievement[] = [
  // Вкладка 1: Примеры работ (сайты и приложения)
  {
    id: 'ach-1',
    type: 'project',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    date: '2025-11-15',
    order: 0,
    title: {
      ru: 'Платформа цифровой коммерции "NexStore"',
      en: 'E-Commerce Platform "NexStore"',
    },
    shortDesc: {
      ru: 'Высоконагруженный интернет-магазин с персональными рекомендациями на базе ИИ.',
      en: 'High-load online store featuring AI-powered personalized product recommendations.',
    },
    fullDesc: {
      ru: 'Разработал архитектуру фронтенда для маркетплейса с посещаемостью более 500 тыс. пользователей в день. Интегрировал микрофронтенды на React и Module Federation, оптимизировал показатель LCP с 3.8с до 0.9с и повысил конверсию корзины на 24%.',
      en: 'Architected the frontend for a high-traffic marketplace serving 500k+ daily active users. Integrated React micro-frontends with Module Federation, optimized LCP from 3.8s down to 0.9s, and increased cart checkout conversion by 24%.',
    },
    category: {
      ru: 'Веб-сервис',
      en: 'Web Platform',
    },
    linkUrl: 'https://example.com/project-1',
  },
  {
    id: 'ach-2',
    type: 'project',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    date: '2025-08-20',
    order: 1,
    title: {
      ru: 'Финтех Дашборд "Alpha Analytics"',
      en: 'Fintech Dashboard "Alpha Analytics"',
    },
    shortDesc: {
      ru: 'Аналитический терминал для трейдинга и визуализации данных в реальном времени.',
      en: 'Analytical trading terminal with real-time data streaming and custom charts.',
    },
    fullDesc: {
      ru: 'Создал интерактивную систему визуализации финансовых показателей с использованием Canvas2D и WebSockets. Достиг плавной отрисовки графиков на 60 FPS при обновлении 10,000 котировок в секунду.',
      en: 'Built an interactive financial visualization suite using Canvas2D and WebSockets. Achieved fluid 60 FPS rendering while streaming 10,000 tickers per second.',
    },
    category: {
      ru: 'Финтех',
      en: 'Fintech',
    },
    linkUrl: 'https://example.com/project-2',
  },
  {
    id: 'ach-3',
    type: 'project',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1200',
    date: '2025-03-10',
    order: 2,
    title: {
      ru: 'Мобильное приложение "Aura Health"',
      en: 'Mobile App "Aura Health"',
    },
    shortDesc: {
      ru: 'Приложение для трекинга привычек и ментального здоровья с адаптивным UI.',
      en: 'Habit tracker and mental health wellness companion app with adaptive UI.',
    },
    fullDesc: {
      ru: 'Разработал кроссплатформенное приложение на React Native. Внедрил биометрическую аутентификацию, офлайн-синхронизацию данных с CRDT и красивую темно-неоновую тему.',
      en: 'Developed a cross-platform React Native app. Integrated biometric authentication, offline synchronization with CRDT, and a sleek dark neon fluid theme.',
    },
    category: {
      ru: 'Мобильная разработка',
      en: 'Mobile App',
    },
    linkUrl: 'https://example.com/project-3',
  },
  {
    id: 'ach-4',
    type: 'project',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    date: '2024-11-05',
    order: 3,
    title: {
      ru: 'UI Kit & Дизайн-система "CyberDesign"',
      en: 'UI Kit & Design System "CyberDesign"',
    },
    shortDesc: {
      ru: 'Корпоративная библиотека компонентов с поддержкой доступности (a11y).',
      en: 'Enterprise design system and component library with built-in accessibility.',
    },
    fullDesc: {
      ru: 'Спроектировал и написал библиотеки из 60+ компонентов на React, Tailwind CSS и Storybook. Опубликовал в приватном npm-реестре компании, сократив время разработки новых фич на 40%.',
      en: 'Designed and built a library of 60+ components with React, Tailwind CSS, and Storybook. Published to private npm registry, reducing frontend development time by 40%.',
    },
    category: {
      ru: 'Дизайн-система',
      en: 'Design System',
    },
  },

  // Вкладка 2: Дипломы, грамоты, благодарственные письма
  {
    id: 'ach-5',
    type: 'certificate',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1200',
    date: '2025-10-12',
    order: 4,
    title: {
      ru: 'Диплом I степени "Цифровой Прорыв 2025"',
      en: 'Diploma of 1st Degree "Digital Breakthrough 2025"',
    },
    shortDesc: {
      ru: 'Награжден 1-м местом в номинации "Лучшая архитектура веб-приложений и AI-интеграция".',
      en: 'Awarded 1st place in "Best Web Architecture & AI Integration" category.',
    },
    fullDesc: {
      ru: 'Победитель всероссийского хакатона. За 48 часов команда под моим техническим руководством спроектировала и запустила высоконагруженный сервис с автоматической генерацией кода и поддержкой real-time WebSockets.',
      en: 'Winner of the national hackathon. Within 48 hours, my team designed and deployed a high-scale service featuring automated code generation and real-time WebSockets.',
    },
    category: {
      ru: 'Диплом I степени',
      en: 'First-Class Diploma',
    },
  },
  {
    id: 'ach-6',
    type: 'certificate',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    date: '2025-05-18',
    order: 5,
    title: {
      ru: 'Почетная грамота "DevCup Web Excellence"',
      en: 'Certificate of Honor "DevCup Web Excellence"',
    },
    shortDesc: {
      ru: 'Грамота за выдающийся UI/UX дизайн и создание стандартов веб-доступности.',
      en: 'Awarded for exceptional UI/UX design and promoting web accessibility standards.',
    },
    fullDesc: {
      ru: 'Занял 1-е место в открытом конкурсе IT-разработчиков. Особо отмечены плавность анимаций, математическая точность типографики и адаптивность интерфейса на всех типах устройств.',
      en: 'Achieved 1st place in open IT engineering cup. Recognized for ultra-fluid animations, mathematical typography precision, and flawless multi-device responsiveness.',
    },
    category: {
      ru: 'Почетная грамота',
      en: 'Certificate of Honor',
    },
  },
  {
    id: 'ach-7',
    type: 'certificate',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200',
    date: '2024-12-20',
    order: 6,
    title: {
      ru: 'Благодарственное письмо IT-парка Казани',
      en: 'Official Commendation from Kazan IT-Park',
    },
    shortDesc: {
      ru: 'Благодарность за вклад в развитие сообщества и проведение мастер-классов.',
      en: 'Letter of gratitude for community mentorship and leading developer workshops.',
    },
    fullDesc: {
      ru: 'Официальное благодарственное письмо руководства IT-парка за проведение цикла обучающих интенсивов по масштабируемому Frontend и подготовку молодых IT-специалистов.',
      en: 'Official letter of appreciation from IT-Park directors for conducting scalable frontend engineering bootcamps and mentoring junior developers.',
    },
    category: {
      ru: 'Благодарственное письмо',
      en: 'Letter of Gratitude',
    },
  },
  {
    id: 'ach-8',
    type: 'certificate',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    date: '2024-06-14',
    order: 7,
    title: {
      ru: 'Сертификат "Senior Frontend & Cloud Architect"',
      en: 'Certificate "Senior Frontend & Cloud Architect"',
    },
    shortDesc: {
      ru: 'Международный сертификат подтверждения глубоких экспертиз в TypeScript и React.',
      en: 'International certification confirming deep expertise in TypeScript and React architecture.',
    },
    fullDesc: {
      ru: 'Успешно сдал комплексный квалификационный экзамен по веб-оптимизации, реактивным архитектурам, безопасности клиентских приложений и работе с облачной инфраструктурой.',
      en: 'Successfully passed advanced certification exam covering web optimization, reactive architectures, client security, and cloud deployment pipelines.',
    },
    category: {
      ru: 'Сертификат',
      en: 'Professional Certificate',
    },
  },
];
