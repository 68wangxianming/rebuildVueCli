export default {
  hasValInArrayObj: function (arr, key, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] == val)
        return i;
    }
    return -1;
  },
  //时间处理
  timeConversion: function (time) {
    if (!time)
      return '';
    let now = new Date(Date.parse(new Date(time)));

    function formatDate(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return year + "-" + formatTen(month) + "-" + formatTen(date) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
    }

    function formatTen(num) {
      return num > 9 ? (num + "") : ("0" + num);
    }

    return formatDate(now);
  },
  //用户状态
  returnUserStatus(num) {
    let arr = ['禁用','正常']
    return arr[num]
  }
}
