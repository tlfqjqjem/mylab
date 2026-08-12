/* 글로벌 레스토랑 시장 대시보드 — 렌더링 로직
   데이터는 assets/dashboard-data.js 의 DASHBOARD_DATA 를 사용한다. */

const D = DASHBOARD_DATA;
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const fmt = (n) => n.toLocaleString('ko-KR');
const $ = (id) => document.getElementById(id);

/* ---------- 파생 값 ---------- */
const cities = D.cities;
const levels = D.price_levels;
const chain = D.chain_vs_local;
const topCity = cities[0];
const lowCity = cities[cities.length - 1];
const cheapest = levels[0];
const priciest = levels[levels.length - 1];
const localShare = (chain.totals.Local / (chain.totals.Chain + chain.totals.Local) * 100).toFixed(1);
const cuisineTop = D.cuisine_price[0];
const cuisineLow = D.cuisine_price[D.cuisine_price.length - 1];
const cuisineSpread = (cuisineTop.avg_price - cuisineLow.avg_price).toFixed(2);

/* ---------- Chart.js 공통 설정 ---------- */
Chart.defaults.font.family = 'Pretendard, system-ui, -apple-system, "Segoe UI", sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = css('--muted');
Chart.defaults.borderColor = css('--grid');
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = css('--ink');
Chart.defaults.plugins.tooltip.titleColor = css('--surface');
Chart.defaults.plugins.tooltip.bodyColor = css('--surface');
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.maintainAspectRatio = false;

const axes = (opts = {}) => ({
  x: { grid: { display: false }, border: { color: css('--axis') }, ...opts.x },
  y: { grid: { color: css('--grid') }, border: { display: false }, beginAtZero: true, ...opts.y },
});

/* ---------- 머리말 ---------- */
$('findings').innerHTML = [
  ['Finding 01', `시장은 <strong>로컬 중심</strong>이다. 전체 레스토랑의 <strong>${localShare}%</strong>가 개인 매장이고, 체인은 ${fmt(chain.totals.Chain)}곳에 그친다.`],
  ['Finding 02', `가격을 가르는 건 메뉴가 아니라 <strong>포지셔닝</strong>이다. 가격대별 평균 메뉴 가격은 $${cheapest.avg_menu_price} → $${priciest.avg_menu_price}로 벌어지지만, 음식 종류별 차이는 <strong>$${cuisineSpread}</strong>에 불과하다.`],
  ['Finding 03', `<strong>비싸다고 좋은 평가를 받지 않는다.</strong> 최저가대 평균 평점 ${cheapest.avg_rating}점이 최고가대 ${priciest.avg_rating}점보다 오히려 높다.`],
].map(([n, text]) => `<div class="finding"><div class="n">${n}</div><p>${text}</p></div>`).join('');

$('kpis').innerHTML = [
  ['레스토랑', fmt(D.summary.total_restaurants), `${D.summary.total_cities}개 도시`],
  ['메뉴 항목', fmt(D.summary.total_menu_items), `평균 ${(D.summary.total_menu_items / D.summary.total_restaurants).toFixed(1)}개/곳`],
  ['평균 평점', D.summary.avg_rating.toFixed(2), '5점 만점'],
  ['평균 메뉴가', `$${D.summary.avg_menu_price}`, '전체 메뉴 기준'],
  ['배달 가능', `${D.summary.delivery_ratio}%`, `${fmt(Math.round(D.summary.total_restaurants * D.summary.delivery_ratio / 100))}곳`],
  ['로컬 비중', `${localShare}%`, `체인 ${fmt(chain.totals.Chain)}곳`],
].map(([label, value, note]) =>
  `<div class="kpi"><div class="label">${label}</div><div class="value">${value}</div><div class="note">${note}</div></div>`
).join('');

/* ---------- 01 지도 ---------- */
const map = L.map('map', {
  minZoom: 1,
  scrollWheelZoom: false,
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  maxZoom: 12,
}).addTo(map);

const maxCityCount = Math.max(...cities.map((c) => c.count));
cities.forEach((c) => {
  L.circleMarker([c.lat, c.lon], {
    radius: 8 + (c.count / maxCityCount) * 16,
    color: css('--s1'),
    weight: 2,
    fillColor: css('--s1'),
    fillOpacity: 0.35,
  })
    .bindPopup(
      `<b>${c.city}</b>, ${c.country}<br>레스토랑 ${fmt(c.count)}곳<br>평균 평점 ${c.avg_rating.toFixed(2)}<br>평균 메뉴가 $${c.avg_menu_price.toFixed(2)}`
    )
    .addTo(map);
});

// 10개 도시가 모두 보이도록 초기 화면을 맞춘다
map.fitBounds(cities.map((c) => [c.lat, c.lon]), { padding: [40, 40] });

$('mapCaveat').innerHTML =
  `이 지도는 <b>도시 중심 좌표</b>를 직접 지정해 그렸다. 데이터셋의 레스토랑별 위경도는 자기 도시 반경 2도 안에 들어오는 것이 ` +
  `<b>${fmt(D.coord_check.checked)}건 중 ${fmt(D.coord_check.near_own_city)}건(${D.coord_check.ratio}%)</b>으로, ` +
  `위도 -90~90 · 경도 -180~180에 균일하게 흩어진 <b>난수</b>다. 그대로 찍으면 뉴욕 식당이 남극에 표시되므로 쓰지 않았다.`;

/* ---------- 01 도시별 레스토랑 수 ---------- */
new Chart($('cityChart'), {
  type: 'bar',
  data: {
    labels: cities.map((c) => c.city),
    datasets: [{
      label: '레스토랑',
      data: cities.map((c) => c.count),
      backgroundColor: css('--s1'),
      borderRadius: 4,
      borderSkipped: 'bottom',
    }],
  },
  options: {
    scales: axes(),
    plugins: { tooltip: { callbacks: { label: (c) => `${fmt(c.parsed.y)}곳` } } },
  },
});
$('cityInsight').innerHTML =
  `1위 <b>${topCity.city}</b> ${fmt(topCity.count)}곳과 10위 <b>${lowCity.city}</b> ${fmt(lowCity.count)}곳의 차이는 ${topCity.count - lowCity.count}곳뿐이다. 도시별 편차가 거의 없다.`;

/* ---------- 01 체인 vs 로컬 ---------- */
new Chart($('chainChart'), {
  type: 'bar',
  data: {
    labels: chain.cities,
    datasets: chain.series.map((s, i) => ({
      label: s.name,
      data: s.data,
      backgroundColor: i === 0 ? css('--s1') : css('--s2'),
      borderRadius: 3,
      borderWidth: 2,
      borderColor: css('--surface'),
    })),
  },
  options: {
    scales: {
      x: { stacked: true, grid: { display: false }, border: { color: css('--axis') } },
      y: { stacked: true, grid: { color: css('--grid') }, border: { display: false }, beginAtZero: true },
    },
    plugins: { tooltip: { displayColors: true, callbacks: { label: (c) => `${c.dataset.label} ${fmt(c.parsed.y)}곳` } } },
  },
});
$('chainInsight').innerHTML =
  '모든 도시에서 로컬이 체인의 <b>2배 이상</b>이다. 도시를 바꿔도 이 비율은 크게 흔들리지 않는다.';

/* ---------- 02 가격대별 평균 메뉴 가격 ---------- */
new Chart($('priceLevelChart'), {
  type: 'bar',
  data: {
    labels: levels.map((l) => l.level),
    datasets: [{
      label: '평균 메뉴 가격',
      data: levels.map((l) => l.avg_menu_price),
      backgroundColor: css('--s1'),
      borderRadius: 4,
      borderSkipped: 'bottom',
    }],
  },
  options: {
    scales: axes({ y: { ticks: { callback: (v) => `$${v}` } } }),
    plugins: { tooltip: { callbacks: { label: (c) => `$${c.parsed.y}` } } },
  },
});
$('priceLevelInsight').innerHTML =
  `가격대가 한 단계 오를 때마다 평균 메뉴가가 약 <b>$${((priciest.avg_menu_price - cheapest.avg_menu_price) / 3).toFixed(0)}씩</b> 올라간다. $ 대비 $$$$는 <b>${(priciest.avg_menu_price / cheapest.avg_menu_price).toFixed(1)}배</b>.`;

/* ---------- 02 음식 종류별 평균 메뉴 가격 ---------- */
new Chart($('cuisinePriceChart'), {
  type: 'bar',
  data: {
    labels: D.cuisine_price.map((c) => c.cuisine),
    datasets: [{
      label: '평균 메뉴 가격',
      data: D.cuisine_price.map((c) => c.avg_price),
      backgroundColor: css('--s3'),
      borderRadius: 4,
      borderSkipped: 'left',
    }],
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: { grid: { color: css('--grid') }, border: { display: false }, min: 50, ticks: { callback: (v) => `$${v}` } },
      y: { grid: { display: false }, border: { color: css('--axis') } },
    },
    plugins: { tooltip: { callbacks: { label: (c) => `$${c.parsed.x}` } } },
  },
});
$('cuisinePriceInsight').innerHTML =
  `최고 <b>${cuisineTop.cuisine} $${cuisineTop.avg_price}</b>와 최저 <b>${cuisineLow.cuisine} $${cuisineLow.avg_price}</b>의 차이는 <b>$${cuisineSpread}</b>. 차이를 보이려고 x축을 $50부터 잘랐으며, 실제 격차는 미미하다.`;

/* ---------- 03 평점 분포 ---------- */
new Chart($('ratingChart'), {
  type: 'bar',
  data: {
    labels: D.rating_distribution.map((r) => r.bucket),
    datasets: [{
      label: '레스토랑',
      data: D.rating_distribution.map((r) => r.count),
      backgroundColor: css('--s1'),
      borderRadius: 4,
      borderSkipped: 'bottom',
    }],
  },
  options: {
    scales: axes(),
    plugins: { tooltip: { callbacks: { label: (c) => `${fmt(c.parsed.y)}곳` } } },
  },
});
const ratingMax = D.rating_distribution.reduce((a, b) => (b.count > a.count ? b : a));
const ratingMin = D.rating_distribution.reduce((a, b) => (b.count < a.count ? b : a));
$('ratingInsight').innerHTML =
  `가장 많은 구간은 <b>${ratingMax.bucket}점</b>(${fmt(ratingMax.count)}곳)이다. 전 구간이 ${fmt(ratingMin.count)}~${fmt(ratingMax.count)}곳으로 <b>거의 평평한 분포</b>라, 평점만으로는 우열을 가리기 어렵다.`;

/* ---------- 03 가격대별 평균 평점 ---------- */
new Chart($('priceRatingChart'), {
  type: 'line',
  data: {
    labels: levels.map((l) => l.level),
    datasets: [{
      label: '평균 평점',
      data: levels.map((l) => l.avg_rating),
      borderColor: css('--s2'),
      backgroundColor: css('--s2'),
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderColor: css('--surface'),
      pointBorderWidth: 2,
    }],
  },
  options: {
    scales: axes({ y: { beginAtZero: false, suggestedMin: 3.4, suggestedMax: 3.6, ticks: { callback: (v) => `${v}점` } } }),
    plugins: { tooltip: { callbacks: { label: (c) => `${c.parsed.y}점` } } },
  },
});
$('priceRatingInsight').innerHTML =
  `가격대가 올라갈수록 평점이 <b>${cheapest.avg_rating} → ${priciest.avg_rating}</b>으로 완만히 내려간다. 차이가 0.1점 수준이라 <b>y축을 확대</b>해 표시했다 — 실질적 격차는 작다.`;

/* ---------- 04 개업 연도 ---------- */
new Chart($('decadeChart'), {
  type: 'line',
  data: {
    labels: D.opening_decades.map((d) => d.decade),
    datasets: [{
      label: '개업',
      data: D.opening_decades.map((d) => d.count),
      borderColor: css('--s1'),
      backgroundColor: css('--accent-soft'),
      borderWidth: 2,
      fill: true,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderColor: css('--surface'),
      pointBorderWidth: 2,
    }],
  },
  options: {
    scales: axes(),
    plugins: { tooltip: { callbacks: { label: (c) => `${fmt(c.parsed.y)}곳` } } },
  },
});
const decadesDone = D.opening_decades.slice(0, -1);
const lastDecade = D.opening_decades[D.opening_decades.length - 1];
$('decadeInsight').innerHTML =
  `${decadesDone[0].decade}~${decadesDone[decadesDone.length - 1].decade}는 매 10년 <b>${fmt(Math.min(...decadesDone.map((d) => d.count)))}~${fmt(Math.max(...decadesDone.map((d) => d.count)))}곳</b>으로 안정적이다. <b>${lastDecade.decade} ${fmt(lastDecade.count)}곳</b>은 아직 10년이 다 차지 않은 구간이므로 다른 점과 직접 비교하면 안 된다.`;

/* ---------- 05 표 ---------- */
$('cityTable').innerHTML = cities.map((c) => `
  <tr>
    <td>${c.city}</td><td>${c.country}</td>
    <td class="num bar-cell"><div class="fill" style="width:${(c.count / maxCityCount * 100).toFixed(0)}%"></div><span>${fmt(c.count)}</span></td>
    <td class="num">${c.avg_rating.toFixed(2)}</td>
    <td class="num">$${c.avg_menu_price.toFixed(2)}</td>
  </tr>`).join('');

$('topTable').innerHTML = D.top_rated.map((r) => `
  <tr>
    <td>${r.name}</td><td>${r.city}</td>
    <td class="num">${r.rating.toFixed(1)}</td><td class="num">${fmt(r.reviews)}</td>
  </tr>`).join('');
