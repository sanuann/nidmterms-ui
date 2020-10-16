<template>
    <ul class="list-group">
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

</style>
