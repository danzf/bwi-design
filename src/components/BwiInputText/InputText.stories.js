import { hideArgTypes, hideEvents, default as storybookMixin } from '../../utils/storybook'
import BwiIcon from '../BwiIcon'
import BwiInputText from './InputText.vue'

export default {
  component: BwiInputText,
  title: 'Components/InputText',
}

const Template = (args, context) => {
  return {
    name: 'BwiInputTextStories',
    components: { BwiInputText },
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-input-text
        v-bind="$props" 
        v-on="events" 
      />
    `,
  }
}

export const Default = Template.bind({})

export const Prefix = Template.bind({})
Prefix.args = {
  prefixText: 'rp',
  prefixConfig: {
    valueKey: 'value',
    labelKey: 'label',
    options: [
      {
        value: 'rp',
        label: 'Rp'
      },
      {
        value: 'usd',
        label: 'USD'
      },
      {
        value: 'jpy',
        label: 'JPY',
      },
    ]
  },
}
Prefix.storyName = 'With Prefix'
hideArgTypes(Prefix, [
  'value',
  'name',
  'placeholder',
  'label',
  'helperText',
  'errorMessage',
  'suffixText',
  'suffixConfig',
])
hideEvents(Prefix, [
  'input',
  'change:suffix-text'
])

export const Suffix = Template.bind({})
Suffix.args = {
  suffixText: 'Hari',
  suffixConfig: {
    options: [
      'Hari',
      'Minggu',
      'Bulan',
      'Tahun'
    ]
  },
}
Suffix.storyName = 'With Suffix'
hideArgTypes(Suffix, [
  'value',
  'name',
  'placeholder',
  'label',
  'helperText',
  'errorMessage',
  'prefixText',
  'prefixConfig',
])
hideEvents(Suffix, [
  'input',
  'change:prefix-text'
])

export const WithIcons = (/* args, context */) => {
  return {
    name: 'BwiInputTextStories',
    components: { BwiInputText, BwiIcon },
    template: `
      <bwi-input-text>
        <template #prefix-icon>
          <bwi-icon
            name="user"
            size="1em"
            fill="#bdbdbd"
          />
        </template>
        <template #suffix-icon>
          <bwi-icon
            name="eye"
            size="1em"
            fill="#bdbdbd"
          />
        </template>
      </bwi-input-text>
    `,
  }
}
