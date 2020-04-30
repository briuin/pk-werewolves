<template>
  <v-container>
    <v-layout>
      <div class="game-menu">
        <v-btn color="success" :disabled="isCreatingGame" dark @click="createGame()">新遊戲</v-btn>
        <v-btn color="error" :disabled="isCreatingGame" dark @click="backToGame()" v-if="joinedGame">回到遊戲</v-btn>
      </div>
    </v-layout>
    <GameList :games="games" :joinedGame="joinedGame" />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameList from '@/components/GameList.vue';
import PlayerService from '@/services/player';
import GameService from '@/services/game';
import { tap } from 'rxjs/operators';

@Component({
  components: {
    GameList,
  },
  subscriptions() {
    return {
      playerName: PlayerService.name$,
      games: GameService.games$,
    };
  },
})
export default class Home extends Vue {
  isCreatingGame = false;
  playerName = '';
  games: any[] = [];

  get joinedGame() {
    return this.games.find((x) => x.players.find((y: any) => y.name === this.playerName));
  }

  backToGame() {
    this.$router.push(`/game/${this.joinedGame.id}`);
  }

  createGame() {
    this.isCreatingGame = true;
    this.$socket.werewolves.emit('create', {
      playerName: this.playerName,
    });
    this.isCreatingGame = false;
  }

  protected created() {
    this.$socket.werewolves.emit('getGames');
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
