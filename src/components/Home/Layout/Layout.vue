<template>
  <div class="main__layout">
    <div
      v-if="getIsLoading"
      class="main__loading"
    >
      <img
        src="../../../assets/img/preloader.png"
        alt="preloader"
      >
      <P>Подождите, загружается...</P>
    </div>
    <div
      v-for="(item, itIndex) in getLayoutElements"
      :id="'main__line--' + itIndex.substr(-1, 1)"
      :key="itIndex.substr(-1, 1)"
      class="main__line"
    >
      <div
        v-for="(el, elIndex) in item"
        :key="elIndex"
        class="main__item"
        :style="{maxWidth: (el.w / 16) + 'rem', height: (el.h / 16) + 'rem', marginBottom: defineMb(elIndex, item, el)}"
      >
        <img
          :key="elIndex"
          loading="lazy"
          :src="el.pictureSrc"
          alt="pict"
          @click="showPopUp"
        >
        <div class="main__stats">
          <h5>
            {{ getRandomName() }}
          </h5>
          <img
            loading="lazy"
            :src="getRandomBool()"
            alt="heartSvg"
            @click="like"
          >
        </div>
        <div class="main__author">
          <img
            loading="lazy"
            :src="el.avatarSrc"
            alt="Avatar"
            @click="showPopUp"
          >
          <p>{{ getRandomUserName() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

import Vue from 'vue';
import {mapActions, mapGetters, mapState} from 'vuex';

export default Vue.extend({
  name: 'Layout',

  computed: {
    ...mapState('MainModule', ['isPopUpLayout', 'popSrc']),
    ...mapGetters('MainModule', ['getLayoutElements', 'getPictureNames',
      'getUsernames', 'getIsLiked', 'getIsLoading']),
  },

  mounted() {
    this.GetLayout();
  },

  methods: {
    ...mapActions('MainModule', ['GetLayout', 'setLiked', 'setPopUp']),
    getRandomName() {
      const random = Math.trunc(Math.random() * 10);
      return this.getPictureNames[random];
    },
    getRandomUserName() {
      const random = Math.trunc(Math.random() * 19);
      return this.getUsernames[random];
    },
    getRandomBool() {
      if (Math.floor(Math.random() * 2) === 1) {
        return require('../../../assets/img/liked.svg');
      } else {
        return require('../../../assets/img/heart.svg');
      }
    },
    showPopUp() {
      let target = event.target;
      document.querySelector('body').style.overflow = 'hidden';
      this.setPopUp({isPopUp: true, popSrc: target.src});
    },
    like() {
      let target = event.target;
      if (RegExp('\\b' + 'liked' + '\\b').test(target.src)) {
        return target.src = require('../../../assets/img/heart.svg');
      } else {
        return target.src = require('../../../assets/img/liked.svg');
      }
    },
    defineMb(elIndex, item, el) {
      if (elIndex !== item.length - 1) {
        return el.mb / 16 + 'rem';
      } else {
        return '5rem';
      }
    }
  }
});


</script>

<style scoped lang="scss">
@use "../../../scss/util/functions" as f;
@use "../../../scss/util/breakpoints" as b;

.main {

  &__layout {
    display: flex;
    justify-content: center;
    margin: f.rem(10) f.rem(10);
    gap: f.rem(10);
  }


  &__line {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: f.rem(5000);
  }

  &__item {
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: f.rem(16);
      object-fit: cover;
      cursor: pointer;
    }

    @include b.breakpoint-down(sm) {
      max-width: f.rem(500) !important;
    }
  }

  &__stats {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h5 {
      margin: f.rem(8) f.rem(10) 0 f.rem(10);
    }

    img {
      width: f.rem(30);
      height: f.rem(30);
      margin-right: f.rem(4);
    }

    @include b.breakpoint-down(sm) {
      img {
        width: f.rem(40) !important;
        height: f.rem(40) !important;
      }
    }
  }


  &__author {
    display: inline-flex;
    align-items: center;
    margin: f.rem(8) f.rem(10) 0 f.rem(10);

    img {
      width: f.rem(34);
      height: f.rem(34);
      border-radius: f.rem(20);
    }

    p {
      margin-right: f.rem(8);
    }
  }

  &__loading {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .9);

    p {
      margin-left: f.rem(10);
      color: white;
    }


    img {
      width: f.rem(90);
      height: f.rem(90);
    }

  }
}

body.modal-open {
  overflow-y: hidden;
}

</style>
