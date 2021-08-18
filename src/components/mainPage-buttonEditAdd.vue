<template>
  <button :class="className" @click="onClickFunction">{{buttonValue}}</button>
</template>

<script>
export default {
    name: 'mainPage-buttonEditAdd',
    props: {
        className:String,
        buttonValue:String,
        onClickFunction:Function,
    }
}
</script>

<style>

</style>