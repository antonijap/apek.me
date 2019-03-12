<template>
	<div class="wrapper">
		<h1>{{ $prismic.richTextAsPlain(homepage.data.site_title) }}</h1>
		<!-- <pre>{{homepage}}</pre> -->
		<ul>
			<li v-for="(work, index) in works" :key="index">
				{{ $prismic.richTextAsPlain(work.data.title) }}
				<img :src="work.data.promo_image.url"/>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
h1 {
	text-align: center;
	font-family: bio-sans, sans-serif;
	font-size: 16px;
	line-height: 1.6;
}

a {
	font-family: bio-sans, sans-serif;
	font-weight: 600;
	font-style: italic;
	line-height: 1.6;
}

img {
	width: 100%;
	height: auto;
}

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
