const people = [
    {
        id: "damon",
        name: "Damon Hammond",
        link: "people/DamonHammond/",
        parents: ["deanna", "kevin"]
    },
    {
        id: "dalton",
        name: "Dalton Hammond",
        link: "people/DaltonHammond/",
        parents: ["deanna", "kevin"]
    },
    {
        id: "kaden",
        name: "Kaden Hammond",
        link: "people/KadenHammond/",
        parents: ["deanna", "robbie"]
    },
    {
      id: "deanna",
      name: "Deanna Pohlman/Hammond",
      link: "people/DeannaHammond/",
      parents: ["eileen", "curtis" ]
    },
    {
      id: "kevin",
      name: "Kevin Johnson",
      link: "people/KevinJohnson/",
      parents: ["bobby", "susan"]
    },
    {
      id: "robbie",
      name: "Robbie LastName",
      link: "people/RobbieLastName/",
      parents: []
    },
    {
        id: "eileen",
        name: "Eileen Hammond/Chambers",
        link: "people/EileenHammond.Chambers/",
        parents: []
    },
    {
        id: "curtis",
        name: "Curtis (Jim) Hammond Sr.",
        link: "people/CurtisHammondSr/",
        parents: []
    },
    {
        id: "susan",
        name: "Susan Johnson",
        link: "people/SusanJohnson/",
        parents: []
    },
    {
        id: "bobby",
        name: "Bobby Johnson",
        link: "people/BobbyJohnson/",
        parents: []
    },
];

const peopleById = Object.fromEntries(
  people.map(p => [p.id, p])
);

people.forEach(person => {
  person.children = people
    .filter(p => p.parents.includes(person.id))
    .map(p => p.id);
});

people.forEach(person => {
  person.siblings = people
    .filter(p =>
      p.id !== person.id &&
      p.parents.some(parentId => person.parents.includes(parentId))
    )
    .map(p => p.id);
});

//console.log("deanna children:", peopleById.deanna.children);


function renderNode(personId) {
  const person = peopleById[personId];
  const li = document.createElement("li");

  const link = document.createElement("a");
  link.className = "person-box";
  link.href = person.link;
  link.textContent = person.name;
  li.appendChild(link);

  if (person.children && person.children.length > 0) {
    const ul = document.createElement("ul");
    person.children.forEach(childId => {
      ul.appendChild(renderNode(childId));
    });
    li.appendChild(ul);
  }

  return li;
}

window.addEventListener("DOMContentLoaded", () => {
  const rootUl = document.getElementById("tree-root");

  // find all people with no parents = top of their branch
  const roots = people.filter(
    p => !p.parents || p.parents.length === 0
  );

  // render a subtree for each root person
  roots.forEach(root => {
    rootUl.appendChild(renderNode(root.id));
  });
});

