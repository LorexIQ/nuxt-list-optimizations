<script setup lang="ts">
import type {TableDataElement} from "~/server/data/plug";

interface Emits {
  (e: 'timeLoading', v: number): void;
}

const emit = defineEmits<Emits>();

let startRender = 0;
const isFetch = ref(false);
const dataList = reactive([] as TableDataElement[]);
const columns = reactive([] as string[]);

const limit = 10;
const counts = ref(0);
const selectedPage = ref(0);

const countPages = computed(() => Math.ceil(counts.value / limit));
const arrayPages = computed(() => {
  const page = selectedPage.value;

  if (!countPages.value) return [];
  else if (page < 0) selectedPage.value = 0;
  else if (page >= countPages.value) selectedPage.value = countPages.value - 1;

  return preparePagesArray(page, countPages.value, 3);
})

watch(isFetch, value => {
  if (value) startRender = Date.now();
  else emit('timeLoading', Date.now() - startRender);
});
watch(selectedPage, () => fetchTableData(), {immediate: true});

async function fetchTableData(): void {
  isFetch.value = true;

  useFetch(`/api-add/data?limit=${limit}&offset=${selectedPage.value * limit}`)
      .then(res => res.data.value)
      .then(res => {
        counts.value = res.count;
        Object.assign(dataList, res.data);
        Object.assign(columns, Object.keys(dataList[0]));

        isFetch.value = false;
      })
}
function preparePagesArray(page: number, pages: number, padding: number) {
  const minPage = page - padding <= 0 ? 0 : page - padding;
  const maxPage = page + padding > pages - 1 ? pages - 1 : page + padding;

  const startPage = minPage + maxPage - page - padding;
  const endPage = maxPage + minPage - page + padding;

  const arrayPages: number[] = [];

  for (let currentPage = (startPage >= 0 ? startPage : 0);
        currentPage <= (endPage < pages ? endPage : pages - 1);
        ++currentPage) {
    arrayPages.push(currentPage)
  }

  return arrayPages;
}

onMounted(() => emit('timeLoading', Date.now() - startRender));
</script>

<template>
  <div class="list-with-pagination-buttons">
    <div class="list-with-pagination-buttons__table">
      <div class="list-with-pagination-buttons__table__list">
        <div
            class="list-with-pagination-buttons__table__list__element"
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
      </div>
    </div>
    <div class="list-with-pagination-buttons__pagination">
      <div
          class="list-with-pagination-buttons__pagination__button"
          v-if="selectedPage > 1"
          @click="selectedPage = 0"
      >
        <ui-icon icon="DoubleLeftArrow"/>
      </div>
      <div
          class="list-with-pagination-buttons__pagination__button"
          v-if="selectedPage > 0"
          @click="selectedPage -= 1"
      >
        <ui-icon icon="LeftArrow"/>
      </div>
      <div
          class="list-with-pagination-buttons__pagination__button"
          :class="{ 'list-with-pagination-buttons__pagination__button--active': button === selectedPage }"
          v-for="button in arrayPages"
          :key="button"
          @click="selectedPage = button"
      >
        {{ button + 1 }}
      </div>
      <div
          class="list-with-pagination-buttons__pagination__button"
          v-if="selectedPage < countPages - 1"
          @click="selectedPage += 1"
      >
        <ui-icon icon="RightArrow"/>
      </div>
      <div
          class="list-with-pagination-buttons__pagination__button"
          v-if="selectedPage < countPages - 2"
          @click="selectedPage = countPages - 1"
      >
        <ui-icon icon="DoubleRightArrow"/>
      </div>
    </div>
    <div class="list-with-pagination-buttons__info">
      <span>Строк: {{ counts }}</span>
      <span>Страниц: {{ countPages }}</span>
      <span>Показано: {{ dataList.length }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-with-pagination-buttons {
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
