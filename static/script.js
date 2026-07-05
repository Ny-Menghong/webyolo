
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
    window.onload = function () {
      document.getElementById('btn-home').click();
    };
    /* ---------- Mobile Menu ---------- */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
      mobileMenu.style.maxHeight = open ? '0px' : mobileMenu.scrollHeight + 'px';
      menuBtn.innerHTML = open ? '<i class="fa-solid fa-bars"></i>' : '<i class="fa-solid fa-xmark"></i>';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.style.maxHeight = '0px';
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
    // 🔁 function switch page
    function showPage(page) {
      // remove active from all nav links
      document.querySelectorAll('.nav-link').forEach(p => {
        p.classList.remove('active');
      });
      document.querySelectorAll('.page').forEach(p => {
        p.style.display = "none";
      });
      // show selected page
      document.getElementById(page).style.display = "block";
      // add active to clicked button
      event.target.classList.add('active');
    }
    /* ---------- Typing effect ---------- */
    const typingText = "Build Your IT Skill";
    const typingTarget = document.getElementById('typingTarget');
    let ti = 0;
    function typeLoop() {
      if (ti <= typingText.length) {
        typingTarget.textContent = typingText.slice(0, ti);
        ti++;
        setTimeout(typeLoop, 45);
      } else {
        typingTarget.classList.remove('typing-cursor');
        setTimeout(() => typingTarget.classList.add('typing-cursor'), 400);
      }
    }
    typeLoop();
    /* ---------- Number counters ---------- */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          let cur = 0;
          const step = target / 60;
          const isDecimal = target % 1 !== 0;
          const tick = () => {
            cur += step;
            if (cur >= target) { el.textContent = isDecimal ? target.toFixed(1) : target; return; }
            el.textContent = isDecimal ? cur.toFixed(1) : Math.floor(cur);
            requestAnimationFrame(tick);
          };
          tick();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    /* ---------- Interactive neural network diagram (Deep Learning section) ---------- */
    const nnCanvas = document.getElementById('nnCanvas');
    const nnctx = nnCanvas.getContext('2d');
    function sizeNN() { nnCanvas.width = nnCanvas.clientWidth; nnCanvas.height = 360; }
    sizeNN(); window.addEventListener('resize', sizeNN);
    const layers = [4, 6, 6, 3];
    let pulse = 0;
    function layerPositions() {
      const w = nnCanvas.width, h = nnCanvas.height;
      return layers.map((count, li) => {
        const x = (w / (layers.length + 1)) * (li + 1);
        return Array.from({ length: count }, (_, i) => ({
          x, y: (h / (count + 1)) * (i + 1)
        }));
      });
    }
    function drawNN() {
      const w = nnCanvas.width, h = nnCanvas.height;
      nnctx.clearRect(0, 0, w, h);
      const pos = layerPositions();
      for (let l = 0; l < pos.length - 1; l++) {
        pos[l].forEach((a, ai) => {
          pos[l + 1].forEach((b, bi) => {
            const active = ((pulse + ai + bi) % 14) < 2;
            nnctx.strokeStyle = active ? 'rgba(6,182,212,0.85)' : 'rgba(148,163,184,0.12)';
            nnctx.lineWidth = active ? 1.6 : 1;
            nnctx.beginPath(); nnctx.moveTo(a.x, a.y); nnctx.lineTo(b.x, b.y); nnctx.stroke();
          });
        });
      }
      pos.forEach((layer, li) => {
        layer.forEach(n => {
          const grad = nnctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10);
          const colors = ['#3B82F6', '#8B5CF6', '#8B5CF6', '#06B6D4'];
          grad.addColorStop(0, colors[li]);
          grad.addColorStop(1, 'rgba(15,23,42,0)');
          nnctx.fillStyle = grad;
          nnctx.beginPath(); nnctx.arc(n.x, n.y, 9, 0, Math.PI * 2); nnctx.fill();
          nnctx.fillStyle = colors[li];
          nnctx.beginPath(); nnctx.arc(n.x, n.y, 4, 0, Math.PI * 2); nnctx.fill();
        });
      });
      pulse++;
      requestAnimationFrame(drawNN);
    }
    drawNN();
    /* ---------- YOLO Architecture pulse ---------- */
    const archEls = document.querySelectorAll('.arch-pulse');
    let archIndex = 0;
    setInterval(() => {
      archEls.forEach(el => el.style.opacity = 0);
      archEls[archIndex % archEls.length].style.opacity = 1;
      archIndex++;
    }, 900);

    /* ---------- Pipeline (Section 5) ---------- */
    const pipelineSteps = [
      {
        label: 'រូបភាពចូល (Input Image)',
        desc: 'បញ្ចូលរូបភាពដើមទៅក្នុងប្រព័ន្ធ AI',
        icon: 'fa-image',
        color: '#3B82F6'
      },
      {
        label: 'បម្លែងទំហំ (Resize)',
        desc: 'កាត់បន្ថយ ឬបម្លែងរូបភាពទៅទំហំស្តង់ដារ ដើម្បីងាយដំណើរការ',
        icon: 'fa-expand',
        color: '#3B82F6'
      },
      {
        label: 'CNN Backbone',
        desc: 'បណ្តាញ Convolutional Neural Network សម្រាប់រៀនលក្ខណៈសំខាន់ៗពីរូបភាព',
        icon: 'fa-microchip',
        color: '#8B5CF6'
      },
      {
        label: 'ទាញយក Feature (Feature Extraction)',
        desc: 'ស្វែងរកលក្ខណៈពិសេស ដូចជា edges, shapes និង patterns',
        icon: 'fa-layer-group',
        color: '#8B5CF6'
      },
      {
        label: 'Head ព្យាករណ៍ (Prediction Head)',
        desc: 'ផ្នែកដែលទាយទីតាំង និងប្រភេទវត្ថុក្នុងរូបភាព',
        icon: 'fa-crosshairs',
        color: '#06B6D4'
      },
      {
        label: 'ប្រអប់ចាប់វត្ថុ (Bounding Boxes)',
        desc: 'គូសប្រអប់ជុំវិញវត្ថុដែលត្រូវបានរកឃើញ',
        icon: 'fa-vector-square',
        color: '#06B6D4'
      },
      {
        label: 'កម្រិតទំនុកចិត្ត (Confidence Score)',
        desc: 'បង្ហាញភាគរយភាពប្រាកដថាវត្ថុត្រូវបានទាយត្រឹមត្រូវ',
        icon: 'fa-gauge-high',
        color: '#F59E0B'
      },
      {
        label: 'NMS (Non-Maximum Suppression)',
        desc: 'ដកចេញប្រអប់ដែលស្ទួនគ្នា ហើយរក្សាទុកតែការទាយល្អបំផុត',
        icon: 'fa-filter',
        color: '#F59E0B'
      },
      {
        label: 'លទ្ធផលចុងក្រោយ (Final Detection)',
        desc: 'បង្ហាញលទ្ធផលចុងក្រោយនៃការចាប់វត្ថុទាំងអស់',
        icon: 'fa-circle-check',
        color: '#10B981'
      },
    ];

    const pipelineEl = document.getElementById('pipeline');
    pipelineSteps.forEach((s, i) => {
      const node = document.createElement('div');
      node.className = 'flow-node';
      node.setAttribute('data-aos', 'fade-up');
      node.setAttribute('data-aos-delay', (i % 3) * 80);
      node.innerHTML = `
    <div class="glass glass-card frame-corners flex flex-col gap-2 px-6 py-4 w-80">
      <span class="fc-tr"></span><span class="fc-br"></span>

      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg grid place-items-center"
             style="background:${s.color}22; color:${s.color};">
          <i class="fa-solid ${s.icon}"></i>
        </div>

        <span class="text-sm font-semibold">${s.label}</span>
      </div>

      <p class="text-xs text-gray-400 leading-relaxed pl-12">
        ${s.desc}
      </p>
    </div>
  `;

      pipelineEl.appendChild(node);

      if (i < pipelineSteps.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'flow-connector h-8';
        pipelineEl.appendChild(connector);
      }
    });

    /* ---------- How YOLO Detects steps (Section 7) ---------- */
    const detectSteps = [
      "១. បញ្ចូលរូបភាព (Input Image) — រូបភាព ឬវីដេអូត្រូវបានផ្ទុកចូលទៅក្នុងម៉ូដែល YOLO ដើម្បីចាប់ផ្តើមដំណើរការ។",

      "២. កែទំហំរូបភាព (Resize Image) — រូបភាពត្រូវបានបម្លែងទៅទំហំស្តង់ដារដែលម៉ូដែលអាចយល់បាន ដើម្បីធានាភាពត្រឹមត្រូវ។",

      "៣. ទាញយកលក្ខណៈ (Feature Extraction — CNN) — Convolutional Neural Network វិភាគរូបភាព និងបង្កើត Feature Map ដើម្បីយល់ពីរូបភាព។",

      "៤. បែងចែក Grid និងទស្សន៍ទាយ Bounding Boxes — រូបភាពត្រូវបានបែងចែកជា Grid ហើយក្រឡានីមួយៗទស្សន៍ទាយទីតាំងវត្ថុ។",

      "៥. គណនាពិន្ទុទំនុកចិត្ត (Confidence Score) — រាល់ Bounding Box នីមួយៗទទួលបានពិន្ទុបង្ហាញថាវត្ថុនោះមាននៅទីនោះពិតប្រាកដប៉ុន្មាន។",

      "៦. កំណត់ប្រភេទវត្ថុ (Class Prediction) — ម៉ូដែលទស្សន៍ទាយថាវត្ថុនោះជាអ្វី ដូចជា មនុស្ស រថយន្ត ឬសត្វ។",

      "៧. ការលុបបំបាត់ប្រអប់ស្ទួន (Non-Max Suppression - NMS) — លុប Bounding Boxes ដែលស្ទួនគ្នា ដើម្បីទុកតែការទស្សន៍ទាយដែលមានភាពត្រឹមត្រូវខ្ពស់បំផុត។",

      "៨. បង្ហាញលទ្ធផលចុងក្រោយ (Final Output) — វត្ថុដែលបានរកឃើញត្រូវបានគូស Bounding Boxes និងបង្ហាញលើរូបភាព ឬវីដេអូ។"
    ];
    const stepsList = document.getElementById('stepsList');
    detectSteps.forEach((text, i) => {
      const div = document.createElement('div');
      div.className = 'glass glass-card frame-corners p-5 flex gap-4 items-start';
      div.setAttribute('data-aos', 'fade-up');
      div.setAttribute('data-aos-delay', (i % 4) * 80);
      div.innerHTML = `
    <span class="fc-tr"></span><span class="fc-br"></span>
    <div class="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center font-mono text-xs font-bold text-white">${i + 1}</div>
    <p class="text-sm text-slate-300">${text}</p>`;
      stepsList.appendChild(div);
    });

    /* ---------- Bounding Box interactive (Section 8) ---------- */
    const bboxRect = document.getElementById('bboxRect');
    const bboxHandle = document.getElementById('bboxHandle');
    const bboxStage = document.getElementById('bboxStage');
    let dragging = false;
    bboxHandle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
    bboxHandle.addEventListener('touchstart', e => { dragging = true; }, { passive: true });
    function updateBBox(clientX, clientY) {
      const stageRect = bboxStage.getBoundingClientRect();
      const rectLeft = bboxRect.offsetLeft, rectTop = bboxRect.offsetTop;
      let w = Math.max(30, Math.min(clientX - stageRect.left - rectLeft, stageRect.width - rectLeft));
      let h = Math.max(30, Math.min(clientY - stageRect.top - rectTop, stageRect.height - rectTop));
      bboxRect.style.width = w + 'px';
      bboxRect.style.height = h + 'px';
      document.getElementById('valX').textContent = Math.round(rectLeft + w / 2);
      document.getElementById('valY').textContent = Math.round(rectTop + h / 2);
      document.getElementById('valW').textContent = Math.round(w);
      document.getElementById('valH').textContent = Math.round(h);
    }
    window.addEventListener('mousemove', e => { if (dragging) updateBBox(e.clientX, e.clientY); });
    window.addEventListener('touchmove', e => { if (dragging && e.touches[0]) updateBBox(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('touchend', () => dragging = false);

    /* ---------- Confidence Threshold slider (Section 9) ---------- */
    const threshSlider = document.getElementById('threshSlider');
    const threshVal = document.getElementById('threshVal');
    const confBoxes = document.querySelectorAll('.conf-box');
    function applyThreshold() {
      const t = parseFloat(threshSlider.value);
      threshVal.textContent = t.toFixed(2);
      confBoxes.forEach(b => {
        const c = parseFloat(b.dataset.conf);
        b.style.opacity = c >= t ? '1' : '0.08';
      });
    }
    threshSlider.addEventListener('input', applyThreshold);
    applyThreshold();

    /* ---------- YOLO Versions (Section 10) ---------- */
    const versions = [
      {
        name: 'YOLOv1',
        year: '2016',
        feat: 'ស្ថាបត្យកម្មដំបូង (First version) ប្រើ Single Neural Network ដើម្បីទស្សន៍ទាយ bounding boxes និង class ក្នុងមួយដង (one-stage detection)។ ល្បឿនលឿនជាង R-CNN ប៉ុន្តែ accuracy នៅទាបជាងបន្តិច',
        speed: 45,
        acc: 63.4
      },
      {
        name: 'YOLOv2',
        year: '2017',
        feat: 'បន្ថែម Anchor Boxes ដើម្បីកែលម្អការទស្សន៍ទាយ object ទំហំខុសៗគ្នា។ ប្រើ Batch Normalization និង higher resolution training ដើម្បីបង្កើនភាពត្រឹមត្រូវ',
        speed: 67,
        acc: 76.8
      },
      {
        name: 'YOLOv3',
        year: '2018',
        feat: 'ប្រើ Multi-scale prediction (3 scales) ដើម្បីចាប់វត្ថុតូច និងធំបានល្អ។ ប្រើ backbone Darknet-53 ដែលមានល្បឿន និង accuracy សមតុល្យគ្នា',
        speed: 65,
        acc: 80.2
      },
      {
        name: 'YOLOv4',
        year: '2020',
        feat: 'កែលម្អ backbone CSPDarknet និងប្រើ PANet + SPP + Mosaic augmentation ដើម្បីបង្កើន accuracy ខ្លាំង ខណៈដែលនៅតែលឿនសម្រាប់ real-time',
        speed: 65,
        acc: 88.3
      },
      {
        name: 'YOLOv5',
        year: '2020',
        feat: 'អភិវឌ្ឍដោយ PyTorch ងាយ train និង deploy។ មាន model size ច្រើន (n/s/m/l/x) សមស្របសម្រាប់ device ខុសៗគ្នា និងមាន community support ខ្លាំង',
        speed: 140,
        acc: 88.9
      },
      {
        name: 'YOLOv6',
        year: '2022',
        feat: 'រចនាសម្រាប់ industry deployment ដោយ optimize hardware performance (GPU/CPU) និង latency ទាប។ សមស្របសម្រាប់ production system',
        speed: 150,
        acc: 89.5
      },
      {
        name: 'YOLOv7',
        year: '2022',
        feat: 'ប្រើ trainable bag-of-freebies និង architecture optimization ដើម្បីបង្កើន efficiency និង accuracy ដោយមិនបន្ថែម compute ច្រើន',
        speed: 161,
        acc: 90.1
      },
      {
        name: 'YOLOv8',
        year: '2023',
        feat: 'Anchor-free detection head, សម្រួល pipeline ទាំង detect/segment/pose ក្នុង framework តែមួយ។ ងាយប្រើ និង modern API',
        speed: 170,
        acc: 90.8
      },
      {
        name: 'YOLOv9',
        year: '2024',
        feat: 'ប្រើ Programmable Gradient Information (PGI) ដើម្បីកាត់បន្ថយ information loss ក្នុង training និងបង្កើន accuracy',
        speed: 172,
        acc: 91.3
      },
      {
        name: 'YOLOv10',
        year: '2024',
        feat: 'NMS-free architecture (មិនចាំបាច់ Non-Max Suppression) ដើម្បីកាត់បន្ថយ latency និងធ្វើ inference ឲ្យលឿនជាងមុន',
        speed: 180,
        acc: 91.6
      },
      {
        name: 'YOLO11',
        year: '2024',
        feat: 'កែលម្អ backbone និង neck ឲ្យមាន balance ល្អរវាង speed និង accuracy។ សមស្របសម្រាប់ real-time AI system ទំនើប',
        speed: 185,
        acc: 92.1
      },
    ];
    const versionGrid = document.getElementById('versionGrid');
    versions.forEach((v, i) => {
      const card = document.createElement('div');
      card.className = 'glass glass-card frame-corners p-5';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', (i % 3) * 80);
      card.innerHTML = `
    <span class="fc-tr"></span><span class="fc-br"></span>
    <div class="flex items-center justify-between">
      <h4 class="font-display font-bold text-lg">${v.name}</h4>
      <span class="text-xs font-mono text-accent pill glass px-2 py-0.5">${v.year}</span>
    </div>
    <p class="text-sm text-slate-400 mt-2">${v.feat}</p>
    <div class="flex gap-4 mt-4 text-xs font-mono">
      <div><i class="fa-solid fa-gauge-high text-primary mr-1"></i>${v.speed} FPS</div>
      <div><i class="fa-solid fa-bullseye text-secondary mr-1"></i>${v.acc}% mAP</div>
    </div>`;
      versionGrid.appendChild(card);
    });
    new Chart(document.getElementById('versionChart'), {
      type: 'line',
      data: {
        labels: versions.map(v => v.name),
        datasets: [
          { label: 'Speed (FPS)', data: versions.map(v => v.speed), borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.15)', tension: 0.35, fill: true, yAxisID: 'y' },
          { label: 'Accuracy (mAP %)', data: versions.map(v => v.acc), borderColor: '#8B5CF6', backgroundColor: 'rgba(139,92,246,0.15)', tension: 0.35, fill: true, yAxisID: 'y1' },
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { labels: { color: '#cbd5e1' } } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.08)' } },
          y: { position: 'left', ticks: { color: '#3B82F6' }, grid: { color: 'rgba(148,163,184,0.08)' }, title: { display: true, text: 'FPS', color: '#3B82F6' } },
          y1: { position: 'right', ticks: { color: '#8B5CF6' }, grid: { display: false }, title: { display: true, text: 'mAP %', color: '#8B5CF6' } },
        }
      }
    });

    /* ---------- Demo buttons (styled only) ---------- */
    document.getElementById('btnUpload').addEventListener('click', () => {
      document.getElementById('demoResult').classList.add('ring-2', 'ring-accent');
      setTimeout(() => document.getElementById('demoResult').classList.remove('ring-2', 'ring-accent'), 900);
    });
    document.getElementById('btnCamera').addEventListener('click', () => {
      document.getElementById('demoResult').classList.add('ring-2', 'ring-secondary');
      setTimeout(() => document.getElementById('demoResult').classList.remove('ring-2', 'ring-secondary'), 900);
    });


    // ===== TAB SYSTEM =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    // Function to activate tab
    function activateTab(tabId) {
      // Remove active from all
      tabBtns.forEach(btn => {
        btn.classList.remove('bg-[#4f46e5]', 'text-white', 'shadow-lg', 'shadow-[#4f46e5]/30');
        btn.classList.add('text-[#94a3b8]');
      });
      tabContents.forEach(content => content.classList.remove('active'));
      // Activate target
      const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
      const targetContent = document.getElementById(tabId);
      if (targetBtn) {
        targetBtn.classList.add('bg-[#4f46e5]', 'text-white', 'shadow-lg', 'shadow-[#4f46e5]/30');
      }
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Save to localStorage
      try {
        localStorage.setItem('yoloActiveTab', tabId);
      } catch (e) { /* ignore */ }
    }

    // Add click listeners
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');
        activateTab(tabId);
      });
    });
    // Restore last active tab
    try {
      const savedTab = localStorage.getItem('yoloActiveTab');
      if (savedTab) {
        const exists = document.getElementById(savedTab);
        if (exists) {
          activateTab(savedTab);
        } else {
          activateTab('tab1');
        }
      } else {
        activateTab('tab1');
      }
    } catch (e) {
      activateTab('tab1');
    }



