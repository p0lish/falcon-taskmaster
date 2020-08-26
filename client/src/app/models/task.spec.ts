import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const task = new Task({
      title: 'hello',
      completed: true,
      description: 'test description'
    });
    expect(task.title).toEqual('hello');
    expect(task.completed).toEqual(true);
    expect(task.description).toEqual('test description');
  });

  it('should accept values in the constructor without description', () => {
    const task = new Task({
      title: 'hello',
      completed: true,
    });
    expect(task.title).toEqual('hello');
    expect(task.completed).toEqual(true);
  });
});
