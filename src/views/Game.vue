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
              <!--<p>已準備人數：{{ isReadyPlayers.length }}</p>
              <p>坐下人數：{{ seatedPlayers.length }}</p>
              <p>旁觀人數：{{ players.length - seatedPlayers.length }}</p>-->
              <v-list>
                <v-list-group :value="true" no-action prepend-icon="account_circle">
                  <template v-slot:activator>
                    <v-list-item-title>就坐玩家</v-list-item-title>
                  </template>

                  <v-list-item v-for="(player, i) in seatedPlayers" :key="'ready' + i">
                    <v-list-item-title
                      v-text="player.name + (isReady(player.name) ? ' - 準備就緒' : '')"
                    ></v-list-item-title>
                    <v-list-item-action>
                      <v-icon v-if="player.isBot" color="red" @click="removeBot(player.name)">delete</v-icon>
                      <v-icon v-else>account_circle</v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false" no-action prepend-icon="account_circle">
                  <template v-slot:activator>
                    <v-list-item-title>旁觀玩家</v-list-item-title>
                  </template>

                  <v-list-item v-for="(player, i) in observers" :key="'ready' + i">
                    <v-list-item-title v-text="player.name"></v-list-item-title>
                    <v-list-item-action>
                      <v-icon>account_circle</v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-group>
              </v-list>
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
              <v-btn @click="$socket.werewolves.emit('addBot')">新增電腦</v-btn>
              <p v-for="(seat, i) in seatedPlayers" :key="`seat${i}`">{{ i + 1}} : {{ seat.name }}</p>
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
  players: any[] = [];
  seatedPlayers: any[] = [];
  isReadyPlayers: any[] = [];
  card: Card = new Card();
  cards: string[] = [];
  seatNo = 0;
  seated = false;

  get observers() {
    return this.players.filter(
      x => !this.seatedPlayers.find(s => s.name === x.name)
    );
  }

  get isOwner() {
    return this.owner === PlayerService.getName();
  }

  isReady(name: string) {
    return !!this.isReadyPlayers.find(x => x.name === name);
  }

  removeBot(name: string) {
    this.$socket.werewolves.emit("removeBot", { botName: name });
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
