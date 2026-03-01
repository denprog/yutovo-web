<template>
    <div v-if="visible" class="prompt-overlay" @mousedown.stop.prevent="close"/>
    <div v-if="visible" ref="container" class="prompt-container" @mousedown.stop.prevent @mouseup.stop.prevent @click.stop.prevent
        :style="{ position: 'absolute', left: `${promptPos.x}px`, top: `${promptPos.y}px`, minWidth: '50px', maxHeight: '150px', overflowY: 'auto', 
            background: 'white', zIndex: 1000, border: '1px solid #ccc'}">
        <div v-for="(item, i) in promptItems" :key="i"
            :class="{ 'bg-grey-3': selectedIndex === i }"
            style="padding: 4px 8px; cursor: pointer;"
            @mousedown.prevent="selectItem(item)">
            
            <img v-if="getIcon(item)" :src="`${getIcon(item)}`" width='20' height='20'/>
            <span v-else v-html="formatItemHtml(item)" />
        </div>
    </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, toRef, nextTick } from 'vue';

export default
{
    name: 'PromptDialog',

    props: {
        promptItems: { type: Array, required: true },
        promptPos: { type: Object, required: true },
        modelValue: { type: Boolean, default: false }
    },

    emits: ['update:modelValue', 'select'],

    setup(props, { emit })
    {
        const itemsProp = toRef(props, 'promptItems');
        const posProp = toRef(props, 'promptPos');
        const modelProp = toRef(props, 'modelValue');

        const items = ref([...itemsProp.value]);
        const pos = ref({ x: posProp.value.x, y: posProp.value.y });
        const visible = ref(modelProp.value);
        const selectedIndex = ref(0);

        const iconMap: Record<string, string> = {
            plus: '/images/algebra/plus.png',
            minus: '/images/algebra/minus.png',
            mul: '/images/algebra/multiply.png',
            div: '/images/algebra/division.png',
            power: '/images/algebra/power.png',
            root: '/images/algebra/nth_root.png',
            sqrt: '/images/algebra/sqrt.png',
            sub: '/images/algebra/subscript.png',
            sum: '/images/algebra/sum.png',
            prod: '/images/algebra/product.png'
        };

        const getIcon = (item: string) => iconMap[item] ?? '';

        watch(itemsProp, val =>
        {
            items.value = [...val];
        });

        watch(posProp, val =>
        {
            pos.value = { x: val.x, y: val.y };
        });

        watch(modelProp, val =>
        {
            visible.value = val;
            if (!val)
                selectedIndex.value = 0;
        });

        watch(visible, val => 
        {
            emit('update:modelValue', val);
            window.Module.cwrap('SetPromptVisible', 'void', ['bool'])(val);
        });

        const close = () => 
        {
            visible.value = false;
            selectedIndex.value = 0;
        };

        const selectItem = (item: string) => 
        {
            emit('select', item);
            close();
        };

        const scrollToSelected = async () =>
        {
            await nextTick();

            const c = container.value;
            if (!c)
                return;
            const el = c.children[selectedIndex.value] as HTMLElement;
            if (!el)
                return;

            const elTop = el.offsetTop;
            const elBottom = elTop + el.offsetHeight;
            if (elTop < c.scrollTop)
                c.scrollTop = elTop;
            else if (elBottom > c.scrollTop + c.clientHeight)
                c.scrollTop = elBottom - c.clientHeight;
        };

        const formatItemHtml = (str: string) =>
        {
            if (!str)
                return str;
            return str.replace(/\{([^}]+)\}/g, '<sub>$1</sub>');
        };

        const container = ref<HTMLElement | null>(null);

        const preventDefault = (e: KeyboardEvent) =>
        {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
        };

        const onKeyDown = (e: KeyboardEvent) =>
        {
            if (!visible.value || !items.value.length)
                return;
            switch (e.key)
            {
            case 'ArrowDown':
                if (selectedIndex.value < items.value.length - 1)
                {
                    selectedIndex.value++;
                    scrollToSelected();
                }
                preventDefault(e);
                break;
            case 'ArrowUp':
                if (selectedIndex.value > 0)
                {
                    selectedIndex.value--;
                    scrollToSelected();
                }
                preventDefault(e);
                break;
            case 'Home':
                selectedIndex.value = 0;
                scrollToSelected();
                preventDefault(e);
                break;
            case 'End':
                selectedIndex.value = items.value.length - 1;
                scrollToSelected();
                preventDefault(e);
                break;
            case 'PageDown':
                selectedIndex.value = Math.min(selectedIndex.value + 5, items.value.length - 1);
                scrollToSelected();
                preventDefault(e);
                break;
            case 'PageUp':
                selectedIndex.value = Math.max(selectedIndex.value - 5, 0);
                scrollToSelected();
                preventDefault(e);
                break;
            case 'Enter':
                selectItem(items.value[selectedIndex.value]);
                preventDefault(e);
                break;
            case 'Escape':
                close();
                preventDefault(e);
                break;
            }
        };

        onMounted(() =>
        {
            document.addEventListener('keydown', onKeyDown, true);
        });

        onBeforeUnmount(() =>
        {
            document.removeEventListener('keydown', onKeyDown, true);
        });

        return {
            items,
            pos,
            visible,
            selectedIndex,
            close,
            selectItem,
            container,
            getIcon,
            formatItemHtml
        };
    }
}
</script>

<style>
.prompt-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: transparent;
    pointer-events: all;
}

.prompt-container {
    min-width: 120px;
    max-height: 200px;
    overflow-y: auto;
    pointer-events: all;
    background: white;
}
</style>