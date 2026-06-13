<template>
    <div class="q-pa-md q-gutter-y-md column items-start" id="standard-toolbar">
        <q-file style="display: none" v-model="yutovo_file_model" @update:model-value="onFileSelected" accept=".yut" ref="yutovo_file"></q-file>
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
                <q-btn dense flat square icon="img:/images/format/dec_scale.png" size="14px" @click="onScaleDec" :disable="scale <= 50"/>
                <div class="scale-value" @click="onResetScale">
                    {{ scale }}%
                </div>
                <q-btn dense flat square icon="img:/images/format/inc_scale.png" size="14px" @click="onScaleInc" :disable="scale >= 500"/>
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
            <q-separator vertical/>
            <q-btn size="14px" square dense @click="onGraphLine();" icon="img:/images/graphs/graph_line.png">
                <q-tooltip class="bg-blue-7 no-border-radius text-body2" :delay="1000" square dense no-caps>{{ $t('Line graph') }}</q-tooltip>
            </q-btn>
            <q-separator vertical/>
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
        </q-btn-group>
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
import YutovoEditor from './YutovoEditor.vue'

declare function UTF8ToString(ptr: number): string

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
            scale: 100
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
            const scroll = document.getElementById('scroll-container')
            if (scroll)
            {
                window.dispatchEvent(new Event('resize'))
                ;canvas.focus()
            }

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
                editor.style.height = Math.max(availableHeight - 4, MIN_EDITOR_HEIGHT) + 'px'
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
                catch (err)
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
            const link_json = UTF8ToString(Module.cwrap('GetLink', 'number')())
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
            Module.cwrap('InsertString', 'void', ['string'])('&')
        },

        onOr()
        {
            Module.cwrap('InsertString', 'void', ['string'])('|')
        },

        onXor()
        {
            Module.cwrap('InsertString', 'void', ['string'])('^')
        },

        onNot()
        {
            Module.cwrap('InsertString', 'void', ['string'])('!')
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

        onCurrency(currency: string)
        {
            Module.cwrap('InsertString', 'void', ['string'])(currency)
        }
    }
})
</script>

<style scoped>
.q-pa-md
{
    padding: 0em 0 0 1em;
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
