<template>
    <div id="landing">
        <div>
<!--                <img src="../assets/images/nidm-terms-background.png">-->
            <b-card
                overlay
                variant="banner-text"
                img-src="../assets/images/nidm-terms-background.png"
                img-alt="Card Image"
                text-variant="white"
                title="TERMINOLOGIES FOR THE NEUROIMAGING COMMUNITY"
                title-variant="card-card_title"
                class="text-center banner-text"
            >
                <b-card-text>
                    <router-link class="card-link" :to="{ path: 'about' }">Learn More</router-link>
                </b-card-text>
                <a class="custom-btn center" href="#">
                    <i aria-hidden="true" data-x-icon="" class="x-icon-angle-down"></i>
                </a>
                <a class="anchor-link icon-font anchor-scroll-profile animated-bounce bounce" href="#scroll-content-section"></a>
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
    </div>
</template>

<style scoped>
    .card-deck-card_title {
        font-size: 10rem;

    }
    .card-card_title {
        top: 30px;
    }
    /*.banner-text {*/
    /*    top: 50px;*/
    /*}*/
    .card-banner-text .card-title {
        top: 100px;
    }

    .custom-btn {
        position: absolute;
        top: 0;
        left: 48%;
    }


</style>

<script>

</script>
