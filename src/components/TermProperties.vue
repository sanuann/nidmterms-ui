<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body scroll">
                <vue-form-generator :key="selectedTerm" :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                <b-button @click="onSave">Save</b-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .scroll {
        /*margin:4px;*/
        /*padding:4px;*/
        height: 899px;
        overflow-y: auto;
    }


    h1 {
        text-align: center;
        font-size: 36px;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: 500;
    }

    fieldset {
        border: 0;
    }

    .panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        /*border-color: #ddd;*/
    }

    .panel-body {
        padding: 15px;
        overflow-y: scroll;
    }



    .field-checklist .wrapper {
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>

<script>
    import VueFormGenerator from 'vue-form-generator';
    import 'vue-form-generator/dist/vfg.css';
    export default {
        name: "TermProperties",
        props: {
            selectedTerm: String,
            init: Object,
            searchResults: Array
        },
        components: {
            "vue-form-generator": VueFormGenerator.component
        },

        data() {
            return {
                model: {
                    label: '',
                    sourceVariable: '',
                    description: '',
                    url: '',
                    valueType: '',
                    isAbout: [],
                    isPartOf: [],
                    datumType: '',
                    unitCode: '',
                    maxValue: '' ,
                    minValue: '',
                    allowableValues: [],
                    choices: [],
                    derivative: '',
                    citation: '',
                    measureOf: '',
                    provenance: ''
                },
                schema: {
                    fields: [{
                        type: "input",
                        inputType: "text",
                        label: "Label",
                        model: "label",
                        hint: "Label for the term",
                        readonly: false,
                        featured: true,
                        disabled: false,
                        validator: VueFormGenerator.validators.string
                    }, {
                        type: "input",
                        inputType: "text",
                        label: "Source variable",
                        model: "sourceVariable",
                        readonly: false,
                        hint: "Variable name from dataset",
                        featured: true,
                        required: false,
                        disabled: false,
                        validator: VueFormGenerator.validators.string
                    }, {
                        type: "input",
                        inputType: "text",
                        label: "Description",
                        model: "description",
                        featured: true,
                        required: false,
                        hint: "An explanation of the nature, scope, or meaning of the new term.",
                        validator: VueFormGenerator.validators.string
                    }, {
                        type: "input",
                        inputType: "text",
                        label: "valueType",
                        model: "valueType",
                        hint: "A value representation such as integer, float, string, date/time",
                        featured: true,
                        readonly: false,
                        required: false,
                        validator: VueFormGenerator.validators.string
                    }, {
                        type: "input",
                        inputType: 'text',
                        label: "datumType",
                        model: "datumType",
                        hint: "What type of datum it is (e.g. range,count,scalar etc.): see IAO definitions",
                        readonly: false,
                        featured: true,
                        disabled: false,
                        validator: VueFormGenerator.validators.string
                    }, {
                        type: "input",
                        inputType: 'text',
                        label: "Unit",
                        model: "hasUnit",
                        hint: "Unit of measurement following BIDS specification",
                        readonly: false,
                        featured: true,
                        disabled: false,
                        validator: VueFormGenerator.validators.string
                    }, {
                        type: "input",
                        inputType: 'number',
                        label: "Max Value",
                        model: "maximumValue",
                        readonly: false,
                        featured: true,
                        disabled: false,
                        validator: VueFormGenerator.validators.number
                    }, {
                        type: "input",
                        inputType: "number",
                        label: "Min Value",
                        model: "minimumValue",
                        readonly: false,
                        featured: true,
                        disabled: false,
                        validator: VueFormGenerator.validators.number
                    }, {
                        type: "checklist",
                        label: "isAbout",
                        model: "isAbout",
                        required: false,
                        multiSelect: true,
                        featured: true,
                        default: "No concept needed for this variable",
                        values: function() {
                            // eslint-disable-next-line
                            console.log(187, this.searchResults);
                            return [
                                "HTML5",
                                "Javascript",
                                "CSS3",
                                "CoffeeScript",
                                "AngularJS",
                                "ReactJS",
                                "VueJS"
                            ]
                        },

                        // readonly: false,
                        //
                        // disabled: false,
                        hint: "An explanation of the nature, scope, or meaning of the new term.",
                        validator: VueFormGenerator.validators.array
                    }, {
                        type: "input",
                        inputType: "text",
                        label: "allowableValues",
                        model: "allowableValues",
                        readonly: false,
                        featured: true,
                        disabled: false
                    }, {
                        type: "input",
                        inputType: "text",
                        label: "isPartOf",
                        model: "isPartOF",
                        readonly: false,
                        featured: true,
                        disabled: false,
                        required: false,
                        validator: VueFormGenerator.validators.array
                    }]
                },

                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            };
        },
        methods: {
            onSave() {
                this.$emit('saveResponse', this.selectedTerm, this.model);
            }
        },
        mounted() {
            if (this.init) {
                this.model = this.init;
            }
            // eslint-disable-next-line
            console.log(243, this.searchResults);
        }
    };
</script>
