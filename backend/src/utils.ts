export const random = (len: number):string => {
  let options:string = "qwertyuiopasdfghjkllzxcvbnm1234567890";
  let length = options.length;
  let ans:string = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * length)];
  }
  return ans;
};
