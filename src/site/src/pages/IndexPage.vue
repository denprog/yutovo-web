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
    components: { YutovoWeb }
}
</script>

<style>
    .yutovo-web-container {
        text-align: center;
        border: 1px solid black;
        top: 0;
        left: 0;
        width: 99%;
        height: 90vh;
        margin: 2px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
