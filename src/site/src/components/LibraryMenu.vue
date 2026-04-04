<template>
    <div class="menu-bar" ref="menuBar">
        <div v-for="menu in menuItems"
            :key="menu.name"
            class="menu-root"
            :class="{ active: activeMenu === menu.name }"
            @click="onRootClick(menu.name)"
            @mouseenter="onRootHover(menu.name)">

            {{ menu.label }}

            <div v-if="activeMenu === menu.name" class="dropdown">
                <LibraryMenuItem v-for="item in menu.children" :key="item.id || item.label" :item="item" @select="onSelect"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import LibraryMenuItem from './LibraryMenuItem.vue'
import api from 'axios'

const menuBar = ref(null);
const activeMenu = ref(null);
const store = useStore();

const menuItems = ref([
    {
        name: 'library',
        label: 'Library',
        children: []
    }
]);

function updateLibrary(obj, t, path)
{
    if (!obj)
        return;

    if (obj['dirs'])
    {
        for (let i = 0; i < obj['dirs'].length; ++i)
        {
            const dir = obj['dirs'][i];
            const p = path + dir['name'] + '/';

            t.push({
                id: p,
                label: dir['name'],
                selectable: false,
                children: []
            });

            updateLibrary(dir, t[t.length - 1].children, p);
        }
    }

    if (obj['files'])
    {
        for (let i = 0; i < obj['files'].length; ++i)
        {
            const p = path + obj['files'][i];
            t.push({
                id: p,
                label: obj['files'][i],
                selectable: true
            });
        }
    }
}

function loadLibrary()
{
    api.post('/service/get-library-documents',
        {
            language: store.state.editor.language === '' ? 'en' : store.state.editor.language
        }
    ).
    then(response =>
    {
        const result = [];
        const data = response.data;

        if (data.dirs)
        {
            for (let i = 0; i < data.dirs.length; ++i)
            {
                const dir = data.dirs[i];
                const children = [];

                updateLibrary(dir, children, '/' + dir.name + '/');

                result.push({
                    name: dir.name,
                    label: dir.name,
                    children: children
                });
            }
        }

        if (data.files)
        {
            for (let i = 0; i < data.files.length; ++i)
            {
                const fileName = data.files[i];
                result.push({
                    name: fileName,
                    label: fileName,
                    children: [
                        {
                            id: '/' + fileName,
                            label: fileName,
                            selectable: true
                        }
                    ]
                });
            }
        }

        menuItems.value = result;
    })
    .catch(error =>
    {
        console.log(error)
    });
}

function onRootClick(name)
{
    activeMenu.value = activeMenu.value === name ? null : name;
    if (activeMenu.value == null)
        FocusCanvas();
}

function onRootHover(name)
{
    if (activeMenu.value && activeMenu.value !== name)
        activeMenu.value = name;
}

function onSelect(id)
{
    window.dispatchEvent(new CustomEvent('clearDocumentSelection', {}));
    window.dispatchEvent(new CustomEvent('loadLibraryDocument',
    {
        detail:
        {
            document: id,
            language: store.state.editor.language === '' ? 'en' : store.state.editor.language
        }
    }));

    activeMenu.value = null;
}

function handleClickOutside(event)
{
    if (!menuBar.value)
        return;

    if (!menuBar.value.contains(event.target))
    {
        activeMenu.value = null;
        FocusCanvas();
    }
}

function FocusCanvas()
{
    if (typeof canvas !== 'undefined' && canvas?.focus)
        canvas.focus()
}

onMounted(() =>
{
    loadLibrary();
})

onBeforeUnmount(() =>
{
    window.removeEventListener('click', handleClickOutside);
})

watch(
    () => store.state.editor.language,
    () =>
    {
        loadLibrary()

        if (typeof canvas !== 'undefined' && canvas?.focus)
            FocusCanvas();
    }
)

watch(activeMenu, (val) =>
{
    if (val)
        document.addEventListener('click', handleClickOutside)
    else
        document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.menu-bar {
    display:flex;
    background:#f0f0f0;
    border-bottom:1px solid #ccc;
    user-select:none;
}

.menu-root {
    position:relative;
    padding:6px 12px;
    cursor:pointer;
}

.menu-root:hover {
    background:#e0e0e0;
}

.menu-root.active {
    background:#d0d0d0;
}

.dropdown {
    position:absolute;
    top:100%;
    left:0;
    background:white;
    border:1px solid #ccc;
    min-width:200px;
    box-shadow:0 2px 6px rgba(0,0,0,0.2);
    z-index:1000;
}
</style>
