<template>
    <div id="landing">
        <div class="wrapper">
            <div>
                <b-card
                        overlay
                        img-src="../assets/images/nidm-terms-background.png"
                        img-alt="Card Image"
                        text-variant="white"
                        title="TERMINOLOGIES FOR THE NEUROIMAGING COMMUNITY"
                        class="text-center text-md-left "
                >
                </b-card>
            </div>
            <div class="container text-center">
                <b-card-group deck>
                    <b-card title="Explore terms">
<!--                        <a href="annotate" class="card-link">Explore the terminology</a>-->
                        <b-card-text>
                            <router-link class="card-link" :to="{ path: 'explore' }">Explore the terminology</router-link>
                        </b-card-text>
                    </b-card>

                    <b-card title="Add Term">
                        <b-card-text>
                            <router-link class="card-link" :to="{ path: 'create' }">Suggest a term for the NIDM Terminologies</router-link>
                        </b-card-text>
                    </b-card>

                    <b-card title="Annotate">
                        <b-card-text>
                            <router-link class="card-link" :to="{ path: 'annotate' }">Annotate terms in a CSV/TSV file</router-link>
                        </b-card-text>
                    </b-card>
                </b-card-group>
            </div>


<!--            <div class="v-parallax" dark="" style="height: 500px;">-->
<!--                <div class="">-->
<!--                    <img src="../../assests/images/nidm-terms-background.png" alt="" class="v-parallax__image" style="display: block; opacity: 1; transform: translate(-50%, 367px);">-->
<!--                </div>-->
<!--                &lt;!&ndash;                <div class="v-parallax__content">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <div class="container fill-height">&ndash;&gt;-->
<!--                &lt;!&ndash;                        <div class=" row ">&ndash;&gt;-->
<!--                &lt;!&ndash;                            <div class="">&ndash;&gt;-->
<!--                &lt;!&ndash;                                <h1 class="text-center text-md-left">TERMINOLOGIES FOR THE NEUROIMAGING COMMUNITY</h1>&ndash;&gt;-->
<!--                &lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
        </div>
    </div>
</template>

<style scoped>
    .card-deck-card_title {
        font-size: 10rem;
    }
</style>

<script>

</script>
