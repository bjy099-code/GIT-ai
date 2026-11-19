// ---------- 행성 데이터 ----------
const PLANETS = [
  {
    id: "mercury", name: "수성", en: "Mercury", type: "rocky",
    color: "radial-gradient(circle at 35% 35%, #d9d4cc, #8c8680 60%, #4d4945)",
    diameter: 4879, distance: 0.39, day: "약 59일", year: "88일", moons: "0개", temp: "-173 ~ 427°C",
    desc: "태양에서 가장 가깝고 가장 작은 행성이에요. 대기가 거의 없어서 낮과 밤의 온도 차이가 매우 커요.",
    fact: "수성의 하루(일출에서 다음 일출까지)는 약 176일로, 1년(88일)보다 길어요!",
  },
  {
    id: "venus", name: "금성", en: "Venus", type: "rocky",
    color: "radial-gradient(circle at 35% 35%, #fff1c9, #e3b86b 55%, #a8753a)",
    diameter: 12104, distance: 0.72, day: "약 243일", year: "225일", moons: "0개", temp: "평균 약 464°C",
    desc: "두꺼운 이산화탄소 대기 때문에 온실효과가 심해서 태양계에서 가장 뜨거운 행성이에요.",
    fact: "금성은 다른 행성과 반대 방향으로 자전해서, 해가 서쪽에서 떠요.",
  },
  {
    id: "earth", name: "지구", en: "Earth", type: "rocky",
    color: "radial-gradient(circle at 35% 35%, #a8e6ff, #2f7fd8 45%, #2d8a4e 60%, #123a6b)",
    diameter: 12742, distance: 1.0, day: "24시간", year: "365.25일", moons: "1개", temp: "평균 약 15°C",
    desc: "액체 상태의 물과 생명체가 있는 것으로 알려진 유일한 행성이에요.",
    fact: "지구는 완벽한 구가 아니라 적도 쪽이 살짝 볼록한 모양이에요.",
  },
  {
    id: "mars", name: "화성", en: "Mars", type: "rocky",
    color: "radial-gradient(circle at 35% 35%, #ffb08a, #d0532b 55%, #7a2a14)",
    diameter: 6779, distance: 1.52, day: "24시간 37분", year: "687일", moons: "2개", temp: "평균 약 -63°C",
    desc: "산화철 먼지 때문에 붉게 보이는 '붉은 행성'이에요. 과거에 물이 흘렀던 흔적이 있어요.",
    fact: "태양계에서 가장 높은 화산인 올림푸스 산(약 22km)이 화성에 있어요.",
  },
  {
    id: "jupiter", name: "목성", en: "Jupiter", type: "gas",
    color: "repeating-linear-gradient(170deg, #e8cfa8 0 9%, #b9824f 9% 15%, #f2e3c8 15% 24%, #a86d42 24% 29%)",
    diameter: 139820, distance: 5.2, day: "약 10시간", year: "약 11.9년", moons: "95개 이상", temp: "약 -110°C",
    desc: "태양계에서 가장 큰 행성으로, 다른 행성을 모두 합친 것보다 두 배 이상 무거워요.",
    fact: "대적점은 수백 년째 이어지는 거대한 폭풍으로, 지구보다 커요.",
  },
  {
    id: "saturn", name: "토성", en: "Saturn", type: "gas",
    color: "repeating-linear-gradient(170deg, #f3e2b3 0 12%, #d4b06e 12% 18%, #efdcae 18% 30%)",
    diameter: 116460, distance: 9.54, day: "약 10.7시간", year: "약 29.5년", moons: "270개 이상", temp: "약 -140°C",
    desc: "얼음과 암석 조각으로 이루어진 화려한 고리로 유명한 행성이에요.",
    fact: "토성은 밀도가 물보다 낮아서, 아주 큰 욕조가 있다면 물에 뜰 거예요.",
  },
  {
    id: "uranus", name: "천왕성", en: "Uranus", type: "ice",
    color: "radial-gradient(circle at 35% 35%, #e3fbff, #8fdbe6 55%, #3f9aa8)",
    diameter: 50724, distance: 19.2, day: "약 17시간", year: "약 84년", moons: "28개 이상", temp: "약 -195°C",
    desc: "메탄 때문에 청록색으로 보이는 얼음 거인이에요. 자전축이 약 98° 기울어 누운 채로 돌아요.",
    fact: "극지방은 42년 동안 낮, 42년 동안 밤이 이어져요.",
  },
  {
    id: "neptune", name: "해왕성", en: "Neptune", type: "ice",
    color: "radial-gradient(circle at 35% 35%, #b5ceff, #3d63e0 55%, #1a2c80)",
    diameter: 49244, distance: 30.1, day: "약 16시간", year: "약 165년", moons: "16개", temp: "약 -200°C",
    desc: "태양에서 가장 먼 행성으로, 태양계에서 가장 강한 바람이 불어요.",
    fact: "해왕성의 바람은 시속 2,000km가 넘어서 음속보다 빨라요.",
  },
];

const TYPE_LABEL = { rocky: "암석형 행성", gas: "가스형 행성", ice: "얼음형 행성" };
const EARTH_D = 12742;
const $ = (sel) => document.querySelector(sel);

// ---------- 별 배경 ----------
(function stars() {
  const canvas = $("#stars");
  const ctx = canvas.getContext("2d");
  let list = [];

  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    const count = Math.floor((innerWidth * innerHeight) / 2500);
    list = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 * devicePixelRatio,
      p: Math.random() * Math.PI * 2,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of list) {
      ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t / 1500 + s.p));
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();

// ---------- 궤도 애니메이션 ----------
const orbit = $("#orbit");
const orbs = PLANETS.map((p, i) => {
  const radius = 11 + i * 5.2;                 // 궤도 반지름 (%)
  const size = { mercury: 2, venus: 3, earth: 3.2, mars: 2.5, jupiter: 6, saturn: 5, uranus: 4, neptune: 4 }[p.id];

  const ring = document.createElement("div");
  ring.className = "ring";
  ring.style.width = ring.style.height = radius * 2 + "%";
  orbit.appendChild(ring);

  const orb = document.createElement("button");
  orb.type = "button";
  orb.className = "orb " + p.id;
  orb.style.width = orb.style.height = size + "%";
  orb.style.background = p.color;
  orb.setAttribute("aria-label", p.name + " 자세히 보기");
  orb.title = p.name;
  orb.addEventListener("click", () => openDetail(p));
  orbit.appendChild(orb);

  // 실제 공전 주기 비율(케플러 법칙: T ∝ a^1.5)을 이용해 속도를 정해요
  return { orb, radius, angle: Math.random() * 360, speed: 40 / Math.pow(p.distance, 1.5) };
});

let running = true;
let speedFactor = 1;
let last = performance.now();

function tick(now) {
  const dt = (now - last) / 1000;
  last = now;
  if (running) {
    for (const o of orbs) {
      o.angle = (o.angle + o.speed * speedFactor * dt) % 360;
      const rad = (o.angle * Math.PI) / 180;
      o.orb.style.left = 50 + o.radius * Math.cos(rad) + "%";
      o.orb.style.top = 50 + o.radius * Math.sin(rad) + "%";
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

$("#toggleSpin").addEventListener("click", (e) => {
  running = !running;
  e.currentTarget.textContent = running ? "⏸ 일시정지" : "▶ 재생";
});
$("#speed").addEventListener("input", (e) => (speedFactor = Number(e.target.value)));

// ---------- 카드 ----------
const cards = $("#cards");
PLANETS.forEach((p, i) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card";
  card.dataset.type = p.type;
  card.style.animationDelay = i * 60 + "ms";
  card.innerHTML = `
    <div class="ball" style="background:${p.color}"></div>
    <h3>${p.name} <span class="en">${p.en}</span></h3>
    <span class="tag">${TYPE_LABEL[p.type]}</span>
    <p>${p.desc}</p>`;
  card.addEventListener("click", () => openDetail(p));
  cards.appendChild(card);
});

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".card").forEach((c) => {
      c.classList.toggle("hidden", f !== "all" && c.dataset.type !== f);
    });
  });
});

// ---------- 크기 비교 ----------
const sizes = $("#sizes");
const maxD = Math.max(...PLANETS.map((p) => p.diameter));
PLANETS.forEach((p) => {
  const row = document.createElement("div");
  row.className = "size-row";
  row.innerHTML = `
    <span>${p.name}</span>
    <div class="bar-track"><div class="bar" style="background:${p.color}" data-w="${(p.diameter / maxD) * 100}"></div></div>
    <span>${(p.diameter / EARTH_D).toFixed(2)}</span>`;
  sizes.appendChild(row);
});

// 화면에 보일 때 막대가 늘어나도록
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    sizes.querySelectorAll(".bar").forEach((b) => (b.style.width = b.dataset.w + "%"));
    obs.disconnect();
  }
}, { threshold: 0.3 }).observe(sizes);

// ---------- 상세 보기 ----------
const dialog = $("#detail");

function openDetail(p) {
  $("#dPlanet").style.background = p.color;
  $("#dEn").textContent = p.en + " · " + TYPE_LABEL[p.type];
  $("#dName").textContent = p.name;
  $("#dDesc").textContent = p.desc;
  $("#dFact").textContent = "💡 " + p.fact;
  const stats = [
    ["지름", p.diameter.toLocaleString() + " km"],
    ["태양과의 거리", p.distance + " AU"],
    ["하루(자전)", p.day],
    ["1년(공전)", p.year],
    ["위성 수", p.moons],
    ["온도", p.temp],
  ];
  $("#dStats").innerHTML = stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  dialog.showModal();
}

dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close(); // 바깥(배경) 클릭 시 닫기
});

// ---------- 퀴즈 ----------
const QUIZ = [
  { q: "태양계에서 가장 큰 행성은?", a: "목성" },
  { q: "태양계에서 가장 뜨거운 행성은?", a: "금성" },
  { q: "'붉은 행성'이라고 불리는 행성은?", a: "화성" },
  { q: "물에 뜰 만큼 밀도가 낮은 행성은?", a: "토성" },
  { q: "누운 채로 자전하는 행성은?", a: "천왕성" },
  { q: "태양에서 가장 가까운 행성은?", a: "수성" },
  { q: "태양계에서 바람이 가장 강한 행성은?", a: "해왕성" },
];
let quizIndex = -1;

function nextQuiz() {
  let n;
  do { n = Math.floor(Math.random() * QUIZ.length); } while (n === quizIndex && QUIZ.length > 1);
  quizIndex = n;
  const { q, a } = QUIZ[n];
  $("#quizQ").textContent = q;
  $("#quizResult").textContent = "";

  const options = PLANETS.map((p) => p.name).sort(() => Math.random() - 0.5);
  const box = $("#quizA");
  box.innerHTML = "";
  options.forEach((name) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = name;
    b.addEventListener("click", () => {
      box.querySelectorAll("button").forEach((x) => {
        x.disabled = true;
        if (x.textContent === a) x.classList.add("correct");
      });
      if (name === a) {
        $("#quizResult").textContent = "🎉 정답이에요!";
      } else {
        b.classList.add("wrong");
        $("#quizResult").textContent = `아쉬워요! 정답은 ${a}이에요.`;
      }
    });
    box.appendChild(b);
  });
}
$("#quizNext").addEventListener("click", nextQuiz);
nextQuiz();
