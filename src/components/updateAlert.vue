<template>
  <footer class="footer">
    <div id="snackbar" :class="[showAlert ? 'show' : '']" >{{ alertMessage }}</div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "updateAlert",
  computed: {
    ...mapGetters({
      showAlert: "getUpdated",
      alertMessage: "getAlertMessage",
    })
  }
};
</script>

<style>
@import "../assets/component-updateAlert.css";
</style>