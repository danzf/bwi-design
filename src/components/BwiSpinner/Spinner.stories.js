import storybookMixin from '../../utils/storybook'
import BwiSpinner from './Spinner.vue'

export default {
  title: 'Components/Spinner',
  component: BwiSpinner,
  argTypes: {
    background: {
      control: {
        type: 'color'
      }
    },
    foreground: {
      control: {
        type: 'color'
      }
    },
  }
}

const Template = (args, context) => {
  return {
    mixins: [storybookMixin(args, context)],
    components: {
      BwiSpinner
    },
    template: `
      <bwi-spinner
        v-bind="$props"
        v-on="events"
      />
    `
  }
}

export const Default = Template.bind({})