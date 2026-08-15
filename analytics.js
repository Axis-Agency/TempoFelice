(() => {
  const cfg = window.TF_ANALYTICS_CONFIG || {};
  const validGtm = /^GTM-[A-Z0-9]+$/.test(cfg.gtmId || '');
  const validGa4 = /^G-[A-Z0-9]+$/.test(cfg.ga4Id || '');
  const configured = cfg.mode !== 'disabled' && ((cfg.mode === 'gtm' && validGtm) || (cfg.mode === 'ga4' && validGa4));
  const storageKey = 'tf_analytics_consent_v1';
  const stored = localStorage.getItem(storageKey);
  let loaded = false;
  let trackingBound = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

  const consentGranted = () => !cfg.requireConsent || localStorage.getItem(storageKey) === 'granted';
  const track = (eventName, params = {}) => {
    if (!configured || !consentGranted()) return false;
    const safe = Object.assign({
      recruit_page: document.body?.dataset?.recruitPage || 'none',
      recruit_store: document.body?.dataset?.recruitStore || 'none',
      page_path: location.pathname
    }, params);
    if (cfg.mode === 'gtm') window.dataLayer.push(Object.assign({ event: eventName }, safe));
    else window.gtag('event', eventName, safe);
    return true;
  };
  window.TFAnalytics = { track, consentGranted };

  const setConsent = (granted) => {
    if (configured) {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
      });
    }
    localStorage.setItem(storageKey, granted ? 'granted' : 'denied');
  };

  if (configured) {
    window.gtag('consent', 'default', {
      analytics_storage: stored === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500
    });
  }

  const bindRecruitTracking = () => {
    if (trackingBound || !document.body) return;
    trackingBound = true;
    const page = document.body.dataset.recruitPage;
    if (page) track('recruit_page_view');

    document.addEventListener('click', (event) => {
      const a = event.target.closest('a,button');
      if (!a) return;
      const href = a.tagName === 'A' ? (a.getAttribute('href') || '') : '';
      const explicit = a.dataset.recruitAction;
      const isRecruitLink = /(^|\/)recruit[^/]*\.html|#entry-form|#locations/.test(href);
      const isLine = /^https:\/\/lin\.ee\//.test(href);
      if (!explicit && !isRecruitLink && !isLine) return;
      let action = explicit || (isLine ? 'line_consult' : 'recruit_navigation');
      track('recruit_cta_click', {
        recruit_action: action,
        recruit_store: a.dataset.recruitStore || document.body.dataset.recruitStore || 'all',
        link_path: href ? href.split('?')[0].slice(0, 180) : '',
        link_text: (a.textContent || '').trim().replace(/\s+/g,' ').slice(0,80)
      });
    }, { passive: true });
  };

  const load = () => {
    if (!configured || loaded) return;
    loaded = true;
    if (cfg.mode === 'gtm') {
      window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
      const s = document.createElement('script'); s.async = true;
      s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(cfg.gtmId);
      document.head.appendChild(s);
    } else {
      const s = document.createElement('script'); s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4Id);
      document.head.appendChild(s);
      window.gtag('js', new Date());
      window.gtag('config', cfg.ga4Id, { anonymize_ip: true });
    }
    bindRecruitTracking();
  };

  if (configured && (!cfg.requireConsent || stored === 'granted')) load();
  document.addEventListener('DOMContentLoaded', () => {
    if (configured && consentGranted()) bindRecruitTracking();
  });

  if (!configured || !cfg.requireConsent || stored) return;
  const banner = document.createElement('section');
  banner.className = 'analytics-consent'; banner.setAttribute('role','dialog'); banner.setAttribute('aria-label','アクセス解析の設定');
  banner.innerHTML = '<div><p><strong>アクセス解析について</strong></p><p>サイト改善のため、同意いただいた場合のみ匿名のアクセス情報を利用します。</p></div><div class="analytics-consent-actions"><button type="button" data-consent="deny">利用しない</button><button type="button" data-consent="allow">同意する</button></div>';
  document.body.appendChild(banner);
  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-consent]'); if (!button) return;
    const granted = button.dataset.consent === 'allow'; setConsent(granted); banner.remove();
    if (granted) load();
  });
})();
