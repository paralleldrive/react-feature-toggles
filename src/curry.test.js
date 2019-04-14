import { describe } from 'riteway';
import curry from './curry';

const addTwo = (a, b) => a + b;
const addThree = (a, b, c) => a + b + c;

describe('curry()', async assert => {
  {
    const given = 'a function with 2 arguments';
    const curriedAddTwo = curry(addTwo);

    assert({
      given,
      should: 'return a new function',
      actual: typeof curriedAddTwo,
      expected: 'function'
    });

    assert({
      given,
      should: 'return a function that can be used in curried format',
      actual: curriedAddTwo(3)(5),
      expected: 8
    });

    assert({
      given,
      should: 'return a function that can be used in uncurried format',
      actual: curriedAddTwo(3, 5),
      expected: 8
    });
  }

  {
    const given = 'a function with 3 arguments';
    const curriedAddThree = curry(addThree);

    assert({
      given,
      should: 'return a new function',
      actual: typeof curriedAddThree,
      expected: 'function'
    });

    assert({
      given,
      should: 'return a function that can be used in curried format',
      actual: curriedAddThree(3)(5)(2),
      expected: 10
    });

    assert({
      given,
      should: 'return a function that can be used in uncurried format',
      actual: curriedAddThree(3, 5, 2),
      expected: 10
    });
  }
});
