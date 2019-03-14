<template>
	<div class="wrapper">
		<prismic-rich-text v-if="project" :field="project.data.title"/>
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

  h1,
  p {
		font-size: 22px;
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

		.project {
			position: relative;
			span {
				position: absolute;
				bottom: $space-medium;
				left: $space-medium;
				color: #909090;
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
			project: null
		}
	},
	methods: {
		getContent(uid) {
			this.$prismic.client.getByUID('page', 'uid').then((document) => {
				this.project = document
				console.log(document);
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
