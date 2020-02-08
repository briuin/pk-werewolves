<template>
  <v-bottom-navigation horizontal app grow>
    <template v-if="isGameStarted">
      <v-btn>
        <span>{{ title }}</span>
      </v-btn>
      <v-btn v-if="time">
        <span>{{ time }}</span>
      </v-btn>
    </template>
    <template v-else>
      <v-btn color="success" v-if="!seated" dark @click="sit()">坐下</v-btn>
      <v-btn color="warning" v-if="seated" dark @click="stand()">站立</v-btn>
      <v-btn color="success" v-if="seated && !isReady" dark @click="ready()">準備</v-btn>
      <v-btn color="primary" :disabled="!isAllSeatedPlayersReady" v-if="isOwner" @click="start()">開始</v-btn>
    </template>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";

@Component({})
export default class BottomNavigation extends Vue {
  @Prop() isGameStarted!: boolean;
  public title = "";
  public time = 0;
  public seated = false;
  public seatedPlayers = [];
  public isReadyPlayers = [];
  public owner = "";

  get isOwner() {
    return this.owner === PlayerService.getName();
  }

  get isReady() {
    return this.isReadyPlayers.find(
      (x: any) => x.name === PlayerService.getName()
    );
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

  ready() {
    this.$socket.werewolves.emit("ready");
  }

  start() {
    if (!this.isAllSeatedPlayersReady) {
      return;
    }
    this.$socket.werewolves.emit("start");
  }

  protected created() {
    this.subscribeInfo();
    this.subscribePlayers();
    this.sockets.werewolves.subscribe("gamedetails", (data: any) => {
      this.owner = data.owner;
      this.seated = (data.seats || []).find(
        (x: any) => x.player.name === PlayerService.getName()
      );
    });
  }

  private subscribePlayers() {
    this.sockets.werewolves.subscribe("players", (data: any) => {
      this.seatedPlayers = data.seated;
      this.isReadyPlayers = data.ready;
    });
  }

  private subscribeInfo() {
    this.sockets.werewolves.subscribe("info", (data: any) => {
      this.title = data.title;
      this.time = data.time;
    });
  }
}
</script>

<style lang="scss" scoped>
.v-bottom-navigation button {
  max-width: inherit !important;
  &::before {
    background: none !important;
    opacity: 1;
  }
  span {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
