import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfoData = ref({})

  const setUserInfo = (userInfo) => {
    userInfoData.value = userInfo
  }

  const clearAllData = () => {
    userInfoData.value = {}
  }

  return {
    userInfoData,
    setUserInfo,
    clearAllData
  }
}, { persist: true })