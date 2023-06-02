import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, getNewCartListAPI, delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const token = computed(() => userStore.userInfoData.token)

  const cartList = ref([])

  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (token.value) {
      await insertCartAPI(skuId, count)
      const res = await getNewCartListAPI()
      cartList.value = res.result
    }
    else {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      }
      else {
        cartList.value.push(goods)
      }
    }
  }

  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  //是否全选
  const isAll = computed(() => cartList.value.every((i) => i.selected))

  const delCart = async (skuId) => {
    if (token.value) {
      //调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      const res = await getNewCartListAPI()
      cartList.value = res.result
    }
    else {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  const checkboxChange = (skuId, selected) => {
    const item = cartList.value.find((i) => i.skuId === skuId)
    item.selected = selected
  }

  //全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  //已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  //已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  const clearAll = () => {
    cartList.value = []
  }

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    checkboxChange,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearAll
  }
}, {
  persist: true,
})