<template>
  <div class="overlay">
    <v-container class="modal-container">
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="mx-auto" tile>
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
                    <v-list-item-title
                      v-text="`${seat.seatNo}號 ${getCardText(seat.card)} ${seat.playerName}`"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameOver extends Vue {
  @Prop({ default: [] }) seats!: any[];
  @Prop() gameWin!: boolean;

  get title() {
    return this.gameWin ? "好人贏了" : "狼人贏了";
  }

  getCardText(text: string) {
    switch (text) {
      case "wolf":
        return "狼人";
      case "folk":
        return "平民";
      case "seer":
        return "預言家";
      case "witch":
        return "女巫";
      default:
        return "";
    }
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
    max-height: 350px;
    overflow: scroll;
    width: 70%;
    background: white;
    padding: 20px 35px;
    text-align: center;
  }
}
</style>
