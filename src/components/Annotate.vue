<template>
    <div>
        <div>
            <p class="text-left"><b> Upload a CSV or TSV file to annotate:  </b></p>
            <input type="file" @change="onFileSelected">
<!--            <button @click="onFileSelected">Upload</button>-->

        </div>
        <div v-if="sourceList.length">
            <div id="main-content">
                <p><b>Term Properties</b></p>
                <transition name="fade" mode="out-in">
                    <TermProperties :key="selectedTerm" :init="responses[selectedTerm]"
                                    v-if="showForm" :selectedTerm="selectedTerm" v-on:saveResponse="setResponse"></TermProperties>
                </transition>
            </div>
            <div id="sidebar-left">
                <p><b>Terms</b></p>
                <SourceVariableList v-if="sourceList.length" :terms1="sourceList"
                                    v-on:termSearchResult="searchList"
                                    v-on:termSelect="showTermProperties"
                ></SourceVariableList>
            </div>
            <div id="sidebar-right"><p><b>Interlex Search</b></p>
                <InterlexSearchList :terms="interlexTerms"></InterlexSearchList>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Papa from 'papaparse';
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
            return { terms: [],
                sourceList: [],
                interlexTerms: [],
                selectedTerm: null ,
                selectedFile: null,
                image: { backgroundImage: "static/images/nidm-terms-background.png" },
                showForm: false,
                responses: {}
            }
        },
        methods: {
            onFileSelected(event) {
                const fileInput = event.target.files[0];
                Papa.parse(fileInput, {
                    complete: results => {
                        this.sourceList = results.data[0];
                    },

                });
            },
            searchList(termList) {
                this.interlexTerms = termList;
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
                // console.log(104, selectedTerm, annotations);
                this.responses[selectedTerm] = annotations;

            }
        }
    }
</script>

<style>
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
    }

    #sidebar-left {
        background-color: #e3e9ee;
    }

    #sidebar-right {
        background-color: #dbe1e6;
    }

    /*Base Mobile Layout*/
    .wrap {
        width: 90%;
        margin: 0 auto;
    }

    #main-content, #sidebar-left, #sidebar-right {
        width: 50%;
        float: left;
    }

    /*3 Column Layout*/
    @media only screen and (min-width: 1024px) {
        .wrap {
            width: 1024px;
            margin: 0 auto;
        }

        #main-content {
            width: 50%;
            float: left;
        }

        #sidebar-left {
            width: 25%;
            float: left;
        }

        #sidebar-right {
            width: 25%;
            float: left;
        }
    }

    /*Wide Layout*/
    @media only screen and (min-width: 1200px) {
        .wrap {
            width: 1140px;
            margin: 0 auto;
        }
    }

    /*Move Sidebar Position*/
    @media only screen and (min-width: 1024px) {
        .wrap, #main-content, #sidebar-left, #sidebar-right {
            position: relative;
        }

        #main-content, #sidebar-left, #sidebar-right {
            top: 0;
        }

        #sidebar-right {
            right: 0;
        }

        #sidebar-left {
            left: -50%; /*Width of #main-content*/
        }

        #main-content {
            left: 25%; /*Width of #left-sidebar*/
        }
    }

    /*Optional 2 Column Layout*/
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        #sidebar-right {
            width: 50%;
        }
        #sidebar-left {
            width: 50%;
        }
        #main-content {
            position: relative;
            top: 0;
            left: 0;
        }
    }

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

</style>
