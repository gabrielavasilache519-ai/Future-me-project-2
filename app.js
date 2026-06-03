/* ============================================
   Future Me, Age 20 — App Logic
   Single-page quiz app with Stripe payments
   ============================================ */

(function () {
  'use strict';

  // ─── QUIZ CONTENT ───────────────────────────

  const QUESTIONS = [
    {
      id: 1,
      text: `Where is your toddler's "emergency" snack stash most likely to be found?`,
      answers: [
        { letter: 'A', text: 'Jammed deep into the couch cushions', archetype: 'Strategist' },
        { letter: 'B', text: 'Neatly lined up on the coffee table for "later"', archetype: 'Negotiator' },
        { letter: 'C', text: 'Hidden inside one of your favorite boots', archetype: 'Wildcard' },
        { letter: 'D', text: 'Smeared artistically across their own forehead', archetype: 'Performer' }
      ]
    },
    {
      id: 2,
      text: 'How does your toddler interact with the family pet (or a passing pigeon)?',
      answers: [
        { letter: 'A', text: 'Offering them a soggy, half-eaten cracker as a peace offering', archetype: 'Negotiator' },
        { letter: 'B', text: 'Attempting to ride them like a majestic steed', archetype: 'Engineer' },
        { letter: 'C', text: 'Delivering an aggressive, unprompted 10-second hug', archetype: 'Performer' },
        { letter: 'D', text: 'Staring them down in a silent power struggle until the animal leaves', archetype: 'Strategist' }
      ]
    },
    {
      id: 3,
      text: 'You just bought a brand-new Lego set. What is their first move?',
      answers: [
        { letter: 'A', text: 'Following the "instructions" (aka making you do it while they supervise)', archetype: 'Negotiator' },
        { letter: 'B', text: 'Building a "spaceship" that is actually just a very tall, unstable tower', archetype: 'Engineer' },
        { letter: 'C', text: 'Throwing the bricks one by one to see which makes the loudest "clink"', archetype: 'Wildcard' },
        { letter: 'D', text: 'Hiding the most crucial piece where no one will find it for three years', archetype: 'Strategist' }
      ]
    },
    {
      id: 4,
      text: `When the beat drops (even if it's just the dishwasher hum), what's the vibe?`,
      answers: [
        { letter: 'A', text: 'A classic, rhythmically-questionable "aggressive head bob"', archetype: 'Strategist' },
        { letter: 'B', text: 'A full-body, floor-rolling interpretive dance performance', archetype: 'Performer' },
        { letter: 'C', text: 'Trying to dismantle the speaker/dishwasher to find the music', archetype: 'Engineer' },
        { letter: 'D', text: 'Clapping and demanding everyone else in the room stands up to dance', archetype: 'Negotiator' }
      ]
    },
    {
      id: 5,
      text: 'Another kid at the playground says "no" to sharing a shovel. Your toddler:',
      answers: [
        { letter: 'A', text: 'Pitching a 5-star, Oscar-worthy performance tantrum', archetype: 'Performer' },
        { letter: 'B', text: 'Patiently explaining in toddler-ese why they should actually have the shovel', archetype: 'Negotiator' },
        { letter: 'C', text: 'Attempting to trade a very cool, slightly damp rock for the shovel', archetype: 'Strategist' },
        { letter: 'D', text: 'Walking away and finding an even better "shovel" (a stick) immediately', archetype: 'Wildcard' }
      ]
    },
    {
      id: 6,
      text: 'What is the mandatory, non-negotiable bedtime ritual?',
      answers: [
        { letter: 'A', text: 'Requesting "one more water" exactly five times', archetype: 'Negotiator' },
        { letter: 'B', text: 'Needing 14 specific stuffed animals arranged in a protective perimeter', archetype: 'Strategist' },
        { letter: 'C', text: 'A 20-minute solo concert featuring remixed nursery rhymes', archetype: 'Performer' },
        { letter: 'D', text: 'Attempting a daring, slow-motion escape over the crib railing', archetype: 'Engineer' }
      ]
    },
    {
      id: 7,
      text: `How do they communicate their deepest desires when they don't have the words?`,
      answers: [
        { letter: 'A', text: 'Pointing and shouting "DAT!" with the intensity of a thousand suns', archetype: 'Wildcard' },
        { letter: 'B', text: 'Taking your hand and leading you directly to the cookie jar', archetype: 'Negotiator' },
        { letter: 'C', text: 'Using complex miming, sound effects, and eyebrow movements', archetype: 'Performer' },
        { letter: 'D', text: 'Silent, unblinking, intense staring until you eventually buckle', archetype: 'Strategist' }
      ]
    },
    {
      id: 8,
      text: 'Which "forbidden" household item is their current obsession?',
      answers: [
        { letter: 'A', text: 'The TV Remote (they know exactly which button mutes it)', archetype: 'Strategist' },
        { letter: 'B', text: 'The Tupperware Drawer (it must be emptied daily)', archetype: 'Engineer' },
        { letter: 'C', text: "Mom's Makeup or Skincare (the more expensive, the better)", archetype: 'Performer' },
        { letter: 'D', text: 'The Trash Can (it’s a treasure chest of wonders)', archetype: 'Wildcard' }
      ]
    },
    {
      id: 9,
      text: 'How does your toddler handle a toy that just won\'t work the way they want it to?',
      answers: [
        { letter: 'A', text: 'Repeatedly trying the exact same wrong thing with increasing intensity', archetype: 'Strategist' },
        { letter: 'B', text: 'Bringing it to you, placing it in your lap, and staring expectantly', archetype: 'Negotiator' },
        { letter: 'C', text: 'Swiftly launching it across the room and moving on to the next victim immediately', archetype: 'Wildcard' },
        { letter: 'D', text: 'Studying it from all angles, poking it with a finger, and trying to dismantle it', archetype: 'Engineer' }
      ]
    },
    {
      id: 10,
      text: 'What is the primary goal of bath time?',
      answers: [
        { letter: 'A', text: 'Creating a localized flood on the bathroom floor', archetype: 'Engineer' },
        { letter: 'B', text: 'Seeing how many bubbles can be stacked on their own head', archetype: 'Performer' },
        { letter: 'C', text: 'Testing if the bath water tastes different than regular water', archetype: 'Wildcard' },
        { letter: 'D', text: 'Refusing to get in, then refusing to get out for 45 minutes', archetype: 'Strategist' }
      ]
    }
  ];

  const ARCHETYPES = {
    Negotiator: {
      emoji: '🤝',
      color: '#60A5FA',
      jobs: ['International Peace Envoy', 'Chief Talent Agent', 'High-Stakes Hostage Negotiator', 'Luxury Real Estate Mogul', 'Corporate Synergy Consultant', 'PR Crisis Manager'],
      hobbies: ['Competitive Debating', 'Philanthropy & Gala Hosting', 'Strategic Board Gaming', 'Political Campaigning'],
      talents: ['Can negotiate a 50% discount anywhere', 'Always knows exactly what people want to hear', 'Can talk their way out of a speeding ticket (at age 6)', 'Expert at finding common ground in a snack dispute']
    },
    Strategist: {
      emoji: '🧠',
      color: '#7C3AED',
      jobs: ['Cybersecurity Mastermind', 'Professional Poker Player', 'Hedge Fund Manager', 'Supply Chain Architect', 'Special Ops Intelligence Officer', 'Professional Hide-and-Seek World Champion'],
      hobbies: ['Chess Grandmastery', 'Urban Exploration', 'Geocaching (Extreme Edition)', 'Collecting Rare Artifacts (Rocks)'],
      talents: ['Can hear a snack wrapper opening from three floors away', 'Never forgets where the "good" toys are hidden', 'Incredible long-term memory for broken promises', 'Can identify any snack by smell alone']
    },
    Performer: {
      emoji: '🎭',
      color: '#FF6B9D',
      jobs: ['Broadway Lead', 'Viral Content Creator', 'Motivational Speaker', 'Red Carpet Correspondent', 'Professional Awards Show Host', 'Chief Hype Officer'],
      hobbies: ['Karaoke Legend', 'Experimental Sound Design', 'Amateur Linguistics (Making up words)', 'Performance Art (Floor rolling)'],
      talents: ['Has perfect pitch for lullabies', 'Can turn any household object into a hat', 'Professional-grade puppy dog eyes', 'Can cry on command (for cookies)']
    },
    Engineer: {
      emoji: '🔧',
      color: '#34D399',
      jobs: ['Demolition Expert', 'Spacecraft Architect', 'Furniture Designer (Deconstructive)', 'Sustainable Energy Innovator', 'Chief Robotics Engineer', 'Underwater Tunnel Constructor'],
      hobbies: ['Advanced Pillow Fort Construction', 'Vintage Toy Restoration', 'Parkour (Living Room Edition)', 'High-Stakes Lego Architecture'],
      talents: ['Can open any child-proof lock in under 10 seconds', 'Can detect a structural weakness in any bookshelf', 'Master of the "One More Minute" of tinkering', 'Ability to fit 14 pebbles in one pocket without ripping it']
    },
    Wildcard: {
      emoji: '🌟',
      color: '#FB923C',
      jobs: ['Extreme Weather Chaser', 'Abstract Expressionist Painter', 'Wilderness Survival Guide', 'Professional Snack Taster', 'Chief Chaos Coordinator', 'Experimental Chef'],
      hobbies: ['Guerilla Gardening (Pulling up flowers)', 'Extreme Bubble Blowing', 'Competitive Staring', 'Birdwatching (from a moving car)'],
      talents: ['Can find the TV remote in 4 seconds flat', 'Can make a massive mess in a perfectly empty room', 'Perfect aim with a thrown sippy cup', 'Can sleep in any position (including upside down)']
    }
  };

  // ─── STATE ─────────────────────────────

  const state = {
    qIdx: 0,
    answers: [],  // array of archetype strings
    childName: '',
    profile: null,
    comparisonProfile: null,
    payComplete: false
  };

  // ─── DOM REFS ──────────────────────────

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const el = {};

  function cacheDoms () {
    el.hero = $('#screen-hero');
    el.quiz = $('#screen-quiz');
    el.loading = $('#screen-loading');
    el.pay = $('#screen-payment');
    el.profile = $('#screen-profile');
    el.compare = $('#screen-compare');
    el.pdf = $('#screen-pdf');
    el.shareOverlay = $('#share-overlay');
    el.toast = $('#toast');
    el.confetti = $('#confetti-wrap');

    // Quiz
    el.progressFill = $('#progress-fill');
    el.progressText = $('#progress-text');
    el.progressPct = $('#progress-pct');
    el.qNum = $('#q-number');
    el.qText = $('#q-text');
    el.qAnswers = $('#q-answers');
    el.btnPrev = $('#btn-prev');
    el.btnNext = $('#btn-next');

    // Payment
    el.childNameInput = $('#child-name-input');
    el.btnPay = $('#btn-pay');
    el.btnPayBack = $('#btn-pay-back');

    // Profile
    el.profArchBadge = $('#prof-arch-badge');
    el.profEmoji = $('#prof-emoji');
    el.profName = $('#prof-name');
    el.profJob = $('#prof-job');
    el.profHobby = $('#prof-hobby');
    el.profTalent = $('#prof-talent');
    el.profVibe = $('#prof-vibe');
    el.profHeader = $('#prof-header');

    // Compare
    el.c1Name = $('#c1-name');
    el.c1Emoji = $('#c1-emoji');
    el.c1Job = $('#c1-job');
    el.c1Hobby = $('#c1-hobby');
    el.c1Talent = $('#c1-talent');
    el.c1Arch = $('#c1-arch');
    el.c1Card = $('#c1-card');
    el.c2Name = $('#c2-name');
    el.c2Emoji = $('#c2-emoji');
    el.c2Job = $('#c2-job');
    el.c2Hobby = $('#c2-hobby');
    el.c2Talent = $('#c2-talent');
    el.c2Arch = $('#c2-arch');
    el.c2Card = $('#c2-card');

    // Letter
    el.letterContent = $('#letter-content');

    // Buttons
    el.btnStart = $('#btn-start');
    el.btnShare = $('#btn-share');
    el.btnShareClose = $('#btn-share-close');
    el.btnShareSave = $('#btn-share-save');
    el.btnShareIG = $('#btn-share-ig');
    el.btnLetter = $('#btn-letter');
    el.btnCompare = $('#btn-compare');
    el.btnReset = $('#btn-reset');
    el.btnCompareBack = $('#btn-compare-back');
    el.btnCompareNew = $('#btn-compare-new');
    el.btnPdfBack = $('#btn-pdf-back');
  }

  // ─── SCREEN MGMT ──────────────────────

  function show (name) {
    [el.hero, el.quiz, el.loading, el.pay, el.profile, el.compare, el.pdf].forEach(e => e.classList.remove('active'));
    const map = { hero: el.hero, quiz: el.quiz, loading: el.loading, pay: el.pay, profile: el.profile, compare: el.compare, pdf: el.pdf };
    if (map[name]) {
      map[name].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ─── TOAST ────────────────────────────

  function toast (msg) {
    if (!el.toast) return;
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(el.toast._t);
    el.toast._t = setTimeout(() => el.toast.classList.remove('show'), 2500);
  }

  // ─── RANDOM UTIL ──────────────────────

  function pick (arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ═══════════════════════════════════════════
  //  QUIZ
  // ═══════════════════════════════════════════

  function renderQuestion () {
    const idx = state.qIdx;
    const q = QUESTIONS[idx];
    const total = QUESTIONS.length;
    const pct = (idx / total) * 100;

    el.progressFill.style.width = pct + '%';
    el.progressText.textContent = `${idx + 1} of ${total}`;
    el.progressPct.textContent = `${Math.round(pct)}%`;

    el.qNum.textContent = `Question ${idx + 1}`;
    el.qText.textContent = q.text;
    el.qAnswers.innerHTML = '';

    q.answers.forEach((a, i) => {
      const div = document.createElement('div');
      div.className = 'answer';
      div.dataset.archetype = a.archetype;
      div.innerHTML = `<span class="letter">${a.letter}</span><span>${a.text}</span>`;
      div.addEventListener('click', () => selectAnswer(i));
      el.qAnswers.appendChild(div);
    });

    // Restore selection if revisiting
    if (state.answers[idx]) {
      const opts = $$('.answer');
      opts.forEach((opt, i) => {
        if (q.answers[i].archetype === state.answers[idx]) opt.classList.add('selected');
      });
      el.btnNext.disabled = false;
    } else {
      el.btnNext.disabled = true;
    }

    el.btnPrev.style.display = idx === 0 ? 'none' : 'flex';

    if (idx === total - 1) {
      el.btnNext.textContent = 'See the Future 🔎';
    } else {
      el.btnNext.textContent = 'Next →';
    }
  }

  function selectAnswer (i) {
    const q = QUESTIONS[state.qIdx];
    state.answers[state.qIdx] = q.answers[i].archetype;

    $$('.answer').forEach((opt, idx) => opt.classList.toggle('selected', idx === i));
    el.btnNext.disabled = false;
  }

  function goNext () {
    if (el.btnNext.disabled) return;
    state.qIdx++;
    if (state.qIdx >= QUESTIONS.length) {
      // Quiz done → payment
      show('loading');
      setTimeout(() => show('pay'), 700);
      return;
    }
    renderQuestion();
  }

  function goPrev () {
    if (state.qIdx === 0) return;
    state.qIdx--;
    renderQuestion();
  }

  // ─── SCORING ───────────────────────────

  function scoreArchetype () {
    const counts = {};
    state.answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });

    const order = ['Negotiator', 'Strategist', 'Performer', 'Engineer', 'Wildcard'];
    let primary = order[0], max = 0;
    order.forEach(a => {
      if ((counts[a] || 0) > max) { max = counts[a]; primary = a; }
    });
    return primary;
  }

  function generateProfile (name) {
    const arch = scoreArchetype();
    const data = ARCHETYPES[arch];
    return {
      archetype: arch,
      emoji: data.emoji,
      color: data.color,
      job: pick(data.jobs),
      hobby: pick(data.hobbies),
      talent: pick(data.talents),
      name: name || 'Your Little One'
    };
  }

  function generateComparison () {
    const keys = Object.keys(ARCHETYPES);
    const arch = pick(keys);
    const data = ARCHETYPES[arch];
    return {
      archetype: arch,
      emoji: data.emoji,
      color: data.color,
      job: pick(data.jobs),
      hobby: pick(data.hobbies),
      talent: pick(data.talents),
      name: 'Bestie'
    };
  }

  // ─── BEHAVIOR REFS FOR LETTER ──────────

  const BEHAVIOR_REF1 = {
    Negotiator: 'negotiated for extra cookies at snack time',
    Strategist: 'strategically hid your car keys in your sock drawer',
    Performer: 'performed a dramatic rendition of "Twinkle Twinkle" at 3 AM',
    Engineer: 'disassembled the TV remote to study its inner workings',
    Wildcard: 'decided that wearing shoes on your hands was the new trend'
  };

  const BEHAVIOR_REF2 = {
    Negotiator: 'patiently explained why bedtime was "not necessary"',
    Strategist: 'outsmarted the child-proof locks on the cabinets',
    Performer: 'gave a standing ovation to the washing machine',
    Engineer: 'built an elaborate pillow fort instead of napping',
    Wildcard: 'tried to feed broccoli to the family pet under the table'
  };

  // ═══════════════════════════════════════════
  //  PAYMENT (Stripe Checkout simulation)
  // ═══════════════════════════════════════════

  function handlePayment () {
    const name = el.childNameInput.value.trim();
    if (!name) {
      toast('Please enter your toddler’s name first!');
      return;
    }
    state.childName = name;

    el.btnPay.disabled = true;
    el.btnPay.textContent = 'Processing... ⌛';

    setTimeout(() => {
      state.payComplete = true;
      state.profile = generateProfile(state.childName);

      el.btnPay.textContent = 'Payment Successful! ✅';
      el.btnPay.style.background = 'linear-gradient(135deg, #34D399, #60A5FA)';

      setTimeout(() => {
        show('loading');
        setTimeout(() => {
          revealProfile();
        }, 1000);
      }, 600);
    }, 1800);
  }

  // ═══════════════════════════════════════════
  //  PROFILE REVEAL
  // ═══════════════════════════════════════════

  function revealProfile () {
    const p = state.profile;

    launchConfetti();

    el.profArchBadge.textContent = p.archetype;
    el.profEmoji.textContent = p.emoji;
    el.profName.textContent = p.name;
    el.profJob.textContent = p.job;
    el.profHobby.textContent = p.hobby;
    el.profTalent.textContent = p.talent;

    const archData = ARCHETYPES[p.archetype];
    el.profVibe.textContent = archData ? archData.jobs[0] + ' energy' : 'One of a kind!';

    el.profHeader.style.background =
      `linear-gradient(135deg, ${p.color}, ${adjustColor(p.color, -30)}, ${adjustColor(p.color, -60)})`;

    show('profile');
  }

  function adjustColor (hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (n >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function launchConfetti () {
    if (!el.confetti) return;
    el.confetti.innerHTML = '';
    const colors = ['#FF6B9D', '#C084FC', '#60A5FA', '#34D399', '#FCD34D', '#FB923C', '#F87171', '#A78BFA'];

    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = '-10px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (Math.random() * 8 + 4) + 'px';
      piece.style.height = (Math.random() * 8 + 4) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
      piece.style.animationDelay = (Math.random() * 1.5) + 's';
      el.confetti.appendChild(piece);
    }
    setTimeout(() => { if (el.confetti) el.confetti.innerHTML = ''; }, 4000);
  }

  // ═══════════════════════════════════════════
  //  COMPARE
  // ═══════════════════════════════════════════

  function showCompare () {
    state.comparisonProfile = generateComparison();
    const p = state.profile;
    const cp = state.comparisonProfile;

    el.c1Name.textContent = p.name;
    el.c1Emoji.textContent = p.emoji;
    el.c1Job.textContent = p.job;
    el.c1Hobby.textContent = p.hobby;
    el.c1Talent.textContent = p.talent;
    el.c1Arch.textContent = p.archetype;
    el.c1Card.style.borderTop = `4px solid ${p.color}`;

    el.c2Name.textContent = cp.name;
    el.c2Emoji.textContent = cp.emoji;
    el.c2Job.textContent = cp.job;
    el.c2Hobby.textContent = cp.hobby;
    el.c2Talent.textContent = cp.talent;
    el.c2Arch.textContent = cp.archetype;
    el.c2Card.style.borderTop = `4px solid ${cp.color}`;

    show('compare');
  }

  // ═══════════════════════════════════════════
  //  LETTER / PDF KEEPSAKE
  // ═══════════════════════════════════════════

  function showLetter () {
    const p = state.profile;
    if (!p) return;

    const ref1 = BEHAVIOR_REF1[p.archetype] || 'explored the world with unbridled curiosity';
    const ref2 = BEHAVIOR_REF2[p.archetype] || 'refused to follow any known rules of physics';

    const html = `
      <div class="letter-subject-line">Subject: A Note from the Future (Don't Worry, We Turned Out Great)</div>
      <div class="letter-greeting">Dear Mom,</div>
      <div class="letter-body-text">
        <p>Hey! It’s me, but from the year 2044. I know right now you’re probably looking at me and wondering how I’m going to survive adulthood when I currently think a handful of dirt is a five-star meal, but I wanted to give you a little update.</p>
        <p>Life at 20 is pretty awesome. Thanks to all those years of practice <strong>${p.hobby}</strong>, I’ve actually become quite the expert. People are always impressed by my <strong>${p.talent}</strong>—I guess those toddler years really were just "early-stage training."</p>
        <p>Professionally, I’ve found my calling as a <strong>${p.job}</strong>. It turns out that all those times I <em>${ref1}</em> were just me honing my craft. Who knew?</p>
        <p>Anyway, thanks for not losing your mind when I <em>${ref2}</em>. It all helped me become the weird, wonderful person I am today.</p>
        <p>Keep the snacks coming. Some things never change.</p>
      </div>
      <div class="letter-closing">Love,<br>Your Future 20-Year-Old</div>
    `;

    el.letterContent.innerHTML = html;
    show('pdf');
  }

  function openLetterPrint () {
    const p = state.profile;
    if (!p) return;
    const ref1 = BEHAVIOR_REF1[p.archetype] || 'explored the world with unbridled curiosity';
    const ref2 = BEHAVIOR_REF2[p.archetype] || 'refused to follow any known rules of physics';

    const doc = window.open('', '_blank');
    if (!doc) { toast('Please allow pop-ups to print your letter!'); return; }

    doc.write(\`
      <!DOCTYPE html>
      <html><head>
        <title>Letter from Your Future 20-Year-Old</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Fredoka+One&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Nunito', sans-serif; background: #FFFBEB; padding: 40px; max-width: 600px; margin:0 auto; line-height:1.7; color:#1F2937; }
          .letter { background: white; border: 2px solid #FDE68A; border-radius:16px; padding:32px; box-shadow:0 4px 20px rgba(0,0,0,0.08); }
          .hdr { text-align:center; margin-bottom:20px; padding-bottom:16px; border-bottom:2px dashed #FDE68A; }
          .hdr h1 { font-family:'Fredoka One',cursive; font-size:1.5rem; color:#7C3AED; margin:0 0 8px; }
          .hdr .badge { display:inline-block; background:linear-gradient(135deg,#FF6B9D,#C084FC); color:white; padding:4px 16px; border-radius:50px; font-size:0.8rem; font-weight:700; }
          .subj { font-weight:700; color:#D97706; margin-bottom:12px; }
          .greet { font-weight:700; margin-bottom:8px; }
          p { margin-bottom:10px; }
          .close { margin-top:14px; font-weight:700; }
          .foot { text-align:center; margin-top:20px; font-size:0.7rem; color:#9CA3AF; font-weight:700; letter-spacing:0.5px; }
          @media print { body { padding:0; background:white; } .letter { box-shadow:none; border:1px solid #ddd; } }
        </style>
      </head><body>
        <div class="letter">
          <div class="hdr"><h1>Future Me, Age 20</h1><div class="badge">\${p.archetype} • \${p.name}</div></div>
          <div class="subj">Subject: A Note from the Future (Don't Worry, We Turned Out Great)</div>
          <div class="greet">Dear Mom,</div>
          <p>Hey! It’s me, but from the year 2044. I know right now you’re probably looking at me and wondering how I’m going to survive adulthood when I currently think a handful of dirt is a five-star meal, but I wanted to give you a little update.</p>
          <p>Life at 20 is pretty awesome. Thanks to all those years of practice <strong>\${p.hobby}</strong>, I’ve actually become quite the expert. People are always impressed by my <strong>\${p.talent}</strong>—I guess those toddler years really were just "early-stage training."</p>
          <p>Professionally, I’ve found my calling as a <strong>\${p.job}</strong>. It turns out that all those times I <em>\${ref1}</em> were just me honing my craft. Who knew?</p>
          <p>Anyway, thanks for not losing your mind when I <em>\${ref2}</em>. It all helped me become the weird, wonderful person I am today.</p>
          <p>Keep the snacks coming. Some things never change.</p>
          <div class="close">Love,<br>Your Future 20-Year-Old</div>
        </div>
        <div class="foot">futuremeage20.com</div>
        <script>window.print();<\/script>
      </body></html>
    \`);
    doc.close();
    toast('Letter opened! Use Print or Save as PDF 📄');
  }

  // ═══════════════════════════════════════════
  //  SHARE
  // ═══════════════════════════════════════════

  function openShare () {
    el.shareOverlay.classList.add('active');
  }

  function closeShare () {
    el.shareOverlay.classList.remove('active');
  }

  function shareAsImage () {
    closeShare();
    toast('Take a screenshot to save your profile card! 📸');
    document.querySelector('.profile-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function shareToIG () {
    closeShare();
    toast('Screenshot your card and share to Instagram Stories! 📷');
    document.querySelector('.profile-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ═══════════════════════════════════════════
  //  RESET
  // ═══════════════════════════════════════════

  function resetAll () {
    state.qIdx = 0;
    state.answers = [];
    state.childName = '';
    state.profile = null;
    state.comparisonProfile = null;
    state.payComplete = false;
    if (el.childNameInput) el.childNameInput.value = '';
    if (el.btnPay) {
      el.btnPay.disabled = false;
      el.btnPay.textContent = '🔮 Unlock Profile — $4.99';
      el.btnPay.style.background = '';
    }
    show('hero');
  }

  // ═══════════════════════════════════════════
  //  EVENT BINDING
  // ═══════════════════════════════════════════

  function bindEvents () {
    el.btnStart.addEventListener('click', () => { show('quiz'); renderQuestion(); });

    el.btnNext.addEventListener('click', goNext);
    el.btnPrev.addEventListener('click', goPrev);

    el.btnPay.addEventListener('click', handlePayment);
    el.btnPayBack.addEventListener('click', () => {
      show('quiz');
      state.qIdx = QUESTIONS.length - 1;
      renderQuestion();
    });

    el.btnShare.addEventListener('click', openShare);
    el.btnShareClose.addEventListener('click', closeShare);
    el.btnShareSave.addEventListener('click', shareAsImage);
    el.btnShareIG.addEventListener('click', shareToIG);

    el.btnLetter.addEventListener('click', showLetter);
    el.btnCompare.addEventListener('click', showCompare);
    el.btnReset.addEventListener('click', resetAll);

    el.btnCompareBack.addEventListener('click', () => show('profile'));
    el.btnCompareNew.addEventListener('click', showCompare);

    el.btnPdfBack.addEventListener('click', () => show('profile'));
    // The "Print / Save" inside PDF screen
    const printBtn = $('#btn-pdf-print');
    if (printBtn) printBtn.addEventListener('click', openLetterPrint);

    // Close share overlay on backdrop click
    el.shareOverlay.addEventListener('click', (e) => {
      if (e.target === el.shareOverlay) closeShare();
    });

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
      if (!el.quiz.classList.contains('active')) return;
      if ((e.key === 'Enter' || e.key === ' ') && !el.btnNext.disabled) {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft' && state.qIdx > 0) goPrev();
      if (['1','2','3','4'].includes(e.key)) {
        const opts = $$('.answer');
        const i = parseInt(e.key) - 1;
        if (opts[i]) opts[i].click();
      }
    });
  }

  // ═══════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════

  function init () {
    cacheDoms();
    bindEvents();
    show('hero');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
