"use strict";

// すべてのデータを表示する
function showAllData() {
    if (localStorage.length === 0) {
        document.getElementById("list-cleared").innerHTML = "<p>毎日少しずつ覚えましょう</p>";
        document.getElementById("list-all").innerHTML = "<p>まだありません</p>";
        return;
    }
    let understand = 0;
    let i = 0;
    let l = 0;
    document.getElementById("list-all").innerHTML = "";
    document.getElementById("list-cleared").innerHTML ="" ;
    Object.keys(localStorage).forEach(function (key) {
      const d = JSON.parse(localStorage.getItem(key));
      if (d.understanding <= 9) {
        document.getElementById("list-all").insertAdjacentHTML(
          "beforeend",
          `
          <div data-key="${key}">
          <div class="list-row">
          <div class="list-word-wrap">  
            <div class="list-words">${d.word}</div>
            <div class="list-definition">${d.definition}</div>
          </div>
          <div class="list-understand">
            <div class="back">
                <div class="bar" style="width :${d.understanding}0%;"></div>
            </div>
          </div>  
          <div class="list-menu"><button onclick="switchModal(this)"><i class="fas fa-ellipsis-v"></i></button></div>
          </div> 
          </div>
          </div>
          `
        );
          i = i + 1;
          l = l + 1;
      }else{
        document.getElementById("list-cleared").insertAdjacentHTML(
          "beforeend",
          `
          <div data-key="${key}">
          <div class="list-row">
          <div class="list-word-wrap">  
            <div class="list-words">${d.word}</div>
            <div class="list-definition">${d.definition}</div>
          </div>
          <div class="list-understand">
            <div class= "delete-understanding" onclick="resetUnderstand(this)"><i class="fas fa-check-circle"></i></div>
        </div>  
          <div class="list-menu"><button onclick="switchModal(this)"><i class="fas fa-ellipsis-v"></i></button></div>
          </div> 
          </div>
          </div>
          `
        );
        understand = understand + 1;
        };
        console.log(i);
        if (i === localStorage.length) {
            document.getElementById("list-cleared").innerHTML ="<p>毎日少しずつ覚えましょう</p>" ;
        }

        if (l === 0) {
            document.getElementById("list-all").innerHTML ="<p>新しい単語を登録しましょう！</p>" ;
        }
        document.getElementById("understandChild").innerHTML = understand;
        console.log(understand);
      showLength();
    }
    )
  }
  
  //  LocalStorageが保有する件数を表示
  function showLength() {
    const lengthLocalStorage = localStorage.length;
    document.getElementById("countLocalStorage").innerHTML = lengthLocalStorage;
  }
  
  // 新しい単語をLocalStorageに保存
  function pushData() {
    if (
      document.getElementById("word").value == "" ||
      document.getElementById("definition").value == ""
    ) {
      alert("入力項目が空欄です"); //データが空欄だったら警告
    } else {
      let numKey = 0;
      Object.keys(localStorage).forEach(function (key) {
        if (numKey < Number(key)) {
          numKey = Number(key);
        }
      });
      const realKey = numKey + 1; //一番大きいKeyの数字に1を足したものを新規のKeyとする
  
      //入力されたデータを取得
      const data_word = document.getElementById("word").value;
      const data_definition = document.getElementById("definition").value;
      const data_favorite = 0;
      const data_understanding = 0;
  
      //データをオブジェクトに保存する
      const flashcards = {
        word: data_word,
        definition: data_definition,
        favorite: data_favorite,
        understanding: data_understanding
      };
      //JSONデータに変換して登録する
      const setjson = JSON.stringify(flashcards);
      localStorage.setItem(realKey, setjson);
      document.submit.reset(); // 保存後にフォームをリセット
    }
    arreyLocalStorage();
  }



  // お気に入りに追加
  function addFavorite(addFavorite) {
    const getTrId = addFavorite.parentNode.dataset.fav; // お気に入りが押された行のidを選択
    const getTd = addFavorite.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
    const pickTrId = getTd.getAttribute("data-key"); // rowsで取得した行のidを取得
    const pickLocalStorage = JSON.parse(localStorage.getItem(pickTrId)); // rowsで取得した行のデータを取得してparse
    if (getTrId === "fav_0") {
      pickLocalStorage["favorite"] = "1"; //　お気に入りをオン
      const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
      localStorage.setItem(pickTrId, setjson);
      showAllData();
    } else {
      pickLocalStorage["favorite"] = "0"; //　お気に入りをオフ
      const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
      localStorage.setItem(pickTrId, setjson);
      showAllData();
    }
  }

//ランダムで問題配列の生成
function arreyLocalStorage() {
    window.arrayLS = [];
    Object.keys(localStorage).forEach(function (key) {
      const d = JSON.parse(localStorage.getItem(key));
      if (d.understanding < 10) {
        arrayLS.push(key);
      }
    })
    if (arrayLS.length === 0) {
      document.getElementById("randomLocalStorage").textContent = "すべての単語を習得しました！新しい単語を登録しましょう！"; //表示項目を空欄にする
      console.log("０件です");
    } else {
      var a = arrayLS.length;
      while (a) {
        const j = Math.floor(Math.random() * a);
        const t = arrayLS[--a];
        arrayLS[a] = arrayLS[j];
        arrayLS[j] = t;
      }
      displayQuiz(); // 問題生成
    }
  }
  
  // ランダム表示テスト
  function displayQuiz() {
    document.getElementById("randomLocalStorage").textContent = ""; //表示項目を空欄にする
    if (arrayLS.length === 0) {
      console.log("recreate word list")
      arreyLocalStorage(); // 一巡したら再度リストのセットを生成する
    } else {
      const target = arrayLS.shift(); //配列から最初の数字を引用して削除する
      const d = JSON.parse(window.localStorage.getItem(target));
      document.getElementById("randomLocalStorage").insertAdjacentHTML("afterbegin",
        `<div data-key="${target}">
        <div class="quiz-card">
          <div class ="quiz-word">
          ${d.word}
          </div>
          <div id="quizDefinition" style="visibility: hidden;">${d.definition}</div>
          </div>
        <div id="answerButton">
          <button type="button" class="quiz-button" onclick="checkAnswer()">Flip</button>
        </div>
        </div>
      </div>
        `
      )
    }
  }
  
  // 正解を見るボタン
  function checkAnswer(ans) {
    const def = document.getElementById("quizDefinition");
    def.style.visibility = "visible";
    document.getElementById("answerButton").innerHTML = `
      <button type="button" class="answerOK" onclick="answerQuiz(this,1)">Got it</button>
        <button type="button" class="answerNG" onclick="answerQuiz(this,-1)">I'm not sure</button>
        `;
  }
  
  // 理解度チェックQUIZ用
  function answerQuiz(addScore, checkScore) {
    const getTrId = addScore.parentNode.parentNode.dataset.key;
    const pickLocalStorage = JSON.parse(localStorage.getItem(getTrId)); // rowsで取得した行のデータを取得してparse
    if (checkScore === 1) { // 理解度のスコアをあげる
      pickLocalStorage["understanding"] = pickLocalStorage["understanding"] + 1;
    } else if (checkScore === -1) {
      if ((0 < pickLocalStorage["understanding"]) && (pickLocalStorage["understanding"] < 10)) {
        pickLocalStorage["understanding"] = pickLocalStorage["understanding"] - 1;
      }
    }
    const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
    localStorage.setItem(getTrId, setjson);
    displayQuiz();
  }
  
  //LocalStorage内のデータを全て破棄する
  function dumpLocalStorageData() {
    const askDelete = window.confirm(
      "【注意】全てのデータを削除しようとしています！本当によろしいですか？"
    );
    if (askDelete) {
      localStorage.clear();
    }
  }
  
// 

  
  // Enterキーが押下されたとき次のフィールドにフォーカスする
  window.onkeydown = keydown; // キーの入力を監視してkeydownを発動
  function keydown(e) {
    if (e.keyCode === 13) {
      var obj = document.activeElement;
      obj.nextElementSibling.focus();
    }
  }
  
  
  