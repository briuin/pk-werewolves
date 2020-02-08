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
    <DayBreaks v-if="shouldShow(RoundModal.DayBreaks)" :diedPlayers="data.seatsNo" />
    <Opinion v-if="shouldShow(RoundModal.Opinion)" />
    <PublicVote v-if="shouldShow(RoundModal.PublicVote)" :seats="data.seats" />
    <PublicVoteResult v-if="shouldShow(RoundModal.PublicVoteResult)" :diedSeatNo="data.diedSeatNo" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Wolf from "@/components/round/Wolf.vue";
import Opinion from "@/components/round/Opinion.vue";
import PublicVote from "@/components/round/PublicVote.vue";
import PublicVoteResult from "@/components/round/PublicVoteResult.vue";
import GameOver from "@/components/round/GameOver.vue";
import DayBreaks from "@/components/round/DayBreaks.vue";
import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

@Component({
  components: {
    Wolf,
    GameOver,
    DayBreaks,
    Opinion,
    PublicVote,
    PublicVoteResult
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
