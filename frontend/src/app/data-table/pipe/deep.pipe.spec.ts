import { DeepPipe } from './deep.pipe';

describe('DeepPipe', () => {
  it('create an instance', () => {
    const pipe = new DeepPipe();
    expect(pipe).toBeTruthy();
  });
});
