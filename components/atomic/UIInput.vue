<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="space-y-2">
    <label
      v-if="props.label"
      :for="props.label"
      class="block ml-px font-medium text-gray-700"
    >
      {{ props.label }}
    </label>
    <VeeField
      v-slot="{ field }"
      :name="props.name"
    >
      <input
        v-bind="field"
        :type="props.type"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        class="block px-4 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        autocomplete="off"
        autofocus="true"
        @input="event => emits ('update:modelValue', event.target.value)"
      >
    </VeeField>
    <VeeErrorMessage :name="name" class="text-xs text-rose-400" />
  </div>
</template>
