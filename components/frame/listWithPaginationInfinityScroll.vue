<script setup lang="ts">
import type {TableDataElement} from "~/server/data/plug";

interface Emits {
  (e: 'timeLoading', v: number): void;
}

const emit = defineEmits<Emits>();

let startRender = Date.now();
const isFetch = ref(false);
const dataList = useState('listWithPaginationInfinityScrollValues', () => [] as TableDataElement[]);
const columns = useState('listWithPaginationInfinityScrollColumns', () => [] as string[]);

const limit = 25;
const counts = useState('listWithPaginationInfinityScrollCounts', () => 0);
const triggerHeight = 200;
const scrolledRef = ref<HTMLDivElement>();

watch(isFetch, value => {
  if (value) startRender = Date.now();
  else emit('timeLoading', Date.now() - startRender);
});

if (!dataList.value.length) await fetchTableData();

async function fetchTableData(): void {
  isFetch.value = true;

  useFetch(`/api-add/data?limit=${limit}&offset=${dataList.value.length}`)
      .then(res => res.data.value)
      .then(res => {
        counts.value = res.count;
        dataList.value.push(...res.data);
        columns.value = Object.keys(dataList.value[0]);

        isFetch.value = false;
      })
}
function calcTriggerPos() {
  const target = scrolledRef.value!;
  const scrollHeight = target.scrollHeight;
  const distanceToEnd = scrollHeight - target.scrollTop - target.clientHeight;

  if (triggerHeight >= distanceToEnd && !isFetch.value) fetchTableData();
}

onMounted(() => emit('timeLoading', Date.now() - startRender));
</script>

<template>
  <div class="list-with-pagination-infinity-scroll">
    <div
        class="list-with-pagination-infinity-scroll__table"
        ref="scrolledRef"
        @scroll="calcTriggerPos"
    >
      <div class="list-with-pagination-infinity-scroll__table__list">
        <div
            class="list-with-pagination-infinity-scroll__table__list__element"
            v-for="row in dataList"
            :key="row.id"
        >
          <ui-list-element
              v-for="column in columns"
              :key="row.id + column"
          >
            {{ row[column] }}
          </ui-list-element>
        </div>
        <div class="list-with-pagination-infinity-scroll__table__list__element">
          {{ isFetch ? 'Загрузка...' : 'Конец' }}
        </div>
      </div>
    </div>
    <div class="list-with-pagination-infinity-scroll__info">
      <span>Строк: {{ counts }}</span>
      <span>Показано: {{ dataList.length }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-with-pagination-infinity-scroll {
  .list-element {
    width: 100%;
  }

  &__table {
    display: flex;
    overflow: auto;

    &__list {
      display: flex;
      flex-direction: column;
      max-height: 400px;

      &__element {
        display: flex;
      }
    }
  }
  &__pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      aspect-ratio: 1;
      border-radius: 6px;
      background-color: #dedede;
      cursor: pointer;
      user-select: none;

      &--active {
        font-weight: 700;
        opacity: .5;
        pointer-events: none;
      }
    }
  }
  &__info {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
  }
}
</style>
