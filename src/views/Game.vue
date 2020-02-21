<template>
  <v-container>
    <div class="card-detail-mobile">
      <v-badge
        inline
        :content="x.no || i + 1"
        color="transparent"
        bordered
        :class="{ died: !x.isAlive }"
        v-for="(x, i) in seats"
        :key="`icon${x.no || i + 1}`"
      ></v-badge>
    </div>
    <div class="player-detail-mobile">
      人數： {{ isReadyPlayers.length }} / {{ seatedPlayers.length }} /
      {{ players.length - seatedPlayers.length }}
    </div>
    <div class="player-detail-desktop">
      <div class="count-title">
        人數： {{ isReadyPlayers.length }} / {{ seatedPlayers.length }} /
        {{ players.length - seatedPlayers.length }}
      </div>
      <div class="player-group">
        <h5>就坐玩家 ({{ seats.length }})</h5>
        <div class="player">
          <span v-for="seat in seats" :key="`seat${seat.name}`">
            <v-chip
              class="ma-1"
              :close="seat.isBot && !isStarted"
              :color="isStarted && !seat.isAlive ? 'red' : '#00BFFF'"
              outlined
              @click:close="$socket.werewolves.emit('removeBot', { botName: seat.name })"
            >
              <v-avatar left v-if="seat.no">{{ seat.no }}</v-avatar>
              {{ seat.name }}
            </v-chip>
          </span>
        </div>
      </div>
      <div class="player-group">
        <h5>旁觀玩家 ({{ observers.length }})</h5>
        <div class="player">
          <span v-for="player in observers" :key="`observer${player.name}`">
            <v-chip class="ma-1" color="#5F9EA0" outlined>{{ player.name }}</v-chip>
          </span>
        </div>
      </div>
    </div>
    <div class="card-detail-desktop">
      <CardDetails dark />
    </div>
    <v-layout v-if="false" class="card-detail-desktop">
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
      isOwner: GameService.isOwner$,
      seats: GameService.seats$,
      players: GameService.players$
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
      if (data.isStarted) {
        GameService.start();
      }
      GameService.peerCard(data.seatNo, data.card);
      GameService.setOwner(data.owner);
      GameService.setCards(data.cards);
    });

    const id = this.$route.params.id;
    this.$socket.werewolves.emit("gamedetails", {
      id,
      playerName: PlayerService.getName()
    });
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
    this.sockets.werewolves.subscribe("peercard", (data: any) => {
      GameService.peerCard(data.seatNo, data.card);
    });

    this.sockets.werewolves.subscribe("start", (data: any) => {
      GameService.start();
    });
  }

  private subscribePlayers() {
    this.sockets.werewolves.subscribe("players", (data: any) => {
      GameService.updatePlayers({
        seatedPlayers: data.seatedPlayers,
        players: data.players
      });
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
  @media (max-width: 768px) {
    display: none;
  }
}

.card-detail-desktop {
  position: fixed;
  top: 75px;
  left: 15px;
  width: 350px;
  @media (max-width: 768px) {
    display: none;
  }
}

.player-detail-desktop {
  position: fixed;
  right: 15px;
  top: 75px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .player-group {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .player {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
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

.card-detail-mobile {
  display: none;
  @media (max-width: 768px) {
    width: 150px;
    flex-wrap: wrap;
    > * {
      flex-basis: 15%;
      margin: 3% 0;
      margin-right: auto;
    }
    display: flex;
    position: fixed;
    top: 60px;
    left: 5px;
    color: white;
  }
}
</style>

<style lang="scss">
.card-detail-mobile {
  @media (max-width: 768px) {
    .v-badge__badge {
      color: #00bfff;
      &::after {
        border-color: hsl(195, 100%, 50%) !important;
      }
    }

    .died {
      .v-badge__badge {
        color: red;
        &::after {
          border-color: red !important;
        }
      }
    }
  }
}
</style>
