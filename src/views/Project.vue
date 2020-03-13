<template>
		<div class="wrapper">
      <a href="/">Back</a>
			<prismic-rich-text v-if="project" :field="project.data.title"/>
			<prismic-rich-text v-if="project" :field="project.data.description" class="subtitle"/>
			<img v-if="project" :src="project.data.promo_image.url">
			<prismic-rich-text v-if="project" :field="project.data.case"/>
		</div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.wrapper {
  width: 90%;
  margin: 1em auto;

  @include md {
    width: 50%;
    margin: 4em auto;
  }

  img {
    margin-bottom: $space-large;
  }

  /deep/ h1 {
    font-size: 40px;
    margin-bottom: $space-base;
    margin-top: $space-large;
    line-height: 1.3;
    text-align: left;

    @include md {
      font-size: 4rem;
    }
  }

  /deep/ h2 {
    font-size: 32px;
    margin-bottom: $space-x-large;
    line-height: 1.4;
    text-align: left;
  }

  /deep/ h3 {
    font-size: 24px;
    margin-bottom: $space-medium;
    line-height: 1;
    margin-top: 16px;

    @include md {
      font-size: 2rem;
    }
  }

  /deep/ p {
    margin-bottom: $space-large;
    line-height: 1.6;
  }

  /deep/ ul {
    margin-top: 16px;
    margin-bottom: 32px;
    padding-left: 24px;

    li {
      line-height: 2;
      list-style-type: circle;
    }
  }
}
</style>


<script>
export default {
		name: "Home",
		data() {
				return {
						project: null
				};
		},
		methods: {
				getContent(uid) {
						this.$prismic.client.getByUID("work", uid).then(document => {
								this.project = document;
						});
				}
		},
		created() {
				this.getContent(this.$route.params.uid);
		},
		beforeRouteUpdate(to, from, next) {
				this.getContent(to.params.uid);
				next();
		}
};
</script>
