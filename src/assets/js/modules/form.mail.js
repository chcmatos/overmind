/**
 * !Apenas para fins de exemplo prático de envio de e-mail.
 * !Nao implementar por tal ferramenta.
 */
import "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";

emailjs.init("rD3Ynk3f1UvF1wpK1");

const _send = (form) => {
    return emailjs.sendForm("service_5ax3b89", "template_cvq1tnb", form);
};

export default {
    send: _send
};