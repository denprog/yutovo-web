<template>
<div class="yutovo-web-container">
    <yutovo-web>
    </yutovo-web>
</div>
</template>

<script lang="ts">

import YutovoWeb from 'components/YutovoWeb.vue';

export default {
    name: 'IndexPage',
    components: { YutovoWeb },

    mounted()
    {
        window.onpopstate = function()
        {
            location.reload();
        };
    }
}
</script>

<style>
.yutovo-web-container {
    text-align: center;
    border: 0px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 2px;
    margin-left: auto;
    margin-right: auto;
}
</style>
