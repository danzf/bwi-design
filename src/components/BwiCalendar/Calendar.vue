<template>
  <div class="bwi-calendar">
    <div class="bwi-calendar__headerbar">
      <div class="bwi-calendar__btn-prev" @click="prevMonth">
        <bwi-icon  name="chevron-down" size="18px" :rotate="90"/>
      </div>
      <div>
        <span class="bwi-calendar__month"> 
          {{ listOfMonth[mValue.getMonth()] }}
        </span>
        <span class="bwi-calendar__year">
          {{ mValue.getFullYear() }}
        </span>
      </div>
      <div class="bwi-calendar__btn-next" @click="nextMonth">
        <bwi-icon  name="chevron-down" size="18px" :rotate="-90"/>
      </div>
    </div>
    <div class="bwi-calendar__list-of-days">
      <div 
        v-for="(name,index) in listOfDays" 
        :key="index" 
        class="bwi-calendar__name-of-day"
      >
        {{ name }}
      </div>
    </div>
    <div class="bwi-calendar__days">
      <div 
        @click="onCalendarClick(date)" 
        v-for="date in days" 
        :key="date.id"
        :class="{
          'bwi-calendar__days-day' : true,
          'bwi-calendar__days-day--selected': isSelected(date),
          'bwi-calendar__days-day--today': isToday(date),
          'bwi-calendar__days-day--holiday': isSunday(date),
          'bwi-calendar__days-day--gray': isNotThisMonth(date),
        }"
      >
        {{ date.date }}
      </div>
    </div>
  </div>
</template>

<script>
import { getDays, listOfDays, listOfMonth } from '../../utils/calendar'
import { fnDate } from '../../utils/date-input'
import BwiIcon from '../BwiIcon'

export default {
  name: 'bwi-calendar',
  components: {
    BwiIcon
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props:{
    /**
     * The name for calendar
     */
    name: {
      type: String
    },
    /**
     * Type of calendar
     * Value is `picker | range`
     */
    type: {
     type: String,
     default: 'picker'
    },
    /**
     * You can set minimal date for
     * the earliest acceptable date
     * The value of the min date format follows the pattern `DD/MM/YYYY`.
     */
    min: {
      type: String,
      default: '01/01/1900'
    },
    /**
     * You can set maximal date for
     * the latest acceptable date
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
     * if value not set the value will be current date
     */
    value: {
      type: String,
    },
  },
  data() {
    return {
      mValue: undefined,
      selectedValue: null,
      listOfDays,
      listOfMonth
    }
  },
  watch: {
    value: {
      handler: function (v) {
        if(typeof v === 'undefined' || v === null || fnDate.parseDate(v) === null){
          this.mValue = new Date()
        }else{
          this.mValue = fnDate.parseDate(v)
          this.selectedValue = v.split('/')
        }
      },
      immediate: true,
    }
  },
  computed: {
    days () {
      return getDays(this.mValue)
    }
  },
  methods: {
    isSelected (date) {
      if(Array.isArray(this.selectedValue)){
        return (
          parseInt(this.selectedValue[0]) === date.date &&
          parseInt(this.selectedValue[1]) === date.month &&
          parseInt(this.selectedValue[2]) === date.year
        )
      }
      return
    },
    isToday (date) {
      return (
        date.date === new Date().getDate() &&
        date.month === (new Date().getMonth() + 1) &&
        date.year === new Date().getFullYear()
      )
    },
    isSunday (date) {
      return (
        new Date(this.mValue.getFullYear(), this.mValue.getMonth(), date.date).getDay() === 0
      )
    },
    isNotThisMonth(date) {
      return ((this.mValue.getMonth() + 1 ) !== date.month)
    },
    prevMonth(){
      this.mValue = new Date(this.mValue.getFullYear(), this.mValue.getMonth() - 1, this.mValue.getDate())
    },
    nextMonth(){
      this.mValue = new Date(this.mValue.getFullYear(), this.mValue.getMonth() + 1, this.mValue.getDate())
    },
    onCalendarClick (date) {
      let _date = new Date(date.year, date.month-1, date.date)
      _date = fnDate.formatDate(_date)
      this.emitChange(_date)
    },
    emitChange(val){
      /**
       * Emitted when date is click
       */
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
@use './Calendar.scss'
</style>
