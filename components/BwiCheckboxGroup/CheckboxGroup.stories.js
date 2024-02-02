// Button.stories.js

import storybookMixin from '../../utils/storybook'
import BwiCheckboxGroup from './CheckboxGroup.vue'

export default {
  component: BwiCheckboxGroup,
  title: 'Components/CheckboxGroup',
  argTypes: {
    orientation: {
      options: [
        'horizontal',
        'vertical',
      ],
      control: {
        type: 'radio',
      },
    },
  },
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'BwiCheckboxGroupStories',
    components: { BwiCheckboxGroup },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-checkbox-group
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: 'Some', val: 'some' },
    { label: 'Label', val: 'label' },
    { label: 'For', val: 'for' },
    { label: 'Checkbox', val: 'checkbox' }
  ],
  valueKey: 'val',
  labelKey: 'label',
}
