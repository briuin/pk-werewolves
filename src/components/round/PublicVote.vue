<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <v-card class="mx-auto" max-width="300" tile>
            {{ text }}
            <br />
            <v-btn
              :color="seat.isAlive ? 'primary' : 'error'"
              v-for="(seat, i) in seats"
              :key="`seat${i}`"
              @click="vote(i + 1)"
            >{{ i + 1 }}</v-btn>
          </v-card>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PublicVote extends Vue {
  @Prop({ default: [] }) seats!: any[];
  text = "public vote";

  vote(seatNo: number) {
    this.$socket.werewolves.emit("publicvote", { seatNo });
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
}
</style>
