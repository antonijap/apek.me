<template>
  <div class="wrapper">
    <h1>{{ $prismic.richTextAsPlain(data.site_title) }}</h1>
  </div>
</template>

<style lanf="scss" scoped>
@import "../css/base.css";
.wrapper {
  width: 960px;
  margin: 10em auto;
}
</style>


<script>
export default {
  name: 'Home',
  data() {
    return {
      data: {
        site_title: "",
        slot_1: "",
        slot_2: ""
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.$prismic.client.getSingle("homepage").then((document) => {
        this.data = document.data
      });
    })
    
  }
}
</script>
