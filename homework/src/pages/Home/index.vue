<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Rank />
    <Link />
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!-- <Floor /> -->
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "./ListContainer/ListContainer";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import Rank from "./Rank/Rank";
import Like from "./Like/Like";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Like,
    Rank,
    Brand,
    Floor,
  },
  mounted() {
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getFloors");
  },
  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
};
</script>

<style lang="less" scoped></style>
