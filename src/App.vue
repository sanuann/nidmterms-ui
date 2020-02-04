<template>
    <div class="container">
        <SearchBar @termChange="onTermChange"></SearchBar>
        <TermList :terms="terms"></TermList>
    </div>

</template>

<script>
    import axios from 'axios';
    import SearchBar from './components/SearchBar';
    import TermList from './components/TermList';
    const API_KEY = 'CfufpoSNVXujv7h14HFHI4dL9p36mxCJ';
    export default {
        name: 'App',
        components: {
            SearchBar,
            TermList
        },
        data() {
            return { terms: []}
        },
        methods: {
            onTermChange(query_string) {
                // eslint-disable-next-line
                // console.log(18, query_string);
                axios.get(`https://scicrunch.org/api/1/term/elastic/search?term=${query_string}`, {
                    params: {
                        key: API_KEY,
                    }
                }).then(response => {
                    // eslint-disable-next-line
                    console.log(56, response.data.data.hits.hits);
                    this.terms = response.data.data.hits.hits;
                });
            },
        }
    }
</script>
