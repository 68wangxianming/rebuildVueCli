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
  },
  //订单状态
  returnOrderStatus(num) {
    let arr = ['创建', '提交', '取消', '待审核', '审核拒绝', '待电核', '待放款', '放款中', '放款失败', '放款成功', '已逾期', '逾期还清', '正常结清']
    return arr[num]
  },
  //借款用途
  returnLoanType(num) {
    let arr = ['学费', '医疗费', '日常生活费', '创业资金', '电费', '还借贷', '电子商品分期', '还房贷', '还车贷', '修车费用',
      '旅游费用', '家庭装修费用', '住房费用', '结婚费用', '交通费', '其他']
    return arr[num]
  },
  //是否新老用户
  returnOldUserStatus(num) {
    let arr = ['新贷', '续贷']
    return arr[num]
  },
  //性别
  returnGenderStatus(num) {
    let arr = ['男', '女']
    return arr[num]
  },
  //学历
  returnEducationStatus(num) {
    let arr = ['SD 小学', 'SMP/SLTP 中学', 'SMA /SLTA高中', 'Diploma_I大专1', 'Diploma_II 大专2', 'Diploma_III 大专3', 'S1 本科', 'S2 硕士']
    return arr[num]
  },
  //婚姻
  returnMaritalStatusStatus(num) {
    let arr = ['未婚', '已婚', '离异', '丧偶']
    return arr[num]
  },
  //宗教
  returnReligionStatusStatus(num) {
    let arr = ['伊斯兰教', '基督新教', '天主教', '印度教', '佛教', '孔教', '其他']
    return arr[num]
  },
  //familyRelation
  returnFamilyRelationStatus(num) {
    let arr = ['父母', '配偶', '兄弟姐妹']
    return arr[num-1]
  },
  //friendRelation
  returnFriendRelationStatus(num) {
    let arr = ['同学', '同事', '朋友']
    return arr[num-1]
  },
}
