<template>
    <div>
      <div class="container">
        <prismic-rich-text v-if="homepage" :field="homepage.data.title"/>
      </div>

      <img src="../assets/img/antonijapek.jpg" alt="Antonija Pek" class="image">

      <div class="container grid">
        <prismic-rich-text v-if="homepage" :field="homepage.data.slot_1"/>
        <div class="grid-sidebar">
          <prismic-rich-text v-if="homepage" :field="homepage.data.slot_2"/>
          <prismic-rich-text v-if="homepage" :field="homepage.data.slot_2"/>
          <prismic-rich-text v-if="homepage" :field="homepage.data.slot_2"/>
        </div>

        <!-- <div class="projects">
          <div class="project" v-for="(work, index) in works" :key="index">
            <router-link :to="`/${work.uid}`">
              <h2>{{ $prismic.richTextAsPlain(work.data.title) }}</h2>
            </router-link>
          </div>
        </div> -->

        <!-- <div class="ctas" v-if="loaded">
          <a target="blank" href="https://drive.google.com/open?id=1mC70qO3suwVNkO1KLRFI7ULSlbh9zbkw">Check Resume</a>
          <a target="blank" href="https://www.youtube.com/channel/UCCgaKuRMOV_dH3kuaaHPzvA">My Channel</a>
          <a target="blank" href="https://twitter.com/captdesign">Tweet me!</a>
          <a target="blank" href="mailto:antonijapek@gmail.com">Hire me</a>
        </div> -->
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.image {
  width: 80%;
  margin: 5em auto 5em 0;
}

.flex-child {
  margin: auto;

  strong {
    opacity: 0.5;
  }

  ul {
    li {
      list-style-type: none;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8%;
}

.container {
  width: 90%;
  margin: 4em auto;

  .grid-sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
  }

  @include md {
    width: 60%;
    margin: 5em auto;
  }

  @include lg {
    
  }

  @include xl {
    
  }

  /deep/ p {
    font-size: 18px;
    margin-bottom: $space-medium;
    line-height: 1.8;
  }

  /deep/ h1 {
    font-size: 48px;
    line-height: 150%;
  }

  .projects {
    margin-bottom: $space-base;
    margin-top: $space-x-large;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: stretch;

    .project {
      h2 {
        color: black;
        padding: $space-base;
        display: block;
      }
      p {
        font-size: 18px;
        line-height: 160%;
      }
    }

    @include md {
      flex-direction: row;
      .project {
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }

  .ctas {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: stretch;
    a {
      color: black;
      padding: $space-base;
      display: block;
    }
    @include md {
      flex-direction: row;
      a {
        &:first-child {
          padding-left: 0;
        }
      }
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
