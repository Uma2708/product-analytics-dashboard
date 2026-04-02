import Cookies from 'js-cookie'

export const getCookie = (key: string) => Cookies.get(key)
export const setCookie = (key: string, value: string, days = 30) => Cookies.set(key, value, { expires: days })
export const removeCookie = (key: string) => Cookies.remove(key)
