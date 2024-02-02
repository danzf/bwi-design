// Pagination.stories.js

import storybookMixin from '../../utils/storybook'
import BwiPagination from './Pagination.vue'

export default {
  component: BwiPagination,
  title: 'Components/Pagination',
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'BwiPaginationStories',
    components: { BwiPagination },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-pagination
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  currentPage: 1,
  itemsPerPage: 10,
  itemsPerPageOptions: [10, 20, 30, 40, 50],
  totalRows: 200
};
