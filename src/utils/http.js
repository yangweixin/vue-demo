import axios from 'axios'

// 请求前拦截器
axios.interceptors.request.use( config => {
  console.log('before request')
  
  return config
}, error => {
  console.log('ERROR: before request')
})
//响应后拦截器
axios.interceptors.response.use( response => {
  console.log('after response')
  return response
}, error => {
  console.log('ERROR: after response')
})

const httpClient = (method, url, data) => {
  
  // 公共参数
  let Public = {
    // 'Author': 'Young'
  }

  // 默认参数
  let defaultOpts = {
    method: method,
    baseURL: '/api',
    url: url,
    timeout: 10000,
    data: Object.assign(Public, data),
    params: Object.assign(Public, data),
    headers: method=='get'? {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }:{
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    }
  }

  if(!!localStorage.token){
    defaultOpts.headers['Authorization'] = localStorage.token
  }

  if(method == 'get'){
    delete defaultOpts.data
  }else{
    delete defaultOpts.params
  }

  let promise = new Promise(function(resolve, reject){
    axios(defaultOpts).then(
      (res) => {
        resolve(res)
      }
    ).catch(
      (response => {
        reject(response)
      })
    )
  })

  return promise
}



export default {
  get: (url, data) => {
    return new httpClient('get', url, data)
  },
  post: (url, data) => {
    return new httpClient('post', url, data)
  },
  put: (url, data) => {
    return new httpClient('put', url, data)
  },
  patch: (url, data) => {
    return new httpClient('patch', url, data)
  },
  del: (url, data) => {
    return new httpClient('delete', url, data)
  }
}

