module.exports = {
  new: [],
  improvements: [],
  bugfixes: [
    {
      header: 'ランチャーを閉じた時にゲームを強制終了させてしまうバグを修正',
      content: 'ランチャーを閉じてもゲームは継続されます。',
      advanced: { cm: '391dd9cc', pr: '1412' }
    },
    {
      header: 'ゲームの解像度に関するバグを修正',
      content: '設定が反映されないバグがありました。',
      advanced: { cm: '87f89ed9', pr: '1429' }
    },
    {
      header: 'エラーコード１を修正',
      content: 'Javaの引数が足りていませんでした。',
      advanced: { cm: 'cdae501a', pr: '1420' }
    }
  ]
};
