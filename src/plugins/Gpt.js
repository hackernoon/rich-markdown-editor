/* eslint-disable */
import { Plugin } from "prosemirror-state";
import Extension from "../lib/Extension";

export default class Gpt extends Extension {
  get name() {
    return "gpt";
  }

  commands() {
    return () => {
      const _this = this;
      return (state, dispatch) => {
        const text = state.doc.cut(
          state.selection.from,
          state.selection.to
        );
        const markdown = _this.editor.serializer.serialize(text);
        _this.editor.props.onSelect({
          view: _this.editor.view,
          text: text.textContent,
          markdown 
        });

        this.options.onGpt(markdown);
      }
    }
  }

}
