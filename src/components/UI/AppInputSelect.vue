<script setup>
import AppInput from './AppInput.vue';

const emit = defineEmits(['update:value'])

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    inputmode: {
        type: String,
        default: 'text',
    },
    value: {
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errors: {
        type: Array,
        required: false,
    }
})

const updateValue = (newValue) => {
    emit('update:value', newValue)
}
</script>

<template>
    <AppInput
        :value="props.value"
        @update:value="updateValue"
        :list="id"
        :placeholder
    />
    <datalist :id>
        <option
            v-for="option of props.options" 
            :key="option"
            :value="option"
        ></option>
    </datalist>
</template>

<style scoped>
</style>