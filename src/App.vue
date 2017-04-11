<template>
    <div style="position:absolute;top:100px;left:200px;">
        <cxlt-auto-complete :min-length="1"
                            @change="change"
                            :delay="100"
                            :display-field="displayField"
                            :options="options"
                            @select="select"
                            :input-class="'form-control'"
                            :less-min-action="1"></cxlt-auto-complete>
    </div>
</template>

<script>

// import axios from 'axios'

export default {
    name: 'App',
    data: () => {
        return {
            options:
            [{
                id: 1,
                name: '中信达名车'
            }, {
                id: 2,
                name: '恒程致远精品车'
            }
            ],
            displayField: 'name'
        }
    },
    methods: {
        change(value) {
            // console.log('app ' + value)
            this.options.push({
                id: this.options.length + 1,
                name: 'abbbbaaccceddsaa'
            })
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
