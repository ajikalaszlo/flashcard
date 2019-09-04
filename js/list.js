"use strict";

// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  showAllData();
}

  // jsonファイルの読み込み・LocalStorageへの一括登録
  const form = document.forms.jsonForm;
  form.jsonFile.addEventListener('change', function (e) {
    var result = e.target.files[0];
    //FileReaderのインスタンスを作成する
    var reader = new FileReader();
    //読み込んだファイルの中身を取得する
    reader.readAsText(result);
    //ファイルの中身を取得後に処理を行う
    reader.addEventListener('load', function () {
      const jsondata = JSON.parse(reader.result);
      Object.keys(jsondata).forEach(function (key) {
        const flashcards = {
          word: jsondata[key].word,
          definition: jsondata[key].definition,
          favorite: 0,
          understanding: 0
        };
        const setjson = JSON.stringify(flashcards);
        localStorage.setItem(jsondata[key].key, setjson);
      })
    })
  })
// モーダル
//   function popupImage() {
//     var popup = document.getElementById('js-popup');
//     if(!popup) return;
  
//     var blackBg = document.getElementById('js-black-bg');
//     var closeBtn = document.getElementById('js-close-btn');
//     var showBtn = document.getElementById('js-show-popup');
  
//     closePopUp(blackBg);
//     closePopUp(closeBtn);
//     closePopUp(showBtn);
//     function closePopUp(elem) {
//       if(!elem) return;
//       elem.addEventListener('click', function() {
//         popup.classList.toggle('is-show');
//       });
//     }
//   }
// popupImage();
  
function switchModal(localstorageid) {
    const id = localstorageid.parentNode.parentNode.parentNode; // ボタンが押された要素のkeyがある親に移動
    const pickTrId = id.getAttribute("data-key"); // idを取得
    const addKey = document.getElementById("js-popup");
    addKey.dataset.key = pickTrId;
    const d = JSON.parse(localStorage.getItem(pickTrId)); // データを取得してparse

    // フォームに挿入
    document.getElementById("revise-word").value = d.word;
    document.getElementById("revise-definition").value = d.definition ;
    // localStorage.removeItem(pickTrId); // localstorageからidと同名のキーを削除
    // rows.parentNode.deleteRow(rows.sectionRowIndex); // rowsでtbody内の行番号を指定して削除
    closeModal();
}
// モーダルを閉じる
function closeModal(){
    var popup = document.getElementById('js-popup');
    popup.classList.toggle('is-show');
}

function resetUnderstand(localstorageid) {
    const id = localstorageid.parentNode.parentNode.parentNode; // ボタンが押された要素のkeyがある親に移動
    const pickTrId = id.getAttribute("data-key"); // idを取得
    const addKey = document.getElementById("js-popup");
    addKey.dataset.key = pickTrId;
    const d = JSON.parse(localStorage.getItem(pickTrId)); // データを取得してparse
    d["understanding"] = "0"; //　お気に入りをオン
    const setjson = JSON.stringify(d); // 再度stringfy
    localStorage.setItem(pickTrId, setjson);
    // closeModal();
}

// 登録済みのデータの修正
function reviseData(localstorageid){
        const id = localstorageid.parentNode.parentNode.parentNode.parentNode.parentNode; // 修正ボタンが押された要素のkeyがある親に移動
        const pickTrId = id.getAttribute("data-key"); // idを取得
        const d = JSON.parse(localStorage.getItem(pickTrId)); // データを取得してparse
          //入力されたデータを取得
        const data_word = document.getElementById("revise-word").value;
        const data_definition = document.getElementById("revise-definition").value;
        d.word = data_word;
        d.definition = data_definition;
        const setjson = JSON.stringify(d); // 再度stringfy
        localStorage.setItem(pickTrId, setjson);
    closeModal();
    showAllData();
}

  // 削除ボタンを押すと表示されている列とLocalstorageの両方を削除
  function deleteLocalStorageData(pushedDeleteButton) {
    const askDelete = window.confirm("削除してもよろしいですか？");
    if (askDelete) {
      const rows = pushedDeleteButton.parentNode.parentNode.parentNode.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
      const pickTrId = rows.getAttribute("data-key"); // rowsで取得した行のidを取得
      localStorage.removeItem(pickTrId); // localstorageからidと同名のキーを削除
    }

        showLength();

      showAllData();
      closeModal();
  }


// // 
// function deleteLocalStorageData(pushedDeleteButton) {
//     const askDelete = window.confirm("削除してもよろしいですか？");
//     if (askDelete) {
//         const rows = pushedDeleteButton.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
//         const pickTrId = rows.getAttribute("data-key"); // rowsで取得した行のidを取得
//         localStorage.removeItem(pickTrId); // localstorageからidと同名のキーを削除
//         rows.parentNode.deleteRow(rows.sectionRowIndex); // rowsでtbody内の行番号を指定して削除
//     }
//     arreyLocalStorage();
//     showLength();
//     }
  