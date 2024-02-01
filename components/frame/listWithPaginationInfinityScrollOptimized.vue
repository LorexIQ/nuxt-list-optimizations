<script setup lang="ts">
interface Emits {
  (e: 'timeLoading', v: number): void;
}

const emit = defineEmits<Emits>();

let startRender = Date.now();
const isFetch = ref(false);
const { data: dataList, count: counts } = await useFetch(`/api/data`).then(res => res.data.value);
const columns = Object.keys(dataList[0]);

const currentScroll = ref(0);
const scrolledRef = ref<HTMLDivElement>();

function calcTriggerPos() {
  currentScroll.value = scrolledRef.value!.scrollTop;
}

onMounted(() => emit('timeLoading', Date.now() - startRender));
</script>

<template>
  <div class="list-with-pagination-infinity-scroll-optimized">
    <div
        class="list-with-pagination-infinity-scroll-optimized__table"
        ref="scrolledRef"
        @scroll="calcTriggerPos"
    >
      <div
          class="list-with-pagination-infinity-scroll-optimized__table__list"
          :style="{ height: 42 * dataList.length + 'px' }"
      >
        <template
            v-for="(row, index) in dataList"
            :key="row.id"
        >
          <div
              class="list-with-pagination-infinity-scroll-optimized__table__list__element"
              :style="{ top: `${index * 42}px` }"
              v-if="(index + 1) * 42 >= currentScroll && currentScroll + (scrolledRef?.clientHeight ?? 0) >= index * 42"
          >
            <ui-list-element
                v-for="column in columns"
                :key="row.id + column"
            >
              {{ row[column] }}
            </ui-list-element>
          </div>
        </template>
      </div>
    </div>
    <div class="list-with-pagination-infinity-scroll-optimized__info">
      <span>Строк: {{ counts }}</span>
      <span>Показано: {{ dataList.length }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-with-pagination-infinity-scroll-optimized {
  .list-element {
    width: 100%;
  }

  &__table {
    display: flex;
    overflow: auto;
    max-height: 400px;

    &__list {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;

      &__element {
        position: absolute;
        display: flex;
        width: 100%;
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
