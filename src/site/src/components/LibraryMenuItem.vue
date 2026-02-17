<template>
    <div>
        <div v-if="item.separator" class="separator" />
        <div v-else class="dropdown-item" @mouseenter="open = true" @mouseleave="open = false" @click.stop="onClick">
            <span>{{ item.label }}</span>
            <span v-if="item.children" class="submenu-arrow">▶</span>
            <div v-if="item.children && open" class="submenu">
                <LibraryMenuItem
                    v-for="child in item.children"
                    :key="child.id || child.label"
                    :item="child"
                    @select="$emit('select', $event)"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
    name: 'LibraryMenuItem'
})

const props = defineProps({
    item: Object
})

const emit = defineEmits(['select'])
const open = ref(false)

function onClick()
{
    if (!props.item.children && props.item.id)
        emit('select', props.item.id);
}
</script>

<style scoped>
.dropdown-item {
    position:relative;
    padding:6px 12px;
    cursor:pointer;
    display:flex;
    justify-content:space-between;
}

.dropdown-item:hover {
    background:#e8e8e8;
}

.separator {
    height:1px;
    background:#ddd;
    margin:4px 0;
}

.submenu {
    position:absolute;
    top:0;
    left:100%;
    background:white;
    border:1px solid #ccc;
    min-width:200px;
    box-shadow:0 2px 6px rgba(0,0,0,0.2);
}

.submenu-arrow {
    font-size:12px;
}
</style>
