export const verifyPhone = (rule, value, callback) => { // 手机号码验证
  if (!(/^1[3456789]d{9}$/.test(value))) {
    callback(new Error('请输入正确的手机号码！'))
  } else {
    callback()
  }
}

export const verifyEmail = (rule, value, callback) => { // 邮箱验证
  const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  if (!(reg.test(value))) {
    callback(new Error('邮箱格式不正确！'))
  } else {
    callback()
  }
}

export const verifyUrl = (rule, value, callback) => {
  const RegUrl = new RegExp()
  RegUrl.compile('^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\\?/.=]+$') // jihua.cnblogs.com
  if (!RegUrl.test(value)) {
    callback(new Error('网址格式不正确！'))
  } else {
    callback()
  }
  return true
}

export const verifyIdCard = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(value) === false) {
    callback(new Error('身份证输入不合法！'))
  } else {
    callback()
  }
}

export const verifyCHN = (rule, value, callback) => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+')
  if (reg.test(value) === false) {
    callback(new Error('请输入中文字符！'))
  } else {
    callback()
  }
}

export const isEmpty = (rule, value, callback) => {
  if (value.trim() === '') {
    callback(new Error('不能为空！'))
  } else {
    callback()
  }
}

export const isNumber = (rule, value, callback) => {
  if (!isNaN(value)) {
    callback(new Error('不是数字类型！'))
  } else {
    callback()
  }
}
