<template>
    <ul class="list-group">
        <!-- key property is used whenever list is updated -->
        <TermListItem
            v-for="term in terms"
            :term="term"
            :key="term._id"
        >
        </TermListItem>
    </ul>
</template>

<script>
    import TermListItem from './TermListItem';
    export default {
        name: "TermList",
        props: {
            terms: Array
        },
        components: {
            TermListItem
        },
    };
</script>

<style scoped>

</style>
