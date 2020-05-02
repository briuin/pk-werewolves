<template>
  <v-form>
    <v-container class="modal-container">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          Loading...
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  data = {};
}
</script>

<style lang="scss" scoped>
.modal-container {
  max-width: 280px;
  background: transparent;
  padding: 20px 35px;
}

.row {
  justify-content: center;
}
</style>
