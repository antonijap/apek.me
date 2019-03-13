<template>
	<div class="wrapper">
		<h1>{{ $prismic.richTextAsPlain(homepage.data.site_title) }}</h1>
		<div class="projects">
			<div class="project" v-for="(work, index) in works" :key="index">
			<!-- {{ $prismic.richTextAsPlain(work.data.title) }} -->
			<img :src="work.data.promo_image.url"/>
		</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.wrapper {
  width: 90%;
  margin: 10em auto;

  .projects {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: $space-base;
    grid-row-gap: $space-base;

    @include md {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>


<script>
export default {
	name: 'Home',
	data() {
		return {
			homepage: {},
			works: [],
		}
	},
	mounted() {
		this.$nextTick(function () {
			this.$prismic.client.query(
				this.$prismic.Predicates.any('document.type', ['work', 'homepage'])
			).then((response) => {
				this.home = response.results
				response.results.map(item => {
					if (item.type === "work") {
						this.works.push(item)
					} else if (item.type === "homepage") {
						this.homepage = item
					}
				})	
			});
		})
	}
}
</script>
