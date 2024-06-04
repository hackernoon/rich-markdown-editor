/* eslint-disable */
import { Plugin } from "prosemirror-state";
import Extension from "../lib/Extension";

export default class Gpt extends Extension {
  get name() {
    return "gpt";
  }

  commands({ type }) {
    return () => {
      debugger;
      return () => {
        console.log("yo")
      }
    }
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          callGpt: (view, event) => {
            alert("u did it!");
          },
        },
      }),
    ];
  }
}
