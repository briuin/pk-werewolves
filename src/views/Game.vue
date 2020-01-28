<template>
  <v-container>
    <v-layout>
      <div v-if="!isStarted">
        <v-btn color="success" v-if="!seated" dark @click="sit()">坐下</v-btn>
        <v-btn color="warning" v-if="seated" dark @click="stand()">站立</v-btn>
        <v-btn color="success" v-if="seated && !isReady" dark @click="ready()"
          >準備</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!isAllSeatedPlayersReady"
          v-if="isOwner"
          @click="start()"
          >開始</v-btn
        >
      </div>
    </v-layout>
    <v-layout>
      <div class="full-width">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              人數： {{ isReadyPlayers.length }} / {{ seatedPlayers.length }} /
              {{ players.length - seatedPlayers.length }}
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>已準備人數：{{ isReadyPlayers.length }}</p>
              <p>坐下人數：{{ seatedPlayers.length }}</p>
              <p>旁觀人數：{{ players.length - seatedPlayers.length }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-layout>
    <v-layout v-if="isStarted">
      <div>身份：{{ card }}</div>
    </v-layout>
    <v-card max-width="900" class="mx-auto">
      <v-toolbar v-if="false" color="cyan" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Inbox</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header + index"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.name + index">
            <v-list-item-avatar>
              <v-img src="@/assets/question-people.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-if="item.seatNo"
                v-html="
                  `<span class='text--primary'>${item.seatNo}號</span> &mdash; ${item.message}`
                "
              ></v-list-item-subtitle>
              <v-list-item-subtitle
                v-else
                v-html="`${item.message}`"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-bottom-navigation horizontal app>
      <template>
        <v-btn>
          <span>{{ title }}</span>
        </v-btn>
        <v-btn v-if="time">
          <span>{{ time }}</span>
        </v-btn>
      </template>
    </v-bottom-navigation>
    <RoundWolf v-if="showRoundWolf" :seats="seatedPlayers" :wolves="wolves" />
    <GameOver
      :seats="result.seats"
      :isWinner="result.isWinner"
      :gameWin="result.gameWin"
      v-if="result"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";
import { Card } from "@/enums/card";
import RoundWolf from "@/components/round/Wolf.vue";
import GameOver from "@/components/round/GameOver.vue";

@Component({
  components: {
    RoundWolf,
    GameOver
  }
})
export default class Game extends Vue {
  id = "";
  name = "";

  items: any[] = [];
  seated = false;
  owner = "";
  isStarted = false;
  players = [];
  seatedPlayers: any[] = [];
  isReadyPlayers: any[] = [];
  card: Card = Card.Unknown;
  showRoundWolf = false;
  wolves: any[] = [];
  title = "";
  time = 0;
  result: any = null;
  seatNo = 0;

  get isOwner() {
    return this.owner === PlayerService.getName();
  }

  get isReady() {
    return this.isReadyPlayers.find(x => x.name === PlayerService.getName());
  }

  get isAllSeatedPlayersReady() {
    return (
      this.isReadyPlayers.length == this.seatedPlayers.length &&
      this.seatedPlayers.length > 0
    );
  }

  sit() {
    this.$socket.werewolves.emit("sit");
    this.seated = true;
  }

  stand() {
    this.$socket.werewolves.emit("stand");
    this.seated = false;
  }

  start() {
    if (!this.isAllSeatedPlayersReady) {
      return;
    }
    this.$socket.werewolves.emit("start");
  }

  ready() {
    this.$socket.werewolves.emit("ready");
  }

  protected created() {
    this.sockets.werewolves.subscribe("gamedetails", (data: any) => {
      if (data.error) {
        this.$router.push("/");
        return;
      }
      this.owner = data.owner;
      this.seated = data.seats.find(
        (x: any) => x.player.name === PlayerService.getName()
      );
    });
    this.sockets.werewolves.subscribe("message", (data: any) => {
      console.log("message", data);
      this.items.push(
        {
          name: data.name,
          seatNo: data.seatNo,
          message: data.message
        },
        { divider: true, inset: true }
      );
    });
    this.id = this.$route.params.id;
    this.items = [{ header: `房號 ${this.id}` }];
    this.$socket.werewolves.emit("gamedetails", { id: this.id });
    this.subscribeGameStart();
    this.subscribePlayers();
    this.subscribeRound();
    this.subscribeInfo();
    this.subscribeGameOver();
  }

  private subscribeGameStart() {
    this.sockets.werewolves.subscribe("start", (data: any) => {
      this.isStarted = true;
      this.card = data.card;
      this.seatNo = data.seatNo;
    });
  }

  private subscribePlayers() {
    this.sockets.werewolves.subscribe("players", (data: any) => {
      this.players = data.players;
      this.seatedPlayers = data.seated;
      this.isReadyPlayers = data.ready;
    });
  }

  private subscribeRound() {
    this.sockets.werewolves.subscribe("round", (data: any) => {
      if (data.target === "wolf") {
        if (this.card === Card.Wolf) {
          this.wolves = data.wolves || [];
          this.showRoundWolf = true;
        }
      } else {
        this.showRoundWolf = false;
      }
    });
  }

  private subscribeInfo() {
    this.sockets.werewolves.subscribe("info", (data: any) => {
      this.title = data.title;
      this.time = data.time;
    });
  }

  private subscribeGameOver() {
    this.sockets.werewolves.subscribe("gameover", (data: any) => {
      console.log(this.seatNo);
      this.result = {
        seats: data.seats,
        gameWin: data.gameWin,
        isWinner: !!data.winners.find((x: any) => x === this.seatNo)
      };
    });
  }
}
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}

.v-bottom-navigation button {
  &::before {
    background: none !important;
    opacity: 1;
  }
  span {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
