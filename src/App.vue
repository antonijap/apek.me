<template>
  <div id="app">
      <router-view/>
    <footer/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/css/resetr.css";
@import "./assets/css/prismic-edit-button.css";
@import "./assets/scss/main.scss";
</style>
