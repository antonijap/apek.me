<template>
	<div class="wrapper">
		<prismic-rich-text v-if="project" :field="project.data.title"/>
		<prismic-rich-text v-if="project" :field="project.data.description"/>
		<img v-if="project" :src="project.data.promo_image.url"/>
		<prismic-rich-text v-if="project" :field="project.data.case"/>
	</div>
</template>

<style lang="scss">
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

	h1 {
		font-size: 42px;
		text-align: center;
	}

	h2 {
		text-align: center;
		margin-bottom: 64px;
		font-size: 22px;
		font-weight: 400;
		color: gray;
	}

	h3 {
		margin-top: 16px;
		color: gray;
		font-size: 22px;
	}
	
	p {
		font-size: 16px;
		line-height: 1.8;
		margin-left: 0;
		margin-right: 0;
		padding: 8px 0 24px;
	}

	ul {
		padding-left: 24px;
		margin-top: 8px;
		margin-bottom: 32px;
		list-style-type: circle;
		li {
			line-height: 2.0;
			padding-left: 8px;
		}
	}
}
</style>


<script>
export default {
	name: 'Home',
	data() {
		return {
			project: null
		}
	},
	methods: {
		getContent(uid) {
			this.$prismic.client.getByUID("work", uid).then((document) => {
				this.project = document
			});
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
