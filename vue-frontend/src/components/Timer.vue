<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-sheet>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedHours"
            label="h"
            :items="hours"
            :disabled="isSelectionDisable"
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
            :disabled="isSelectionDisable"
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
            :disabled="isSelectionDisable"
            return-object
          >
            <template v-slot:selection="{ item }">{{ item.value }}</template>
          </v-select>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
  <v-container fluid class="d-flex align-center justify-center">
    <v-sheet>
      <v-row>
        <v-col>
          <v-btn
            color="primary"
            @click="clickTimerButton"
            style="text-transform: none"
            >{{ buttonText }}</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="accent" @click="reset" style="text-transform: none"
            >Reset</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>

  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card title="Notice">
        <v-card-text> Time up! </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            style="text-transform: none"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <v-snackbar v-model="errorSnackBar" :timeout="3000" color="error">
    <v-icon class="me-2" size="small"> mdi-alert-circle-outline </v-icon>
    {{ errorSnackBarText }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="errorSnackBar = false">
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import audioFile from "../assets/Osampo_Biyori-1(Slow).mp3";

const buttonText = ref("Start");
const timerRunning = ref(false);

const selectedHours = ref(0);
const hours = ref(Array.from({ length: 73 }, (_, i) => i));

const selectedMinutes = ref(0);
const minutes = ref(Array.from({ length: 60 }, (_, i) => i));

const selectedSeconds = ref(0);
const seconds = ref(Array.from({ length: 60 }, (_, i) => i));

const interval = ref(0);

const errorSnackBar = ref(false); // エラー通知バーの表示を管理する変数
const errorSnackBarText = ref(""); // エラー通知バーの通知内容

const isActive = ref(false);
const isSelectionDisable = ref(false);

const audio = ref(null);

let timer = null;

// Start/Stopボタンを押したときの処理
function clickTimerButton() {
  // Stopボタンを押したときの処理
  if (timerRunning.value) {
    clearInterval(timer);
    isSelectionDisable.value = false;
    buttonText.value = "Start";
  }
  // Startボタンを押したときの処理
  else {
    if (
      selectedHours.value === 0 &&
      selectedMinutes.value === 0 &&
      selectedSeconds.value === 0
    ) {
      errorSnackBar.value = true;
      errorSnackBarText.value = "タイマーが設定されていません。";
      return;
    }

    interval.value =
      selectedHours.value * 60 * 60 +
      selectedMinutes.value * 60 +
      selectedSeconds.value;

    isSelectionDisable.value = true;
    buttonText.value = "Stop";
    countDown();
  }
  timerRunning.value = !timerRunning.value;
}

// Resetボタンを押したときの処理
async function reset() {
  clearInterval(timer);
  // interval.value = 0;
  selectedHours.value = 0;
  selectedMinutes.value = 0;
  selectedSeconds.value = 0;
  timerRunning.value = false;
  isSelectionDisable.value = false;
  buttonText.value = "Start";
  audio.value.pause();
  audio.value.currentTime = 0;
}

async function countDown() {
  // カウントダウンスタート
  timer = await setInterval(() => {
    interval.value--;
  }, 1000);
}

onMounted(() => {
  audio.value = new Audio(audioFile);
  audio.value.currentTime = 0; // オーディオの再生位置を0に戻す
});

onUnmounted(() => {
  clearInterval(timer);
});

watch(isActive, (value) => {
  if (value) {
    audio.value.currentTime = 0; // オーディオの再生位置を0に戻す
    audio.value.play();
  }else{
    audio.value.currentTime = 0; // オーディオの再生位置を0に戻す
    audio.value.pause();
  }
});

watch(interval, async (value) => {
  const resHours = Math.floor(value / 3600);
  let resMinutes = 0;

  if (resHours > 0) {
    resMinutes = Math.floor((value - resHours * 3600) / 60);
  } else {
    resMinutes = Math.floor(value / 60);
  }

  selectedHours.value = resHours;
  selectedMinutes.value = resMinutes;
  selectedSeconds.value = Math.floor(value % 60);

  if (!value) {
    // clearInterval(timer);
    await reset();
    isActive.value = true;
    // alert("Time up!");
  }
});
</script>
