import { ShortNumPipe } from './short-num.pipe';

describe('ShortNumPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortNumPipe();
    expect(pipe).toBeTruthy();
  });
});
