<template>
  <v-bottom-navigation horizontal app grow :class="{ 'move-front': isGameStarted }">
    <template v-if="isGameStarted">
      <v-btn>
        <span>{{ $t(`game.title.${title}`) }}</span>
      </v-btn>
      <v-btn v-if="time">
        <span>{{ time }}</span>
      </v-btn>
    </template>
    <template v-else>
      <Sit />
      <Stand />
      <Ready />
      <Start />
    </template>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PlayerService from '@/services/player';
import GameService from '@/services/game';
import Sit from '@/components/join-action-group/Sit.vue';
import Stand from '@/components/join-action-group/Stand.vue';
import Ready from '@/components/join-action-group/Ready.vue';
import Start from '@/components/join-action-group/Start.vue';

@Component({
  components: {
    Sit,
    Stand,
    Ready,
    Start,
  },
  subscriptions() {
    return {
      isGameStarted: GameService.isStarted$,
      title: GameService.title$,
      time: GameService.time$,
    };
  },
})
export default class BottomNavigation extends Vue {
  public title = '';
  public time = 0;
}
</script>

<style lang="scss" scoped>
.move-front {
  z-index: 5000;
}
.v-bottom-navigation button {
  max-width: inherit !important;
  &::before {
    background: none !important;
    opacity: 1;
  }
  span {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
