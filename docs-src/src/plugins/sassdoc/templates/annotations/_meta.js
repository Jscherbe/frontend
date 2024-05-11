import { titledList } from "@ulu/markdown-output-utils";

export default ({ item }) => {
  const { context, file, author, commentRange, aliased } = item.data;
  const { line, type } = context;
  if (type !== "content") {
    const list = titledList({
      "File" :                  file.path,
      "Group" :                 item.groupName,
      "Type" :                  type,
      "Aliased" :               aliased ? aliased.join(", ") : null,
      "Lines (comments)" :      commentRange ? `${ commentRange.start }-${ commentRange.end }` : null,
      "Lines (code)" :          line ? `${ line.start }-${ line.end }` : null,
      "Author" :                author
    });
    return `
    <details>
      <summary>File Information</summary>
${ list }
    </details>
    `;
  }
};