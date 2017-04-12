<template>
    <div style="position:absolute;top:100px;left:200px;">
        <cxlt-auto-complete :min-length="1"
                            @change="change"
                            :delay="100"
                            :display-field="displayField"
                            :options="options"
                            @select="select"
                            :input-class="'form-control'"
                            :less-min-action="1"
                            :highlight="true"></cxlt-auto-complete>
    </div>
</template>

<script>

// import axios from 'axios'

export default {
    name: 'App',
    data: () => {
        return {
            options: null,
            displayField: 'name'
        }
    },
    methods: {
        change(value) {
            // console.log('app ' + value)
            // this.options.push({
            //     id: this.options.length + 1,
            //     name: 'abbbbaaccceddsaa'
            // })
            this.options = [{
                id: 1,
                name: 'dealer 1'
            }, {
                id: 2,
                name: 'dealer 2'
            }, {
                id: 1,
                name: 'dealer 3'
            }, {
                id: 2,
                name: 'dealer 4'
            }, {
                id: 1,
                name: 'dealer 5'
            }, {
                id: 2,
                name: 'dealer 6'
            }, {
                id: 1,
                name: 'dealer 7'
            }, {
                id: 2,
                name: 'dealer 8'
            }, {
                id: 1,
                name: 'dealer 9'
            }, {
                id: 2,
                name: 'dealer 10'
            }, {
                id: 1,
                name: 'dealer 11'
            }, {
                id: 2,
                name: 'dealer 12'
            }]
        },
        select(o) {
            console.log(o)
        }
    }
}

</script>


<style>
.cxlt-autocomplete input {
    width: 300px;
    font-size: 20px;
}
</style>
