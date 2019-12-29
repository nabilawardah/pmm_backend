import { isEqual } from "lodash";
import validator from "validator";

export default class User {
  constructor(props) {
    this.initialData = {
      name: props.name,
      email: props.email,
      phone: props.phone,
      division: props.division,
      working_area: props.working_area
    };
    this.data = Object.assign({}, { ...this.initialData });
  }

  get = () => this.data;

  set = data => {
    this.data = Object.assign({}, { ...this.data, ...data });
    return this.data;
  };

  isChanged = () => !isEqual(this.initialData, this.data);

  isValidEmail = () => validator.isEmail(this.data.email);
}
