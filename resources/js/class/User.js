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
    // console.log(this.initialData);
    // console.log(this.data);
    // console.log(!isEqual(this.initialData, this.data));
    return { changed: !isEqual(this.initialData, this.data), data: this.data };
  };
}
