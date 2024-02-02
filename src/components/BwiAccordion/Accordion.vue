<template>
  <div :class="{
    'bwi-accordion': true,
    'bwi-accordion--icon-as-trigger': trigger === 'icon',
    'bwi-accordion--show': mShow
  }">
    <div
      tabindex="0"
      class="bwi-accordion__header font-sans-2"
      @click="onClickHeader"
    >
      <strong class="bwi-accordion__header__title">
        {{ title }}
      </strong>
      <button
        class="bwi-accordion__btn-trigger"
        @click.stop="onClickTrigger"
      >
        <bwi-icon
          name="chevron-right"
          class="text-blue-800"
          size="14px"
          :rotate="mShow ? 90 : 0" 
        />
      </button>
    </div>
    <div class="bwi-accordion__body">
      <!-- 
        @slot Default slot
       -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import BwiIcon from '../BwiIcon'
export default {
  components: {
    BwiIcon
  },
  mixins: [localCopy('show', 'mShow')],
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    /**
     * Bound model. Expand accordion when equals true.
     * @name show
     * @model
     */
    show: {
      type: Boolean
    },
    /**
     * Set which element to trigger accordion
     * expand/collapse state. Default to `'header'`
     * @values header,icon
     */
    trigger: {
      type: String,
      default: 'header'
    },
    /**
     * Accordion title
     */
    title: {
      type: String
    }
  },
  data() {
    return {
      mShow: false
    }
  },
  methods: {
    onClickHeader() {
      if (this.trigger === 'header') {
        this.toggle()
      }      
    },
    onClickTrigger() {
      this.toggle()
    },
    /**
     * Can be used to force open accordion
     * @public
     */
    open() {
      this.mShow = true
      this.emitChange(true)
    },
    /**
     * Can be used to force close accordion
     * @public
     */
    close() {
      this.mShow = false
      this.emitChange(false)
    },
    /**
     * Can be used to force toggle accordion
     * based on previous state
     * @public
     */
    toggle() {
      this.mShow = !this.mShow
      this.emitChange(this.mShow)
    },
    emitChange(show) {
      /**
       * Emitted on accordion collapsed or expanded
       */
      this.$emit('change', show)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./Accordion.scss";
</style>
