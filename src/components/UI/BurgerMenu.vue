<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
</script>

<template>
    <button :popovertarget="props.id" class="burgerButton">
        ...
    </button>
    <div class="burgerMenu" :id popover>
        <slot name="menu" />
    </div>
</template>

<style scoped>
.burgerButton {
    color: black;
    background-color: var(--burger-bg);
    border: none;
    border-radius: 12px;
    aspect-ratio: 1/1;
    font-size: 1rem;
    width: 2rem;
    transition: 500ms;

    &:hover {
        color: white;
        background-color: var(--main-purple);
    }
}

.burgerMenu:popover-open {
    border: none;
    box-shadow: 0px 3px 15px 0px #4D4D4D40;
    position: relative;
    inset: unset;
    margin-left: 4px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    padding: 8px;
}
</style>