export default function(
  title = "test title", 
  body = "Information"
) {
  return `
    <div>${title}</div>
    <div>${body}</div>
  `;
}