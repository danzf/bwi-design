import { default as storybookMixin } from '../../utils/storybook'
import BwiToggle from './Toggle.vue'

export default {
  component: BwiToggle,
  title: 'Components/Toggle',
}

const Template = (args, context) => {
  return {
    name: 'BwiToggleStories',
    components: { BwiToggle },
    mixins: [storybookMixin(args, context)],
    template: `
    <bwi-toggle 
      v-bind="$props"
      v-on="events"
    />
    `,
  }
}

const defaultArgs = {
  label: '',
  helperText: '',
  inline: false
};

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  ...defaultArgs,
  label: 'Label'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  ...defaultArgs,
  label: 'Label',
  helperText: 'Helper Text'
}

export const InlineDisplay = Template.bind({})
InlineDisplay.args = {
  ...defaultArgs,
  label: 'Label',
  inline: true
}
