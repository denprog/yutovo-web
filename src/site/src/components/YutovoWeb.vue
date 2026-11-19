<template>
    <div class="toolbar-area" id="toolbars" @dragover.prevent="onToolbarsDragOver($event);" @drop.prevent="onToolbarsDrop($event);">
        <q-menu context-menu touch-position square>
            <q-list class="toolbar-menu">
                <q-item clickable v-close-popup id="standard-toolbar-item" @click="onToolbarToggle('standard');">
                    <q-item-section>{{ $t('Standard') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.standard" v-close-popup @click="onToolbarToggle('standard');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="format-toolbar-item" @click="onToolbarToggle('format');">
                    <q-item-section>{{ $t('Format') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.format" v-close-popup @click="onToolbarToggle('format');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="algebra-toolbar-item" @click="onToolbarToggle('algebra');">
                    <q-item-section>{{ $t('Algebraic functions') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.algebra" v-close-popup @click="onToolbarToggle('algebra');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="functions-toolbar-item" @click="onToolbarToggle('functions');">
                    <q-item-section>{{ $t('Math functions') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.functions" v-close-popup @click="onToolbarToggle('functions');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="greek-toolbar-item" @click="onToolbarToggle('greek');">
                    <q-item-section>{{ $t('Greek letters') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.greek" v-close-popup @click="onToolbarToggle('greek');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="currency-toolbar-item" @click="onToolbarToggle('currency');">
                    <q-item-section>{{ $t('Currencies') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.currency" v-close-popup @click="onToolbarToggle('currency');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="graphs-toolbar-item" @click="onToolbarToggle('graphs');">
                    <q-item-section>{{ $t('Graphs') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.graphs" v-close-popup @click="onToolbarToggle('graphs');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="matrix-toolbar-item" @click="onToolbarToggle('matrix');">
                    <q-item-section>{{ $t('Matrices') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.matrix" v-close-popup @click="onToolbarToggle('matrix');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="logical-toolbar-item" @click="onToolbarToggle('logical');">
                    <q-item-section>{{ $t('Logical operations') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.logical" v-close-popup @click="onToolbarToggle('logical');"/>
                    </q-item-section>
                </q-item>
                <q-item clickable v-close-popup id="calculus-toolbar-item" @click="onToolbarToggle('calculus');">
                    <q-item-section>{{ $t('Calculus') }}</q-item-section>
                    <q-item-section side>
                        <q-toggle :model-value="toolbars.calculus" v-close-popup @click="onToolbarToggle('calculus');"/>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>
        <q-file style="display: none" v-model="yutovo_file_model" @update:model-value="onFileSelected" accept=".yut" ref="yutovo_file"></q-file>
        <div v-for="n in toolbar_rows.length - 1" :key="'toolbar-line-break-' + n" class="toolbar-line-break" :style="{ order: n * 100 - 1 }"></div>
        <div class="toolbar-panel" id="standard-toolbar" v-show="toolbars.standard" draggable="true"
            :style="{ order: panelOrder('standard') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'standard', 'toolbar-panel-insert-before': drag_over_panel === 'standard' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'standard' && drag_over_after }"
            @dragstart="onPanelDragStart('standard', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
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
                <q-btn size="14px" id="export-html-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onExportHtml();"
                    icon="img:/images/standard/export_html.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Export to HTML') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="export-pdf-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onExportPdf();"
                    icon="img:/images/standard/export_pdf.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Export to PDF') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="rename-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onRename();"
                    icon="img:/images/standard/rename.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Rename document') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="delete-button" :disabled="store.state.login.login == ''" square dense no-caps @click="onDelete();"
                    icon="img:/images/standard/delete.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Delete document') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" id="settings-button" square dense no-caps @click="onConfig();" icon="img:/images/standard/settings.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Document properties') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" id="undo-button" square dense :disable="!can_undo" @click="onUndo();" icon="img:/images/standard/undo.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Undo') }} (Ctrl+Z)</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="redo-button" square dense :disable="!can_redo" @click="onRedo();" icon="img:/images/standard/redo.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Redo') }} (Ctrl+Y)</q-tooltip>
                </q-btn>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" id="cut-button" square dense @click="onCut();" icon="img:/images/standard/cut.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Cut') }} (Shift+Del)</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="copy-button" square dense @click="onCopy();" icon="img:/images/standard/copy.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Copy') }} (Ctrl+Ins)</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="paste-button" square dense @click="onPaste();" icon="img:/images/standard/paste.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Paste') }} (Shift+Ins)</q-tooltip>
                </q-btn>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" id="recalculate-button" square dense @click="onRecalculate();" icon="img:/images/format/recalculate.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Recalculate the document') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>

        <div class="toolbar-panel" id="format-toolbar" v-show="toolbars.format" draggable="true"
            :style="{ order: panelOrder('format') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'format', 'toolbar-panel-insert-before': drag_over_panel === 'format' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'format' && drag_over_after }"
            @dragstart="onPanelDragStart('format', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" id="insert-calculator-button" square dense @click="onInsertCalculator();" icon="img:/images/format/code.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert calculator') }} (Ctrl+Shift+C)</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="insert-text-block-button" square dense @click="onInsertTextBlock();" icon="img:/images/format/text_block.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert text block') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
            <div class="scale-control row items-center no-wrap">
                <q-btn dense flat square icon="img:/images/format/dec_scale.png" size="14px" @click="onScaleDec" :disable="scale <= 50"/>
                <div class="scale-value" @click="onResetScale">
                    {{ scale }}%
                </div>
                <q-btn dense flat square icon="img:/images/format/inc_scale.png" size="14px" @click="onScaleInc" :disable="scale >= 500"/>
            </div>
            <q-select class="toolbar-select" style="white-space: nowrap;" v-model="paragraph_format_model" :options="paragraph_format"
                @update:model-value="onParagraphFormat();" dense options-dense borderless>
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Paragraph format') }}</q-tooltip>
            </q-select>
            <q-btn-group flat square unelevated stretch>
                <q-select class="toolbar-select" style="white-space: nowrap;" v-model="font_family_model" :options="font_family" @update:model-value="onFontFamily();"
                    dense options-dense borderless>
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Font family') }}</q-tooltip>
                </q-select>
                <q-select class="toolbar-select" style="white-space: nowrap;" v-model="font_size_model" :options="font_size" @update:model-value="onFontSize();"
                    dense options-dense borderless>
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Font size') }}</q-tooltip>
                </q-select>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
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
                <q-btn size="14px" id="subscript-button" square dense :color="subscript_button_color" @click="onTextSubscript();"
                    icon="img:/images/format/subscript.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Subscript') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="superscript-button" square dense :color="superscript_button_color" @click="onTextSuperscript();"
                    icon="img:/images/format/superscript.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Superscript') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="text-color-button" square dense @click="onTextColor();" icon="img:/images/format/text_color.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Text color') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="text-bg-color-button" square dense @click="onTextBgColor();" icon="img:/images/format/bg_text_color.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Text background color') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="link-button" square dense @click="onLink();" icon="img:/images/format/link.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Link') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" id="left-align-button" square dense :color="left_align_button_color" @click="onLeftAlign();"
                    icon="img:/images/format/align_left.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Left align') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="center-align-button" square dense :color="center_align_button_color" @click="onCenterAlign();"
                    icon="img:/images/format/align_center.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Center align') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="right-align-button" square dense :color="right_align_button_color" @click="onRightAlign();"
                    icon="img:/images/format/align_right.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Right align') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" id="justify-align-button" square dense :color="justify_align_button_color" @click="onJustifyAlign();"
                    icon="img:/images/format/align_justify.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Justify align') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
            <div class="unordered-list-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Unordered list') }}</q-tooltip>
                <q-btn-dropdown id="unordered-list-button" flat size="14px" square dense no-caps :disable="!unordered_list_enable"
                    icon="img:/images/format/unordered_list.png" @hide="onLettersHide();">
                    <div class="q-pt-sm q-pb-sm column q-gutter-xs">
                        <q-btn id="unordered-list-small-circle-item" class="unordered-list-item" align="left" flat square dense no-caps v-close-popup
                            icon="img:/images/format/list_small_circle.png" :label="$t('Small circle')" @click="onUnorderedList(1);"/>
                        <q-btn id="unordered-list-large-circle-item" class="unordered-list-item" align="left" flat square dense no-caps v-close-popup
                            icon="img:/images/format/list_large_circle.png" :label="$t('Large circle')" @click="onUnorderedList(2);"/>
                        <q-btn id="unordered-list-diamond-item" class="unordered-list-item" align="left" flat square dense no-caps v-close-popup
                            icon="img:/images/format/list_diamond.png" :label="$t('Diamond')" @click="onUnorderedList(3);"/>
                        <q-btn id="unordered-list-square-item" class="unordered-list-item" align="left" flat square dense no-caps v-close-popup
                            icon="img:/images/format/list_square.png" :label="$t('Square')" @click="onUnorderedList(4);"/>
                    </div>
                </q-btn-dropdown>
            </div>
        </div>

        <div class="toolbar-panel" id="algebra-toolbar" v-show="toolbars.algebra" draggable="true"
            :style="{ order: panelOrder('algebra') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'algebra', 'toolbar-panel-insert-before': drag_over_panel === 'algebra' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'algebra' && drag_over_after }"
            @dragstart="onPanelDragStart('algebra', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" square dense @click="onPlus();" icon="img:/images/algebra/plus.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Plus') }} (+)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onMinus();" icon="img:/images/algebra/minus.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Minus') }} (-)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onMultiply();" icon="img:/images/algebra/multiply.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Multiply') }} (*)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onDivision();" icon="img:/images/algebra/division.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Division') }} (/)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onPower();" icon="img:/images/algebra/power.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Power') }} (Ctrl+Shift+P)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onSqrt();" icon="img:/images/algebra/sqrt.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Square root') }} (Ctrl+Shift+Q)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onNthRoot();" icon="img:/images/algebra/nth_root.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Root of degree') }} (Ctrl+Shift+N)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onSubscript();" icon="img:/images/algebra/subscript.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Subscript') }} (Ctrl+Shift+S)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onRoundBrackets();" icon="img:/images/algebra/round_brackets.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Round brackets') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onSquareBrackets();" icon="img:/images/algebra/square_brackets.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Square brackets') }}</q-tooltip>
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
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" square dense @click="onEvalutionBar();" icon="img:/images/algebra/evalution_bar.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Evaluate at point') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onFunctionAtPoint();" icon="img:/images/algebra/function_at_point.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Function at point') }}</q-tooltip>
                </q-btn>
                <q-btn id="function-x-button" size="14px" square dense @click="onFunctionX();" icon="img:/images/algebra/function_x.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Function f(x)') }}</q-tooltip>
                </q-btn>
                <q-btn id="function-xy-button" size="14px" square dense @click="onFunctionXY();" icon="img:/images/algebra/function_xy.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Function f(x,y)') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" square dense @click="onInfinity();">
                    ∞
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Infinity') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onAssignment();" icon="img:/images/algebra/assignment.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Assignment') }} (:)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onUnit();" icon="img:/images/algebra/unit.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Unit') }} (~)</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onEquation();" icon="img:/images/algebra/equation.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Equation') }} (=)</q-tooltip>
                </q-btn>
                <q-btn id="equal-button" size="14px" square dense @click="onEqual();" icon="img:/images/algebra/equal.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Equal') }} (Ctrl+=)</q-tooltip>
                </q-btn>
                <q-btn id="greater-button" size="14px" square dense @click="onGreater();" icon="img:/images/algebra/greater.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Greater') }} (>)</q-tooltip>
                </q-btn>
                <q-btn id="less-button" size="14px" square dense @click="onLess();" icon="img:/images/algebra/less.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Less') }} (&lt;)</q-tooltip>
                </q-btn>
                <q-btn id="greater-equal-button" size="14px" square dense @click="onGreaterEqual();" icon="img:/images/algebra/greater_equal.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Greater or equal') }} (Ctrl+Shift+>)</q-tooltip>
                </q-btn>
                <q-btn id="less-equal-button" size="14px" square dense @click="onLessEqual();" icon="img:/images/algebra/less_equal.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Less or equal') }} (Ctrl+Shift+&lt;)</q-tooltip>
                </q-btn>
                <q-btn id="not-equal-button" size="14px" square dense @click="onNotEqual();" icon="img:/images/algebra/not_equal.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Not equal') }} (Ctrl+Shift+=)</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>

        <div class="toolbar-panel" id="functions-toolbar" v-show="toolbars.functions" draggable="true"
            :style="{ order: panelOrder('functions') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'functions', 'toolbar-panel-insert-before': drag_over_panel === 'functions' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'functions' && drag_over_after }"
            @dragstart="onPanelDragStart('functions', $event);"
            @dragend="onPanelDragEnd();">
            <div class="function-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Trigonometric functions') }}</q-tooltip>
                <q-btn-dropdown id="trigonometric-functions-button" flat size="14px" square dense no-caps
                    label="sin" @hide="onLettersHide();">
                    <div class="q-pt-sm q-pb-sm row q-gutter-xs justify-center">
                        <q-btn id="sin-button" class="function-item" flat square dense no-caps v-close-popup
                            label="sin" @click="onInsertFunction('sin');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Sine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="cos-button" class="function-item" flat square dense no-caps v-close-popup
                            label="cos" @click="onInsertFunction('cos');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Cosine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="tg-button" class="function-item" flat square dense no-caps v-close-popup
                            label="tg" @click="onInsertFunction('tg');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Tangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="ctg-button" class="function-item" flat square dense no-caps v-close-popup
                            label="ctg" @click="onInsertFunction('ctg');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Cotangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="sec-button" class="function-item" flat square dense no-caps v-close-popup
                            label="sec" @click="onInsertFunction('sec');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Secans') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="csc-button" class="function-item" flat square dense no-caps v-close-popup
                            label="csc" @click="onInsertFunction('csc');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Cosecans') }}</q-tooltip>
                        </q-btn>
                    </div>
                </q-btn-dropdown>
            </div>
            <div class="function-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Inverse trigonometric functions') }}</q-tooltip>
                <q-btn-dropdown id="inverse-trigonometric-functions-button" flat size="14px" square dense no-caps
                    label="arcsin" @hide="onLettersHide();">
                    <div class="q-pt-sm q-pb-sm row q-gutter-xs justify-center">
                        <q-btn id="arcsin-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arcsin" @click="onInsertFunction('arcsin');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Arcsine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arccos-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arccos" @click="onInsertFunction('arccos');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Arccosine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arctg-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arctg" @click="onInsertFunction('arctg');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Arctangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arcctg-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arcctg" @click="onInsertFunction('arcctg');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Arccotangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arcsec-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arcsec" @click="onInsertFunction('arcsec');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Arcsecans') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arccsc-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arccsc" @click="onInsertFunction('arccsc');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Arccosecans') }}</q-tooltip>
                        </q-btn>
                    </div>
                </q-btn-dropdown>
            </div>
            <div class="function-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic functions') }}</q-tooltip>
                <q-btn-dropdown id="hyperbolic-functions-button" flat size="14px" square dense no-caps
                    label="sinh" @hide="onLettersHide();">
                    <div class="q-pt-sm q-pb-sm row q-gutter-xs justify-center">
                        <q-btn id="sinh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="sinh" @click="onInsertFunction('sinh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic sine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="cosh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="cosh" @click="onInsertFunction('cosh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic cosine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="tgh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="tgh" @click="onInsertFunction('tgh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic tangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="ctgh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="ctgh" @click="onInsertFunction('ctgh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic cotangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="sech-button" class="function-item" flat square dense no-caps v-close-popup
                            label="sech" @click="onInsertFunction('sech');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic secans') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="csch-button" class="function-item" flat square dense no-caps v-close-popup
                            label="csch" @click="onInsertFunction('csch');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic cosecans') }}</q-tooltip>
                        </q-btn>
                    </div>
                </q-btn-dropdown>
            </div>
            <div class="function-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Inverse hyperbolic functions') }}</q-tooltip>
                <q-btn-dropdown id="inverse-hyperbolic-functions-button" flat size="14px" square dense no-caps
                    label="arsinh" @hide="onLettersHide();">
                    <div class="q-pt-sm q-pb-sm row q-gutter-xs justify-center">
                        <q-btn id="arsinh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arsinh" @click="onInsertFunction('arsinh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic arsine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arcosh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arcosh" @click="onInsertFunction('arcosh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic arcosine') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="artgh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="artgh" @click="onInsertFunction('artgh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic artangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arctgh-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arctgh" @click="onInsertFunction('arctgh');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic arcotangens') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arsech-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arsech" @click="onInsertFunction('arsech');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic arsecans') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="arcsch-button" class="function-item" flat square dense no-caps v-close-popup
                            label="arcsch" @click="onInsertFunction('arcsch');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Hyperbolic arcosecans') }}</q-tooltip>
                        </q-btn>
                    </div>
                </q-btn-dropdown>
            </div>
            <div class="function-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Elementary functions') }}</q-tooltip>
                <q-btn-dropdown id="elementary-functions-button" flat size="14px" square dense no-caps
                    label="exp" @hide="onLettersHide();">
                    <div class="q-pt-sm q-pb-sm row q-gutter-xs justify-center">
                        <q-btn id="exp-button" class="function-item" flat square dense no-caps v-close-popup
                            label="exp" @click="onInsertFunction('exp');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Exponent') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="ln-button" class="function-item" flat square dense no-caps v-close-popup
                            label="ln" @click="onInsertFunction('ln');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Natural logarithm') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="lg-button" class="function-item" flat square dense no-caps v-close-popup
                            label="lg" @click="onInsertFunction('lg');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Decimal logarithm') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="log-button" class="function-item" flat square dense no-caps v-close-popup
                            label="log" @click="onInsertSubscriptFunction('log');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Logarithm') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="int-button" class="function-item" flat square dense no-caps v-close-popup
                            label="int" @click="onInsertFunction('int');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Integer part') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="fract-button" class="function-item" flat square dense no-caps v-close-popup
                            label="fract" @click="onInsertFunction('fract');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Fraction part') }}</q-tooltip>
                        </q-btn>
                        <q-btn id="round-button" class="function-item" flat square dense no-caps v-close-popup
                            label="round" @click="onInsertFunction('round');">
                            <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Round') }}</q-tooltip>
                        </q-btn>
                    </div>
                </q-btn-dropdown>
            </div>
        </div>

        <div class="toolbar-panel" id="greek-toolbar" v-show="toolbars.greek" draggable="true"
            :style="{ order: panelOrder('greek') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'greek', 'toolbar-panel-insert-before': drag_over_panel === 'greek' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'greek' && drag_over_after }"
            @dragstart="onPanelDragStart('greek', $event);"
            @dragend="onPanelDragEnd();">
            <div class="greek-letter-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Greek letters') }}</q-tooltip>
                <q-btn-dropdown class="greek-letter-block" square dense no-caps label="α" @hide="onLettersHide()">
                    <table class="q-pt-md q-pb-md">
                        <tr>
                            <q-btn class="greek-letter" label="α" v-close-popup square dense no-caps @click="onGreekLetter('α');"/>
                            <q-btn class="greek-letter" label="β" v-close-popup square dense no-caps @click="onGreekLetter('β');"/>
                            <q-btn class="greek-letter" label="γ" v-close-popup square dense no-caps @click="onGreekLetter('γ');"/>
                            <q-btn class="greek-letter" label="δ" v-close-popup square dense no-caps @click="onGreekLetter('δ');"/>
                            <q-btn class="greek-letter" label="ε" v-close-popup square dense no-caps @click="onGreekLetter('ε');"/>
                            <q-btn class="greek-letter" label="ζ" v-close-popup square dense no-caps @click="onGreekLetter('ζ');"/>
                            <q-btn class="greek-letter" label="η" v-close-popup square dense no-caps @click="onGreekLetter('η');"/>
                            <q-btn class="greek-letter" label="θ" v-close-popup square dense no-caps @click="onGreekLetter('θ');"/>
                        </tr>
                        <tr>
                            <q-btn class="greek-letter" label="ι" v-close-popup square dense no-caps @click="onGreekLetter('ι');"/>
                            <q-btn class="greek-letter" label="κ" v-close-popup square dense no-caps @click="onGreekLetter('κ');"/>
                            <q-btn class="greek-letter" label="λ" v-close-popup square dense no-caps @click="onGreekLetter('λ');"/>
                            <q-btn class="greek-letter" label="μ" v-close-popup square dense no-caps @click="onGreekLetter('μ');"/>
                            <q-btn class="greek-letter" label="ν" v-close-popup square dense no-caps @click="onGreekLetter('ν');"/>
                            <q-btn class="greek-letter" label="ξ" v-close-popup square dense no-caps @click="onGreekLetter('ξ');"/>
                            <q-btn class="greek-letter" label="ο" v-close-popup square dense no-caps @click="onGreekLetter('ο');"/>
                            <q-btn class="greek-letter" label="π" v-close-popup square dense no-caps @click="onGreekLetter('π');"/>
                        </tr>
                        <tr>
                            <q-btn class="greek-letter" label="ρ" v-close-popup square dense no-caps @click="onGreekLetter('ρ');"/>
                            <q-btn class="greek-letter" label="σ" v-close-popup square dense no-caps @click="onGreekLetter('σ');"/>
                            <q-btn class="greek-letter" label="τ" v-close-popup square dense no-caps @click="onGreekLetter('τ');"/>
                            <q-btn class="greek-letter" label="υ" v-close-popup square dense no-caps @click="onGreekLetter('υ');"/>
                            <q-btn class="greek-letter" label="φ" v-close-popup square dense no-caps @click="onGreekLetter('φ');"/>
                            <q-btn class="greek-letter" label="χ" v-close-popup square dense no-caps @click="onGreekLetter('χ');"/>
                            <q-btn class="greek-letter" label="ψ" v-close-popup square dense no-caps @click="onGreekLetter('ψ');"/>
                            <q-btn class="greek-letter" label="ω" v-close-popup square dense no-caps @click="onGreekLetter('ω');"/>
                        </tr>
                        <tr>
                            <q-btn class="greek-letter" label="Α" v-close-popup square dense no-caps @click="onGreekLetter('Α');"/>
                            <q-btn class="greek-letter" label="Β" v-close-popup square dense no-caps @click="onGreekLetter('Β');"/>
                            <q-btn class="greek-letter" label="Γ" v-close-popup square dense no-caps @click="onGreekLetter('Γ');"/>
                            <q-btn class="greek-letter" label="Δ" v-close-popup square dense no-caps @click="onGreekLetter('Δ');"/>
                            <q-btn class="greek-letter" label="Ε" v-close-popup square dense no-caps @click="onGreekLetter('Ε');"/>
                            <q-btn class="greek-letter" label="Ζ" v-close-popup square dense no-caps @click="onGreekLetter('Ζ');"/>
                            <q-btn class="greek-letter" label="Η" v-close-popup square dense no-caps @click="onGreekLetter('Η');"/>
                            <q-btn class="greek-letter" label="Θ" v-close-popup square dense no-caps @click="onGreekLetter('Θ');"/>
                        </tr>
                        <tr>
                            <q-btn class="greek-letter" label="Ι" v-close-popup square dense no-caps @click="onGreekLetter('Ι');"/>
                            <q-btn class="greek-letter" label="Κ" v-close-popup square dense no-caps @click="onGreekLetter('Κ');"/>
                            <q-btn class="greek-letter" label="Λ" v-close-popup square dense no-caps @click="onGreekLetter('Λ');"/>
                            <q-btn class="greek-letter" label="Μ" v-close-popup square dense no-caps @click="onGreekLetter('Μ');"/>
                            <q-btn class="greek-letter" label="Ν" v-close-popup square dense no-caps @click="onGreekLetter('Ν');"/>
                            <q-btn class="greek-letter" label="Ξ" v-close-popup square dense no-caps @click="onGreekLetter('Ξ');"/>
                            <q-btn class="greek-letter" label="Ο" v-close-popup square dense no-caps @click="onGreekLetter('Ο');"/>
                            <q-btn class="greek-letter" label="Π" v-close-popup square dense no-caps @click="onGreekLetter('Π');"/>
                        </tr>
                        <tr>
                            <q-btn class="greek-letter" label="Ρ" v-close-popup square dense no-caps @click="onGreekLetter('Ρ');"/>
                            <q-btn class="greek-letter" label="Σ" v-close-popup square dense no-caps @click="onGreekLetter('Σ');"/>
                            <q-btn class="greek-letter" label="Τ" v-close-popup square dense no-caps @click="onGreekLetter('Τ');"/>
                            <q-btn class="greek-letter" label="Υ" v-close-popup square dense no-caps @click="onGreekLetter('Υ');"/>
                            <q-btn class="greek-letter" label="Φ" v-close-popup square dense no-caps @click="onGreekLetter('Φ');"/>
                            <q-btn class="greek-letter" label="Χ" v-close-popup square dense no-caps @click="onGreekLetter('Χ');"/>
                            <q-btn class="greek-letter" label="Ψ" v-close-popup square dense no-caps @click="onGreekLetter('Ψ');"/>
                            <q-btn class="greek-letter" label="Ω" v-close-popup square dense no-caps @click="onGreekLetter('Ω');"/>
                        </tr>
                    </table>
                </q-btn-dropdown>
            </div>
        </div>

        <div class="toolbar-panel" id="currency-toolbar" v-show="toolbars.currency" draggable="true"
            :style="{ order: panelOrder('currency') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'currency', 'toolbar-panel-insert-before': drag_over_panel === 'currency' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'currency' && drag_over_after }"
            @dragstart="onPanelDragStart('currency', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" class="currency-button" square dense @click="onCurrency('R$');">
                    R$
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Brazilian real') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" class="currency-button" square dense @click="onCurrency('¥');">
                    ¥
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Chinese yuan') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" class="currency-button" square dense @click="onCurrency('€');">
                    €
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Euro') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" class="currency-button" square dense @click="onCurrency('₹');">
                    ₹
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Indian rupee') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" class="currency-button" square dense @click="onCurrency('₽');">
                    ₽
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Russian ruble') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" class="currency-button" square dense @click="onCurrency('$');">
                    $
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('US dollar') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>

        <div class="toolbar-panel" id="graphs-toolbar" v-show="toolbars.graphs" draggable="true"
            :style="{ order: panelOrder('graphs') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'graphs', 'toolbar-panel-insert-before': drag_over_panel === 'graphs' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'graphs' && drag_over_after }"
            @dragstart="onPanelDragStart('graphs', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn id="graph-line-button" size="14px" square dense @click="onGraphLine();" icon="img:/images/graphs/graph_line.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Line graph') }}</q-tooltip>
                </q-btn>
                <q-btn id="graph-surface-button" size="14px" square dense @click="onGraphSurface();" icon="img:/images/graphs/graph_surface.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Surface graph') }}</q-tooltip>
                </q-btn>
                <q-btn id="graph-histogram-button" size="14px" square dense @click="onGraphHistogram();" icon="img:/images/graphs/graph_histogram.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Histogram') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>

        <div class="toolbar-panel" id="matrix-toolbar" v-show="toolbars.matrix" draggable="true"
            :style="{ order: panelOrder('matrix') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'matrix', 'toolbar-panel-insert-before': drag_over_panel === 'matrix' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'matrix' && drag_over_after }"
            @dragstart="onPanelDragStart('matrix', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn id="matrix-button" size="14px" square dense @click="onMatrix();" icon="img:/images/algebra/matrix.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert matrix') }}</q-tooltip>
                </q-btn>
                <q-btn id="determinant-button" size="14px" square dense @click="onDeterminant();" icon="img:/images/algebra/determinant.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert determinant') }}</q-tooltip>
                </q-btn>
                <q-btn id="vector-button" size="14px" square dense @click="onVector();" icon="img:/images/algebra/vector.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert vector') }}</q-tooltip>
                </q-btn>
                <q-btn id="vector-element-button" size="14px" square dense @click="onVectorElement();" icon="img:/images/algebra/vector_element.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert vector with arrow') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>

        <div class="toolbar-panel" id="logical-toolbar" v-show="toolbars.logical" draggable="true"
            :style="{ order: panelOrder('logical') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'logical', 'toolbar-panel-insert-before': drag_over_panel === 'logical' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'logical' && drag_over_after }"
            @dragstart="onPanelDragStart('logical', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" square dense @click="onAnd();" icon="img:/images/logical/and.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Logical AND') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onOr();" icon="img:/images/logical/or.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Logical OR') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onXor();" icon="img:/images/logical/xor.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Logical XOR') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onNot();" icon="img:/images/logical/not.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Logical NOT') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>

        <div class="toolbar-panel" id="calculus-toolbar" v-show="toolbars.calculus" draggable="true"
            :style="{ order: panelOrder('calculus') }"
            :class="{ 'toolbar-panel-dragged': dragged_panel === 'calculus', 'toolbar-panel-insert-before': drag_over_panel === 'calculus' && !drag_over_after, 'toolbar-panel-insert-after': drag_over_panel === 'calculus' && drag_over_after }"
            @dragstart="onPanelDragStart('calculus', $event);"
            @dragend="onPanelDragEnd();">
            <q-btn-group flat square unelevated stretch>
                <q-btn size="14px" square dense @click="onDefiniteIntegral();" icon="img:/images/calculus/definite_integral.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Definite integral') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onIndefiniteIntegral();" icon="img:/images/calculus/indefinite_integral.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Indefinite integral') }}</q-tooltip>
                </q-btn>
                <q-btn id="limit-button" size="14px" square dense @click="onLimit();" icon="img:/images/calculus/limit.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Limit') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onDerivative();" icon="img:/images/calculus/derivative.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Derivative') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onSecondDerivative();" icon="img:/images/calculus/derivative2.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Second derivative') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onPartialDerivative();" icon="img:/images/calculus/partial_derivative.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Partial derivative') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" square dense @click="onDerivativeAtPoint();" icon="img:/images/calculus/derivative_at_point.png">
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Derivative at point') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </div>
    </div>

    <YutovoEditor ref="editorRef" />

    <q-resize-observer @resize="onEditorResize" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
declare var Module: any
declare var canvas: HTMLCanvasElement
import { ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { api } from 'boot/boot'
import ColorPickerDialog from 'layouts/ColorPickerDialog.vue'
import SaveAsDialog from 'layouts/SaveAsDialog.vue'
import RenameDialog from 'layouts/RenameDialog.vue'
import ConfigDialog from 'layouts/ConfigDialog.vue'
import LinkDialog from 'layouts/LinkDialog.vue'
import ExportPdfDialog from 'layouts/ExportPdfDialog.vue'
import MatrixSizeDialog from 'layouts/MatrixSizeDialog.vue'
import YutovoEditor from './YutovoEditor.vue'

const TOOLBAR_VISIBILITY_KEY = 'yutovo-toolbar-visibility'
const TOOLBAR_ORDER_KEY = 'yutovo-toolbar-order'

const default_toolbars =
{
    standard: true,
    format: true,
    algebra: true,
    functions: true,
    greek: true,
    currency: true,
    graphs: true,
    matrix: true,
    logical: true,
    calculus: true
}

const default_toolbar_order =
[
    'standard', 'format', 'algebra', 'functions', 'greek', 'currency', 'graphs', 'matrix', 'logical', 'calculus'
]

function loadToolbarVisibility()
{
    const toolbars = { ...default_toolbars }
    try
    {
        const saved = JSON.parse(window.localStorage.getItem(TOOLBAR_VISIBILITY_KEY) || '{}')
        for (const name of Object.keys(toolbars))
        {
            if (saved[name] === false)
                toolbars[name] = false
        }
    }
    catch (e)
    {
        // storage unavailable or corrupted - keep defaults
    }
    return toolbars
}

function loadToolbarOrder()
{
    try
    {
        const saved = JSON.parse(window.localStorage.getItem(TOOLBAR_ORDER_KEY) || '[]')
        if (Array.isArray(saved) && saved.length > 0 && Array.isArray(saved[0]))
        {
            const flat = saved.reduce((all, row) => all.concat(row), [])
            if (flat.length === default_toolbar_order.length && default_toolbar_order.every(name => flat.includes(name)))
                return saved
        }
        else if (Array.isArray(saved) && saved.length === default_toolbar_order.length
            && default_toolbar_order.every(name => saved.includes(name)))
            return [saved]
    }
    catch (e)
    {
        // storage unavailable or corrupted - keep the default order
    }
    return [[...default_toolbar_order]]
}

export default defineComponent(
{
    name: 'YutovoWeb',

    components:
    {
        YutovoEditor
    },

    setup()
    {
        const store = useStore()
        const router = useRouter()

        const editorRef = ref<InstanceType<typeof YutovoEditor> | null>(null)
        const yutovo_file_model = ref(null)
        const yutovo_file = ref(null)

        const paragraph_format_model = ref('Text body')
        const paragraph_format = [
            'Text body', 'Header 1', 'Header 2', 'Header 3', 'Monospace', 'Code'
        ]

        const font_family_model = ref('Arial')
        const font_family = [
            'Arial', 'Courier New', 'FreeMono', 'Times New Roman', 'DejaVu Serif'
        ]

        const font_size_model = ref('14')
        const font_size = [
            '', '6', '7', '8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'
        ]

        return {
            store,
            router,
            editorRef,
            yutovo_file_model,
            yutovo_file,
            paragraph_format_model,
            paragraph_format,
            font_family_model,
            font_family,
            font_size_model,
            font_size
        }
    },

    data()
    {
        return {
            bold_button_color: 'white',
            italic_button_color: 'white',
            underline_button_color: 'white',
            strikethrough_button_color: 'white',
            subscript_button_color: 'white',
            superscript_button_color: 'white',
            text_color: '#000000',
            text_bg_color: '#ffffff',
            left_align_button_color: 'white',
            center_align_button_color: 'white',
            right_align_button_color: 'white',
            justify_align_button_color: 'white',
            unordered_list_enable: false,
            can_undo: false,
            can_redo: false,
            scale: 100,
            toolbars: loadToolbarVisibility(),
            toolbar_rows: loadToolbarOrder(),
            dragged_panel: null,
            drag_over_panel: null,
            drag_over_after: false
        }
    },

    watch:
    {
        'store.state.editor.settings': function()
        {
            const c = JSON.parse(JSON.stringify(this.store.state.editor.settings))
            delete c['language']
            delete c['auto_result']
            delete c['real_result']
            delete c['integer_result']
            delete c['rational_result']
            delete c['complex_result']
            Module.cwrap('OnSettings', 'void', ['string'])(JSON.stringify(c))
            canvas.focus()
        },

        'store.state.editor.config': function()
        {
            const c = JSON.parse(JSON.stringify(this.store.state.editor.config))
            Module.cwrap('OnConfig', 'void', ['string', 'bool'])(JSON.stringify(c), !(window as any).loading)
            ;(window as any).loading = false
            canvas.focus()
        },

        'store.state.editor.resizing': function()
        {
            if (this.store.state.editor.resizing)
            {
                this.store.commit('editor/setResizing', false)
                this.onEditorResize()
            }
        }
    },

    mounted()
    {
        window.addEventListener('setStandardToolbar', this.setStandardToolbar, false)
        window.addEventListener('setScale', this.onSetScale, false)
        window.addEventListener('onCopy', this.onCopy, false)
        window.addEventListener('onCut', this.onCut, false)
        window.addEventListener('onPaste', this.onPaste, false)
        window.addEventListener('resize', this.onWindowResize)
    },

    unmounted()
    {
        window.removeEventListener('setStandardToolbar', this.setStandardToolbar)
        window.removeEventListener('setScale', this.onSetScale)
        window.removeEventListener('onCopy', this.onCopy)
        window.removeEventListener('onCut', this.onCut)
        window.removeEventListener('onPaste', this.onPaste)
        window.removeEventListener('resize', this.onWindowResize)
    },

    methods:
    {
        onEditorResize()
        {
            const MIN_EDITOR_HEIGHT = 200

            const editor = document.getElementById('editor')
            if (editor)
            {
                const footer = document.getElementById('footer')
                const editorRect = editor.getBoundingClientRect()
                let availableHeight = window.innerHeight - editorRect.top
                if (footer)
                {
                    const footerRect = footer.getBoundingClientRect()
                    availableHeight = footerRect.top - editorRect.top
                }
                editor.style.height = Math.round(Math.max(availableHeight - 4, MIN_EDITOR_HEIGHT)) + 'px'
            }

            const scroll = document.getElementById('scroll-container')
            if (scroll)
            {
                window.dispatchEvent(new Event('resize'))
                ;canvas.focus()
            }
        },

        onWindowResize(event)
        {
            if (event.isTrusted)
                this.onEditorResize()
        },

        onFileSelected()
        {
            this.doFileUpload()
        },

        doFileUpload()
        {
            const file = this.yutovo_file_model
            if (!file)
                return
            const reader = new FileReader()
            reader.onload = () =>
            {
                const arr = new Uint8Array(reader.result as ArrayBuffer)
                try
                {
                    const pako = require('pako')
                    const output = pako.ungzip(arr)
                    const str = new TextDecoder().decode(output)
                    window.dispatchEvent(new CustomEvent('newDocument',
                    {
                        detail:
                        {
                            name: file.name,
                            json: str
                        }
                    }))
                }
                catch
                {
                    const text = new TextDecoder().decode(reader.result)
                    window.dispatchEvent(new CustomEvent('newDocument',
                    {
                        detail:
                        {
                            name: file.name,
                            json: text
                        }
                    }))
                }
            }
            reader.readAsArrayBuffer(file)
        },

        setStandardToolbar(event: any)
        {
            this.paragraph_format_model = event.detail.paragraph_format
            this.font_family_model = event.detail.font_family
            this.font_size_model = event.detail.font_size
            this.bold_button_color = (event.detail.bold == 1 ? 'blue' : 'white')
            this.italic_button_color = (event.detail.italic == 1 ? 'blue' : 'white')
            this.underline_button_color = (event.detail.underline == 1 ? 'blue' : 'white')
            this.strikethrough_button_color = (event.detail.strikethrough == 1 ? 'blue' : 'white')
            this.subscript_button_color = (event.detail.subscript == 1 ? 'blue' : 'white')
            this.superscript_button_color = (event.detail.superscript == 1 ? 'blue' : 'white')
            this.text_color = event.detail.text_color
            this.text_bg_color = event.detail.text_bg_color
            this.left_align_button_color = (event.detail.left_align == 1 && !event.detail.code_block ? 'blue' : 'white')
            this.center_align_button_color = (event.detail.center_align == 1 && !event.detail.code_block ? 'blue' : 'white')
            this.right_align_button_color = (event.detail.right_align == 1 && !event.detail.code_block ? 'blue' : 'white')
            this.justify_align_button_color = (event.detail.justify_align == 1 && !event.detail.code_block ? 'blue' : 'white')
            this.unordered_list_enable = event.detail.unordered_list_enable == 1
            this.can_undo = event.detail.can_undo == 1
            this.can_redo = event.detail.can_redo == 1

            document.title = this.$t('Yutovo - visual online calculator')
        },

        onScaleDec()
        {
            Module.cwrap('OnScaleInc', 'void', ['int'])(-10)
            canvas.focus()
        },

        onScaleInc()
        {
            Module.cwrap('OnScaleInc', 'void', ['int'])(10)
            canvas.focus()
        },

        onResetScale()
        {
            Module.cwrap('OnScaleSet', 'void', ['int'])(100)
            canvas.focus()
        },

        onSetScale(event: any)
        {
            this.scale = event.detail
        },

        onInsertCalculator()
        {
            Module.cwrap('OnInsertCalculator', 'void', [])()
            canvas.focus()
        },

        onInsertTextBlock()
        {
            Module.cwrap('OnInsertTextBlock', 'void', [])()
            canvas.focus()
        },

        onRecalculate()
        {
            Module.cwrap('OnRecalculate', 'void', [])()
            canvas.focus()
        },

        onParagraphFormat()
        {
            Module.cwrap('OnParagraphFormat', 'void', ['string'])(this.paragraph_format_model)
            canvas.focus()
        },

        onUnorderedList(marker: number)
        {
            Module.cwrap('OnUnorderedList', 'void', ['number'])(marker)
            canvas.focus()
        },

        onFontFamily()
        {
            Module.cwrap('OnFontFamily', 'void', ['string'])(this.font_family_model)
            canvas.focus()
        },

        onFontSize()
        {
            Module.cwrap('OnFontSize', 'void', ['string'])(this.font_size_model)
            canvas.focus()
        },

        onBold()
        {
            if (this.bold_button_color == 'blue')
                this.bold_button_color = 'white'
            else
                this.bold_button_color = 'blue'
            Module.cwrap('OnBold', 'void', [])(this.bold_button_color == 'blue')
            canvas.focus()
        },

        onItalic()
        {
            if (this.italic_button_color == 'blue')
                this.italic_button_color = 'white'
            else
                this.italic_button_color = 'blue'
            Module.cwrap('OnItalic', 'void', [])(this.italic_button_color == 'blue')
            canvas.focus()
        },

        onUnderline()
        {
            if (this.underline_button_color == 'blue')
                this.underline_button_color = 'white'
            else
                this.underline_button_color = 'blue'
            Module.cwrap('OnUnderline', 'void', [])(this.underline_button_color == 'blue')
            canvas.focus()
        },

        onStrikethrough()
        {
            if (this.strikethrough_button_color == 'blue')
                this.strikethrough_button_color = 'white'
            else
                this.strikethrough_button_color = 'blue'
            Module.cwrap('OnStrikethrough', 'void', [])(this.strikethrough_button_color == 'blue')
            canvas.focus()
        },

        onTextSubscript()
        {
            if (this.subscript_button_color == 'blue')
                this.subscript_button_color = 'white'
            else
            {
                this.subscript_button_color = 'blue'
                this.superscript_button_color = 'white'
            }
            Module.cwrap('OnTextSubscript', 'void', [])(this.subscript_button_color == 'blue')
            canvas.focus()
        },

        onTextSuperscript()
        {
            if (this.superscript_button_color == 'blue')
                this.superscript_button_color = 'white'
            else
            {
                this.superscript_button_color = 'blue'
                this.subscript_button_color = 'white'
            }
            Module.cwrap('OnTextSuperscript', 'void', [])(this.superscript_button_color == 'blue')
            canvas.focus()
        },

        onTextColor()
        {
            if (this.text_color == '')
                return
            this.store.commit('editor/setDialogColor', this.text_color)
            this.$q.dialog({ component: ColorPickerDialog })
                .onOk(() =>
                {
                    Module.cwrap('OnTextColor', 'void', ['string'])(this.store.state.editor.dialog_color)
                })
            canvas.focus()
        },

        onTextBgColor()
        {
            if (this.text_bg_color == '')
                return
            this.store.commit('editor/setDialogColor', this.text_bg_color)
            this.$q.dialog({ component: ColorPickerDialog })
                .onOk(() =>
                {
                    Module.cwrap('OnTextBgColor', 'void', ['string'])(this.store.state.editor.dialog_color)
                })
            canvas.focus()
        },

        onLink()
        {
            const link_json = Module.GetLink()
            if (link_json == '')
            {
                this.$q.dialog({ component: LinkDialog, parent: this, apiResponse: (this as any).resp })
            }
            else
            {
                const json = JSON.parse(link_json)
                this.$q.dialog({
                    component: LinkDialog,
                    parent: this,
                    apiResponse: (this as any).resp,
                    componentProps: { text_prop: json.text, url_prop: json.url }
                })
            }
            canvas.focus()
        },

        onLeftAlign()
        {
            if (this.left_align_button_color == 'blue')
                this.left_align_button_color = 'white'
            else
                this.left_align_button_color = 'blue'
            Module.cwrap('OnLeftAlign', 'void', [])(this.left_align_button_color == 'blue')
            canvas.focus()
        },

        onCenterAlign()
        {
            if (this.center_align_button_color == 'blue')
                this.center_align_button_color = 'white'
            else
                this.center_align_button_color = 'blue'
            Module.cwrap('OnCenterAlign', 'void', [])(this.center_align_button_color == 'blue')
            canvas.focus()
        },

        onRightAlign()
        {
            if (this.right_align_button_color == 'blue')
                this.right_align_button_color = 'white'
            else
                this.right_align_button_color = 'blue'
            Module.cwrap('OnRightAlign', 'void', [])(this.right_align_button_color == 'blue')
            canvas.focus()
        },

        onJustifyAlign()
        {
            if (this.justify_align_button_color == 'blue')
                this.justify_align_button_color = 'white'
            else
                this.justify_align_button_color = 'blue'
            Module.cwrap('OnJustifyAlign', 'void', [])(this.justify_align_button_color == 'blue')
            canvas.focus()
        },

        onNew()
        {
            window.dispatchEvent(new CustomEvent('newDocument'))
        },

        onUpload()
        {
            (this.$refs.yutovo_file as any)?.pickFiles()
        },

        onSave()
        {
            const hasDocId = this.$q.cookies.has('document_id')
            const docId = hasDocId ? this.$q.cookies.get('document_id') : 0
            Module.cwrap('OnSave', 'void', ['int'])(docId)
        },

        onSaveAs()
        {
            this.$q.dialog({ component: SaveAsDialog, parent: this, apiResponse: (this as any).resp })
        },

        onDownload()
        {
            if (this.editorRef)
                (this.editorRef as any).downloading = true
            Module.cwrap('OnDownload', 'void', ['int'])(this.$q.cookies.has('document_id') ? this.$q.cookies.get('document_id') : 0)
        },

        onExportHtml()
        {
            Module.cwrap('OnExportHtml', 'void', ['int'])(this.$q.cookies.has('document_id') ? this.$q.cookies.get('document_id') : 0)
        },

        onExportPdf()
        {
            const t = this.$t
            this.$q.dialog({ component: ExportPdfDialog, parent: this })
                .onOk((data: any) =>
                {
                    Module.cwrap('OnExportPdf', 'void', ['int', 'int', 'int', 'int', 'int', 'int', 'string'])(
                        data.pageWidth, data.pageHeight,
                        data.margins.left, data.margins.top, data.margins.right, data.margins.bottom,
                        t('This document was created with '))
                })
        },

        onRename()
        {
            this.$q.dialog({
                component: RenameDialog,
                parent: this,
                apiResponse: (this as any).resp,
                componentProps: { oldName: this.store.state.editor.document_name }
            })
        },

        async onDelete()
        {
            const s = this.store
            const t = this.$t
            const Cookies = this.$q.cookies
            let ld = (this.editorRef as any)?.last_documents || []
            if (ld && typeof ld.value !== 'undefined')
                ld = ld.value
            this.$q.dialog({
                title: t('Confirm'),
                message: t('Delete the document?'),
                ok: { label: t('OK') },
                cancel: { label: t('Cancel'), flat: true }
            }).onOk(() =>
            {
                api.post('/service/delete-document', {}, { headers: { access_token: s.state.login.access_token } }).then(
                    async () =>
                    {
                        const id = Cookies.get('document_id')
                        const i = ld.indexOf(id)
                        if (i > -1)
                            ld.splice(i, 1)
                        let _last_document_id = 0
                        if (ld.length > 0)
                        {
                            _last_document_id = ld.pop()
                            for (let j = 0; j < ld.length;)
                            {
                                if (ld[j] == _last_document_id)
                                    ld.splice(j, 1)
                                else
                                    ++j
                            }
                        }
                        Cookies.remove('document_id', { path: '/' })
                        if (_last_document_id == 0)
                        {
                            api.post('/service/list-documents', {}, { headers: { access_token: s.state.login.access_token } }).then(
                                (response: any) =>
                                {
                                    if (response.data.length == 0)
                                        window.dispatchEvent(new CustomEvent('newDocument'))
                                    else
                                        window.dispatchEvent(new CustomEvent('loadDocument',
                                        {
                                            detail:
                                            {
                                                document_id: response.data[0].id,
                                                check_changed: false
                                            }
                                        }))
                                    window.dispatchEvent(new CustomEvent('listDocuments', {}))
                                }
                            ).catch((response: any) =>
                            {
                                console.log(response)
                            })
                        }
                        else
                        {
                            window.dispatchEvent(new CustomEvent('loadDocument',
                            {
                                detail:
                                {
                                    document_id: _last_document_id,
                                    check_changed: false
                                }
                            }))
                        }
                        window.dispatchEvent(new CustomEvent('listDocuments', {}))
                    }
                ).catch((response: any) =>
                {
                    console.log(response)
                    alert('Error deleting the document')
                })
            })
        },

        onConfig()
        {
            this.$q.dialog({ component: ConfigDialog, parent: this, apiResponse: (this as any).resp })
        },

        onUndo()
        {
            Module.cwrap('OnUndo', 'void', [])()
        },

        onRedo()
        {
            Module.cwrap('OnRedo', 'void', [])()
        },

        onCut()
        {
            if (this.editorRef)
                this.editorRef.onCut()
        },

        onCopy()
        {
            if (this.editorRef)
                this.editorRef.onCopy()
        },

        onPaste()
        {
            if (this.editorRef)
                this.editorRef.onPaste()
        },

        onPlus()
        {
            Module.cwrap('OnPlus', 'void', [])()
        },

        onMinus()
        {
            Module.cwrap('OnMinus', 'void', [])()
        },

        onMultiply()
        {
            Module.cwrap('OnMultiply', 'void', [])()
        },

        onDivision()
        {
            Module.cwrap('OnDivision', 'void', [])()
        },

        onPower()
        {
            Module.cwrap('OnPower', 'void', [])()
        },

        onSqrt()
        {
            Module.cwrap('OnSqrt', 'void', [])()
        },

        onNthRoot()
        {
            Module.cwrap('OnNthRoot', 'void', [])()
        },

        onSubscript()
        {
            Module.cwrap('OnSubscript', 'void', [])()
        },

        onRoundBrackets()
        {
            Module.cwrap('OnRoundBrackets', 'void', [])()
        },

        onSquareBrackets()
        {
            Module.cwrap('OnSquareBrackets', 'void', [])()
        },

        onRadian()
        {
            Module.cwrap('InsertString', 'void', ['string'])(this.$t('rad'))
        },

        onDegree()
        {
            Module.cwrap('InsertString', 'void', ['string'])('°')
        },

        onMinute()
        {
            Module.cwrap('InsertString', 'void', ['string'])('\'')
        },

        onSecond()
        {
            Module.cwrap('InsertString', 'void', ['string'])('\'\'')
        },

        onGrad()
        {
            Module.cwrap('InsertString', 'void', ['string'])(this.$t('grad'))
        },

        onSum()
        {
            Module.cwrap('OnSum', 'void', [])()
        },

        onProduct()
        {
            Module.cwrap('OnProduct', 'void', [])()
        },

        onDefiniteIntegral()
        {
            Module.cwrap('OnDefiniteIntegral', 'void', [])()
        },

        onIndefiniteIntegral()
        {
            Module.cwrap('OnIndefiniteIntegral', 'void', [])()
        },

        onLimit()
        {
            Module.cwrap('OnLimit', 'void', [])()
        },

        onDerivative()
        {
            Module.cwrap('OnDerivative', 'void', [])()
        },

        onSecondDerivative()
        {
            Module.cwrap('OnSecondDerivative', 'void', [])()
        },

        onPartialDerivative()
        {
            Module.cwrap('OnPartialDerivative', 'void', [])()
        },

        onDerivativeAtPoint()
        {
            Module.cwrap('OnDerivativeAtPoint', 'void', [])()
        },

        onFunctionAtPoint()
        {
            Module.cwrap('OnFunctionAtPoint', 'void', [])()
        },

        onFunctionX()
        {
            Module.cwrap('OnFunctionX', 'void', [])()
        },

        onFunctionXY()
        {
            Module.cwrap('OnFunctionXY', 'void', [])()
        },

        onEvalutionBar()
        {
            Module.cwrap('OnEvaluationBar', 'void', [])()
        },

        onInsertFunction(name: string)
        {
            Module.cwrap('InsertFunction', 'void', ['string'])(name)
        },

        onInsertSubscriptFunction(name: string)
        {
            Module.cwrap('InsertSubscriptFunction', 'void', ['string'])(name)
        },

        onInfinity()
        {
            Module.cwrap('InsertString', 'void', ['string'])('∞')
        },

        onAssignment()
        {
            Module.cwrap('OnAssignment', 'void', [])()
        },

        onUnit()
        {
            Module.cwrap('OnUnit', 'void', [])()
        },

        onEquation()
        {
            Module.cwrap('OnEquation', 'void', [])()
        },

        onAnd()
        {
            Module.cwrap('InsertAnd', 'void', [])()
        },

        onOr()
        {
            Module.cwrap('InsertOr', 'void', [])()
        },

        onXor()
        {
            Module.cwrap('InsertXor', 'void', [])()
        },

        onNot()
        {
            Module.cwrap('InsertNot', 'void', [])()
        },

        onEqual()
        {
            Module.cwrap('InsertEqual', 'void', [])()
        },

        onGreater()
        {
            Module.cwrap('InsertGreater', 'void', [])()
        },

        onLess()
        {
            Module.cwrap('InsertLess', 'void', [])()
        },

        onGreaterEqual()
        {
            Module.cwrap('InsertGreaterEqual', 'void', [])()
        },

        onLessEqual()
        {
            Module.cwrap('InsertLessEqual', 'void', [])()
        },

        onNotEqual()
        {
            Module.cwrap('InsertNotEqual', 'void', [])()
        },

        onLettersHide()
        {
            canvas.focus()
        },

        onGreekLetter(letter: string)
        {
            Module.cwrap('InsertString', 'void', ['string'])(letter)
        },

        onGraphLine()
        {
            Module.cwrap('OnGraphLine', 'void', [])()
        },

        onGraphSurface()
        {
            Module.cwrap('OnGraphSurface', 'void', [])()
        },

        onGraphHistogram()
        {
            Module.cwrap('OnGraphHistogram', 'void', [])()
        },

        onMatrix()
        {
            this.$q.dialog(
            {
                component: MatrixSizeDialog,
                componentProps:
                {
                    title_prop: this.$t('Insert matrix'),
                    rows_prop: 2,
                    columns_prop: 2,
                    command_prop: 'OnMatrix'
                }
            })
            canvas.focus()
        },

        onDeterminant()
        {
            this.$q.dialog(
            {
                component: MatrixSizeDialog,
                componentProps:
                {
                    title_prop: this.$t('Insert determinant'),
                    rows_prop: 2,
                    columns_prop: 2,
                    command_prop: 'OnDeterminant'
                }
            })
            canvas.focus()
        },

        onVector()
        {
            this.$q.dialog(
            {
                component: MatrixSizeDialog,
                componentProps:
                {
                    title_prop: this.$t('Insert vector'),
                    rows_prop: 3,
                    columns_prop: 1,
                    command_prop: 'OnVector',
                    vector_prop: true
                }
            })
            canvas.focus()
        },

        onVectorElement()
        {
            Module.cwrap('OnVectorElement', 'void', [])()
        },

        onCurrency(currency: string)
        {
            Module.cwrap('InsertString', 'void', ['string'])(currency)
        },

        onToolbarToggle(name: string)
        {
            this.toolbars[name] = !this.toolbars[name]
            try
            {
                window.localStorage.setItem(TOOLBAR_VISIBILITY_KEY, JSON.stringify(this.toolbars))
            }
            catch (e)
            {
                // storage unavailable - keep the state for the current page only
            }
        },

        panelOrder(name: string)
        {
            for (let row = 0; row < this.toolbar_rows.length; ++row)
            {
                const col = this.toolbar_rows[row].indexOf(name)
                if (col >= 0)
                    return row * 100 + col
            }
            return 0
        },

        onPanelDragStart(name: string, event: DragEvent)
        {
            this.dragged_panel = name
            if (event.dataTransfer)
            {
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('text/plain', name)
            }
        },

        nearestPanelSlot(x: number, y: number)
        {
            let best = null
            let best_distance = Infinity
            for (const row of this.toolbar_rows)
            {
                for (const name of row)
                {
                    if (name === this.dragged_panel || !this.toolbars[name])
                        continue
                    const element = document.getElementById(name + '-toolbar')
                    if (!element)
                        continue
                    const rect = element.getBoundingClientRect()
                    const cy = rect.top + rect.height / 2
                    const slots =
                    [
                        { name: name, after: false, x: rect.left, y: cy },
                        { name: name, after: true, x: rect.right, y: cy }
                    ]
                    for (const slot of slots)
                    {
                        const distance = (slot.x - x) * (slot.x - x) + (slot.y - y) * (slot.y - y)
                        if (distance < best_distance)
                        {
                            best_distance = distance
                            best = slot
                        }
                    }
                }
            }
            return best
        },

        //Rebuild toolbar_rows from the actual on-screen rows; the dragged and hidden
        //panels keep their previous row because they have no geometry
        splitIntoRows()
        {
            const panels = []
            for (const row of this.toolbar_rows)
            {
                for (const name of row)
                {
                    if (name === this.dragged_panel || !this.toolbars[name])
                        continue
                    const element = document.getElementById(name + '-toolbar')
                    if (!element)
                        continue
                    panels.push({ name: name, order: this.panelOrder(name), top: element.getBoundingClientRect().top })
                }
            }
            panels.sort((a, b) => a.order - b.order)

            const rows = [[]]
            let top = null
            for (const panel of panels)
            {
                if (top !== null && Math.abs(panel.top - top) > 3)
                    rows.push([])
                top = panel.top
                rows[rows.length - 1].push(panel.name)
            }

            for (const row of this.toolbar_rows)
            {
                for (const name of row)
                {
                    if (name === this.dragged_panel || this.toolbars[name])
                        continue
                    const old_row = this.toolbar_rows.indexOf(row)
                    const old_col = row.indexOf(name)
                    if (old_row < rows.length)
                        rows[old_row].splice(Math.min(old_col, rows[old_row].length), 0, name)
                    else
                        rows[rows.length - 1].push(name)
                }
            }
            return rows
        },

        onToolbarsDragOver(event: DragEvent)
        {
            const slot = this.nearestPanelSlot(event.clientX, event.clientY)
            this.drag_over_panel = slot ? slot.name : null
            this.drag_over_after = slot ? slot.after : false
        },

        onToolbarsDrop(event: DragEvent)
        {
            const slot = this.nearestPanelSlot(event.clientX, event.clientY)
            if (this.dragged_panel && slot)
            {
                this.toolbar_rows = this.splitIntoRows()
                for (const row of this.toolbar_rows)
                {
                    const col = row.indexOf(slot.name)
                    if (col >= 0)
                    {
                        row.splice(slot.after ? col + 1 : col, 0, this.dragged_panel)
                        break
                    }
                }
                try
                {
                    window.localStorage.setItem(TOOLBAR_ORDER_KEY, JSON.stringify(this.toolbar_rows))
                }
                catch (e)
                {
                    // storage unavailable - keep the order for the current page only
                }
            }
            this.dragged_panel = null
            this.drag_over_panel = null
            this.drag_over_after = false
        },

        onPanelDragEnd()
        {
            this.dragged_panel = null
            this.drag_over_panel = null
            this.drag_over_after = false
        }
    }
})
</script>

<style scoped>
.toolbar-area
{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    column-gap: 6px;
    max-width: 100%;
    margin: 0 0 0 1em;
    min-height: 40px;
}

.toolbar-panel
{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 10px;
    row-gap: 4px;
    max-width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 3px 6px;
    margin-top: 6px;
    cursor: move;
    user-select: none;
}

.toolbar-panel img
{
    -webkit-user-drag: none;
}

.toolbar-panel-dragged
{
    opacity: 0.4;
}

.toolbar-panel-insert-before
{
    box-shadow: -3px 0 0 0 #1976d2;
}

.toolbar-panel-insert-after
{
    box-shadow: 3px 0 0 0 #1976d2;
}

.toolbar-line-break
{
    flex-basis: 100%;
    height: 0;
}

.toolbar-menu
{
    min-width: 220px;
}

.toolbar-select
{
    padding: 0em 0 0 0.5em;
}

.scale-value
{
    cursor: default;
}

.greek-letter-block
{
    border: 0px none;
    overflow: hidden;
}

.unordered-list-block
{
    border: 0px none;
    overflow: hidden;
}

.function-block
{
    border: 0px none;
    overflow: hidden;
}

.function-item
{
    min-width: 54px;
    border: 0px none;
    overflow: hidden;
}

.unordered-list-item
{
    width: 150px;
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

.currency-button
{
    min-width: 40px;
}
</style>
