<template>
  <div>
    <Wolf v-if="shouldShow(RoundModal.WolfVote)" :seats="data.seats" :wolves="data.wolves" />
    <GameOver
      :seats="data.seats"
      :isWinner="data.isWinner"
      :gameWin="data.gameWin"
      v-if="shouldShow(RoundModal.GameOver)"
      @close="end()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Wolf from "@/components/round/Wolf.vue";
import GameOver from "@/components/round/GameOver.vue";
import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

@Component({
  components: {
    Wolf,
    GameOver
  }
})
export default class Round extends Vue {
  RoundModal = RoundModal;
  modal = RoundModal.Unknown;
  data: any = {};

  shouldShow(modal: RoundModal) {
    return this.modal === modal;
  }

  end() {
    RoundService.clearModal();
  }

  protected mounted() {
    RoundService.show$.subscribe(x => {
      this.modal = x.modal;
      this.data = x.data;
    });
  }
}
</script>
