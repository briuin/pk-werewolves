<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <h1>狼人請殺人</h1>
        <span class="description">
          <span></span>是狼人
        </span>
        <v-row justify="center">
          <v-col cols="12" class="vote-group">
            <div
              class="vote-option"
              v-for="(option, index) in voteOptions"
              :key="'vote' + index"
              @click="vote(option.no)"
            >
              <SeatChip :no="option.no" :name="option.player.name" :wolf="isWolf(option.no)" />
              <span>{{ getSeatVoteTexts(option.no) }}</span>
            </div>
          </v-col>
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
import SeatChip from "@/components/ui/SeatChip.vue";

@Component({
  components: {
    SeatChip
  }
})
export default class Wolf extends Vue {
  @Prop() seats!: any[];
  @Prop({ default: () => [] }) wolves!: any[];
  wolfVotes: number[] = [];
  chats = [];
  message = "";

  get voteOptions() {
    return this.seats || [];
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
    return this.wolves.find(x => x.no === seatNo) || seatNo === 1;
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
    max-height: 430px;
    width: 70%;
    background: white;
    padding: 20px 35px;
    padding-bottom: 0;
    text-align: center;
  }

  .description {
    span {
      height: 12px;
      width: 12px;
      display: inline-flex;
      margin-right: 5px;
      background-color: #e91e63;
    }
  }

  .vote-group {
    padding: 0;
    max-height: 170px;
    overflow: scroll;
  }

  .vote-option {
    display: inline-block;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 768px) {
      width: 41%;
      margin: 0 2%;
    }
  }

  .chat-group {
    height: 90px;
    overflow: scroll;
  }

  .wolf-chat {
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: left;
    padding: 3px 10px;
    margin: 0;
  }

  .vote-option,
  .vote-option .v-chip {
    cursor: pointer;
  }
}
</style>
