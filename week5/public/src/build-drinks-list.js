/**
 * html structure
 *
 * @example
 * <ul class="drinks-list">
 *  <li class="drink-item">
 *    <div class="drink-item-block">
 *      <span class="drink-checkbox"><input type="checkbox"></span>
 *      <span class="drink-name">Drink name</span>
 *      <span class="drink-price">price</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
(async () => {
  const drinks = await getDrinks();
  console.log(drinks);

  if (drinks.length) {
    const div = document.getElementById("drinks");
    const loadingDiv = div.childNodes[1];

    const ul = document.createElement("ul");

    // replace 'loading...' with list
    div.replaceChild(ul, loadingDiv); // <- order is important here!

    // create the list
    tasks.map((task) => {
      // building blocks
      const li = document.createElement("li");
      li.className = "drink-item";
      const block = document.createElement("div");
      block.className = "drink-item-block";

      //   content
      const checkboxSpan = document.createElement("span");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkboxSpan.className = "drink-checkbox";
      checkboxSpan.appendChild(checkbox);

      const nameSpan = document.createElement("span");
      nameSpan.className = "drink-name";
      nameSpan.innerText = drink.name;

      const priceSpan = document.createElement("span");
      priceSpan.className = "drink-price";
      priceSpan.innerText = drink.price;

      // add list item
      block.appendChild(checkboxSpan);
      block.appendChild(nameSpan);
      block.appendChild(statusSpan);

      li.appendChild(block);
      ul.appendChild(li);
    });
  }
})();
