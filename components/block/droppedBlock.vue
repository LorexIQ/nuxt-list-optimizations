<script setup lang="ts">
interface Props {
  title: string;
  defaultStatus?: boolean;
}
interface Emits {
  (e: 'statusChange', v: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isOpen = ref(props.defaultStatus ?? false);

watch(isOpen, value => emit('statusChange', value));
</script>

<template>
  <div class="dropped-block">
    <div
        class="dropped-block__head"
        @click="isOpen = !isOpen"
    >
      <div class="dropped-block__head__title">
        {{ title }}
      </div>
      <div class="dropped-block__head__right">
        <div class="dropped-block__head__right__time">
          <slot name="time"/>
        </div>
        <div class="dropped-block__head__right__opener">
          <ui-icon
              :class="{ 'state-rotate': isOpen }"
              icon="ArrowDown"
          />
        </div>
      </div>
    </div>
    <div
        class="dropped-block__content"
        v-if="isOpen"
    >
      <slot name="default"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropped-block {
  &__head {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    background-color: #dedede;
    box-shadow: 0 0 3px #797979;
    cursor: pointer;
    user-select: none;

    &__right {
      display: flex;
      align-items: center;
      gap: 10px;

      &__opener {
        display: flex;
        align-items: center;

        & svg {
          transition: .3s;
        }
      }
    }
  }
  &__content {
    padding: 10px;
    border: 1px solid #dedede;
    box-shadow: 0 0 3px #797979 inset;
  }
}
</style>
