import request from '@/utils/request'

// ��¼
export function login(username, password) {
  return request({
    url: '/admin/acl/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// ��ȡ�û���Ϣ
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// �ǳ�
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

// ��ȡ�˵�Ȩ������
export function getMenu() {
  return request({
    url: '/admin/acl/index/menu',
    method: 'get'
  })
}
