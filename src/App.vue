<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/posts">Posts</router-link></li>
    </ul>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "茂茂",
      description: "",
    };
  },
};
</script>
