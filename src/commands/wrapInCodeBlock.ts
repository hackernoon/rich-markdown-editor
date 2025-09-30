import { NodeType } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";

export default function wrapInCodeBlock(type: NodeType, attrs = {}) {
  return (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { from, to } = state.selection;
    if (!dispatch) return true;

    const selectedText = state.doc.textBetween(from, to, "\n");
    if (!selectedText || selectedText.trim() === "") return false;

    const tr = state.tr;
    const textNode = state.schema.text(selectedText); // keeps \n inside
    const codeNode = type.create(attrs, textNode);

    tr.replaceRangeWith(from, to, codeNode); // replaces in one step
    dispatch(tr.scrollIntoView());
    return true;
  };
}
