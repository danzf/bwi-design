import storybookMixin from '../../utils/storybook'
import BwiSelect from './Select.vue'

export default {
  component: BwiSelect,
  title: 'Components/Select'
}

const Template = (args, context) => {
  return {
    name: 'BwiSelectStories',
    components: {
      BwiSelect,
    },
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-select
        v-bind="$props"
        v-on="events">
      </bwi-select>
    `
  }
}

const defaultArgs = {
  options: [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
  ]
}

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs
}

export const WithOptionsHeader = Template.bind({})
WithOptionsHeader.args = {
  ...defaultArgs,
  optionsHeader: 'Header'
}

export const FilterableOptions = Template.bind({})
FilterableOptions.args = {
  ...defaultArgs,
  optionsHeader: 'Header',
  filterable: true,
}
