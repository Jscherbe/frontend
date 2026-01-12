export default function spokeSpinner(...modifiers) {
  const classes = modifiers.map(m => `spoke-spinner--${ m }`).join(' ');
  return `
<div class="spoke-spinner ${ classes }">
  <div class="spoke-spinner__spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
`;
};