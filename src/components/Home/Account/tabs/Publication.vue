<template>
  <fragment>
    <img
      v-for="(img, index) in publications"
      :key="index"
      loading="lazy"
      :src="img"
      alt="Grid"
      @click="showPopUp()"
    >
  </fragment>
</template>

<script lang="js">


import {mapActions, mapState} from 'vuex';
import Layout from '../../Layout/Layout';


export default Layout.extend({
  name: 'Publication',

  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState({
      publications: state => state.AccountModule.profile.publications
    })
  },

  methods: {
    ...mapActions('MainModule', ['setPopUp']),
  }
});

</script>


<style lang="scss">


</style>
