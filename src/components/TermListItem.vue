<template>
    <li class="list-group-item" @click="onTermSelect">
        <!--<a @click="setTerm()">-->
        <span class="align-middle">
            {{ term }}
        </span>
        <div v-if="showCheck" class="checkmark"></div>
        <!--</a>-->
    </li>
</template>

<script>
    export default {
        name: "TermListItem",
        props: {
            term: String,
            completed: Object,
        },
        watch: {
          completed: function () {
              // eslint-disable-next-line
              console.log(21, this.completed);
          }
        },
        methods: {
            onTermSelect() {
                this.$emit('termSelect', this.term);
                // if (this.$route.query.q) {
                //     this.$router.push(`/interlex/search?q=${this.$route.query.q}`);
                // } else {
                //     this.$router.push(`/interlex/search?q=${this.term['_source']['label']}`);
                // }
            }
        },
        computed: {
            showCheck() {
                // eslint-disable-next-line
                console.log(31, this.completed[this.term]);
                return this.completed;
            }
        }
    }
</script>

<style scoped>
    .checkmark {
        display: inline-block;
        transform: rotate(45deg);
        height: 25px;
        width: 12px;
        margin: auto;
        margin-right: inherit;
        border-bottom: 4px solid #78b13f;
        border-right: 4px solid #78b13f;
    }


    li {
        display: flex;
        cursor: pointer;
    }

    li:hover {
        background-color: #eee;
    }

    .selected {
        background-color: #eee;
    }



</style>
