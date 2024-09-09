<template>
    <div class="q-pa-md q-gutter-y-md column items-start" id="standard-toolbar">
        <q-file style="display: none" v-model="yutovo_file_model" @update:model-value="onFileUpload" accept=".yut" ref="yutovo_file"></q-file>
        <q-btn-group id="editor-toolbar" flat square unelevated stretch>
            <q-btn size="14px" id="new-button" square dense @click="onNew();" icon="img:/images/standard/new.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('New document') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="upload-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onUpload();" 
                icon="img:/images/standard/open.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Upload document') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="save-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onSave();" 
                icon="img:/images/standard/save.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Save document') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="save-as-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onSaveAs();" 
                icon="img:/images/standard/save_as.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Save document as') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="download-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onDownload();" 
                icon="img:/images/standard/download.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Download document') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="rename-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onRename();" 
                icon="img:/images/standard/rename.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Rename document') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="delete-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onDelete();" 
                icon="img:/images/standard/delete.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Delete document') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="settings-button" square dense no-caps @click="onConfig();" icon="img:/images/standard/settings.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Settings') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="undo-button" square dense @click="onUndo();" icon="img:/images/standard/undo.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Undo') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="redo-button" square dense @click="onRedo();" icon="img:/images/standard/redo.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Redo') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="cut-button" square dense @click="onCut();" icon="img:/images/standard/cut.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Cut') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="copy-button" square dense @click="onCopy();" icon="img:/images/standard/copy.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Copy') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="paste-button" square dense @click="onPaste();" icon="img:/images/standard/paste.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Paste') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="code-button" square dense @click="onCode();" icon="img:/images/format/code.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert code') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="recalculate-button" square dense @click="onRecalculate();" icon="img:/images/format/recalculate.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Recalculate the document') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-select class="toolbar-select" v-model="paragraph_format_model" :options="paragraph_format" @update:model-value="onParagraphFormat();" 
                dense options-dense borderless>
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Paragraph format') }}</q-tooltip>
            </q-select>
            <q-separator vertical/>
            <q-select class="toolbar-select" v-model="font_family_model" :options="font_family" @update:model-value="onFontFamily();" 
                dense options-dense borderless>
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Font family') }}</q-tooltip>
            </q-select>
            <q-select class="toolbar-select" v-model="font_size_model" :options="font_size" @update:model-value="onFontSize();" 
                dense options-dense borderless>
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Font size') }}</q-tooltip>
            </q-select>
            <q-btn size="14px" id="bold-button" square dense :color="bold_button_color" @click="onBold();" icon="img:/images/format/bold.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Bold') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="italic-button" square dense :color="italic_button_color" @click="onItalic();" icon="img:/images/format/italic.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Italic') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="underline-button" square dense :color="underline_button_color" @click="onUnderline();" icon="img:/images/format/underline.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Underline') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="strikethrough-button" square dense :color="strikethrough_button_color" @click="onStrikethrough();" 
                icon="img:/images/format/strikethrough.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Strikethrough') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="text-color-button" square dense @click="onTextColor();" icon="img:/images/format/text_color.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Text color') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="text-bg-color-button" square dense @click="onTextBgColor();" icon="img:/images/format/bg_text_color.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Text background color') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="left-align-button" square dense :color="left_align_button_color" @click="onLeftAlign();" icon="img:/images/format/align_left.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Left align') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="center-align-button" square dense :color="center_align_button_color" @click="onCenterAlign();" icon="img:/images/format/align_center.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Center align') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="right-align-button" square dense :color="right_align_button_color" @click="onRightAlign();" icon="img:/images/format/align_right.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Right align') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="justify-align-button" square dense :color="justify_align_button_color" @click="onJustifyAlign();" icon="img:/images/format/align_justify.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Justify align') }}</q-tooltip>
            </q-btn>
        </q-btn-group>
    </div>

    <div class="q-pa-md q-gutter-y-md column items-start" id="algebra-toolbar">
        <q-btn-group id="algebra-toolbar" flat square unelevated stretch>
            <q-btn size="14px" square dense @click="onPlus();" icon="img:/images/algebra/plus.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Plus') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onMinus();" icon="img:/images/algebra/minus.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Minus') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onMultiply();" icon="img:/images/algebra/multiply.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Multiply') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onDivision();" icon="img:/images/algebra/division.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Division') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onPower();" icon="img:/images/algebra/power.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Power') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onSqrt();" icon="img:/images/algebra/sqrt.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Square root') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onNthRoot();" icon="img:/images/algebra/nth_root.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Root of degree') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onSubscript();" icon="img:/images/algebra/subscript.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Subscript') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onFences();" icon="img:/images/algebra/fences.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Fences') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onRadian();" icon="img:/images/algebra/radian.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Radian') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onDegree();" icon="img:/images/algebra/degree.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Degree') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onMinute();" icon="img:/images/algebra/minute.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Minute') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onSecond();" icon="img:/images/algebra/second.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Second') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onGrad();" icon="img:/images/algebra/grad.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Grad') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onSum();" icon="img:/images/algebra/sum.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Sum') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onProduct();" icon="img:/images/algebra/product.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Product') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onAssignment();" icon="img:/images/algebra/assignment.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Assignment') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onUnit();" icon="img:/images/algebra/unit.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Unit') }}</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onEquation();" icon="img:/images/algebra/equation.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Equation') }}</q-tooltip>
            </q-btn>
        </q-btn-group>
    </div>

    <div class="editor-container" id="editor" tabindex=0>
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex=-1 />
        
        <div id="scroll-container">
            <q-menu ref="contextMenu" touch-position square context-menu @hide='onCloseContextMenu();' @show='onShowContextMenu();'>
                <q-list dense style="min-width: 100px">
                    <q-item id="copy-menu" clickable @click='onCopy();'>
                        <q-item-section>Copy</q-item-section>
                    </q-item>
                    <q-item id="paste-menu" clickable @click='onPaste();'>
                        <q-item-section>Paste</q-item-section>
                    </q-item>
                    <q-item id="cut-menu" clickable @click='onCut();'>
                        <q-item-section>Cut</q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item auto-close id="present-as-menu" clickable style='display:none;'>
                        <q-item-section square>Present as</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="present-as-auto-menu" dense clickable @click='onPresentAsAuto();'>
                                    <div v-if="autoMenuChecked == true">&check;</div>
                                    <q-item-section>Auto</q-item-section>
                                </q-item>
                                <q-item id="present-as-real-menu" dense clickable @click='onPresentAsReal();'>
                                    <div v-if="realMenuChecked == true">&check;</div>
                                    <q-item-section>Real</q-item-section>
                                </q-item>
                                <q-item id="present-as-integer-menu" dense clickable @click='onPresentAsInteger();'>
                                    <div v-if="integerMenuChecked == true">&check;</div>
                                    <q-item-section>Integer</q-item-section>
                                </q-item>
                                <q-item id="present-as-rational-menu" dense clickable @click='onPresentAsRational();'>
                                    <div v-if="rationalMenuChecked == true">&check;</div>
                                    <q-item-section>Rational</q-item-section>
                                </q-item>
                                <q-item id="present-as-complex-menu" dense clickable @click='onPresentAsComplex();'>
                                    <div v-if="complexMenuChecked == true">&check;</div>
                                    <q-item-section>Complex</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-precision-menu" clickable style='display:none;' @click='onSetPrecision();'>
                        <q-item-section>Set precision</q-item-section>
                    </q-item>

                    <q-item id="set-exp-menu" clickable style='display:none;' @click='onSetExp();'>
                        <q-item-section>Set exponent order</q-item-section>
                    </q-item>

                    <q-item id="set-notation-menu" clickable style='display:none;'>
                        <q-item-section>Set notation</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-binary-notation-menu" dense clickable @click='onSetBinaryNotation();'>
                                    <div v-if="binaryMenuChecked == true">&check;</div>
                                    <q-item-section>Binary</q-item-section>
                                </q-item>
                                <q-item id="set-octal-notation-menu" dense clickable @click='onSetOctalNotation();'>
                                    <div v-if="octalMenuChecked == true">&check;</div>
                                    <q-item-section>Octal</q-item-section>
                                </q-item>
                                <q-item id="set-decimal-notation-menu" dense clickable @click='onSetDecimalNotation();'>
                                    <div v-if="decimalMenuChecked == true">&check;</div>
                                    <q-item-section>Decimal</q-item-section>
                                </q-item>
                                <q-item id="set-hexadecimal-notation-menu" dense clickable @click='onSetHexadecimalNotation();'>
                                    <div v-if="hexadecimalMenuChecked == true">&check;</div>
                                    <q-item-section>Hexadecimal</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-fraction-form-menu" clickable style='display:none;'>
                        <q-item-section>Set fraction form</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-fraction-form-proper-menu" dense clickable @click='onProperFractionForm();'>
                                    <div v-if="properMenuChecked == true">&check;</div>
                                    <q-item-section>Proper</q-item-section>
                                </q-item>
                                <q-item id="set-fraction-form-improper-menu" dense clickable @click='onImproperFractionForm();'>
                                    <div v-if="improperMenuChecked == true">&check;</div>
                                    <q-item-section>Improper</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-complex-form-menu" clickable style='display:none;'>
                        <q-item-section>Set complex form</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-arithmetic-complex-form-menu" dense clickable @click='onArithmeticComplexForm();'>
                                    <div v-if="arithmeticMenuChecked == true">&check;</div>
                                    <q-item-section>Arithmetic</q-item-section>
                                </q-item>
                                <q-item id="set-trigonometric-complex-form-menu" dense clickable @click='onTrigonometricComplexForm();'>
                                    <div v-if="trigonometricMenuChecked == true">&check;</div>
                                    <q-item-section>Trigonometric</q-item-section>
                                </q-item>
                                <q-item id="set-exponential-complex-form-menu" dense clickable @click='onExponentialComplexForm();'>
                                    <div v-if="exponentialMenuChecked == true">&check;</div>
                                    <q-item-section>Exponential</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-unit-menu" clickable style='display:none;' @click='onSetUnit();'>
                        <q-item-section>Set unit</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>

            <div id="scroll-space">
                <q-spinner v-if="loading == true" color="primary" size="3em" :thickness="5"/>
            </div>
        </div>
    </div>

    <q-resize-observer @resize="onResize" />
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Cookies } from 'quasar'
import { useRouter } from 'vue-router'
import { api } from 'boot/boot'
import { computed } from 'vue'
import ColorPickerDialog from 'layouts/ColorPickerDialog.vue'
import SaveAsDialog from 'layouts/SaveAsDialog.vue';
import RenameDialog from 'layouts/RenameDialog.vue';
import ConfigDialog from  'layouts/ConfigDialog.vue';
import SetUnitDialog from  'layouts/SetUnitDialog.vue';

export default
{
    name: 'YutovoWeb',

    created()
    {
        if (window.addEventListener)
        {
            window.addEventListener('setStandardToolbar', this.setStandardToolbar, false);
            window.addEventListener('onNew', this.onNew, false);
            window.addEventListener('onCopy', this.onCopy, false);
            window.addEventListener('onPaste', this.onPaste, false);
            window.addEventListener('onCut', this.onCut, false);
            window.addEventListener('newDocument', this.newDocument, false);
            window.addEventListener('saveDocument', this.saveDocument, false);
            window.addEventListener('openDocument', this.openDocument, false);
            window.addEventListener('loadDocument', this.loadDocument, false);
            window.addEventListener('loadTask', this.loadTask, false);
            window.addEventListener('loadResult', this.loadResult, false);
            window.addEventListener('updateDocumentName', this.updateDocumentName, false);
            window.addEventListener('translateString', this.translateString, false);
        }
        else
        {
            window.attachEvent('setStandardToolbar', this.setStandardToolbar);
            window.attachEvent('onNew', this.onNew);
            window.attachEvent('onCopy', this.onCopy);
            window.attachEvent('onPaste', this.onPaste);
            window.attachEvent('onCut', this.onCut);
            window.attachEvent('newDocument', this.newDocument);
            window.attachEvent('saveDocument', this.saveDocument);
            window.attachEvent('openDocument', this.openDocument);
            window.attachEvent('loadDocument', this.loadDocument);
            window.attachEvent('loadTask', this.loadTask);
            window.attachEvent('loadResult', this.loadResult);
            window.attachEvent('updateDocumentName', this.updateDocumentName, false);
            window.attachEvent('translateString', this.translateString);
        }
    },

    setup()
    {
        const style = ref({ width: '200px', height: '200px' });

        let s_js = document.createElement('script');
        s_js.setAttribute('type', 'text/javascript');
        s_js.setAttribute('src', 'coi-serviceworker.js');
        document.body.appendChild(s_js);

        let yutovo_web_js = document.createElement('script');
        yutovo_web_js.setAttribute('type', 'text/javascript');
        yutovo_web_js.setAttribute('src', 'yutovo_web.js');
        document.body.appendChild(yutovo_web_js);

        const store = useStore();
        const router = useRouter();

        var current_task;

        const yutovo_file_model = ref(null);
        const yutovo_file = ref(null);

        const autoMenuChecked = ref(null);
        const realMenuChecked = ref(null);
        const integerMenuChecked = ref(null);
        const rationalMenuChecked = ref(null);
        const complexMenuChecked = ref(null);

        const binaryMenuChecked = ref(null);
        const octalMenuChecked = ref(null);
        const decimalMenuChecked = ref(null);
        const hexadecimalMenuChecked = ref(null);

        const properMenuChecked = ref(null);
        const improperMenuChecked = ref(null);

        const arithmeticMenuChecked = ref(null);
        const trigonometricMenuChecked = ref(null);
        const exponentialMenuChecked = ref(null);

        const contextMenu = ref(null);

        var downloading = false;

        const loading = computed({
            get: () => (store.state.editor.loading)
        });

        var jsonClipboard = '';

        return {
            style,

            paragraph_format_model: ref('Text body'),
            paragraph_format: [
                'Text body', 'Header 1', 'Header 2', 'Header 3', 'Monospace', 'Code'
            ],

            font_family_model: ref('Arial'),
            font_family: [
                '', 'Arial', 'Courier New', 'Free Mono', 'Times New Roman', 'DejaVu Serif'
            ],

            font_size_model: ref('14'),
            font_size: [
                '', '6', '7', '8', '9', '10', '11', '12', '14', '16', '18', '20'
            ],

            bold_model: ref(null),

            store,
            router,

            onResize() {
                var scroll = document.getElementById('scroll-container');
                if (scroll)
                {
                    window.dispatchEvent(new Event('resize'));
                    if (canvas)
                        canvas.focus();
                }

                var editor = document.getElementById('editor');
                if (editor)
                {
                    var standard_toolbar = document.getElementById('standard-toolbar');
                    var algebra_toolbar = document.getElementById('algebra-toolbar');
                    var header = document.getElementById('header');
                    var footer = document.getElementById('footer');
                    editor.style.height = 'calc(' + window.innerHeight + 'px - ' + 
                        standard_toolbar.clientHeight.toString() + 'px - ' + 
                        algebra_toolbar.clientHeight.toString() + 'px - ' + 
                        header.clientHeight.toString() + 'px - ' + 
                        footer.clientHeight.toString() + 'px)';
                }
            },

            onFileUpload() {
                var reader = new FileReader();
                reader.onload = function() {
                    if (yutovo_file_model.value)
                    {
                        window.dispatchEvent(new CustomEvent('newDocument', 
                            {
                                detail:
                                {
                                    name: yutovo_file_model.value.name,
                                    json: reader.result
                                }
                            }));
                    }
                }
                reader.readAsText(yutovo_file_model.value);
            },

            last_documents: [],

            current_task,

            yutovo_file_model,
            yutovo_file,

            contextMenu,

            downloading,

            jsonClipboard,

            autoMenuChecked,
            realMenuChecked,
            integerMenuChecked,
            rationalMenuChecked,
            complexMenuChecked,

            binaryMenuChecked,
            octalMenuChecked,
            decimalMenuChecked,
            hexadecimalMenuChecked,

            properMenuChecked,
            improperMenuChecked,

            arithmeticMenuChecked,
            trigonometricMenuChecked,
            exponentialMenuChecked, 

            loading
        };
    },

    mounted()
    {
        window.sockets = new Map();
        window.socket_id = 1;
        var r = this.router;
        var s = this.store;

        this.getClipboardPermission().then(result => 
            {
                console.log('Clipboard permission: ', result);
            }
        );

        var Module =
            {
                preRun: [],
                postRun: [],
                
                canvas: (
                    function()
                    {
                        var canvas = document.getElementById('canvas');

                        // As a default initial behavior, pop up an alert when webgl context is lost. To make your
                        // application robust, you may want to override this behavior before shipping!
                        // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
                        canvas.addEventListener('webglcontextlost', 
                            function(e)
                            {
                                alert('WebGL context lost. You will need to reload the page.');
                                e.preventDefault();
                            }, 
                            false);
                        return canvas;
                    })(),
                
                onRuntimeInitialized: 
                    function()
                    {
                        const on_scroll = Module.cwrap('OnScroll', 'number', ['number', 'number']);

                        var scroll = document.getElementById('scroll-container');
                        scroll.addEventListener('scroll', (event) =>
                            {
                                if (event.type != 'scroll')
                                    return;
                                on_scroll(scroll.scrollLeft, scroll.scrollTop);
                            });
                        scroll.onclick = 
                            function()
                            {
                                canvas.focus();
                            }
                        
                        canvas.addEventListener('focusin', () => 
                            {
                                Module.cwrap('OnFocusIn', 'void', [])();
                            });
                        canvas.addEventListener('focusout', () => 
                            {
                                Module.cwrap('OnFocusOut', 'void', [])();
                            });
                        
                        var route = r.currentRoute.value;
                        if (route.path.substring(0, 5) == '/task')
                        {
                            var task = route.params.param.replaceAll(/\\/g, '/');
                            var lang = task.substring(0, 2);
                            task = task.substring(2);
                            window.dispatchEvent(new CustomEvent('loadTask', 
                                {
                                    'detail': 
                                    {
                                        task: task, 
                                        language: lang
                                    }
                                }));
                        }
                        else
                        {
                            if (!Cookies.has('app_initialized'))
                            {
                                console.log('Loading the first page ', s.state.editor.language);
                                window.dispatchEvent(new CustomEvent('loadTask', 
                                    {
                                        'detail': 
                                        {
                                            task: '/first_page', 
                                            language: navigator.language.startsWith('ru') ? 'ru' : 'en'
                                        }
                                    }));
                            }
                            else
                                window.dispatchEvent(new CustomEvent('openDocument', {})); //open the last document
                        }

                        canvas.focus();

                        Cookies.set('app_initialized', true, {path: '/', expires: '30d'});

                        if (Cookies.has('refresh_token'))
                        {
                            //auto-login
                            api.post('/auth/refresh-token', {},).then(
                                function(response)
                                {
                                    s.dispatch('login/updateAccessToken', response.headers['access_token']);
                                    s.commit('login/setLastError', '');

                                    //get user settings
                                    api.post('/service/get-settings', {},
                                        {
                                            headers:
                                            {
                                                access_token: s.state.login.access_token
                                            }
                                        }
                                        ).then(
                                            function(response)
                                            {
                                                console.log(response);
                                                s.commit('editor/setSettings', response.data);
                                            }
                                        ).catch(
                                            function(response)
                                            {
                                                console.log(response);
                                            }
                                        );
                                }
                            ).catch(
                                function(response)
                                {
                                    console.log(response);
                                    s.dispatch('login/updateAccessToken', '');
                                }
                            );
                        }
                        else
                        {
                            //set system language
                            s.commit('editor/setLanguage', '');
                        }

                        s.commit('editor/setLoading', false);
                    }
            };
        
        window.Module = Module;

        window.getText = function()
        {
            return UTF32ToString(Module.cwrap('GetText', 'number', [])());
        }
    },

    data()
    {
        return {
            bold_button_color: 'white',
            italic_button_color: 'white',
            underline_button_color: 'white',
            strikethrough_button_color: 'white',
            text_color: '#000000',
            text_bg_color: '#ffffff',
            left_align_button_color: 'white',
            center_align_button_color: 'white',
            right_align_button_color: 'white',
            justify_align_button_color: 'white',
        }
    },

    watch:
    {
        'store.state.editor.settings': function()
        {
            //update all but language and result settings
            var c = JSON.parse(JSON.stringify(this.store.state.editor.settings));
            delete c['language'];
            delete c['auto_result'];
            delete c['real_result'];
            delete c['integer_result'];
            delete c['rational_result'];
            delete c['complex_result'];
            Module.cwrap('OnSettings', 'void', ['string'])(JSON.stringify(c));
            canvas.focus();
        },

        'store.state.editor.config': function()
        {
            var c = JSON.parse(JSON.stringify(this.store.state.editor.config));
            Module.cwrap('OnConfig', 'void', ['string'])(JSON.stringify(c));
            canvas.focus();
        }
    },

    methods:
    {
        async setStandardToolbar(event)
        {
            this.paragraph_format_model = event.detail.paragraph_format;
            this.font_family_model = event.detail.font_family;
            this.font_size_model = event.detail.font_size;
            this.bold_button_color = (event.detail.bold == 1 ? 'blue' : 'white');
            this.italic_button_color = (event.detail.italic == 1 ? 'blue' : 'white');
            this.underline_button_color = (event.detail.underline == 1 ? 'blue' : 'white');
            this.strikethrough_button_color = (event.detail.strikethrough == 1 ? 'blue' : 'white');
            this.text_color = event.detail.text_color;
            this.text_bg_color = event.detail.text_bg_color;
            this.left_align_button_color = (event.detail.left_align == 1 ? 'blue' : 'white');
            this.center_align_button_color = (event.detail.center_align == 1 ? 'blue' : 'white');
            this.right_align_button_color = (event.detail.right_align == 1 ? 'blue' : 'white');
            this.justify_align_button_color = (event.detail.justify_align == 1 ? 'blue' : 'white');

            var button = document.getElementById('copy-button');
            button.disabled = !Module.cwrap('CanCopy', 'bool', [])();

            var can_paste = false;
            if (await this.getClipboardPermission())
            {
                try
                {
                    await navigator.clipboard.read().then(data => {
                        for (let i = 0; i < data.length; i++)
                        {
                            if (data[i].types.includes('web yutovo/elements') || data[i].types.includes('text/plain'))
                            {
                                can_paste = true;
                                break;
                            }
                        }}
                        ).catch(
                            function()
                            {
                                can_paste = (this.jsonClipboard != ''); //in case of locked clipboard
                            }
                        );
                }
                catch (err)
                {
                    can_paste = (this.jsonClipboard != ''); //in case of locked clipboard
                }
            }
            else
            {
                can_paste = (this.jsonClipboard != '');
            }

            button = document.getElementById('undo-button');
            button.disabled = !(Module.cwrap('CanUndo', 'bool', [])());

            button = document.getElementById('redo-button');
            button.disabled = !(Module.cwrap('CanRedo', 'bool', [])());

            button = document.getElementById('paste-button');
            button.disabled = !(Module.cwrap('CanPaste', 'bool', [])() && can_paste);

            button = document.getElementById('cut-button');
            button.disabled = !(Module.cwrap('CanCut', 'bool', [])());

            button = document.getElementById('bold-button');
            button.disabled = (event.detail.bold < 0);

            button = document.getElementById('italic-button');
            button.disabled = (event.detail.italic < 0);

            button = document.getElementById('underline-button');
            button.disabled = (event.detail.underline < 0);

            button = document.getElementById('strikethrough-button');
            button.disabled = (event.detail.strikethrough < 0);

            button = document.getElementById('text-color-button');
            button.disabled = (this.text_color == '');

            button = document.getElementById('text-bg-color-button');
            button.disabled = (this.text_bg_color == '');

            button = document.getElementById('save-as-button');
            button.disabled = !Cookies.has('document_id') || this.store.state.login.login == '';

            button = document.getElementById('rename-button');
            button.disabled = !Cookies.has('document_id') || this.store.state.login.login == '';

            button = document.getElementById('delete-button');
            button.disabled = !Cookies.has('document_id') || this.store.state.login.login == '';

            document.title = this.$t('Yutovo');
        },

        onCode()
        {
            Module.cwrap('OnCode', 'void', [])();
            canvas.focus();
        },

        onRecalculate()
        {
            Module.cwrap('OnRecalculate', 'void', [])();
            canvas.focus();
        },

        onParagraphFormat()
        {
            Module.cwrap('OnParagraphFormat', 'void', ['string'])(this.paragraph_format_model);
            canvas.focus();
        },

        onFontFamily()
        {
            Module.cwrap('OnFontFamily', 'void', ['string'])(this.font_family_model);
            canvas.focus();
        },

        onFontSize()
        {
            Module.cwrap('OnFontSize', 'void', ['string'])(this.font_size_model);
            canvas.focus();
        },

        onBold()
        {
            if (this.bold_button_color == 'blue')
                this.bold_button_color = 'white';
            else
                this.bold_button_color = 'blue';
            Module.cwrap('OnBold', 'void', [])(this.bold_button_color == 'blue');
            canvas.focus();
        },

        onItalic()
        {
            if (this.italic_button_color == 'blue')
                this.italic_button_color = 'white';
            else
                this.italic_button_color = 'blue';
            Module.cwrap('OnItalic', 'void', [])(this.italic_button_color == 'blue');
            canvas.focus();
        },

        onUnderline()
        {
            if (this.underline_button_color == 'blue')
                this.underline_button_color = 'white';
            else
                this.underline_button_color = 'blue';
            Module.cwrap('OnUnderline', 'void', [])(this.underline_button_color == 'blue');
            canvas.focus();
        },

        onStrikethrough()
        {
            if (this.strikethrough_button_color == 'blue')
                this.strikethrough_button_color = 'white';
            else
                this.strikethrough_button_color = 'blue';
            Module.cwrap('OnStrikethrough', 'void', [])(this.strikethrough_button_color == 'blue');
            canvas.focus();
        },

        onTextColor()
        {
            if (this.text_color == '')
                return;
            this.store.commit('editor/setDialogColor', this.text_color);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                Module.cwrap('OnTextColor', 'void', ['string'])(this.store.state.editor.dialog_color);
            })
            canvas.focus();
        },

        onTextBgColor()
        {
            if (this.text_bg_color == '')
                return;
            this.store.commit('editor/setDialogColor', this.text_bg_color);
            this.$q.dialog({
                component: ColorPickerDialog
            })
            .onOk(() => {
                Module.cwrap('OnTextBgColor', 'void', ['string'])(this.store.state.editor.dialog_color);
            })
            canvas.focus();
        },

        onLeftAlign()
        {
            if (this.left_align_button_color == 'blue')
                this.left_align_button_color = 'white';
            else
                this.left_align_button_color = 'blue';
            Module.cwrap('OnLeftAlign', 'void', [])(this.left_align_button_color == 'blue');
            canvas.focus();
        },

        onCenterAlign()
        {
            if (this.center_align_button_color == 'blue')
                this.center_align_button_color = 'white';
            else
                this.center_align_button_color = 'blue';
            Module.cwrap('OnCenterAlign', 'void', [])(this.center_align_button_color == 'blue');
            canvas.focus();
        },

        onRightAlign()
        {
            if (this.right_align_button_color == 'blue')
                this.right_align_button_color = 'white';
            else
                this.right_align_button_color = 'blue';
            Module.cwrap('OnRightAlign', 'void', [])(this.right_align_button_color == 'blue');
            canvas.focus();
        },

        onJustifyAlign()
        {
            if (this.justify_align_button_color == 'blue')
                this.justify_align_button_color = 'white';
            else
                this.justify_align_button_color = 'blue';
            Module.cwrap('OnJustifyAlign', 'void', [])(this.justify_align_button_color == 'blue');
            canvas.focus();
        },

        onNew()
        {
            if (this.store.state.login.login == '')
            {
                Module.cwrap('OnNew', 'void', [])(); //for unregisted use just reset the document
                canvas.focus();
                return;
            }

            //for registered user create new document in the DB
            window.dispatchEvent(new CustomEvent('newDocument'));
            canvas.focus();
        },

        onUpload()
        {
            this.yutovo_file.pickFiles();
        },

        onSave()
        {
            Module.cwrap('OnSave', 'void', [])();
            canvas.focus();
        },

        onSaveAs()
        {
            this.$q.dialog({component: SaveAsDialog, parent: this, apiResponse: this.resp});
            canvas.focus();
        },

        onDownload()
        {
            console.log('onDownload');
            this.downloading = true;
            Module.cwrap('OnSave', 'void', [])();
            canvas.focus();
        },

        onRename()
        {
            this.$q.dialog({component: RenameDialog, parent: this, apiResponse: this.resp});
            canvas.focus();
        },

        onDelete()
        {
            var s = this.store;
            var t = this.$t;
            var get_last_document = this.getLastDocument;
            var last_documents = this.last_documents;
            this.$q.dialog({
                title: t('Confirm'),
                message: t('Delete the document?'),
                cancel: true
            }).onOk(() => {
                api.post('/service/delete-document', {}, 
                    {
                        headers:
                        {
                            access_token: s.state.login.access_token
                        }
                    }
                    ).then(
                        function(response)
                        {
                            console.log(response);
                            var id = Cookies.get('document_id');
                            const i = last_documents.indexOf(id);
                            if (i > -1)
                                last_documents.splice(i, 1);
                            //open previous document or create a new one
                            get_last_document().then(_last_document_id =>
                                {
                                    Cookies.remove('document_id', {path: '/'});
                                    if (_last_document_id == 0)
                                    {
                                        window.dispatchEvent(new CustomEvent('onNew', {}));
                                    }
                                    else
                                        window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: _last_document_id}}));
                                });
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                            alert('Error deleting the document');
                        }
                    );
            });

            canvas.focus();
        },

        onConfig()
        {
            this.$q.dialog({component: ConfigDialog, parent: this, apiResponse: this.resp});
            canvas.focus();
        },

        onUndo()
        {
            Module.cwrap('OnUndo', 'void', [])();
        },

        onRedo()
        {
            Module.cwrap('OnRedo', 'void', [])();
        },

        async onCut()
        {
            this.contextMenu.hide();
            Module.cwrap('OnCut', 'void', [])();
            const clipboard_text = UTF32ToString(Module.cwrap('GetClipboardText', 'number', [])());
            const clipboard_json = UTF32ToString(Module.cwrap('GetClipboardJson', 'number', [])());

            try
            {
                if (navigator.userAgent.toLowerCase().includes('firefox'))
                {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'text/plain': new Blob([clipboard_text], 
                            {
                                type: 'text/plain'
                            })
                        })
                    ]);

                    this.jsonClipboard = clipboard_json;
                }
                else
                {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'text/plain': new Blob([clipboard_text], 
                            {
                                type: 'text/plain'
                            }),
                            'web yutovo/elements': new Blob([clipboard_json], 
                            {
                                type: 'web yutovo/elements'
                            })
                        })
                    ]);

                    this.jsonClipboard = '';
                }
            }
            catch (err)
            {
                this.jsonClipboard = clipboard_json; //in case of locked clipboard
            }

            canvas.focus();
        },

        async onCopy()
        {
            this.contextMenu.hide();
            Module.cwrap('OnCopy', 'void', [])();
            const clipboard_text = UTF32ToString(Module.cwrap('GetClipboardText', 'number', [])());
            const clipboard_json = UTF32ToString(Module.cwrap('GetClipboardJson', 'number', [])());

            try
            {
                if (navigator.userAgent.toLowerCase().includes('firefox'))
                {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'text/plain': new Blob([clipboard_text], 
                            {
                                type: 'text/plain'
                            })
                        })
                    ]);

                    this.jsonClipboard = clipboard_json;
                }
                else
                {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'text/plain': new Blob([clipboard_text], 
                            {
                                type: 'text/plain'
                            }),
                            'web yutovo/elements': new Blob([clipboard_json], 
                            {
                                type: 'web yutovo/elements'
                            })
                        })
                    ]);

                    this.jsonClipboard = '';
                }
            }
            catch (err)
            {
                this.jsonClipboard = clipboard_json; //in case of locked clipboard
            }

            canvas.focus();
        },

        async onPaste()
        {
            this.contextMenu.hide();

            Module.cwrap('SetClipboardText', 'void', ['string'])('');
            Module.cwrap('SetClipboardJson', 'void', ['string'])('');

            try
            {
                if (navigator.userAgent.toLowerCase().includes('firefox') && this.jsonClipboard != '')
                {
                    Module.cwrap('SetClipboardJson', 'void', ['string'])(this.jsonClipboard);
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
                            var reader = new FileReader();
                            reader.readAsDataURL(blob); 
                            reader.onloadend = function()
                                {
                                    var text = reader.result;
                                    Module.cwrap('SetClipboardImage', 'void', ['string'])(text);
                                    Module.cwrap('OnPaste', 'void', [])();
                                    canvas.focus();
                                }
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
                Module.cwrap('SetClipboardJson', 'void', ['string'])(this.jsonClipboard); //in case of locked clipboard
            }

            Module.cwrap('OnPaste', 'void', [])();
            canvas.focus();
        },

        async newDocument(event)
        {
            console.log('newDocument ', event);
            var s = this.store;
            var t = this.$t;
            api.post('/service/new-document', event.detail == null ? {} : 
                {
                    json: event.detail.json,
                    name: event.detail.name
                },
                {
                    headers:
                    {
                        access_token: s.state.login.access_token
                    }
                }
                ).then(
                    function(response)
                    {
                        window.dispatchEvent(new CustomEvent('loadDocument', 
                            {
                                detail:
                                {
                                    document_id: response.data.document_id,
                                    last_document: Cookies.has('document_id') ? Cookies.get('document_id') : 0
                                }
                            }));
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        alert(t('Error creating the document: ') + t(response.response.data.error));
                    }
                );
        },

        async saveDocument(event)
        {
            console.log('saveDocument');

            if (this.downloading)
            {
                var s = this.store;
                var filename = s.state.editor.document_name;
                if (filename == '' || typeof filename == 'undefined')
                    return;

                const blob = new Blob([event.detail.json], {type: 'text/csv'});
                if (window.navigator.msSaveOrOpenBlob)
                {
                    window.navigator.msSaveBlob(blob, filename);
                }
                else
                {
                    const elem = window.document.createElement('a');
                    elem.href = window.URL.createObjectURL(blob);
                    elem.download = filename;        
                    document.body.appendChild(elem);
                    elem.click();        
                    document.body.removeChild(elem);
                }

                this.downloading = false;
                return;
            }

            var json = JSON.parse(event.detail.json);
            var r = this.router;
            var t = this.$t;
            if (r.currentRoute.value.path.substring(0, 5) == '/task') //save the current task as a new user document
            {
                var route = r.currentRoute.value;
                var task = route.params.param.replaceAll(/\\/g, '/');
                var lang = task.substring(0, 2);
                task = task.substring(2);
                api.post('/service/save-task', 
                    {
                        task: task,
                        language: lang
                    },
                    {
                        headers:
                        {
                            access_token: this.store.state.login.access_token
                        }
                    }
                    ).then(
                        function(response)
                        {
                            console.log(response);
                            r.push({ path: '/document/' + response.data.document_id });
                            Cookies.set('document_id', response.data.document_id, {path: '/', expires: '1d'});
                            window.dispatchEvent(new CustomEvent('updateDocumentName', {detail: {document_id: response.data.document_id}}));
                            canvas.focus();
                            window.dispatchEvent(new CustomEvent('listDocuments', {}));
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                            alert(t('Error saving the document: ') + t(response.response.data.error));
                        }
                    );
            }
            else //save this document
            {
                api.post('/service/save-document', json,
                    {
                        headers:
                        {
                            access_token: this.store.state.login.access_token
                        }
                    }
                    ).then(
                        function(response)
                        {
                            console.log(response);
                            r.push({path: '/document/' + response.data.document_id});
                            Cookies.set('document_id', response.data.document_id, {path: '/', expires: '1d'});
                            window.dispatchEvent(new CustomEvent('updateDocumentName', {detail: {document_id: response.data.document_id}}));
                            canvas.focus();
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                            if (response.response.status == 403)
                            {
                                //save this document with own id
                                window.dispatchEvent(new CustomEvent('newDocument', {detail: {json: json}}));
                            }
                            else
                            {
                                alert(t('Error saving the document: ') + t(response.response.data.error));
                            }
                        }
                    );
            }
        },

        async translateString(event)
        {
            window.Module.cwrap('OnTranslate', 'void', ['string'])(this.$t(event.detail.str));
        },

        async openDocument()
        {
            if (Cookies.has('document_id'))
                window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: Cookies.get('document_id')}}));
        },

        async getLastDocument()
        {
            var last_document_id = 0;

            if (this.last_documents.length > 0)
            {
                last_document_id = this.last_documents.pop();
                for (let j = 0; j < this.last_documents.length;)
                {
                    if (this.last_documents[j] == last_document_id)
                        this.last_documents.splice(j, 1);
                    else
                        ++j;
                }
            }

            return last_document_id;
        },

        async loadDocument(event)
        {
            var id = event.detail.document_id;
            console.log('loadDocument ', id);
            if (id == null)
                return;
            var get_last_document = this.getLastDocument;
            api.post('/service/load-document', 
                {
                    document_id: id
                },
                {
                    headers:
                    {
                        access_token: this.store.state.login.access_token
                    }
                }
                ).then(
                    function(response)
                    {
                        window.Module.cwrap('OnOpen', 'void', ['string', 'int'])(JSON.stringify(response.data), id);
                        canvas.focus();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        Cookies.remove('document_id', {path: '/'});
                        alert('Document not found');

                        //open previous document or create a new one
                        get_last_document().then(_last_document_id =>
                            {
                                if (_last_document_id == 0 || _last_document_id == id)
                                    window.dispatchEvent(new CustomEvent('onNew', {}));
                                else
                                    window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: _last_document_id}}));
                            });
                    }
                );
            window.dispatchEvent(new CustomEvent('listDocuments', {}));
        },

        async loadTask(event)
        {
            var task = event.detail.task;
            var language = event.detail.language;
            console.log('loadTask ', task, ' ', language);
            if (task == null)
                return;
            
            this.current_task = task;
            var s = this.store;
            if (language == 'undefined')
                language = s.state.editor.language == '' ? 'en' : s.state.editor.language;
            api.post('/service/load-task', 
                {
                    task: task,
                    language: language
                },
                {
                    headers:
                    {
                        access_token: s.state.login.access_token
                    }
                }
                ).then(
                    function(response)
                    {
                        var json = JSON.stringify(response.data);
                        var i = 0;
                        for (; i < json.length - 1024 * 10; i += 1024 * 10)
                        {
                            var s = json.substr(i, 1024 * 10);
                            window.Module.cwrap('OnTaskFilePart', 'void', ['string', 'int', 'int'])(s, 0, 0);
                        }
                        var s = json.substr(i);
                        window.Module.cwrap('OnTaskFilePart', 'void', ['string', 'int', 'int'])(s, 0, 1);
                        canvas.focus();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        alert('Error loading the task');
                    }
                );
        },

        async loadResult(event)
        {
            var last_document_id = Cookies.has('document_id') ? Cookies.get('document_id') : 0;
            var result = event.detail.result;
            var id = event.detail.document_id;
            var config = event.detail.config;
            if (result == 0)
            {
                if (id == 0)
                {
                    //it is a task
                    var task = this.current_task;
                    window.dispatchEvent(new CustomEvent('updateDocumentName', {detail: {name: task}}));
                    var language = this.store.state.editor.language == '' ? 'en' : this.store.state.editor.language;
                    task = task.replaceAll(/\//g, '%5C');
                    this.router.push({ path: '/task/' + language + task });
                    Cookies.remove('document_id', {path: '/'});
                }
                else
                {
                    Cookies.set('document_id', id, {path: '/', expires: '1d'});
                    this.router.push({path: '/document/' + id});
                    window.dispatchEvent(new CustomEvent('updateDocumentName', {detail: {document_id: id}}));
                    if (last_document_id != 0)
                        this.last_documents.push(last_document_id);
                }

                this.store.commit('editor/setConfig', JSON.parse(config));
            }
            else
            {
                alert('Error loading the document');
                this.store.commit('editor/setConfig', JSON.parse('{}'));
            }
        },

        async updateDocumentName(event)
        {
            var s = this.store;
            if (event.detail.name != undefined)
            {
                s.commit('editor/setDocumentName', event.detail.name);
                return;
            }

            var id = event.detail.document_id;
            api.post('/service/get-document-name', 
                {
                    document_id: id
                },
                {
                    headers:
                    {
                        access_token: this.store.state.login.access_token
                    }
                }
                ).then(
                    function(response)
                    {
                        s.commit('editor/setDocumentName', response.data.name);
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                    }
                );
        },

        async onShowContextMenu()
        {
            var copy_menu = document.getElementById('copy-menu');
            const can_copy = Module.cwrap('CanCopy', 'bool', [])();
            if (can_copy)
                copy_menu.classList.remove('disabled');
            else
                copy_menu.classList.add('disabled');

            var can_paste = false;
            try
            {
                const data = await navigator.clipboard.read();
                for (let i = 0; i < data.length; i++)
                {
                    if (data[i].types.includes('web yutovo/elements') || data[i].types.includes('text/plain') || 
                        data[i].types.includes('image/png') || data[i].types.includes('image/jpeg' || data[i].types.includes('image/bmp')))
                    {
                        can_paste = true;
                        break;
                    }
                }
            }
            catch (err)
            {
                can_paste = (this.jsonClipboard != ''); //in case of locked clipboard
            }

            var paste_menu = document.getElementById('paste-menu');
            can_paste = Module.cwrap('CanPaste', 'bool', [])() && can_paste;
            if (can_paste)
                paste_menu.classList.remove('disabled');
            else
                paste_menu.classList.add('disabled');

            var cut_menu = document.getElementById('cut-menu');
            const can_cut = Module.cwrap('CanCut', 'bool', [])();
            if (can_cut)
                cut_menu.classList.remove('disabled');
            else
                cut_menu.classList.add('disabled');

            var r = window.Module.cwrap('GetPresentAsMenu', 'int', [])();
            if (r != 0)
            {
                var m = document.getElementById('present-as-menu');
                m.style.display = '';
                this.autoMenuChecked = r == 1;
                this.realMenuChecked = r == 2;
                this.integerMenuChecked = r == 3;
                this.rationalMenuChecked = r == 4;
                this.complexMenuChecked = r == 5;

                if (r == 1 || r == 2 || r == 5)
                {
                    m = document.getElementById('set-precision-menu');
                    m.style.display = '';
                    m = document.getElementById('set-exp-menu');
                    m.style.display = '';
                }

                if (r == 3)
                {
                    m = document.getElementById('set-notation-menu');
                    m.style.display = '';
                    r = window.Module.cwrap('GetResultNotation', 'int', [])();
                    this.binaryMenuChecked = r == 0;
                    this.octalMenuChecked = r == 1;
                    this.decimalMenuChecked = r == 2;
                    this.hexadecimalMenuChecked = r == 3;
                }

                if (r == 4)
                {
                    m = document.getElementById('set-fraction-form-menu');
                    m.style.display = '';
                    r = window.Module.cwrap('GetFractionForm', 'int', [])();
                    this.properMenuChecked = r == 0;
                    this.improperMenuChecked = r == 1;
                }

                if (r == 5)
                {
                    m = document.getElementById('set-complex-form-menu');
                    m.style.display = '';
                    r = window.Module.cwrap('GetComplexForm', 'int', [])();
                    this.arithmeticMenuChecked = r == 0;
                    this.trigonometricMenuChecked = r == 1;
                    this.exponentialMenuChecked = r == 2;
                }
            }

            m = document.getElementById('set-unit-menu');
            if (window.Module.cwrap('HasUnit', 'int', [])())
                m.style.display = '';
        },

        async getClipboardPermission()
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
        },

        onPresentAsAuto()
        {
            window.Module.cwrap('OnPresentAsAuto', 'void', [])();
        },

        onPresentAsReal()
        {
            window.Module.cwrap('OnPresentAsReal', 'void', [])();
        },

        onPresentAsInteger()
        {
            window.Module.cwrap('OnPresentAsInteger', 'void', [])();
        },

        onPresentAsRational()
        {
            window.Module.cwrap('OnPresentAsRational', 'void', [])();
        },

        onPresentAsComplex()
        {
            window.Module.cwrap('OnPresentAsComplex', 'void', [])();
        },

        onProperFractionForm()
        {
            window.Module.cwrap('OnFractionForm', 'void', ['int'])(0);
        },

        onImproperFractionForm()
        {
            window.Module.cwrap('OnFractionForm', 'void', ['int'])(1);
        },

        onArithmeticComplexForm()
        {
            window.Module.cwrap('OnComplexForm', 'void', ['int'])(0);
        },

        onTrigonometricComplexForm()
        {
            window.Module.cwrap('OnComplexForm', 'void', ['int'])(1);
        },

        onExponentialComplexForm()
        {
            window.Module.cwrap('OnComplexForm', 'void', ['int'])(2);
        },

        onSetPrecision()
        {
            this.contextMenu.hide();

            var p = window.Module.cwrap('GetPrecision', 'int', [])();
            if (p == -1)
                return;

            this.$q.dialog({
                title: '<div class="text-blue text-h5">Set precision</div>',
                prompt:
                {
                    model: p,
                    inputmode: 'numeric',
                    mask: '##',
                    min: 1,
                    max: 99,
                    step: 1
                },
                html: true,
                cancel: true,
                persistent: false
            }).onOk(res => {
                window.Module.cwrap('OnSetPrecision', 'void', ['int'])(res);
            });
            canvas.focus();
        },

        onSetExp()
        {
            this.contextMenu.hide();

            var p = window.Module.cwrap('GetExp', 'int', [])();
            if (p == -1)
                return;

            this.$q.dialog({
                title: '<div class="text-blue text-h5">Set exponent order</div>',
                prompt:
                {
                    model: p,
                    inputmode: 'numeric',
                    mask: '##',
                    min: 1,
                    max: 99,
                    step: 1
                },
                html: true,
                cancel: true,
                persistent: false
            }).onOk(res => {
                window.Module.cwrap('OnSetExp', 'void', ['int'])(res);
            });
            canvas.focus();
        },

        onSetBinaryNotation()
        {
            window.Module.cwrap('OnNotation', 'void', ['int'])(0);
        },

        onSetOctalNotation()
        {
            window.Module.cwrap('OnNotation', 'void', ['int'])(1);
        },

        onSetDecimalNotation()
        {
            window.Module.cwrap('OnNotation', 'void', ['int'])(2);
        },

        onSetHexadecimalNotation()
        {
            window.Module.cwrap('OnNotation', 'void', ['int'])(3);
        },

        onSetUnit()
        {
            this.contextMenu.hide();
            this.$q.dialog({component: SetUnitDialog, parent: this, apiResponse: this.resp});
            canvas.focus();
        },

        onPlus()
        {
            Module.cwrap('OnPlus', 'void', [])();
            canvas.focus();
        },

        onMinus()
        {
            Module.cwrap('OnMinus', 'void', [])();
            canvas.focus();
        },

        onMultiply()
        {
            Module.cwrap('OnMultiply', 'void', [])();
            canvas.focus();
        },

        onDivision()
        {
            Module.cwrap('OnDivision', 'void', [])();
            canvas.focus();
        },

        onPower()
        {
            Module.cwrap('OnPower', 'void', [])();
            canvas.focus();
        },

        onSqrt()
        {
            Module.cwrap('OnSqrt', 'void', [])();
            canvas.focus();
        },

        onNthRoot()
        {
            Module.cwrap('OnNthRoot', 'void', [])();
            canvas.focus();
        },

        onSubscript()
        {
            Module.cwrap('OnSubscript', 'void', [])();
            canvas.focus();
        },

        onFences()
        {
            Module.cwrap('OnFences', 'void', [])();
            canvas.focus();
        },

        onRadian()
        {
            Module.cwrap('InsertString', 'void', ['string'])(this.$t('rad'));
            canvas.focus();
        },

        onDegree()
        {
            Module.cwrap('InsertString', 'void', ['string'])('°');
            canvas.focus();
        },

        onMinute()
        {
            Module.cwrap('InsertString', 'void', ['string'])('\'');
            canvas.focus();
        },

        onSecond()
        {
            Module.cwrap('InsertString', 'void', ['string'])('\'\'');
            canvas.focus();
        },

        onGrad()
        {
            Module.cwrap('InsertString', 'void', ['string'])(this.$t('grad'));
            canvas.focus();
        },

        onSum()
        {
            Module.cwrap('OnSum', 'void', [])();
            canvas.focus();
        },

        onProduct()
        {
            Module.cwrap('OnProduct', 'void', [])();
            canvas.focus();
        },

        onAssignment()
        {
            Module.cwrap('OnAssignment', 'void', [])();
            canvas.focus();
        },

        onUnit()
        {
            Module.cwrap('OnUnit', 'void', [])();
            canvas.focus();
        },

        onEquation()
        {
            Module.cwrap('OnEquation', 'void', [])();
            canvas.focus();
        },

        onCloseContextMenu()
        {
            canvas.focus();
        }
    }
};
</script>

<style scoped>
.editor-container {
    border: 0px;
    position: relative;
    width: 100%;
    overflow: hidden;
}

canvas.emscripten {
    border: 0px none;
    background-color: white;
}

#canvas {
    border: 0px none;
    background-color: white;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
}

#scroll-container {
    border: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: scroll;
}

#scroll-space {
}

.q-pa-md {
    padding: 0em 0 0 1em;
}

.toolbar-select {
    padding: 0em 0 0 0.5em;
}
</style>
