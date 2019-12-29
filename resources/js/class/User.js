import { isEqual } from "lodash";

export default class User {
  constructor(props) {
    this.initialData = {
      name: props.name,
      email: props.email,
      phone: props.phone,
      division: props.division,
      working_area: props.name
    };
    this.data = Object.assign({}, { ...this.initialData });
  }

  get = () => this.data;

  set = data => {
    this.data = Object.assign({}, { ...this.data, ...data });
    return this.data;
  };

  isChanged = () => !isEqual(this.initialData, this.data);
}
