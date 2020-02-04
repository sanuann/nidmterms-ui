<template>
    <li class="list-group-item">
        {{ term['_source']['label'] }}
    </li>
</template>

<script>
    export default {
        name: "TermListItem",
        props: {
            term: Object
        }
    }
</script>

<style scoped>

</style>
