<template>
  <div class="action-group" :class="{ 'move-front': isGameStarted }">
    <template v-if="!isGameStarted">
      <Sit />
      <Stand />
      <Ready />
      <Start />
    </template>
    <div v-else class="round-info">
      <div>{{ title }}</div>
      <div>{{ time }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Sit from "@/components/join-action-group/Sit.vue";
import Stand from "@/components/join-action-group/Stand.vue";
import Ready from "@/components/join-action-group/Ready.vue";
import Start from "@/components/join-action-group/Start.vue";
import GameService from "@/services/game";

@Component({
  components: {
    Sit,
    Stand,
    Ready,
    Start
  },
  subscriptions() {
    return {
      isGameStarted: GameService.isStarted$
    };
  }
})
export default class JoinActionGroup extends Vue {
  title = "";
  time = 0;

  protected created() {
    this.subscribeInfo();
  }

  private subscribeInfo() {
    this.sockets.werewolves.subscribe("info", (data: any) => {
      this.title = data.title;
      this.time = data.time;
    });
  }
}
</script>

<style lang="scss" scoped>
.action-group {
  > * {
    margin: 0px 5px;
  }

  .round-info {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    width: 180px;
  }
}

.move-front {
  z-index: 5000;
}
</style>
