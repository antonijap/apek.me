<template>
    <div class="wrapper">
      <prismic-rich-text v-if="homepage" :field="homepage.data.title"/>
      <div class="projects">
        <div class="project" v-for="(work, index) in works" :key="index">
          <router-link :to="`/${work.uid}`">
            <h2>{{ $prismic.richTextAsPlain(work.data.title) }}</h2>
            <p>{{ $prismic.richTextAsPlain(work.data.description) }}</p>
          </router-link>
        </div>
      </div>
      <div class="ctas" v-if="loaded">
        <a target="blank" href="https://drive.google.com/open?id=1mC70qO3suwVNkO1KLRFI7ULSlbh9zbkw" class="ghost">Check Resume</a>
        <a target="blank" href="https://www.youtube.com/channel/UCCgaKuRMOV_dH3kuaaHPzvA">My Channel</a>
        <a target="blank" href="https://twitter.com/captdesign">Tweet me!</a>
        <a target="blank" href="mailto:antonijapek@gmail.com">Hire me</a>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.wrapper {
  width: 90%;
  margin: 4em auto;

  @include md {
    width: 960px;
    margin: 10em auto;
  }

  /deep/ p {
    font-size: 18px;
    margin-bottom: $space-medium;
    line-height: 1.8;
    color: #F9F6F0;
  }

  /deep/ h1 {
    color: #F9F6F0;
    font-size: 54px;
    line-height: 130%;
  }

  /deep/ a {
    color: #BAA988;
    transition: all 700ms;
    &:hover {
      opacity: 0.5;
    }
  }

  .projects {
    margin-bottom: $space-base * 8;
    margin-top: $space-x-large * 3;
    display: grid;
    grid-template-columns:  1fr 1fr;
    grid-row-gap: $space-x-large;

    .project {
      h2 {
        font-size: 20px;
        margin-bottom: $space-base;
        color: #F9F6F0;
        font-family: bio-sans, sans-serif;
        line-height: 100%;
      }
      p {
        font-size: 18px;
        line-height: 160%;
      }
    }
  }

  .ctas {
    display: flex;
    align-items: center;
    .ghost {
      padding: 4px 16px;
      border: 1px solid #F9F6F0;
      text-align: center;
      transition: all 700ms;
      &:hover {
        background: #F9F6F0;
        color: #141412;
      }
    }
    a {
      color: #F9F6F0;
    }
    a:not(:first-child) {
      margin-left: $space-x-medium;
    }
  }

}
</style>


<script>
export default {
  name: "Home",
  data() {
    return {
      homepage: null,
      works: [],
      loaded: false
    };
  },
  methods: {
    getContent(uid) {
      this.$prismic.client
        .query(
          this.$prismic.Predicates.any("document.type", ["work", "homepage"]),
          { orderings: "[my.work.order]" }
        )
        .then(response => {
          this.home = response.results;
          response.results.map(item => {
            if (item.type === "work") {
              this.works.push(item);
            } else if (item.type === "homepage") {
              this.homepage = item;
              this.loaded = true
            }
          });
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
