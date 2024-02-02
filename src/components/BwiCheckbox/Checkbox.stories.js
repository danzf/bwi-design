// Button.stories.js

import storybookMixin from '../../utils/storybook'
import BwiCheckbox from './Checkbox.vue'

export default {
  component: BwiCheckbox,
  title: 'Components/Checkbox',
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'BwiCheckboxStories',
    components: { BwiCheckbox },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-checkbox
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
