<template>
  <div :class="{
    'bwi-input-text-edge': true,
    'bwi-input-text-edge--selectable': hasOptions,
    'bwi-input-text-edge--dropdown-opened': isDropdownOpen,
    'bwi-input-text-edge--prefix': type === 'prefix',
    'bwi-input-text-edge--suffix': type === 'suffix',
  }">
    <div
      class="bwi-input-text-edge__dropdown-trigger"
      @click="onToggleDropdown">
      <label>
        {{ label }}
      </label>
      <bwi-icon
        v-if="hasOptions"
        name="chevron-down"
        size="16px"
        class="bwi-input-text-edge__dropdown-trigger__icon"
      />
    </div>
    <ul
      v-if="hasOptions"
      role="dropdown"
      class="bwi-input-text-edge__dropdown">
      <li
        v-for="(opt, index) in options"
        :key="index"
        role="dropdown-item"
        class="bwi-input-text-edge__dropdown-item"
      >
        <a @click="onClickOptionItem(opt)">
          {{ getOptionLabel(opt, labelKey) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import {
findMatchedOption,
getOptionLabel,
getOptionValue
} from '../../utils/options-handler'
import BwiIcon from '../BwiIcon'

export default {
  name: 'bwi-input-text-edge',
  mixins: [localCopy('value', 'mValue')],
  components: {
    BwiIcon
  },
  props: {
    type: {
      validator: (v) => {
        return typeof v === 'string'
          && ['prefix', 'suffix'].includes(v)
      }
    },
    value: {
      type: [String, Number, Boolean]
    },
    options: {
      type: Array,
    },
    valueKey: {
      type: String,
    },
    labelKey: {
      type: String,
    },
  },
  data() {
    return {
      mValue: undefined,
      isDropdownOpen: false,
    }
  },
  computed: {
    hasOptions () {
      return Array.isArray(this.options) && this.options.length
    },
    label () {
      if (!Array.isArray(this.options)) {
        return this.mValue
      }
      const matched = findMatchedOption(this.mValue, this.options, this.valueKey)
      return matched ? getOptionLabel(matched, this.labelKey) : null
    }
  },
  methods: {
    getOptionLabel,
    getOptionValue,
    onToggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    onClickOptionItem (option) {
      const value = getOptionValue(option, this.valueKey)
      this.isDropdownOpen = false
      this.mValue = value
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
@use "./InputTextEdge.scss";
</style>
