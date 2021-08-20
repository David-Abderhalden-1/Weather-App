<template>
    <div :class="divClass">
        <img :class="imgClass" v-if="iconId == 804 || iconId == 771" src="@/assets/img/cloudy.svg" />
        <img :class="imgClass" v-if="iconId < 804 && iconId > 800" src="@/assets/img/cloudy-day-3.svg" />
        <img :class="imgClass" v-if="iconId == 800" src="@/assets/img/day.svg" />
        <img :class="imgClass" v-if="iconId < 532 && iconId > 500" src="@/assets/img/rainy-6.svg" />
        <img :class="imgClass" v-if="iconId == 500" src="@/assets/img/rainy-day.svg" />
        <img :class="imgClass" v-if="(iconId < 603 && iconId > 599) || (iconId < 623 && iconId > 619)" src="@/assets/img/snowy-6.svg" />
        <img :class="imgClass" v-if="iconId < 617 && iconId > 610" src="@/assets/img/snowy-day.svg" />
        <img :class="imgClass" v-if="iconId < 233 && iconId > 199" src="@/assets/img/thunder.svg" />
        <img :class="imgClass" v-if="iconId == 701 || iconId == 721 || iconId == 741" src="@/assets/img/fog.svg" />
        <img :class="imgClass" v-if="iconId == 711" src="@/assets/img/smoke.svg" />
        <img :class="imgClass" v-if="iconId == 731 || iconId == 751 || iconId == 761" src="@/assets/img/sand.svg" />
        <img :class="imgClass" v-if="iconId == 762" src="@/assets/img/ash.svg" />
        <img :class="imgClass" v-if="iconId == 781" src="@/assets/img/tornado.svg" />
    </div>
</template>

<script>

export default {
    name: 'icon-component',

    props: {
        iconId: Number, 
        imgClass: String,
        divClass: String,
    },
}

</script>