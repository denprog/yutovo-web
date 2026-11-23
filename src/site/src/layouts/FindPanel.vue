<template>
    <div v-if="visible" ref="panel" class="find-panel" :style="panelStyle" @mousedown.stop>
        <div class="find-title" @mousedown.stop.prevent="startDrag">
            <span class="find-title-text">{{ replaceMode ? $t('Replace') : $t('Find') }}</span>
            <button id="find-close" class="find-close" :title="$t('Close the dialog (Esc)')" @click="close">&#215;</button>
        </div>
        <div class="find-row">
            <input id="find-input" ref="input" type="text" v-model="text" :placeholder="$t('Find')" @keydown="onInputKeydown" />
            <span id="find-count" class="find-count">{{ countText }}</span>
            <label class="find-option">
                <input id="match-case" type="checkbox" v-model="matchCase" />
                {{ $t('Match case') }}
            </label>
            <label class="find-option">
                <input id="match-word" type="checkbox" v-model="wholeWord" />
                {{ $t('Match whole word') }}
            </label>
            <button id="find-prev" class="find-arrow" :title="$t('Previous match')" @click="prev">&#9650;</button>
            <button id="find-next" class="find-arrow" :title="$t('Next match')" @click="next">&#9660;</button>
        </div>
        <div v-if="replaceMode" class="find-row">
            <input id="replace-input" type="text" v-model="replacement" :placeholder="$t('Replace with')" @keydown="onReplaceKeydown" />
            <button id="replace-one-button" :title="$t('Replace the current match')" @click="replace">{{ $t('Replace') }}</button>
            <button id="replace-all-button" :title="$t('Replace every match')" @click="replaceAll">{{ $t('Replace all') }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

export default
{
    name: 'FindPanel',

    props: {
        modelValue: { type: Boolean, default: false },
        //the find panel contains no replace row; the replace mode adds it
        replaceMode: { type: Boolean, default: false }
    },

    emits: ['update:modelValue'],

    setup(props, { emit })
    {
        const tr = useI18n();

        const visible = ref(props.modelValue);
        const replace = ref(props.replaceMode);
        const text = ref('');
        const replacement = ref('');
        const matchCase = ref(false);
        const wholeWord = ref(false);
        const count = ref(0);
        const current = ref(0);
        const input = ref<HTMLInputElement | null>(null);
        const panel = ref<HTMLElement | null>(null);
        let searchTimer: number | undefined;

        //the panel is dragged by its title bar; while it is not dragged the css places it
        //(top/right), the first drag switches to explicit coordinates
        const drag_offset = { x: 0, y: 0 };
        const panel_pos = ref<{ x: number; y: number } | null>(null);

        const panelStyle = computed(() =>
        {
            if (!panel_pos.value)
                return {};
            return {
                left: panel_pos.value.x + 'px',
                top: panel_pos.value.y + 'px',
                right: 'auto'
            };
        });

        const startDrag = (e: MouseEvent) =>
        {
            //the title bar buttons do not drag
            if ((e.target as HTMLElement).closest('button'))
                return;
            const el = panel.value;
            if (!el)
                return;
            const rect = el.getBoundingClientRect();
            const parent = el.offsetParent as HTMLElement | null;
            const parent_rect = parent ? parent.getBoundingClientRect() : null;
            panel_pos.value = {
                x: parent_rect ? rect.left - parent_rect.left : rect.left,
                y: parent_rect ? rect.top - parent_rect.top : rect.top
            };
            drag_offset.x = e.clientX - rect.left;
            drag_offset.y = e.clientY - rect.top;
            window.addEventListener('mousemove', onDrag);
            window.addEventListener('mouseup', stopDrag);
        };

        const onDrag = (e: MouseEvent) =>
        {
            const el = panel.value;
            if (!el)
                return;
            const parent = el.offsetParent as HTMLElement | null;
            const parent_rect = parent ? parent.getBoundingClientRect() : null;
            let x = e.clientX - drag_offset.x - (parent_rect ? parent_rect.left : 0);
            let y = e.clientY - drag_offset.y - (parent_rect ? parent_rect.top : 0);
            //keep the title bar reachable - clamp inside the parent
            const max_x = (parent ? parent.clientWidth : window.innerWidth) - el.offsetWidth;
            const max_y = parent ? parent.clientHeight - 24 : window.innerHeight - 24;
            panel_pos.value = {
                x: Math.max(0, Math.min(x, max_x)),
                y: Math.max(0, Math.min(y, max_y))
            };
        };

        const stopDrag = () =>
        {
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', stopDrag);
        };

        const runSearch = () =>
        {
            window.Module.cwrap('OnSearch', 'void', ['string', 'number', 'number'])(text.value, matchCase.value ? 1 : 0,
                wholeWord.value ? 1 : 0);
        };

        const countText = computed(() =>
        {
            if (!text.value)
                return '';
            if (count.value === 0)
                return tr.t('Not found');
            return `${current.value + 1}/${count.value}`;
        });

        const next = () =>
        {
            window.Module.cwrap('OnFindNext', 'void', ['number'])(0);
        };

        const prev = () =>
        {
            window.Module.cwrap('OnFindNext', 'void', ['number'])(1);
        };

        const replaceOne = () =>
        {
            window.Module.cwrap('OnReplace', 'void', ['string'])(replacement.value);
        };

        const replaceAll = () =>
        {
            window.Module.cwrap('OnReplaceAll', 'void', ['string'])(replacement.value);
        };

        const close = () =>
        {
            visible.value = false;
        };

        const onInputKeydown = (e: KeyboardEvent) =>
        {
            if (e.key === 'Enter')
            {
                e.preventDefault();
                if (e.shiftKey)
                    prev();
                else
                    next();
            }
            else if (e.key === 'Escape')
                close();
        };

        const onReplaceKeydown = (e: KeyboardEvent) =>
        {
            if (e.key === 'Enter')
            {
                e.preventDefault();
                replaceOne();
            }
            else if (e.key === 'Escape')
                close();
        };

        //Escape closes the panel even while the canvas has focus
        const focusInput = () =>
        {
            nextTick(() =>
            {
                input.value?.focus();
                input.value?.select();
            });
        };

        const onDocumentKeydown = (e: KeyboardEvent) =>
        {
            if (visible.value && e.key === 'Escape')
                close();
        };

        const onSearchState = (e: Event) =>
        {
            const detail = (e as CustomEvent).detail;
            count.value = detail.count;
            current.value = detail.current;
        };

        watch(() => props.modelValue, val =>
        {
            visible.value = val;
        });

        watch(() => props.replaceMode, val =>
        {
            replace.value = val;
            //switching the open panel between the modes returns the focus to the input
            if (visible.value)
                focusInput();
        });

        watch(visible, val =>
        {
            emit('update:modelValue', val);
            if (val)
            {
                //a selected string prefills the search - like the browsers do;
                //without a selection the input starts empty
                text.value = window.Module.GetSelectedText();
                focusInput();
                if (text.value)
                    runSearch();
            }
            else
            {
                window.clearTimeout(searchTimer);
                window.Module.cwrap('OnSearch', 'void', ['string', 'number', 'number'])('', 0, 0);
            }
        });

        //live search with a small debounce
        watch(text, () =>
        {
            window.clearTimeout(searchTimer);
            searchTimer = window.setTimeout(runSearch, 200);
        });

        watch(matchCase, () => runSearch());
        watch(wholeWord, () => runSearch());

        onMounted(() =>
        {
            document.addEventListener('keydown', onDocumentKeydown, true);
            window.addEventListener('searchState', onSearchState, false);
        });

        onBeforeUnmount(() =>
        {
            document.removeEventListener('keydown', onDocumentKeydown, true);
            window.removeEventListener('searchState', onSearchState, false);
            window.clearTimeout(searchTimer);
            stopDrag();
        });

        return {
            visible,
            replaceMode: replace,
            text,
            replacement,
            matchCase,
            wholeWord,
            input,
            panel,
            panelStyle,
            countText,
            next,
            prev,
            replace: replaceOne,
            replaceAll,
            close,
            startDrag,
            onInputKeydown,
            onReplaceKeydown
        };
    }
}
</script>

<style>
.find-panel {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 8px;
    background: white;
    border: 1px solid #ccc;
    pointer-events: all;
}

.find-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding-bottom: 3px;
    border-bottom: 1px solid #ccc;
    cursor: move;
    user-select: none;
}

.find-title-text {
    font-weight: bold;
    color: #333;
    white-space: nowrap;
}

.find-close {
    padding: 0 6px;
}

.find-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.find-panel input[type="text"] {
    border: 1px solid #ccc;
    padding: 2px 4px;
    outline: none;
    min-width: 170px;
}

#replace-input {
    min-width: 170px;
}

.find-panel button {
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    padding: 2px 8px;
    white-space: nowrap;
}

.find-panel button.find-arrow {
    padding: 2px 0;
    width: 26px;
    min-width: 26px;
}

.find-count {
    min-width: 40px;
    color: #555;
    white-space: nowrap;
}

.find-option {
    display: flex;
    align-items: center;
    gap: 3px;
    white-space: nowrap;
    color: #333;
}
</style>
