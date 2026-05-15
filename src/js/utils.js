import { PER_PAGE } from './constants';

const calculateMaxPage = total => {
  return Math.ceil(total / PER_PAGE);
};

export { calculateMaxPage };
