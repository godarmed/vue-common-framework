import request from '@/utils/request'

function getTableData(params) {
  return request({
    url: 'jpaUser/queryByPage',
    method: 'POST',
    data: params
  })
}

function addUser(params) {
  return request({
    url: "jpaUser/add",
    data: params,
    method: "POST"
  })
}

function editUser(params) {
  return request({
    url: "jpaUser/update",
    data: params,
    method: "POST"
  })
}

export default{
  getTableData, addUser, editUser
}
