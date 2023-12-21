const COHORT = "2309-AM";
const API = "https://fsa-puppy-bowl.herokuapp.com/api/" + COHORT;

const state = {
puppies: [],
selectedPuppy: null,
};

const getPuppies = async () => {
try{
    const response = await fetch(API + "/players");
    const json = await response.json();
    state.puppies = json.data.players;
}
    catch (error) {
    console.error(error);
}
};

const renderPuppies = async () => {
  await getPuppies();
  const $puppies = document.querySelector("ul.puppies");
   const $puppyListItems = state.puppies.map((puppy) => {

   const li = document.createElement("li");
   li.innerHTML = `
    <h2>${puppy.name}</h2>
    <img src="${puppy.imageUrl}">
     <p>${puppy.breed}</p>`

    li.addEventListener("click", () => {
      state.selectedPuppy = puppy;
      render();
      window.location.hash = puppy.id;
    });
   

  return li;

   });
   $puppies.replaceChildren(...$puppyListItems);
};
const renderPuppy = () => {
  const $puppies = document.querySelector("ul.puppies");
  $puppies.innerHTML = `
  <li>
  <button>Go back to dog list</button>
  <h2>${state.selectedPuppy.name}</h2>
    <img src="${state.selectedPuppy.imageUrl}">
     <p>${state.selectedPuppy.breed}</p>
  </li>
  `;
  $puppies.querySelector("button").addEventListener ("click", () => {
  state.selectedPuppy = null;
render();
window.location.hash = " ";
  });
};
const render = () => {
  if (!state.selectedPuppy){
  renderPuppies();
  } else {
    renderPuppy();
  }
};
const loadPuppyFromHash = async () => {
    if (state.puppies.length === 0){
      await getPuppies ();
    }
    const idFromHash = +window.location.hash.slice(1);
    state.selectedPuppy = state.puppies.find(
      (puppy) => puppy.id === idFromHash
      );

      render();

    };
  
  window.addEventListener("hashchange", loadPuppyFromHash) ;
  


const init = async () => {
  loadPuppyFromHash();
};

init();
