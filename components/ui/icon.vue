<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type {IconsType} from "~/assets/icons";
import icons from "~/assets/icons";

interface Props {
  icon: IconsType;
  size?: string;
}

defineProps<Props>();
</script>

<template>
  <icon
      :width="size ?? null"
      :height="size ?? null"
      :icon="icons[icon] ?? icon"
  />
</template>
