var container = document.getElementById("myPage")
var index = 0



var meals = [
   {
      imgSrc: "images/meal1.jpg",
      mealRate: 4.8,
      mealReviews: 445,
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      level: "Intermediate",
      country: "Mediterranean",
      title: "French Onion Soup",
      desc: "Rich beef broth with caramelized onions and melted cheese",
      longTime: true,
      ingredients: [
         "4 large onions, thinly sliced",
         "4 tablespoons butter",
         "1 liter beef broth",
         "1/2 cup white wine",
         "2 bay leaves",
         "Fresh thyme",
         "Baguette slices",
         "200g Gruyère cheese, grated"
      ],
      instruction: [
         "Melt butter in a large pot.Add onions and cook slowly for 40 minutes, stirring occasionally until caramelized.",
         "Add white wine and deglaze the pot, scraping up brown bits.", "Pour in beef broth, add bay leaves and thyme. Simmer for 20 minutes.",
         "Meanwhile, toast baguette slices until golden.",
         "Ladle soup into oven-safe bowls. Top with toasted bread and cheese.",
         "Broil for 3-5 minutes until cheese is melted and bubbly. Serve hot."
      ],
      nutrition: {
         calories: 380,
         protien: 18,
         Carbohydrates: 36,
         Fat: 18,
         Fiber: 4,
         Sodium: 980
      },
      tips: ["Patience is key - don't rush the onion caramelization", "Use good quality beef broth for best flavor", "Gruyère can be substituted with Swiss cheese", "Watch carefully when broiling to avoid burning"]
   },
   {
      imgSrc: "images/meal2.jpg",
      mealRate: 4.7,
      mealReviews: 328,
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      level: "Easy",
      country: "Italian",
      title: "Creamy Garlic Pasta",
      desc: "Creamy pasta with garlic, parmesan cheese and fresh herbs",
      longTime: false,
      ingredients: [
         "400g pasta",
         "4 cloves garlic, minced",
         "2 tablespoons butter",
         "1 cup heavy cream",
         "1 cup parmesan cheese, grated",
         "1/2 teaspoon black pepper",
         "Fresh parsley",
         "Salt to taste"
      ],
      instruction: [
         "Cook pasta in salted boiling water until al dente.",
         "Melt butter in a large pan and sauté garlic until fragrant.",
         "Add heavy cream and simmer for 3-4 minutes.",
         "Add parmesan cheese and stir until the sauce becomes creamy.",
         "Add the cooked pasta and mix well.",
         "Garnish with fresh parsley and serve hot."
      ],
      nutrition: {
         calories: 520,
         protien: 20,
         Carbohydrates: 58,
         Fat: 24,
         Fiber: 3,
         Sodium: 620
      },
      tips: [
         "Cook pasta al dente for the best texture",
         "Use freshly grated parmesan",
         "Do not overcook the garlic",
         "Add some pasta water if the sauce is too thick"
      ]
   },

   {
      imgSrc: "images/meal3.jpg",
      mealRate: 4.9,
      mealReviews: 512,
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      level: "Intermediate",
      country: "Asian",
      title: "Chicken Teriyaki",
      desc: "Juicy chicken glazed with a sweet and savory teriyaki sauce",
      longTime: false,
      ingredients: [
         "500g chicken breast",
         "1/3 cup soy sauce",
         "2 tablespoons honey",
         "1 tablespoon brown sugar",
         "2 cloves garlic, minced",
         "1 teaspoon grated ginger",
         "1 tablespoon sesame oil",
         "Sesame seeds",
         "Green onions"
      ],
      instruction: [
         "Cut chicken into bite-sized pieces.",
         "Mix soy sauce, honey, brown sugar, garlic and ginger in a bowl.",
         "Heat sesame oil in a large pan.",
         "Add chicken and cook until golden brown.",
         "Pour the teriyaki sauce over the chicken.",
         "Simmer for 5-7 minutes until the sauce thickens.",
         "Garnish with sesame seeds and green onions."
      ],
      nutrition: {
         calories: 410,
         protien: 38,
         Carbohydrates: 28,
         Fat: 14,
         Fiber: 2,
         Sodium: 1120
      },
      tips: [
         "Use chicken thighs for extra juicy meat",
         "Do not burn the teriyaki sauce",
         "Let the sauce thicken before serving",
         "Serve with steamed rice"
      ]
   },

   {
      imgSrc: "images/meal4.jpg",
      mealRate: 4.6,
      mealReviews: 276,
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      level: "Easy",
      country: "Mexican",
      title: "Chicken Tacos",
      desc: "Soft tortillas filled with seasoned chicken and fresh vegetables",
      longTime: false,
      ingredients: [
         "300g chicken breast",
         "6 small tortillas",
         "1 tomato, diced",
         "1/2 onion, chopped",
         "1/2 cup lettuce",
         "1/2 cup shredded cheese",
         "1 tablespoon olive oil",
         "1 teaspoon paprika",
         "1/2 teaspoon cumin"
      ],
      instruction: [
         "Cut the chicken into small pieces.",
         "Season chicken with paprika, cumin, salt and pepper.",
         "Heat olive oil in a pan and cook the chicken until golden.",
         "Warm the tortillas in a dry pan.",
         "Fill each tortilla with chicken, lettuce, tomato and onion.",
         "Top with shredded cheese and serve immediately."
      ],
      nutrition: {
         calories: 360,
         protien: 29,
         Carbohydrates: 34,
         Fat: 13,
         Fiber: 5,
         Sodium: 710
      },
      tips: [
         "Warm tortillas before serving",
         "Add avocado for extra creaminess",
         "Use fresh vegetables",
         "Adjust spices according to taste"
      ]
   },

   {
      imgSrc: "images/meal5.jpg",
      mealRate: 4.8,
      mealReviews: 391,
      prepTime: 15,
      cookTime: 35,
      servings: 4,
      level: "Easy",
      country: "American",
      title: "Classic Cheeseburger",
      desc: "Juicy beef burger topped with melted cheese and fresh vegetables",
      longTime: false,
      ingredients: [
         "500g ground beef",
         "4 burger buns",
         "4 slices cheddar cheese",
         "1 tomato, sliced",
         "1 onion, sliced",
         "Lettuce leaves",
         "2 tablespoons ketchup",
         "1 tablespoon mustard",
         "Salt and black pepper"
      ],
      instruction: [
         "Season the ground beef with salt and black pepper.",
         "Shape the beef into four equal burger patties.",
         "Heat a pan or grill over medium-high heat.",
         "Cook the patties for 4-5 minutes on each side.",
         "Place cheese slices on the burgers and let them melt.",
         "Toast the burger buns lightly.",
         "Assemble the burgers with lettuce, tomato, onion, ketchup and mustard."
      ],
      nutrition: {
         calories: 590,
         protien: 35,
         Carbohydrates: 42,
         Fat: 31,
         Fiber: 3,
         Sodium: 920
      },
      tips: [
         "Do not press the burger while cooking",
         "Use fresh ground beef",
         "Toast the buns for better texture",
         "Let the burger rest for a few minutes before serving"
      ]
   },

   {
      imgSrc: "images/meal6.jpg",
      mealRate: 4.5,
      mealReviews: 219,
      prepTime: 10,
      cookTime: 10,
      servings: 2,
      level: "Easy",
      country: "Mediterranean",
      title: "Greek Salad",
      desc: "Fresh Mediterranean salad with tomatoes, cucumber, olives and feta cheese",
      longTime: false,
      ingredients: [
         "2 tomatoes, chopped",
         "1 cucumber, sliced",
         "1/2 red onion, sliced",
         "1/2 cup Kalamata olives",
         "150g feta cheese",
         "2 tablespoons olive oil",
         "1 tablespoon lemon juice",
         "1 teaspoon dried oregano"
      ],
      instruction: [
         "Chop the tomatoes and cucumber.",
         "Slice the red onion into thin pieces.",
         "Combine vegetables and olives in a large bowl.",
         "Add feta cheese on top.",
         "Mix olive oil, lemon juice and oregano.",
         "Pour the dressing over the salad and toss gently.",
         "Serve immediately."
      ],
      nutrition: {
         calories: 280,
         protien: 10,
         Carbohydrates: 14,
         Fat: 21,
         Fiber: 5,
         Sodium: 680
      },
      tips: [
         "Use ripe tomatoes for better flavor",
         "Choose good quality feta cheese",
         "Do not add too much salt because feta is salty",
         "Serve chilled for a refreshing taste"
      ]
   },
   {
      imgSrc: "images/meal7.jpg",
      mealRate: 4.7,
      mealReviews: 354,
      prepTime: 20,
      cookTime: 30,
      servings: 4,
      level: "Intermediate",
      country: "Indian",
      title: "Chicken Tikka Masala",
      desc: "Tender chicken cooked in a rich and creamy spiced tomato sauce",
      longTime: true,
      ingredients: [
         "500g chicken breast",
         "1 cup yogurt",
         "2 tomatoes, chopped",
         "1 onion, chopped",
         "3 cloves garlic",
         "1 tablespoon ginger",
         "1 cup heavy cream",
         "2 tablespoons garam masala",
         "1 teaspoon paprika"
      ],
      instruction: [
         "Marinate chicken with yogurt and spices.",
         "Cook chicken until lightly charred.",
         "Sauté onion, garlic and ginger.",
         "Add tomatoes and spices.",
         "Add cream and simmer the sauce.",
         "Add chicken and cook for 10 minutes.",
         "Serve hot with rice or naan."
      ],
      nutrition: {
         calories: 460,
         protien: 35,
         Carbohydrates: 18,
         Fat: 27,
         Fiber: 3,
         Sodium: 760
      },
      tips: [
         "Marinate chicken for at least 2 hours",
         "Use fresh spices",
         "Don't boil the cream",
         "Serve with basmati rice"
      ]
   },
   {
      imgSrc: "images/meal8.jpg",
      mealRate: 4.8,
      mealReviews: 428,
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      level: "Easy",
      country: "Japanese",
      title: "Beef Ramen",
      desc: "Warm Japanese ramen with tender beef, noodles and flavorful broth",
      longTime: true,
      ingredients: [
         "400g beef",
         "200g ramen noodles",
         "1 liter beef broth",
         "2 tablespoons soy sauce",
         "1 tablespoon sesame oil",
         "2 boiled eggs",
         "Green onions",
         "Mushrooms",
         "Fresh ginger"
      ],
      instruction: [
         "Cook ramen noodles according to package instructions.",
         "Heat sesame oil and cook the beef.",
         "Add beef broth, soy sauce and ginger.",
         "Simmer the broth for 10 minutes.",
         "Add mushrooms and cook until tender.",
         "Add noodles to serving bowls.",
         "Pour hot broth over the noodles.",
         "Top with beef, boiled eggs and green onions."
      ],
      nutrition: {
         calories: 490,
         protien: 32,
         Carbohydrates: 48,
         Fat: 20,
         Fiber: 4,
         Sodium: 1180
      },
      tips: [
         "Use high quality beef broth",
         "Don't overcook the noodles",
         "Add chili oil for extra heat",
         "Serve immediately"
      ]
   },
   {
      imgSrc: "images/meal9.jpg",
      mealRate: 4.6,
      mealReviews: 287,
      prepTime: 15,
      cookTime: 20,
      servings: 3,
      level: "Easy",
      country: "Italian",
      title: "Margherita Pizza",
      desc: "Classic Italian pizza topped with tomato sauce, mozzarella and basil",
      longTime: false,
      ingredients: [
         "1 pizza dough",
         "1/2 cup tomato sauce",
         "200g mozzarella cheese",
         "Fresh basil leaves",
         "2 tablespoons olive oil",
         "1 teaspoon oregano",
         "Salt to taste"
      ],
      instruction: [
         "Preheat oven to 220°C.",
         "Roll the pizza dough into a round shape.",
         "Spread tomato sauce over the dough.",
         "Add mozzarella cheese.",
         "Sprinkle oregano and drizzle olive oil.",
         "Bake for 12-15 minutes until golden.",
         "Add fresh basil before serving."
      ],
      nutrition: {
         calories: 440,
         protien: 21,
         Carbohydrates: 52,
         Fat: 17,
         Fiber: 3,
         Sodium: 850
      },
      tips: [
         "Use fresh mozzarella",
         "Don't add too much sauce",
         "Preheat the oven properly",
         "Add basil after baking"
      ]
   },
   {
      imgSrc: "images/meal10.jpg",
      mealRate: 4.9,
      mealReviews: 563,
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      level: "Easy",
      country: "American",
      title: "Pancakes",
      desc: "Fluffy golden pancakes served with fresh berries and maple syrup",
      longTime: false,
      ingredients: [
         "2 cups flour",
         "2 tablespoons sugar",
         "2 teaspoons baking powder",
         "1 1/2 cups milk",
         "2 eggs",
         "3 tablespoons melted butter",
         "1 teaspoon vanilla extract",
         "Fresh berries",
         "Maple syrup"
      ],
      instruction: [
         "Mix flour, sugar and baking powder.",
         "In another bowl, whisk milk, eggs, butter and vanilla.",
         "Combine the wet and dry ingredients.",
         "Heat a non-stick pan over medium heat.",
         "Pour batter into the pan.",
         "Cook until bubbles appear, then flip.",
         "Cook the other side until golden.",
         "Serve with berries and maple syrup."
      ],
      nutrition: {
         calories: 390,
         protien: 12,
         Carbohydrates: 58,
         Fat: 13,
         Fiber: 2,
         Sodium: 540
      },
      tips: [
         "Don't overmix the batter",
         "Use medium heat",
         "Flip only once",
         "Serve immediately while warm"
      ]
   }
];



handelDisplayMeal()
function handelDisplayMeal() {
   var Ingredients = ``
   var Instructions = ``
   var tips = ``

   for (i = 0; i < meals[index].ingredients.length; i++) {
      Ingredients += `
   <div class="grad my-2 d-flex align-items-center gap-3">
        <span class="main-color-bg py-2 px-3 rounded-circle text-white">${i + 1}</span>
        <p class="m-0">${meals[index].ingredients[i]}</p>
      </div>`
   }

   for (i = 0; i < meals[index].instruction.length; i++) {
      Instructions += `
   <div class="instruction mb-4 d-flex align-items-center gap-3">
        <span class="main-color-bg py-2 px-3 rounded-4 text-white">${i + 1}</span>
        <p class="m-0">
         ${meals[index].instruction[i]}
        </p>
      </div>`
   }
   for (i = 0; i < meals[index].tips.length; i++) {
      tips += `
  <div class="tip bg-color rounded-3 p-3 mb-3">
        <i
          class="fa-solid fa-check fa-canvas-roomy rounded-circle main-color-bg text-white me-2"
        ></i>
        <span>${meals[index].tips[i]}</span>
      </div>`
   }
   container.innerHTML = `
 <div class="container">
        <div class="card mb-3 m-auto rounded-4 shadow">
          <div class="row g-0 row-card justify-content-start">
            <div class="col-lg-5 position-relative">
              <img
                src="${meals[index].imgSrc}"
                class="img-fluid w-100 object-fit-cover"
                id="mealImg"
                alt="..."
              />
              <div
                class="rate bg-white p-2 rounded-pill d-flex align-items-center gap-2 position-absolute shadow"
              >
                <i
                  class="fa-solid fa-star"
                  style="color: rgb(255, 212, 59)"
                ></i>
                <p class="m-0" id="mealRate">
                  ${meals[index].mealRate} <span>(${meals[index].mealReviews} reviews)</span>
                </p>
              </div>
              <div
                class="info d-flex justify-content-around align-items-center p-3 rounded-4 bg-white text-center position-absolute"
              >
                <div class="time">
                  <i class="fa-solid fa-clock main-color d-block m-auto"></i>
                  <span>Prep Time</span>
                  <p class="m-0">${meals[index].prepTime} min</p>
                </div>
                <div class="cook-time">
                  <i
                    class="fa-solid fa-fire-burner text-danger d-block m-auto"
                  ></i>
                  <span>Cook Time</span>
                  <p class="m-0">${meals[index].cookTime} min</p>
                </div>
                <div class="servings">
                  <i class="fa-solid fa-users text-primary d-block m-auto"></i>
                  <span>Servings</span>
                  <p class="m-0">${meals[index].servings} pepole</p>
                </div>
              </div>
            </div>
            <div class="col-lg-7 px-4">
              <div class="card-body overflow-auto">
                <div
                  class="title d-flex justify-content-between align-items-center flex-wrap-reverse"
                >
                  <div class="head order-md-0">
                    <div class="pills d-flex gap-3">
                      <p
                        class="rounded-pill p-1 m-0 bg-success-subtle text-success text-center"
                      >
                        ${meals[index].level}
                      </p>
                      <p
                        class="rounded-pill p-1 m-0 bg-primary-subtle text-primary text-center"
                      >
                        ${meals[index].country}
                      </p>
                    </div>
                    <h2>${meals[index].title}</h2>
                    <span
                      >
                      ${meals[index].desc}
                    </span>
                  </div>
                  <div class="icons order-md-1 ms-auto">
                    <i
                      class="fa-solid fa-bookmark main-color fa-canvas-roomy rounded-4 p-3 me-2"
                    ></i>
                    <i
                      class="fa-solid fa-share-nodes main-color fa-canvas-roomy rounded-4 p-3"
                    ></i>
                  </div>
                </div>
                <div
                  id="warning"
                  class="warnning bg-danger-subtle text-danger rounded-3 border-start border-danger border-5 p-3 d-flex gap-2 align-items-center my-4 d-none"
                >
                  <div class="icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div class="content">
                    <p class="m-0">Extended Preparation Time</p>
                    <span>
                      This recipe requires more than 45 minutes to prepare. Plan
                      accordingly!
                    </span>
                  </div>
                </div>
                <ul
                  class="nav nav-tabs justify-content-center w-100 m-auto my-4 py-3"
                >
                  <li class="nav-item">
                    <button
                      class="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#Ingredients"
                      type="button"
                    >
                      <i class="fa-solid fa-list-check"></i>
                      Ingredients
                    </button>
                  </li>

                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#Instructions"
                      type="button"
                    >
                      <i class="fa-solid fa-book-open"></i>
                      Instructions
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#Nutrition"
                      type="button"
                    >
                      <i class="fa-solid fa-chart-pie"></i>
                      Nutrition
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#Chefs-Tips"
                      type="button"
                    >
                      <i class="fa-solid fa-lightbulb"></i>
                      Chef's Tips
                    </button>
                  </li>
                </ul>
                <div class="tab-content">
                  <div
                    class="tab-pane show active p-3 bg-color rounded-3"
                    id="Ingredients"
                  >
                   ${Ingredients}
                  </div>
                  <div class="tab-pane" id="Instructions">
                   ${Instructions}
                  </div>
                  <div class="tab-pane overflow-hidden" id="Nutrition">
                    <div class="row g-4">
                      <div class="col-12 col-md-6">
                        <div
                          class="calories d-flex justify-content-between align-items-center bg-body-tertiary p-3 rounded-2"
                        >
                          <div class="icon">
                            <i
                              class="fa-solid fa-fire bg-color text-danger p-2 fa-canvas-roomy rounded-2 me-2"
                            ></i>

                            Calories
                          </div>
                          <div class="data">${meals[index].nutrition.calories} kcal</div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="Protein d-flex justify-content-between align-items-center bg-body-tertiary p-3 rounded-2"
                        >
                          <div class="icon">
                            <i
                              class="fa-solid fa-dumbbell bg-primary-subtle text-primary p-2 fa-canvas-roomy rounded-2 me-2"
                            ></i>
                            Protein
                          </div>
                          <div class="data">${meals[index].nutrition.protien} g</div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="Protein d-flex justify-content-between align-items-center bg-body-tertiary p-3 rounded-2"
                        >
                          <div class="icon">
                            <i
                              class="fa-solid fa-wheat-awn bg-warning-subtle text-warning p-2 fa-canvas-roomy rounded-2 me-2"
                            ></i>
                            Carbohydrates
                          </div>
                          <div class="data">${meals[index].nutrition.Carbohydrates} g</div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="Protein d-flex justify-content-between align-items-center bg-body-tertiary p-3 rounded-2"
                        >
                          <div class="icon">
                            <i
                              class="fa-solid fa-droplet bg-danger-subtle text-danger p-2 fa-canvas-roomy rounded-2 me-2"
                            ></i>
                            Fat
                          </div>
                          <div class="data">${meals[index].nutrition.Fat} g</div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="Protein d-flex justify-content-between align-items-center bg-body-tertiary p-3 rounded-2"
                        >
                          <div class="icon">
                            <i
                              class="fa-solid fa-seedling bg-success-subtle text-success p-2 fa-canvas-roomy rounded-2 me-2"
                            ></i>
                            Fiber
                          </div>
                          <div class="data">${meals[index].nutrition.Fiber} g</div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="Protein d-flex justify-content-between align-items-center bg-body-tertiary p-3 rounded-2"
                        >
                          <div class="icon">
                            <i
                              class="fa-solid fa-cube bg-danger-subtle text-danger p-2 fa-canvas-roomy rounded-2 me-2"
                            ></i>
                            Sodium
                          </div>
                          <div class="data">${meals[index].nutrition.Sodium} mg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="Chefs-Tips">
                   ${tips}
                  </div>
                </div>
                <hr />
                <button class="btn try shadow my-3 p-2 rounded-3" onclick="handelRandomMeal()">
                  <i class="fa-solid fa-arrows-rotate"></i> Try Another Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`
}


function handelRandomMeal() {
   index = Math.floor(Math.random() * 10)
   handelDisplayMeal()
}


var warning = document.getElementById("warning")

if (meals[index].longTime == true) {
   warning.classList.remove("d-none")
}


