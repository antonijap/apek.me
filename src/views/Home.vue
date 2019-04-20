<template>
  <div class="wrapper">
    <prismic-rich-text v-if="homepage" :field="homepage.data.title"/>
    <div class="projects">
      <div class="project" v-for="(work, index) in works" :key="index">
        <router-link :to="`/${work.uid}`">
          <div class="rectangle">
            <img :src="work.data.promo_image.url">
          </div>
          <h2>{{ $prismic.richTextAsPlain(work.data.title) }}</h2>
          <h3>{{ $prismic.richTextAsPlain(work.data.description) }}</h3>
        </router-link>
      </div>
    </div>
    <div class="more">
      <prismic-rich-text v-if="homepage" :field="homepage.data.slot_1"/>
      <div>
        <h3>Latest From Blog</h3>
        <h4>Make a design system with Figma</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quos.</p>
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
    // width: 70%;
    width: 960px;
    margin: 10em auto;
  }

  @include xl {
    // width: 40%;
  }

  /deep/ p {
    font-size: 16px;
    margin-bottom: $space-medium;
    line-height: 1.5;
  }

  /deep/ h1 {
    font-size: 22px;
    margin-bottom: $space-medium;
    line-height: 1.5;

    @include md {
      font-size: 32px;
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
      // overflow: hidden;

      a {
        &:hover {
          .rectangle {
            // background-color: #9d72c9;
          }
        }
      }

      /deep/ p {
        font-family: Spectral;
      }

      img {
        transition: transform 300ms ease-out;

        &:hover {
          transform: translateY(-10px);
        }
      }

      h2 {
        font-size: 24px;
        margin-top: $space-medium;
        margin-bottom: $space-base;
      }

      h3 {
        font-size: 16px;
        font-family: Spectral;
        font-weight: 400;
        letter-spacing: -0.5px;
      }

      .rectangle {
        background-color: #c299ea;
        border-radius: 5px;
      }
    }
  }
}

.more {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: $space-large;
  grid-row-gap: $space-base;

  /deep/ h3 {
    color: #888888;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: $space-medium;
  }

  /deep/ h4 {
    font-family: Spectral;
    font-size: 19px;
    font-weight: 500;
    margin-bottom: $space-base;
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
