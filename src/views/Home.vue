<template>
  <div class="wrapper">
    <prismic-rich-text v-if="homepage" :field="homepage.data.title"/>
    <div class="projects">
      <div class="project" v-for="(work, index) in works" :key="index">
        <router-link :to="`/${work.uid}`">
          <h2>{{ $prismic.richTextAsPlain(work.data.title) }}</h2>
        </router-link>
        <p>{{ $prismic.richTextAsPlain(work.data.description) }}</p>
        <router-link :to="`/${work.uid}`">
          <a href="">Read Story</a>
        </router-link>
      </div>
    </div>
    <div class="more">
      <prismic-rich-text v-if="homepage" :field="homepage.data.slot_1"/>
      <div class="videos">
        <iframe
          src="https://www.youtube.com/embed/JHddHz69B7E"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/JHddHz69B7E"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
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
    color: #1134C7;
  }

  /deep/ h1 {
    margin-bottom: $space-medium;
    font-weight: 500;
    color: #1134C7;
    font-size: 24px;
    line-height: 160%;
    margin: 0 20% $space-x-large;
    text-align: center;
  }

  .projects {
    margin-bottom: $space-base * 8;
    margin-top: $space-base * 8;
    display: grid;
    grid-template-columns:  1fr 1fr;
    grid-column-gap: $space-large;
    grid-row-gap: $space-large;

    .project {
      background: linear-gradient(30.88deg, #F4F6FE 28.67%, rgba(255, 255, 255, 0) 86.35%);
      border: 2px solid rgba(149, 169, 247, 0.5);
      padding: 16px;
      h2 {
        font-size: 18px;
        margin-bottom: $space-base;
        color: #1134C7;
      }
      a {
        color: #1134C7;
      }
    }
  }
}

.more {
  /deep/ h3 {
    color: #888888;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: $space-medium;
  }

  .videos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: $space-medium;
    background: yellow;

    iframe {
      width: 100%;
      height: 270px;
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
      works: []
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
