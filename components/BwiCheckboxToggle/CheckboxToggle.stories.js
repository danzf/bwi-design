import storybookMixin from '../../utils/storybook'
import BwiCheckboxToggle from './CheckboxToggle.vue'

export default {
  component: BwiCheckboxToggle,
  title: 'Components/CheckboxToggle',
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'radio'
      }
    }
  }
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'BwiCheckboxStories',
    components: { BwiCheckboxToggle },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-checkbox-toggle
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  size: 'md'
}
