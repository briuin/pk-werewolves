<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <v-card class="mx-auto" max-width="300" tile>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="$emit(`close`)" text>Close</v-btn>
            </v-card-actions>
            <v-list flat>
              <v-subheader>遊戲結束: {{ title }}</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(seat, i) in seats" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="seat.seatNo"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="`${seat.card} ${seat.playerName}`"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameOver extends Vue {
  @Prop({ default: [] }) seats!: any[];
  @Prop() isWinner!: boolean;
  @Prop() gameWin!: boolean;

  get title() {
    return (
      (this.isWinner ? "恭喜！" : "很遺憾！") +
      (this.gameWin ? "好人贏了" : "狼人贏了")
    );
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
