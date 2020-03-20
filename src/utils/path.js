const ENV = {
  // 正常命令
  development: 'http://shoptest.i3phm.com:9001',
  production: 'https://gateway.i3phm.com/lk-truck-webadmin',

  // 新配置命令
  test: 'http://192.168.43.116:9001',
  prod: 'http://gateway.i3phm.com/lk-truck-webadmin'
}

export function getUrl () {
  return ENV[process.env.VUE_APP_TITLE]
}
