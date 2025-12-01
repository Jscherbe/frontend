let i = 0;
function n() {
  return `ulu-uid-${++i}`;
}
function d(u) {
  u.id || (u.id = n());
}
export {
  d as ensureId,
  n as newId
};
