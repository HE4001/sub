export async function fetchRules() {
  const rulesUrl = 'https://raw.githubusercontent.com/username/repo/main/rules.ini';  // 替换为实际规则文件地址
  const response = await fetch(rulesUrl);
  if (!response.ok) {
    throw new Error('无法拉取规则文件');
  }
  const rulesText = await response.text();
  return parseRules(rulesText);
}

function parseRules(iniContent) {
  const rules = [];
  const lines = iniContent.split('\n');
  for (const line of lines) {
    if (line.trim() && !line.startsWith(';')) {  // 忽略空行和注释
      rules.push(line.trim());
    }
  }
  return rules;
}
