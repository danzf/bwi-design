import storybookMixin from '../../utils/storybook'
import BwiPopoverDropdown from './PopoverDropdown.vue'

export default {
  component: BwiPopoverDropdown,
  title: 'Components/Popover Dropdown',
  argTypes: {
    arrow: {
      control: false
    }
  }
}

const Template = (args, context) => {
  return {
    name: 'BwiPopoverDropdownStories',
    components: {
      BwiPopoverDropdown
    },
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-popover-dropdown
        v-bind="$props"
      >
        <div style="padding: 16px;">
          Dropdown Content
        </div>
      </bwi-popover-dropdown>
    `,
  }
}

export const Default = Template.bind({})
Default.storyName = 'Default'
