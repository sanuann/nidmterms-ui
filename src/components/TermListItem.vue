<template>
    <li class="list-group-item">
        {{ term['_id'] }}
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
