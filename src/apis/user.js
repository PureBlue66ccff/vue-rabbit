import http from '@/utils/http'

export function loginAPI(account, password) {
  return http({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}