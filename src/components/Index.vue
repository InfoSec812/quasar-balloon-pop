<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Balloon Pop
      </q-toolbar-title>
      <div>Popped: {{ poppedCount }}, Missed: {{ missedCount }}</div>
    </div>

    <balloon v-for="b in balloons" :color="b.color" :xPos="b.xPos" :yPos="b.yPos" :imgId="b.imgId" :key="b.imgId"></balloon>
    <div id="stats">
      {{ clientWidth }}<br />
      {{ clientHeight }}<br />
    </div>
  </q-layout>
</template>

<script>
function load (component) {
  return () => System.import(`components/${component}.vue`);
}

export default {
  components: {
    'balloon': load('Balloon')
  },
  data () {
    return {
      windowInterval: null
    }
  },
  mounted () {
    this.windowInterval = window.setInterval(() => {
      if ((Math.random() * 100) < this.$store.state.newBalloonChance) {
        if (this.$store.state.balloons.length < this.$store.state.maxBalloons) {
          this.$store.commit('newBalloon');
        }
      }

      this.$store.commit('floatUp');
      this.$store.commit('updateDocSize');
    }, this.$store.state.interval);
  },
  computed: {
    balloons () {
      return this.$store.state.balloons;
    },
    poppedCount () {
      return this.$store.state.popped;
    },
    missedCount () {
      return this.$store.state.missed;
    },
    clientWidth () {
      return this.$store.state.clientWidth;
    },
    clientHeight () {
      return this.$store.state.clientHeight;
    }
  },
  beforeDestroy () {
    window.clearInterval(this.windowInterval);
  }
}
</script>
<style lang="stylus">
#stats {
  position: absolute;
  bottom: 20px;
  right: 50%;
}
</style>
