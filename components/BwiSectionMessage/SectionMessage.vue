<template>
  <div :class="[{
    'bwi-section-message font-sans-1': true,
    'bwi-section-message--show': mShow,
    }, classVariant]">
    <bwi-icon 
      :name="iconName" 
      size="18px"
      class="bwi-section-message__icon"
      />  
    <div class="bwi-section-message__content">
      <p class="bwi-section-message__content__text">
        {{ message }}
      </p>
      <div class='bwi-section-message__content__actions'>
        <!-- 
          @slot Default slot. 
          You can insert button or link to this slot
        -->
        <slot>
          <template v-if="buttons.length">
            <div v-for="(button, index) in buttons.slice(0, 3)" :key="index">
              <bwi-button 
                type="button" 
                :label="button.label" 
                variant="tertiary-paddingless" 
                class="bwi-section-message__content__actions__button"
                @click="$emit('click:button', button.name, index)" 
              >
                <bwi-icon :name="button.icon" size="xs" class="bwi-section-message__content__actions__button__icon" />
              </bwi-button>
            </div>
          </template>
        </slot>
      </div>
    </div>
    <template v-if="dismissible">
      <bwi-icon 
        name="times" 
        size="20px"
        class="bwi-section-message__icon"
        @click="closeMessage" 
      />
    </template>
  </div>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import BwiButton from '../BwiButton'
import BwiIcon from '../BwiIcon'

export default {
  name: 'bwi-section-message',
  mixins: [
    localCopy('show', 'mShow')
  ],
  model: {
    prop: 'show',
    event: 'click:close',
  },
  components: {
    BwiIcon,
    BwiButton
  },
  props: {
    /**
     * Bound model. Display the component when the value is `true`.
     * @name show
     * @model
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * Variant of this component.
     * <br/>
     * You can use either the `info`, `warning`, `error`, or `success`.
     */
    variant: {
      type: String,
      default: "info"
    },
    /**
     * Add close button to the component.
     */
    dismissible: {
      type: Boolean
    },
    /**
     * Text for section message
     */
    message: {
      type: String
    },
    /**
     * Add action buttons to component
     */
    buttons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mShow: null
    }
  },
  computed: {
    classVariant() {
      const variant = {
        info: 'bwi-section-message--info',
        warning: 'bwi-section-message--warning',
        success: 'bwi-section-message--success',
        error: 'bwi-section-message--error',
      }
      return variant[this.variant?.toLowerCase()] ?? ''
    },
    iconName() {
      const variant = {
        info: 'info-circle',
        warning: 'warning',
        success: 'check-mark-circle',
        error: 'exclamation-mark-circle',
      }
      return variant[this.variant?.toLowerCase()] ?? ''
    }
  },
  methods: {
    closeMessage() {
      /**
       * Emitted on click close button
       * @param {boolean} show
       */
      this.$emit('click:close', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./SectionMessage.scss";
</style>
