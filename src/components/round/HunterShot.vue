<template>
  <div class="overlay" v-if="!selectedNo">
    <v-container class="modal-container">
      <v-row justify="center">
        <v-col cols="12">
          <h1>獵人請射殺</h1>
        </v-col>
        <br />
        <v-col cols="12" style="padding: 0px;">
          <div
            class="option"
            :class="{ selected: selectedNo === seat.no }"
            v-for="(seat, i) in seats"
            :key="`seat${i}`"
            @click="shot(seat.no)"
          >
            <SeatChip :no="seat.no" :name="seat.name" />
          </div>
        </v-col>
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
export default class HunterShot extends Vue {
  @Prop({ default: () => [] }) seats!: any[];
  selectedNo = 0;

  shot(seatNo: number) {
    if (this.selectedNo) {
      return;
    }
    this.selectedNo = seatNo;
    this.$socket.werewolves.emit("huntershot", { seatNo });
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

  .selected {
    opacity: 0.6;
  }

  .option {
    display: inline-flex;
  }

  .option,
  .option .v-chip {
    cursor: pointer;
  }
}
</style>
