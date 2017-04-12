<template>
    <div style="position:absolute;top:100px;left:200px;">
        <cxlt-auto-complete :min-length="1"
                            @change="change"
                            :delay="100"
                            :display-field="displayField"
                            :options="options"
                            @select="select"
                            :input-class="'form-control'"
                            :less-min-action="0"
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
                id: 100,
                name: '100'
            }, {
                id: 200,
                name: '200'
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
