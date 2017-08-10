<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Balloon Pop
      </q-toolbar-title>
      <div>Popped: {{ poppedCount }}, Missed: {{ missedCount }}</div>
    </div>

    <balloon v-for="b in balloons" :color="b.color" :xPos="b.xPos" :yPos="b.yPos" :imgId="b.imgId" :key="b.imgId"></balloon>
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
    }
  },
  beforeDestroy () {
    window.clearInterval(this.windowInterval);
  }
}
</script>

<style lang="stylus">
</style>
