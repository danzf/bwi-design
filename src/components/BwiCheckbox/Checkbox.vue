<template>
  <component
    :is="tag" 
    :class="{
      'bwi-checkbox font-sans-1': true,
      'bwi-checkbox--error-line': showErrorLine,
      'bwi-checkbox--checked': !indeterminate && mChecked,
      'bwi-checkbox--indeterminate': indeterminate,
      'bwi-checkbox--error': showErrorMsg,
      'bwi-checkbox--focus': isFocused,
      'bwi-checkbox--hover': isHovered,
    }"
  >
    <bwi-form-control-label v-if="showLabel">
      {{ label }}
    </bwi-form-control-label>
    <bwi-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </bwi-form-control-helper-text>
    <div
      class="bwi-checkbox__checkbox-wrapper"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <bwi-checkbox-toggle
        ref="checkboxToggle"
        :name="name"
        :checked="mChecked"
        :indeterminate="indeterminate"
        @change="onCheckboxChange"
      />
      <label
        class="bwi-checkbox__option-label"
        @click="onClickLabel"
      >
        {{ text }}
      </label>
    </div>
    <bwi-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </bwi-form-control-error-message>
  </component>
</template>

<script>
import {
BwiFormControlErrorMessage,
BwiFormControlHelperText,
BwiFormControlLabel
} from '../BwiFormControl'

import BwiCheckboxToggle from '../BwiCheckboxToggle'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'bwi-checkbox',
  components: {
    BwiFormControlLabel,
    BwiFormControlHelperText,
    BwiFormControlErrorMessage,
    BwiCheckboxToggle
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /**
     * Define checkbox root element tag.
     * @private
     * @ignore
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Input checkbox value.
     */
    value: {
      type: [String, Number],
    },
    /**
     * Displays text next to checkbox input.
     */
    text: {
      type: [String, Number],
    },
    /**
     * Checkbox name attribute.
     */
    name: {
      type: String
    },
    /**
     * Bound model. Display check mark icon if equals true.
     * @name checked
     * @model
     */
    checked: {
      type: [String, Number, Boolean]
    },
    /**
     * Set checkbox as indeterminate (nor true or false).
     * Override currently displayed icon, if any.
     */
    indeterminate: {
      type: Boolean,
    },
    /**
     * Checkbox label.
     */
    label: {
      type: String,
    },
    /**
     * Checkbox hint.
     */
    helperText: {
      type: String,
    },
    /**
     * Displays error message.
     */
    errorMessage: {
      type: String,
    }
  },
  data () {
    return {
      isFocused: false,
      isHovered: false,
      mChecked: undefined,
    }
  },
  computed: {
    showLabel () {
      return isStringDefined(this.label)
    },
    showHelperText () {
      return isStringDefined(this.helperText)
    },
    showErrorMsg () {
      return isStringDefined(this.errorMessage)
    },
    showErrorLine () {
      return this.showLabel && this.showHelperText && this.showErrorMsg
    },
    hasInputValue () {
      return this.value !== null && typeof this.value !== 'undefined'
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler (v) {
        if (!this.hasInputValue) {
          this.mChecked = !!v
          return
        }
        if (v === true) {
          this.mChecked = true
          return
        }
        this.mChecked = v === this.value
      }
    }
  },
  methods: {
    onClickLabel () {
      // forward click event to CheckboxToggle
      this.$refs.checkboxToggle?.onClick?.()
    },
    onCheckboxChange (checked) {
      this.mChecked = checked
      this.emitInput(this.mChecked)
      this.emitChange(this.mChecked)
    },
    emitInput (checked) {
      /**
       * Emitted when checkbox checked state is changed.
       * @param {any} value
       */
      this.$emit('input', checked ? this.value : undefined)
    },
    emitChange (checked) {
      if (this.hasInputValue) {
        this.$emit('change', this.mChecked ? this.value : undefined)
      } else {
        /**
         * Emitted when checkbox checked state is changed.
         * @param {boolean} checked
         */
        this.$emit('change', checked)
      }
    }
  }
}
</script>

<style lang="scss">
@use "./Checkbox.scss";
</style>
