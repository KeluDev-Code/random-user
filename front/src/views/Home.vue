<template>
  <q-page
    padding
    class="row items-start justify-evenly"
  >
    <div class="col-12 row justify-center">
      <div class="col-6 row items-center justify-end">
        <q-btn
          class="col-auto q-ma-sm"
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
          class="q-pa-sm col-12 row justify-center"
        >
          <div class="q-pa-sm col-12 col-sm-10 col-md-8 row items-start q-col-gutter-x-sm shadow-2 rounded-borders bg-white">
            <div class="col-12 col-sm-6 col-md-3">
              <q-input
                v-model="filters.affiliateNumber"
                dense
                :label="$t('Labels.affiliateNumber')"
              />
            </div>
            <div class="col-6 col-sm-6 col-md-2">
              <q-select
                v-model="filters.statusId"
                :label="$t('Fields.status')"
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
      <div class="q-pa-sm col-12">
        <q-table
          v-model:pagination="pagination"
          :columns="headers"
          :data="leadList"
          row-key="id"
          :loading="loadingTable"
          :disabled="loadingTable"
          :rows-per-page-options="paginationItems"
          :dense="$q.screen.lt.md"
          binary-state-sort
          @request="loadLeads"
        >
          <!-- <template #body-cell="props">
          <q-td :props="props" :class="colorRow(props.row)">
            {{ props.value }}
          </q-td>
        </template> -->
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
                    @click="showResume(props.row.id)"
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const visibleFilters = ref(false);

    const filters = ref({
      results: 100,
      page: 1,
      gender: undefined,
      nat: undefined,
    });

    const pagination = () => {};
    const headers = () => {};
    const leadList = () => {};
    const loadingTable = () => {};
    const paginationItems = () => {};
    const loadLeads = () => {};
    const showResume = () => {};

    return {
      visibleFilters,
      filters,
      pagination,
      headers,
      leadList,
      loadingTable,
      paginationItems,
      loadLeads,
      showResume,
    };
  },
});
</script>
