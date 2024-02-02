<template>
  <form 
    @submit.prevent="submitFormData" 
    class="bwi-search font-sans-1"
    :class="{ 
      'bwi-search--has-icon': hasIcon,
      'bwi-search--small': isSmall
    }"
  >
    <bwi-icon v-if="hasIcon" name="magnifier" size="18px" class="bwi-search__icon" fill="#BDBDBD" />
    <input 
      :value="mValue"
      type="text"
      :placeholder="placeholder"
      :name="name"
      @input="setInputValue"
      class="bwi-search__input"
    >
    <div class="bwi-search__reset-wrapper" @click="clearInputValue">
      <bwi-icon v-show="hasValue" name="times-circle" size="16px" class="bwi-search__reset" />
    </div>
    <bwi-button 
      v-if="hasButton" 
      class="bwi-search__button"
      :class="{'bwi-search__button--small' : isSmall}"
    >
      <template v-if="isSmall">
        <bwi-icon name="magnifier" size="16px" fill="#FFFFFF" />
      </template>
      <template v-else>
        Cari
      </template>
    </bwi-button>
  </form>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import BwiButton from '../BwiButton'
import BwiIcon from '../BwiIcon'

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  name: 'bwi-search',
  mixins: [
    localCopy('value', 'mValue')
  ],
  data () {
    return {
      mValue: null
    }
  },
  components: {
    BwiIcon,
    BwiButton
  },
  props: {
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: String,
      required: true
    },

    /**
     * Placeholder Attribute
     */
    placeholder: {
      type: [String, Number],
      required: false,
      default: null
    },

    /**
     * Name Attribute
     */
    name: {
      type: String,
      required: false,
      default: null
    },

    /**
     * Allow BwiSearch to show 
     * prefix icon
     */
    icon: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Allow BwiSearch to show
     * search button
     */
    button: {
      type: Boolean,
      required: false,
      default: true
    },

    /**
     * Show small variant of
     * BwiSearch
     */
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * clear value when submit / enter
     */
    autoClear:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    hasValue () {
      return this.mValue !== ''
    },
    hasIcon () {
      return this.icon
    },
    hasButton () {
      return this.button
    },
    isSmall () {
      return this.small
    }
  },
  methods: {
    submitFormData () {
      if (this.hasValue) {
        /**
         * Emmited on button click and/or
         * keyboard enter.
         * @param {string} value - updated bound model
         */
        this.$emit('submit', this.mValue)
        if(this.autoClear){
          this.clearInputValue()
        }
      }
    },

    setInputValue (event) {
      this.mValue = event.target.value
      /**
      * Emmited on input.
      * @param {string} value - updated bound model
      */
      this.$emit('input', this.mValue)
    },

    clearInputValue () {
      this.mValue = ''
      /**
       * Emmited on reset button clicked.
       */
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss">
@import "./Search.scss";
</style>
