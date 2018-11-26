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
    let arr = ['禁用', '正常']
    return arr[num]
  },
  returnUserStatusNum(str) {
    if (str.length > 1) {
      let arr = ['禁用', '正常']
      return arr.indexOf(str)
    } else {
      return str
    }
  },
  //还款方式
  returnPayMoneyStatus(num) {
    let arr = ['一次性', '分期付']
    return arr[num]
  },
  returnPayMoneyNum(str) {
    if (str.length > 1) {
      let arr = ['一次性', '分期付']
      return arr.indexOf(str)
    } else {
      return str
    }
  },
  //短信服务商启用状态
  returnSmsNum(str) {
    if (str.length > 1) {
      let arr = ['禁用', '启用']
      return arr.indexOf(str)
    } else {
      return str
    }
  },
  //认证流程状态
  returnIdentifyStatus(num) {
    let arr = ['未认证', '认证中', '认证成功', '认证失败']
    return arr[num]
  },
  //是否黑名单
  returnIsblackStatus(num) {
    let arr = ['否', '是']
    return arr[num]
  }
}
