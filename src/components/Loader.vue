<template>
  <transition name="fade">
    <div v-show="loading" class="loader">
      <div>
        <transition name="fade">
          <h1 v-show="initiated">Rhiannon Newton</h1>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Loader',
    props: ['loading'],
    components: {},
    data() {
      return {
        initiated: false,
      };
    },
    mounted() {
      this.initiated = true;
    },
    computed: {},
    methods: {},
  };
</script>

<style lang="scss" scoped>
  div.loader {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    text-align: center;
    z-index: 9999999;
    height: 100%;
    background-color: white;

    h1 {
      color: black;
    }
  }
</style>
