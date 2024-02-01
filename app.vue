<script setup lang="ts">
const timesOpened = reactive({
  withoutOptimize: 0,
  withPaginationButtons: 0,
  withPaginationInfinityScroll: 0,
  withPaginationInfinityScrollOptimized: 0,
  withFullTableOptimized: 0,
});

function regTime(frame: keyof typeof timesOpened, status: boolean, returnedTime?: number): void {
  timesOpened[frame] = (status && returnedTime) ? returnedTime : 0;
}
function getTime(frame: keyof typeof timesOpened): string {
  return timesOpened[frame] ? (timesOpened[frame] + 'ms') : '';
}
</script>

<template>
  <div class="app">
    <div class="app__content">
      <h2>Benchmarks Optimizations</h2>

      <block-dropped-block
          title="Без оптимизации"
          @status-change="regTime('withoutOptimize', $event)"
      >
        <template v-slot:time>{{ getTime('withoutOptimize') }}</template>
        <template v-slot:default><frame-list-without-optimization @time-loading="regTime('withoutOptimize', true, $event)"/></template>
      </block-dropped-block>
      <block-dropped-block
          title="Пагинация (страницами)"
          @status-change="regTime('withPaginationButtons', $event)"
      >
        <template v-slot:time>{{ getTime('withPaginationButtons') }}</template>
        <template v-slot:default><frame-list-with-pagination-buttons @time-loading="regTime('withPaginationButtons', true, $event)"/></template>
      </block-dropped-block>
      <block-dropped-block
          title="Пагинация (infinity scroll)"
          @status-change="regTime('withPaginationInfinityScroll', $event)"
      >
        <template v-slot:time>{{ getTime('withPaginationInfinityScroll') }}</template>
        <template v-slot:default><frame-list-with-pagination-infinity-scroll @time-loading="regTime('withPaginationInfinityScroll', true, $event)"/></template>
      </block-dropped-block>
      <block-dropped-block
          title="Пагинация (infinity scroll) [Оптимизировано]"
          @status-change="regTime('withPaginationInfinityScrollOptimized', $event)"
      >
        <template v-slot:time>{{ getTime('withPaginationInfinityScrollOptimized') }}</template>
        <template v-slot:default><frame-list-with-pagination-infinity-scroll-optimized @time-loading="regTime('withPaginationInfinityScrollOptimized', true, $event)"/></template>
      </block-dropped-block>
      <block-dropped-block
          title="Полная табличная оптимизация"
          @status-change="regTime('withFullTableOptimized', $event)"
      >
        <template v-slot:time>{{ getTime('withFullTableOptimized') }}</template>
        <template v-slot:default><frame-list-full-table-optimized @time-loading="regTime('withFullTableOptimized', true, $event)"/></template>
      </block-dropped-block>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background-color: #efefef;

  & h2 {
    text-align: center;
    padding: 20px 0 40px;
  }

  &__content {
    width: 100%;
    max-width: 1100px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
  }
}
</style>
