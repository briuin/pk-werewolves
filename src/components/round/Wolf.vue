<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <div
            class="vote-option"
            v-for="(option, index) in voteOptions"
            :key="'vote' + index"
            @click="vote(option.no)"
          >
            <v-chip v-if="isWolf(option.no)" class="ma-2" color="pink" text-color="white">
              <v-avatar left class>{{ option.no }}</v-avatar>
              {{ option.player.name }}
            </v-chip>
            <v-chip v-else class="ma-2" color="primary" text-color="primary" outlined>
              <v-avatar left>{{ option.no }}</v-avatar>
              {{ option.player.name }}
            </v-chip>
            <span>{{ getSeatVoteTexts(option.no) }}</span>
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
  @Prop({ default: () => [] }) wolves!: any[];
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
    return this.wolves.find(x => x.no === seatNo);
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .vote-option,
  .vote-option .v-chip {
    cursor: pointer;
  }
}
</style>
