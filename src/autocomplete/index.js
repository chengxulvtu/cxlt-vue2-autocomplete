import AutoComplete from './AutoComplete'

const CxltAutocomplete = {
    install: function (Vue) {
        Vue.component(AutoComplete.name, AutoComplete)
    }
}

export default CxltAutocomplete
