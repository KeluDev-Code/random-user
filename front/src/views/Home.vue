<template>
  <q-page
    padding
    class="row items-start justify-start"
  >
    <div class="col-12 row">
      <div class="q-pa-sm col-auto">
        <q-btn
          color="accent"
          :label="$t('Acctions.filters')"
          @click="visibleFilters = !visibleFilters"
        />
      </div>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="300"
      >
        <div
          v-show="visibleFilters"
          class="q-pa-sm col-12 col-md"
        >
          <div class="q-pa-sm col-12 row items-start shadow-2 rounded-borders bg-white">
            <div class="col-12 col-sm-6 col-md-3 q-pa-sm">
              <q-input
                v-model="filters.nat"
                dense
                :label="$t('Labels.nat')"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3 q-pa-sm">
              <q-select
                v-model="filters.gender"
                :label="$t('Fields.gender')"
                dense
                clearable
              />
            </div>
            <div class="col-12 col-md-2 self-center q-py-xs q-px-sm">
              <q-btn
                :label="$t('Acctions.clear')"
                class="full-width text-primary"
                @click="reset()"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="q-pa-sm col-12">
      <q-table
        v-model:pagination="pagination"
        row-key="id"
        :rows-per-page-options="paginationItems"
        :columns="columns"
        :rows="users"
        :loading="usersLoading"
        @request="loadUsers"
      >
        <!--
          binary-state-sort
              -->
        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="row col-12 items-center justify-end actions-td">
              <div class="col-auto">
                <q-btn
                  flat
                  round
                  dense
                  icon="mdi-pencil-outline"
                  color="positive"
                >
                  <q-tooltip :offset="[0,0]">
                    {{ $t('Lead.edit') }}
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
                  @click="showResume()"
                >
                  <q-tooltip :offset="[0,0]">
                    {{ $t('Lead.showResume') }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Dob, Name, Registered } from '@/models/randomUser/User';
import { Pagination } from '@/models/Pagination';
import useRandomUser from '@/services/RandomUserService';

export default defineComponent({
  name: 'Home',
  setup() {
    const { t } = useI18n();
    const usedRandomUser = useRandomUser();
    const visibleFilters = ref(false);

    const paginationItems = [15, 50, 100];
    const pagination = ref<Pagination>({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 15,
      rowsNumber: 200,
    });
    const filters = ref({
      results: pagination.value.rowsPerPage,
      page: 1,
      gender: undefined,
      nat: undefined,
    });
    const columns = [
      {
        label: t('Fields.gender'), name: 'gender', field: 'gender', align: 'left',
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
    ];
    const loadUsers = async (props: {pagination: Pagination}) => {
      const { page, rowsPerPage } = props.pagination;
      filters.value.results = rowsPerPage;
      filters.value.page = page;

      await usedRandomUser.findUsers(filters.value);

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    };
    const showResume = () => {
      console.log('object');
    };
    const reset = () => {
      console.log('object');
    };

    onMounted(() => {
      // get initial data from server (1st page)
      loadUsers({
        pagination: pagination.value,
      });
    });

    return {
      ...usedRandomUser,
      visibleFilters,
      filters,
      pagination,
      columns,
      paginationItems,
      loadUsers,
      showResume,
      reset,
    };
  },
});
</script>
