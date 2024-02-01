<script setup lang="ts">
</script>

<template>
  <div class="list-element">
    <div class="list-element__content">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-element {
  width: max-content;
  padding: 2px;
  white-space: nowrap;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    color: #fffefe;
    background-color: #716f6f;
    border-radius: 6px;
  }
}
</style>
