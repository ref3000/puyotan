import Puyotan from './Puyotan'

test(('hoge'), () => {
  console.log('puyotan!!');
  const puyotan = new Puyotan.Puyotan();
  puyotan.setAction(0, new Puyotan.Action(Puyotan.ActionType.PUT, 1, 2));
  puyotan.setAction(1, new Puyotan.Action(Puyotan.ActionType.PUT, 2, 0));
  puyotan.stepNextFrame();
  puyotan.setAction(0, new Puyotan.Action());
  puyotan.setAction(0, new Puyotan.Action());
  puyotan.setAction(1, new Puyotan.Action());
  puyotan.setAction(1, new Puyotan.Action());
  puyotan.stepNextFrame();

  // const array = [];
  // array.push('hoge');
  // array.push(123);
  // array[0] = 'piyo';
  // // array[3] = 'h';
  // console.log(array);
  // console.log(array.length);
});