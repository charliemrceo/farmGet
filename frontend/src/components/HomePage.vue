<script setup>
import { ref, reactive, computed } from 'vue'

/* ---------- Sample data (replace with your API later) ---------- */
const farmers = ref([
  { id: 1, name: 'Wanjiru Kamau', location: 'Ol Kalou', crop: 'Potatoes', variety: 'Shangi', quantity: 1200, unit: 'kg', phone: '+254 712 345 678', lat: -0.2738, lng: 36.3787 },
  { id: 2, name: 'Peter Mwangi', location: 'Nyahururu', crop: 'Cabbages', variety: 'Gloria F1', quantity: 800, unit: 'kg', phone: '+254 722 456 789', lat: 0.0383, lng: 36.3629 },
  { id: 3, name: 'Grace Achieng', location: 'Kisumu', crop: 'Maize', variety: 'H614', quantity: 50, unit: 'bags', phone: '+254 733 567 890', lat: -0.0917, lng: 34.768 },
  { id: 4, name: 'Joseph Kiprop', location: 'Eldoret', crop: 'Maize', variety: 'DK 8031', quantity: 120, unit: 'bags', phone: '+254 700 678 901', lat: 0.5143, lng: 35.2698 },
  { id: 5, name: 'Lucy Njeri', location: 'Naivasha', crop: 'Carrots', variety: 'Kuroda', quantity: 450, unit: 'kg', phone: '+254 711 789 012', lat: -0.7172, lng: 36.431 },
  { id: 6, name: 'Hassan Omar', location: 'Meru', crop: 'Tomatoes', variety: 'Anna F1', quantity: 300, unit: 'kg', phone: '+254 745 890 123', lat: 0.0463, lng: 37.6559 },
])

/* ---------- Crop look-and-feel ---------- */
const cropStyles = {
  potatoes: { icon: 'mdi-sprout', color: '#9A6B3F' },
  maize: { icon: 'mdi-corn', color: '#C9931A' },
  carrots: { icon: 'mdi-carrot', color: '#D9631E' },
  tomatoes: { icon: 'mdi-fruit-cherries', color: '#B83A2E' },
  cabbages: { icon: 'mdi-leaf', color: '#3F8A4F' },
}
const styleFor = (crop) =>
  cropStyles[crop.trim().toLowerCase()] ?? { icon: 'mdi-sprout-outline', color: '#4C7A3C' }

/* ---------- Search ---------- */
const cropQuery = ref('')
const areaQuery = ref('')
const myCoords = ref(null)
const locating = ref(false)

const distanceKm = (a, b) => {
  const rad = (d) => (d * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

const results = computed(() => {
  const crop = cropQuery.value.trim().toLowerCase()
  const area = areaQuery.value.trim().toLowerCase()

  let list = farmers.value
    .filter((f) => !crop || f.crop.toLowerCase().includes(crop) || f.variety.toLowerCase().includes(crop))
    .filter((f) => !area || f.location.toLowerCase().includes(area))
    .map((f) => ({
      ...f,
      distance: myCoords.value && f.lat != null ? distanceKm(myCoords.value, f) : null,
    }))

  if (myCoords.value) {
    list = list.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
  }
  return list
})

const useMyLocation = () => {
  if (!navigator.geolocation) {
    notify('Your browser does not support location. Type your area instead.', 'warning')
    return
  }
  locating.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      myCoords.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      locating.value = false
    },
    () => {
      locating.value = false
      notify('We could not get your location. Type your area instead.', 'warning')
    },
    { timeout: 10000 }
  )
}
const clearLocation = () => (myCoords.value = null)

/* ---------- Add a farmer ---------- */
const dialog = ref(false)
const formRef = ref(null)
const units = ['kg', 'bags', 'tonnes', 'crates']
const emptyForm = () => ({
  name: '', location: '', crop: '', variety: '', quantity: null, unit: 'kg', phone: '', lat: null, lng: null,
})
const form = reactive(emptyForm())

const required = (v) => (v !== null && v !== '' && v !== undefined) || 'This field is required'
const positive = (v) => Number(v) > 0 || 'Enter a quantity greater than 0'
const phoneRule = (v) => /^[+\d][\d\s-]{8,}$/.test(v || '') || 'Enter a valid phone number'

const pinFarm = () => {
  if (!navigator.geolocation) return notify('Your browser does not support location.', 'warning')
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      form.lat = pos.coords.latitude
      form.lng = pos.coords.longitude
    },
    () => notify('We could not get your location.', 'warning'),
    { timeout: 10000 }
  )
}

const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  farmers.value.unshift({ id: Date.now(), ...form, quantity: Number(form.quantity) })
  notify(`${form.name} is now listed as a farmer.`, 'success')
  Object.assign(form, emptyForm())
  formRef.value.resetValidation()
  dialog.value = false
}

/* ---------- Snackbar ---------- */
const snack = reactive({ show: false, text: '', color: 'success' })
const notify = (text, color = 'success') => Object.assign(snack, { show: true, text, color })

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('')
</script>

<template>
  <v-app>
    <v-app-bar flat color="transparent" class="px-md-6 position-absolute">
      <v-icon icon="mdi-barley" size="28" color="#F2C14E" class="mr-2" />
      <span class="brand">Shamba Connect</span>
      <v-spacer />
      <v-btn
        color="#F2C14E"
        variant="flat"
        prepend-icon="mdi-account-plus"
        class="text-none font-weight-bold"
        @click="dialog = true"
      >
        Add me as a farmer
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Hero with the search -->
      <section class="hero">
        <v-container class="hero-inner">
          <h1 class="hero-title">Find the farmer who grows it,<br />close to where you are.</h1>
          <p class="hero-sub">Search a crop, see who has it in stock, and call them directly.</p>

          <v-sheet class="search-bar pa-3" rounded="lg" elevation="6">
            <v-row dense align="center">
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="cropQuery"
                  label="Crop or variety"
                  placeholder="e.g. maize, Shangi"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo-filled"
                  flat
                  hide-details
                  clearable
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="areaQuery"
                  label="Area"
                  placeholder="e.g. Nyahururu"
                  prepend-inner-icon="mdi-map-marker-outline"
                  variant="solo-filled"
                  flat
                  hide-details
                  clearable
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-btn
                  v-if="!myCoords"
                  block
                  size="large"
                  color="#1F5D3A"
                  variant="flat"
                  class="text-none"
                  prepend-icon="mdi-crosshairs-gps"
                  :loading="locating"
                  @click="useMyLocation"
                >
                  Near me
                </v-btn>
                <v-btn
                  v-else
                  block
                  size="large"
                  color="#1F5D3A"
                  variant="tonal"
                  class="text-none"
                  prepend-icon="mdi-close"
                  @click="clearLocation"
                >
                  Nearest first
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
      </section>

      <!-- Results -->
      <v-container class="py-10">
        <div class="d-flex align-center flex-wrap mb-6" style="gap: 8px">
          <h2 class="section-title">
            {{ cropQuery || areaQuery ? 'Farmers matching your search' : 'Farmers on the market' }}
          </h2>
          <v-chip size="small" variant="tonal" color="#1F5D3A">{{ results.length }}</v-chip>
          <v-spacer />
          <span v-if="myCoords" class="text-body-2 text-medium-emphasis">
            <v-icon icon="mdi-sort-ascending" size="18" /> Sorted by distance from you
          </span>
        </div>

        <v-row v-if="results.length">
          <v-col v-for="f in results" :key="f.id" cols="12" sm="6" lg="4">
            <v-card class="farmer-card" rounded="lg" variant="outlined">
              <div class="crop-band" :style="{ background: styleFor(f.crop).color }">
                <v-icon :icon="styleFor(f.crop).icon" size="22" color="white" />
                <span class="ml-2">{{ f.crop }}</span>
                <v-spacer />
                <v-chip
                  v-if="f.distance !== null"
                  size="x-small"
                  color="white"
                  variant="flat"
                  prepend-icon="mdi-map-marker-distance"
                >
                  {{ f.distance < 10 ? f.distance.toFixed(1) : Math.round(f.distance) }} km
                </v-chip>
              </div>

              <v-card-item class="pt-4">
                <template #prepend>
                  <v-avatar color="#E4EDDF" size="44">
                    <span class="font-weight-bold" style="color: #1f5d3a">{{ initials(f.name) }}</span>
                  </v-avatar>
                </template>
                <v-card-title class="farmer-name">{{ f.name }}</v-card-title>
                <v-card-subtitle>
                  <v-icon icon="mdi-map-marker" size="15" /> {{ f.location }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <dl class="ledger">
                  <div>
                    <dt><v-icon icon="mdi-sprout" size="16" /> Crop</dt>
                    <dd>{{ f.crop }}</dd>
                  </div>
                  <div>
                    <dt><v-icon icon="mdi-tag-outline" size="16" /> Variety</dt>
                    <dd>{{ f.variety }}</dd>
                  </div>
                  <div>
                    <dt><v-icon icon="mdi-scale-balance" size="16" /> Quantity</dt>
                    <dd>{{ f.quantity.toLocaleString() }} {{ f.unit }}</dd>
                  </div>
                  <div>
                    <dt><v-icon icon="mdi-phone" size="16" /> Phone</dt>
                    <dd>{{ f.phone }}</dd>
                  </div>
                </dl>
              </v-card-text>

              <v-card-actions class="px-4 pb-4">
                <v-btn
                  block
                  variant="flat"
                  color="#1F5D3A"
                  class="text-none"
                  prepend-icon="mdi-phone"
                  :href="`tel:${f.phone.replace(/\s/g, '')}`"
                >
                  Call {{ f.name.split(' ')[0] }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty state -->
        <v-sheet v-else class="text-center pa-10" rounded="lg" border>
          <v-icon icon="mdi-sprout-outline" size="48" color="#4C7A3C" />
          <h3 class="mt-3">No farmers listed for that search yet</h3>
          <p class="text-medium-emphasis mb-4">Try another crop or area, or list your own harvest.</p>
          <v-btn color="#1F5D3A" class="text-none" prepend-icon="mdi-account-plus" @click="dialog = true">
            Add me as a farmer
          </v-btn>
        </v-sheet>
      </v-container>
    </v-main>

    <!-- Add farmer dialog -->
    <v-dialog v-model="dialog" max-width="560" scrollable>
      <v-card rounded="lg">
        <v-card-title class="pt-5 px-6 d-flex align-center">
          <span class="section-title" style="font-size: 1.35rem">Add yourself as a farmer</span>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="dialog = false" />
        </v-card-title>

        <v-card-text class="px-6">
          <v-form ref="formRef" @submit.prevent="submit">
            <v-text-field v-model="form.name" label="Your name" prepend-inner-icon="mdi-account" :rules="[required]" />
            <v-text-field v-model="form.phone" label="Phone number" prepend-inner-icon="mdi-phone" :rules="[phoneRule]" />
            <v-text-field
              v-model="form.location"
              label="Farm location"
              hint="Town or village, e.g. Ol Kalou"
              prepend-inner-icon="mdi-map-marker"
              :rules="[required]"
            />
            <v-btn
              size="small"
              variant="tonal"
              color="#1F5D3A"
              class="text-none mb-5"
              :prepend-icon="form.lat ? 'mdi-check' : 'mdi-crosshairs-gps'"
              @click="pinFarm"
            >
              {{ form.lat ? 'Farm location pinned' : 'Pin my farm on the map (helps buyers find you)' }}
            </v-btn>

            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.crop" label="Crop" prepend-inner-icon="mdi-sprout" :rules="[required]" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.variety" label="Variety of the crop" prepend-inner-icon="mdi-tag-outline" :rules="[required]" />
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="form.quantity"
                  label="Quantity"
                  type="number"
                  min="1"
                  prepend-inner-icon="mdi-scale-balance"
                  :rules="[required, positive]"
                />
              </v-col>
              <v-col cols="5">
                <v-select v-model="form.unit" :items="units" label="Unit" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="px-6 pb-5">
          <v-spacer />
          <v-btn variant="text" class="text-none" @click="dialog = false">Cancel</v-btn>
          <v-btn color="#1F5D3A" variant="flat" class="text-none" prepend-icon="mdi-check" @click="submit">
            Add me to the market
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snack.show" :color="snack.color" timeout="3500" location="bottom">
      {{ snack.text }}
    </v-snackbar>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap');

:deep(.v-application),
:deep(.v-application__wrap) {
  font-family: 'Figtree', system-ui, sans-serif;
}

.brand,
.hero-title,
.section-title,
.farmer-name {
  font-family: 'Bricolage Grotesque', 'Figtree', system-ui, sans-serif;
}

.brand {
  color: #fff;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}

/* Hero: planted rows seen from above */
.hero {
  background:
    repeating-linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.045) 0 2px,
      transparent 2px 46px
    ),
    linear-gradient(180deg, #14442b 0%, #1f5d3a 100%);
  padding: 120px 0 72px;
  color: #fff;
}
.hero-inner {
  max-width: 980px;
}
.hero-title {
  font-weight: 800;
  font-size: clamp(2rem, 5.2vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
}
.hero-sub {
  margin: 16px 0 32px;
  max-width: 52ch;
  font-size: 1.1rem;
  color: #d8e8d6;
}
.search-bar {
  background: #fff;
}

.section-title {
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: -0.015em;
  color: #1c2b21;
}

/* Cards */
.farmer-card {
  height: 100%;
  border-color: #d9e2d3;
  overflow: hidden;
}
.crop-band {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #fff;
  font-weight: 600;
}
.farmer-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.ledger > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px dashed #d9e2d3;
}
.ledger > div:last-child {
  border-bottom: 0;
}
.ledger dt {
  color: #5d6d62;
  font-size: 0.9rem;
}
.ledger dd {
  font-weight: 600;
  color: #1c2b21;
  text-align: right;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>