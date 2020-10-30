<template>
    <div>
        <div>
            <p class="text-left"><b> Upload a CSV or TSV file to annotate:  </b></p>
            <input type="file" @change="onFileSelected">
<!--            <button @click="onFileSelected">Upload</button>-->

        </div>
        <div class="download-btn" v-if="isAnnotated">
            <b-button variant="primary" @click="downloadJSONLD">Download JSON-LD</b-button>
        </div>
<!--        <b-container fluid>-->
<!--            <b-checkbox-->
<!--                    :disabled="visibleFields.length == 1 && field.visible"-->
<!--                    v-for="field in fields"-->
<!--                    :key="field.key"-->
<!--                    v-model="field.visible"-->
<!--                    inline-->
<!--            >-->
<!--                {{ field.label }}-->
<!--            </b-checkbox>-->
<!--            <br /><br />-->
<!--            <b-table :items="items" :fields="visibleFields" bordered>-->
<!--            </b-table>-->
<!--        </b-container>-->


        <b-container fluid class="col-container" v-if="sourceList.length">
            <div id="sidebar-left">
                <p><b>Terms</b></p>
                <SourceVariableList :terms1="sourceList" :completed="completed"
                                    v-on:termSearchResult="searchList"
                                    v-on:termSelect="showTermProperties"
                ></SourceVariableList>
            </div>
            <div id="main-content" v-if="selectedTerm">
                <p><b>Term Properties</b></p>
                <transition name="fade" mode="out-in">
                    <TermProperties :key="selectedTerm" :init="responses[selectedTerm]"
                                    v-if="showForm" :selectedTerm="selectedTerm"
                                    :searchResults="getSearchResults"
                                    v-on:saveResponse="setResponse"></TermProperties>
                </transition>
            </div>
            <div id="sidebar-right" v-if="selectedTerm"><p><b>Interlex Search</b></p>
                <InterlexSearchList :terms="interlexTerms"></InterlexSearchList>
            </div>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import Papa from 'papaparse';
    import JSZip from 'jszip';
    import _ from 'lodash';
    import { saveAs } from 'file-saver';
    import 'vue-form-generator/dist/vfg.css';
    import SourceVariableList from './SourceVariableList';
    import InterlexSearchList from "./InterlexSearchList";
    import TermProperties from "./TermProperties";
    const API_KEY = 'CfufpoSNVXujv7h14HFHI4dL9p36mxCJ';
    export default {
        name: 'Annotate',
        components: {
            TermProperties,
            InterlexSearchList,
            SourceVariableList
        },
        data() {
            return {
                fileInput: {},
                terms: [],
                sourceList: [],
                interlexTerms: [],
                selectedTerm: null ,
                selectedFile: null,
                image: { backgroundImage: "static/images/nidm-terms-background.png" },
                showForm: false,
                responses: {},
                completed: {},
                isAnnotated: false
            }
        },
        watch: {
            responses: {
                deep: true,
                handler(newVal) {
                  this.isAnnotated = !_.isEmpty(newVal);
                  // eslint-disable-next-line
                  console.log(82, 'in resp watcher ', newVal, _.isEmpty(newVal), this.isAnnotated);

                }
            },
            interlexTerms() {
                this.$forceUpdate();
                // deep: true,
                // handler(newVal, oldVal) {
                //     // eslint-disable-next-line
                //     console.log(97, oldVal, newVal);
                //     oldVal = newVal;
                // }
            }
        },
        methods: {
            downloadJSONLD() {
                const annotatedFile = this.createAnnotatedFile(this.responses);
                const jszip = new JSZip();
                // eslint-disable-next-line
                console.log(117, this.responses);
                jszip.folder('responses').file(`${this.fileInput.name.split('.')[0]}.jsonld`, JSON.stringify(annotatedFile, null, 4));
                jszip.generateAsync({ type: 'blob' })
                    .then((myzipfile) => {
                        const fileName = `study-data`;
                        saveAs(myzipfile, fileName);
                    });
            },
            createAnnotatedFile(responses) {
                // eslint-disable-next-line
                console.log(117, responses);
                // const r = {
                //     "race": {
                //         "label": "race1",
                //         "sourceVariable": "race",
                //         "description": "something",
                //         "url": "",
                //         "valueType": "",
                //         "isAbout": [],
                //         "isPartOf": [],
                //         "datumType": "",
                //         "unitCode": "",
                //         "maxValue": "",
                //         "minValue": "",
                //         "allowableValues": [],
                //         "choices": [],
                //         "derivative": "",
                //         "citation": "",
                //         "measureOf": "",
                //         "provenance": ""
                //     }
                // };
                let annotatedObject = {};

                for (const [key, value] of Object.entries(responses)) {
                    // eslint-disable-next-line
                    console.log(`${key}: ${value}`);
                    const annotateKey = `DD(source=${this.fileInput.name}, variable=${key})`;
                    const annotatedValue = {
                        "label": key,
                        "description": value.description,
                        "sameAs": "https://ndar.nih.gov/api/datadictionary/v2/dataelement/src_subject_id",
                        "valueType": value.valueType,
                        "source_variable": value.sourceVariable,
                        "isAbout": value.isAbout
                    };
                    annotatedObject[annotateKey] = annotatedValue;
                }
                return annotatedObject;
            },
            onFileSelected(event) {
                this.fileInput = event.target.files[0];
                // eslint-disable-next-line
                console.log(116, this.fileInput.name.split('.')[0]);
                Papa.parse(this.fileInput, {
                    complete: results => {
                        this.sourceList = results.data[0];
                    },

                });
            },
            searchList(termList) {
                this.interlexTerms = termList;
                // eslint-disable-next-line
                console.log(127, this.interlexTerms);
            },
            showTermProperties(termSelected) {
                this.selectedTerm = termSelected;
                this.showForm = true;
            },
            onTermChange(query_string) {
                // eslint-disable-next-line
                // console.log(18, query_string);
                axios.get(`https://scicrunch.org/api/1/term/elastic/search?term=${query_string}`, {
                    params: {
                        key: API_KEY,
                    }
                }).then(response => {
                    // eslint-disable-next-line
                    // console.log(56, response.data.data.hits.hits);
                    this.terms = response.data.data.hits.hits;
                });
            },
            setResponse(selectedTerm, annotations) {
                // eslint-disable-next-line
                console.log(104, selectedTerm, annotations, Object.keys(annotations));
                this.$set(this.responses, selectedTerm, annotations);
                // this.responses[selectedTerm] = annotations;
                // todo: check if all properties are set and then set completed to true or false
                if (annotations) { //change the condition
                    this.completed[selectedTerm] = false;
                    // eslint-disable-next-line
                    console.log(128, this.completed, Object.values(annotations));
                } else this.completed[selectedTerm] = false;
            }
        },
        computed: {
            // getResponses() {
            //     // eslint-disable-next-line
            //     console.log(142);
            //     return this.responses.splice(this.responses.length); // returns true if response present
            // },
            visibleFields() {
                return this.fields.filter(field => field.visible)
            },
            getSearchResults() {
                // eslint-disable-next-line
                console.log(168, this.interlexTerms);
                return this.interlexTerms;

            }
        },

    }
</script>

<style scoped>
    .col-container {
        display: flex;
        width: 100%;
    }

    .bv-example-row {
        border: black;
    }
    /*Demo Styles*/

    p {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #444;
        margin: 20px;
        /*padding: 150px 0;!*Add some height to the columns*!*/
    }

    #main-content {
        background-color: #eef3f7;
        width: 50%;
        float: left;
    }

    #sidebar-left {
        background-color: #e3e9ee;
        width: 25%;
        float: left;
    }

    #sidebar-right {
        background-color: #dbe1e6;
        width: 25%;
        float: left;
    }

    /*Base Mobile Layout*/
    .wrap {
        width: 90%;
        margin: 0 auto;
    }

    /*#main-content, #sidebar-left, #sidebar-right {*/
    /*    width: 50%;*/
    /*    float: left;*/
    /*}*/

    /* Create three unequal columns that floats next to each other */
    .column {
        float: left;
        padding: 10px;
    }

    .left, .right {
        width: 25%;
    }

    .middle {
        width: 50%;
    }

    /*3 Column Layout*/
    /*@media only screen and (min-width: 1024px) {*/
    /*    .wrap {*/
    /*        width: 1024px;*/
    /*        margin: 0 auto;*/
    /*    }*/

    /*    #main-content {*/
    /*        width: 50%;*/
    /*        float: left;*/
    /*    }*/

    /*    #sidebar-left {*/
    /*        width: 25%;*/
    /*        float: left;*/
    /*    }*/

    /*    #sidebar-right {*/
    /*        width: 25%;*/
    /*        float: left;*/
    /*    }*/
    /*}*/

    /*Wide Layout*/
    /*@media only screen and (min-width: 1200px) {*/
    /*    .wrap {*/
    /*        width: 1140px;*/
    /*        margin: 0 auto;*/
    /*    }*/
    /*}*/

    /*Move Sidebar Position*/
    /*@media only screen and (min-width: 1024px) {*/
    /*    .wrap, #main-content, #sidebar-left, #sidebar-right {*/
    /*        position: relative;*/
    /*    }*/

    /*    #main-content, #sidebar-left, #sidebar-right {*/
    /*        top: 0;*/
    /*    }*/

    /*    #sidebar-right {*/
    /*        right: 0;*/
    /*    }*/

    /*    #sidebar-left {*/
    /*        left: -50%; !*Width of #main-content*!*/
    /*    }*/

    /*    #main-content {*/
    /*        left: 25%; !*Width of #left-sidebar*!*/
    /*    }*/
    /*}*/

    /*Optional 2 Column Layout*/
    /*@media only screen and (min-width: 768px) and (max-width: 1024px) {*/
    /*    #sidebar-right {*/
    /*        width: 50%;*/
    /*    }*/
    /*    #sidebar-left {*/
    /*        width: 50%;*/
    /*    }*/
    /*    #main-content {*/
    /*        position: relative;*/
    /*        top: 0;*/
    /*        left: 0;*/
    /*    }*/
    /*}*/

    .community-logo {
        height: 60px;
        margin-right: 10px;
        vertical-align: middle;
    }

    .community-name {
        font-size: 28px;
    }

    .breadcrumbs-v3 {
        padding: 10px 0;
        background: #585f69;
        border-bottom: 1px solid #eee;
    }

    .breadcrumb {
        top: 10px;
        padding-right: 0;
        background: none;
        position: relative;
    }

    .pull-right {
        float: right!important;
    }

    input {
        padding: 15px;
        border-radius: 8px;
        width: calc(33.333333% - 20px);
        box-sizing: border-box;
    }

    .download-btn {
        padding-bottom: 10px;
        padding-left: 15px;
    }

</style>
