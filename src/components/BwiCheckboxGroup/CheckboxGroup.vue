<template>
  <div :class="{
    'bwi-checkbox-group font-sans-1': true,
    'bwi-checkbox-group--horizontal': isHorizontal,
    'bwi-checkbox-group--vertical': isVertical,
  }">
    <bwi-form-control-label v-if="showLabel">
      {{ label }}
    </bwi-form-control-label>
    <bwi-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </bwi-form-control-helper-text>
    <div
      class="bwi-checkbox-group__checkbox-items"
      role="list"
    >
      <bwi-checkbox
        v-for="(opt, i) in options"
        :key="i"
        :value="getOptionValue(opt)"
        :text="getOptionLabel(opt)"
        @change="onCheckboxItemChange($event, opt)"
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
getOptionLabel,
getOptionValue
} from '../../utils/options-handler'
import BwiCheckbox from '../BwiCheckbox'
import {
BwiFormControlErrorMessage,
BwiFormControlHelperText,
BwiFormControlLabel
} from '../BwiFormControl'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'bwi-checkbox-group',
  components: {
    BwiFormControlLabel,
    BwiFormControlHelperText,
    BwiFormControlErrorMessage,
    BwiCheckbox,
  },
  mixins: [localCopy('value', 'mValue')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'text',
    },
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     * Set grouped checkboxes name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Set list orientation.
     * @values horizontal,vertical
     */
    orientation: {
      type: String,
      default: 'vertical'
    },
    /**
     * Checkbox group label.
     */
    label: {
      type: String,
    },
    /**
     * Checkbox group hint.
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
      mValue: [],
    }
  },
  computed: {
    isHorizontal () {
      return this.orientation === 'horizontal'
    },
    isVertical () {
      return this.orientation === 'vertical'
    },
    showLabel () {
      return isStringDefined(this.label)
    },
    showHelperText () {
      return isStringDefined(this.helperText)
    },
    showErrorMsg () {
      return isStringDefined(this.errorMessage)
    },
  },
  methods: {
    getOptionValue(option) {
      return getOptionValue(option, this.valueKey)
    },
    getOptionLabel(option) {
      return getOptionLabel(option, this.labelKey)
    },
    onCheckboxItemChange (checked, option) {
      const val = this.getOptionValue(option)
      if (checked && !this.mValue.includes(val)) {
        this.mValue.push(val)
      } else if (!checked && this.mValue.includes(val)) {
        this.mValue = this.mValue.filter((v) => v !== val)
      }
      this.emitChange(this.mValue)
    },
    emitChange (value) {
      /**
       * Emitted when bound model changed.
       * Order of values is not guaranteed.
       * @param {Array<any>} value
       */
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
@use "./CheckboxGroup.scss";
</style>
