import { Helper } from '../../../src/application/shared/helpers';

it('the empty string is not a palindrome valid',
  () => {
    
    const toTest = '';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(false);
  }
);

it('false when min chars allowed for palindrome is less than 3 characters',
  () => {
    
    const toTest = 'hi';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(false);
  }
);

it('true when min chars allowed for palindrome is greather than 3 characters',
  () => {
    
    const toTest = 'civic';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(true);
  }
);

it('false for "abx"',
  () => {
    const toTest= 'abx';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(false);
  }
);

it('an id like 121 is a palindrome valid',
  () => {
    const toTest = '121';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(true);

  }
);

it('"adda" is a palindrome',
  () => {
    const toTest = 'adda';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(true);
  }
);

it('"dad" is a palindrome', 
  () => {
    const toTest = 'dad';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(true);
  });

it('"sad" is not a palindrome',
  () => {
    const toTest = 'sad';
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(false);
  }
);

it('"drad" is not a palindrome',
  () => {
    const toTest = 'drad';

    debugger;
    const result = Helper.isPalindrome(toTest);

    expect(result).toBe(false);
  }
);
