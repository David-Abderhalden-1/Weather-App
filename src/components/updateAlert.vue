<template>
  <footer class="footer">
    <div id="snackbar" :class="[showAlert ? 'show' : '']" >Updated Data</div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "updateAlert",
  computed: {
    ...mapGetters({
      showAlert: "getUpdated",
    })
  }
};
</script>

<style>
@import "../assets/component-updateAlert.css";
</style>