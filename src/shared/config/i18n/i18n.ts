// import i18next from 'i18next';
// import Backend from 'i18next-http-backend';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// i18next
//     .use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         fallbackLng: 'ru',
//         debug: __IS_DEV__,

//         interpolation: {
//             escapeValue: false,
//         },

// backend: {
//     loadPath: '/locales/{{lng}}/{{ns}}.json',
// },
// backend: {
//     loadPath: () => {
//         const isStorybook = window.location.pathname.includes('storybook-static');
//         return isStorybook
//             ? '/storybook-static/locales/{{lng}}/{{ns}}.json'
//             : '/locales/{{lng}}/{{ns}}.json';
//     },
// },
// });

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// export default i18next;

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    // lng: 'en',
        fallbackLng: 'en',
        // debug: __IS_DEV__,
        debug: true,
        load: 'languageOnly',

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        keySeparator: false,
    });

export default i18n;
