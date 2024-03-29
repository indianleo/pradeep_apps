import i18n from 'i18n-js';

import en from '../../locales/en.json';
import vi from '../../locales/vi.json';
import sp from '../../locales/sp.json';

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = {en};

export default i18n;