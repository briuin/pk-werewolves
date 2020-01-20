<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              label="Your Name"
              outlined
              hide-details
              v-model="name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            class="ma-2"
            :loading="false"
            :disabled="false"
            color="info"
            @click="confirm()"
          >
            Confirm
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            v-if="options.cancelable"
            class="ma-2"
            :loading="false"
            :disabled="false"
            color="error"
            @click="$emit('cancel')"
          >
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NameDialog extends Vue {
  @Prop() options: any;
  name = "";
  confirm() {
    if (!this.name && this.name.length > 30) {
      return;
    }
    this.$emit("confirm", this.name);
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    max-width: 280px;
    background: white;
    padding: 20px 35px;
  }

  .row {
    justify-content: center;
  }
}
</style>
