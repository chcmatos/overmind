(() => {
    const switchBtn = document.getElementById('btn-switch');
    const toggleBtn = document.getElementById('btn-toggle');
    switchBtn.onclick = () => toggleTheme();
    addThemeChangedListener((e) => {
        toggleBtn.checked = e.detail.isLight;
    });
    toggleBtn.checked = isThemeLight();
})();