<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">房號</th>
          <th class="text-left">房主</th>
          <th class="text-left">總人數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.id }}</td>
          <td>{{ game.totalPlayerCount }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameList extends Vue {
  games = [];
  protected created() {
    this.games = this.sockets.werewolves.subscribe("games", (games: any) => {
      console.log(games);
    });
  }
}
</script>
