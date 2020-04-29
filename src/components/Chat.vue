<template>
  <v-form class="chat">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="message-box">
            <v-toolbar v-if="false" color="cyan" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Inbox</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list ref="chats">
              <template v-for="(item, index) in messages.filter((x) => !x.divider)">
                <v-subheader v-if="item.header" :key="item.header + index" v-text="item.header"></v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-item v-else :key="item.name + index">
                  <v-list-item-avatar v-if="false">
                    <v-img src="@/assets/question-people.jpg"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-if="false" v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle
                      v-if="item.seatNo"
                      v-html="`<span class='text--primary'>${item.seatNo}號 ${item.name}</span> &mdash; ${item.message}`"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle v-else v-html="`<b>${item.name}:</b> ${item.message}`"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="emoji" :class="{ active: isShowEmoji }">
            <vue-reaction-emoji v-for="emoji in emojiGroup" :key="emoji" ref="emoji" :reaction="emoji" :is-active="true" />
          </div>
          <v-text-field
            v-model="message"
            append-outer-icon="mdi-send"
            prepend-icon="mdi-emoticon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @keydown.enter.prevent.stop="sendMessage"
            @click:append-outer="sendMessage"
            @click:prepend="sendEmoji"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PlayerService from '@/services/player';
import { VueFeedbackReaction, VueReactionEmoji } from 'vue-feedback-reaction';

@Component({
  components: {
    VueFeedbackReaction,
    VueReactionEmoji,
  },
})
export default class Chat extends Vue {
  public messages: any[] = [];
  public message = '';
  public emoji = '';
  public emojiGroup = ['hate', 'disappointed', 'natural', 'good', 'excellent'];
  public isShowEmoji = false;

  mounted() {
    (this.$refs.emoji as any).forEach((x: any) => (x.hoverx = true));
  }

  get chatList() {
    return this.$refs.chats && ((this.$refs.chats as any).$el as HTMLElement);
  }

  public sendMessage() {
    if (!this.message) {
      return;
    }
    this.$socket.werewolves.emit('sendmessage', { message: this.message });
    this.clearMessage();
  }

  public sendEmoji() {
    this.isShowEmoji = !this.isShowEmoji;
  }

  public clearMessage() {
    this.message = '';
  }

  protected created() {
    this.messages.push({ header: `房號 ${this.$route.params.id}` });
    this.sockets.werewolves.subscribe('message', (data: any) => {
      this.messages.push(
        {
          name: data.name,
          seatNo: data.seatNo,
          message: data.message,
        },
        { divider: true, inset: true }
      );

      Vue.nextTick(() => {
        if (this.chatList) {
          this.chatList.scrollTop = this.chatList.scrollHeight;
        }
      });
    });

    this.sockets.werewolves.subscribe('gamedetails', (data: any) => {
      if (!data.messages) {
        return;
      }
      this.messages = [...data.messages, ...this.messages];
    });
  }
}
</script>

<style lang="scss" scoped>
.message-box {
  height: 270px;
}

.v-list-item__content,
.v-list-item {
  min-height: 0px !important;
  padding: 2px 16px !important;
}

.chat {
  .col {
    padding: 0 !important;
  }

  .v-card {
    box-shadow: none;
    padding-top: 45px;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .v-list {
    overflow: scroll;
    height: 100%;
    background-color: initial;
  }

  .v-subheader {
    position: absolute;
    top: 0;
  }

  .container {
    padding-bottom: 0;
  }

  .emoji {
    position: absolute;
    display: flex;
    left: 25px;
    width: 0;
    overflow: hidden;
    transition: 0.4s linear;

    &.active {
      width: 275px;
    }
  }
}
</style>

<style lang="scss">
.chat {
  .v-list-item__subtitle {
    white-space: inherit;
  }
  .v-input__control .v-text-field__details {
    display: none;
  }
}

.vue-reaction {
  margin: 0 5px;
  .h-60 {
    height: 45px;
  }

  &:hover .effect {
    right: 0;
  }
}

.vue-feedback-reaction {
  margin: auto;
  .reaction {
    padding: 0;
    .vue-reaction .effect {
      animation: pulse 2s;
    }
  }
}
</style>
