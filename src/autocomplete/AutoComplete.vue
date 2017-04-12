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
                    v-html="highlightText(o[displayField])"></li>
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
                this.sto = setTimeout(() => {
                    if (this.isSelect) {
                        this.isSelect = false
                    }
                    this.innerInputText = val
                    this.$emit('change', this.innerInputText)
                }, this.delay)
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
        },
        keyup() {
            if (this.focusInput) {
                var value = this.input.value
                if (value.length >= this.minLength) {
                    this.inputText = value
                } else {
                    if (this.lessMinAction === 1) {
                        this.$emit('change')
                    }
                }
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
        highlightText(option) {
            if (option && this.highlight) {
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
