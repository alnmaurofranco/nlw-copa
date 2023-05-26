import { randomUUID as uuid } from "crypto";

export type UserProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt?: Date;
};

export default class User {
  readonly #id: string;
  #props: UserProps;

  get id() {
    return this.#id;
  }

  get name() {
    return this.#props.name;
  }

  get email() {
    return this.#props.email;
  }

  get avatar() {
    return this.#props.avatarUrl;
  }

  private constructor(props: UserProps, id?: string) {
    this.#id = id ?? uuid();
    this.#props = {
      ...props,
      avatarUrl: props.avatarUrl ?? "http://avatar-url.com",
      createdAt: props.createdAt ?? new Date(),
    };
  }

  static create(props: UserProps, id?: string) {
    return new User(props, id);
  }
}
