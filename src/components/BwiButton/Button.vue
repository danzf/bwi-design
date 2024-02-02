<template>
  <button 
  :class="[{
    'bwi-button': true,
    'font-sans-1': true,
  }, classVariant]"
  v-on="$listeners"
  >
    {{ label }}
    <!-- 
      @slot Use this slot for label or anything you want 
    -->
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'bwi-button',
  props: {
    /**
     * The type for the button
     * value is `button | submit`
     */
    type: {
      type: String,
      default: 'button'
    },
    /**
     * The label for the button
     */
    label: {
      type: String,
    },
    /**
     * The variant for the button
     */
    variant:{
      type: String,
      default: 'primary',
    }
  },
  computed:{
    // class variant
    classVariant(){
      return {
        'bwi-button--primary': this.variant === 'primary',
        'bwi-button--secondary': this.variant === 'secondary',
        'bwi-button--tertiary': this.variant === 'tertiary',
        'bwi-button--tertiary-paddingless': this.variant === 'tertiary-paddingless',
        'bwi-button--danger': this.variant === 'danger'
      }
    }
  },
}
</script>

<style lang="scss">
@use "./Button.scss";
</style>
