// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`);
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

import Vue from 'vue';
import Quasar from 'quasar';
import router from './router';
import Vuex from 'vuex';

Vue.use(Quasar); // Install Quasar Framework
Vue.use(Vuex);

const colors = ['#0000FF', '#FF0000', '#00FF00', '#DDDD00', '#FFAA00'];

class FilterArray extends Array {
  removeIf (expression) {
    const res = [];
    for (let idx = 0; idx < this.length; idx++) {
      const currentItem = this[idx];
      if (!expression(currentItem)) {
        res.push(currentItem);
      }
    }
    return res;
  };
}

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

const store = new Vuex.Store({
  state: {
    popped: 0,
    missed: 0,
    pHeight: 0,
    pWidth: 0,
    maxBalloons: 15,
    balloons: new FilterArray(),
    balloonSize: 70,
    newBalloonChance: 4,
    adjustment: 6,
    interval: 32 // Interval at which the balloon height is incremented by `adjustment`
  },
  mutations: {
    newBalloon (state) {
      state.balloons.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        imgId: guid(),
        xPos: Math.round(Math.random() * document.body.clientWidth),
        yPos: document.body.clientHeight
      });
    },
    floatUp (state) {
      state.balloons.forEach((b) => {
        b.yPos -= state.adjustment;
      });
      const holder = state.balloons;
      state.balloons = holder.filter((b) => {
        const maxRise = (0 - (state.balloonSize * 2));
        if (b.yPos < maxRise) {
          state.missed++;
          return false;
        } else {
          return true;
        }
      });
    },
    popBalloon (state, imgId) {
      const holder = state.balloons;
      state.popped += 1;
      state.balloons = holder.filter((b) => {
        return b.imgId !== imgId;
      });
    }
  },
  strict: true
});

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App'))
  });
});
