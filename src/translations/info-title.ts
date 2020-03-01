export const getTitle = (title: string) => {
  const titles = [
    ["unknown", ""],
    ["pending", "準備中"],
    ["peercard", "確認身份"],
    ["roundwolf", "狼人殺人"],
    ["seer", "預言家查驗"],
    ["witch", "女巫救人或下毒"],
    ["daybreaks", "天亮了"],
    ["startopinion", "開始發表言論"],
    ["opinion 1", "1號玩家發表言論"],
    ["opinion 2", "2號玩家發表言論"],
    ["opinion 3", "3號玩家發表言論"],
    ["opinion 4", "4號玩家發表言論"],
    ["opinion 5", "5號玩家發表言論"],
    ["opinion 6", "6號玩家發表言論"],
    ["opinion 7", "7號玩家發表言論"],
    ["opinion 8", "8號玩家發表言論"],
    ["opinion 9", "9號玩家發表言論"],
    ["opinion 10", "10號玩家發表言論"],
    ["publicvote", "投票"],
    ["publicvoteresult", "投票結果"],
    ["gameover", "遊戲結束"],
    ["", ""],
    [undefined, ""]
  ];
  return titles.find(x => x[0] === title)![1]!;
};
