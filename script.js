const topbar = document.querySelector('#topbar');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const year = document.querySelector('#year');
const leadForm = document.querySelector('#leadForm');

if (year) year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  topbar?.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => revealObserver.observe(el));

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const nome = data.get('nome') || '';
  const email = data.get('email') || '';
  const laboratorio = data.get('laboratorio') || '';
  const necessidade = data.get('necessidade') || '';
  const mensagem = data.get('mensagem') || '';

  // Altere o e-mail abaixo para o endereço oficial de recebimento dos leads.
  const destinationEmail = 'contato@pathonexus.com.br';
  const subject = encodeURIComponent(`Solicitação de diagnóstico PathoNexus - ${laboratorio || nome}`);
  const body = encodeURIComponent(
`Olá, equipe PathoNexus.

Tenho interesse em solicitar um diagnóstico inicial.

Nome: ${nome}
E-mail: ${email}
Laboratório/instituição: ${laboratorio}
Principal necessidade: ${necessidade}

Mensagem:
${mensagem}

Enviado pelo website PathoNexus.`
  );

  window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
});
