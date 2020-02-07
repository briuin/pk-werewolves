<template>
  <v-container>
    <v-layout>
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
              <p>已準備人數：{{ isReadyPlayers.length }}</p>
              <p>坐下人數：{{ seatedPlayers.length }}</p>
              <p>旁觀人數：{{ players.length - seatedPlayers.length }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-layout>
    <v-layout>
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
              <p>{{ cards.join(", ") }}</p>
              <v-btn @click="$socket.werewolves.emit('addRobot')">新增電腦</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-layout>
    <v-layout v-if="isStarted">
      <div>身份：{{ card.name }}</div>
    </v-layout>
    <v-card class="mx-auto">
      <v-toolbar v-if="false" color="cyan" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Inbox</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line>
        <template v-for="(item, index) in messages">
          <v-subheader v-if="item.header" :key="item.header + index" v-text="item.header"></v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

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
              <v-list-item-subtitle v-else v-html="`${item.message}`"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <BottomNavigation :isGameStarted="isStarted" />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";
import RoundService from "@/services/round";
import Card from "@/models/card";
import CardFactory from "@/models/card-factory";
import RoundWolf from "@/components/round/Wolf.vue";
import GameOver from "@/components/round/GameOver.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";

@Component({
  components: {
    RoundWolf,
    GameOver,
    BottomNavigation
  }
})
export default class Game extends Vue {
  id = "";
  name = "";

  messages: any[] = [];
  owner = "";
  isStarted = false;
  players = [];
  seatedPlayers: any[] = [];
  isReadyPlayers: any[] = [];
  card: Card = new Card();
  cards: string[] = [];
  seatNo = 0;
  seated = false;

  get isOwner() {
    return this.owner === PlayerService.getName();
  }

  reset() {
    this.card = new Card();
    this.cards = [];
  }

  protected created() {
    this.sockets.werewolves.subscribe("gamedetails", (data: any) => {
      if (data.error) {
        this.$router.push("/");
        return;
      }
      this.owner = data.owner;
    });
    this.sockets.werewolves.subscribe("message", (data: any) => {
      this.messages.push(
        {
          name: data.name,
          seatNo: data.seatNo,
          message: data.message
        },
        { divider: true, inset: true }
      );
    });
    this.id = this.$route.params.id;
    this.messages = [{ header: `房號 ${this.id}` }];
    this.$socket.werewolves.emit("gamedetails", { id: this.id });
    this.subscribeGameStart();
    this.subscribePlayers();
    this.subscribeRound();
    this.subscribeNewGame();
    this.subscribeCards();
  }

  private subscribeGameStart() {
    this.sockets.werewolves.subscribe("start", (data: any) => {
      this.isStarted = true;
      this.card = CardFactory.create(data.card);
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
      this.card.onRound(data.name, data);
    });
  }

  private subscribeNewGame() {
    this.sockets.werewolves.subscribe("newgame", () => {
      this.card = new Card();
    });
  }

  private subscribeCards() {
    this.sockets.werewolves.subscribe("cards", (data: any) => {
      this.cards = data.cards;
    });
  }
}
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}
</style>
