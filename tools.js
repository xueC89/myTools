function ToolsCollect () {}

ToolsCollect.prototype = {
  /**
   * 
   * @desc 判断两个数组是否相等
   * @param {Array} arr1 
   * @param {Array} arr2 
   * @return {Boolean}
   */
  arrayEqual: function (arr1, arr2) {
    if (arr1 === arr2) return true
    if (arr1.length != arr2.length) return false
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  },
  /**
   * 
   * @desc   为元素添加class
   * @param  {HTMLElement} ele 
   * @param  {String} cls 
   */
  addClass: function (ele, cls) {
    if (!this.hasClass(ele, cls)) {
      ele.className += ' ' + cls
    }
  },
  /**
   * 
   * @desc 判断元素是否有某个class
   * @param {HTMLElement} ele 
   * @param {String} cls 
   * @return {Boolean}
   */
  hasClass: function (ele, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className)
  },
  /**
   * 
   * @desc 为元素移除class
   * @param {HTMLElement} ele 
   * @param {String} cls 
   */
  removeClass: function (ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      ele.className = ele.className.replace(reg, ' ')
    } 
  },
  /**
   * 
   * @desc 根据name读取cookie
   * @param  {String} name 
   * @return {String}
   */
  getCookie: function (name) {
    var arr = document.cookie.replace(/\s/g, '').split(';')
    for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split('=')
      if (tempArr[0] == name) {
        return decodeURIComponent(tempArr[1])
      }
    }
    return ''
  },
  /**
   * 
   * @desc  设置Cookie
   * @param {String} name 
   * @param {String} value 
   * @param {Number} days 
   */
  setCookie: function (name, value, days) {
    var date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie = name + '=' + value + ';expires=' + date
  },
  /**
   * 
   * @desc 根据name删除cookie
   * @param  {String} name 
   */
  removeCookie: function (name) {
    // 设置已过期，系统会立刻删除cookie
    this.setCookie(name, '1', -1)
  },
  /**
   * 
   * @desc 获取浏览器类型和版本
   * @return {String} 
   */
  getExplore: function () {
    var sys = {},
        ua = navigator.userAgent.toLocaleLowerCase(),
        s
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
      (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
      (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
      (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
      (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
      (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
      (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
  },
  /**
   * 
   * @desc 获取滚动条距顶部的距离
   */
  getScrollTop: function () {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
  },
  /**
   * 
   * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
   * @param {HTMLElement} ele 
   * @returns { {left: number, top: number} }
   */
  offset: function (ele) {
    var pos = {
      top: 0,
      left: 0
    }
    while (ele) {
      pos.top += ele.offsetTop
      pos.left += ele.offsetLeft
      ele = ele.offsetParent
    }
    return pos
  },
  /**
   * 
   * @desc 设置滚动条距顶部的距离
   */
  setScrollTop: function (value) {
    window.scrollTo(0, value)
    return value
  },
  /**
   * @desc 深拷贝，支持常见类型
   * @param {Any} values
   */
  deepClone: function (values) {
    var copy
    if (null == values || 'object' != typeof values) return values
    if (values instanceof Date) {
      copy = new Date()
      copy.setTime(values.getTime())
      return copy
    }
    if (values instanceof Array) {
      copy = []
      for (var i = 0, len = values.length; i < len; i++) {
        copy[i] = this.deepClone(values[i])
      }
      return copy
    }
    if (values instanceof Object) {
      copy = {}
      for (var attr in values) {
        if(values.hasOwnProperty(attr)) copy[attr] = this.deepClone(values[attr])
      }
      return copy
    }
  },
  /**
   * 
   * @desc   判断`obj`是否为空
   * @param  {Object} obj
   * @return {Boolean}
   */
  isEmptyObject: function (obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return false
    }
    return !Object.keys(obj).length
  },
  /**
   * 
   * @desc 随机生成颜色
   * @return {String} 
   */
  randomColor: function () {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16).slice(-6))
  },
  /**
   * 
   * @desc 生成指定范围随机数
   * @param  {Number} min 
   * @param  {Number} max 
   * @return {Number} 
   */
  randomNum: function (min, max) {
    return Math.floor(min + Math.random() * (max - min))
  },
  /**
   * 
   * @desc   判断是否为邮箱地址
   * @param  {String}  str
   * @return {Boolean} 
   */
  isEmail: function (str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
  },
  /**
   * 
   * @desc  判断是否为身份证号
   * @param  {String|Number} str 
   * @return {Boolean}
   */
  isIdCard: function (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  },
  /**
   * 
   * @desc   判断是否为手机号
   * @param  {String|Number} str 
   * @return {Boolean} 
   */
  isPhoneNum: function (str) {
    return /^(0|86|17951)?(13|14|15|17|18|19)[0-9]{9}$/.test(str)
  },
  /**
   * 
   * @desc   判断是否为URL地址
   * @param  {String} str 
   * @return {Boolean}
   */
  isUrl: function (str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str)
  },
  /**
   * 
   * @desc   现金额转大写
   * @param  {Number} n 
   * @return {String}
   */
  digitUppercase: function (n) {
    var fraction = ['角', '分']
    var digit = [
      '零', '壹', '贰', '叁', '肆','伍', '陆', '柒', '捌', '玖'
    ]
    var unit = [
      ['元', '万', '亿'],['', '拾', '佰', '仟']
    ]
    var head = n < 0 ? '欠' : ''
    n = Math.abs(n)
    var s = ''
    for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p
        n = Math.floor(n / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  },
  /**
   * @desc   格式化${startTime}距现在的已过时间
   * @param  {Date} startTime 
   * @return {String}
   */
  formatPassTime: function (startTime) {
    var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12)
    if (year) return year + '年前'
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
  },
  /**
   * 
   * @desc   格式化现在距${endTime}的剩余时间
   * @param  {Date} endTime  
   * @return {String}
   */
  formatRemainTime: function (endTime) {
    var startDate = new Date() //开始时间
    var endDate = new Date(endTime) //结束时间
    var t = endTime.getTime() - startTime.getTime() //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24)
      h = Math.floor(t / 1000 / 60 / 60 %24)
      m = Math.floor(t / 1000 / 60 % 60)
      s = Math.floor(t / 1000 % 60)
    }
    return d + '天' + h + '小时' + m + '分钟' + s + '秒'
  },
  /**
   * 
   * @desc   url参数转对象
   * @param  {String} url  default: window.location.href
   * @return {Object} 
   */
  parseQueryString: function (url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }
}
