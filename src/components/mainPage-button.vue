<template>
  <button :class="className" @click="onClickFunction(index)">{{buttonValue}}</button>
</template>

<script>
export default {
    name: 'mainPage-button',
    props: {
        className:String,
        buttonValue:String,
        onClickFunction:Function,
        index:Number,
    }
}
</script>

<style>

</style>