import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext';

const getStyleName = btn => {
  const className = {
    '=': 'equals',
    'x': 'opt',
    '-': 'opt',
    '+': 'opt',
    '/': 'opt'
  };
  return className[btn];
};

const Button = (props) => {
  const {calc,setCalc} = useContext(CalcContext);
  //user clicked point
  const pointClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + props.value : calc.num,
    });
  };

  //user clicked 'C'
  const restClick = () => {
    setCalc({
      sign: '',
      num: 0,
      res: 0
    });
  };

  //user clicked numbers
  const numbersClick = () => {
    const numberString = props.value.toString();
    let numberValue;
    if(numberString === '0' && calc.num === 0){
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    } 

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  //user clicked signs
  const signClick = () => {
    setCalc({
      sign: props.value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    });
    console.log(calc);
  }

  //user clicked =
  const eqaulsClick = () => {
    if(calc.res && calc.num){
      const Math = (a,b,sign) =>{
        const result = {
          '+': (a,b) => a + b,
          '-': (a,b) => a - b,
          '/': (a,b) => a / b,
          'x': (a,b) => a * b,
        };
        return result[sign](a,b);
      }
  
      setCalc({
        res: Math(calc.res, calc.num, calc.sign),
        sign: ''  ,
        num: 0
      });
    }
  }

  //user clicked %
  const percentClick = () => {
    setCalc({
      num: (calc.num / 100),
      res: (calc.res /100),
      sign: ''
    });
  }

  //user clicked +-
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: ''
    });
  }

  const handleBtnClick = () => {
    const results = {
      '.': pointClick,
      'C': restClick,
      '+-': invertClick,
      '/': signClick,
      'x': signClick,
      '-': signClick,
      '+': signClick,
      '=': eqaulsClick,
      '%': percentClick
    }

    if(results[props.value]){
      return results[props.value]();
    } else {
      return numbersClick();
    }
  }

  return (
   <button onClick={handleBtnClick} className={`${getStyleName(props.value)} button`}>{props.value}</button>
  )
}

export default Button