import { required, maxLength } from "vuelidate/lib/validators";
import { post } from "axios";

import Modal from "@components/modal";
import TextField from "@components/textField";
import TextArea from "@components/textArea";
import CheckBox from "@components/checkbox";


const { VUE_APP_API_BASE_URL: baseUrl, VUE_APP_API_PORT: port } = process.env
const baseApiURL = `${baseUrl}:${port}`

export default {
  name: "NavBar",
  components: {
    Modal,
    TextField,
    TextArea,
    CheckBox,
  },
  props: {
    updateTaskList: Function,
  },
  data() {
    return {
      modalState: false,
      creatingTask: false,
      formError: "",
      form: {
        title: "",
        description: "",
        isEnabled: false,
      },
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
          return typeof value === 'boolean'
        }
      }
    },
  },
  methods: {
    toggleModal() {
      this.modalState = !this.modalState;
    },
    async createNewTask(e) {
      this.creatingTask = true;
      this.formError = "";

      this.$v.$touch();
      const errorMessage = "Form has invalid fields please check and try again";
      if (this.$v.$error) {
        this.creatingTask = false;
        return (this.formError = errorMessage);
      }

      try {
        await post(`${baseApiURL}/task`, this.form);
        await this.updateTaskList();
        this.modalState = false;
        this.$v.$reset();
        e.target.reset();
      } catch (error) {
        console.log(error);
        this.formError = "Error creating a task please try again";
      } finally {
        this.creatingTask = false;
      }
    },
  },
};
