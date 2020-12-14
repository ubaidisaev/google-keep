const banners = [
 {
  w: 10,
  id: 1
 },
 {
  w: 130,
  id: 2
 },
 {
  w: 5,
  id: 3
 }
];

const getRandomBanner = () => {
 const sum = banners.reduce((acc, {w}) => acc + w, 0);
 const rand = Math.random() * sum;
 console.log(rand);
 let tmp = 0;

 for ({w, id} of banners) {
  tmp += w;
  if (tmp > rand) {
   return id;
  }
 }
}
console.clear();
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
console.log(getRandomBanner())
