import masks from "./modules/masks.js";
import validators from "./modules/validators.js";
import theme from "./modules/theme.js";
import form from "./modules/form.js";

import "./modules/theme.switch.js";

(() => {
    masks.setupAll();
    validators.setupAll();
    theme.setup();
    form.setup();
})();