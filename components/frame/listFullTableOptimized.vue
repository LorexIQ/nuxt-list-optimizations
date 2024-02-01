<script setup lang="ts">
interface Emits {
  (e: 'timeLoading', v: number): void;
}

const emit = defineEmits<Emits>();

let startRender = Date.now();
const isFetch = ref(false);
const { data: dataList, count: counts } = await useFetch(`/api/data`).then(res => res.data.value);
const columns = Object.keys(dataList[0]);

const currentHorizontalScroll = ref(0);
const currentVerticalScroll = ref(0);
const scrolledRef = ref<HTMLDivElement>();

function calcTriggerPos() {
  currentVerticalScroll.value = scrolledRef.value!.scrollTop;
  currentHorizontalScroll.value = scrolledRef.value!.scrollLeft;
}

onMounted(() => emit('timeLoading', Date.now() - startRender));
</script>

<template>
  <div class="list-full-table-optimized">
    <div
        class="list-full-table-optimized__table"
        ref="scrolledRef"
        @scroll="calcTriggerPos"
    >
      <div
          class="list-full-table-optimized__table__list"
          :style="{
              minHeight: 42 * dataList.length + 'px',
              minWidth: 220 * columns.length + 'px'
          }"
      >
        <template
            v-for="(row, rIndex) in dataList"
            :key="row.id"
        >
          <div
              class="list-full-table-optimized__table__list__element"
              :style="{ top: `${rIndex * 42}px` }"
              v-if="(rIndex + 1) * 42 >= currentVerticalScroll && currentVerticalScroll + (scrolledRef?.clientHeight ?? 0) >= rIndex * 42"
          >
            <template
                v-for="(column, cIndex) in columns"
                :key="row.id + column"
            >
              <ui-list-element
                  :style="{ left: cIndex * 220 + 'px' }"
                  v-if="(cIndex + 1) * 220 >= currentHorizontalScroll && currentHorizontalScroll + (scrolledRef?.clientWidth ?? 0) >= cIndex * 220"
              >
                {{ row[column] }}
              </ui-list-element>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="list-full-table-optimized__info">
      <span>Строк: {{ counts }}</span>
      <span>Показано: {{ dataList.length }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-full-table-optimized {
  .list-element {
    position: absolute;
    width: 220px;
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
