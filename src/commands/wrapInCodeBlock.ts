import { NodeType } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";

// Custom command to wrap selected paragraphs in a single code block
export default function wrapInCodeBlock(type: NodeType, attrs = {}) {
  return (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const { from, to } = state.selection;
    // If no selection or dispatch is not provided, just check if the command is applicable
    if (!dispatch) {
      return true;
    }

    // Create a transaction
    const tr = state.tr;
    // Get the selected text including newlines
    const selectedText = state.doc.textBetween(from, to, "\n");
    // Only proceed if we have content
    if (!selectedText || selectedText.trim() === "") {
      return false;
    }
    // Delete the selected content
    tr.deleteRange(from, to);
    // Create a text node with the selected content
    const textNode = state.schema.text(selectedText);
    // Create the code block node
    const codeNode = type.create(attrs, textNode);
    // Insert the code block
    tr.insert(from, codeNode);
    // Dispatch the transaction
    dispatch(tr);
    return true;
  };
}
