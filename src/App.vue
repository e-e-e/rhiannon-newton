<template>
  <div id="rhiannon-newton">
    <loader :loading="loading" />
    <div class="over">
      <div id="header"><h1>Rhiannon Newton</h1></div>
    </div>
    <div id="main">
      <post v-for="post in posts"
        :key="post.id"
        :slug="post.slug"
        :title="post.title"
        :image="post.image"
        :caption="post.caption"
        :content="post.content"
        :videos="post.videos"
      />
      <infinite-loading v-if="posts.length > 0" :on-infinite="onInfinite" ref="infiniteLoading" :distance="500" />
    </div>
    <div class="over">
      <div id="footer"/>
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import Loader from 'components/Loader';
  import Post from 'components/Post';
  import { fetch, fetchSlug } from 'assets/js/prismic';

  export default {
    name: 'App',
    components: {
      InfiniteLoading,
      Post,
      Loader,
    },
    data() {
      return {
        loading: true,
        posts: [],
        error: null,
      };
    },
    created() {
      this.page = 1;
      const hash = window.location && window.location.hash && window.location.hash.substring(1);
      let promise;
      if (hash) {
        promise = fetchSlug(hash)
          .then((res) => {
            const after = res.length > 0 ? res[0].id : undefined;
            return fetch(this.page, after)
              .then(page => res.concat(page));
          });
      } else {
        promise = fetch(this.page);
      }
      promise
        .then((posts) => {
          this.loading = false;
          this.posts = this.posts.concat(posts);
          this.page += 1;
        })
        .catch(e => this.setError(e));
    },
    computed: {},
    methods: {
      setError(error) {
        console.error(error);
        this.error = error;
      },
      onInfinite() {
        fetch(this.page)
          .then((res) => {
            if (res.length > 0) {
              this.posts = this.posts.concat(res);
              this.page += 1;
            } else {
              this.page = 1;
            }
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          })
          .catch(e => this.setError(e));
      },
    },
};
</script>

<style src="assets/css/style.scss" lang="scss"></style>
