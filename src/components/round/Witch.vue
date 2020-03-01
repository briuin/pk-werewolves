<template>
  <div class="overlay">
    <v-container class="modal-container">
      <v-row justify="center" v-if="step === 'save'">
        <v-col cols="12">
          <h1>{{ diedSeatNo }}號死了，女巫要救他嗎？</h1>
        </v-col>
        <v-col class="save-option">
          <v-btn @click="save(true)">救</v-btn>
          <v-btn @click="save(false)">不救</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="step === 'poison'">
        <v-col cols="12">
          <h1>女巫要使用毒藥嗎？ 你要毒誰呢？</h1>
        </v-col>
        <br />
        <div
          class="option"
          :class="{ selected: selectedNo === seat.no }"
          v-for="(seat, i) in seats"
          :key="`seat${i}`"
          @click="poison(seat.no)"
        >
          <SeatChip :no="seat.no" :name="seat.name" />
        </div>
        <div class="option" :class="{ selected: skipped }" @click="skip()">
          <SeatChip name="跳過" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SeatChip from "@/components/ui/SeatChip.vue";

@Component({
  components: {
    SeatChip
  }
})
export default class Witch extends Vue {
  @Prop({ default: () => [] }) seats!: any[];
  @Prop() step!: string;
  @Prop() diedSeatNo!: number;
  selectedNo = 0;
  saved = false;
  skipped = false;

  save(willSave: boolean) {
    if (this.saved) {
      return;
    }
    this.saved;
    this.$socket.werewolves.emit("witchsave", { willSave });
  }

  poison(seatNo: number) {
    if (this.selectedNo || this.skipped) {
      return;
    }
    this.selectedNo = seatNo;
    this.$socket.werewolves.emit("witchpoison", { seatNo });
  }

  skip() {
    if (this.selectedNo || this.skipped) {
      return;
    }
    this.skipped = true;
    this.$socket.werewolves.emit("witchskip");
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    min-width: 280px;
    width: 70%;
    max-height: 350px;
    overflow: scroll;
    background: white;
    padding: 20px 35px;
    text-align: center;
  }

  .save-option {
    width: 280px;
    max-width: 280px;
    display: flex;
    justify-content: space-around;
  }

  .selected {
    opacity: 0.6;
  }

  .option,
  .option .v-chip {
    cursor: pointer;
  }
}
</style>
