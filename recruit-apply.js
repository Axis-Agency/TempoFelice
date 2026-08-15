(() => {
  const cfg = window.TF_RECRUIT_APPLICATION || {};
  const stores = {
    all: { name: '相談して決めたい', area: '通勤条件や募集状況を確認して相談できます。' },
    hamamatsu: { name: '浜松店', area: '浜松市中央区上新屋町' },
    'hamamatsu-ekimae': { name: '浜松駅前店', area: '浜松駅北口から徒歩3分' },
    shizuoka: { name: '静岡店', area: '静岡市葵区両替町' },
    'kagoshima-tenmonkan': { name: '鹿児島天文館店', area: '鹿児島市東千石町・天文館エリア' }
  };
  const params = new URLSearchParams(location.search);
  const select = document.getElementById('application-store');
  const privacy = document.getElementById('application-privacy');
  const launch = document.getElementById('application-launch');
  const status = document.getElementById('application-status');
  const name = document.getElementById('selected-store-name');
  const area = document.getElementById('selected-store-area');
  if (!select || !privacy || !launch) return;

  const initial = stores[params.get('store')] ? params.get('store') : 'all';
  const source = params.get('source') || document.referrer || 'direct';
  let jobStatuses = {};
  select.value = initial;
  document.body.dataset.recruitStore = initial;
  sessionStorage.setItem('tf_recruit_source', String(source).slice(0, 200));

  const selectedStatus = () => select.value === 'all' ? 'open' : (jobStatuses[select.value] || 'open');
  const update = () => {
    const store = stores[select.value] || stores.all;
    name.textContent = store.name;
    area.textContent = store.area;
    document.body.dataset.recruitStore = select.value;
    const current = selectedStatus();
    launch.disabled = !privacy.checked || current !== 'open';
    if (current === 'paused') status.textContent = 'この店舗は募集状況を確認中です。会社公式LINEからお問い合わせください。';
    else if (current === 'closed') status.textContent = 'この店舗の現在の募集は終了しています。ほかの店舗を選択してください。';
    else status.textContent = '';
  };
  select.addEventListener('change', () => {
    update();
    window.TFAnalytics?.track('recruit_job_select', { recruit_store: select.value, recruit_source: String(source).slice(0,120) });
  });
  privacy.addEventListener('change', update);
  update();

  fetch('data/recruit-jobs.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : Promise.reject()).then(data => {
    Object.entries(data.jobs || {}).forEach(([slug, job]) => {
      jobStatuses[slug] = job.status || 'open';
      const option = select.querySelector(`option[value="${slug}"]`);
      if (!option) return;
      if (job.status === 'closed') option.textContent = `${stores[slug].name}（募集終了）`;
      if (job.status === 'paused') option.textContent = `${stores[slug].name}（募集確認中）`;
    });
    update();
  }).catch(() => {});

  const buildUrl = () => {
    const useGas = cfg.mode === 'gas_web_app' && /^https:\/\/script\.google\.com\//.test(cfg.gasWebAppUrl || '');
    const base = useGas ? cfg.gasWebAppUrl : cfg.googleFormUrl;
    if (!base) return '';
    const url = new URL(base);
    if (useGas) {
      url.searchParams.set('store', select.value);
      url.searchParams.set('source', source);
      return url.toString();
    }
    const ids = cfg.googleFormEntryIds || {};
    if (ids.store && /^entry\.\d+$/.test(ids.store)) {
      url.searchParams.set('usp', 'pp_url');
      url.searchParams.set(ids.store, stores[select.value].name);
    }
    if (ids.source && /^entry\.\d+$/.test(ids.source)) url.searchParams.set(ids.source, source);
    return url.toString();
  };

  launch.addEventListener('click', () => {
    if (!privacy.checked || selectedStatus() !== 'open') return;
    const url = buildUrl();
    if (!url) {
      status.textContent = '応募フォームURLが設定されていません。会社公式LINEからご相談ください。';
      return;
    }
    const payload = {
      event: 'begin_application',
      recruit_store: select.value,
      recruit_source: source,
      application_mode: cfg.mode || 'google_form',
      page_path: location.pathname
    };
    window.TFAnalytics?.track('recruit_application_begin', { recruit_store: select.value, recruit_source: String(source).slice(0,120), application_mode: cfg.mode || 'google_form' });
    sessionStorage.setItem('tf_recruit_store', select.value);
    window.open(url, '_blank', 'noopener,noreferrer');
    status.textContent = '応募フォームを別タブで開きました。送信後はフォームの完了メッセージをご確認ください。';
  });
})();
