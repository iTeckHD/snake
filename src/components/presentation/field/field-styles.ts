import { makeStyles } from '@material-ui/styles';

export const getFieldStyles = (fieldSize: number) => {
  return makeStyles({
    root: {
      display: 'grid',
      margin: '0 auto',
      gridTemplateColumns: `repeat(${fieldSize}, calc(600px / ${fieldSize}))`,
      gridTemplateRows: `repeat(${fieldSize}, calc(600px / ${fieldSize}))`,
    },
  })();
};
