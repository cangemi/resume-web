import { ref } from 'vue'

export type Lang = 'pt' | 'en'

export const lang = ref<Lang>('pt')

export function setLang(l: Lang) {
  lang.value = l
}

const translations: Record<Lang, Record<string, string>> = {
  pt: {
    introHeading: 'OLÁ, MUNDO!',
    introParagraph:
      'Eu sou <span class="emphasis">Pedro Cangemi</span>,<br />Desenvolvedor <span class="keyWord">Full Stack</span> focado em transformar ideias em soluções digitais reais, bem estruturadas e eficientes.',
    scrollNote: 'Saiba mais sobre minha trajetória',
    contactCTA: 'VAMOS CONVERSAR?',
  },
  en: {
    introHeading: 'HELLO, WORLD!',
    introParagraph:
      'I am <span class="emphasis">Pedro Cangemi</span>,<br />a <span class="keyWord">Full Stack</span> developer focused on turning ideas into real, well-structured and efficient digital solutions.',
    scrollNote: 'Learn more about my background',
    contactCTA: "LET'S TALK?",
  },
}

export function t(key: string) {
  return translations[lang.value]?.[key] ?? key
}

export default {
  lang,
  setLang,
  t,
}
