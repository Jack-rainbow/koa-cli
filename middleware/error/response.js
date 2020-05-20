// response 统一格式
const format = (data, code = 0, msg = 'ok') => {
    return {
      code,
      msg,
      data
    }
  }
  
  export {
    format
  }