<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <v-col cols="12">
            <h4>請發表遺言</h4>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-text-field
              v-model="message"
              append-outer-icon="mdi-send"
              filled
              :disabled="isSent"
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @keydown.enter.prevent.stop="sendMessage"
              @click:append-outer="sendMessage"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LastWord extends Vue {
  message = '';
  isSent = false;

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.$socket.werewolves.emit('sendlastword', { message: this.message });
    this.isSent = true;
  }

  clearMessage() {
    this.message = '';
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    width: 280px;
    background: white;
    padding: 20px 35px;
    text-align: center;
  }
}
</style>
