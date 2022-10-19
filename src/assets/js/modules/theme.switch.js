import theme from "./theme.js";

(() => {
    const switchBtn = document.getElementById('btn-switch');
    const toggleBtn = document.getElementById('btn-toggle');
    switchBtn.onclick = () => toggleTheme();
    theme.addThemeChangedListener((e) => {
        toggleBtn.checked = e.detail.isLight;
    });
    toggleBtn.checked = theme.isThemeLight();
})();