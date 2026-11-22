/*
  K-Buddy Connect 公開設定。公開前に README.md「配布前に埋めること」を参照して埋める。
  - endpoint:     Google Apps Script ウェブアプリの URL（https://script.google.com/macros/s/.../exec）
  - instagramUrl: 公式 Instagram の URL。空なら Instagram リンクを非表示にする
  - recruiting:   募集の受付スイッチ（true / false）
*/
window.KBUDDY_CONFIG = {
  endpoint: "https://script.google.com/macros/s/AKfycbz4PkONIC91venc7bA5jmXUegRfRqKT2zDBIbhGScP5RZNfx50NUauZQWOGl9S-rqhwZA/exec",
  instagramUrl: "",
  // false にすると申込ボタンを止め、「受付を一時停止しています」と表示する（サーバー側の受付は止まらない）
  recruiting: true,
  consentVersion: "2026-11-22"
};
