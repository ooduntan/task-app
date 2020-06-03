import { required, maxLength } from "vuelidate/lib/validators";

import TaskCard from "@components/taskCard";
import PageLoader from "@components/pageLoader";
import Paginator from "@components/pagination";
import Modal from "@components/modal";
import TextField from "@components/textField";
import TextArea from "@components/textArea";
import Notification from "@components/notification";
import CheckBox from "@components/checkbox";
import NavBar from "@components/navBar";
import methods from './methods'
import computed from './computed'

export default {
  name: "Home",
  components: {
    TaskCard,
    PageLoader,
    Paginator,
    Modal,
    TextField,
    TextArea,
    CheckBox,
    Notification,
    NavBar,
  },
  data() {
    return {
      tasks: [],
      loading: false,
      totalTask: 20,
      currentPage: 0,
      take: 10,
      skip: 0,
      modalState: false,
      savingFrom: false,
      notificationMessage: "",
      form: {
        id: null,
        title: "",
        description: "",
        isEnabled: false,
      },
      formGroupError: "",
    };
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(70),
      },
      description: {
        required,
      },
      isEnabled: {
        checkValue(value) {
          return typeof value === "boolean";
        },
      },
    },
  },
  computed,
  methods,

  watch: {
    $route() {
      const skip = this.getCurrentPageSkip();
      this.fetchTaskList(skip);
    },
  },

  mounted() {
      const skip = this.getCurrentPageSkip();
      this.fetchTaskList(skip);
  },
};
