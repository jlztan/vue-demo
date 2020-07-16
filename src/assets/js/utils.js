/**
 * 格式化当前时间
 */
function getCurTimestamp() {
  let addzero = num => {
    return num < 10 ? '0' + num : num.toString();
  };

  let date = new Date();
  const year = date.getFullYear().toString();
  const month = addzero(date.getMonth() + 1);
  const day = date.getDate().toString();
  const hour = addzero(date.getHours());
  const minute = addzero(date.getMinutes());
  const second = addzero(date.getSeconds());
  const millsecond = date.getMilliseconds();
  let currentTime = year + month + day + hour + minute + second + millsecond;
  return currentTime;
}

export { getCurTimestamp };
