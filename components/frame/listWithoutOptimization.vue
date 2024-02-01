<script setup lang="ts">
interface Emits {
  (e: 'timeLoading', v: number): void;
}

const emit = defineEmits<Emits>();

const startRender = Date.now();
const dataList = await useFetch('/api/data?limit=1000').then(res => res.data.value.data);
const columns = Object.keys(dataList[0]);

onMounted(() => emit('timeLoading', Date.now() - startRender));
</script>

<template>
  <div class="list-without-optimization">
    <div class="list-without-optimization__list">
      <div
          class="list-without-optimization__list__element"
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
</template>

<style scoped lang="scss">
.list-without-optimization {
  display: flex;
  overflow: auto;

  .list-element {
    width: 100%;
  }

  &__list {
    display: flex;
    flex-direction: column;
    max-height: 400px;

    &__element {
      display: flex;
    }
  }
}
</style>
