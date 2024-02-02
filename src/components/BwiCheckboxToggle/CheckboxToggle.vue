<template>
  <div
    :class="{
      'bwi-checkbox-toggle': true,
      'bwi-checkbox-toggle--indeterminate': mIndeterminate,
      'bwi-checkbox-toggle--checked': !mIndeterminate && mChecked,
      'bwi-checkbox-toggle--hovered': isHovered,
      'bwi-checkbox-toggle--focused': isFocused
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="onClick"
  >
    <input
      :name="name"
      type="checkbox"
      style="display: none;"
      :tabIndex="-1"
      :checked="mChecked"
    >
    <i
      role="checkbox"
      :class="{
        'bwi-checkbox-toggle__icon-wrapper': true,
        'bwi-checkbox-toggle__icon-wrapper--sm': size === 'sm'
      }"
      :tabIndex="1"
      @focus="onFocus"
      @blur="onBlur"
    >
      <bwi-icon
        name="check-mark"
        alt="checked"
        class="bwi-checkbox-toggle__icon"
        fill="white"
      />
      <bwi-icon
        v-show="mIndeterminate"
        name="minus"
        alt="indeterminate"
        class="bwi-checkbox-toggle__icon"
        fill="white"
      />
    </i>
  </div>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import BwiIcon from '../BwiIcon'

export default {
  name: 'bwi-checkbox-toggle',
  mixins: [
    localCopy('indeterminate', 'mIndeterminate')
  ],
  model: {
    prop: 'checked',
    event: 'change'
  },
  components: {
    BwiIcon
  },
  props: {
    /**
     * Checkbox name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Checkbox value.
     */
    value: {
      type: [String, Number, Boolean],
      default: null,
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
     * Determine checkbox size.
     * @values sm,md
     */
    size: {
      type: String,
      default: 'md'
    }
  },
  data () {
    return {
      isHovered: false,
      isFocused: false,
      mChecked: false,
      mIndeterminate: false
    }
  },
  computed: {
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
    onClick () {
      if (this.mIndeterminate) {
        this.mIndeterminate = !this.mIndeterminate
        this.emitIndeterminateUpdate()
      }
      this.mChecked = !this.mChecked
      this.emitClick()
      this.emitInput(this.mChecked)
      this.emitChange(this.mChecked)
    },
    emitClick () {
      /**
       * Emitted when checkbox is clicked.
       */
      this.$emit('click')
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
    },
    emitIndeterminateUpdate() {
      /**
       * Emitted when checkbox indeterminate state is changed.
       * Support `.sync` modifier.
       * @param {boolean} indeterminate
       */
      this.$emit('update:indeterminate', this.mIndeterminate)
    },
    onFocus () {
      this.isFocused = true
      this.$emit('focus')
    },
    onBlur () {
      this.isFocused = false
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./CheckboxToggle.scss";
</style>
