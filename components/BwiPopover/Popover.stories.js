import storybookMixin from '../../utils/storybook'
import BwiPopoverDropdown from '../BwiPopoverDropdown'
import popperOptions from '../BwiPopoverDropdown/options'
import BwiPopover from './Popover.vue'

export default {
  component: BwiPopover,
  title: 'Components/Popover',
}

const Template = (args, context) => {
  return {
    name: 'BwiPopoverStories',
    components: {
      BwiPopover,
      BwiPopoverDropdown
    },
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-popover v-bind="$props">
        <template #activator="{ on }">
          <button v-on="on" style="width: 600px;">
            Activator
          </button>
        </template>
        <bwi-popover-dropdown>
          <p style="padding: 16px;">
            Content
          </p>
        </bwi-popover-dropdown>
      </bwi-popover>
    `
  }
}

export const Default = Template.bind({})
Default.storyName = 'Default'
Default.args = {
  options: popperOptions
}
