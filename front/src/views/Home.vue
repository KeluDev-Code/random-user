<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 row items-center">
        <div class="col-12 col-sm-6 col-md-2 col-lg-2 q-pa-sm">
          <q-select
            v-model="favoriteSelected"
            :label="$t('Fields.favorites')"
            :options="favorites"
            option-label="nickName"
            dense
            outlined
            clearable
            class="bg-white"
            @update:model-value="loadUsers()"
          />
        </div>

        <div class="col-12 col-md">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            :duration="300"
          >
            <div
              v-show="visibleFilters && !favoriteSelected"
              class="row justify-cente"
            >
              <q-separator
                vertical
                class="q-mx-sm q-my-sm gt-sm"
              />
              <div class="col-12 col-sm-6 col-md-2 col-lg-2 q-pa-sm">
                <q-select
                  v-model="filters.gender"
                  :label="$t('Fields.gender')"
                  :options="genders"
                  emit-value
                  dense
                  outlined
                  clearable
                  class="bg-white"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-2 col-lg-2 q-pa-sm">
                <q-input
                  v-model="filters.age"
                  :label="$t('Labels.age')"
                  dense
                  outlined
                  type="number"
                  class="bg-white"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-2 col-lg-2 q-pa-sm">
                <q-select
                  v-model="filters.nat"
                  :label="$t('Fields.nat')"
                  :options="nationalities"
                  emit-value
                  dense
                  outlined
                  class="bg-white"
                />
              </div>
              <div class="col-3 col-md-auto self-center q-py-xs q-px-sm">
                <q-btn
                  icon="mdi-delete"
                  class="full-width text-negative bg-white"
                  @click="reset()"
                >
                  <q-tooltip :offset="[0,0]">
                    {{ $t('Acctions.clear') }}
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="col-3 col-md-auto self-center q-py-xs q-px-sm">
                <q-btn
                  icon="mdi-send"
                  class="full-width"
                  color="primary"
                  @click="loadUsers({ pagination: pagination })"
                >
                  <q-tooltip :offset="[0,0]">
                    {{ $t('Acctions.apply') }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </transition>
        </div>
        <div class="q-pa-sm col-auto">
          <q-btn
            color="secondary"
            class="q-my-md"
            :disable="!!favoriteSelected"
            :label="$t('Acctions.filters')"
            @click="visibleFilters = !visibleFilters"
          />
        </div>
      </div>
      <div class="q-pa-sm col-12">
        <q-table
          v-model:pagination="pagination"
          v-model:selected="usersSelected"
          selection="multiple"
          row-key="email"
          :rows-per-page-options="paginationItems"
          :columns="columns"
          :rows="users"
          :loading="usersLoading"
          @request="loadUsers"
        >
          <template #body-cell-actions="props">
            <q-td :props="props">
              <div class="row col-12 items-center justify-end">
                <div
                  v-if="favoriteSelected"
                  class="col-auto"
                >
                  <q-btn
                    flat
                    round
                    dense
                    icon="mdi-heart"
                    color="red"
                    @click="removeFavorite(favoriteSelected ? favoriteSelected.nickName : '', [props.row], loadUsers)"
                  >
                    <q-tooltip :offset="[0,0]">
                      {{ $t('Acctions.removeFavorite') }}
                    </q-tooltip>
                  </q-btn>
                </div><div
                  v-else
                  class="col-auto"
                >
                  <q-btn
                    flat
                    round
                    dense
                    icon="mdi-heart-outline"
                    color="red"
                    @click="handleAddFavorite(favoriteSelected ? favoriteSelected.nickName : '', [props.row])"
                  >
                    <q-tooltip :offset="[0,0]">
                      {{ $t('Acctions.addFavorite') }}
                    </q-tooltip>
                  </q-btn>
                </div>

                <div class="col-auto">
                  <q-btn
                    flat
                    round
                    dense
                    icon="mdi-eye"
                    color="secondary"
                    @click="showUserProfile(props.row)"
                  >
                    <q-tooltip :offset="[0,0]">
                      {{ $t('Acctions.showResume') }}
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>

      <div class="q-pa-sm col-12 row justify-end">
        <div class="col-auto">
          <q-btn
            color="secondary"
            class="q-my-md"
            :label="$t('Acctions.export')"
            @click="exportUsers(columns, users)"
          />
        </div>
      </div>
      <div v-show="usersSelected.length">
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 18]"
          label-position="left"
        >
          <q-btn
            fab
            icon="mdi-heart"
            color="red"
            @click="handleAddFavorite()"
          >
            <q-tooltip
              anchor="center left"
              self="center end"
            >
              {{ $t('Acctions.addFavorite') }}
            </q-tooltip>
          </q-btn>
        </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import {
  Dob, Name, Registered, User,
} from '@/models/randomUser/User';
import { Pagination } from '@/models/Pagination';
import useRandomUser from '@/services/RandomUserService';
import useNationaliti from '@/services/NationalitiService';
import useGender from '@/services/GenderService';
import useFavorite from '@/services/FavoriteService';
import useExportUsers from '@/services/ExportUsers';
import UserProfileVue from '@/components/UserProfile.vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();

    const usedRandomUser = useRandomUser();
    const usedFavorite = useFavorite();
    const visibleFilters = ref(true);

    const maxRowsNumber = 200;
    const paginationItems = [15, 50, 100];
    const pagination = ref<Pagination>({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 15,
      rowsNumber: maxRowsNumber,
    });

    const filters = ref({
      results: pagination.value.rowsPerPage,
      page: 1,
      gender: undefined,
      age: undefined,
      nat: undefined,
    });

    const columns = [
      {
        label: t('Fields.gender'), name: 'gender', field: 'gender', align: 'left', format: (val:string) => t(`Gender.${val}`),
      },
      {
        label: t('Fields.name'), name: 'name', field: 'name', align: 'left', format: (val:Name) => val.first,
      },
      {
        label: t('Fields.email'), name: 'email', field: 'email', align: 'left',
      },
      {
        label: t('Fields.nat'), name: 'nat', field: 'nat', align: 'left',
      },
      {
        label: t('Fields.dob'), name: 'dob', field: 'dob', align: 'left', format: (val:Dob) => dayjs(val.date).format('DD/MM/YYYY'),
      },
      {
        label: t('Fields.registered'), name: 'registered', field: 'registered', align: 'left', format: (val:Registered) => dayjs(val.date).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: t('Labels.actions'), name: 'actions', align: 'right',
      },
    ];

    const loadUsers = async (props: {pagination: Pagination} = { pagination: pagination.value }) => {
      if (usedFavorite.favoriteSelected.value) {
        usedRandomUser.users.value = usedFavorite.favoriteSelected.value?.users || [];
        pagination.value.rowsNumber = usedRandomUser.users.value?.length || 0;
      } else {
        const { page, rowsPerPage } = props.pagination;
        filters.value.results = rowsPerPage;
        filters.value.page = page;

        await usedRandomUser.findUsers(filters.value);

        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.rowsNumber = maxRowsNumber;
      }
    };

    const showUserProfile = (user: User) => {
      $q.dialog({
        component: UserProfileVue,
        componentProps: {
          user,
        },
        persistent: true,
      })
        .onDismiss(() => {
          if (usedFavorite.favoriteSelected.value) {
            loadUsers();
          }
        });
    };
    const reset = () => {
      filters.value = {
        ...filters.value,
        gender: undefined,
        age: undefined,
        nat: undefined,
      };
    };

    onMounted(() => {
      loadUsers();
    });

    return {
      ...usedRandomUser,
      ...usedFavorite,
      ...useGender(),
      ...useNationaliti(),
      ...useExportUsers(),
      visibleFilters,
      filters,
      pagination,
      columns,
      paginationItems,
      loadUsers,
      showUserProfile,
      reset,
    };
  },
});
</script>
