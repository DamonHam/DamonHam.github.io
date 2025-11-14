const people = [
    {
        id: "damon",
        name: "Damon Hammond",
        link: "people/DamonHammond/",
        parents: ["deanna", "kevin"]
    },
    {
        id: "amelia",
        name: "Amelia Hammond (Vela)",
        link: "people/AmeliaHammond/",
        parents: []
    },
    {
        id: "camila",
        name: "Camila Hammond",
        link: "people/CamilaHammond/",
        parents: ["damon", "amelia"]
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
      name: "Deanna Pohlman(Hammond)",
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
        name: "Eileen Hammond(Chambers)",
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
    {   
        id: "jr",
        name: "Curtis Hammond Jr. (Junior)",
        link: "people/Jr/",
        parents: ["eileen", "curtis" ]
    },
    {   
        id: "diane",
        name: "Diane Hammond (MaidenName)",
        link: "people/DianeHammond/",
        parents: []
    },
    {   
        id: "seth",
        name: "Seth Hammond",
        link: "people/SethHammond/",
        parents: ["jr", "diane"]
    },
    {   
        id: "taylor",
        name: "Taylor Hammond",
        link: "people/TaylorHammond/",
        parents: ["jr", "diane"]
    },
];

// Lookup by id
const peopleById = Object.fromEntries(
  people.map(p => [p.id, p])
);

// Compute children for convenience (still useful for debugging or pages)
people.forEach(person => {
  person.children = people
    .filter(p => p.parents.includes(person.id))
    .map(p => p.id);
});

// Compute siblings (optional, for later use on person pages)
people.forEach(person => {
  person.siblings = people
    .filter(p =>
      p.id !== person.id &&
      p.parents.some(parentId => person.parents.includes(parentId))
    )
    .map(p => p.id);
});

// ---------- FAMILY UNIT BUILDING (Option 2) ----------

// Turn each child with 2 parents into a "parent pair" family unit
function parentPairKey(child) {
  if (!child.parents || child.parents.length < 2) return null;
  const pair = [...child.parents].sort();    // ensure "deanna|kevin" == "kevin|deanna"
  return pair.join("|");
}

const familyUnitsByKey = {};

people.forEach(child => {
  const key = parentPairKey(child);
  if (!key) return; // skip if child has fewer than 2 parents

  if (!familyUnitsByKey[key]) {
    familyUnitsByKey[key] = {
      key,
      parents: [...child.parents], // two ids
      children: []
    };
  }

  familyUnitsByKey[key].children.push(child.id);
});

const familyUnits = Object.values(familyUnitsByKey);

// Map: which family units a person is a parent in
const familiesByParentId = {};
familyUnits.forEach(unit => {
  unit.parents.forEach(pid => {
    if (!familiesByParentId[pid]) familiesByParentId[pid] = [];
    familiesByParentId[pid].push(unit);
  });
});

// Which person ids appear as children in some family
const allChildrenIds = new Set();
familyUnits.forEach(unit => {
  unit.children.forEach(c => allChildrenIds.add(c));
});

// Root families = families whose parents are not themselves children in any family
const rootFamilies = familyUnits.filter(unit =>
  unit.parents.every(pid => !allChildrenIds.has(pid))
);

// ---------- RENDERING ----------

function renderFamily(unit, visited = new Set()) {
  // avoid infinite loops if data ever forms a cycle
  if (visited.has(unit.key)) return null;
  visited.add(unit.key);

  const li = document.createElement("li");

  // Parent pair row
  const parentDiv = document.createElement("div");
  parentDiv.className = "parent-pair";

  unit.parents.forEach(parentId => {
    const person = peopleById[parentId];
    if (!person) return;

    const link = document.createElement("a");
    link.className = "person-box";
    link.href = person.link;
    link.textContent = person.name;
    parentDiv.appendChild(link);
  });

  li.appendChild(parentDiv);

  // Children row
  if (unit.children && unit.children.length > 0) {
    const ul = document.createElement("ul");

    unit.children.forEach(childId => {
      const child = peopleById[childId];
      if (!child) return;

      const childFamilies = familiesByParentId[childId];

      if (childFamilies && childFamilies.length > 0) {
        // Child is a parent in one or more families:
        // render those family units directly under this family,
        // instead of a solo child row.
        childFamilies.forEach(cf => {
          const subLi = renderFamily(cf, new Set(visited));
          if (subLi) ul.appendChild(subLi);
        });
      } else {
        // Leaf child: show as a single person box
        const childLi = document.createElement("li");

        const link = document.createElement("a");
        link.className = "person-box";
        link.href = child.link;
        link.textContent = child.name;
        childLi.appendChild(link);

        ul.appendChild(childLi);
      }
    });

    li.appendChild(ul);
  }


  return li;
}

// Only attach DOM listeners in the browser, not when running with Node
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const rootUl = document.getElementById("tree-root");

    // Render each top-level family (grandparents couples) with their descendants
    rootFamilies.forEach(unit => {
      const li = renderFamily(unit);
      if (li) rootUl.appendChild(li);
    });
  });
}
