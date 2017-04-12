<template>
    <div :class="stylePrefix">
        <input type="text"
               @focus="focus"
               @blur="blur"
               @keyup="keyup"
               ref="CxltAutoCompleteInput"
               :class="[stylePrefix+'-input',inputClass]" />
        <div :class="[stylePrefix+'-drop']"
             :style="{width:width+'px','max-height':dropMaxHeight+'px'}"
             v-show="showDrop && options"
             ref="CxltAutoCompleteDrop">
            <ul>
                <li v-for="(o,index) in options"
                    @mousedown="selected(o)"
                    v-html="displayText(o)"
                    :class="{hover:dropIndex===index}"></li>
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
            drop: null,
            liHeight: null,
            innerInputText: null,
            isSelect: false,
            hasInputText: false,
            dropIndex: -1
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
        },
        maxItems: {
            type: Number,
            default: 10
        }
    },
    mounted() {
        this.input = this.$refs.CxltAutoCompleteInput
        this.width = this.input.clientWidth
        this.drop = this.$refs.CxltAutoCompleteDrop
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
                if (!this.hasInputText) {
                    this.hasInputText = true
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
        },
        dropMaxHeight() {
            if (this.liHeight) {
                return this.liHeight * this.maxItems
            } else {
                return 0
            }
        }
    },
    methods: {
        focus() {
            this.focusInput = true
            if (this.inputText) {
                this.hasInputText = true
            } else {
                this.hasInputText = false
            }
            if (!this.isSelect && this.lessMinAction === 1) {
                this.$emit('change')
            }
        },
        blur() {
            this.focusInput = false
            this.showDrop = false
            if (this.hasInputText) {
                this.$emit('select')
            }
            this.hasInputText = false
        },
        keyup(e) {
            if (this.focusInput) {
                if (e.which === 38) {
                    // up
                    if (this.showDrop) {
                        --this.dropIndex
                        if (this.dropIndex < 0) {
                            this.dropIndex = this.options.length - 1
                        }
                    }
                } else if (e.which === 40) {
                    if (this.showDrop) {
                        this.dropIndex = ++this.dropIndex % this.options.length
                    }
                } else if (e.which === 13) {
                    // enter
                    this.selected(this.options[this.dropIndex])
                } else {
                    this.inputText = this.input.value
                }
            }
        },
        selected(o) {
            this.hasInputText = false
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
            if (!this.liHeight && ops && ops.length) {
                setTimeout(() => {
                    this.liHeight = this.drop.childNodes[0].childNodes[0].clientHeight
                    console.log(this.liHeight)
                }, 100)
            }
            if (ops && ops.length > 0 && !this.isSelect) {
                this.showDrop = true
            } else {
                this.showDrop = false
            }
        },
        showDrop(sd) {
            this.dropIndex = -1
        },
        dropIndex(index) {
            if (index > this.maxItems - 1) {
                this.drop.scrollTop = (index - (this.maxItems - 1)) * this.liHeight
            } else {
                this.drop.scrollTop = 0
            }
        }
    }
}

</script>
<style src="../assets/default.css"></style>
