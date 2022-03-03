export default function classNamesFromArray(classNames) {
  if (Array.isArray(classNames)) {
    return classNames.filter((entry) => entry && typeof entry === 'string').join(' ');
  }

  return classNames;
}
