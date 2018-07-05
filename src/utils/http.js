import axios from 'axios'
// import { config } from 'src/utils/config'

axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 599; // default
}

var fnComplete;
var source;
export class HttpMiddleware {
  constructor(fn) {
    let self = this;
    function resolve(url, res) {
      let data  = res.data;
      if (res.status >= 200 && res.status < 400) {
        !!self.fnComplete && self.fnComplete(res);
      } else {
        if (!!self.fnCatch) {
          self.fnCatch(res)
        } else {
          if (res.status === 403 && /(Invalid-Token@Community-Admin)|(Invalid-Admin@Community-Admin)/.test(res.data.error_code)) {
            window.VUE.$router.replace('/login')
            if (!localStorage.token) {
              return
            } else {
              window.VUE.$store.dispatch('withoutAuth')
            }
          }
          if (res.status >= 400 && !!res.data.error_msg) {
            var message = res.data.error_msg
            var domain_message = ''
            if (res.data.domain.length > 0) {
              res.data.domain.map((item) => {
                domain_message = domain_message + ';' + item.message
              })
            }
            window.VUE.$message({
              message: res.data.error_msg + ':' + domain_message,
              type: 'error'
            });
          }
        }
      }

    }
    function reject(url, error) {
      console.error('request error: \n' + 'url: ' + url, error);
    }
    function abort(source) {
      self.source = source;
    }
    return fn(resolve, reject, abort);
  }
  then (done) {
    this.fnComplete = done;
    return this;
  }
  abort () {
    let source  = this.source;
    source.cancel('API is aborted.');
    return this;
  }
  catch(done) {
    this.fnCatch = done;
    return this;
  }
}

class Http {
  constructor() {
    this.request = function(opt){
      return new HttpMiddleware((resolve, reject, abort) => {
        let CancelToken = axios.CancelToken;
        let source = CancelToken.source();
        // if (!opt.url.match('http')) {
        //   opt.url = config().api_host + opt.url;
        // }
        opt.headers = {};
        if (!!localStorage.token) {
          opt.headers.Authorization = 'Bearer ' + localStorage.token;
        };
        // 入参去除前后空格
        if (opt.data) {
          Object.keys(opt.data).forEach((item) => {
            if (typeof opt.data[item] === 'string') {
              opt.data[item] = opt.data[item].trim()
            }
          })
        }
        axios.request({cancelToken: source.token, ...opt}).then((res) => {
              resolve(opt.url, res);
            }).catch((error) => {
              reject(opt.url, error);
            });

        abort(source);
      });
    };
  }
  get(url, config) {
    return this.request({
      method: 'get',
      url: url,
      ...config,
    });
  }
  post(url, data, config) {
    return this.request({
      method: 'post',
      url: url,
      data: data,
      ...config,
    });
  }
  put(url, data, config) {
    return this.request({
      method: 'put',
      url: url,
      data: data,
      ...config,
    });
  }
  patch(url, data, config) {
    return this.request({
      method: 'patch',
      url: url,
      data: data,
      ...config,
    });
  }
  delete(url, config) {
    return this.request({
      method: 'delete',
      url: url,
      ...config,
    });
  }
}

export const HTTP = new Http();
