function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_APP = '/app';

export const PATH_APP = {
  root: ROOTS_APP,
  resources: path(ROOTS_APP, '/resources'),
  serialports: path(ROOTS_APP, '/serialports'),
};