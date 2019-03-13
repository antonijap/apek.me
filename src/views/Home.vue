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

<style lang="scss">
.wrapper {
  width: 960px;
  margin: 10em auto;
  width: 70%;

  h1 {
    // text-align: center;
    font-family: bio-sans, sans-serif;
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 96px;
    margin-left: 64px;
    margin-right: 64px;

		a {
      font-family: bio-sans, sans-serif;
      font-weight: 600;
      font-style: italic;
      line-height: 1.6;
			text-decoration: none;
			cursor: pointer;
    }
  }

  .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .project {
      width: 49.6%;
      position: relative;

      img {
        width: 100%;
        height: auto;
        border-radius: 4px;
      }

      span {
        position: absolute;
        bottom: 16px;
        left: 16px;
        color: #fff;
        background: #000;
        padding: 3px 6px 5px;
        font-family: bio-sans, sans-serif;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
      }
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
