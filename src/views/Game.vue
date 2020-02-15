<template>
  <v-container>
    <div class="player-detail-mobile">
      人數： {{ isReadyPlayers.length }} / {{ seatedPlayers.length }} /
      {{ players.length - seatedPlayers.length }}
    </div>
    <v-layout class="player-detail-desktop">
      <div class="full-width">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              人數： {{ isReadyPlayers.length }} / {{ seatedPlayers.length }} /
              {{ players.length - seatedPlayers.length }}
              <template
                v-slot:actions
              >
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <PlayerDetail />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-layout>
    <v-layout class="card-detail-desktop">
      <div class="full-width">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              角色分配
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <CardDetails />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-layout>

    <Chat class="chat" />
    <FloatingMenu class="floating-menu" />
    <BottomNavigation class="bottom-navigation" />
    <JoinActionGroup class="join-action-group" />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";
import GameService from "@/services/game";
import RoundService from "@/services/round";
import Card from "@/models/card";
import CardFactory from "@/models/card-factory";
import RoundWolf from "@/components/round/Wolf.vue";
import GameOver from "@/components/round/GameOver.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import Chat from "@/components/Chat.vue";
import FloatingMenu from "@/components/FloatingMenu.vue";
import JoinActionGroup from "@/components/JoinActionGroup.vue";
import PlayerDetail from "@/components/PlayerDetail.vue";
import CardDetails from "@/components/CardDetails.vue";

@Component({
  components: {
    RoundWolf,
    GameOver,
    BottomNavigation,
    Chat,
    FloatingMenu,
    JoinActionGroup,
    PlayerDetail,
    CardDetails
  },
  subscriptions() {
    return {
      card: GameService.card$,
      isStarted: GameService.isStarted$,
      isOwner: GameService.isOwner$
    };
  }
})
export default class Game extends Vue {
  card: Card = new Card();
  players: any[] = [];
  seatedPlayers: any[] = [];

  get observers() {
    return this.players.filter(
      x => !this.seatedPlayers.find(s => s.name === x.name)
    );
  }

  get isReadyPlayers() {
    return this.seatedPlayers.filter(x => x.isReady);
  }

  isReady(name: string) {
    return !!this.isReadyPlayers.find(x => x.name === name);
  }

  protected created() {
    this.sockets.werewolves.subscribe("gamedetails", (data: any) => {
      if (data.error) {
        this.$router.push("/");
        return;
      }
      GameService.setOwner(data.owner);
      GameService.setCards(data.cards);
    });

    const id = this.$route.params.id;
    this.$socket.werewolves.emit("gamedetails", { id });
    this.subscribeGameStart();
    this.subscribePlayers();
    this.subscribeRound();
    this.subscribeNewGame();
    this.sockets.werewolves.subscribe("dead", (data: any) => {
      GameService.beKilled();
    });
    this.sockets.werewolves.subscribe("cards", (data: any) => {
      GameService.setCards(data.cards);
    });
  }

  private subscribeGameStart() {
    this.sockets.werewolves.subscribe("start", (data: any) => {
      GameService.start(data.seatNo, data.card);
    });
  }

  private subscribePlayers() {
    this.sockets.werewolves.subscribe("players", (data: any) => {
      GameService.updatePlayers({
        seatedPlayers: data.seatedPlayers,
        players: data.players
      });
      this.players = data.players;
      this.seatedPlayers = data.seatedPlayers;
    });
  }

  private subscribeRound() {
    this.sockets.werewolves.subscribe("round", (data: any) => {
      this.card.onRound(data.name, data);
    });
  }

  private subscribeNewGame() {
    this.sockets.werewolves.subscribe("newgame", () => {
      GameService.reset();
    });
  }
}
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}

.chat {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 350px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
  }
}

.floating-menu {
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    right: 10px;
    top: 80%;
    z-index: 100;
  }
}

.bottom-navigation {
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
}

.join-action-group {
  position: fixed;
  right: 10px;
  bottom: 5px;
}

.card-detail-desktop,
.player-detail-desktop {
  @media (max-width: 768px) {
    display: none;
  }
}

.player-detail-mobile {
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 60px;
    right: 5px;
    color: white;
  }
}
</style>
