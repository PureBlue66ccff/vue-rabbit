<script setup>
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import { getHotGoodsAPI } from '@/apis/detail';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  type: {
    type: Number, // 1代表24小时热销榜 2代表周热销榜 3代表总热销榜 可以使用type去适配title和数据列表
    default: 1
  }
})

const goodList = ref([])

const route = useRoute()

const getHotList = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.type
  })
  goodList.value = res.result
  //setTimeout(() => console.log(goodList.value), 10000)
}

onMounted(() => getHotList())
</script>


<template>
  <div class="goods-hot">
    <h3>{{ (type === 1) ? '24小时热榜' : '周热榜' }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in goodList" :key="item.id">
      <GoodsItem :goods="item"></GoodsItem>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>