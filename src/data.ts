import bakingImage from '../app/assets/images/baking-recipe-keeper-screen.jpg'
import weatherImage from '../app/assets/images/gweather.png'
import budgetImage from '../app/assets/images/budgetcalculator.png'

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const capabilities = [
  'Mobile App Development',
  'Payments Integration',
  'Fullstack Web Development',
  'REST API Integration',
  'AI Integration',
  'CI/CD & Build Automation',
]

export const tools = [
  { group: 'Mobile', tools: 'Kotlin, Java, Android, Jetpack Compose, MVVM' },
  { group: 'Web', tools: 'Ruby on Rails, Hotwire, JavaScript, Tailwind, Alpine.js' },
  { group: 'Database', tools: 'PostgreSQL, Room' },
  { group: 'Integration', tools: 'REST APIs, Retrofit, Firebase Crashlytics, Google Analytics' },
  { group: 'AI', tools: 'GitHub Copilot, Claude Code' },
  { group: 'DevOps', tools: 'Azure DevOps, CI/CD, Git' },
  { group: 'Workflow', tools: 'Agile Development' },
]

export interface Project {
  title: string
  tags: string[]
  description: string
  github: string
  live: string
  liveLabel: string
  image: string
  mobile?: boolean
}

export const projects: Project[] = [
  {
    title: 'Baking Recipe Keeper',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room'],
    description: 'A warm, offline-first Android app to save, scale, and follow baking recipes. Live serving & unit conversion, favorites and tags, shopping lists, a photo/video gallery, and backup & restore - built with Jetpack Compose, MVVM + StateFlow, and Room.',
    github: 'https://github.com/lfigueras/Baking-Recipe-Keeper',
    live: 'https://github.com/lfigueras/Baking-Recipe-Keeper/releases/download/v1.1/BakingRecipeKeeper-v1.1.apk',
    liveLabel: 'Download APK',
    image: bakingImage,
    mobile: true,
  },
  {
    title: 'GWeather',
    tags: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Room'],
    description: 'A real-time Android weather app built with Jetpack Compose and MVVM that pulls live forecasts from the OpenWeather API (Retrofit/Moshi), with location services and a locally stored history of weather reports in Room.',
    github: 'https://github.com/lfigueras/GWeather',
    live: 'https://github.com/lfigueras/GWeather/releases/download/v0.1.0/Gweather-v0.1.0.apk',
    liveLabel: 'Download APK',
    image: weatherImage,
    mobile: true,
  },
  {
    title: 'Budgety',
    tags: ['JavaScript', 'HTML', 'CSS'],
    description: 'A budgeting web app for tracking income and expenses with automatic balance and percentage calculations. Built in vanilla JavaScript using the module pattern with a clean, DOM-driven UI.',
    github: 'https://github.com/lfigueras/Budgety-JS',
    live: 'https://lfigueras.github.io/Budgety-JS/',
    liveLabel: 'Live Demo',
    image: budgetImage,
  },
]