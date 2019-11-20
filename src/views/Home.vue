<template>
    <div>
      <div class="container">
        <prismic-rich-text v-if="homepage" :field="homepage.data.title"/>
      </div>

      <img src="../assets/img/antonijapek.jpg" alt="Antonija Pek" class="image">

      <div class="container grid">
        <prismic-rich-text v-if="homepage" :field="homepage.data.slot_1"/>
        <div class="grid-sidebar">
          <div>
            <p class="list-title">Some of my work</p>
            <router-link :to="`/${work.uid}`" v-for="(work, index) in works" :key="index">
              {{ $prismic.richTextAsPlain(work.data.title) }}
            </router-link>
          </div>

          <div>
            <p class="list-title">Honorable mentions</p>
            <router-link :to="`/${personal.uid}`" v-for="(personal, index) in personal" :key="index">
              {{ $prismic.richTextAsPlain(personal.data.title) }}
            </router-link>
          </div>

          <div>
            <p class="list-title" style="margin-top: 8px;">Let's connect</p>
            <a target="blank" href="https://www.linkedin.com/in/antonijapek/">Linkedin</a>
            <a target="blank" href="https://twitter.com/captdesign">Twitter</a>
            <a target="blank" href="https://www.youtube.com/channel/UCCgaKuRMOV_dH3kuaaHPzvA">Youtube</a>
            <a target="blank" href="mailto:antonijapek@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.image {
  width: 100%;

  @include md {
    width: 90%;
    margin: 5em auto 5em 0;
  }
  
  @include lg {
    width: 80%;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8%;

  @include md {
    width: 60%;
    margin: 5em auto;
    grid-template-columns: 1fr 1fr;
  }
}

.list-title {
  opacity: 0.5;
  color: #2B2A25;
  margin-bottom: $space-base;
}

.container {
  width: 90%;
  margin: 1em auto;

  /deep/ h1 {
    font-size: 1.5em;
    line-height: 150%;

    @include md {
      font-size: 1.8em;
      margin-top: 5em;
    }

    @include lg {
      font-size: 2em;
    }
  }

  .grid-sidebar {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px;
    align-self: start;

    div {
      align-self: start;
    }

    @include md {
      grid-template-columns: 1fr 1fr;
    }

    /deep/ a {
      line-height: 1.7;
      margin-bottom: $space-base;
      display: block;
      color: inherit;
      font-weight: 500;
      &:hover {
        color: #FF2E00;
      }
    }
  }

  @include md {
    width: 80%;
    margin: 5em auto;
  }

  @include lg {
    width: 55%;
    margin: 5em auto;
  }

  @include xl {
    
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
      personal: [],
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
              if (item.data.variant == "Personal") {
                this.personal.push(item);
              } else {
                this.works.push(item);
              }
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
