/**
 * ?Apenas para fins de exemplo prático de envio de e-mail.
 * ?Nao implementar por tal ferramenta.
 * {@link https://www.emailjs.com/ | emailjs}
 */
import "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";

export default ((email) => {
    const _send = (form) => email.sendForm("service_5ax3b89", "template_cvq1tnb", form);   
    _send.toString = () => "send";
    email.init("rD3Ynk3f1UvF1wpK1");
    return Object.defineProperty({}, 'send', {
        value: (form) => _send(form),
        writable: false,
        configurable: false
    });
})(emailjs);