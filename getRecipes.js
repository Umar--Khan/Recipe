// const getFromApi = () => {
//   return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
//     .then(resp => resp.json())
//     .then(data =>
//       fetch("http://localhost:3000/api/recipes/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(convertOutput(data))
//       }).then(resp => resp.json())
//     );
// };

for (let i = 0; i < 10; i++) {
  getFromApi();
}

//! Not sure if the the above will work
const getFromApi = () => {
  return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(resp => resp.json())
    .then(data =>
      fetch("http://localhost:3000/api/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.13.0",
          Accept: "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token": "34fce84a-24cd-4d88-9831-7419ec29d89a",
          Host: "www.themealdb.com",
          cookie: "__cfduid=da418e97965fa0c1f592e17b516e0b44c1558626641",
          "accept-encoding": "gzip, deflate",
          Connection: "keep-alive"
        },
        body: JSON.stringify(convertOutput(data))
      }).then(resp => resp.json())
    );
};

const convertOutput = ({ meals }) => {
  const data = meals[0];
  let hash = {
    recipe: {
      idMeal: parseInt(data.idMeal),
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strArea: data.strArea,
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealThumb,
      strTags: data.strTags,
      strYoutube: data.strYoutube,
      strIngredient1: data.strIngredient1,
      strIngredient2: data.strIngredient2,
      strIngredient3: data.strIngredient3,
      strIngredient4: data.strIngredient4,
      strIngredient5: data.strIngredient5,
      strIngredient6: data.strIngredient6,
      strIngredient7: data.strIngredient7,
      strIngredient8: data.strIngredient8,
      strIngredient9: data.strIngredient9,
      strIngredient10: data.strIngredient10,
      strIngredient11: data.strIngredient11,
      strIngredient12: data.strIngredient12,
      strIngredient13: data.strIngredient13,
      strIngredient14: data.strIngredient14,
      strIngredient15: data.strIngredient15,
      strIngredient16: data.strIngredient16,
      strIngredient17: data.strIngredient17,
      strIngredient18: data.strIngredient18,
      strIngredient19: data.strIngredient19,
      strIngredient20: data.strIngredient20,
      strMeasure1: data.strMeasure1,
      strMeasure2: data.strMeasure2,
      strMeasure3: data.strMeasure3,
      strMeasure4: data.strMeasure4,
      strMeasure5: data.strMeasure5,
      strMeasure6: data.strMeasure6,
      strMeasure7: data.strMeasure7,
      strMeasure8: data.strMeasure8,
      strMeasure9: data.strMeasure9,
      strMeasure10: data.strMeasure10,
      strMeasure11: data.strMeasure11,
      strMeasure12: data.strMeasure12,
      strMeasure13: data.strMeasure13,
      strMeasure14: data.strMeasure14,
      strMeasure15: data.strMeasure15,
      strMeasure16: data.strMeasure16,
      strMeasure17: data.strMeasure17,
      strMeasure18: data.strMeasure18,
      strMeasure19: data.strMeasure19,
      strMeasure20: data.strMeasure20,
      strSource: data.strSource
    }
  };
  return hash;
};
