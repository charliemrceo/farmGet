<script setup>

</script>

<template>
    <v-contanier max-width="100%">
        <v-row>
            <v-col>
                <v-carousel cycle hide-delimiters>
                    <v-carousel-item src="/images/carousel1.jpg" cover></v-carousel-item>
                    <v-carousel-item src="/images/carousel2.jpg" cover></v-carousel-item>
                    <v-carousel-item src="/images/carousel3.jpg" cover></v-carousel-item>
                    <v-carousel-item src="/images/carousel4.jpg" cover></v-carousel-item>
                </v-carousel>
            </v-col>
            
        </v-row>
    </v-contanier>

    <!--About us -->
    <v-container max-width="100%">
        <v-row>
            <v-col md="6">
                <v-card align="middle" class="h-80">
                    <v-card-title>WELCOME TO FARMGET</v-card-title>
                    <v-card-text class="text-body-large">Welcome to FARMGET, FarmGet is the premier digital marketplace bridging the gap between agriculture and commerce. Designed for modern growers, the platform allows farmers to showcase their upcoming crop projects, project yield timelines, and highlight sustainable farming practices.</v-card-text>
                    <v-card-text class="text-body-large">Simultaneously, buyers, wholesalers, and local retailers can discover verified produce, place advance orders, and secure reliable supply chains directly from the source. With real-time availability updates, transparent pricing, and seamless order management, FarmGet transforms traditional agricultural trading into an efficient, connected ecosystem. Grow smarter, sell faster, and source fresh quality produce effortlessly today.</v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-img src="/images/carousel1.jpg" cover></v-img>
            </v-col>

        
        </v-row>
    </v-container>


    <!--footer-->
    <v-container max-width="100%" class="mt-6 bg-secondary">
          <v-row>
        <v-col md="4">
            <v-card height="300px" color="secondary" flat>
            <v-card-title>Subscribe to our mailing page</v-card-title>
            <v-card-text>Get the latest updates, fresh harvests, and market updates delivered to your email. </v-card-text>
            <v-text-field v-model="inputValue" label="Email address" outlined class="ma-4">
                <template v-slot:append-inner>
                    <v-btn color="primary">Subcribe</v-btn>
                </template>
            </v-text-field>
            <div class="text centre">
                <p>Follow us on:</p>
                <v-icon icon="mdi-instagram"></v-icon>
                <v-icon icon="mdi-twitter"></v-icon>
                <v-icon icon="mdi-facebook"></v-icon>
            </div>
            </v-card>
        </v-col>

        <v-col md="4">
            <v-card height="300px" color="secondary" flat>
                <v-card-title>contact information</v-card-title>
                <v-card-text>
                    <p>
                        <v-icon icon="mdi-map-marker-radius-outline"></v-icon>
                        The FarmGet Office
                    </p>
                    <p> 345, Main Street Madaraka, Machakos </p>
                    <p>
                        <v-icon icon="mdi-email-outline"></v-icon>
                        info@farmget.com 
                    </p>
                </v-card-text>
            </v-card>
        </v-col>

        
    </v-row>
    </v-container>
</template>
    