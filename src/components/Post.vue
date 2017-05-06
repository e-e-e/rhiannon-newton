<template>
  <transition name="fade">
    <div v-show="ready" :id="slug" class="post">
      <div v-if="title" class="title">
        <h2>{{title}} <a :href="`/#${slug}`"><i class="fa fa-link" aria-hidden="true" /></a></h2>
      </div>
      <div v-if="image" class="main-image">
        <div v-html="image" />
        <div v-if="caption" class="image-text" v-html="caption" />
      </div>
      <div class="text" v-html="content" />
      <div v-if="videos" class="videos">
        <div class="video" v-for="video in videos">
          <iframe :src="`http://player.vimeo.com/video/${video}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff`" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Post',
    props: ['slug', 'title', 'image', 'caption', 'videos', 'content'],
    components: {},
    data() { return { ready: false }; },
    created() {
      this.ready = true;
    },
    computed: {},
    methods: {},
  };
</script>

<style lang="scss">
  i.fa {
    display: inline-block;
    font-size: 0.7em;
    vertical-align: top;
  }

  .post {
    padding-top: 2rem;
    border-top: thick solid black;
  }
</style>
