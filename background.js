// 右クリックメニューの作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyTitleAndUrl",
    title: "タイトルとURLをコピー",
    contexts: ["page", "link"]
  });
});

// メニュークリック時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyTitleAndUrl") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const text = `${document.title}\n${window.location.href}`;
        navigator.clipboard.writeText(text)
          .then(() => {
            console.log('コピーしました');
          })
          .catch(err => {
            console.error('コピーに失敗しました:', err);
          });
      }
    });
  }
});
