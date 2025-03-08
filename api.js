export async function generateConfig(subUrl, rules) {
  const backend = 'https://api.v1.mk/sub?';  // 假设的后端 API 地址
  const url = `${backend}target=surge&url=${encodeURIComponent(subUrl)}&rules=${encodeURIComponent(JSON.stringify(rules))}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('网络响应错误');
  }
  return await response.text();
}
