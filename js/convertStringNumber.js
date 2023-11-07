export const convertStringNumber = (str) => {
  const noSpaceStr = str.replace(/\s+/g, ''); // убираем из стоки все пробелыи заменяем их на пустую строчку)
  const num = parseFloat(noSpaceStr);

  if (!isNaN(num) && isFinite(num)) {
    return num
  } else {
    return false
  }
}