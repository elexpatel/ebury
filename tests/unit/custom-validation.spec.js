import { multipleEmails } from "../../src/utilities/custom-validation"

describe('custom-validation.js', () => { 
  test('should return false if invalid first email', () => {
    expect(multipleEmails('mock')).toBeFalsy();
  });

  test('should return true if valid first email', () => {
    expect(multipleEmails('mock@email.com')).toBeTruthy();
  }); 
  
  test('should return false if invalid second email', () => {
    expect(multipleEmails('mock@email.com, mock')).toBeFalsy();
  });
  
  test('should return true if valid second email', () => {
    expect(multipleEmails('mock@email.com, mock1@email.com')).toBeTruthy();
  });   
});