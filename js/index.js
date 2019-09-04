"use strict";

// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  arreyLocalStorage();
}

function switchModal(localstorageid) {
  // const id = localstorageid.parentNode.parentNode.parentNode; // ボタンが押された要素のkeyがある親に移動
  // const pickTrId = id.getAttribute("data-key"); // idを取得
  // const addKey = document.getElementById("js-popup");
  // addKey.dataset.key = pickTrId;
  // const d = JSON.parse(localStorage.getItem(pickTrId)); // データを取得してparse

  // // フォームに挿入
  // document.getElementById("revise-word").value = d.word;
  // document.getElementById("revise-definition").value = d.definition ;
  // // localStorage.removeItem(pickTrId); // localstorageからidと同名のキーを削除
  // // rows.parentNode.deleteRow(rows.sectionRowIndex); // rowsでtbody内の行番号を指定して削除
  closeModal();
}
// モーダルを閉じる
function closeModal(){
  var popup = document.getElementById('js-popup');
  popup.classList.toggle('is-show');
}