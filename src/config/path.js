let httpUrl = {
  baseUrl: ''
};

switch (process.env.VUE_APP_CURRENTMODE) {
  case 'development':
      // httpUrl.baseUrl = "http://10.0.0.61:8080/v2" //这里是本地的请求url
      httpUrl.baseUrl = "http://10.0.60.27:8080/v2" //这里是本地的请求url
      break
  case 'test':
      httpUrl.baseUrl = "https://web.seduclive.com/api" //这里是测试环境中的url
      break
  case 'production':
      httpUrl.baseUrl = "https://www.110che.com/api" //生产环境url
      break
}

export default httpUrl;
