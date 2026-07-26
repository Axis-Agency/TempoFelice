(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const closeNav = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });
  }

  const revealTargets = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealTargets.forEach(target => observer.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }

  // GTM-ready recruitment funnel events. No network request is made unless GTM/analytics is added later.
  window.dataLayer = window.dataLayer || [];
  const body = document.body;
  if (body.dataset.recruitPage) {
    window.dataLayer.push({
      event: 'recruit_page_view',
      recruit_page_type: body.dataset.recruitPage,
      recruit_store: body.dataset.recruitStore || 'all',
      page_path: location.pathname
    });
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-recruit-action]');
    if (!target) return;
    const action = target.dataset.recruitAction;
    const store = target.dataset.recruitStore || body.dataset.recruitStore || 'all';
    const common = {
      recruit_action: action,
      recruit_store: store,
      recruit_source: sessionStorage.getItem('tf_recruit_source') || 'unknown',
      link_url: target.href || location.href,
      link_text: (target.textContent || '').trim().slice(0, 100),
      page_path: location.pathname
    };
    window.dataLayer.push({ event: 'recruit_interaction', ...common });
    const standardEvents = {
      job_detail: 'select_job',
      begin_application: 'begin_application',
      application_form: 'begin_application',
      line_consult: 'line_consult'
    };
    if (standardEvents[action]) window.dataLayer.push({ event: standardEvents[action], ...common });
  });

  document.querySelectorAll('.share-job-button').forEach(button => {
    button.addEventListener('click', async () => {
      const status = button.closest('.job-hero-copy')?.querySelector('.share-status');
      const shareData = { title: button.dataset.shareTitle || document.title, text: 'TempoFeliceの求人情報', url: location.href };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          if (status) status.textContent = '共有メニューを開きました。';
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(location.href);
          if (status) status.textContent = '求人ページのURLをコピーしました。';
        } else {
          if (status) status.textContent = 'ブラウザのアドレス欄からURLをコピーしてください。';
        }
      } catch (error) {
        if (error?.name !== 'AbortError' && status) status.textContent = '共有できませんでした。';
      }
    });
  });


  document.querySelectorAll('.print-guide-button').forEach(button => {
    button.addEventListener('click', () => {
      window.dataLayer.push({
        event: 'recruit_interaction',
        recruit_action: 'print_guide',
        recruit_store: document.body.dataset.recruitStore || 'all',
        page_path: location.pathname
      });
      window.print();
    });
  });
})();
