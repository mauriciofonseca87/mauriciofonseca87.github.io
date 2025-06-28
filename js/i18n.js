const I18N = (function () {
    const defaultLang = 'es';
    const supportedLangs = ['es', 'en'];
    const storageLangKey = 'selectedLang';
    const storageTransKey = 'translations';
    const storageVersionKey = 'langVersion';
    const storageLastFetchKey = 'lastLangFetchDate';

    async function init() {

        const savedLang = localStorage.getItem(storageLangKey);
        const savedTranslations = localStorage.getItem(storageTransKey);
        const lastFetchDate = localStorage.getItem(storageLastFetchKey);

        const browserLang = navigator.language.slice(0, 2);
        const lang = savedLang || (supportedLangs.includes(browserLang) ? browserLang : defaultLang);

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        const shouldFetch = lastFetchDate !== today;

        if (!shouldFetch && savedTranslations && savedLang === lang) {
            applyTranslations(JSON.parse(savedTranslations));
            return;
        }

        try {
            const response = await fetch(`/lang/${lang}.json`);
            const remoteData = await response.json();
            const remoteVersion = remoteData.version || '0.0.0';

            saveLanguageData(lang, remoteData, remoteVersion, today);
            applyTranslations(remoteData);
        } catch (err) {
            console.error(`Error cargando ${lang}.json`, err);
            if (savedTranslations) {
                applyTranslations(JSON.parse(savedTranslations));
            }
        }
    }

    function saveLanguageData(lang, data, version, fetchDate) {
        localStorage.setItem(storageLangKey, lang);
        localStorage.setItem(storageTransKey, JSON.stringify(data));
        localStorage.setItem(storageVersionKey, version);
        localStorage.setItem(storageLastFetchKey, fetchDate || new Date().toISOString().split('T')[0]);
    }

    function setLanguage(lang) {
        fetch(`/lang/${lang}.json`)
            .then(res => res.json())
            .then(data => {
                const version = data.version || '0.0.0';
                const today = new Date().toISOString().split('T')[0];
                saveLanguageData(lang, data, version, today);
                applyTranslations(data);
                //location.reload(); // Si quieres que no recargue, puedes actualizar dinámicamente en lugar de recargar
            })
            .catch(err => console.error(`Error cargando ${lang}.json`, err));
    }

    function applyTranslations(data) {
        Object.keys(data).forEach(section => {
            const value = data[section];

            if (section === 'home' && value && Array.isArray(value.phrases)) {
                const phraseContainer = document.getElementById('phraseContainer');
                if (phraseContainer) {
                    const randomIndex = Math.floor(Math.random() * value.phrases.length);
                    phraseContainer.textContent = value.phrases[randomIndex];
                }
            }

            if (typeof value === 'object') {
                Object.keys(value).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.textContent = value[key];
                    }
                });
            }
        });
    }

    function getCurrentLang() {
        return localStorage.getItem(storageLangKey) || defaultLang;
    }

    return {
        init,
        setLanguage,
        getCurrentLang,
    };
})();
