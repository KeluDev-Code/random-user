<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @show="innitMap"
  >
    <q-card class="q-dialog-plugin width-900">
      <q-card-section>
        <div class="row justify-center">
          <div class="col-auto q-pa-sm">
            <q-avatar size="100px">
              <img
                :src="user.picture.large"
                alt="picture profile"
              >
              <q-btn
                dense
                round
                icon="mdi-heart"
                color="red"
                class="absolute favorite-picture"
                @click="handleAddFavorite()"
              >
                <q-tooltip>
                  {{ $t('Acctions.addFavorite') }}
                </q-tooltip>
              </q-btn>
            </q-avatar>
          </div>
        </div>

        <div class="row height-300">
          <div class="col-12 rounded-borders q-pa-sm">
            <div
              ref="mapRoot"
              class="rounded-borders"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>

        <q-separator class="q-my-sm" />

        <div class="row justify-center">
          <div class="col-6 q-pa-sm">
            <q-field
              :label="$t('Fields.name')"
              dense
              outlined
              type="number"
              class="bg-white"
              stack-label
            >
              <template #control>
                <div
                  class="self-center full-width no-outline ellipsis"
                  tabindex="0"
                >
                  {{ user.name.title }}.
                  {{ user.name.last }},
                  {{ user.name.first }}
                </div>
              </template>
            </q-field>
          </div>

          <div class="col-6 q-pa-sm">
            <q-field
              :label="$t('Fields.email')"
              dense
              outlined
              type="number"
              class="bg-white"
              stack-label
            >
              <template #control>
                <div
                  class="self-center full-width no-outline ellipsis"
                  tabindex="0"
                >
                  {{ user.email }}
                </div>
              </template>
            </q-field>
          </div>
        </div>

        <div class="row justify-center q-pt-md">
          <div class="col-6 q-pa-sm">
            <q-field
              :label="$t('Fields.city')"
              dense
              outlined
              type="number"
              class="bg-white"
              stack-label
            >
              <template #control>
                <div
                  class="self-center full-width no-outline ellipsis"
                  tabindex="0"
                >
                  {{ user.location.city }}
                </div>
              </template>
            </q-field>
          </div>
          <div class="col-6 q-pa-sm">
            <q-field
              :label="$t('Fields.street')"
              dense
              outlined
              type="number"
              class="bg-white"
              stack-label
            >
              <template #control>
                <div
                  class="self-center full-width no-outline ellipsis"
                  tabindex="0"
                >
                  {{ user.location.street.name }},
                  Nº {{ user.location.street.number }}
                </div>
              </template>
            </q-field>
          </div>
          <div class="col-6 q-pa-sm">
            <q-field
              :label="$t('Fields.phone')"
              dense
              outlined
              type="number"
              class="bg-white"
              stack-label
            >
              <template #control>
                <div
                  class="self-center full-width no-outline ellipsis"
                  tabindex="0"
                >
                  {{ user.phone }}
                </div>
              </template>
            </q-field>
          </div>
          <div class="col-6 q-pa-sm">
            <q-field
              :label="$t('Fields.phoneCell')"
              dense
              outlined
              type="number"
              class="bg-white"
              stack-label
            >
              <template #control>
                <div
                  class="self-center full-width no-outline ellipsis"
                  tabindex="0"
                >
                  {{ user.cell }}
                </div>
              </template>
            </q-field>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          outline
          :label="$t('Labels.close')"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { PropType, ref } from 'vue';

import useFavorite from '@/services/FavoriteService';
import useMapOpenLayers from '@/services/MapOpenLayers';
import { User } from '@/models/randomUser/User';

export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup(props: Readonly<{ user: User;} >) {
    const {
      dialogRef, onDialogHide, onDialogOK, onDialogCancel,
    } = useDialogPluginComponent();

    const usedFavorite = useFavorite();
    const nickName = ref('');

    const mapRoot = ref<HTMLElement>();

    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const onOKClick = () => {
    // on OK, it is REQUIRED to call onDialogOK
      onDialogOK(usedFavorite.favoriteSelected.value?.nickName || nickName);
    };

    const handleAddFavorite = () => {
      usedFavorite.loadFavorites();
      usedFavorite.handleAddFavorite();
    };

    return {
      ...useMapOpenLayers(props.user.location.coordinates, mapRoot),
      // REQUIRED; Need to inject these (from useDialogPluginComponent() call)
      dialogRef,
      onDialogHide,
      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick,

      onDialogCancel,

      handleAddFavorite,
      nickName,
      mapRoot,
    };
  },
};
</script>
