<script setup>
import { computed } from 'vue';

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
    placeholder: {
        type: String,
        default: '',
    },
    list: {
        type: String,
        required: false,
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

const updateValue = (event) => {
    const newValue = event.target.value
    emit('update:value', newValue)
}

const hasError = computed(() => !!props.errors?.length ?? false)

const inputClasses = computed(() => hasError.value? 'inputField error' : 'inputField')
</script>

<template>
    <div :class="inputClasses">
        <input
            :type
            :value
            :inputmode
            :list
            placeholder=""
            @change="updateValue"
        />
        <span>{{ placeholder }}</span>
    </div>
    <div 
        v-for="error of props.errors" :key="error.$uid"
        class="errorComment"
    >
        <span>{{ error.$message }}</span>
    </div>
</template>

<style>
.inputField {
  position: relative;
  margin-top: 12px;
}

.inputField input {
  padding: 8px 20px;
  padding-top: 20px;
  background-color: var(--input-bg);
  border: none;
  border-radius: 12px;
  width: 50%;
  color: black;
}

.inputField input:focus {
  border: 1.8px solid var(--main-purple);
  outline: none;
}

.inputField span {
  pointer-events: none;
  opacity: 0.5;
  position: absolute;
  padding-left: 20px;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: text;
}

.inputField input:focus+span,
.inputField input:not(:placeholder-shown)+span {
  top: 7px;
  -webkit-transform: scale(0.7) translateY(-10%) translateX(-8.5px);
  transform: scale(0.7) translateY(-10%) translateX(-8.5px);
}

.inputField input,
.inputField span {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  -webkit-transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}

.error {
    & span {
        color: darkred;
    }

    & input {
        background-color: var(--error-bg);
    }
}

.errorComment {
    color: red;
    margin-left: 12px;
}
</style>