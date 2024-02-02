<template>
  <div
    :class="{
      'bwi-text-area font-sans-1': true,
      'bwi-text-area--empty': isEmpty,
      'bwi-text-area--error': showErrorMsg,
      'bwi-text-area--focused': isFocused,
      'bwi-text-area--hovered': isHovered,
    }"
  >
    <bwi-form-control-label v-if="showLabel">
      {{ label }}
    </bwi-form-control-label>
    <bwi-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </bwi-form-control-helper-text>
    <div
      class="bwi-text-area__input-wrapper"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <textarea
        rows="7"
        v-bind="inputAttributes"
        :value="mValue"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
    <bwi-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </bwi-form-control-error-message>
  </div>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import {
BwiFormControlErrorMessage,
BwiFormControlHelperText,
BwiFormControlLabel,
} from '../BwiFormControl'

function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  mixins: [localCopy('value', 'mValue')],
  components: {
    BwiFormControlLabel,
    BwiFormControlErrorMessage,
    BwiFormControlHelperText,
  },
  name: 'bwi-text-area',
  props: {
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: String,
    },
    /**
     * Text area name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Textarea placeholder attribute.
     */
    placeholder: {
      type: String,
    },
    /**
     * Textarea label.
     */
    label: {
      type: String,
    },
    /**
     * Textarea Hint.
     */
    helperText: {
      type: String,
    },
    /**
     * Display error message.
     */
    errorMessage: {
      type: String,
    },
  },
  data() {
    return {
      isFocused: false,
      isHovered: false,
      mValue: undefined,
    }
  },
  methods: {
    onInput(e) {
      this.mValue = e.target.value
      this.emitInput(e.target.value)
    },
    emitInput(value) {
      /**
       * Emitted on input
       * @param {string} value - updated bound model
       */
      this.$emit('input', value)
    },
  },
  computed: {
    inputAttributes() {
      const attrs = ['name', 'placeholder']
      return attrs.reduce((obj, key) => {
        obj[key] = this[key]
        return obj
      }, {})
    },
    showLabel() {
      return isStringDefined(this.label)
    },
    showHelperText() {
      return isStringDefined(this.helperText)
    },
    showErrorMsg() {
      return isStringDefined(this.errorMessage)
    },
    isEmpty() {
      return !isStringDefined(this.mValue)
    },
  },
}
</script>

<style lang="scss">
@use "./TextArea.scss";
</style>
