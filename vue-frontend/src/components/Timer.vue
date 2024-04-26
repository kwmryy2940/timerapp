<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-sheet>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedHours"
            label="h"
            :items="hours"
            return-object
          >
            <template v-slot:selection="{ item }">{{ item.value }}</template>
          </v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedMinutes"
            label="min"
            :items="minutes"
            return-object
          >
            <template v-slot:selection="{ item }">{{ item.value }}</template>
          </v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedSeconds"
            label="sec"
            :items="seconds"
            return-object
          >
            <template v-slot:selection="{ item }">{{ item.value }}</template>
          </v-select>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
  <v-container fluid class="d-flex align-center justify-center">
      <v-btn >Start</v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const selectedHours = ref(0);
const hours = ref([]);

const selectedMinutes = ref(0);
const minutes = ref([]);

const selectedSeconds = ref(0);
const seconds = ref([]);

for (let i = 0; i <= 72; i++) {
  hours.value.push(i);
}

for (let i = 0; i <= 59; i++) {
  minutes.value.push(i);
  seconds.value.push(i);
}
</script>
