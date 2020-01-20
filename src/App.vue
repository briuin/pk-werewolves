<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span @click="goToHome()">狼人殺</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="showCancelableDialog()" text>
        <span class="mr-2">{{ playerName }}</span>
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <NameDialog
      :options="nameDialogOptions"
      @confirm="setName($event)"
      @cancel="showNameDialog = false"
      v-if="showNameDialog"
    />
  </v-app>
</template>

<script lang="ts">
import NameDialog from "@/components/NameDialog.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    NameDialog
  }
})
export default class App extends Vue {
  playerName = localStorage.getItem("werewolvesname");
  showNameDialog = !this.playerName;
  nameDialogOptions = {
    cancelable: false
  };

  setName(name: string) {
    localStorage.setItem("werewolvesname", name);
    this.playerName = name;
    this.showNameDialog = false;
  }

  showCancelableDialog() {
    this.nameDialogOptions.cancelable = true;
    this.showNameDialog = true;
  }

  goToHome() {
    if (this.$route.path === "/") {
      return;
    }
    this.$router.push("/");
  }
}
</script>
