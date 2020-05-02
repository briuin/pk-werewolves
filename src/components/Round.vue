<template>
  <div>
    <PeerCard v-if="shouldShow(RoundModal.PeerCard)" :card="data.card" />
    <Wolf v-if="shouldShow(RoundModal.WolfVote)" :seats="data.seats" :wolves="data.wolves" />
    <Seer v-if="shouldShow(RoundModal.SeerCheck)" :seats="data.seats" />
    <Witch v-if="shouldShow(RoundModal.WitchWork)" :seats="data.seats" :diedSeatNo="data.diedSeatNo" :step="data.step" />
    <GameOver :seats="data.seats" :gameWin="data.gameWin" v-if="shouldShow(RoundModal.GameOver)" @close="end()" />
    <DayBreaks v-if="shouldShow(RoundModal.DayBreaks)" :diedPlayers="data.seatsNo" />
    <HunterShot v-if="shouldShow(RoundModal.HunterShot)" :seats="data.seats" />
    <DeadNotice v-if="shouldShow(RoundModal.DeadNotice)" :seatNo="data.seatNo" />
    <Opinion v-if="shouldShow(RoundModal.Opinion)" :seats="data.seats" />
    <PublicVote v-if="shouldShow(RoundModal.PublicVote)" :seats="data.seats" />
    <PublicVoteResult v-if="shouldShow(RoundModal.PublicVoteResult)" :diedSeatNos="data.diedSeatNos" :isSecondVote="data.isSecondVote" />
    <LastWord v-if="shouldShow(RoundModal.LastWord)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PeerCard from '@/components/round/PeerCard.vue';
import Wolf from '@/components/round/Wolf.vue';
import Seer from '@/components/round/Seer.vue';
import Witch from '@/components/round/Witch.vue';
import HunterShot from '@/components/round/HunterShot.vue';
import DeadNotice from '@/components/round/DeadNotice.vue';
import Opinion from '@/components/round/Opinion.vue';
import PublicVote from '@/components/round/PublicVote.vue';
import PublicVoteResult from '@/components/round/PublicVoteResult.vue';
import LastWord from '@/components/round/LastWord.vue';
import GameOver from '@/components/round/GameOver.vue';
import DayBreaks from '@/components/round/DayBreaks.vue';
import RoundService from '@/services/round';
import GameService from '@/services/game';
import { RoundModal } from '@/enums/round-modal';

@Component({
  components: {
    PeerCard,
    Wolf,
    Seer,
    Witch,
    GameOver,
    DayBreaks,
    DeadNotice,
    HunterShot,
    Opinion,
    PublicVote,
    PublicVoteResult,
    LastWord,
  },
  subscriptions() {
    return {
      isPlayerAlive: GameService.isAlive$,
    };
  },
})
export default class Round extends Vue {
  RoundModal = RoundModal;
  modal = RoundModal.Unknown;
  data: any = {};
  isPlayerAlive = true;

  shouldShow(modal: RoundModal) {
    return this.modal === modal && this.isPlayerAlive;
  }

  end() {
    RoundService.clearModal();
  }

  protected mounted() {
    RoundService.show$.subscribe((x) => {
      this.modal = x.modal;
      this.data = x.data;
    });
  }
}
</script>
