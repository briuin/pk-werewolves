<template>
  <div class="overlay">
    <v-container class="modal-container">
      <v-row justify="center">
        <v-col cols="12" class="pa-0">
          <h1>請發表言論</h1>
        </v-col>
        <v-col v-if="false" class="d-flex pa-0" cols="12">
          <v-carousel class="opinion-options" hide-delimiters height="40px">
            <v-carousel-item v-for="(action, i) in opinionActions.filter((x, i) => i < opinionActions.length / 3)" :key="i">
              <div class="d-flex justify-center align-center">
                <v-chip
                  :color="'rgb(95,158,160)'"
                  class="pr-2 pr-2 d-flex justify-center align-center"
                  style="width: 23%;cursor:pointer"
                  draggable
                  v-for="index in [0, 1, 2]"
                  :key="'opinion-action' + index + i"
                >
                  {{ opinionActions[3 * i + index] }}
                </v-chip>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col class="d-flex pa-0" cols="12">
          <v-select v-model="selectedOpinionActions" :items="opinionActions" label="快捷選項"></v-select>
        </v-col>
        <v-col v-if="selectedOpinionActions" class="d-flex pa-0" cols="12">
          <v-chip
            :color="'rgb(95,158,160)'"
            draggable
            v-for="option in options"
            :key="option"
            class="mr-2"
            style="cursor: pointer;color: white"
            @click="sendOpinionByShortcut(option)"
          >
            {{ option }}
          </v-chip>
        </v-col>
        <v-col cols="12" class="opinion-group pa-0" ref="opinions">
          <p class="player-opinion mb-0" v-for="(opinion, i) in myOpinions" :key="`opinion${i}`">{{ opinion }}</p>
        </v-col>
        <v-col cols="12" class="pa-0">
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Opinion extends Vue {
  @Prop({ default: () => [] }) seats!: any[];
  message = '';
  myOpinions = [];
  opinionActions = ['金水', '銀水', '查殺', '表水', '划水', '踩'];
  selectedOpinionActions = '';
  skipped = false;

  get options() {
    if (!this.selectedOpinionActions) {
      return [];
    }
    if (this.selectedOpinionActions === '表水') {
      return ['狼人', '好人'];
    }
    return this.seats.map((x) => `${x.no}號`);
  }

  get opinions() {
    return this.$refs.opinions as HTMLElement;
  }

  skip() {
    if (this.skipped) {
      return;
    }
    this.skipped = true;
    this.$socket.werewolves.emit('skipopinion');
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.$socket.werewolves.emit('sendopinion', { message: this.message });
    this.clearMessage();
  }

  sendOpinionByShortcut(value: string) {
    if (!this.selectedOpinionActions) {
      return;
    }
    this.$socket.werewolves.emit('sendopinion', { message: `${this.selectedOpinionActions}: ${value}` });
  }

  clearMessage() {
    this.message = '';
  }

  protected created() {
    this.sockets.werewolves.subscribe('myopinion', (data: any) => {
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
    max-height: 450px;
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
<style lang="scss">
.opinion-options .v-window__prev,
.opinion-options .v-window__next {
  margin: 0;
}
</style>
