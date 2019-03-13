<template>
	<div class="wrapper">
		<h1><prismic-rich-text v-if="homepage" :field="homepage.data.title"/></h1>
		<div class="projects">
			<div class="project" v-for="(work, index) in works" :key="index">
				<span>{{ $prismic.richTextAsPlain(work.data.title) }}</span>
				<img :src="work.data.promo_image.url"/>
			</div>
		</div>
		<div class="copy">

		</div>
		<div class="hobby">

		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.wrapper {
  width: 90%;
  margin: 4em auto;

  @include md {
	width: 80%;
	margin: 10em auto;
  }

  @include xl {
    width: 60%;
  }

  h1, p {
	  margin-left: $space-x-large;
	  margin-right: $space-x-large;

	@include md {
		margin-left: $space-x-large * 4;
	  	margin-right: $space-x-large * 4;
	}
  }

  .projects {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: $space-base;
	grid-row-gap: $space-base;
	margin-bottom: $space-base * 8;
	margin-top: $space-base * 8;

    @include md {
	  	grid-template-columns: 1fr 1fr;
	  	margin-bottom: $space-base * 16;
		margin-top: $space-base * 16;
    }
  }
}
</style>


<script>
export default {
	name: 'Home',
	data() {
		return {
			homepage: null,
			works: [],
		}
	},
	methods: {
		getContent (uid) {
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
			})
		}
	},
	created () {
		this.getContent(this.$route.params.uid);
	},
	beforeRouteUpdate (to, from, next) {
		this.getContent(to.params.uid);
		next();
	}
}
</script>
