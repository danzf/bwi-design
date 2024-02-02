import storybookMixin from '../../utils/storybook'
import BwiTextArea from './TextArea.vue'

export default {
  component: BwiTextArea,
  title: 'Components/TextArea',
}

const Template = (args, context) => {
  return {
    name: 'BwiTextAreaStories',
    components: { BwiTextArea },
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-text-area
        v-bind="$props" 
        v-on="events" 
      />
    `,
  }
}

export const Default = Template.bind({})

