export function numberWithCommas(x) {
   x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export function strTransform(string) {
  let string_arr = string.split(" ");
  let result_arr = [];
  for (let i = 0; i < string_arr.length; i++) {
    result_arr.push(string_arr[i].charAt(0).toUpperCase() + string_arr[i].slice(1))
  }
  return result_arr.join(" ")
};