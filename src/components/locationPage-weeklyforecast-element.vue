<template>
  <tr class="weeklyrowentity">
            <td class="weeklyrowentity__tabledata">{{dailyValue.day}}</td>
            <td class="weeklyrowentity__tabledata"><i></i></td>
            <td class="weeklyrowentity__tabledata tabledata__modifier">{{dailyValue.max}}°</td>
            <td class="weeklyrowentity__tabledata tabledata__modifier">{{dailyValue.min}}°</td>
          </tr>
</template>

<script>
export default {
    name: 'locationPage-weeklyforecast-element',
    props: {
        dailyValue:Object
    }
}
</script>

<style>

</style>