import { getTopCategoryAPI } from '@/apis/category'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async () => {
    // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    const res = await getTopCategoryAPI(route.params.id)
    categoryData.value = res.result
  }
  onMounted(() => getCategory())

  return { categoryData }
}