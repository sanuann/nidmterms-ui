<template>
    <ul class="list-group scroll">
        <!-- key property is used whenever list is updated -->
        <InterlexTerm
            v-for="term in terms"
            :term="term"
            :key="term['_id']"
        >
        </InterlexTerm>
    </ul>
</template>

<script>
    import InterlexTerm from './InterlexTerm';
    export default {
        name: "InterlexSearchList",
        props: {
            terms: Array,
            terms1: Array
        },
        components: {
            InterlexTerm
        },
        methods: {
            onTermSelect(term) {
                this.$emit('termSelect', term);
            }
        }
    };
</script>

<style scoped>
    ul {
        /*top: 20px;*/
        /*bottom: 20px;*/
        /*left: 20px;*/
        /*right: 20px;*/
        /*overflow: scroll;*/
        /*margin: 0;*/
        /*padding: 0;*/

        font-size: 16px;
        height: 900px;
        /*-webkit-overflow-scrolling: touch;*/
    }

    .scroll {
        /*margin:4px;*/
        /*padding:4px;*/

        overflow-y: auto;
    }
</style>
