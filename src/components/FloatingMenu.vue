<template>
  <v-card id="floating-menu">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="selectedIndex = 1">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="selectedIndex = 2">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <PlayersDetails v-if="selectedIndex === 1" @close="selectedIndex = 0" />
    <CardDetails v-if="selectedIndex === 2" @close="selectedIndex = 0" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";
import PlayersDetails from "@/components/detail-modal/Players.vue";
import CardDetails from "@/components/detail-modal/Cards.vue";

@Component({
  components: {
    PlayersDetails,
    CardDetails
  }
})
export default class GameList extends Vue {
  selectedIndex = 0;

  direction = "top";
  fab = false;
  fling = false;
  hover = false;
  tabs = null;
  top = false;
  right = true;
  bottom = true;
  left = false;
  transition = "slide-y-reverse-transition";
}
</script>

<style lang="scss" scoped>
#floating-menu .v-speed-dial {
  position: absolute;
}

#floating-menu .v-btn--floating {
  position: relative;
}
</style>
