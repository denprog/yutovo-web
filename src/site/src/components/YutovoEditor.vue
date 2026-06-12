<template>
    <div class="editor-container" id="editor" tabindex="0">
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex="-1" />

        <prompt-dialog
            v-model="promptVisible"
            :prompt-items="promptItems"
            :prompt-pos="promptPos"
            @select="onPromptSelect"
        />

        <div id="scroll-container">
            <q-menu ref="contextMenuRef" touch-position square fit context-menu @hide="onCloseContextMenu()" @show="onShowContextMenu()">
                <q-list dense style="min-width: 100px">
                    <q-item id="copy-menu" clickable @click="onCopy()">
                        <q-item-section>{{ $t('Copy') }}</q-item-section>
                    </q-item>
                    <q-item id="paste-menu" clickable @click="onPaste()">
                        <q-item-section>{{ $t('Paste') }}</q-item-section>
                    </q-item>
                    <q-item id="cut-menu" clickable @click="onCut()">
                        <q-item-section>{{ $t('Cut') }}</q-item-section>
                    </q-item>

                    <q-separator />

                     <q-item auto-close id="present-as-menu" clickable style="display:none;">
                        <q-item-section square>{{ $t('Present as') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="present-as-auto-menu" dense clickable @click="onPresentAsAuto()">
                                    <div v-if="autoMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Auto') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-real-menu" dense clickable @click="onPresentAsReal()">
                                    <div v-if="realMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Real') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-integer-menu" dense clickable @click="onPresentAsInteger()">
                                    <div v-if="integerMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Integer') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-rational-menu" dense clickable @click="onPresentAsRational()">
                                    <div v-if="rationalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Rational') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-complex-menu" dense clickable @click="onPresentAsComplex()">
                                    <div v-if="complexMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Complex') }}</q-item-section>
                                </q-item>

                                <q-item id="symbolic-as-menu" clickable>
                                    <q-item-section @click.stop="symbolicMenuOpen = !symbolicMenuOpen">
                                        {{ $t('Symbolic') }}
                                    </q-item-section>
                                    <q-item-section side @click.stop="symbolicMenuOpen = !symbolicMenuOpen">
                                        <q-icon name="keyboard_arrow_right" />
                                    </q-item-section>

                                    <q-menu v-model="symbolicMenuOpen" anchor="top end" self="top start">
                                        <q-list>
                                            <q-item id="symbolic-as-real-menu" dense clickable @click.stop="onPresentAsSymbolicReal()">
                                                <div v-if="symbolicRealMenuChecked">&check;</div>
                                                <q-item-section>{{ $t('Real') }}</q-item-section>
                                            </q-item>
                                            <q-item id="symbolic-as-rational-menu" dense clickable @click.stop="onPresentAsSymbolicRational()">
                                                <div v-if="symbolicRationalMenuChecked">&check;</div>
                                                <q-item-section>{{ $t('Rational') }}</q-item-section>
                                            </q-item>
                                            <q-item id="symbolic-as-complex-menu" dense clickable @click.stop="onPresentAsSymbolicComplex()">
                                                <div v-if="symbolicComplexMenuChecked">&check;</div>
                                                <q-item-section>{{ $t('Complex') }}</q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-precision-menu" clickable style="display:none;" @click="onSetPrecision()">
                        <q-item-section>{{ $t('Precision') }}</q-item-section>
                    </q-item>

                    <q-item id="set-exp-menu" clickable style="display:none;" @click="onSetExp()">
                        <q-item-section>{{ $t('Exponent order') }}</q-item-section>
                    </q-item>

                    <q-item auto-close id="set-default-angle-measure-menu" clickable style="display:none;">
                        <q-item-section square>{{ $t('Default angle measure') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-default-radian-angle-measure-menu" dense clickable @click="onSetDefaultRadianAngleMeasure()">
                                    <div v-if="defaultRadianMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Radian') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-degree-angle-measure-menu" dense clickable @click="onSetDefaultDegreeAngleMeasure()">
                                    <div v-if="defaultDegreeMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Degree') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-grad-angle-measure-menu" dense clickable @click="onSetDefaultGradAngleMeasure()">
                                    <div v-if="defaultGradMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Grad') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item auto-close id="set-result-angle-measure-menu" clickable style="display:none;">
                        <q-item-section square>{{ $t('Result angle measure') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-result-radian-angle-measure-menu" dense clickable @click="onSetResultRadianAngleMeasure()">
                                    <div v-if="resultRadianMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Radian') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-degree-angle-measure-menu" dense clickable @click="onSetResultDegreeAngleMeasure()">
                                    <div v-if="resultDegreeMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Degree') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-grad-angle-measure-menu" dense clickable @click="onSetResultGradAngleMeasure()">
                                    <div v-if="resultGradMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Grad') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-default-notation-menu" clickable style="display:none;">
                        <q-item-section>{{ $t('Default notation') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-default-binary-notation-menu" dense clickable @click="onSetDefaultBinaryNotation()">
                                    <div v-if="defaultBinaryMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Binary') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-octal-notation-menu" dense clickable @click="onSetDefaultOctalNotation()">
                                    <div v-if="defaultOctalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Octal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-decimal-notation-menu" dense clickable @click="onSetDefaultDecimalNotation()">
                                    <div v-if="defaultDecimalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Decimal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-hexadecimal-notation-menu" dense clickable @click="onSetDefaultHexadecimalNotation()">
                                    <div v-if="defaultHexadecimalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Hexadecimal') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-result-notation-menu" clickable style="display:none;">
                        <q-item-section>{{ $t('Result notation') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-result-binary-notation-menu" dense clickable @click="onSetResultBinaryNotation()">
                                    <div v-if="resultBinaryMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Binary') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-octal-notation-menu" dense clickable @click="onSetResultOctalNotation()">
                                    <div v-if="resultOctalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Octal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-decimal-notation-menu" dense clickable @click="onSetResultDecimalNotation()">
                                    <div v-if="resultDecimalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Decimal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-hexadecimal-notation-menu" dense clickable @click="onSetResultHexadecimalNotation()">
                                    <div v-if="resultHexadecimalMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Hexadecimal') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-fraction-form-menu" clickable style="display:none;">
                        <q-item-section>{{ $t('Fraction form') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-fraction-form-proper-menu" dense clickable @click="onProperFractionForm()">
                                    <div v-if="properMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Proper') }}</q-item-section>
                                </q-item>
                                <q-item id="set-fraction-form-improper-menu" dense clickable @click="onImproperFractionForm()">
                                    <div v-if="improperMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Improper') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-complex-form-menu" clickable style="display:none;">
                        <q-item-section>{{ $t('Complex form') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-arithmetic-complex-form-menu" dense clickable @click="onArithmeticComplexForm()">
                                    <div v-if="arithmeticMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Arithmetic') }}</q-item-section>
                                </q-item>
                                <q-item id="set-trigonometric-complex-form-menu" dense clickable @click="onTrigonometricComplexForm()">
                                    <div v-if="trigonometricMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Trigonometric') }}</q-item-section>
                                </q-item>
                                <q-item id="set-exponential-complex-form-menu" dense clickable @click="onExponentialComplexForm()">
                                    <div v-if="exponentialMenuChecked">&check;</div>
                                    <q-item-section>{{ $t('Exponential') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-unit-menu" clickable style="display:none;" @click="onSetUnit()">
                        <q-item-section>{{ $t('Unit') }}</q-item-section>
                    </q-item>

                    <q-item id="graph-format" clickable style="display:none;" @click="onGraphFormat()">
                        <q-item-section>{{ $t('Graph format') }}</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>

            <div id="scroll-space">
                <q-spinner v-if="loading" color="primary" size="3em" :thickness="5" />
            </div>
        </div>
    </div>

    <q-resize-observer @resize="onResize" />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars */
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { api } from 'boot/boot'
import { Cookies, useQuasar, QMenu } from 'quasar'
import SetUnitDialog from 'layouts/SetUnitDialog.vue'
import ConfirmDialog from 'layouts/ConfirmDialog.vue'
import GraphFormatDialog from 'layouts/GraphFormatDialog.vue'
import PlotFormatDialog from 'layouts/PlotFormatDialog.vue'
import PromptDialog from 'layouts/PromptDialog.vue'

declare function UTF8ToString(ptr: number): string;
declare function UTF32ToString(ptr: number): string;
declare var Module: any;

interface PromptPos
{
    x: number;
    y: number;
}

const $q = useQuasar();
const store = useStore();
const router = useRouter();
const instance = getCurrentInstance();
const { t } = useI18n();

//refs
const contextMenuRef = ref<QMenu | null>(null);
const symbolicMenuOpen = ref(false);

const promptVisible = ref(false);
const promptItems = ref<string[]>([]);
const promptPos = ref<PromptPos>({ x: 0, y: 0 });
const jsonClipboard = ref('');
let handlePaste: ((e: ClipboardEvent) => void) | null = null;
let handleKeydown: ((e: KeyboardEvent) => void) | null = null;
const current_document = ref('');
const last_documents = ref<string[]>([]);
const downloading = ref(false);

//menu checked states
const autoMenuChecked = ref(false);
const realMenuChecked = ref(false);
const integerMenuChecked = ref(false);
const rationalMenuChecked = ref(false);
const complexMenuChecked = ref(false);
const defaultRadianMenuChecked = ref(false);
const defaultDegreeMenuChecked = ref(false);
const defaultGradMenuChecked = ref(false);
const resultRadianMenuChecked = ref(false);
const resultDegreeMenuChecked = ref(false);
const resultGradMenuChecked = ref(false);
const defaultBinaryMenuChecked = ref(false);
const defaultOctalMenuChecked = ref(false);
const defaultDecimalMenuChecked = ref(false);
const defaultHexadecimalMenuChecked = ref(false);
const resultBinaryMenuChecked = ref(false);
const resultOctalMenuChecked = ref(false);
const resultDecimalMenuChecked = ref(false);
const resultHexadecimalMenuChecked = ref(false);
const properMenuChecked = ref(false);
const improperMenuChecked = ref(false);
const arithmeticMenuChecked = ref(false);
const trigonometricMenuChecked = ref(false);
const exponentialMenuChecked = ref(false);
const symbolicRealMenuChecked = ref(false);
const symbolicRationalMenuChecked = ref(false);
const symbolicComplexMenuChecked = ref(false);

const loading = computed(() => store.state.editor.loading);

function getCanvas()
{
    return document.getElementById('canvas');
}

function canvasFocus()
{
    const c = getCanvas();
    if (c)
        c.focus();
}

function onResize()
{
    const scroll = document.getElementById('scroll-container');
    if (scroll)
    {
        window.dispatchEvent(new Event('resize'));
        const canvas = getCanvas();
        if (canvas)
            canvas.focus();
    }
    const editor = document.getElementById('editor');
    if (editor)
    {
        const standard_toolbar = document.getElementById('standard-toolbar');
        const algebra_toolbar = document.getElementById('algebra-toolbar');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        if (standard_toolbar && algebra_toolbar && header && footer)
        {
            editor.style.height = 'calc(' + window.innerHeight + 'px - ' +
                standard_toolbar.clientHeight.toString() + 'px - ' +
                algebra_toolbar.clientHeight.toString() + 'px - ' +
                header.clientHeight.toString() + 'px - ' +
                footer.clientHeight.toString() + 'px)';
        }
    }
}

function onPromptSelect(value: string)
{
    Module.cwrap('OnPromptSelected', 'void', ['string'])(value);
}

async function getClipboardPermission()
{
    try
    {
        await navigator.permissions.query({ name: 'clipboard-read' });
    }
    catch (err)
    {
        return false;
    }
    return true;
}

async function onCopy()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    Module.cwrap('OnCopy', 'void', [])();
    const clipboard_text = UTF32ToString(Module.cwrap('GetClipboardText', 'number', [])());
    const clipboard_json = UTF32ToString(Module.cwrap('GetClipboardJson', 'number', [])());
    try
    {
        if (navigator.userAgent.toLowerCase().includes('firefox'))
        {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([clipboard_text], { type: 'text/plain' })
                })
            ]);
            jsonClipboard.value = clipboard_json;
        }
        else
        {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([clipboard_text], { type: 'text/plain' }),
                    'web yutovo/elements': new Blob([clipboard_json], { type: 'web yutovo/elements' })
                })
            ]);
            jsonClipboard.value = '';
        }
    }
    catch (err)
    {
        jsonClipboard.value = clipboard_json;
    }
    canvasFocus();
}

async function onCut()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    Module.cwrap('OnCut', 'void', [])();
    const clipboard_text = UTF32ToString(Module.cwrap('GetClipboardText', 'number', [])());
    const clipboard_json = UTF32ToString(Module.cwrap('GetClipboardJson', 'number', [])());
    try
    {
        if (navigator.userAgent.toLowerCase().includes('firefox'))
        {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([clipboard_text], { type: 'text/plain' })
                })
            ]);
            jsonClipboard.value = clipboard_json;
        }
        else
        {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([clipboard_text], { type: 'text/plain' }),
                    'web yutovo/elements': new Blob([clipboard_json], { type: 'web yutovo/elements' })
                })
            ]);
            jsonClipboard.value = '';
        }
    }
    catch (err)
    {
        jsonClipboard.value = clipboard_json;
    }
    canvasFocus();
}

async function onPaste()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    Module.cwrap('SetClipboardText', 'void', ['string'])('');
    Module.cwrap('SetClipboardJson', 'void', ['string'])('');
    let imagePasted = false;
    try
    {
        if (navigator.userAgent.toLowerCase().includes('firefox') && jsonClipboard.value != '')
        {
            Module.cwrap('SetClipboardJson', 'void', ['string'])(jsonClipboard.value);
        }
        else
        {
            const data = await navigator.clipboard.read();
            for (let i = 0; i < data.length; i++)
            {
                if (data[i].types.includes('web yutovo/elements'))
                {
                    const blob = await data[i].getType('web yutovo/elements');
                    const text = await blob.text();
                    Module.cwrap('SetClipboardJson', 'void', ['string'])(text);
                }
                else if (data[i].types.includes('image/png'))
                {
                    const blob = await data[i].getType('image/png');
                    const arrayBuffer = await blob.arrayBuffer();
                    const snapshot = new Blob([arrayBuffer], { type: 'image/png' });
                    const dataUrl = await new Promise((resolve, reject) =>
                        {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(snapshot);
                        });
                    Module.cwrap('SetClipboardImage', 'void', ['string'])(dataUrl);
                    imagePasted = true;
                }
                else if (data[i].types.includes('image/jpeg') || data[i].types.includes('image/bmp'))
                {
                    const imageType = data[i].types.includes('image/jpeg') ? 'image/jpeg' : 'image/bmp';
                    const blob = await data[i].getType(imageType);
                    const arrayBuffer = await blob.arrayBuffer();
                    const pngBlob = await new Promise((resolve, reject) =>
                        {
                            const img = new Image();
                            img.onload = () =>
                            {
                                const canvas = document.createElement('canvas');
                                canvas.width = img.naturalWidth;
                                canvas.height = img.naturalHeight;
                                canvas.getContext('2d').drawImage(img, 0, 0);
                                canvas.toBlob(resolve, 'image/png');
                            };
                            img.onerror = reject;
                            img.src = URL.createObjectURL(new Blob([arrayBuffer], { type: imageType }));
                        });
                    const dataUrl = await new Promise((resolve, reject) =>
                        {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(pngBlob);
                        });
                    Module.cwrap('SetClipboardImage', 'void', ['string'])(dataUrl);
                    imagePasted = true;
                }
                else if (data[i].types.includes('text/plain'))
                {
                    const blob = await data[i].getType('text/plain');
                    const text = await blob.text();
                    Module.cwrap('SetClipboardText', 'void', ['string'])(text);
                }
            }
        }
    }
    catch (err)
    {
        Module.cwrap('SetClipboardJson', 'void', ['string'])(jsonClipboard.value);
    }
    Module.cwrap('OnPaste', 'void', [])();
    canvasFocus();
}

function onShowContextMenu()
{
    const copy_menu = document.getElementById('copy-menu');
    const can_copy = Module.cwrap('CanCopy', 'bool', [])();
    if (can_copy)
        copy_menu!.classList.remove('disabled');
    else
        copy_menu!.classList.add('disabled');

    const paste_menu = document.getElementById('paste-menu');
    let can_paste = false;
    try
    {
        if (navigator.userAgent.toLowerCase().includes('chrome') ||
            navigator.userAgent.toLowerCase().includes('firefox'))
        {
            navigator.clipboard.read().then(
                function(data)
                {
                    for (let i = 0; i < data.length; i++)
                    {
                        if (data[i].types.includes('web yutovo/elements') || data[i].types.includes('text/plain') ||
                            data[i].types.includes('image/png') || data[i].types.includes('image/jpeg') || data[i].types.includes('image/bmp'))
                        {
                            can_paste = true;
                            break;
                        }
                    }
                }).catch(
                function()
                {
                    can_paste = (jsonClipboard.value != '');
                });
        }
    }
    catch (err)
    {
        can_paste = (jsonClipboard.value != '');
    }
    can_paste = Module.cwrap('CanPaste', 'bool', [])() && can_paste;
    if (can_paste)
        paste_menu!.classList.remove('disabled');
    else
        paste_menu!.classList.add('disabled');

    const cut_menu = document.getElementById('cut-menu');
    const can_cut = Module.cwrap('CanCut', 'bool', [])();
    if (can_cut)
        cut_menu!.classList.remove('disabled');
    else
        cut_menu!.classList.add('disabled');

    const p = Module.cwrap('GetPresentAsMenu', 'int', [])();
    if (p != 0)
    {
        let m = document.getElementById('present-as-menu');
        m!.style.display = '';
        autoMenuChecked.value = p == 1;
        realMenuChecked.value = p == 2;
        integerMenuChecked.value = p == 3;
        rationalMenuChecked.value = p == 4;
        complexMenuChecked.value = p == 5;
        symbolicRealMenuChecked.value = p == 6;
        symbolicRationalMenuChecked.value = p == 7;
        symbolicComplexMenuChecked.value = p == 8;
        if (p == 1 || p == 2 || p == 5 || p == 6 || p == 8)
        {
            m = document.getElementById('set-precision-menu');
            m!.style.display = '';
            m = document.getElementById('set-exp-menu');
            m!.style.display = '';
            m = document.getElementById('set-default-angle-measure-menu');
            m!.style.display = '';
            const r = Module.cwrap('GetDefaultAngleMeasure', 'int', [])();
            defaultRadianMenuChecked.value = r == 0;
            defaultDegreeMenuChecked.value = r == 1;
            defaultGradMenuChecked.value = r == 2;
            m = document.getElementById('set-result-angle-measure-menu');
            m!.style.display = '';
            const r2 = Module.cwrap('GetResultAngleMeasure', 'int', [])();
            resultRadianMenuChecked.value = r2 == 0;
            resultDegreeMenuChecked.value = r2 == 1;
            resultGradMenuChecked.value = r2 == 2;
            const r3 = Module.cwrap('GetResultType', 'int', [])();
            if (r3 == 4 || r3 == 9)
            {
                m = document.getElementById('set-complex-form-menu');
                m!.style.display = '';
                const r4 = Module.cwrap('GetComplexForm', 'int', [])();
                arithmeticMenuChecked.value = r4 == 0;
                trigonometricMenuChecked.value = r4 == 1;
                exponentialMenuChecked.value = r4 == 2;
            }
        }
        if (p == 3)
        {
            let m = document.getElementById('set-default-notation-menu');
            m!.style.display = '';
            const r = Module.cwrap('GetDefaultNotation', 'int', [])();
            defaultBinaryMenuChecked.value = r == 0;
            defaultOctalMenuChecked.value = r == 1;
            defaultDecimalMenuChecked.value = r == 2;
            defaultHexadecimalMenuChecked.value = r == 3;
            m = document.getElementById('set-result-notation-menu');
            m!.style.display = '';
            const r2 = Module.cwrap('GetResultNotation', 'int', [])();
            resultBinaryMenuChecked.value = r2 == 0;
            resultOctalMenuChecked.value = r2 == 1;
            resultDecimalMenuChecked.value = r2 == 2;
            resultHexadecimalMenuChecked.value = r2 == 3;
        }
        if (p == 4 || p == 7)
        {
            const m = document.getElementById('set-fraction-form-menu');
            m!.style.display = '';
            const r = Module.cwrap('GetFractionForm', 'int', [])();
            properMenuChecked.value = r == 0;
            improperMenuChecked.value = r == 1;
        }
        if (p == 5 || p == 8)
        {
            const m = document.getElementById('set-complex-form-menu');
            m!.style.display = '';
            const r = Module.cwrap('GetComplexForm', 'int', [])();
            arithmeticMenuChecked.value = r == 0;
            trigonometricMenuChecked.value = r == 1;
            exponentialMenuChecked.value = r == 2;
        }
    }
    const m_unit = document.getElementById('set-unit-menu');
    if (Module.cwrap('HasUnit', 'int', [])())
        m_unit!.style.display = '';
    const m_graph = document.getElementById('graph-format');
    if (Module.cwrap('IsGraph', 'int', [])())
        m_graph!.style.display = '';
    if (contextMenuRef.value)
        contextMenuRef.value.updatePosition();
}

function onCloseContextMenu()
{
    canvasFocus();
}

function onPresentAsAuto()
{
    Module.cwrap('OnPresentAsAuto', 'void', [])();
}

function onPresentAsReal()
{
    Module.cwrap('OnPresentAsReal', 'void', [])();
}

function onPresentAsInteger()
{
    Module.cwrap('OnPresentAsInteger', 'void', [])();
}

function onPresentAsRational()
{
    Module.cwrap('OnPresentAsRational', 'void', [])();
}

function onPresentAsComplex()
{
    Module.cwrap('OnPresentAsComplex', 'void', [])();
}

function onPresentAsSymbolicReal()
{
    Module.cwrap('OnPresentAsSymbolicReal', 'void', [])();
    symbolicMenuOpen.value = false;
    contextMenuRef.value?.hide();
}

function onPresentAsSymbolicRational()
{
    Module.cwrap('OnPresentAsSymbolicRational', 'void', [])();
    symbolicMenuOpen.value = false;
    contextMenuRef.value?.hide();
}

function onPresentAsSymbolicComplex()
{
    Module.cwrap('OnPresentAsSymbolicComplex', 'void', [])();
    symbolicMenuOpen.value = false;
    contextMenuRef.value?.hide();
}

function onProperFractionForm()
{
    Module.cwrap('OnFractionForm', 'void', ['int'])(0);
}

function onImproperFractionForm()
{
    Module.cwrap('OnFractionForm', 'void', ['int'])(1);
}

function onArithmeticComplexForm()
{
    Module.cwrap('OnComplexForm', 'void', ['int'])(0);
}

function onTrigonometricComplexForm()
{
    Module.cwrap('OnComplexForm', 'void', ['int'])(1);
}

function onExponentialComplexForm()
{
    Module.cwrap('OnComplexForm', 'void', ['int'])(2);
}

function onSetPrecision()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    const p = Module.cwrap('GetPrecision', 'int', [])();
    if (p == -1)
        return;
    $q.dialog({
        title: '<div class="text-blue text-h5">' + t('Precision') + '</div>',
        prompt: { model: p, inputmode: 'numeric', mask: '##', min: 1, max: 99, step: 1 },
        html: true,
        cancel: true,
        persistent: false
    }).onOk(function(res: number)
    {
        Module.cwrap('OnSetPrecision', 'void', ['int'])(res);
    });
    canvasFocus();
}

function onSetExp()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    const p = Module.cwrap('GetExp', 'int', [])();
    if (p == -1)
        return;
    $q.dialog({
        title: '<div class="text-blue text-h5">' + t('Exponent order') + '</div>',
        prompt: { model: p, inputmode: 'numeric', mask: '##', min: 1, max: 99, step: 1 },
        html: true,
        cancel: true,
        persistent: false
    }).onOk(function(res: number)
    {
        Module.cwrap('OnSetExp', 'void', ['int'])(res);
    });
    canvasFocus();
}

function onSetDefaultRadianAngleMeasure()
{
    Module.cwrap('OnDefaultAngleMeasure', 'void', ['int'])(0);
}

function onSetDefaultDegreeAngleMeasure()
{
    Module.cwrap('OnDefaultAngleMeasure', 'void', ['int'])(1);
}

function onSetDefaultGradAngleMeasure()
{
    Module.cwrap('OnDefaultAngleMeasure', 'void', ['int'])(2);
}

function onSetResultRadianAngleMeasure()
{
    Module.cwrap('OnResultAngleMeasure', 'void', ['int'])(0);
}

function onSetResultDegreeAngleMeasure()
{
    Module.cwrap('OnResultAngleMeasure', 'void', ['int'])(1);
}

function onSetResultGradAngleMeasure()
{
    Module.cwrap('OnResultAngleMeasure', 'void', ['int'])(2);
}

function onSetDefaultBinaryNotation()
{
    Module.cwrap('OnDefaultNotation', 'void', ['int'])(0);
}

function onSetDefaultOctalNotation()
{
    Module.cwrap('OnDefaultNotation', 'void', ['int'])(1);
}

function onSetDefaultDecimalNotation()
{
    Module.cwrap('OnDefaultNotation', 'void', ['int'])(2);
}

function onSetDefaultHexadecimalNotation()
{
    Module.cwrap('OnDefaultNotation', 'void', ['int'])(3);
}

function onSetResultBinaryNotation()
{
    Module.cwrap('OnResultNotation', 'void', ['int'])(0);
}

function onSetResultOctalNotation()
{
    Module.cwrap('OnResultNotation', 'void', ['int'])(1);
}

function onSetResultDecimalNotation()
{
    Module.cwrap('OnResultNotation', 'void', ['int'])(2);
}

function onSetResultHexadecimalNotation()
{
    Module.cwrap('OnResultNotation', 'void', ['int'])(3);
}

function onSetUnit()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    $q.dialog({
        component: SetUnitDialog,
        parent: instance!.proxy,
        apiResponse: (instance!.proxy as any).resp
    });
    canvasFocus();
}

function onGraphFormat()
{
    if (contextMenuRef.value)
        contextMenuRef.value.hide();
    const format_json = UTF8ToString(Module.cwrap('GetGraphFormat', 'number')());
    if (format_json == '')
        return;
    const json = JSON.parse(format_json);
    $q.dialog({
        component: GraphFormatDialog,
        parent: instance!.proxy,
        apiResponse: (instance!.proxy as any).resp,
        componentProps: {
            width_prop: json.width,
            height_prop: json.height,
            color_prop: json.color,
            grid_width_prop: json.grid_width
        }
    });
    canvasFocus();
}

function plotFormatDialog(event: any)
{
    const color = event.detail.color;
    const width = event.detail.width;
    $q.dialog({
        component: PlotFormatDialog,
        parent: instance!.proxy,
        apiResponse: (instance!.proxy as any).resp,
        componentProps: { width_prop: width, color_prop: color }
    });
    canvasFocus();
}

async function checkDocumentChanged()
{
    if (Module.cwrap('IsChanged', 'bool', [])())
    {
        try
        {
            const dialog = $q.dialog({
                component: ConfirmDialog,
                componentProps: { title: t('Confirm'), message: t('Save the document?') }
            });
            const result = await new Promise(function(resolve)
            {
                dialog.onOk(function(data: string)
                {
                    resolve(data);
                });
            });
            if (result === 'yes')
            {
                Module.cwrap('OnSave', 'void', ['int'])(Cookies.has('document_id') ? Cookies.get('document_id') : 0);
                return false;
            }
            else if (result === 'no')
            {
                store.commit('editor/setDocumentChanged', false);
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (error)
        {
            return false;
        }
    }
    return true;
}

async function getLastDocument()
{
    let id = 0;
    if (last_documents.value.length > 0)
    {
        id = last_documents.value.pop()!;
        for (let j = 0; j < last_documents.value.length;)
        {
            if (last_documents.value[j] == id)
                last_documents.value.splice(j, 1);
            else
                ++j;
        }
    }
    return id;
}

function newDocument(event: any)
{
    console.log('newDocument');
    window.newDocument = true;
    checkDocumentChanged().then(function(ok)
    {
        if (!ok)
            return;
        window.newDocument = false;
        const langToInt = function(l: string)
        {
            if (l === 'en')
                return 1;
            if (l === 'ru')
                return 2;
            if (l === 'es')
                return 3;
            if (l === 'pt_BR')
                return 4;
            return 0;
        };
        api.post('/service/new-document',
            event.detail == null ? 
                {
                    language: langToInt(store.state.editor.language)
                }
                : 
                {
                    json: event.detail.json,
                    name: event.detail.name
                },
                {
                    headers:
                    {
                        access_token: store.state.login.access_token
                    }
                })
            .then(
                function(r: any)
                {
                    window.dispatchEvent(new CustomEvent('loadDocument',
                        {
                            detail:
                            {
                                document_id: r.data.document_id,
                                last_document: Cookies.has('document_id') ? Cookies.get('document_id') : 0,
                                check_changed: false
                            }
                        }));
                    store.commit('editor/setDocumentChanged', false);
                    window.dispatchEvent(new CustomEvent('listDocuments', {}))
                })
                .catch(
                function(resp: any)
                {
                    console.log(resp);
                });
    });
}

function saveDocument(event: any)
{
    console.log('saveDocument');
    if (downloading.value)
    {
        const s = store;
        let filename = s.state.editor.document_name;
        if (!filename)
            return;
        if (filename.slice(-4) != '.yut')
            filename += '.yut';
        const arr = Uint8Array.from(event.detail.json);
        const blob = new Blob([arr], { type: 'application/octet-stream' });
        if (window.navigator.msSaveOrOpenBlob)
        {
            window.navigator.msSaveBlob(blob, filename);
        }
        else
        {
            const elem = document.createElement('a');
            elem.href = URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
        downloading.value = false;
        return;
    }
    const arr = Uint8Array.from(event.detail.json);
    const json = JSON.parse(new TextDecoder().decode(arr));
    const s = store;
    const r = router;
    const t2 = t;
    if (r.currentRoute.value.path.substring(0, 8) == '/library')
    {
        const route = r.currentRoute.value;
        let doc = route.params.language + '/';
        if (typeof route.params.dir1 !== 'undefined')
            doc += route.params.dir1 + '/';
        if (typeof route.params.dir2 !== 'undefined')
            doc += route.params.dir2 + '/';
        if (typeof route.params.dir3 !== 'undefined')
            doc += route.params.dir3 + '/';
        doc += route.params.filename;
        doc = doc.replaceAll(/\\/g, '/');
        doc = doc.substring(2);
        if (doc.startsWith('/'))
            doc = doc.substring(1);
        const savePayload = {
            document: doc,
            json: JSON.stringify(json),
            language: route.params.language
        };
        api.post('/service/save-library-document', savePayload,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'access_token': s.state.login.access_token
                }
            })
            .then(
            function(resp: any)
            {
                r.push({ path: '/document/' + resp.data.document_id });
                Cookies.set('document_id', resp.data.document_id, { path: '/', expires: '1d' });
                window.dispatchEvent(new CustomEvent('updateDocumentName',
                    {
                        detail:
                        {
                            document_id: resp.data.document_id
                        }
                    }));
                canvasFocus();
                s.commit('editor/setDocumentChanged', false);
                window.Module.cwrap('SetChanged', 'void', ['bool'])(false);
                window.dispatchEvent(new CustomEvent('listDocuments', {}));
            })
            .catch(
            function(resp: any)
            {
                console.log('save-library-document catch:', resp);
                if (resp.response && resp.response.data)
                    console.log('server response data:', JSON.stringify(resp.response.data));
                alert(t2('Error saving the library document'));
            });
    }
    else
    {
        api.post('/service/save-document', json, { headers: { access_token: s.state.login.access_token } })
            .then(
            function(resp: any)
            {
                r.push({ path: '/document/' + resp.data.document_id });
                Cookies.set('document_id', resp.data.document_id, { path: '/', expires: '1d' });
                window.dispatchEvent(new CustomEvent('updateDocumentName', 
                    {
                        detail:
                        {
                            document_id: resp.data.document_id
                        }
                    }));
                canvasFocus();
                s.commit('editor/setDocumentChanged', false);
                window.Module.cwrap('SetChanged', 'void', ['bool'])(false);
                if (window.newDocument)
                {
                    window.dispatchEvent(new CustomEvent('newDocument'));
                    window.newDocument = false;
                }
                else if (window.load_document_id)
                {
                    window.dispatchEvent(new CustomEvent('loadDocument',
                        {
                            detail:
                            {
                                document_id: window.load_document_id,
                                last_document: Cookies.get('document_id')
                            }
                        }));
                    window.load_document_id = 0;
                }
                window.dispatchEvent(new CustomEvent('listDocuments', {}));
            })
            .catch(
            function(resp: any)
            {
                console.log(resp);
                if (resp.response && resp.response.status == 403)
                {
                    window.dispatchEvent(new CustomEvent('newDocument',
                        {
                            detail:
                            {
                                json: json
                            }
                        }));
                }
                else
                {
                    alert(t2('Error saving the document'));
                }
                window.dispatchEvent(new CustomEvent('listDocuments', {}));
            });
    }
}

function loadDocumentById(event: any)
{
    const id = event.detail.document_id;
    api.post('/service/load-document', 
        {
            document_id: id
        },
        {
            headers:
            {
                access_token: store.state.login.access_token
            }
        })
        .then(
        function(resp: any)
        {
            Module.cwrap('OnOpen', 'void', ['string', 'int'])(JSON.stringify(resp.data), id);
            canvasFocus();
        })
        .catch(
        function(resp: any)
        {
            Cookies.remove('document_id', { path: '/' });
            alert('Document not found');
            getLastDocument().then(
            function(_id)
            {
                if (_id == 0 || _id == id)
                    window.dispatchEvent(new CustomEvent('newDocument'));
                else
                    window.dispatchEvent(new CustomEvent('loadDocument',
                        {
                            detail:
                            {
                                document_id: _id
                            }
                        }));
            });
        });
}

async function loadDocument(event: any)
{
    let check_changed = true;
    if (typeof event.detail.check_changed !== 'undefined')
        check_changed = event.detail.check_changed;
    if (check_changed)
    {
        window.load_document_id = event.detail.document_id;
        if (!(await checkDocumentChanged()))
            return;
        window.load_document_id = 0;
    }
    current_document.value = '';
    window.library_document = '';
    if (event.detail.name)
    {
        api.post('/service/get-document-id', 
            {
                name: event.detail.name
            },
            {
                headers:
                {
                    access_token: store.state.login.access_token
                }
            })
            .then(
            function(resp: any)
            {
                window.dispatchEvent(new CustomEvent('loadDocumentById',
                    {
                        detail:
                        {
                            document_id: resp.data.document_id
                        }
                    }));
            })
            .catch(
            function()
            {
                alert('Document not found');
            });
    }
    else
    {
        window.dispatchEvent(new CustomEvent('loadDocumentById',
            {
                detail:
                {
                    document_id: event.detail.document_id
                }
            }));
    }
}

function loadLibraryDocument(event: any)
{
    const doc = event.detail.document;
    let language = event.detail.language;
    if (doc == null)
        return;
    current_document.value = doc;
    if (language == 'undefined')
        language = store.state.editor.language == '' ? 'en' : store.state.editor.language;
    api.post('/service/load-library-document',
        {
            document: doc,
            language: language
        },
        {
            headers:
            {
                access_token: store.state.login.access_token
            }
        })
        .then(
        function(resp: any)
        {
            const json = JSON.stringify(resp.data);
            let i = 0;
            for (; i < json.length - 1024 * 10; i += 1024 * 10)
            {
                window.Module.cwrap('OnLibraryFilePart', 'void', ['string', 'int', 'int'])(json.substr(i, 1024 * 10), 0, 0);
            }
            window.Module.cwrap('OnLibraryFilePart', 'void', ['string', 'int', 'int'])(json.substr(i), 0, 1);
            canvasFocus();
        })
        .catch(
        function()
        {
            alert('Error loading the library document');
        });
}

function includeDocument(event: any)
{
    const name = event.detail.name;
    const language = store.state.editor.language == '' ? 'en' : store.state.editor.language;
    api.post('/service/load-include-document',
        {
            name: name,
            current_document: current_document.value,
            language: language
        },
        {
            headers:
            {
                access_token: store.state.login.access_token
            }
        })
        .then(
        function(resp: any)
        {
            window.Module.cwrap('OnOpenInclude', 'void', ['string', 'int'])(JSON.stringify(resp.data), event.detail.document_id);
            canvasFocus();
        })
        .catch(
        function()
        {
            alert('Error loading the include document');
        });
}

function loadResult(event: any)
{
    const last_document_id = Cookies.has('document_id') ? Cookies.get('document_id') : 0;
    const id = event.detail.document_id;
    const config = event.detail.config;
    if (event.detail.result == 0)
    {
        if (id == 0)
        {
            window.library_document = current_document.value;
            window.dispatchEvent(new CustomEvent('updateDocumentName',
                {
                    detail:
                    {
                        name: current_document.value
                    }
                }));
            window.language = store.state.editor.language == '' ? 'en' : store.state.editor.language;
            Cookies.remove('document_id', { path: '/' });
        }
        else
        {
            Cookies.set('document_id', id, { path: '/', expires: '1d' });
            router.push({ path: '/document/' + id });
            window.dispatchEvent(new CustomEvent('updateDocumentName',
                {
                    detail:
                    {
                        document_id: id
                    }
                }));
            window.library_document = '';
            window.user_document = id;
            if (last_document_id != 0)
                last_documents.value.push(last_document_id);
        }
        window.loading = true;
        store.commit('editor/setConfig', JSON.parse(config));
    }
    else
    {
        alert('Error loading the document');
        store.commit('editor/setConfig', JSON.parse('{}'));
    }
}

function updateDocumentName(event: any)
{
    const s = store;
    const r = router;
    if (event.detail.name != undefined && event.detail.name !== '')
    {
        api.post('/service/get-document-name',
            {
                name: event.detail.name,
                lang: store.state.editor.language
            },
            {
                headers:
                {
                    access_token: s.state.login.access_token
                }
            })
            .then(
            function(resp: any)
            {
                const n = resp.data.name;
                if (n !== event.detail.name)
                    r.push({ path: '/library/' + s.state.editor.language + n.replaceAll(/\\/g, '/') });
                s.commit('editor/setDocumentName', n);
            })
        return;
    }
    api.post('/service/get-document-name',
        {
            document_id: event.detail.document_id
        },
        {
            headers:
            {
                access_token: s.state.login.access_token
            }
        })
        .then(
        function(resp: any)
        {
            s.commit('editor/setDocumentName', resp.data.name);
        })
}

function translateString(event: any)
{
    Module.cwrap('OnTranslate', 'void', ['string'])(t(event.detail.str));
}

function solverAction(event: any)
{
    api.post('/service/solver-action', JSON.parse(event.detail.json), {})
        .catch(function() { /* ignore */ });
}

function documentChanged(event: any)
{
    store.commit('editor/setDocumentChanged', event.detail.changed);
}

function exportHtml(event: any)
{
    const html = event.detail.html;
    let filename = store.state.editor.document_name;
    if (!filename)
        return;
    if (filename.slice(-4) != '.yut')
        filename += '.html';
    else
        filename = filename.slice(0, -4) + '.html';
    const blob = new Blob([new TextEncoder().encode(html)], { type: 'text/html;charset=utf-8' });
    const elem = document.createElement('a');
    elem.href = URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

function exportPdf(event: any)
{
    const blob = event.detail.pdf;
    let filename = store.state.editor.document_name;
    if (!filename)
        return;
    if (filename.slice(-4) != '.yut')
        filename += '.pdf';
    else
        filename = filename.slice(0, -4) + '.pdf';
    const elem = document.createElement('a');
    elem.href = URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

function openDocument()
{
    if (Cookies.has('document_id'))
        window.dispatchEvent(new CustomEvent('loadDocument',
            {
                detail:
                {
                    document_id: Cookies.get('document_id')
                }
            }));
}

function showPrompt(event: any)
{
    promptVisible.value = false;
    const data = JSON.parse(event.detail);
    promptItems.value = data.items;
    promptPos.value = { x: data.x, y: data.y };
    promptVisible.value = true;
    canvasFocus();
}

function hidePrompt()
{
    promptVisible.value = false;
    canvasFocus();
}

function setScale(_event: any)
{
    // handled by canvas
}

function setStandardToolbar(_event: any)
{
    // handled by parent
}

function onNew()
{
    window.dispatchEvent(new CustomEvent('newDocument'));
}

function initModule()
{
    const r = router;
    const s = store;
    const q = $q;

    const Module = {
        canvas: (function()
        {
            const canvas = document.getElementById('canvas');
            canvas.addEventListener('webglcontextlost', 
                function(e: any)
                {
                    alert('WebGL context lost. You will need to reload the page.');
                    e.preventDefault();
                }, 
                false);
            return canvas;
        })(),

        onRuntimeInitialized: function()
        {
            const on_scroll = Module.cwrap('OnScroll', 'number', ['number', 'number']);
            const scroll = document.getElementById('scroll-container');
            scroll.addEventListener('scroll', 
                function()
                {
                    on_scroll(scroll.scrollLeft, scroll.scrollTop);
                });
            scroll.onclick = 
                function()
                {
                    const c = getCanvas();
                    if (c)
                        c.focus();
                };

            const canvas = getCanvas();
            canvas.addEventListener('focusin', 
                function()
                {
                    Module.cwrap('OnFocusIn', 'void', [])();
                });
            canvas.addEventListener('focusout', 
                function()
                {
                    Module.cwrap('OnFocusOut', 'void', [])();
                });

            handlePaste = function(e: ClipboardEvent)
                {
                    const activeEl = document.activeElement;
                    if (activeEl && activeEl.tagName === 'INPUT' || activeEl && activeEl.tagName === 'TEXTAREA')
                        return;

                    e.preventDefault();
                    e.stopPropagation();
                    const clipboardData = e.clipboardData;
                    if (!clipboardData)
                        return;

                    Module.cwrap('SetClipboardText', 'void', ['string'])('');
                    Module.cwrap('SetClipboardJson', 'void', ['string'])('');

                    let hasData = false;
                    let imageFound = false;
                    for (let i = 0; i < clipboardData.items.length; i++)
                    {
                        const item = clipboardData.items[i];
                        if (item.type === 'web yutovo/elements')
                        {
                            const text = clipboardData.getData('web yutovo/elements');
                            if (text)
                            {
                                Module.cwrap('SetClipboardJson', 'void', ['string'])(text);
                                hasData = true;
                                break;
                            }
                        }
                        else if (!imageFound && item.kind === 'file' && item.type.startsWith('image/'))
                        {
                            const file = item.getAsFile();
                            if (file)
                            {
                                const reader = new FileReader();
                                reader.onload = 
                                    function()
                                    {
                                        Module.cwrap('SetClipboardImage', 'void', ['string'])(reader.result as string);
                                        Module.cwrap('OnPaste', 'void', [])();
                                        canvasFocus();
                                    };
                                reader.readAsDataURL(file);
                                imageFound = true;
                                hasData = true;
                                break;
                            }
                        }
                    }
                    if (!hasData)
                    {
                        const text = clipboardData.getData('text/plain');
                        if (text)
                        {
                            Module.cwrap('SetClipboardText', 'void', ['string'])(text);
                            hasData = true;
                        }
                    }

                    if (hasData && !imageFound)
                    {
                        Module.cwrap('OnPaste', 'void', [])();
                        canvasFocus();
                    }
                };
            document.addEventListener('paste', handlePaste, false);

            const pasteTarget = document.createElement('div');
            pasteTarget.contentEditable = 'true';
            pasteTarget.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;';
            pasteTarget.id = 'paste-target';
            document.body.appendChild(pasteTarget);

            handleKeydown = 
                function(e: KeyboardEvent)
                {
                    const activeEl = document.activeElement;
                    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA'))
                        return;

                    if (e.shiftKey && e.key === 'Insert')
                    {
                        e.stopPropagation();
                        pasteTarget.focus();
                    }
                };
            document.addEventListener('keydown', handleKeydown, true);

            const doDocumentLoad = () =>
            {
                const route = r.currentRoute.value;
                if (Cookies.get('reset_document') === '1')
                {
                    window.dispatchEvent(new CustomEvent('openDocument', {}));
                }
                else if (route.path.substring(0, 8) == '/library')
                {
                    let doc = '/';
                    if (route.params.dir1)
                        doc += route.params.dir1 + '/';
                    if (route.params.dir2)
                        doc += route.params.dir2 + '/';
                    if (route.params.dir3)
                        doc += route.params.dir3 + '/';
                    doc += route.params.filename;
                    doc = doc.replaceAll(/\\/g, '/');
                    if (['en', 'ru', 'es', 'pt_BR'].includes(route.params.language))
                        s.commit('editor/setLanguage', route.params.language);
                    window.dispatchEvent(new CustomEvent('loadLibraryDocument',
                        {
                            detail:
                            {
                                document: doc,
                                language: route.params.language
                            }
                        }));
                }
                else if (route.path.substring(0, 9) != '/document')
                {
                    if (q.config.production && !Cookies.has('app_initialized'))
                    {
                        let lang = 'en';
                        if (navigator.language.startsWith('ru'))
                            lang = 'ru';
                        else if (navigator.language.startsWith('es'))
                            lang = 'es';
                        else if (navigator.language.startsWith('pt'))
                            lang = 'pt_BR';
                        let fp = '/Others/First page.yut';
                        if (lang == 'ru')
                            fp = '/Другое/Первая страница.yut';
                        else if (lang == 'es')
                            fp = '/Otros/Primera página.yut';
                        else if (lang == 'pt_BR')
                            fp = '/Outros/Primeira página.yut';
                        window.dispatchEvent(new CustomEvent('loadLibraryDocument',
                            {
                                detail:
                                {
                                    document: fp,
                                    language: lang
                                }
                            }));
                    }
                    else
                    {
                        window.dispatchEvent(new CustomEvent('openDocument', {}));
                    }
                }
                else
                {
                    window.dispatchEvent(new CustomEvent('openDocument', {}));
                }
            };

            (function doAuthThenDocumentLoad()
            {
                if (Cookies.has('refresh_token'))
                {
                    return api.post('/auth/refresh-token', {})
                        .then(
                        function(resp: any)
                        {
                            s.dispatch('login/updateAccessToken', resp.headers['access_token']);
                            s.commit('login/setLastError', '');
                            if (s.state.login.access_token)
                                return api.post('/service/get-user-settings', {}, { headers: { access_token: s.state.login.access_token } });
                        })
                        .then(
                        function(r2: any)
                        {
                            if (r2)
                                s.commit('editor/setSettings', r2.data.settings);
                        })
                        .catch(
                        function(error: any)
                        {
                            console.error('Auto-login failed:', error);
                            s.dispatch('login/updateAccessToken', '');
                            Cookies.remove('document_id');
                        });
                }
                return Promise.resolve();
            })().finally(
                function()
                {
                    doDocumentLoad();
                    canvas.focus();
                    Cookies.set('app_initialized', true, { path: '/', expires: '30d' });
                    if (Cookies.has('language'))
                        Cookies.set('language', Cookies.get('language'), { path: '/', expires: '30d' });
                    s.commit('editor/setLoading', false);
                });
        }
    };

    window.Module = Module;
    window.getText = 
        function()
        {
            return UTF32ToString(Module.cwrap('GetText', 'number', [])());
        };
}

function addListeners()
{
    const h = 
        function(ev: string, fn: any)
        {
            window.addEventListener(ev, fn, false);
        };
    h('newDocument', newDocument);
    h('saveDocument', saveDocument);
    h('openDocument', openDocument);
    h('loadDocument', loadDocument);
    h('loadDocumentById', loadDocumentById);
    h('loadLibraryDocument', loadLibraryDocument);
    h('includeDocument', includeDocument);
    h('loadResult', loadResult);
    h('updateDocumentName', updateDocumentName);
    h('translateString', translateString);
    h('solverAction', solverAction);
    h('plotFormatDialog', plotFormatDialog);
    h('documentChanged', documentChanged);
    h('exportHtml', exportHtml);
    h('exportPdf', exportPdf);
    h('showPrompt', showPrompt);
    h('hidePrompt', hidePrompt);
    h('setScale', setScale);
}

function removeListeners()
{
    const r = 
        function(ev: string, fn: any)
        {
            window.removeEventListener(ev, fn);
        };
    r('newDocument', newDocument);
    r('saveDocument', saveDocument);
    r('openDocument', openDocument);
    r('loadDocument', loadDocument);
    r('loadDocumentById', loadDocumentById);
    r('loadLibraryDocument', loadLibraryDocument);
    r('includeDocument', includeDocument);
    r('loadResult', loadResult);
    r('updateDocumentName', updateDocumentName);
    r('translateString', translateString);
    r('solverAction', solverAction);
    r('plotFormatDialog', plotFormatDialog);
    r('documentChanged', documentChanged);
    r('exportHtml', exportHtml);
    r('exportPdf', exportPdf);
    r('showPrompt', showPrompt);
    r('hidePrompt', hidePrompt);
    r('setScale', setScale);
}

onMounted(function()
{
    window.sockets = new Map();
    window.socket_id = 1;
    initModule();
    const s1 = document.createElement('script');
    s1.src = 'coi-serviceworker.js';
    s1.type = 'text/javascript';
    document.body.appendChild(s1);
    const s2 = document.createElement('script');
    s2.src = 'yutovo_web.js';
    s2.type = 'text/javascript';
    document.body.appendChild(s2);
    addListeners();
    setTimeout(onResize, 100);
});

onBeforeUnmount(function()
{
    removeListeners();
    if (handlePaste)
        document.removeEventListener('paste', handlePaste);
    if (handleKeydown)
        document.removeEventListener('keydown', handleKeydown, true);
});

defineExpose({
    last_documents,
    downloading,
    onResize,
    onCopy,
    onCut,
    onPaste,
    onPromptSelect,
    setStandardToolbar,
    onNew,
    openDocument,
    newDocument,
    saveDocument,
    loadDocument,
    loadDocumentById,
    loadLibraryDocument,
    includeDocument,
    loadResult,
    updateDocumentName,
    translateString,
    solverAction,
    plotFormatDialog,
    documentChanged,
    exportHtml,
    exportPdf,
    showPrompt,
    hidePrompt,
    setScale,
    checkDocumentChanged,
    getLastDocument,
    contextMenuRef,
    promptVisible,
    promptItems,
    promptPos
});
</script>

<style scoped>
.editor-container
{
    border: 0px;
    position: relative;
    width: 100%;
    overflow: hidden;
}

canvas.emscripten
{
    border: 0px none;
    background-color: white;
}

#canvas
{
    border: 0px none;
    background-color: white;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
}

#scroll-container
{
    border: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: scroll;
}

#scroll-space
{
}

.greek-letter-block
{
    border: 0px none;
    overflow: hidden;
}

.greek-letter
{
    size: 16px;
    width: 20px;
    border: 0px none;
    overflow: hidden;
}
</style>
