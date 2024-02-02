<template>
  <div :class="badgeClasses">
    <div class="bwi-badge__body">
      <!-- 
        @slot Default slot.
      -->
      <slot></slot>
    </div>
    <i
      ref="indicator"
      class="bwi-badge__indicator"
      :style="indicatorStyles"
    >
      <span>
        <!--
          @slot Slot inside badge indicator.
        -->
        <slot name="indicator">
          {{ value }}
        </slot>
      </span>
    </i>
  </div>
</template>

<script>
import { isCSSUnit } from '../../utils/css-units'
export default {
  model: {
    // "event" is intentionally undefined,
    // since no mutation happen locally for "show" prop
    prop: 'show',
  },
  props: {
    /**
     * Show badge.
     * @name show
     * @model
     */
    show: {
      type: Boolean,
      default: true,
    },
    /**
     * Set value inside badge indicator.
     * Won't be shown if `dot` equals true.
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Indicator position. One of `left,right`.
     */
    position: {
      type: String,
      default: 'right'
    },
    /**
     * Indicator vertical alignment. One of `top,middle`.
     */
    align: {
      type: String,
      default: 'top'
    },
    /**
     * Set indicator as inline element.
     */
    inline: {
      type: Boolean,
    },
    /**
     * Show indicator as dot, without inner content.
     */
    dot: {
      type: Boolean,
    },
    /**
     * Set indicator size. Can be one of:
     * 
     * - `xs,sm,md,lg,xs`
     * 
     * - CSS unit, e.g. `1rem`;
     * 
     * Default to `xs` when `dot` equals true, otherwise `md`.
     */
    size: {
      type: String,
    },
    /**
     * Set indicator color. Can be one of `red,blue-gray,blue`,
     * or a CSS color.
     */
    color: {
      type: String,
      default: 'red'
    },
  },
  computed: {
    isCustomSize () {
      return isCSSUnit(this.size)
    },
    isCustomColor () {
      if (!this.color) {
        return false
      }
      return !['red', 'blue-gray', 'blue'].includes(this.color)
    },
    badgeClasses () {
      const classes = {
        'bwi-badge font-sans-2': true,
        'bwi-badge--inline': this.inline,
        'bwi-badge--dot': this.dot,
        'bwi-badge--hidden': !this.show,
        'bwi-badge--left': this.position === 'left',
        'bwi-badge--right': this.position === 'right',
        'bwi-badge--top': this.align === 'top',
        'bwi-badge--middle': this.align === 'middle'
      }

      if (!this.isCustomSize) {
        const isSize = (size) => this.size === size
        Object.assign(classes, {
          'bwi-badge--xs': isSize('xs'),
          'bwi-badge--sm': isSize('sm'),
          'bwi-badge--md': isSize('md'),
          'bwi-badge--lg': isSize('lg'),
          'bwi-badge--xl': isSize('xl'),
        })
      }

      if (!this.isCustomColor) {
        const isColor = (color) => this.color === color
        Object.assign(classes, {
          'bwi-badge--red': isColor('red'),
          'bwi-badge--blue-gray': isColor('blue-gray'),
          'bwi-badge--blue': isColor('blue'),
        })
      }

      return classes
    },
    indicatorStyles () {
      const styles = {}
      if (this.isCustomSize) {
        Object.assign(styles, {
          width: this.size,
          height: this.size,
          bottom: `calc(100% - (${this.size} / 2))`,
        })
      }
      if (this.isCustomColor) {
        Object.assign(styles, {
          backgroundColor: this.color,
        })
      }

      return styles
    },
  }
}
</script>

<style lang="scss">
@use "./Badge.scss";
</style>
