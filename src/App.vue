<template>
  <div id="app">
    <div>{{ message }} {{ description }}</div>
    <input type="text" v-model="description" />
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
