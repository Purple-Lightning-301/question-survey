import { atom } from "recoil";

export const userAtom = atom({
  key: 'userAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const resultAtom = atom({
  key: 'resultAtom', 
  default: [], 
});

export const teamleadAtom = atom({
  key: 'teamLead',
  default: '',
})