<template>
  <div>
    <h1>帖子列表</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "PostList",
  metaInfo: {
    title: "帖子列表",
  },
  computed: {
    ...mapState(["posts"]),
  },
  // Vue SSR 特殊为服务端渲染提供的一个生命周期钩子函数
  serverPrefetch() {
    // 发起 action，返回 Promise
    // this.$store.dispatch('getPosts')
    const data = this.getPosts();
    return data;
  },
  methods: {
    ...mapActions(["getPosts"]),
  },
  // 服务端只支持 beforeCreate 和 created
  // 不会等待 beforeCreate 和 created 中的异步操作
  // 不支持响应式数据
  // 所有这种做法在服务端渲染中是不会工作的
  // async created() {
  //   console.log("Posts Created Start");
  //   const { data } = await axios({
  //     method: "GET",
  //     url: "https://gank.io/api/v2/categories/GanHuo",
  //   });
  //   this.posts = data.data;
  //   console.log("Posts Created End");
  // },
};
</script>
