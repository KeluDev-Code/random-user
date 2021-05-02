<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">
          {{ $t('Acctions.addFavorite') }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <div class="text-subtitle1">
            {{ $t('Labels.addToList') }}
          </div>
          <div class="q-pa-sm">
            <q-select
              v-model="favoriteSelected"
              :disable="!!nickName"
              :label="$t('Fields.favorites')"
              :options="favorites"
              option-label="nickName"
              dense
              outlined
              clearable
              class="bg-white"
            />
          </div>

          <q-separator class="q-my-sm" />

          <div class="text-subtitle1">
            {{ $t('Labels.createList') }}
          </div>
          <div class="q-pa-sm">
            <q-input
              v-model="nickName"
              :label="$t('Fields.favorites')"
              :disable="!!favoriteSelected"
              dense
              outlined
              clearable
              class="bg-white"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="negative"
          flat
          :label="$t('Labels.cancel')"
          @click="onDialogCancel"
        />
        <q-btn
          color="primary"
          :disable="!favoriteSelected && !nickName"
          :label="$t('Labels.ok')"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { onMounted, ref } from 'vue';

// eslint-disable-next-line import/no-cycle
import useFavorite from '@/services/FavoriteService';

export default {
  name: 'FavoriteSelect',
  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const usedFavorite = useFavorite();
    const nickName = ref('');

    const {
      dialogRef, onDialogHide, onDialogOK, onDialogCancel,
    } = useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const onOKClick = () => {
      // on OK, it is REQUIRED to call onDialogOK
      onDialogOK(usedFavorite.favoriteSelected.value?.nickName || nickName);
    };

    onMounted(() => {
      usedFavorite.loadFavorites();
    });

    return {
      // REQUIRED; Need to inject these (from useDialogPluginComponent() call)
      dialogRef,
      onDialogHide,
      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick,

      onDialogCancel,

      favoriteSelected: usedFavorite.favoriteSelected,
      favorites: usedFavorite.favorites,
      nickName,
    };
  },
};
</script>
