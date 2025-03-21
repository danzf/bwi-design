<template>
  <bwi-popover ref="popover" v-clickaway="onClickaway" :options="popperOptions">
    <template #activator="{ on }">
      <div :class="{
        'bwi-date-input': true,
        'font-sans-1': true,
      }">
        <bwi-form-control-label v-if="showLabel">
          {{ label }}
        </bwi-form-control-label>
        <div :class="{
          'bwi-date-input__input': true,
          'bwi-date-input__input--error': showErrorMsg,
          'bwi-date-input__input--focus': isFocused,
          }">
          <input
            type="text"
            id="date"
            ref="input"
            v-on="on"
            :value="mValue"
            @click="onClick"
            @accept="onAccept"
            @complete="onComplete"
            @focus="onFocus"
            @blur="onBlur"
            autocomplete="off"
          />
          <bwi-icon
            v-on="on"
            @click="onClick" 
            name="calendar-date-outline" 
            size="18px"
            :class="{
              'bwi-date-input__input-suffix-icon': true,
              'bwi-date-input__input-suffix-icon--focus': isFocused,
            }
          "/>
        </div>
        <bwi-form-control-error-message v-if="showErrorMsg">
          {{ mErrorMessage }}
        </bwi-form-control-error-message>
      </div>
    </template>
    <template>
      <bwi-calendar v-model="mValue" @change="onDateInputChange()" />
    </template>
  </bwi-popover>
</template>
<script>
import { directive as clickaway } from 'vue-clickaway'
import localCopy from '../../mixins/local-copy'
import { fnDate, imask } from '../../utils/date-input'
import BwiCalendar from '../BwiCalendar'
import {
  BwiFormControlErrorMessage,
  BwiFormControlLabel
} from '../BwiFormControl'
import BwiIcon from '../BwiIcon'
import BwiPopover from '../BwiPopover'
import popperOptions from './options'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'bwi-date-input',
  components: {
    BwiFormControlLabel,
    BwiFormControlErrorMessage,
    BwiCalendar,
    BwiIcon,
    BwiPopover
  },
  mixins: [localCopy('errorMessage','mErrorMessage')],
  model: {
    prop: 'value',
    event: 'input',
  },
  directives: {
    clickaway,
  },
  props:{
    /**
     * The name for date input.
     */
    name: {
      type: String
    },
    /**
     * Type of date input.
     * Value is `picker | range`.
     */
    type: {
     type: String,
     default: 'picker'
    },
    /**
     * You can set minimal date for.
     * the earliest acceptable date.
     * The value of the min date format follows the pattern `DD/MM/YYYY`.
     */
    min: {
      type: String,
      default: '01/01/1900'
    },
    /**
     * You can set maximal date for.
     * the latest acceptable date.
     * The value of the max date format follows the pattern `DD/MM/YYYY`.
     */
    max: {
      type: String,
      default: '31/12/9999'
    },
    /**
     * Bound model.
     * @name value
     * @model
     * The value of the input date format follows the pattern `DD/MM/YYYY`.
     */
    value: {
      type: String,
    },
    /**
     * Label for Date Input.
     */
    label:{
      type: String,
    },
    /**
     * Error Message for Date Input.
     */
    errorMessage: {
      type: String
    },
    /**
     * Options for initial value date which is `currentDate | pattern`.
     * If this prop not set default value date will be `pattern`
     */
    initValue : {
      type: String,
      default: 'pattern',
    }

  },
  data(){
    return{
      popperOptions,
      mErrorMessage: undefined,
      isFocused: null,
      maskRef: {},
      mValue: undefined,
      options : {
        min: this.min ? fnDate.parseDate(this.min) : undefined,
        max: this.max ? fnDate.parseDate(this.max) : undefined,
      },
    }
  },
  watch: {
    value : {
      handler: 'syncPropValue'
    }
  },
  computed:{
    showLabel () {
      return isStringDefined(this.label)
    },
    showErrorMsg () {
      return isStringDefined(this.mErrorMessage)
    },
  },
  methods: {
    syncPropValue(v){
      if(typeof v === 'undefined' || v === null || !v.length){
        if(this.initValue === 'currentDate'){
          this.mValue = fnDate.formatDate(new Date())
        }
        this.mErrorMessage = undefined
      }else if(fnDate.parseDate(v) === null) {
        this.mErrorMessage = 'Invalid date'
      }else{
        this.mValue = v
        this.mErrorMessage = undefined
      }
    },
    updateValue(){
      this.maskRef.updateValue()
      this.mValue = this.maskRef.value
    },
    onClick(){
      this.updateValue()
    },
    onFocus(){
      this.updateValue()
      this.isFocused = true
    },
    onBlur(){
      this.updateValue()
      this.isFocused = false
    },
    onDateInputChange(){
      this.$refs.popover.close()
      this.maskRef.value = this.mValue
    },
    onClickaway() {
      this.$refs.popover.close();
    },
    onAccept(e){
      const maskRef = e.detail;
      this.mValue = maskRef.value;
      if(!this.mValue.startsWith('DD')){
        this.mErrorMessage = 'Invalid date'
      }else{
        this.mErrorMessage = undefined
      }
    },
    onComplete (e) {
      const maskRef = e.detail;
      this.emitInput(maskRef.unmaskedValue)
      if(this.errorMessage){
        this.mErrorMessage = this.errorMessage
      }else{
        this.mErrorMessage = undefined
      }
    },
    async initialMask(){
      await this.$nextTick()
      this.maskRef = imask.initMask(this.$refs.input,this.options)
    },
    emitInput(value){
      /**
       * Emitted when date value is changed.
       * @param {any} value
       */
      this.$emit('input', value)
    }
  },
  mounted(){
    this.syncPropValue(this.value)
    this.initialMask()
  },
  beforeDestroy(){
    imask.destroyMask(this.$refs.input)
  }
}
</script>

<style lang="scss">
@use './DateInput.scss'
</style>
