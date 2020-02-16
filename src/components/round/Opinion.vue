<template>
  <div class="overlay">
    <v-container class="modal-container">
      <v-row justify="center">
        <v-col cols="12">
          <h1>請發表言論</h1>
        </v-col>
        <v-col cols="12" class="opinion-group" ref="opinions">
          <p
            class="player-opinion"
            v-for="(opinion, i) in myOpinions"
            :key="`opinion${i}`"
          >{{opinion}}</p>
        </v-col>
        <v-col cols="12" style="padding: 0">
          <v-text-field
            v-model="message"
            append-outer-icon="mdi-send"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @keydown.enter.prevent.stop="sendMessage"
            @click:append-outer="sendMessage"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-col>
        <v-btn @click="skip()">跳過</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Opinion extends Vue {
  message = "";
  myOpinions = [];

  get opinions() {
    return this.$refs.opinions as HTMLElement;
  }

  skip() {
    this.$socket.werewolves.emit("skipopinion");
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.$socket.werewolves.emit("sendopinion", { message: this.message });
    this.clearMessage();
  }

  clearMessage() {
    this.message = "";
  }

  protected created() {
    this.sockets.werewolves.subscribe("myopinion", (data: any) => {
      this.myOpinions = data.messages;
      Vue.nextTick(() => {
        if (this.opinions) {
          this.opinions.scrollTop = this.opinions.scrollHeight;
        }
      });
    });
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
    min-width: 280px;
    width: 70%;
    max-height: 350px;
    background: white;
    padding: 20px 35px;
    text-align: center;
  }

  .opinion-group {
    height: 120px;
    overflow: scroll;
  }

  .player-opinion {
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: left;
    padding: 3px 10px;
  }
}
</style>
