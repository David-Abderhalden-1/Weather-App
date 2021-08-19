<template>
  <tr class="weeklyrowentity">
    <td class="weeklyrowentity__tabledata">{{ dailyValue.day }}</td>
    <td class="weeklyrowentity__tabledata">
      <icon-component :iconId="dailyValue.ico" :divClass="'weekly-forecast__wrapper'" :imgClass="'weekly-forecast__img'"/>
    </td>
    <td class="weeklyrowentity__tabledata weeklyrowentity__tabledata--end weeklyrowentity__tabledata--slim">
      {{ dailyValue.max }}°
    </td>
    <td class="weeklyrowentity__tabledata weeklyrowentity__tabledata--end">
      {{ dailyValue.min }}°
    </td>
  </tr>
</template>

<script>
import iconComponent from './weather-icon.vue'

export default {
  name: "locationPage-weeklyforecast-element",
  props: {
    dailyValue: Object,
  },
  components: {
    iconComponent,
  },
};
</script>

<style>
</style>