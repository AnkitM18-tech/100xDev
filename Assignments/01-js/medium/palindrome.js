/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let modStr = str
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Za-z0-9\s]/g, "")
    .replace(" ", "");
  let letterCount = modStr.length;
  if (letterCount === 1 || letterCount === 0) {
    return true;
  }
  let mid = letterCount / 2;
  let flag = 0;
  for (let i = 0; i <= mid; i++) {
    if (modStr.charAt(i) === modStr.charAt(letterCount - i - 1)) {
      // pass
    } else {
      flag++;
    }
  }
  return flag !== 0 ? false : true;
}

module.exports = isPalindrome;
