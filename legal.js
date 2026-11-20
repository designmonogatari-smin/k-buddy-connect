/*
  個人情報の取り扱い・モニター参加規約の言語切り替え（日本語 / 한국어）
  index.html と同じ保存キー（kbuddy_lang）と ?lang= を使う。
*/
(function(){
  'use strict';
  var LANGS = ['ja', 'ko'], STORE_KEY = 'kbuddy_lang';
  var jaTitle = document.title;
  var koTitle = window.KBUDDY_LEGAL_TITLE_KO || jaTitle;

  function storedLang(){ try { return localStorage.getItem(STORE_KEY); } catch(e){ return null; } }
  function saveLang(l){ try { localStorage.setItem(STORE_KEY, l); } catch(e){} }
  function pickLang(){
    var q = new URLSearchParams(location.search).get('lang'), s = storedLang();
    if (LANGS.indexOf(q) >= 0) return q;
    if (LANGS.indexOf(s) >= 0) return s;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^ko\b/i.test(nav) ? 'ko' : 'ja';
  }
  // Section anchors differ per language (#operator / #operator-ko, #contact / #contact-ko).
  function mapHash(hash, lang){
    if (!hash) return '';
    var base = hash.replace(/-ko$/, '');
    return lang === 'ko' ? base + '-ko' : base;
  }
  function withLang(href, lang){
    var parts = href.split('#'), base = parts[0].split('?')[0];
    var hash = parts[1] ? mapHash('#' + parts[1], lang) : '';
    return base + '?lang=' + lang + hash;   // always explicit
  }

  document.documentElement.classList.add('js');
  var lang = pickLang();
  function apply(){
    document.documentElement.lang = lang;
    document.title = lang === 'ko' ? koTitle : jaTitle;
    document.querySelectorAll('[data-lang-block]').forEach(function(el){ el.hidden = el.getAttribute('data-lang-block') !== lang; });
    document.querySelectorAll('[data-lang-text]').forEach(function(el){ el.hidden = el.getAttribute('data-lang-text') !== lang; });
    document.querySelectorAll('.lang-switch button').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    document.querySelectorAll('a[href^="privacy.html"], a[href^="terms.html"], a[href^="index.html"]').forEach(function(a){
      a.setAttribute('href', withLang(a.getAttribute('href'), lang));
    });
  }
  document.querySelectorAll('.lang-switch button').forEach(function(b){
    b.addEventListener('click', function(){
      var next = b.getAttribute('data-lang');
      if (next === lang || LANGS.indexOf(next) < 0) return;
      lang = next; saveLang(lang);
      try {
        var u = new URL(location.href); u.searchParams.set('lang', lang);
        u.hash = mapHash(u.hash, lang);
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      } catch(e){}
      apply();
    });
  });
  apply();
  // Jump to the language-specific anchor when arriving with #operator / #contact.
  if (location.hash) {
    var target = document.getElementById(mapHash(location.hash, lang).slice(1));
    if (target) target.scrollIntoView();
  }
})();
