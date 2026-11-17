<script setup>
import {useAuth} from '../services/auth';
import { useRouter} from "vue-router";
  

const router = useRouter();
const { logout} = useAuth()
const isAuthenticated = localStorage.getItem('isAuthenticated')

const user = JSON.parse(localStorage.getItem('user'))

let letter =''
if(user){
    letter = user.firstname[0]
}

function handleLogout(){
    logout()
    router.push('/').then(() => {
        router.go(0)
    });
}
</script>

<template>
    <v-app-bar class="bg-white">
        <v-app-bar-title>
            <router-link to="/">
                <v-img src="/logo.png" width="15%" height="8%"></v-img>
            </router-link>
        </v-app-bar-title>
            <v-btn to="/homepage" v-if="isAuthenticated" color="accent1" class="bg-primary ma-2">Home</v-btn>
            <v-btn to="/Profile" v-if="isAuthenticated" color="accent1" class="bg-primary ma-2">Profile</v-btn>
             <v-btn to="/Farmers" v-if="isAuthenticated" color="accent1" class="bg-primary ma-2">Farmers</v-btn>
            <v-btn icon="mdi-account" v-if="isAuthenticated" variant="tonal" color="primary">{{letter}}
                <v-menu activator="parent">
                    <v-list>
                    <v-list-item>
                        <v-btn color="primary" to="/profile">Profile</v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn color="primary" @click="() => {handleLogout();}">logout</v-btn>
                    </v-list-item>
                </v-list>
                </v-menu>
            </v-btn>

            <v-btn to="/login"  color="primary" v-else>Login</v-btn>
        
    </v-app-bar>
</template>
 