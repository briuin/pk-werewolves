<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <h1>狼人請殺人</h1>
        <v-row justify="center">
          <div
            class="vote-option"
            v-for="(option, index) in voteOptions"
            :key="'vote' + index"
            @click="vote(option.no)"
          >
            <v-chip v-if="isWolf(option.no)" class="ma-2" color="pink" text-color="white">
              <v-avatar left class>{{ option.no }}</v-avatar>
              {{ option.player.name }}
            </v-chip>
            <v-chip v-else class="ma-2" color="primary" text-color="primary" outlined>
              <v-avatar left>{{ option.no }}</v-avatar>
              {{ option.player.name }}
            </v-chip>
            <span>{{ getSeatVoteTexts(option.no) }}</span>
          </div>
          <v-col cols="12" class="chat-group" ref="chats">
            <p class="wolf-chat" v-for="(chat, i) in chats" :key="`chat${i}`">{{ chat }}</p>
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
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Wolf extends Vue {
  @Prop() seats!: any[];
  @Prop({ default: () => [] }) wolves!: any[];
  wolfVotes: number[] = [];
  chats = [];
  message = "";

  get voteOptions() {
    return (
      this.seats || [
        { no: 1, player: { name: "2fwafaw22" } },
        { player: { name: "222gwa" } },
        { player: { name: "22gwa2" } }
      ]
    );
  }

  get chatElement() {
    return this.$refs.chats as HTMLElement;
  }

  get wolfOptions() {
    return this.wolves || [];
  }

  getSeatVoteTexts(seatNo: number) {
    return this.wolfVotes
      .map((x, i) => ({ wolfNo: i, targetNo: x }))
      .filter(x => x.targetNo === seatNo)
      .map(x => x.wolfNo)
      .join(",");
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.$socket.werewolves.emit("sendwolftalk", { message: this.message });
    this.clearMessage();
  }

  clearMessage() {
    this.message = "";
  }

  isWolf(seatNo: number) {
    return this.wolves.find(x => x.no === seatNo);
  }

  vote(seatNo: number) {
    this.$socket.werewolves.emit("wolfvote", { seatNo });
  }

  protected created() {
    this.sockets.werewolves.subscribe("wolfvote", (data: any) => {
      this.$set(this.wolfVotes, data.wolfSeatNo, data.targetSeatNo);
    });

    this.sockets.werewolves.subscribe("wolftalk", (data: any) => {
      this.chats = data.messages;
      Vue.nextTick(() => {
        if (this.chatElement) {
          this.chatElement.scrollTop = this.chatElement.scrollHeight;
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
    max-height: 350px;
    overflow: scroll;
    width: 70%;
    background: white;
    padding: 20px 35px;
    padding-bottom: 0;
    text-align: center;
  }

  .vote-option {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 768px) {
      width: 44%;
      margin: 0 2%;
    }
  }

  .chat-group {
    height: 120px;
    overflow: scroll;
  }

  .wolf-chat {
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: left;
    padding: 3px 10px;
  }

  .vote-option,
  .vote-option .v-chip {
    cursor: pointer;
  }
}
</style>

<style lang="scss">
@media (max-width: 768px) {
  .overlay .v-chip .v-chip__content {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 2;
  }
}
</style>