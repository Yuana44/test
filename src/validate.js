// 表单验证
import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider, localize, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
import merge from 'lodash/merge' 

// 配置错误提示文本的样式类名
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid', 
  }
})

// 注册所有规则
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// 将自定义的message与内置的中文message合并
const locale = merge(zh_CN, {
  messages: { 
    is: '{_field_}必须与密码相同',
    oneOf: '{_field_}必须同意'
  }
})
// 指定中文提示信息
localize('zh_CN', locale)

// 注册用于校验的组件
Vue.component('ValidationProvider', ValidationProvider) 
Vue.component('ValidationObserver', ValidationObserver) 
