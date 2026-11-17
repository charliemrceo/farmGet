<script setup>
import { computed } from 'vue'

// Replace with data from your API / store
const profile = {
  firstName: 'Jane',
  lastName: 'Wanjiku',
  phone: '+254 700 000 000',
  location: 'Nakuru, Kenya',
  crop: 'Tomatoes',
}

const fullName = computed(() => `${profile.firstName} ${profile.lastName}`)
const initial = computed(() => profile.firstName.charAt(0).toUpperCase())
</script>

<template>
  <v-container class="profile-wrap d-flex justify-center">
    <v-card class="profile-card" width="100%" max-width="480" rounded="xl" flat border>
      <div class="profile-banner" />

      <div class="d-flex justify-center avatar-row">
        <v-avatar color="primary" size="112" class="profile-avatar">
          <span class="initial">{{ initial }}</span>
        </v-avatar>
      </div>

      <v-card-text class="text-center pt-4">
        <h1 class="profile-name">{{ fullName }}</h1>
        <v-chip class="mt-2" color="secondary" variant="flat" prepend-icon="mdi-sprout">
          {{ profile.crop }} farmer
        </v-chip>
      </v-card-text>

      <v-divider />

      <v-list lines="two" class="py-2">
        <v-list-item>
          <template #prepend>
            <v-avatar color="surface-variant" variant="tonal" size="44">
              <v-icon icon="mdi-phone-outline" />
            </v-avatar>
          </template>
          <v-list-item-subtitle>Phone</v-list-item-subtitle>
          <v-list-item-title class="font-weight-bold">{{ profile.phone }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-avatar color="surface-variant" variant="tonal" size="44">
              <v-icon icon="mdi-map-marker-outline" />
            </v-avatar>
          </template>
          <v-list-item-subtitle>Location</v-list-item-subtitle>
          <v-list-item-title class="font-weight-bold">{{ profile.location }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-avatar color="surface-variant" variant="tonal" size="44">
              <v-icon icon="mdi-corn" />
            </v-avatar>
          </template>
          <v-list-item-subtitle>Main crop</v-list-item-subtitle>
          <v-list-item-title class="font-weight-bold">{{ profile.crop }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-actions class="pa-4">
        <v-btn block size="large" color="primary" variant="flat" prepend-icon="mdi-chat-outline">
          Chat with {{ profile.firstName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.profile-wrap { padding-top: 48px; padding-bottom: 48px; }
.profile-banner { height: 120px; background: #1F5C3A; border-radius: 24px 24px 0 0; }
.avatar-row { margin-top: -56px; }
.profile-avatar { border: 5px solid #fff; }
.initial { font-size: 3rem; font-weight: 800; color: #fff; line-height: 1; }
.profile-name { font-size: 1.75rem; font-weight: 800; }
</style>