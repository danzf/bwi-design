<template>
  <div class="bwi-radio-button-group font-sans-1">
    <div>
      <bwi-form-control-label v-if="showLabel">
        {{ label }}
      </bwi-form-control-label>
      <bwi-form-control-helper-text v-if="showHelperText">
        {{ helperText }}
      </bwi-form-control-helper-text>
      <bwi-form-control-error-message v-if="showErrorMsg">
        {{ errorMessage }}
      </bwi-form-control-error-message>
    </div>
    <div :class="{
      'bwi-radio-button-group__list bwi-radio-button-group__list--horizontal': isHorizontal,
      'bwi-radio-button-group__list bwi-radio-button-group__list--vertical': isVertical,
    }" role="list">
      <bwi-radio-button 
        v-for="(item, i) in items"
        :key="i"
        :name="name"
        :checked="getChecked(item)"
        :value="getOptionValue(item)"
        :placeholder="getOptionLabel(item)"
        @change="onRadioButtonChange"
      />
    </div>
  </div>
</template>
<script>
import {
getOptionLabel,
getOptionValue
} from '../../utils/options-handler'
import {
BwiFormControlErrorMessage,
BwiFormControlHelperText,
BwiFormControlLabel
} from '../BwiFormControl'
import BwiRadioButton from '../BwiRadioButton'


// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'bwi-radio-button-group',
  components:{
    BwiFormControlLabel,
    BwiFormControlHelperText,
    BwiFormControlErrorMessage,
    BwiRadioButton,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props:{
    /**
     * Array Object contain lists of radio button properties
     * 
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Option property name of value for item
     */
    valueKey: {
      type: String,
      default: 'value',
    },
    /**
     * Option property name of placeholder for item
     */
    placeholderKey: {
      type: String,
      default: 'placeholder',
    },
    /**
     * Bound model. 
     * Radio button group value
     * @name value
     * @model
     */
    value: {
      type: String,
    },
    /**
     * The name identity for grouping radio button items
     */
    name: {
      type: String,
    },
    /**
     * Radio button group label
     */
    label: {
      type: String,
    },
    /**
     * Radio button group hint
     */
    helperText: {
      type: String,
    },
    /**
     * Radio button group error message
     */
    errorMessage: {
      type: String
    },
    /**
     * Set list orientation.
     * @values horizontal,vertical
     */
    orientation: {
      type: String,
      default: 'vertical'
    },
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
  methods:{
    getChecked(value){
      return this.value === this.getOptionValue(value)
    },
    getOptionValue(option) {
      return getOptionValue(option, this.valueKey)
    },
    getOptionLabel(option) {
      return getOptionLabel(option, this.placeholderKey)
    },
    onRadioButtonChange(value) {
      this.emitChange(value)
    },
    emitChange (value) {
     /**
       * Emitted when bound model changed.
       * @param {string} value
       */
      this.$emit('change',value)
    }
  }
}
</script>

<style lang="scss">
@use './RadioButtonGroup.scss'
</style>
