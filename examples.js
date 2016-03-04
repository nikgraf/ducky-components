export default function (Component, examples) {
  if (process.env.NODE_ENV === 'components') {
    Component.examples = examples || [];
  }
}
