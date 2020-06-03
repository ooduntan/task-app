export default {
  name: 'Paginator',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    numberPerPage: {
      type: Number,
      default: 10
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.totalPages / this.numberPerPage)
    },
    nextPage() {
      return Number.parseInt(this.$route.query.page || 1) 
    }
  }
}