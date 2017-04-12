<template>
    <div :class="stylePrefix">
        <input type="text"
               @focus="focus"
               @blur="blur"
               @keyup="keyup"
               ref="CxltAutoCompleteInput"
               :class="[stylePrefix+'-input',inputClass]" />
        <div :class="[stylePrefix+'-drop']"
             :style="{width:width+'px'}"
             v-if="showDrop && options">
            <ul>
                <li v-for="o in options"
                    @mousedown="selected(o)"
                    v-html="displayText(o)"></li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    name: 'CxltAutoComplete',
    sto: null,
    data: () => {
        return {
            width: 128,
            showDrop: false,
            focusInput: false,
            input: null,
            innerInputText: null,
            isSelect: false
        }
    },
    props: {
        minLength: {
            type: Number,
            default: 1
        },
        lessMinAction: {
            type: Number,
            // 0 none 1 get all
            default: 0
        },
        delay: {
            type: Number,
            default: 150
        },
        options: {
            type: Array,
            default: function () {
                return []
            }
        },
        displayField: {
            type: String,
            default: 'text'
        },
        inputClass: {
            type: String
        },
        stylePrefix: {
            type: String,
            default: 'cxlt-autocomplete'
        },
        highlight: {
            type: Boolean,
            default: false
        },
        format: {
            type: Function
        }
    },
    mounted() {
        this.input = this.$refs.CxltAutoCompleteInput
        this.width = this.input.clientWidth
    },
    computed: {
        inputText: {
            get: function () {
                return this.innerInputText
            },
            set: function (val) {
                if (this.sto) {
                    clearTimeout(this.sto)
                }
                if (val.length >= this.minLength) {
                    this.sto = setTimeout(() => {
                        if (this.isSelect) {
                            this.isSelect = false
                        }
                        this.innerInputText = val
                        this.$emit('change', this.innerInputText)
                    }, this.delay)
                } else {
                    if (this.lessMinAction === 1) {
                        this.innerInputText = val
                        this.$emit('change')
                    }
                }
            }
        }
    },
    methods: {
        focus() {
            this.focusInput = true
            if (!this.isSelect && this.lessMinAction === 1) {
                this.$emit('change')
            }
        },
        blur() {
            this.focusInput = false
            this.showDrop = false
        },
        keyup() {
            if (this.focusInput) {
                this.inputText = this.input.value
            }
        },
        selected(o) {
            this.input.focus()
            this.input.value = o[this.displayField]
            this.$emit('select', o)
            this.showDrop = false
            this.isSelect = true
            setTimeout(() => {
                this.input.focus()
            }, 100)
        },
        displayText(o) {
            var text = ''
            if (this.format) {
                text = this.format(o)
            } else {
                text = o[this.displayField]
            }
            if (this.highlight) {
                text = this.highlightText(text)
            }
            return text
        },
        highlightText(option) {
            if (option && this.highlight && this.inputText) {
                return option.split(this.inputText).join('<span class="highlight">' + this.inputText + '</span>')
            }
            return option
        }
    },
    watch: {
        options(ops) {
            if (ops && ops.length > 0) {
                this.showDrop = true
            } else {
                this.showDrop = false
            }
        }
    }
}

</script>
<style src="../assets/default.css"></style>
