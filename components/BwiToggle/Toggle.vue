<template>
  <div class="bwi-toggle__wrapper font-sans-1" :class="{'is-inline': isInline}">
    <div v-if="hasLabel">
      <bwi-form-control-label>
        {{ label }}
      </bwi-form-control-label>
      <bwi-form-control-helper-text>
        {{ helperText }}
      </bwi-form-control-helper-text>
    </div>
    <label class="bwi-toggle" :class="{'has-margin': hasMargin}">
      <input hidden :checked="mChecked" v-model="mChecked" @click="onClickCheckbox" type="checkbox" name="toggle" />
      <span class="bwi-toggle__slider bwi-toggle__circle"></span>
    </label>
  </div>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import { BwiFormControlHelperText, BwiFormControlLabel } from '../BwiFormControl'

export default {
  name: 'bwi-toggle',
  mixins: [
    localCopy('checked', 'mChecked')
  ],
  model: {
    prop: 'checked',
    event: 'change',
  },
  components: {
    BwiFormControlLabel,
    BwiFormControlHelperText
  },
  props: {
    /**
     * Bound model.
     * @name checked
     * @model
     */
    checked: {
      type: Boolean
    },
    /**
     * Label for the toggle
     */
    label: {
      type: String
    },
    /**
     * Helper text for the toggle
     */
    helperText: {
      type: String
    },
    /**
     * Display the toggle inline
     */
    inline: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      mChecked: undefined
    }
  },
  computed: {
    hasLabel () {
      return this.label
    },
    isInline () {
      return this.hasLabel && this.inline
    },
    hasMargin () {
      return this.hasLabel && !this.inline
    }
  },
  methods: {
    onClickCheckbox () {
      this.mChecked = !this.mChecked
      /**
       * Emitted on change
       * @param {boolean} checked
       */
      this.$emit('change', this.mChecked) 
    }
  }
}
</script>

<style lang="scss">
@import "./Toggle.scss";
</style>
