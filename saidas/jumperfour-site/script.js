/* ══════════════════════════════════════════════════════════
   JUMPERFOUR — JavaScript
   Navbar scroll · Mobile menu · Reveal · Form
══════════════════════════════════════════════════════════ */

'use strict';

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run on load

// ── MOBILE HAMBURGER ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK ───────────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const navActiveObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navActiveObserver.observe(s));

// ── FORM SUBMIT ───────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    // Basic validation
    if (!nome || !email) {
      shake(submitBtn);
      return;
    }

    // Simulate sending (replace with actual API call)
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Enviando...
    `;

    await wait(1800);

    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      Enviar mensagem
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
    `;

    contactForm.reset();
    formSuccess.classList.add('show');

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  });
}

// ── SMOOTH STATS COUNT-UP ─────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');

const countUpObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.trim();
        const prefix = raw.startsWith('+') ? '+' : '';
        const suffix = raw.endsWith('%') ? '%' : (raw.endsWith('+') && !prefix ? '+' : '');
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10);

        if (!isNaN(num)) {
          animateCount(el, num, prefix, suffix, 1600);
          countUpObserver.unobserve(el);
        }
      }
    });
  },
  { threshold: 0.8 }
);

statNumbers.forEach(el => countUpObserver.observe(el));

function animateCount(el, target, prefix, suffix, duration) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// ── UTILS ─────────────────────────────────────────────────
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shake(el) {
  el.style.animation = 'shake 0.4s ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
}

// Add shake keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .nav-link.active {
    color: var(--green) !important;
  }
`;
document.head.appendChild(style);

// ── PORTAL DO CLIENTE INTERACTIVES ────────────────────────
const loginModal       = document.getElementById('loginModal');
const openLoginBtn     = document.getElementById('openLoginBtn');
const closeLoginBtn    = document.getElementById('closeLoginBtn');
const loginView        = document.getElementById('loginView');
const dashboardView    = document.getElementById('dashboardView');
const portalLoginForm  = document.getElementById('portalLoginForm');
const demoLoginBtn     = document.getElementById('demoLoginBtn');
const logoutBtn        = document.getElementById('logoutBtn');
const openSupportBtn   = document.getElementById('openSupportBtn');

// Open modal
if (openLoginBtn) {
  openLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent page scroll
  });
}

// Close modal
const closeModal = () => {
  loginModal.classList.remove('open');
  document.body.style.overflow = '';
};

if (closeLoginBtn) {
  closeLoginBtn.addEventListener('click', closeModal);
}

// Close on overlay click
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    closeModal();
  }
});

// Switch view helper
const switchToDashboard = () => {
  loginView.classList.remove('active');
  dashboardView.classList.add('active');

  // Trigger bar chart animation
  const bars = dashboardView.querySelectorAll('.chart-bar');
  bars.forEach((bar, idx) => {
    bar.style.transform = 'scaleY(0)';
    bar.style.transformOrigin = 'bottom';
    setTimeout(() => {
      bar.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      bar.style.transform = 'scaleY(1)';
    }, 60 + idx * 60);
  });
};

// Form submit login simulation
if (portalLoginForm) {
  portalLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = portalLoginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Autenticando...
    `;
    
    await wait(1200);
    
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    
    switchToDashboard();
  });
}

// Demo login simulation
if (demoLoginBtn) {
  demoLoginBtn.addEventListener('click', async () => {
    demoLoginBtn.disabled = true;
    demoLoginBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Carregando Interface UX...
    `;
    
    await wait(1000);
    
    demoLoginBtn.disabled = false;
    demoLoginBtn.innerHTML = `
      Acessar como Demo (Experiência do Usuário)
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    `;
    
    switchToDashboard();
  });
}

// Logout simulation
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    dashboardView.classList.remove('active');
    loginView.classList.add('active');
  });
}

// Support Button feedback
if (openSupportBtn) {
  openSupportBtn.addEventListener('click', () => {
    alert('UX Demo: Simulação de abertura de chamado JumperFour enviada para o BMS central Honeywell com sucesso!');
  });
}

// ── CASE DETAIL MODAL ─────────────────────────────────────
const casesData = {
  honeywell: {
    tag: 'Automação Predial',
    name: 'Honeywell Brasil',
    segment: 'Escritório Corporativo · Sede São Paulo, SP',
    status: 'ok',
    statusLabel: 'Concluído · Em manutenção ativa',
    systems: ['EBI Enterprise', 'BMS Integrado', 'Pro-Watch SCA', 'Modbus/BACnet'],
    kpis: [
      { icon: '⚙️', val: '14', label: 'Subsistemas integrados em plataforma única' },
      { icon: '⚡', val: '23%', label: 'Redução no consumo energético' },
      { icon: '🟢', val: '99,9%', label: 'Uptime do sistema EBI' },
      { icon: '🛡', val: '400+', label: 'Pontos de controle de acesso' },
    ],
    chart: {
      title: 'Consumo Energético — Antes vs. Depois da Automação BMS (MWh/mês)',
      note: 'Redução média de 23% no consumo após automação HVAC via EBI. Pico em dezembro atribuído a evento corporativo.',
      bars: [
        { label: 'Jan', val: '142', h: 80, hi: false },
        { label: 'Fev', val: '138', h: 77, hi: false },
        { label: 'Mar', val: '128', h: 72, hi: false },
        { label: 'Abr', val: '119', h: 67, hi: false },
        { label: 'Mai', val: '112', h: 63, hi: false },
        { label: 'Jun', val: '108', h: 61, hi: true },
        { label: 'Jul', val: '105', h: 59, hi: false },
        { label: 'Ago', val: '109', h: 61, hi: false },
        { label: 'Set', val: '111', h: 62, hi: false },
        { label: 'Out', val: '107', h: 60, hi: false },
        { label: 'Nov', val: '103', h: 58, hi: false },
        { label: 'Dez', val: '117', h: 66, hi: false },
      ],
    },
    timeline: [
      { done: true, date: 'Mar 2023', title: 'Kick-off & Levantamento técnico', desc: 'Mapeamento dos 14 subsistemas existentes e definição de arquitetura EBI.' },
      { done: true, date: 'Jun 2023', title: 'Implantação e integração EBI', desc: 'Integração de HVAC, iluminação, SCA e CFTV em plataforma unificada.' },
      { done: true, date: 'Set 2023', title: 'Comissionamento e testes', desc: 'Testes de carga, failover e conformidade. Documentação completa entregue.' },
      { done: true, date: 'Out 2023 →', title: 'Manutenção preventiva ativa', desc: 'Monitoramento remoto 24/7 com SLA de 4h para incidentes críticos.' },
    ],
    footerNote: 'Parceiro oficial <strong>Honeywell Building Solutions</strong> para implantação e suporte do EBI no Brasil.',
  },

  xp: {
    tag: 'Segurança Eletrônica',
    name: 'XP Investimentos',
    segment: 'Serviços Financeiros · Torre Faria Lima, São Paulo, SP',
    status: 'ok',
    statusLabel: 'Concluído · Monitoramento ativo',
    systems: ['CFTV 4K Analytics', 'SCA Biométrico', 'BMS HVAC', 'Honeywell Pro-Watch'],
    kpis: [
      { icon: '📷', val: '247', label: 'Câmeras IP 4K instaladas' },
      { icon: '🛡', val: '4', label: 'Andares de acesso restrito' },
      { icon: '🟢', val: '99,97%', label: 'Disponibilidade do SCA' },
      { icon: '⚡', val: '18%', label: 'Economia energética via BMS' },
    ],
    chart: {
      title: 'Acessos Biométricos por Dia — Últimas 2 Semanas',
      note: 'Pico às sextas-feiras reflete reuniões presenciais de diretoria. Fins de semana mantêm monitoramento ativo com acesso mínimo.',
      bars: [
        { label: 'Seg', val: '798', h: 64, hi: false },
        { label: 'Ter', val: '821', h: 66, hi: false },
        { label: 'Qua', val: '856', h: 69, hi: false },
        { label: 'Qui', val: '812', h: 65, hi: false },
        { label: 'Sex', val: '1042', h: 84, hi: true },
        { label: 'Sáb', val: '87', h: 7, hi: false },
        { label: 'Dom', val: '23', h: 2, hi: false },
        { label: 'Seg', val: '803', h: 65, hi: false },
        { label: 'Ter', val: '834', h: 67, hi: false },
        { label: 'Qua', val: '842', h: 68, hi: false },
        { label: 'Qui', val: '819', h: 66, hi: false },
        { label: 'Sex', val: '1089', h: 87, hi: false },
      ],
    },
    timeline: [
      { done: true, date: 'Ago 2023', title: 'Projeto executivo aprovado', desc: 'Definição de 247 pontos de câmera, layout de andares restritos e integração com SCA.' },
      { done: true, date: 'Nov 2023', title: 'Instalação CFTV & SCA', desc: 'Câmeras Hikvision 4K com analytics de IA e controle biométrico Honeywell nos 4 andares.' },
      { done: true, date: 'Jan 2024', title: 'Comissionamento e treinamento', desc: 'Treinamento da equipe de segurança e TI. Entrega de central de monitoramento.' },
      { done: true, date: 'Fev 2024 →', title: 'Contrato de manutenção ativo', desc: 'SOC remoto JumperFour + visitas preventivas mensais.' },
    ],
    footerNote: 'Sistema de segurança em conformidade com <strong>ISO 27001</strong> e regulamentação <strong>CVM/Banco Central</strong> para ambientes financeiros.',
  },

  einstein: {
    tag: 'Life Safety · SDAI',
    name: 'Hospital Israelita Albert Einstein',
    segment: 'Saúde · Missão Crítica · São Paulo, SP',
    status: 'lifesafety',
    statusLabel: 'Life Safety · Em operação',
    systems: ['SDAI Notifier', 'Supressão por Gás', 'CFTV Hospitalar', 'BMS Predial'],
    kpis: [
      { icon: '🔥', val: '1.200+', label: 'Pontos de detecção instalados' },
      { icon: '✅', val: '0', label: 'Falsos alarmes em 24 meses' },
      { icon: '📋', val: 'NFPA 72', label: 'Certificação de conformidade' },
      { icon: '⏱', val: '<2 min', label: 'Tempo de resposta ao alarme' },
    ],
    chart: {
      title: 'Testes Mensais de Verificação SDAI — Pontos Testados',
      note: 'Protocolo de testes preventivos mensais exigido pela NFPA 72 e NBR 17240. 100% de conformidade em todos os ciclos.',
      bars: [
        { label: 'Jan', val: '1.200', h: 100, hi: false },
        { label: 'Fev', val: '1.200', h: 100, hi: false },
        { label: 'Mar', val: '1.200', h: 100, hi: false },
        { label: 'Abr', val: '1.200', h: 100, hi: false },
        { label: 'Mai', val: '1.200', h: 100, hi: false },
        { label: 'Jun', val: '1.200', h: 100, hi: true },
        { label: 'Jul', val: '1.200', h: 100, hi: false },
        { label: 'Ago', val: '1.200', h: 100, hi: false },
        { label: 'Set', val: '1.200', h: 100, hi: false },
        { label: 'Out', val: '1.200', h: 100, hi: false },
        { label: 'Nov', val: '1.200', h: 100, hi: false },
        { label: 'Dez', val: '1.200', h: 100, hi: false },
      ],
    },
    timeline: [
      { done: true, date: 'Jan 2022', title: 'Projeto executivo SDAI', desc: 'Mapeamento de 1.200 pontos de detecção incluindo UTIs, salas cirúrgicas e CPD hospitalar.' },
      { done: true, date: 'Mai 2022', title: 'Instalação e integração', desc: 'Instalação do painel Notifier NFS2-3030 integrado ao BMS e sistema de supressão por gás FM-200 nas salas críticas.' },
      { done: true, date: 'Set 2022', title: 'Comissionamento NFPA', desc: 'Testes completos de fumaça, calor e CO. Certificação NFPA 72 e NBR 17240 emitidas.' },
      { done: true, date: 'Out 2022 →', title: 'Manutenção preventiva mensal', desc: 'Protocolo mensal de verificação de todos os 1.200 pontos. Zero falsos alarmes até o momento.' },
    ],
    footerNote: 'Sistema projetado conforme <strong>NFPA 72</strong>, <strong>NBR 17240</strong> e protocolos de <strong>Life Safety</strong> para ambientes hospitalares de missão crítica.',
  },

  viracopos: {
    tag: 'Infraestrutura Pública',
    name: 'Aeroporto Internacional de Viracopos',
    segment: 'Aviação Civil · Campinas, SP',
    status: 'ok',
    statusLabel: 'Em operação · +3 anos',
    systems: ['BMS Honeywell EBI', 'CFTV Perimetral', 'SCA ANAC', 'SDAI Terminal'],
    kpis: [
      { icon: '🟢', val: '99,8%', label: 'Uptime geral dos sistemas' },
      { icon: '⏱', val: '< 4h', label: 'SLA para incidentes críticos' },
      { icon: '📋', val: '100%', label: 'Conformidade ANAC / INFRAERO' },
      { icon: '🔧', val: '+180', label: 'Ordens de serviço executadas/ano' },
    ],
    chart: {
      title: 'Ordens de Serviço Executadas por Mês (Preventiva + Corretiva)',
      note: 'Manutenção preventiva representa 78% das OS. Picos corretivos em julho e dezembro relacionados ao alto fluxo de passageiros.',
      bars: [
        { label: 'Jan', val: '14', h: 54, hi: false },
        { label: 'Fev', val: '12', h: 46, hi: false },
        { label: 'Mar', val: '15', h: 58, hi: false },
        { label: 'Abr', val: '13', h: 50, hi: false },
        { label: 'Mai', val: '16', h: 62, hi: false },
        { label: 'Jun', val: '14', h: 54, hi: false },
        { label: 'Jul', val: '21', h: 81, hi: true },
        { label: 'Ago', val: '15', h: 58, hi: false },
        { label: 'Set', val: '13', h: 50, hi: false },
        { label: 'Out', val: '17', h: 65, hi: false },
        { label: 'Nov', val: '14', h: 54, hi: false },
        { label: 'Dez', val: '22', h: 85, hi: false },
      ],
    },
    timeline: [
      { done: true, date: 'Mar 2021', title: 'Contrato de gestão integrada', desc: 'JumperFour assumiu a gestão de todos os sistemas BMS, CFTV, SCA e SDAI do terminal.' },
      { done: true, date: 'Jun 2021', title: 'Migração para EBI Honeywell', desc: 'Unificação de 4 plataformas legadas em uma central EBI com dashboards operacionais.' },
      { done: true, date: 'Dez 2021', title: 'Certificação ANAC renovada', desc: 'Recertificação completa dos sistemas de segurança conforme regulamentação ANAC.' },
      { done: true, date: 'Jan 2022 →', title: 'Operação contínua ativa', desc: 'Equipe JumperFour on-site + monitoramento remoto 24/7. SLA 99,8% mantido.' },
    ],
    footerNote: 'Operação em conformidade com <strong>ANAC</strong>, <strong>INFRAERO</strong> e padrões internacionais <strong>ICAO</strong> de segurança aeroportuária.',
  },
};

function renderCaseModal(key) {
  const d = casesData[key];
  if (!d) return;

  const barsHTML = d.chart.bars.map(b => `
    <div class="cmd-bar${b.hi ? ' hi' : ''}" style="height:${b.h}%">
      <span class="cmd-bar-val">${b.val}</span>
      <span class="cmd-bar-label">${b.label}</span>
    </div>`).join('');

  const tlHTML = d.timeline.map(t => `
    <div class="cmd-tl-item">
      <div class="cmd-tl-dot${t.done ? ' done' : ''}"></div>
      <div class="cmd-tl-content">
        <div class="cmd-tl-date">${t.date}</div>
        <div class="cmd-tl-title">${t.title}</div>
        <div class="cmd-tl-desc">${t.desc}</div>
      </div>
    </div>`).join('');

  const kpisHTML = d.kpis.map(k => `
    <div class="cmd-kpi">
      <div class="cmd-kpi-icon">${k.icon}</div>
      <div class="cmd-kpi-text">
        <span class="cmd-kpi-val">${k.val}</span>
        <span class="cmd-kpi-label">${k.label}</span>
      </div>
    </div>`).join('');

  const systemsHTML = d.systems.map(s => `<span>${s}</span>`).join('');

  document.getElementById('caseModalContent').innerHTML = `
    <div class="cmd-header">
      <div class="cmd-client">
        <div class="cmd-tag">${d.tag}</div>
        <div class="cmd-name" id="caseModalTitle">${d.name}</div>
        <div class="cmd-segment">${d.segment}</div>
        <div class="cmd-systems-row">${systemsHTML}</div>
      </div>
      <span class="cmd-status ${d.status}">
        <span class="pulse-dot"></span> ${d.statusLabel}
      </span>
    </div>
    <div class="cmd-body">
      <div class="cmd-kpis">${kpisHTML}</div>
      <div class="cmd-detail-row">
        <div class="cmd-panel">
          <h4>${d.chart.title}</h4>
          <div class="cmd-chart">${barsHTML}</div>
          <div class="cmd-chart-note">${d.chart.note}</div>
        </div>
        <div class="cmd-panel">
          <h4>Linha do Tempo do Projeto</h4>
          <div class="cmd-timeline">${tlHTML}</div>
        </div>
      </div>
    </div>
    <div class="cmd-footer">
      <span class="cmd-footer-note">${d.footerNote}</span>
      <button class="btn-primary" id="caseCTABtn" style="font-size:13px;padding:10px 22px;">
        Solicitar projeto similar
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>`;

  document.getElementById('caseCTABtn')?.addEventListener('click', () => {
    closeCaseModal();
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
  });
}

const caseModal    = document.getElementById('caseModal');
const closeCaseBtn = document.getElementById('closeCaseBtn');

const openCaseModal = (key) => {
  renderCaseModal(key);
  caseModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeCaseModal = () => {
  caseModal.classList.remove('open');
  document.body.style.overflow = '';
};

document.querySelectorAll('.case-card[data-case]').forEach(card => {
  card.addEventListener('click', () => openCaseModal(card.dataset.case));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCaseModal(card.dataset.case);
    }
  });
});

closeCaseBtn?.addEventListener('click', closeCaseModal);
caseModal?.addEventListener('click', e => { if (e.target === caseModal) closeCaseModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCaseModal(); });

// ── FIBER OPTIC BACKGROUND (full page) ───────────────────
(function () {
  const canvas = document.getElementById('fiberCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, fibers;

  /* point on cubic bezier at t */
  const bp = (s, c1, c2, e, t) => {
    const m = 1 - t;
    return m*m*m*s + 3*m*m*t*c1 + 3*m*t*t*c2 + t*t*t*e;
  };

  const buildFibers = () => {
    fibers = [];
    /* ratios [sx,sy, c1x,c1y, c2x,c2y, ex,ey] — varied angles, some vertical */
    const tpls = [
      [0,    0.08, 0.30, 0.02, 0.65, 0.22, 1,    0.15],
      [0,    0.30, 0.28, 0.55, 0.72, 0.05, 1,    0.38],
      [0,    0.55, 0.22, 0.20, 0.68, 0.88, 1,    0.50],
      [0,    0.78, 0.35, 0.95, 0.65, 0.60, 1,    0.70],
      [0,    0.95, 0.40, 0.40, 0.60, 0.60, 1,    0.05],
      [0.05, 0,    0.10, 0.50, 0.20, 0.50, 0.15, 1   ],
      [0.85, 0,    0.80, 0.50, 0.90, 0.50, 0.95, 1   ],
      [0.2,  0,    0.55, 0.35, 0.45, 0.65, 0.8,  1   ],
      [0,    0.42, 0.45, 0.10, 0.55, 0.90, 1,    0.58],
      [0,    0.18, 0.20, 0.70, 0.80, 0.30, 1,    0.25],
      [0.1,  1,    0.35, 0.60, 0.65, 0.40, 0.9,  0   ],
      [0,    0.65, 0.30, 0.85, 0.70, 0.15, 1,    0.80],
      [0.3,  0,    0.40, 0.45, 0.60, 0.55, 0.7,  1   ],
      [0,    0.88, 0.50, 0.50, 0.50, 0.50, 1,    0.12],
      [0.5,  0,    0.20, 0.30, 0.80, 0.70, 0.5,  1   ],
      [0,    0.50, 0.50, 0.05, 0.50, 0.95, 1,    0.50],
    ];

    tpls.forEach(tpl => {
      const [sxr,syr,c1xr,c1yr,c2xr,c2yr,exr,eyr] = tpl;
      const jx = (Math.random() - 0.5) * W * 0.07;
      const jy = (Math.random() - 0.5) * H * 0.07;

      const n = Math.random() < 0.35 ? 2 : 1;
      const pulses = Array.from({ length: n }, (_, i) => ({
        t:     i / n + Math.random() * 0.25,
        speed: 0.0014 + Math.random() * 0.0020,
        size:  1.3 + Math.random() * 1.3,
        glow:  9   + Math.random() * 13,
        alpha: 0.70 + Math.random() * 0.30,
      }));

      fibers.push({
        sx:  sxr  * W + jx, sy:  syr  * H + jy,
        c1x: c1xr * W,      c1y: c1yr * H,
        c2x: c2xr * W,      c2y: c2yr * H,
        ex:  exr  * W + jx, ey:  eyr  * H + jy,
        la:  0.04 + Math.random() * 0.05,
        pulses,
      });
    });
  };

  const resize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    buildFibers();
  };

  const G = '38,196,91';

  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    fibers.forEach(f => {
      /* fiber path */
      ctx.beginPath();
      ctx.moveTo(f.sx, f.sy);
      ctx.bezierCurveTo(f.c1x, f.c1y, f.c2x, f.c2y, f.ex, f.ey);
      ctx.strokeStyle = `rgba(${G},${f.la})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      /* pulses along path */
      f.pulses.forEach(p => {
        p.t += p.speed;
        if (p.t > 1.06) p.t = -0.06;

        const t  = Math.max(0, Math.min(1, p.t));
        const px = bp(f.sx, f.c1x, f.c2x, f.ex, t);
        const py = bp(f.sy, f.c1y, f.c2y, f.ey, t);

        /* glow halo */
        const gr = ctx.createRadialGradient(px, py, 0, px, py, p.glow);
        gr.addColorStop(0,   `rgba(${G},${+(p.alpha * 0.55).toFixed(2)})`);
        gr.addColorStop(0.4, `rgba(${G},${+(p.alpha * 0.15).toFixed(2)})`);
        gr.addColorStop(1,   `rgba(${G},0)`);
        ctx.beginPath();
        ctx.arc(px, py, p.glow, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();

        /* bright core */
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,255,230,${p.alpha})`;
        ctx.fill();
      });
    });

    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });
}());

// ── CURSOR GLOW (optional, subtle) ────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(38,196,91,0.04) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  top: 0; left: 0;
`;
document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  glow.style.left = mouseX + 'px';
  glow.style.top  = mouseY + 'px';
}, { passive: true });
