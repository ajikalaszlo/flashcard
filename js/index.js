"use strict";

// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  arreyLocalStorage();
  showLength();
}

function switchModal(localstorageid) {
  closeModal();
}
// モーダルを閉じる
function closeModal(){
  var popup = document.getElementById('js-popup');
  popup.classList.toggle('is-show');
}