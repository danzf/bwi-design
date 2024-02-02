<template>
  <p class="bwi-form-control-error-message">
    <slot></slot>
  </p>  
</template>

<style lang="scss">
@use '../../../styles/scss/variables' as V;

.bwi-form-control-error-message {
  margin: 0;
  padding: 0;
  font-size: 13px;
  line-height: 23px;
  color: V.$red-700;
}
</style>