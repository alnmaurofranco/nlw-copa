import { randomUUID as uuid } from "node:crypto";

export type PollProps = {
  title: string;
  code: string;
  ownerId: string;
  createdAt?: Date;
};

export default class Poll {
  readonly #id: string;
  #props: PollProps;

  get id() {
    return this.#id;
  }

  get title() {
    return this.#props.title;
  }

  get code() {
    return this.#props.code;
  }

  private constructor(props: PollProps, id?: string) {
    this.#id = id ?? uuid();
    this.#props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  static create(props: PollProps, id?: string) {
    return new Poll(props, id);
  }
}
