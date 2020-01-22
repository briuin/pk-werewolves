<template>
  <v-container>
    <v-layout>
      <div class="game-menu">
        <v-btn
          color="success"
          :disabled="isCreatingGame"
          dark
          @click="createGame()"
          >新遊戲</v-btn
        >
        <v-btn
          color="error"
          :disabled="isCreatingGame"
          dark
          @click="backToGame()"
          v-if="joinedGame"
          >回到遊戲</v-btn
        >
      </div>
    </v-layout>
    <GameList :games="games" />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameList from "@/components/GameList.vue";
import PlayerService from "@/services/player";

@Component({
  components: {
    GameList
  }
})
export default class Home extends Vue {
  isCreatingGame = false;
  playerName = "";
  games: any[] = [];

  get joinedGame() {
    return this.games.find(x =>
      x.players.find((y: any) => y.name === this.playerName)
    );
  }

  backToGame() {
    this.$router.push(`/game/${this.joinedGame.id}`);
  }

  createGame() {
    this.isCreatingGame = true;
    this.$socket.werewolves.emit("create", {
      playerName: this.playerName
    });
    this.isCreatingGame = false;
  }

  protected created() {
    PlayerService.name$.subscribe(x => (this.playerName = x));

    this.sockets.werewolves.subscribe("games", (games: any) => {
      this.games = games;
    });

    this.sockets.werewolves.subscribe("goto", (gameId: any) => {
      this.$router.push(`/game/${gameId}`);
    });
    this.$socket.werewolves.emit("getGames");
  }
}
</script>

<style lang="scss" scoped>
.game-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
