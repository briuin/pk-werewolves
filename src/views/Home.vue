<template>
  <v-container>
    <v-btn color="success" :disabled="isCreatingGame" dark @click="createGame()"
      >Create Game</v-btn
    >
    <GameList />
  </v-container>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import GameList from "@/components/GameList.vue";

@Component({
  components: {
    GameList
  }
})
export default class Home extends Vue {
  isCreatingGame = false;

  createGame() {
    this.isCreatingGame = true;
  }
}
</script>
