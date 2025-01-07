<template>
  <bwi-popover ref="popover" v-clickaway="onClickaway" :options="popperOptions">
    <template #activator="{ on }">
      <div :class="{
        'bwi-date-booking-input': true,
        'font-sans-1': true,
      }">
        <bwi-form-control-label v-if="showLabel">
          {{ label }}
        </bwi-form-control-label>
        <div :class="{
          'bwi-date-booking-input__input': true,
          'bwi-date-booking-input__input--error': showErrorMsg,
          'bwi-date-booking-input__input--focus': isFocused,
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
              'bwi-date-booking-input__input-suffix-icon': true,
              'bwi-date-booking-input__input-suffix-icon--focus': isFocused,
            }
          "/>
        </div>
        <bwi-form-control-error-message v-if="showErrorMsg">
          {{ mErrorMessage }}
        </bwi-form-control-error-message>
      </div>
    </template>
    <template>
      <bwi-calendar 
        v-model="mValue" 
        :min="formattedMinDate" 
        @change="onDateInputChange()" 
      />
    </template>
  </bwi-popover>
</template>

<script>
import { directive as clickaway } from 'vue-clickaway';
import localCopy from '../../mixins/local-copy';
import { fnDate, imask } from '../../utils/date-input';
import BwiCalendar from '../BwiCalendar';
import {
  BwiFormControlErrorMessage,
  BwiFormControlLabel
} from '../BwiFormControl';
import BwiIcon from '../BwiIcon';
import BwiPopover from '../BwiPopover';
import popperOptions from './options';

function isStringDefined(val) {
  return typeof val === 'string' && !!val.length;
}

export default {
  name: 'bwi-date-booking-input',
  components: {
    BwiFormControlLabel,
    BwiFormControlErrorMessage,
    BwiCalendar,
    BwiIcon,
    BwiPopover
  },
  mixins: [localCopy('errorMessage', 'mErrorMessage')],
  model: {
    prop: 'value',
    event: 'input',
  },
  directives: {
    clickaway,
  },
  props: {
    name: { type: String },
    type: { type: String, default: 'picker' },
    min: { type: String, default: '01/01/1900' },
    max: { type: String, default: '31/12/9999' },
    value: { type: String },
    label: { type: String },
    errorMessage: { type: String },
    initValue: { type: String, default: 'pattern' },
  },
  data() {
    return {
      popperOptions,
      mErrorMessage: undefined,
      isFocused: null,
      maskRef: {},
      mValue: undefined,
      options: {
        min: this.min ? fnDate.parseDate(this.min) : undefined,
        max: this.max ? fnDate.parseDate(this.max) : undefined,
      },
    };
  },
   watch: {
    value : {
      handler: 'syncPropValue'
    }
  },
  computed: {
    showLabel() {
      return isStringDefined(this.label);
    },
    showErrorMsg() {
      return isStringDefined(this.mErrorMessage);
    },
    formattedMinDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`; // Format DD/MM/YYYY
    },
  },
  methods: {
    syncPropValue(v) {
      if (typeof v === 'undefined' || v === null || !v.length) {
        if (this.initValue === 'currentDate') {
          this.mValue = fnDate.formatDate(new Date());
        }
        this.mErrorMessage = undefined;
      } else if (fnDate.parseDate(v) === null) {
        this.mErrorMessage = 'Invalid date';
      } else {
        this.mValue = v;
        this.mErrorMessage = undefined;
      }
    },
    updateValue() {
      this.maskRef.updateValue();
      this.mValue = this.maskRef.value;
    },
    onClick() {
      this.updateValue();
    },
    onFocus() {
      this.updateValue();
      this.isFocused = true;
    },
    onBlur() {
      this.updateValue();
      this.isFocused = false;
    },
    onDateInputChange() {
      this.$refs.popover.close();
      this.maskRef.value = this.mValue;
    },
    onClickaway() {
      this.$refs.popover.close();
    },
    async initialMask() {
      await this.$nextTick();
      this.maskRef = imask.initMask(this.$refs.input, this.options);
    },
    emitInput(value) {
      this.$emit('input', value);
    },
  },
  mounted() {
    this.syncPropValue(this.value);
    this.initialMask();
  },
  beforeDestroy() {
    imask.destroyMask(this.$refs.input);
  },
};
</script>
<style lang="scss">
@use './DateInput.scss'
</style>