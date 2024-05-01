<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const inputValue = ref('')
const hardValidateInput = ref('')
const selectValue = ref('')

const selectOptions = ref(['Ruble', 'Dollar', 'Euro', 'BTC'])

const rules = computed(() => ({
  inputValue: {
    required
  },
  selectValue: {
    required
  },
  hardValidateInput: {
    required, 
    minLength: minLength(10),
  }
}))

const v = useVuelidate(rules, {inputValue, selectValue, hardValidateInput})

const isSelectValid = computed(() => {
  let testValues = []
  selectOptions.value.forEach(value => testValues.push(value.toLowerCase()))
  return testValues.some(value => value.toLowerCase() === selectValue.value.toLowerCase())
})

const isFormSubmitDisabled = computed(() => {
  return (v.$anyDirty || v.$error) || 
  !(inputValue.value && hardValidateInput.value && selectValue.value) || !isSelectValid.value
})


const submitForm = () => {
  alert('форму отправили')
}

const clickButton = (number) => {
  document.querySelector('#testMenu').hidePopover()
  console.log(`Нажата кнопка ${number}`)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <AppInput
      placeholder="simple input"
      v-model:value="v.inputValue.$model"
      :errors="v.inputValue.$errors"
    />
    <AppInput
      placeholder="some-validate input"
      v-model:value="v.hardValidateInput.$model"
      :errors="v.hardValidateInput.$errors"
    />
    <AppInputSelect
      v-model:value="v.selectValue.$model"
      placeholder="Select"
      id="testSelect"
      :options="selectOptions"
    />
    <button type="reset">
      Очистить
    </button>
    <button type="submit" :disabled="isFormSubmitDisabled">
      Отправить
    </button>
  </form>
  <BurgerMenu id="testMenu">
    <template #menu>
      <button @click="clickButton(1)">
        Кнопка 1
      </button>
      <button @click="clickButton(2)">
        Кнопка 2
      </button>
      <button @click="clickButton(3)">
        Кнопка 3
      </button>
    </template>
  </BurgerMenu>
</template>

<style scoped>
</style>
