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
                            :highlight="true"
                            :format="format"></cxlt-auto-complete>
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
                name: 'dealer qd'
            }, {
                id: 2,
                name: 'dealer jn'
            }]
        },
        select(o) {
            console.log(o)
        },
        format(o) {
            return o.name + '-' + o.id
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
