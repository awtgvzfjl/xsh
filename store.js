const KEY="little-phone-data";
const defaults={journal:"",notes:""};
export function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return {...defaults}}}
export function save(patch){const next={...load(),...patch};localStorage.setItem(KEY,JSON.stringify(next));return next}