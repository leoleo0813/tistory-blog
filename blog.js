/* ================================================================
   티스토리 블로그 통합 퀴즈 스크립트
   blog.js — GitHub에 올려두고 각 글에서 불러쓰는 파일
   
   새 주제 추가 시: 맨 아래 initXxx() 함수 추가 후 업로드
================================================================ */
(function () {

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }
  function el(id) { return document.getElementById(id); }

  /* ================================================================
     [1] 스마트폰 중독 자가진단
  ================================================================ */
  function initSmartphone() {
    if (!el('sa-quizWrap')) return;

    var questions = [
      { text: "스마트폰을 사용하지 못하면 불안하거나 초조함을 느낀다." },
      { text: "스마트폰을 사용하다 보면 계획했던 것보다 오래 사용하게 된다." },
      { text: "더 자주, 더 오래 스마트폰을 사용해야 만족을 느낀다." },
      { text: "스마트폰 사용을 줄이려고 했지만 실패한 경험이 있다." },
      { text: "스마트폰이 없으면 무엇을 해야 할지 모르겠다." },
      { text: "알림이 없는데도 폰이 울린 것 같은 착각을 한다(팬텀 진동)." },
      { text: "잠들기 직전까지 스마트폰을 사용한다." },
      { text: "밥을 먹거나 대화 중에도 스마트폰을 확인한다." },
      { text: "스마트폰 사용으로 학업, 업무, 일상 활동에 지장을 받은 적이 있다." },
      { text: "스마트폰 사용 때문에 가족이나 친구와 갈등을 겪은 적이 있다." },
      { text: "목적 없이 습관적으로 스마트폰 화면을 켠다." },
      { text: "스마트폰이 없을 때 신체적 불편감(두통, 손 떨림 등)을 느낀다." },
      { text: "스마트폰이 없으면 세상과 단절된 것 같은 느낌이 든다." },
      { text: "스마트폰으로 인해 수면의 질이 낮아졌다고 느낀다." },
      { text: "화장실, 보행 중에도 스마트폰을 사용한다." }
    ];
    var opts = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
    var results = [
      { min: 0,  max: 19, emoji: "😊", level: "정상 범위",    color: "#1D9E75",
        title: "스마트폰을 건강하게 사용하고 있어요",
        desc: "현재 스마트폰 사용 패턴은 건강한 수준입니다. 도구로서 스마트폰을 잘 활용하고 있으며, 일상생활에 큰 지장 없이 조절하고 있습니다.",
        tips: ["현재 패턴을 지속적으로 모니터링하세요", "주 1회 스마트폰 사용 시간을 확인하는 습관을 만드세요", "주변 사람들과 폰 없이 대화하는 시간을 늘려보세요"] },
      { min: 20, max: 34, emoji: "🤔", level: "주의 단계",    color: "#EF9F27",
        title: "조금씩 의존도가 높아지고 있어요",
        desc: "몇 가지 의존적인 패턴이 보이지만 아직 중독은 아닙니다. 지금이 습관을 교정하기 가장 좋은 시점입니다.",
        tips: ["알림을 50% 줄이는 것부터 시작하세요", "하루 1회 '폰 없는 1시간'을 실천해보세요", "취침 30분 전 스마트폰 사용을 중단해보세요", "사용 시간 앱으로 일주일 패턴을 파악해보세요"] },
      { min: 35, max: 47, emoji: "😟", level: "과의존 위험군", color: "#E85D24",
        title: "스마트폰이 일상을 지배하고 있어요",
        desc: "스마트폰 과의존 위험군에 해당합니다. 업무, 관계, 수면에 부정적인 영향이 나타나고 있을 가능성이 높습니다.",
        tips: ["스크린 타임 앱으로 강제 시간 제한을 설정하세요", "침실에 폰 충전기를 두지 마세요", "SNS 앱을 폴더 깊숙이 넣거나 삭제를 고려하세요", "전문가 상담 또는 스마트쉼센터 이용을 권장합니다"] },
      { min: 48, max: 60, emoji: "🚨", level: "중독 단계",    color: "#E24B4A",
        title: "전문적인 도움이 필요할 수 있어요",
        desc: "스마트폰 중독 수준에 해당합니다. 혼자 조절하기 어려운 상태일 수 있으며, 정신적·신체적 건강에 영향을 주고 있을 가능성이 높습니다.",
        tips: ["스마트쉼센터(1599-0075)에 상담을 요청하세요", "디지털 미디어 중독 치료 프로그램을 알아보세요", "폰 없이 즐길 수 있는 오프라인 활동을 찾아보세요", "주변 가족·친구에게 솔직하게 도움을 요청하세요"] }
    ];
    var stageData = [
      { title: "1단계: 일반 사용 (점수 0~19점)", desc: "스마트폰을 생산적인 도구로 활용하며, 필요할 때 사용하고 내려놓을 수 있는 상태입니다.",
        syms: ["필요한 때만 스마트폰을 사용", "사용 시간 스스로 조절 가능", "대화 중 폰을 잘 내려놓음", "수면에 큰 영향 없음"] },
      { title: "2단계: 과다 사용 (점수 20~34점)", desc: "사용 시간이 늘어나고 폰을 내려놓는 것이 조금씩 어려워지는 단계입니다.",
        syms: ["계획보다 오래 사용하는 경우가 생김", "목적 없이 폰을 켜는 횟수 증가", "알림에 즉각 반응하는 경향", "폰 없으면 약간의 불편함"] },
      { title: "3단계: 의존 단계 (점수 35~47점)", desc: "스마트폰 없이 일상이 불편해지는 단계. 관계, 업무, 수면에 영향이 나타나기 시작합니다.",
        syms: ["폰 없으면 불안·초조함 발생", "팬텀 진동 증후군 경험", "수면의 질이 낮아짐", "대화 중 폰 확인이 잦음", "집중력 저하 느낌"] },
      { title: "4단계: 중독 단계 (점수 48~60점)", desc: "스마트폰이 생활의 중심이 된 상태. 의지만으로 조절이 어렵고 전문적 도움이 권장됩니다.",
        syms: ["폰 없으면 심한 금단 증상", "학업/업무에 심각한 지장", "가족·친구와 갈등 발생", "신체 증상(두통, 손목통증 등) 동반", "혼자서 조절 불가능한 상태"] }
    ];

    var saAnswers = new Array(15).fill(null);
    var saCur = 0;

    function saRender() {
      var q = questions[saCur];
      if (el('sa-qNum'))   el('sa-qNum').textContent   = '문항 ' + (saCur + 1) + ' / ' + questions.length;
      if (el('sa-qText'))  el('sa-qText').textContent  = q.text;
      var area = el('sa-optArea');
      if (area) {
        area.innerHTML = '';
        for (var i = 0; i < opts.length; i++) {
          (function (idx) {
            var btn = document.createElement('button');
            btn.className = 'sa-opt-btn' + (saAnswers[saCur] === idx ? ' selected' : '');
            btn.innerHTML = '<div class="sa-opt-dot">' + (idx + 1) + '</div><span>' + opts[idx] + '</span>';
            btn.onclick = function () { saAnswers[saCur] = idx; saRender(); };
            area.appendChild(btn);
          })(i);
        }
      }
      var pct = Math.round((saCur / questions.length) * 100);
      if (el('sa-progFill')) el('sa-progFill').style.width = pct + '%';
      if (el('sa-progText')) el('sa-progText').textContent = saCur + ' / ' + questions.length;
      if (el('sa-prevBtn'))  el('sa-prevBtn').disabled = saCur === 0;
      if (el('sa-nextBtn'))  el('sa-nextBtn').textContent = (saCur === questions.length - 1) ? '결과 보기 →' : '다음 →';
      saBindEvents();
    }

    function saBindEvents() {
      var nb = el('sa-nextBtn');
      var pb = el('sa-prevBtn');
      if (nb) { nb.onclick = window.boNextQ; nb.addEventListener('click', window.saNextQ); }
      if (pb) { pb.onclick = window.boPrevQ;pb.addEventListener('click', window.saPrevQ); }
      var retry = document.querySelector('.sa-retry-btn');
      if (retry) retry.addEventListener('click', window.saResetQuiz);
    }

    window.saNextQ = function () {
      if (saAnswers[saCur] === null) {
        var h = el('sa-scoreHint');
        if (h) { h.textContent = '⚠️ 문항을 선택해주세요'; h.style.color = '#E24B4A';
          setTimeout(function () { h.textContent = '선택 후 다음으로 이동하세요'; h.style.color = ''; }, 1800); }
        return;
      }
      if (saCur < questions.length - 1) { saCur++; saRender(); } else { saShowResult(); }
    };
    window.saPrevQ = function () { if (saCur > 0) { saCur--; saRender(); } };

    function saShowResult() {
      var total = 0;
      for (var i = 0; i < saAnswers.length; i++) total += (saAnswers[i] || 0);
      var r = null;
      for (var j = 0; j < results.length; j++) { if (total >= results[j].min && total <= results[j].max) { r = results[j]; break; } }
      if (el('sa-quizWrap')) el('sa-quizWrap').style.display = 'none';
      var rw = el('sa-resultWrap');
      if (!rw) return;
      rw.style.display = 'block';
      if (el('sa-resEmoji')) el('sa-resEmoji').textContent = r.emoji;
      if (el('sa-resLevel')) { el('sa-resLevel').textContent = r.level; el('sa-resLevel').style.color = r.color; }
      if (el('sa-resTitle')) el('sa-resTitle').textContent = r.title;
      if (el('sa-resScore')) { el('sa-resScore').textContent = total; el('sa-resScore').style.color = r.color; }
      var bar = el('sa-resBar');
      if (bar) { bar.style.background = r.color; setTimeout(function () { bar.style.width = Math.round((total / 60) * 100) + '%'; }, 100); }
      if (el('sa-resDesc')) el('sa-resDesc').textContent = r.desc;
      if (el('sa-resTips')) {
        var h = '<div class="sa-result-tips-title">맞춤 실천 팁</div>';
        for (var k = 0; k < r.tips.length; k++) h += '<div class="sa-rtip"><div class="sa-rtip-dot"></div><span>' + r.tips[k] + '</span></div>';
        el('sa-resTips').innerHTML = h;
      }
      if (el('sa-progFill')) el('sa-progFill').style.width = '100%';
      if (el('sa-progText')) el('sa-progText').textContent = questions.length + ' / ' + questions.length;
      rw.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.saResetQuiz = function () {
      saAnswers = new Array(15).fill(null); saCur = 0;
      if (el('sa-quizWrap'))   el('sa-quizWrap').style.display   = 'block';
      if (el('sa-resultWrap')) el('sa-resultWrap').style.display = 'none';
      saRender();
      if (el('sa-quizWrap')) el('sa-quizWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.saShowStage = function (idx) {
      var d = stageData[idx];
      for (var i = 0; i < 4; i++) { var s = el('sa-st' + i); if (s) s.classList.toggle('active', i === idx); }
      var detail = el('sa-stageDetail');
      if (!detail) return;
      detail.className = 'sa-stage-detail show';
      if (el('sa-stageTitle')) el('sa-stageTitle').textContent = d.title;
      if (el('sa-stageDesc'))  el('sa-stageDesc').textContent  = d.desc;
      if (el('sa-stageSym')) {
        var h = '';
        for (var j = 0; j < d.syms.length; j++) h += '<div class="sa-symp"><div class="sa-symp-dot"></div><span>' + d.syms[j] + '</span></div>';
        el('sa-stageSym').innerHTML = h;
      }
    };

    saRender();
    saBindEvents();
  }

  /* ================================================================
     [2] 번아웃 자가진단
  ================================================================ */
  function initBurnout() {
    if (!el('bo-quizWrap')) return;

    var questions = [
      { text: "아침에 눈을 뜨는 순간부터 출근하기 싫다는 생각이 든다.", cat: "탈진" },
      { text: "예전에는 즐거웠던 일이 이제는 그냥 해야 하는 일처럼 느껴진다.", cat: "냉소" },
      { text: "퇴근 후에도 일 생각이 머릿속을 떠나지 않는다.", cat: "분리불가" },
      { text: "작은 실수나 비판에도 필요 이상으로 크게 상처받는다.", cat: "민감화" },
      { text: "회의나 협업이 예전보다 훨씬 더 피곤하고 귀찮게 느껴진다.", cat: "냉소" },
      { text: "집중력이 떨어져서 예전보다 같은 일을 하는 데 시간이 더 걸린다.", cat: "탈진" },
      { text: "내가 이 일을 계속해도 되는 사람인지 의심스럽다 (가면 증후군).", cat: "자존감" },
      { text: "주말이나 휴가 중에도 쉬는 느낌이 들지 않는다.", cat: "분리불가" },
      { text: "동료나 고객을 대할 때 감정을 숨기며 억지로 친절하게 대한다.", cat: "냉소" },
      { text: "몸이 자주 피곤하고, 두통·소화불량·불면 등 신체 증상이 나타난다.", cat: "탈진" },
      { text: "내 노력이나 성과가 제대로 인정받지 못한다고 느낀다.", cat: "자존감" },
      { text: "일을 미루거나 시작을 못 하는 경우가 부쩍 늘었다.", cat: "탈진" },
      { text: "회사나 팀의 방향에 대해 냉소적이거나 무력감을 느낀다.", cat: "냉소" },
      { text: "친구, 가족과 시간을 보내고 싶지 않아지거나 관계가 줄어들었다.", cat: "고립" },
      { text: "지금 당장 모든 걸 그만두고 싶다는 생각이 든 적이 있다.", cat: "고립" }
    ];
    var opts = ["전혀 아니다", "거의 아니다", "가끔 그렇다", "자주 그렇다", "항상 그렇다"];
    var results = [
      { min: 0,  max: 19, emoji: "🟢", level: "안정 단계",      color: "#1D9E75", bg: "#E1F5EE",
        title: "번아웃 위험은 낮습니다",
        desc: "현재 업무 스트레스를 잘 관리하고 있는 편입니다. 번아웃의 초기 신호가 나타나기 전에 지금의 건강한 루틴을 유지하는 것이 중요합니다.",
        tips: ["현재의 경계선을 의식적으로 유지하세요", "번아웃은 예방이 치료보다 훨씬 쉽습니다", "분기마다 자신의 에너지 상태를 점검해보세요"] },
      { min: 20, max: 34, emoji: "🟡", level: "주의 단계",      color: "#BA7517", bg: "#FAEEDA",
        title: "번아웃의 초기 신호가 감지됩니다",
        desc: "아직 번아웃은 아니지만 피로가 쌓이고 있는 상태입니다. 지금 방치하면 3~6개월 내에 번아웃으로 진행될 수 있습니다.",
        tips: ["하루 30분, 일과 완전히 단절되는 시간을 만드세요", "업무 외 시간에 알림을 꺼보세요", "'No'라고 말하는 연습을 시작하세요", "가장 힘든 업무 한 가지를 위임하거나 조율해보세요"] },
      { min: 35, max: 47, emoji: "🔴", level: "번아웃 진행 중", color: "#993C1D", bg: "#FAECE7",
        title: "번아웃이 상당히 진행되고 있습니다",
        desc: "지금 당신의 몸과 마음은 한계에 가까워지고 있습니다. 의지로 버티는 것이 오히려 상황을 악화시킬 수 있습니다.",
        tips: ["당장 업무량을 20~30% 줄이는 방법을 찾아보세요", "신뢰할 수 있는 사람에게 현재 상태를 솔직하게 말해보세요", "주치의나 상담 서비스를 이용해보세요", "최소 1주일 이상의 완전한 휴식을 계획해보세요"] },
      { min: 48, max: 60, emoji: "⚫", level: "심각한 번아웃",  color: "#2C2C2A", bg: "#F1EFE8",
        title: "즉각적인 개입이 필요합니다",
        desc: "심각한 번아웃 상태입니다. 번아웃은 의지력 부족이 아니라 신체적·심리적 고갈 상태입니다. 전문가의 도움을 받는 것이 가장 빠른 회복 방법입니다.",
        tips: ["정신건강 전문가의 도움을 받으세요", "직장 내 EAP(근로자 지원 프로그램)를 활용해보세요", "고용노동부 근로자 지원 상담(1350)에 문의해보세요", "지금 당장 일을 잠시 멈추는 것이 장기적으로 훨씬 낫습니다"] }
    ];
    var phaseData = [
      { title: "1단계: 열정 과부하 (허니문 단계)", color: "#1D9E75",
        desc: "모든 번아웃은 역설적으로 높은 열정에서 시작됩니다. 경계 없이 에너지를 쏟아붓는 시기로, 이 단계에서는 번아웃이 오고 있다는 걸 전혀 느끼지 못합니다.",
        signs: ["야근이 당연하게 느껴짐", "취미나 휴식을 사치로 여김", "일에 과도하게 자신을 동일시", "수면·식사를 줄여가며 일함"] },
      { title: "2단계: 스트레스 인식 (균열 시작)", color: "#EF9F27",
        desc: "피로가 쌓이고 집중력이 저하되기 시작합니다. '더 노력해야지'라는 생각으로 더 많은 에너지를 쏟는데, 이것이 번아웃을 가속시킵니다.",
        signs: ["집중력·기억력 저하", "만성 피로감", "사소한 일에 짜증", "사교 활동 회피"] },
      { title: "3단계: 만성화 (한계 도달)", color: "#E85D24",
        desc: "피로가 일상이 되어버립니다. 냉소주의가 생기고 일에 대한 의미를 잃기 시작하며 신체 증상이 본격적으로 나타납니다.",
        signs: ["감정적 무감각", "신체 증상 (두통·소화불량·불면)", "지각·결근 증가", "음주·과식 등 회피행동"] },
      { title: "4단계: 완전 탈진 (번아웃)", color: "#E24B4A",
        desc: "더 이상 기능하기 어려운 상태입니다. 아무것도 하고 싶지 않고 아무것도 의미있게 느껴지지 않습니다. 반드시 전문가의 도움이 필요합니다.",
        signs: ["출근 자체가 불가능하게 느껴짐", "극심한 무력감·절망감", "사회적 완전 고립", "심각한 신체·정신 증상"] }
    ];

    var boAnswers = new Array(15).fill(null);
    var boCur = 0;

    function boRender() {
      var q = questions[boCur];
      if (el('bo-qNum'))  el('bo-qNum').textContent  = '문항 ' + (boCur + 1) + ' / ' + questions.length;
      if (el('bo-qCat'))  el('bo-qCat').textContent  = '#' + q.cat;
      if (el('bo-qText')) el('bo-qText').textContent = q.text;
      var area = el('bo-optArea');
      if (area) {
        area.innerHTML = '';
        for (var i = 0; i < opts.length; i++) {
          (function (idx) {
            var btn = document.createElement('button');
            btn.className = 'bo-opt-btn' + (boAnswers[boCur] === idx ? ' selected' : '');
            btn.innerHTML = '<div class="bo-opt-dot">' + (idx + 1) + '</div><span>' + opts[idx] + '</span>';
            btn.onclick = function () { boAnswers[boCur] = idx; boRender(); };
            area.appendChild(btn);
          })(i);
        }
      }
      var pct = Math.round((boCur / questions.length) * 100);
      if (el('bo-progFill')) el('bo-progFill').style.width = pct + '%';
      if (el('bo-progText')) el('bo-progText').textContent = boCur + ' / ' + questions.length;
      if (el('bo-prevBtn'))  el('bo-prevBtn').disabled = boCur === 0;
      if (el('bo-nextBtn'))  el('bo-nextBtn').textContent = (boCur === questions.length - 1) ? '결과 확인 →' : '다음 →';
      boBindEvents();
    }

    function boBindEvents() {
      var nb = el('bo-nextBtn');
      var pb = el('bo-prevBtn');
      if (nb) { nb.onclick = window.boNextQ; }
      if (pb) { pb.onclick = window.boPrevQ;}
      var retry = document.querySelector('.bo-retry-btn');
      if (retry) retry.addEventListener('click', window.boResetQuiz);
      for (var i = 0; i < 4; i++) {
        (function(idx) {
          var ph = el('bo-ph' + idx);
          if (ph) { ph.onclick = null; ph.addEventListener('click', function(){ window.boShowPhase(idx); }); }
        })(i);
      }
      for (var i = 0; i < 4; i++) {
        (function(idx) {
          var st = el('sa-st' + idx);
          if (st) { st.onclick = null; st.addEventListener('click', function(){ window.saShowStage(idx); }); }
        })(i);
      }
    }

    window.boNextQ = function () {
      if (boAnswers[boCur] === null) {
        var h = el('bo-hint');
        if (h) { h.textContent = '⚠️ 항목을 선택해주세요'; h.style.color = '#E24B4A';
          setTimeout(function () { h.textContent = '솔직하게 선택할수록 정확해요'; h.style.color = ''; }, 1800); }
        return;
      }
      if (boCur < questions.length - 1) { boCur++; boRender(); } else { boShowResult(); }
    };
    window.boPrevQ = function () { if (boCur > 0) { boCur--; boRender(); } };

    function boShowResult() {
      var total = 0;
      for (var i = 0; i < boAnswers.length; i++) total += (boAnswers[i] || 0);
      var r = null;
      for (var j = 0; j < results.length; j++) { if (total >= results[j].min && total <= results[j].max) { r = results[j]; break; } }
      if (el('bo-quizWrap')) el('bo-quizWrap').style.display = 'none';
      var rw = el('bo-resultWrap');
      if (!rw) return;
      rw.style.display = 'block';
      if (el('bo-resEmoji')) el('bo-resEmoji').textContent = r.emoji;
      if (el('bo-resLevel')) { el('bo-resLevel').textContent = r.level; el('bo-resLevel').style.color = r.color; }
      if (el('bo-resTitle')) el('bo-resTitle').textContent = r.title;
      if (el('bo-resScore')) { el('bo-resScore').textContent = total; el('bo-resScore').style.color = r.color; }
      var bar = el('bo-resBar');
      if (bar) { bar.style.background = r.color; setTimeout(function () { bar.style.width = Math.round((total / 60) * 100) + '%'; }, 120); }
      if (el('bo-resDesc')) { el('bo-resDesc').style.background = r.bg; el('bo-resDesc').textContent = r.desc; }
      if (el('bo-resTips')) {
        var h = '<div class="bo-tips-title">지금 당장 할 수 있는 것</div>';
        for (var k = 0; k < r.tips.length; k++) h += '<div class="bo-rtip"><div class="bo-rtip-dot" style="background:' + r.color + '"></div><span>' + r.tips[k] + '</span></div>';
        el('bo-resTips').innerHTML = h;
      }
      if (el('bo-progFill')) el('bo-progFill').style.width = '100%';
      if (el('bo-progText')) el('bo-progText').textContent = questions.length + ' / ' + questions.length;
      rw.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.boResetQuiz = function () {
      boAnswers = new Array(15).fill(null); boCur = 0;
      if (el('bo-quizWrap'))   el('bo-quizWrap').style.display   = 'block';
      if (el('bo-resultWrap')) el('bo-resultWrap').style.display = 'none';
      boRender();
      if (el('bo-quizWrap')) el('bo-quizWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.boShowPhase = function (idx) {
      var d = phaseData[idx];
      for (var i = 0; i < 4; i++) { var p = el('bo-ph' + i); if (p) p.classList.toggle('active', i === idx); }
      var detail = el('bo-phaseDetail');
      if (!detail) return;
      detail.className = 'bo-phase-detail show';
      if (el('bo-phaseTitle')) { el('bo-phaseTitle').textContent = d.title; el('bo-phaseTitle').style.color = d.color; }
      if (el('bo-phaseDesc'))  el('bo-phaseDesc').textContent  = d.desc;
      if (el('bo-phaseSigns')) {
        var h = '';
        for (var j = 0; j < d.signs.length; j++) h += '<div class="bo-sign"><div class="bo-sign-dot" style="background:' + d.color + '"></div><span>' + d.signs[j] + '</span></div>';
        el('bo-phaseSigns').innerHTML = h;
      }
    };

    boRender();
    boBindEvents();
  }

  /* ================================================================
     [3] 자가진단 퀴즈 공통 엔진
     새 자가진단 글 추가 시: 아래 initSelfCheck(cfg)에 넘길 설정 객체만
     만들고, initXxx() 래퍼 함수를 하나 추가한 뒤 ready()에 등록하면 됨.
     (진행바/이전·다음/결과 화면 로직은 여기서 공통 처리)
  ================================================================ */
  function initSelfCheck(cfg) {
    var p = cfg.prefix;
    if (!el(p + '-quizWrap')) return;

    var questions = cfg.questions;
    var opts = cfg.opts;
    var results = cfg.results;
    var answers = new Array(questions.length).fill(null);
    var cur = 0;

    function render() {
      var q = questions[cur];
      if (el(p + '-qNum'))  el(p + '-qNum').textContent  = '문항 ' + (cur + 1) + ' / ' + questions.length;
      if (el(p + '-qText')) el(p + '-qText').textContent = q.text;
      var area = el(p + '-optArea');
      if (area) {
        area.innerHTML = '';
        for (var i = 0; i < opts.length; i++) {
          (function (idx) {
            var btn = document.createElement('button');
            btn.className = p + '-opt-btn' + (answers[cur] === idx ? ' selected' : '');
            btn.innerHTML = '<div class="' + p + '-opt-dot">' + (idx + 1) + '</div><span>' + opts[idx] + '</span>';
            btn.addEventListener('click', function () { answers[cur] = idx; render(); });
            area.appendChild(btn);
          })(i);
        }
      }
      var pct = Math.round((cur / questions.length) * 100);
      if (el(p + '-progFill')) el(p + '-progFill').style.width = pct + '%';
      if (el(p + '-progText')) el(p + '-progText').textContent = cur + ' / ' + questions.length;
      if (el(p + '-prevBtn'))  el(p + '-prevBtn').disabled = cur === 0;
      if (el(p + '-nextBtn'))  el(p + '-nextBtn').textContent = (cur === questions.length - 1) ? '결과 보기 →' : '다음 →';
    }

    function next() {
      if (answers[cur] === null) {
        var h = el(p + '-hint');
        if (h) {
          h.textContent = '⚠️ 문항을 선택해주세요'; h.style.color = '#E24B4A';
          setTimeout(function () { h.textContent = cfg.hintText || '선택 후 다음으로 이동하세요'; h.style.color = ''; }, 1800);
        }
        return;
      }
      if (cur < questions.length - 1) { cur++; render(); } else { showResult(); }
    }
    function prev() { if (cur > 0) { cur--; render(); } }

    function showResult() {
      var total = 0;
      for (var i = 0; i < answers.length; i++) total += (answers[i] || 0);
      var r = null;
      for (var j = 0; j < results.length; j++) { if (total >= results[j].min && total <= results[j].max) { r = results[j]; break; } }
      if (el(p + '-quizWrap')) el(p + '-quizWrap').style.display = 'none';
      var rw = el(p + '-resultWrap');
      if (!rw || !r) return;
      rw.style.display = 'block';
      if (el(p + '-resEmoji')) el(p + '-resEmoji').textContent = r.emoji;
      if (el(p + '-resLevel')) { el(p + '-resLevel').textContent = r.level; el(p + '-resLevel').style.color = r.color; }
      if (el(p + '-resTitle')) el(p + '-resTitle').textContent = r.title;
      if (el(p + '-resScore')) { el(p + '-resScore').textContent = total; el(p + '-resScore').style.color = r.color; }
      var bar = el(p + '-resBar');
      var maxScore = (opts.length - 1) * questions.length;
      if (bar) { bar.style.background = r.color; setTimeout(function () { bar.style.width = Math.round((total / maxScore) * 100) + '%'; }, 100); }
      if (el(p + '-resDesc')) el(p + '-resDesc').textContent = r.desc;
      if (el(p + '-resTips')) {
        var h = '<div class="' + p + '-tips-title">맞춤 실천 팁</div>';
        for (var k = 0; k < r.tips.length; k++) h += '<div class="' + p + '-rtip"><div class="' + p + '-rtip-dot" style="background:' + r.color + '"></div><span>' + r.tips[k] + '</span></div>';
        el(p + '-resTips').innerHTML = h;
      }
      if (el(p + '-progFill')) el(p + '-progFill').style.width = '100%';
      if (el(p + '-progText')) el(p + '-progText').textContent = questions.length + ' / ' + questions.length;
      rw.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function reset() {
      answers = new Array(questions.length).fill(null); cur = 0;
      if (el(p + '-quizWrap'))   el(p + '-quizWrap').style.display   = 'block';
      if (el(p + '-resultWrap')) el(p + '-resultWrap').style.display = 'none';
      render();
      if (el(p + '-quizWrap')) el(p + '-quizWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    var nb = el(p + '-nextBtn'); if (nb) nb.addEventListener('click', next);
    var pb = el(p + '-prevBtn'); if (pb) pb.addEventListener('click', prev);
    var retry = document.querySelector('.' + p + '-retry-btn'); if (retry) retry.addEventListener('click', reset);

    render();
  }

  /* ---- [3-1] 수면의 질 자가진단 (sq-) ---- */
  function initSleep() {
    initSelfCheck({
      prefix: 'sq',
      questions: [
        { text: "잠자리에 누워도 20분 이상 잠들지 못할 때가 많다." },
        { text: "자다가 자주 깨고 다시 잠들기 어렵다." },
        { text: "아침에 일어나도 개운하지 않고 피곤함이 남아있다." },
        { text: "자기 전 스마트폰이나 TV를 오래 본다." },
        { text: "주말과 평일의 기상 시간이 2시간 이상 차이난다." },
        { text: "낮 동안 졸음이 몰려와 집중하기 어렵다." },
        { text: "카페인이 든 음료를 오후 늦게도 마신다." },
        { text: "잠들기 전 머릿속으로 걱정거리가 계속 떠오른다." },
        { text: "코를 골거나 자다가 숨이 막히는 느낌을 받은 적이 있다(주변에서 들은 적 포함)." },
        { text: "수면 시간이 하루 6시간 미만인 날이 많다." }
      ],
      opts: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
      hintText: '솔직하게 선택할수록 정확해요',
      results: [
        { min: 0,  max: 10, emoji: "😴", level: "양호",        color: "#1D9E75",
          title: "수면의 질이 양호한 편이에요",
          desc: "전반적으로 안정적인 수면 패턴을 유지하고 있습니다. 지금의 생활 리듬을 꾸준히 지켜가는 것이 중요합니다.",
          tips: ["일정한 기상 시간을 유지하세요", "주말에도 기상 시간 차이를 1시간 이내로 유지해보세요"] },
        { min: 11, max: 20, emoji: "🌙", level: "경미한 저하",  color: "#EF9F27",
          title: "수면의 질이 조금씩 떨어지고 있어요",
          desc: "아직 심각하지 않지만 몇 가지 습관이 수면의 질을 갉아먹고 있을 수 있습니다.",
          tips: ["취침 1시간 전 화면 노출을 줄여보세요", "오후 2시 이후 카페인 섭취를 피해보세요", "잠들기 전 걱정거리를 메모로 적어두고 내려놓아보세요"] },
        { min: 21, max: 30, emoji: "🥱", level: "저하 위험군",  color: "#E85D24",
          title: "수면의 질 저하가 뚜렷하게 나타나요",
          desc: "낮 시간 활동에도 영향을 줄 수 있는 수준입니다. 수면 습관을 적극적으로 점검할 시점입니다.",
          tips: ["기상·취침 시간을 매일 같게 고정해보세요", "낮잠은 20분 이내로 제한하세요", "침실은 수면 전용 공간으로 만들어보세요(스마트폰 반입 금지)"] },
        { min: 31, max: 40, emoji: "🚨", level: "심각 단계",    color: "#E24B4A",
          title: "수면 문제가 심각한 수준이에요",
          desc: "코골이·무호흡 의심 증상까지 있다면 단순 습관 문제가 아닐 수 있습니다. 이 결과는 자가진단 참고용이며, 정확한 진단은 전문의 상담이 필요합니다.",
          tips: ["수면 클리닉이나 이비인후과 상담을 고려해보세요", "수면 일기를 2주간 기록해 패턴을 확인해보세요", "카페인·음주를 크게 줄여보세요"] }
      ]
    });
  }

  /* ---- [3-2] 스트레스 지수 자가진단 (si-) ---- */
  function initStress() {
    initSelfCheck({
      prefix: 'si',
      questions: [
        { text: "사소한 일에도 쉽게 짜증이 나거나 예민해진다." },
        { text: "두통, 소화불량, 근육 긴장 등 신체 증상이 잦아졌다." },
        { text: "해야 할 일이 많아 늘 시간에 쫓기는 기분이다." },
        { text: "잠들기 전에도 걱정과 생각이 멈추지 않는다." },
        { text: "사람 만나는 것이 예전보다 피곤하고 부담스럽다." },
        { text: "식욕이 예전보다 급격히 늘거나 줄었다." },
        { text: "집중력이 떨어져 실수가 잦아졌다." },
        { text: "특별한 이유 없이 불안하거나 마음이 무겁다." },
        { text: "스트레스를 풀기 위해 음주, 흡연, 폭식에 의존하는 편이다." },
        { text: "하루를 마무리할 때 성취감보다 지친 느낌이 크다." }
      ],
      opts: ["전혀 아니다", "거의 아니다", "가끔 그렇다", "자주 그렇다", "항상 그렇다"],
      hintText: '솔직하게 선택할수록 정확해요',
      results: [
        { min: 0,  max: 10, emoji: "🟢", level: "안정",        color: "#1D9E75",
          title: "스트레스를 잘 관리하고 있어요",
          desc: "현재 스트레스 수준이 안정적인 범위입니다. 지금의 대처 방식을 유지해보세요.",
          tips: ["규칙적인 운동과 수면을 유지하세요", "가끔은 의도적으로 아무것도 안 하는 시간을 가져보세요"] },
        { min: 11, max: 20, emoji: "🟡", level: "경계",        color: "#BA7517",
          title: "스트레스가 조금씩 쌓이고 있어요",
          desc: "일상적인 스트레스 반응이 나타나기 시작하는 단계입니다. 방치하면 누적될 수 있습니다.",
          tips: ["하루 10분 산책이나 스트레칭을 시도해보세요", "할 일을 우선순위대로 정리해 부담을 줄여보세요", "믿을 만한 사람에게 고민을 털어놓아보세요"] },
        { min: 21, max: 30, emoji: "🟠", level: "위험군",      color: "#E85D24",
          title: "스트레스가 신체·감정에 영향을 주고 있어요",
          desc: "수면, 식욕, 대인관계 등 여러 영역에서 스트레스의 영향이 나타나는 단계입니다.",
          tips: ["업무·일정을 줄일 수 있는 부분을 찾아보세요", "호흡법이나 명상 등 이완 기법을 연습해보세요", "증상이 2주 이상 지속되면 상담을 고려해보세요"] },
        { min: 31, max: 40, emoji: "🔴", level: "심각 단계",    color: "#E24B4A",
          title: "적극적인 관리가 필요한 수준이에요",
          desc: "만성 스트레스는 신체 질환으로 이어질 수 있습니다. 이 결과는 참고용이며, 정확한 평가는 전문가 상담이 필요합니다.",
          tips: ["정신건강의학과나 상담센터 방문을 고려해보세요", "정신건강 위기상담전화 1577-0199를 이용할 수 있습니다", "당장 줄일 수 있는 스트레스 요인부터 하나씩 정리해보세요"] }
      ]
    });
  }

  /* ---- [3-3] 장 건강 자가진단 (gh-) ---- */
  function initGut() {
    initSelfCheck({
      prefix: 'gh',
      questions: [
        { text: "배에 가스가 자주 차고 더부룩함을 느낀다." },
        { text: "변비나 설사가 반복되는 편이다." },
        { text: "식사 후 속이 더부룩하거나 소화가 잘 안 된다." },
        { text: "인스턴트, 가공식품, 배달음식을 자주 먹는다." },
        { text: "채소·과일 등 식이섬유가 풍부한 음식을 잘 챙겨 먹지 못한다." },
        { text: "스트레스를 받으면 배가 아프거나 화장실을 자주 간다." },
        { text: "잦은 트림이나 속쓰림을 느낀다." },
        { text: "항생제나 소화제를 자주 복용하는 편이다." },
        { text: "피부 트러블이나 만성 피로가 소화 문제와 함께 나타난다." },
        { text: "물을 하루 1리터 미만으로 마신다." }
      ],
      opts: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
      hintText: '솔직하게 선택할수록 정확해요',
      results: [
        { min: 0,  max: 10, emoji: "🌿", level: "양호",        color: "#1D9E75",
          title: "장 건강이 양호한 편이에요",
          desc: "소화 기능과 식습관이 비교적 균형 잡혀 있습니다. 지금의 식습관을 유지해보세요.",
          tips: ["식이섬유·발효식품 섭취를 꾸준히 유지하세요", "규칙적인 식사 시간을 지켜보세요"] },
        { min: 11, max: 20, emoji: "🍽️", level: "경미한 저하",  color: "#EF9F27",
          title: "장 건강 관리가 조금 필요해요",
          desc: "가벼운 소화 불편감이 반복되고 있을 수 있습니다. 식습관을 점검해볼 시점입니다.",
          tips: ["가공식품 섭취를 줄이고 채소를 늘려보세요", "물을 하루 1.5리터 이상 마셔보세요", "식후 가벼운 산책을 시도해보세요"] },
        { min: 21, max: 30, emoji: "😣", level: "저하 위험군",  color: "#E85D24",
          title: "장 기능 저하가 뚜렷하게 나타나요",
          desc: "소화 불편감이 반복되고 스트레스와도 연관되어 있을 가능성이 있습니다.",
          tips: ["식사일기를 써서 불편한 음식을 파악해보세요", "유산균, 발효식품을 규칙적으로 섭취해보세요", "카페인·자극적인 음식을 줄여보세요"] },
        { min: 31, max: 40, emoji: "🚨", level: "심각 단계",    color: "#E24B4A",
          title: "장 건강에 적극적인 관리가 필요해요",
          desc: "증상이 지속되면 단순 소화불량이 아닌 다른 원인일 수 있습니다. 이 결과는 참고용이며, 정확한 진단은 전문의 상담이 필요합니다.",
          tips: ["증상이 2주 이상 지속되면 소화기내과 진료를 받아보세요", "혈변, 급격한 체중 변화가 있다면 즉시 병원을 방문하세요", "식단과 스트레스 관리를 함께 병행해보세요"] }
      ]
    });
  }

  /* ================================================================
     실행 — 페이지에 해당 요소가 있을 때만 각각 초기화
     새 주제 추가 시: initXxx() 함수 작성 후 아래에 한 줄 추가
  ================================================================ */
  ready(function () {
    initSmartphone();  /* 스마트폰 중독 글 */
    initBurnout();     /* 번아웃 글 */
    initSleep();       /* 수면의 질 자가진단 글 */
    initStress();      /* 스트레스 지수 자가진단 글 */
    initGut();         /* 장 건강 자가진단 글 */
    /* initNewTopic(); ← 새 글 추가 시 여기에 한 줄 */
  });

})();
