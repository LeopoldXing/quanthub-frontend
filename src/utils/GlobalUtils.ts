// 创建一个 sleep 函数，接受毫秒为参数
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
