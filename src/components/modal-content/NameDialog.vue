<template>
  <v-form>
    <v-container class="modal-container">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-text-field label="Your Name" outlined hide-details v-model="name" @keydown.enter="confirm()"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="ma-2" :loading="false" :disabled="false" color="info" @click="confirm()">
          Confirm
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
        <v-btn v-if="data.cancelable" class="ma-2" :loading="false" :disabled="false" color="error" @click="$emit('close')">
          Cancel
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PlayerService from '@/services/player';
import GameService from '@/services/game';

@Component({
  subscriptions() {
    return {
      isGameStarted: GameService.isStarted$,
    };
  },
})
export default class NameDialog extends Vue {
  data = {
    cancelable: false,
  };
  @Prop() options: any;
  isGameStarted = false;
  name = PlayerService.getName();
  confirm() {
    if (!this.name || this.name.length > 30) {
      return;
    }
    this.setName(this.name);
  }

  setName(name: string) {
    this.$emit('close');
    if (this.isGameStarted) {
      return;
    }
    PlayerService.setName(name);
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  max-width: 280px;
  background: white;
  padding: 20px 35px;
}

.row {
  justify-content: center;
}
</style>
