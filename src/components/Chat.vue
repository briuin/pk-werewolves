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

            <v-list three-line>
              <template v-for="(item, index) in messages.filter(x => !x.divider)">
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
                      v-html="
                  `<span class='text--primary'>${item.seatNo}號</span> &mdash; ${item.message}`
                "
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
          <v-text-field
            v-model="message"
            append-outer-icon="mdi-send"
            prepend-icon="mdi-emoticon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
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
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";

@Component
export default class Chat extends Vue {
  public messages = [{ header: `房號 ${1}` }];
  public message = "";

  public sendMessage() {
    //
  }

  public sendEmoji() {
    //
  }

  public clearMessage() {
    //
  }
}
</script>

<style lang="scss" scoped>
.message-box {
  height: 270px;
}

.chat {
  .col {
    padding: 0 !important;
  }

  .v-card {
    box-shadow: none;
  }
}
</style>
