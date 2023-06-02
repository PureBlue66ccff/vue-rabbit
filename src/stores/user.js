import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()

  // 1. 定义管理用户数据的state
  const userInfoData = ref({})

  const setUserInfo = (userInfo) => {
    userInfoData.value = userInfo
  }

  const clearAllData = () => {
    userInfoData.value = {}
    cartStore.clearAll()
  }

  return {
    userInfoData,
    setUserInfo,
    clearAllData
  }
}, { persist: true })