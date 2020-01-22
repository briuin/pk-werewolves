<template>
  <v-container>
    <v-layout>
      <div>
        <v-btn color="success" v-if="!seated" dark @click="sit()">坐下</v-btn>
        <v-btn color="warning" v-if="seated" dark @click="stand()">站立</v-btn>
        <v-btn color="primary" v-if="isOwner" dark @click="start()">開始</v-btn>
      </div>
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
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";

@Component
export default class Game extends Vue {
  id = "";
  name = "";

  items: any[] = [];
  seated = false;
  owner = "";

  get isOwner() {
    return this.owner === PlayerService.getName();
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
    this.$socket.werewolves.emit("start");
  }

  protected created() {
    this.sockets.werewolves.subscribe("gamedetails", (data: any) => {
      this.owner = data.owner;
    });
    this.sockets.werewolves.subscribe("message", (data: any) => {
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
  }
}
</script>
