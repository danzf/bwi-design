<template>
  <div class="bwi-popover font-sans-1">
    <div
      ref="activator"
      class="bwi-popover__activator"
    >
      <!-- @slot When used, will activate the component when clicked or hovered. -->
      <slot name="activator" v-bind="activatorSlotProps"></slot>
    </div>
    <br>
    <div
      key="popoverContent"
      ref="content"
      :class="{
        'bwi-popover__content': true,
        'bwi-popover__content--hidden': !mValue
      }"
    >
      <!-- @slot Popper content. `BwiPopoverDropdown` can be used for default dropdown styling. -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import localCopy from '../../mixins/local-copy'

export default {
  mixins: [localCopy('value', 'mValue')],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * Bound model. Show popper content.
     * @name value
     * @model
     */
    value: {
      type: Boolean,
      default: false,
    },
    /**
     * Set popper.js constructor options.
     */
    options: {
      type: Object,
      default: null
    },
    /**
     * By default, popper.js will be constructed immediately
     * after mounted hooks. Set this to false, and use `BwiPopover#init`
     * to defer popper.js construction. 
     */
    immediate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      popperInstance: null,
      mValue: false,
    }
  },
  computed: {
    activatorSlotProps () {
      return {
        on: {
          click: this.toggle,
          keydown: this.onPressEnter
        },
        open: this.open,
        close: this.close,
        toggle: this.toggle
      }
    },
  },
  mounted () {
    if (this.immediate) {
      this.init(this.options)
    }
  },
  updated() {
    this.updatePopper()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    /**
     * Construct `popper.js` instance.
     * @param {import("@popperjs/core/index").OptionsGeneric} options - `popper.js` constructor options
     * @public
     */
    async init(options) {
      await this.$nextTick()
      if (this.popperInstance) {
        this.popperInstance = null
      }
      this.popperInstance = createPopper(
        this.$refs.activator,
        this.$refs.content,
        options || {}
      )
    },
    updatePopper() {
      if (this.popperInstance) {
        this.popperInstance.update()
      }
    },
    destroy() {
      if (this.popperInstance) {
        this.popperInstance.destroy()
      }
      this.popperInstance = null
    },
    /**
     * Get popper instance.
     * @public
     */
    getPopper() {
      return this.popperInstance
    },
    /**
     * Open popper.
     * @public
     */
    open () {
      this.mValue = true
      this.emitInput(this.mValue)
    },
    /**
     * Close popper.
     * @public
     */
    close () {
      this.mValue = false
      this.emitInput(this.mValue)
    },
    /**
     * Toggle popper between opened and closed.
     * @public
     */
    toggle () {
      this.mValue = !this.mValue
      this.emitInput(this.mValue)
    },
    onPressEnter (e) {
      if (e instanceof KeyboardEvent === false) {
        return
      }
      const isEnter = e.keyCode === 13
        || e.key === 'Enter'
        || e.code === 'Enter'
      if (isEnter) {
        this.toggle()
      }
    },
    emitInput (value) {
      /**
       * Emitted when popover is open or closed.
       * @param {boolean} - value
       */
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
@use "./Popover.scss";
</style>
