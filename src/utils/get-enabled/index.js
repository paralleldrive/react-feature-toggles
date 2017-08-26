import getIsEnabled from '../get-is-enabled';

// compose = [...fs] => x => f(x); 
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// map = f => xs => fx
const map = f => xs => xs.map(f);

// getName = x => x.name
const getName = x => x.name;

// filter = f => xs => xs
const filter = f => xs => xs.filter(f);

// filterByEnabled => (s, i, xs) => boolean
const filterByEnabled = (s, i, xs) => getIsEnabled(xs, getName(s)); 

const test = compose(map(getName), filter(filterByEnabled));

// getEnabled = [...Feature] => [...String]
const getEnabled = (features = []) => test(features); 

export default getEnabled;
