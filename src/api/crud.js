import request from '@/utils/request'

export function getTableData(params) {
  return request({
    url: 'jpaUser/queryByPage',
    method: 'POST',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: "jpaUser/add",
    data: params,
    method: "POST"
  })
}
