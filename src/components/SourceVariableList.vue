<!--<template>-->
<!--    <div>-->
<!--        <ul class="list-group">-->
<!--            &lt;!&ndash; key property is used whenever list is updated &ndash;&gt;-->
<!--            <TermListItem-->
<!--                    v-for="term in terms1"-->
<!--                    :term="term"-->
<!--                    :key="term"-->
<!--                    @termSelect="onTermSelect"-->
<!--            >-->
<!--            </TermListItem>-->
<!--        </ul>-->
<!--        <TermDetail :results="results">-->

<!--        </TermDetail>-->
<!--    </div>-->
<!--</template>-->

<template>
    <div>
        <ul class="list-group">
            <!-- key property is used whenever list is updated -->
            <TermListItem
                    v-for="term in terms1"
                    :term="term"
                    :key="term"
                    :completed="completed"
                    @termSelect="onTermSelect"
            >
            </TermListItem>

<!--            <li class="list-group-item" v-for="term in terms1" :key="term">-->
<!--                <a @click="onTermSelect">-->
<!--                    <span class="align-middle">-->
<!--                     {{term}}-->
<!--                   </span>-->
<!--                </a>-->
<!--            </li>-->
        </ul>
    </div>
</template>

<script>
    import TermListItem from './TermListItem';
    import axios from "axios";
    const API_KEY = 'CfufpoSNVXujv7h14HFHI4dL9p36mxCJ';

    export default {
        name: "SourceVariableList",
        props: {
            terms1: Array,
            completed: Object,
        },
        data() {
          return {
              results: [],
              itemCompleted: false
          }
        },
        components: {
            TermListItem
        },
        watch: {
            completed: {
                deep: true
            },
        },
        methods: {
            onTermSelect(term) {
                this.$emit('termSelect', term);

                // axios.get(`https://scicrunch.org/api/1/term/elastic/search?term=${term}`, {
                //     params: {
                //         key: API_KEY,
                //     }
                // }).then(response => {
                //     // eslint-disable-next-line
                //     console.log(56, response.data.data.hits.hits);
                //     this.results = response.data.data.hits.hits;
                // });

                // const query = {
                //     query: {
                //         bool: {
                //             must : [
                //                 {  term : { type : "cde" } },
                //                 { term : { "ancestors.ilx" : "ilx_0115066" } },
                //                 { multi_match : {
                //                         query: term,
                //                         fields: [ "label" , "definition" ]
                //                     }
                //                 }
                //             ]
                //         }
                //     }
                // };
                axios.get(`https://scicrunch.org/api/1/elastic/interlex/term/_search?q=${term}`, {
                    params: {
                        key: API_KEY
                        // source: JSON.stringify(query),
                        // source_content_type: 'application/json'
                    }
                }).then(response => {
                    // eslint-disable-next-line
                    // console.log(56, term, response.data.hits.hits);
                    this.$emit('termSearchResult', response.data.hits.hits);
                });
            }
        }
    };
</script>

<style scoped>

</style>
