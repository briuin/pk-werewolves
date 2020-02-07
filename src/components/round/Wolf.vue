<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <div class="vote-option" v-for="(option, index) in voteOptions" :key="'vote' + index">
            <span
              class="seat-no"
              :class="{
                wolf: isWolf(index + 1)
              }"
              @click="vote(index + 1)"
            >{{ index + 1 }}</span>
            <span>{{ getSeatVoteTexts(index + 1) }}</span>
          </div>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Wolf extends Vue {
  @Prop() seats!: any[];
  @Prop({ default: [] }) wolves!: any[];
  wolfVotes: number[] = [];

  get voteOptions() {
    return this.seats || [];
  }

  get wolfOptions() {
    return this.wolves || [];
  }

  getSeatVoteTexts(seatNo: number) {
    return this.wolfVotes
      .map((x, i) => ({ wolfNo: i, targetNo: x }))
      .filter(x => x.targetNo === seatNo)
      .map(x => x.wolfNo)
      .join(",");
  }

  isWolf(seatNo: number) {
    return this.wolves.find(x => x.seatNo === seatNo);
  }

  vote(seatNo: number) {
    this.$socket.werewolves.emit("wolfvote", { seatNo });
  }

  protected created() {
    this.sockets.werewolves.subscribe("wolfvote", (data: any) => {
      this.$set(this.wolfVotes, data.wolfSeatNo, data.targetSeatNo);
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
    max-width: 280px;
    background: white;
    padding: 20px 35px;
  }

  .vote-option {
    height: 60px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .seat-no {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      border: 1px solid black;
      cursor: pointer;
    }
  }

  .wolf {
    background: red;
    color: white;
  }
}
</style>
