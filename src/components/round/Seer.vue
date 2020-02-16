<template>
  <div class="overlay">
    <v-container class="modal-container">
      <v-row justify="center">
        <v-col cols="12">
          <h1>預言家請查驗</h1>
        </v-col>
        <br />
        <div
          class="option"
          :class="{ selected: selectedNo === seat.no }"
          v-for="(seat, i) in seats"
          :key="`seat${i}`"
          @click="check(seat.no)"
        >
          <v-chip class="ma-2" color="primary" text-color="primary" outlined>
            <v-avatar left class>{{ seat.no }}</v-avatar>
            {{ seat.player.name }}
          </v-chip>
        </div>
        <v-col cols="12">{{ result }}</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PublicVote extends Vue {
  @Prop({ default: [] }) seats!: any[];
  text = "seer check";
  selectedNo = -1;
  result = "";

  check(seatNo: number) {
    if (this.selectedNo !== -1) {
      return;
    }
    this.selectedNo = seatNo;
    this.$socket.werewolves.emit("seercheck", { seatNo });
  }

  protected created() {
    this.sockets.werewolves.subscribe("seercheckresult", (data: any) => {
      this.result = data.result === "good" ? "好人" : "壞人";
    });
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

  .option,
  .option .v-chip {
    cursor: pointer;
  }
}
</style>
