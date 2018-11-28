<template>
  <div class="index">
    <div class="item">
      <h4 class="title">个人信息</h4>
      <p><span>姓名：</span><span>{{profileInfo.name}}</span></p>
      <p><span>性别：</span><span>{{this.$Func.returnGenderStatus(profileInfo.gender)}}</span></p>
      <p><span>年龄：</span><span>{{profileInfo.age}}</span></p>
      <p><span>身份证号：</span><span>{{profileInfo.idNumber}}</span></p>
      <p><span>邮箱：</span><span>{{profileInfo.email}}</span></p>
      <p><span>学历：</span><span>{{this.$Func.returnEducationStatus(profileInfo.education)}}</span></p>
      <p><span>婚姻状况：</span><span>{{this.$Func.returnMaritalStatusStatus(profileInfo.maritalStatus)}}</span></p>
      <p><span>宗教：</span><span>{{this.$Func.returnReligionStatusStatus(profileInfo.religion)}}</span></p>
      <p><span>居住地址：</span><span>{{profileInfo.location}}</span></p>
    </div>

    <div class="item">
      <h4 class="title">联系人信息</h4>
      <p><span>联系人1：</span><span>{{contactInfo.familyName}}</span></p>
      <p><span>亲属关系：</span><span>{{this.$Func.returnFamilyRelationStatus(contactInfo.familyRelation)}}</span></p>
      <p><span>联系电话：</span><span>{{contactInfo.familyPhone}}</span></p>
      <p><span>联系人2：</span><span>{{contactInfo.friendName}}</span></p>
      <p><span>亲属关系：</span><span>{{this.$Func.returnFriendRelationStatus(contactInfo.friendRelation)}}</span></p>
      <p><span>联系电话：</span><span>{{contactInfo.friendPhone}}</span></p>
    </div>

    <div class="item">
      <h4 class="title">工作信息</h4>
      <p><span>职业：</span><span>{{jobInfo.occupation}}</span></p>
      <p><span>月收入：</span><span>{{jobInfo.monthlyIncome}}</span></p>
      <p><span>工作年限：</span><span>{{jobInfo.workYears}}</span></p>
      <p><span>公司名称：</span><span>{{jobInfo.companyName}}</span></p>
      <p><span>公司电话：</span><span>{{jobInfo.companyPhone}}</span></p>
      <p><span>工作地址：</span><span>{{jobInfo.companyLocation}}</span></p>
    </div>


    <div class="item">
      <h4 class="title">银行卡信息</h4>
      <p><span>所属银行：</span><span>{{bankCardInfo.bankCode}}</span></p>
      <p><span>银行卡号：</span><span>{{bankCardInfo.number}}</span></p>
      <p><span>电话：</span><span>{{bankCardInfo.mobile}}</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: '',
        profileInfo: {},
        jobInfo: {},
        contactInfo: {},
        bankCardInfo: {}
      }
    },
    created() {
      this.userId = this.$route.query.userId || localStorage.getItem("userId")
      this.getProfile()
      this.getJob()
      this.getContact()
      this.getBankCard()
    },
    methods: {
      getProfile() {
        this.$api.sendRequest('getProfile', {userId: this.userId}, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.profileInfo = data.profileInfo
          } else {
            this.$alert('请求失败')
          }
        })
      },
      getJob() {
        this.$api.sendRequest('getJob', {userId: this.userId}, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.jobInfo = data.jobInfo
          } else {
            this.$alert('请求失败')
          }
        })
      },
      getContact() {
        this.$api.sendRequest('getContact', {userId: this.userId}, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.contactInfo = data.contactInfo
          } else {
            this.$alert('请求失败')
          }
        })
      },
      getBankCard() {
        this.$api.sendRequest('getBankCard', {userId: this.userId}, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.bankCardInfo = data.bankCardInfo
          } else {
            this.$alert('请求失败')
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .index {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    .item {
      width: 43%;
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 5px 25px 25px 15px;
      line-height: 30px;
      h4 {
        border-bottom: 1px solid #e8e8e8;
        font-size: 16px;
        line-height: 40px;
      }
    }
  }
</style>
