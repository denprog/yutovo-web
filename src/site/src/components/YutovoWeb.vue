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
            <q-separator vertical/>
            <q-btn size="14px" id="settings-button" square dense no-caps @click="onConfig();" icon="img:/images/standard/settings.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Document properties') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="undo-button" square dense @click="onUndo();" icon="img:/images/standard/undo.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Undo') }} (Ctrl+Z)</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="redo-button" square dense @click="onRedo();" icon="img:/images/standard/redo.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Redo') }} (Ctrl+Y)</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="cut-button" square dense @click="onCut();" icon="img:/images/standard/cut.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Cut') }} (Shift+Del)</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="copy-button" square dense @click="onCopy();" icon="img:/images/standard/copy.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Copy') }} (Ctrl+Ins)</q-tooltip>
            </q-btn>
            <q-btn size="14px" id="paste-button" square dense @click="onPaste();" icon="img:/images/standard/paste.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Paste') }} (Shift+Ins)</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <div class="scale-control row items-center no-wrap">
                <q-btn dense flat round icon="img:/images/format/dec_scale.png" size="sm" @click="onScaleDec" :disable="scale <= 50"/>
                <div class="scale-value" @click="onResetScale">
                    {{ scale }}%
                </div>
                <q-btn dense flat round icon="img:/images/format/inc_scale.png" size="sm" @click="onScaleInc" :disable="scale >= 500"/>
            </div>
            <q-separator vertical/>
            <q-btn size="14px" id="insert-calculator-button" square dense @click="onInsertCalculator();" icon="img:/images/format/code.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Insert calculator') }} (Ctrl+Shift+C)</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn size="14px" id="recalculate-button" square dense @click="onRecalculate();" icon="img:/images/format/recalculate.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Recalculate the document') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-select class="toolbar-select" style="white-space: nowrap;" v-model="paragraph_format_model" :options="paragraph_format" 
                @update:model-value="onParagraphFormat();" dense options-dense borderless>
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Paragraph format') }}</q-tooltip>
            </q-select>
            <q-separator vertical/>
            <q-select class="toolbar-select" style="white-space: nowrap;" v-model="font_family_model" :options="font_family" @update:model-value="onFontFamily();" 
                dense options-dense borderless>
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Font family') }}</q-tooltip>
            </q-select>
            <q-select class="toolbar-select" style="white-space: nowrap;" v-model="font_size_model" :options="font_size" @update:model-value="onFontSize();" 
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
            <q-separator vertical/>
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
    </div>

    <div class="q-pa-md q-gutter-y-md column items-start" id="algebra-toolbar">
        <q-btn-group id="algebra-toolbar" flat square unelevated stretch>
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
            <q-btn size="14px" square dense @click="onAssignment();" icon="img:/images/algebra/assignment.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Assignment') }} (:)</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onUnit();" icon="img:/images/algebra/unit.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Unit') }} (~)</q-tooltip>
            </q-btn>
            <q-btn size="14px" square dense @click="onEquation();" icon="img:/images/algebra/equation.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Equation') }} (=)</q-tooltip>
            </q-btn>
            <q-separator vertical/>
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
            <q-separator vertical/>
            <div class="greek-letter-block">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Greek letters') }}</q-tooltip>
                <q-btn-dropdown class="greek-letter-block" square dense no-caps label="α" @hide='onLettersHide()'>
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
            <q-separator vertical/>
            <q-btn size="14px" square dense @click="onGraphLine();" icon="img:/images/graphs/graph_line.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Line graph') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
            <q-btn-group id="algebra-toolbar" flat square unelevated stretch>
                <q-btn size="14px" style="min-width: 20px;" square dense @click="onCurrency('R$');">
                    R$
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Brazilian real') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" style="min-width: 20px;" square dense @click="onCurrency('¥');">
                    ¥
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Chinese yuan') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" style="min-width: 20px;" square dense @click="onCurrency('€');">
                    €
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Euro') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" style="min-width: 20px;" square dense @click="onCurrency('₹');">
                    ₹
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Indian rupee') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" style="min-width: 20px;" square dense @click="onCurrency('₽');">
                    ₽
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Russian ruble') }}</q-tooltip>
                </q-btn>
                <q-btn size="14px" style="min-width: 20px;" square dense @click="onCurrency('$');">
                    $
                    <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('US dollar') }}</q-tooltip>
                </q-btn>
            </q-btn-group>
        </q-btn-group>
    </div>

    <div class="editor-container" id="editor" tabindex=0>
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex=-1 />
        
        <prompt-dialog
            v-model="promptVisible"
            :prompt-items="promptItems"
            :prompt-pos="promptPos"
            @select="onPromptSelect"
        />

        <div id="scroll-container">
            <q-menu ref="contextMenu" touch-position square fit context-menu @hide='onCloseContextMenu();' @show='onShowContextMenu();'>
                <q-list dense style="min-width: 100px">
                    <q-item id="copy-menu" clickable @click='onCopy();'>
                        <q-item-section>{{ $t('Copy') }}</q-item-section>
                    </q-item>
                    <q-item id="paste-menu" clickable @click='onPaste();'>
                        <q-item-section>{{ $t('Paste') }}</q-item-section>
                    </q-item>
                    <q-item id="cut-menu" clickable @click='onCut();'>
                        <q-item-section>{{ $t('Cut') }}</q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item auto-close id="present-as-menu" clickable style='display:none;'>
                        <q-item-section square>{{ $t('Present as') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="present-as-auto-menu" dense clickable @click='onPresentAsAuto();'>
                                    <div v-if="autoMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Auto') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-real-menu" dense clickable @click='onPresentAsReal();'>
                                    <div v-if="realMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Real') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-integer-menu" dense clickable @click='onPresentAsInteger();'>
                                    <div v-if="integerMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Integer') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-rational-menu" dense clickable @click='onPresentAsRational();'>
                                    <div v-if="rationalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Rational') }}</q-item-section>
                                </q-item>
                                <q-item id="present-as-complex-menu" dense clickable @click='onPresentAsComplex();'>
                                    <div v-if="complexMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Complex') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-precision-menu" clickable style='display:none;' @click='onSetPrecision();'>
                        <q-item-section>{{ $t('Precision') }}</q-item-section>
                    </q-item>

                    <q-item id="set-exp-menu" clickable style='display:none;' @click='onSetExp();'>
                        <q-item-section>{{ $t('Exponent order') }}</q-item-section>
                    </q-item>

                    <q-item auto-close id="set-default-angle-measure-menu" clickable style='display:none;'>
                        <q-item-section square>{{ $t('Default angle measure') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-default-radian-angle-measure-menu" dense clickable @click='onSetDefaultRadianAngleMeasure();'>
                                    <div v-if="defaultRadianMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Radian') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-degree-angle-measure-menu" dense clickable @click='onSetDefaultDegreeAngleMeasure();'>
                                    <div v-if="defaultDegreeMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Degree') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-grad-angle-measure-menu" dense clickable @click='onSetDefaultGradAngleMeasure();'>
                                    <div v-if="defaultGradMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Grad') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item auto-close id="set-result-angle-measure-menu" clickable style='display:none;'>
                        <q-item-section square>{{ $t('Result angle measure') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-result-radian-angle-measure-menu" dense clickable @click='onSetResultRadianAngleMeasure();'>
                                    <div v-if="resultRadianMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Radian') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-degree-angle-measure-menu" dense clickable @click='onSetResultDegreeAngleMeasure();'>
                                    <div v-if="resultDegreeMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Degree') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-grad-angle-measure-menu" dense clickable @click='onSetResultGradAngleMeasure();'>
                                    <div v-if="resultGradMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Grad') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-default-notation-menu" clickable style='display:none;'>
                        <q-item-section>{{ $t('Default notation') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-default-binary-notation-menu" dense clickable @click='onSetDefaultBinaryNotation();'>
                                    <div v-if="defaultBinaryMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Binary') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-octal-notation-menu" dense clickable @click='onSetDefaultOctalNotation();'>
                                    <div v-if="defaultOctalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Octal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-decimal-notation-menu" dense clickable @click='onSetDefaultDecimalNotation();'>
                                    <div v-if="defaultDecimalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Decimal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-default-hexadecimal-notation-menu" dense clickable @click='onSetDefaultHexadecimalNotation();'>
                                    <div v-if="defaultHexadecimalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Hexadecimal') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-result-notation-menu" clickable style='display:none;'>
                        <q-item-section>{{ $t('Result notation') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-result-binary-notation-menu" dense clickable @click='onSetResultBinaryNotation();'>
                                    <div v-if="resultBinaryMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Binary') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-octal-notation-menu" dense clickable @click='onSetResultOctalNotation();'>
                                    <div v-if="resultOctalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Octal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-decimal-notation-menu" dense clickable @click='onSetResultDecimalNotation();'>
                                    <div v-if="resultDecimalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Decimal') }}</q-item-section>
                                </q-item>
                                <q-item id="set-result-hexadecimal-notation-menu" dense clickable @click='onSetResultHexadecimalNotation();'>
                                    <div v-if="resultHexadecimalMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Hexadecimal') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-fraction-form-menu" clickable style='display:none;'>
                        <q-item-section>{{ $t('Fraction form') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-fraction-form-proper-menu" dense clickable @click='onProperFractionForm();'>
                                    <div v-if="properMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Proper') }}</q-item-section>
                                </q-item>
                                <q-item id="set-fraction-form-improper-menu" dense clickable @click='onImproperFractionForm();'>
                                    <div v-if="improperMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Improper') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-complex-form-menu" clickable style='display:none;'>
                        <q-item-section>{{ $t('Complex form') }}</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>

                        <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                                <q-item id="set-arithmetic-complex-form-menu" dense clickable @click='onArithmeticComplexForm();'>
                                    <div v-if="arithmeticMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Arithmetic') }}</q-item-section>
                                </q-item>
                                <q-item id="set-trigonometric-complex-form-menu" dense clickable @click='onTrigonometricComplexForm();'>
                                    <div v-if="trigonometricMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Trigonometric') }}</q-item-section>
                                </q-item>
                                <q-item id="set-exponential-complex-form-menu" dense clickable @click='onExponentialComplexForm();'>
                                    <div v-if="exponentialMenuChecked == true">&check;</div>
                                    <q-item-section>{{ $t('Exponential') }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-item id="set-unit-menu" clickable style='display:none;' @click='onSetUnit();'>
                        <q-item-section>{{ $t('Unit') }}</q-item-section>
                    </q-item>
                    
                    <q-item id="graph-format" clickable style='display:none;' @click='onGraphFormat();'>
                        <q-item-section>{{ $t('Graph format') }}</q-item-section>
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
import ConfigDialog from 'layouts/ConfigDialog.vue';
import SetUnitDialog from 'layouts/SetUnitDialog.vue';
import LinkDialog from 'layouts/LinkDialog.vue';
import ConfirmDialog from 'layouts/ConfirmDialog.vue';
import GraphFormatDialog from 'layouts/GraphFormatDialog.vue';
import PlotFormatDialog from 'layouts/PlotFormatDialog.vue';
import ExportPdfDialog from 'layouts/ExportPdfDialog.vue';
import PromptDialog from 'layouts/PromptDialog.vue';
import pako from 'pako';

export default
{
    name: 'YutovoWeb',

    components: { PromptDialog },

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
            window.addEventListener('loadDocumentById', this.loadDocumentById, false);
            window.addEventListener('loadLibraryDocument', this.loadLibraryDocument, false);
            window.addEventListener('includeDocument', this.includeDocument, false);
            window.addEventListener('loadResult', this.loadResult, false);
            window.addEventListener('updateDocumentName', this.updateDocumentName, false);
            window.addEventListener('translateString', this.translateString, false);
            window.addEventListener('solverAction', this.solverAction, false);
            window.addEventListener('plotFormatDialog', this.plotFormatDialog, false);
            window.addEventListener('documentChanged', this.documentChanged, false);
            window.addEventListener('exportHtml', this.exportHtml, false);
            window.addEventListener('exportPdf', this.exportPdf, false);
            window.addEventListener('showPrompt', this.showPrompt, false);
            window.addEventListener('hidePrompt', this.hidePrompt, false);
            window.addEventListener('setScale', this.setScale, false);
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
            window.attachEvent('loadDocumentById', this.loadDocumentById);
            window.attachEvent('loadLibraryDocument', this.loadLibraryDocument);
            window.attachEvent('includeDocument', this.includeDocument, false);
            window.attachEvent('loadResult', this.loadResult);
            window.attachEvent('updateDocumentName', this.updateDocumentName, false);
            window.attachEvent('translateString', this.translateString);
            window.attachEvent('solverAction', this.solverAction);
            window.attachEvent('plotFormatDialog', this.plotFormatDialog);
            window.attachEvent('documentChanged', this.documentChanged);
            window.attachEvent('exportHtml', this.exportHtml);
            window.attachEvent('exportPdf', this.exportPdf, false);
            window.attachEvent('showPrompt', this.showPrompt);
            window.attachEvent('hidePrompt', this.hidePrompt);
            window.attachEvent('setScale', this.setScale);
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

        const yutovo_file_model = ref(null);
        const yutovo_file = ref(null);

        const contextMenu = ref(null);

        const promptForm = ref(null);
        const promptVisible = ref(false);
        const promptItems = ref([]);
        const promptPos = ref([0, 0]);

        var downloading = false;

        const loading = computed({
            get: () => (store.state.editor.loading)
        });

        var jsonClipboard = '';

        return {
            style,

            scale_model: ref('100%'),
            scales: [
                '50%', '80%', '90%', '100%', '110%', '120%', '150%'
            ],

            paragraph_format_model: ref('Text body'),
            paragraph_format: [
                'Text body', 'Header 1', 'Header 2', 'Header 3', 'Monospace', 'Code'
            ],

            font_family_model: ref('Arial'),
            font_family: [
                'Arial', 'Courier New', 'FreeMono', 'Times New Roman', 'DejaVu Serif'
            ],

            font_size_model: ref('14'),
            font_size: [
                '', '6', '7', '8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'
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
                        var arr = new Uint8Array(reader.result);
                        try
                        {
                            //try to open as compressed
                            const output = pako.ungzip(arr);
                            var str = new TextDecoder().decode(output);
                            window.dispatchEvent(new CustomEvent('newDocument', 
                                {
                                    detail:
                                    {
                                        name: yutovo_file_model.value.name,
                                        json: str
                                    }
                                }));
                        }
                        catch (err)
                        {
                            //try to open as decompressed
                            const text = new TextDecoder().decode(reader.result);
                            window.dispatchEvent(new CustomEvent('newDocument', 
                                {
                                    detail:
                                    {
                                        name: yutovo_file_model.value.name,
                                        json: text
                                    }
                                }));
                        }
                    }
                }
                reader.readAsArrayBuffer(yutovo_file_model.value);
            },

            last_documents: [],

            yutovo_file_model,
            yutovo_file,

            contextMenu,

            promptForm,
            promptVisible,
            promptItems,
            promptPos,

            downloading,

            jsonClipboard,

            loading
        };
    },

    mounted()
    {
        window.sockets = new Map();
        window.socket_id = 1;
        var r = this.router;
        var s = this.store;
        var q = this.$q;

        this.getClipboardPermission().then(result => 
            {
                console.log('Clipboard permission: ', result);
            }
        );

        var Module =
            {
                canvas: (
                    function()
                    {
                        var canvas = document.getElementById('canvas');
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
                        if (Cookies.get('reset_document') === '1')
                        {
                            window.dispatchEvent(new CustomEvent('openDocument', {})); //for unregistered user open new document
                        }
                        else if (route.path.substring(0, 8) == '/library')
                        {
                            var doc = route.params.language + '/';
                            if (typeof route.params.dir1 !== 'undefined')
                                doc += route.params.dir1 + '/';
                            if (typeof route.params.dir2 !== 'undefined')
                                doc += route.params.dir2 + '/';
                            if (typeof route.params.dir3 !== 'undefined')
                                doc += route.params.dir3 + '/';
                            doc += route.params.filename;
                            doc = doc.replaceAll(/\\/g, '/');
                            doc = doc.substring(2);
                            if (route.params.language == 'en' || route.params.language == 'ru' || route.params.language == 'es')
                                s.commit('editor/setLanguage', route.params.language);
                            window.dispatchEvent(new CustomEvent('loadLibraryDocument', 
                                {
                                    'detail': 
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
                                var lang = 'en';
                                if (navigator.language.startsWith('ru'))
                                    lang = 'ru';
                                else if (navigator.language.startsWith('es'))
                                    lang = 'es';
                                var first_page = '';
                                switch (lang)
                                {
                                case 'ru':
                                    first_page = '/Другое/Первая страница.yut';
                                    break;
                                case 'es':
                                    first_page = '/Otros/Primera página.yut';
                                    break;
                                default:
                                    first_page = '/Others/First page.yut';
                                    break;
                                }
                                window.dispatchEvent(new CustomEvent('loadLibraryDocument', 
                                    {
                                        'detail': 
                                        {
                                            document: first_page, 
                                            language: lang
                                        }
                                    }));
                            }
                            else
                                window.dispatchEvent(new CustomEvent('openDocument', {})); //open document by cookie
                        }
                        else
                            window.dispatchEvent(new CustomEvent('openDocument', {})); //open document by cookie

                        canvas.focus();

                        Cookies.set('app_initialized', true, {path: '/', expires: '30d'});

                        if (Cookies.has('language'))
                        {
                            //update the expire date
                            Cookies.set('language', Cookies.get('language'), {path: '/', expires: '30d'});
                        }

                        if (Cookies.has('refresh_token'))
                        {
                            //auto-login
                            api.post('/auth/refresh-token', {},).then(
                                function(response)
                                {
                                    s.dispatch('login/updateAccessToken', response.headers['access_token']);
                                    s.commit('login/setLastError', '');

                                    //get user settings
                                    api.post('/service/get-user-settings', {},
                                        {
                                            headers:
                                            {
                                                access_token: s.state.login.access_token
                                            }
                                        }
                                        ).then(
                                            function(response)
                                            {
                                                s.commit('editor/setSettings', response.data.settings);
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
                                    Cookies.remove('document_id');
                                }
                            );
                        }

                        s.commit('editor/setLoading', false);

                        this.current_document = '';
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
            subscript_button_color: 'white',
            superscript_button_color: 'white',
            text_color: '#000000',
            text_bg_color: '#ffffff',
            left_align_button_color: 'white',
            center_align_button_color: 'white',
            right_align_button_color: 'white',
            justify_align_button_color: 'white',
            scale: 100
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
            Module.cwrap('OnConfig', 'void', ['string', 'bool'])(JSON.stringify(c), !window.loading);
            window.loading = false;
            canvas.focus();
        },

        'store.state.editor.resizing': function()
        {
            if (this.store.state.editor.resizing)
            {
                this.store.commit('editor/setResizing', false);
                this.onResize();
            }
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
            this.subscript_button_color = (event.detail.subscript == 1 ? 'blue' : 'white');
            this.superscript_button_color = (event.detail.superscript == 1 ? 'blue' : 'white');
            this.text_color = event.detail.text_color;
            this.text_bg_color = event.detail.text_bg_color;
            this.left_align_button_color = (event.detail.left_align == 1 && !event.detail.code_block ? 'blue' : 'white');
            this.center_align_button_color = (event.detail.center_align == 1 && !event.detail.code_block ? 'blue' : 'white');
            this.right_align_button_color = (event.detail.right_align == 1 && !event.detail.code_block ? 'blue' : 'white');
            this.justify_align_button_color = (event.detail.justify_align == 1 && !event.detail.code_block ? 'blue' : 'white');

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

            button = document.getElementById('subscript-button');
            button.disabled = (event.detail.subscript < 0);

            button = document.getElementById('superscript-button');
            button.disabled = (event.detail.superscript < 0);

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

            button = document.getElementById('left-align-button');
            button.disabled = event.detail.code_block;
            button = document.getElementById('center-align-button');
            button.disabled = event.detail.code_block;
            button = document.getElementById('right-align-button');
            button.disabled = event.detail.code_block;
            button = document.getElementById('justify-align-button');
            button.disabled = event.detail.code_block;

            document.title = this.$t('Yutovo - visual online calculator');
        },

        onScaleDec()
        {
            Module.cwrap('OnScaleInc', 'void', ['int'])(-10);
            canvas.focus();
        },

        onScaleInc()
        {
            Module.cwrap('OnScaleInc', 'void', ['int'])(10);
            canvas.focus();
        },

        onResetScale()
        {
            Module.cwrap('OnScaleSet', 'void', ['int'])(100);
            canvas.focus();
        },

        onInsertCalculator()
        {
            Module.cwrap('OnInsertCalculator', 'void', [])();
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

        onTextSubscript()
        {
            if (this.subscript_button_color == 'blue')
                this.subscript_button_color = 'white';
            else
            {
                this.subscript_button_color = 'blue';
                this.superscript_button_color = 'white';
            }
            Module.cwrap('OnTextSubscript', 'void', [])(this.subscript_button_color == 'blue');
            canvas.focus();
        },

        onTextSuperscript()
        {
            if (this.superscript_button_color == 'blue')
                this.superscript_button_color = 'white';
            else
            {
                this.superscript_button_color = 'blue';
                this.subscript_button_color = 'white';
            }
            Module.cwrap('OnTextSuperscript', 'void', [])(this.superscript_button_color == 'blue');
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

        onLink()
        {
            var link_json = UTF8ToString(Module.cwrap('GetLink', 'number')());
            if (link_json == '')
            {
                this.$q.dialog(
                    {
                        component: LinkDialog, 
                        parent: this, 
                        apiResponse: this.resp
                    });
            }
            else
            {
                var json = JSON.parse(link_json);
                this.$q.dialog(
                    {
                        component: LinkDialog, 
                        parent: this, 
                        apiResponse: this.resp,
                        componentProps: 
                        {
                            text_prop: json.text,
                            url_prop: json.url
                        }
                    });
            }
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
            if (this.store.state.login.login == '')  //for unregistered just reset the document
            {
                Module.cwrap('OnNew', 'void', [])();
                this.store.commit('editor/setDocumentName', '');
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
            Module.cwrap('OnSave', 'void', ['int'])(Cookies.has('document_id') ? Cookies.get('document_id') : 0);
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
            Module.cwrap('OnDownload', 'void', ['int'])(Cookies.has('document_id') ? Cookies.get('document_id') : 0);
            canvas.focus();
        },

        onExportHtml()
        {
            console.log('onExportHtml');
            Module.cwrap('OnExportHtml', 'void', ['int'])(Cookies.has('document_id') ? Cookies.get('document_id') : 0);
            canvas.focus();
        },

        onExportPdf()
        {
            console.log('onExportPdf');
            var t = this.$t;
            const margins = ref({
                left: 20,
                top: 20,
                right: 20,
                bottom: 20
            });
            this.$q.dialog({
                component: ExportPdfDialog, 
                parent: this, 
                componentProps: {
                    initMargins: margins.value
                }
            })
            .onOk((data) => {
                Module.cwrap('OnExportPdf', 'void', ['int', 'int', 'int', 'int', 'int', 'int', 'string'])(data.pageWidth, data.pageHeight, 
                    data.margins.left, data.margins.top, data.margins.right, data.margins.bottom, t('This document was created with '));
            });
            canvas.focus();
        },

        onRename()
        {
            this.$q.dialog({
                component: RenameDialog, 
                parent: this, 
                apiResponse: this.resp,
                componentProps: {
                    oldName: this.store.state.editor.document_name
                }
            });
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
                ok: {
                    label: t('OK')
                },
                cancel: {
                    label: t('Cancel'),
                    flat: true
                }
            }).onOk(() => {
                api.post('/service/delete-document', {}, 
                    {
                        headers:
                        {
                            access_token: s.state.login.access_token
                        }
                    }
                    ).then(
                        function()
                        {
                            var id = Cookies.get('document_id');
                            const i = last_documents.indexOf(id);
                            if (i > -1)
                                last_documents.splice(i, 1);
                            //open previous document or load a first one
                            get_last_document().then(_last_document_id =>
                                {
                                    Cookies.remove('document_id', {path: '/'});
                                    if (_last_document_id == 0)
                                    {
                                        api.post('/service/list-documents', {}, 
                                            {
                                                headers:
                                                {
                                                    access_token: s.state.login.access_token
                                                }
                                            }
                                            ).then(
                                                function(response)
                                                {
                                                    if (response.data.length == 0)
                                                        window.dispatchEvent(new CustomEvent('newDocument'));
                                                    else
                                                        window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: response.data[0].id}}));
                                                }
                                            ).catch(
                                                function(response)
                                                {
                                                    console.log(response);
                                                }
                                            );
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

        async checkDocumentChanged()
        {
            var t = this.$t;
            var s = this.store;
            if (window.Module.cwrap('IsChanged', 'bool', [])())
            {
                try
                {
                    const dialog = this.$q.dialog(
                        {
                            component: ConfirmDialog,
                            componentProps: {
                                title: t('Confirm'),
                                message: t('Save the document?')
                            }
                        });
                    
                    try
                    {
                        const result = await new Promise((resolve) => 
                            {
                                dialog.onOk((data) => 
                                    {
                                        resolve(data);
                                    });
                            });
                        switch (result)
                        {
                        case 'yes':
                            window.Module.cwrap('OnSave', 'void', ['int'])(Cookies.has('document_id') ? Cookies.get('document_id') : 0);
                            break;
                        case 'no':
                            s.commit('editor/setDocumentChanged', false);
                            return true;
                        case 'cancel':
                            return false;
                        }
                        return false;
                    }
                    catch (error)
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
        },

        async newDocument(event)
        {
            console.log('newDocument');

            window.newDocument = true;
            if (!(await this.checkDocumentChanged()))
                return;
            window.newDocument = false;

            const languageToInt = (language) =>
                language === 'en' ? 1 :
                language === 'ru' ? 2 :
                language === 'es' ? 3 : 0;

            var s = this.store;
            var t = this.$t;
            api.post('/service/new-document', 
                event.detail == null ? 
                {
                    language: languageToInt(s.state.editor.language)
                }
                : 
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
                                    last_document: Cookies.has('document_id') ? Cookies.get('document_id') : 0,
                                    check_changed: false
                                }
                            }));
                        s.commit('editor/setDocumentChanged', false);
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        if (typeof response.response.data.error !== 'undefined')
                            alert(t('Error creating the document: ') + t(response.response.data.error));
                        else
                            alert(t('Error creating the document: ') + t(response.response.data));
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

                if (filename.slice(-4) != '.yut')
                    filename += '.yut';
                let arr = Uint8Array.from(event.detail.json);
                const blob = new Blob([arr], {type: 'application/octet-stream'});
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

            let arr = Uint8Array.from(event.detail.json);
            var json = JSON.parse(new TextDecoder().decode(arr));
            var r = this.router;
            var t = this.$t;
            var s = this.store;
            if (r.currentRoute.value.path.substring(0, 8) == '/library') //save the current library document as a new user document
            {
                var route = r.currentRoute.value;
                var doc = route.params.language + '/';
                if (typeof route.params.dir1 !== 'undefined')
                    doc += route.params.dir1 + '/';
                if (typeof route.params.dir2 !== 'undefined')
                    doc += route.params.dir2 + '/';
                if (typeof route.params.dir3 !== 'undefined')
                    doc += route.params.dir3 + '/';
                doc += route.params.filename;
                doc = doc.replaceAll(/\\/g, '/');
                doc = doc.substring(2);
                api.post('/service/save-library-document', 
                    {
                        document: doc,
                        json: JSON.stringify(json),
                        language: route.params.language
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
                            r.push({ path: '/document/' + response.data.document_id });
                            Cookies.set('document_id', response.data.document_id, {path: '/', expires: '1d'});
                            window.dispatchEvent(new CustomEvent('updateDocumentName', 
                                {
                                    detail: 
                                    {
                                        document_id: response.data.document_id
                                    }
                                }));
                            canvas.focus();
                            window.dispatchEvent(new CustomEvent('listDocuments', {}));
                            s.commit('editor/setDocumentChanged', false);
                            window.Module.cwrap('SetChanged', 'void', ['bool'])(false);
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                            if (typeof response.response.data.error !== 'undefined')
                                alert(t('Error saving the document: ') + t(response.response.data.error));
                            else
                                alert(t('Error saving the document: ') + t(response.response.data));
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
                            r.push({path: '/document/' + response.data.document_id});
                            Cookies.set('document_id', response.data.document_id, {path: '/', expires: '1d'});
                            window.dispatchEvent(new CustomEvent('updateDocumentName', 
                                {
                                    detail: 
                                    {
                                        document_id: response.data.document_id
                                    }
                                }));
                            canvas.focus();
                            s.commit('editor/setDocumentChanged', false);
                            window.Module.cwrap('SetChanged', 'void', ['bool'])(false);

                            //continue broken operation
                            if (typeof window.newDocument !== 'undefined' && window.newDocument == true)
                            {
                                window.dispatchEvent(new CustomEvent('newDocument'));
                                window.newDocument = false;
                            }
                            else if (typeof window.load_document_id !== 'undefined' && window.load_document_id != 0)
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
                                if (typeof response.response.data.error !== 'undefined')
                                    alert(t('Error saving the document: ') + t(response.response.data.error));
                                else
                                    alert(t('Error saving the document: ') + t(response.response.data));
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

        async loadDocumentById(event)
        {
            var id = event.detail.document_id;
            var get_last_document = this.getLastDocument;
            api.post('/service/load-document', 
                {
                    document_id: id,
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
                                    window.dispatchEvent(new CustomEvent('newDocument'));
                                else
                                    window.dispatchEvent(new CustomEvent('loadDocument', {detail: {document_id: _last_document_id}}));
                            });
                    }
                );
            window.dispatchEvent(new CustomEvent('listDocuments', {}));
        },

        async loadDocument(event)
        {
            var check_changed = true;
            if (typeof event.detail.check_changed !== 'undefined')
                check_changed = event.detail.check_changed;
            if (check_changed)
            {
                window.load_document_id = event.detail.document_id;
                if (!(await this.checkDocumentChanged()))
                    return;
                window.load_document_id = 0;
            }

            this.current_document = '';
            if (typeof event.detail.name !== 'undefined' && event.detail.name != '')
            {
                //get document id by name
                api.post('/service/get-document-id', 
                    {
                        name: event.detail.name
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
                            window.dispatchEvent(new CustomEvent('loadDocumentById', {detail: {document_id: response.data.document_id}}));
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                            alert('Document not found');
                        }
                    );
            }
            else
            {
                window.dispatchEvent(new CustomEvent('loadDocumentById', {detail: {document_id: event.detail.document_id}}));
            }
        },

        async loadLibraryDocument(event)
        {
            var doc = event.detail.document;
            var language = event.detail.language;
            if (doc == null)
                return;
            
            this.current_document = doc;
            var s = this.store;
            if (language == 'undefined')
                language = s.state.editor.language == '' ? 'en' : s.state.editor.language;
            api.post('/service/load-library-document', 
                {
                    document: doc,
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
                            window.Module.cwrap('OnLibraryFilePart', 'void', ['string', 'int', 'int'])(s, 0, 0);
                        }
                        var s = json.substr(i);
                        window.Module.cwrap('OnLibraryFilePart', 'void', ['string', 'int', 'int'])(s, 0, 1);
                        canvas.focus();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        alert('Error loading the library document');
                    }
                );
        },

        async includeDocument(event)
        {
            var name = event.detail.name;
            var language = this.store.state.editor.language == '' ? 'en' : this.store.state.editor.language;
            var s = this.store;
            var id = event.detail.document_id;
            api.post('/service/load-include-document', 
                {
                    name: name,
                    current_document: this.current_document,
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
                        window.Module.cwrap('OnOpenInclude', 'void', ['string', 'int'])(JSON.stringify(response.data), id);
                        canvas.focus();
                    }
                ).catch(
                    function(response)
                    {
                        console.log(response);
                        alert('Error loading the include document');
                    }
                );
        },

        async documentChanged(event)
        {
            this.store.commit('editor/setDocumentChanged', event.detail.changed);
        },

        async exportHtml(event)
        {
            var html = event.detail.html;
            var s = this.store;
            var filename = s.state.editor.document_name;
            if (filename == '' || typeof filename == 'undefined')
                return;

            if (filename.slice(-4) != '.yut')
                filename += '.html';
            else
                filename = filename.slice(0, -4) + '.html';
            let arr = new TextEncoder().encode(html);
            const blob = new Blob([arr], {type: 'text/html;charset=utf-8'});
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
        },

        async exportPdf(event)
        {
            var blob = event.detail.pdf;
            var s = this.store;
            var filename = s.state.editor.document_name;
            if (filename == '' || typeof filename == 'undefined')
                return;

            if (filename.slice(-4) != '.yut')
                filename += '.pdf';
            else
                filename = filename.slice(0, -4) + '.pdf';
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
        },

        async showPrompt(event)
        {
            this.promptVisible = false;
            const data = JSON.parse(event.detail);
            this.promptItems = data.items;
            this.promptPos = {x: data.x, y: data.y};
            this.promptVisible = true;
            canvas.focus();
        },

        async hidePrompt()
        {
            this.promptVisible = false;
            canvas.focus();
        },

        onPromptSelect(value)
        {
            Module.cwrap('OnPromptSelected', 'void', ['string'])(value);
        },

        async setScale(event)
        {
            this.scale = event.detail;
            canvas.focus();
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
                    //it is a library document
                    var doc = this.current_document;
                    window.library_document = doc; //save for opening a link
                    window.dispatchEvent(new CustomEvent('updateDocumentName', 
                        {
                            detail: 
                            {
                                name: doc
                            }
                        }));
                    var language = this.store.state.editor.language == '' ? 'en' : this.store.state.editor.language;
                    window.language = language;
                    Cookies.remove('document_id', {path: '/'});
                }
                else
                {
                    Cookies.set('document_id', id, {path: '/', expires: '1d'});
                    this.router.push({path: '/document/' + id});
                    window.dispatchEvent(new CustomEvent('updateDocumentName', 
                        {
                            detail: 
                            {
                                document_id: id
                            }
                        }));
                    window.library_document = '';
                    window.user_document = id; //save for opening a link
                    if (last_document_id != 0)
                        this.last_documents.push(last_document_id);
                }

                window.loading = true;
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
            var r = this.router;
            if (event.detail.name != undefined)
            {
                api.post('/service/get-document-name', 
                    {
                        name: event.detail.name,
                        lang: this.store.state.editor.language
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
                            var n = response.data.name;
                            var doc = s.state.editor.language + n;
                            doc = '/library/' + doc.replaceAll(/\\/g, '/');
                            r.push({ path: doc });
                            s.commit('editor/setDocumentName', n);
                            if (n.slice(-4) == '.yut')
                                n = n.substr(0, n.length - 4);
                            window.dispatchEvent(new CustomEvent('libraryDocumentOpen', {detail: {name: n}}));
                        }
                    ).catch(
                        function(response)
                        {
                            console.log(response);
                        }
                    );
                return;
            }

            api.post('/service/get-document-name', 
                {
                    document_id: event.detail.document_id
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

        async solverAction(event)
        {
            api.post('/service/solver-action', JSON.parse(event.detail.json),
                {
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
                if (navigator.userAgent.toLowerCase().includes('chrome') || 
                    (navigator.userAgent.toLowerCase().includes('firefox') && await this.getClipboardPermission()))
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

            var p = window.Module.cwrap('GetPresentAsMenu', 'int', [])();
            if (p != 0)
            {
                console.log('GetPresentAsMenu: ', p);
                var m = document.getElementById('present-as-menu');
                m.style.display = '';
                this.autoMenuChecked = p == 1;
                this.realMenuChecked = p == 2;
                this.integerMenuChecked = p == 3;
                this.rationalMenuChecked = p == 4;
                this.complexMenuChecked = p == 5;

                if (p == 1 || p == 2 || p == 5)
                {
                    m = document.getElementById('set-precision-menu');
                    m.style.display = '';
                    m = document.getElementById('set-exp-menu');
                    m.style.display = '';

                    m = document.getElementById('set-default-angle-measure-menu');
                    m.style.display = '';
                    var r = window.Module.cwrap('GetDefaultAngleMeasure', 'int', [])();
                    this.defaultRadianMenuChecked = r == 0;
                    this.defaultDegreeMenuChecked = r == 1;
                    this.defaultGradMenuChecked = r == 2;

                    m = document.getElementById('set-result-angle-measure-menu');
                    m.style.display = '';
                    r = window.Module.cwrap('GetResultAngleMeasure', 'int', [])();
                    this.resultRadianMenuChecked = r == 0;
                    this.resultDegreeMenuChecked = r == 1;
                    this.resultGradMenuChecked = r == 2;

                    r = window.Module.cwrap('GetResultType', 'int', [])();
                    if (r == 4) //ResultType::COMPLEX
                    {
                        m = document.getElementById('set-complex-form-menu');
                        m.style.display = '';
                        var r = window.Module.cwrap('GetComplexForm', 'int', [])();
                        this.arithmeticMenuChecked = r == 0;
                        this.trigonometricMenuChecked = r == 1;
                        this.exponentialMenuChecked = r == 2;
                    }
                }

                if (p == 3)
                {
                    m = document.getElementById('set-default-notation-menu');
                    m.style.display = '';
                    var r = window.Module.cwrap('GetDefaultNotation', 'int', [])();
                    this.defaultBinaryMenuChecked = r == 0;
                    this.defaultOctalMenuChecked = r == 1;
                    this.defaultDecimalMenuChecked = r == 2;
                    this.defaultHexadecimalMenuChecked = r == 3;

                    m = document.getElementById('set-result-notation-menu');
                    m.style.display = '';
                    r = window.Module.cwrap('GetResultNotation', 'int', [])();
                    this.resultBinaryMenuChecked = r == 0;
                    this.resultOctalMenuChecked = r == 1;
                    this.resultDecimalMenuChecked = r == 2;
                    this.resultHexadecimalMenuChecked = r == 3;
                }

                if (p == 4)
                {
                    m = document.getElementById('set-fraction-form-menu');
                    m.style.display = '';
                    var r = window.Module.cwrap('GetFractionForm', 'int', [])();
                    this.properMenuChecked = r == 0;
                    this.improperMenuChecked = r == 1;
                }

                if (p == 5)
                {
                    m = document.getElementById('set-complex-form-menu');
                    m.style.display = '';
                    var r = window.Module.cwrap('GetComplexForm', 'int', [])();
                    this.arithmeticMenuChecked = r == 0;
                    this.trigonometricMenuChecked = r == 1;
                    this.exponentialMenuChecked = r == 2;
                }
            }

            m = document.getElementById('set-unit-menu');
            if (window.Module.cwrap('HasUnit', 'int', [])())
                m.style.display = '';

            m = document.getElementById('graph-format');
            if (window.Module.cwrap('IsGraph', 'int', [])())
                m.style.display = '';
            
            this.$refs.contextMenu.updatePosition();
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

        async plotFormatDialog()
        {
            var color = event.detail.color;
            var width = event.detail.width;
            this.$q.dialog(
                {
                    component: PlotFormatDialog, 
                    parent: this, 
                    apiResponse: this.resp,
                    componentProps: 
                    {
                        width_prop: width,
                        color_prop: color
                    }
                });
            canvas.focus();
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
                title: '<div class="text-blue text-h5">' + this.$t('Precision') + '</div>',
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
                title: '<div class="text-blue text-h5">' + this.$t('Exponent order') + '</div>',
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

        onSetDefaultRadianAngleMeasure()
        {
            window.Module.cwrap('OnDefaultAngleMeasure', 'void', ['int'])(0);
        },

        onSetDefaultDegreeAngleMeasure()
        {
            window.Module.cwrap('OnDefaultAngleMeasure', 'void', ['int'])(1);
        },

        onSetDefaultGradAngleMeasure()
        {
            window.Module.cwrap('OnDefaultAngleMeasure', 'void', ['int'])(2);
        },

        onSetResultRadianAngleMeasure()
        {
            window.Module.cwrap('OnResultAngleMeasure', 'void', ['int'])(0);
        },

        onSetResultDegreeAngleMeasure()
        {
            window.Module.cwrap('OnResultAngleMeasure', 'void', ['int'])(1);
        },

        onSetResultGradAngleMeasure()
        {
            window.Module.cwrap('OnResultAngleMeasure', 'void', ['int'])(2);
        },

        onSetDefaultBinaryNotation()
        {
            window.Module.cwrap('OnDefaultNotation', 'void', ['int'])(0);
        },

        onSetDefaultOctalNotation()
        {
            window.Module.cwrap('OnDefaultNotation', 'void', ['int'])(1);
        },

        onSetDefaultDecimalNotation()
        {
            window.Module.cwrap('OnDefaultNotation', 'void', ['int'])(2);
        },

        onSetDefaultHexadecimalNotation()
        {
            window.Module.cwrap('OnDefaultNotation', 'void', ['int'])(3);
        },

        onSetResultBinaryNotation()
        {
            window.Module.cwrap('OnResultNotation', 'void', ['int'])(0);
        },

        onSetResultOctalNotation()
        {
            window.Module.cwrap('OnResultNotation', 'void', ['int'])(1);
        },

        onSetResultDecimalNotation()
        {
            window.Module.cwrap('OnResultNotation', 'void', ['int'])(2);
        },

        onSetResultHexadecimalNotation()
        {
            window.Module.cwrap('OnResultNotation', 'void', ['int'])(3);
        },

        onSetUnit()
        {
            this.contextMenu.hide();
            this.$q.dialog({component: SetUnitDialog, parent: this, apiResponse: this.resp});
            canvas.focus();
        },

        onGraphFormat()
        {
            this.contextMenu.hide();
            var format_json = UTF8ToString(Module.cwrap('GetGraphFormat', 'number')());
            if (format_json == '')
                return;
            var json = JSON.parse(format_json);
            this.$q.dialog(
                {
                    component: GraphFormatDialog, 
                    parent: this, 
                    apiResponse: this.resp,
                    componentProps: 
                    {
                        width_prop: json.width,
                        height_prop: json.height,
                        color_prop: json.color,
                        grid_width_prop: json.grid_width
                    }
                });
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

        onRoundBrackets()
        {
            Module.cwrap('OnRoundBrackets', 'void', [])();
            canvas.focus();
        },

        onSquareBrackets()
        {
            Module.cwrap('OnSquareBrackets', 'void', [])();
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

        onAnd()
        {
            Module.cwrap('InsertString', 'void', ['string'])('&');
            canvas.focus();
        },

        onOr()
        {
            Module.cwrap('InsertString', 'void', ['string'])('|');
            canvas.focus();
        },

        onXor()
        {
            Module.cwrap('InsertString', 'void', ['string'])('^');
            canvas.focus();
        },

        onNot()
        {
            Module.cwrap('InsertString', 'void', ['string'])('!');
            canvas.focus();
        },

        onLettersHide()
        {
            canvas.focus();
        },

        onGreekLetter(letter)
        {
            Module.cwrap('InsertString', 'void', ['string'])(letter);
            canvas.focus();
        },

        onGraphLine()
        {
            Module.cwrap('OnGraphLine', 'void', [])();
            canvas.focus();
        },

        onCurrency(currency)
        {
            Module.cwrap('InsertString', 'void', ['string'])(currency);
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

.greek-letter-block {
    border: 0px none;
    overflow: hidden;
}

.greek-letter {
    size: 16px;
    width: 20px;
    border: 0px none;
    overflow: hidden;
}

.q-pa-md {
    padding: 0em 0 0 1em;
}

.toolbar-select {
    padding: 0em 0 0 0.5em;
}

.scale-value {
    cursor: default;
}
</style>
