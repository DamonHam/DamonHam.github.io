const people = [
  {
    id: "damon",
    name: "Damon Hammond",
    dob: "March 02, 1996",
    dod: "Hopefully Soon",
    gender: "M",
    bio: "Does things and stuff",
    photo: "damon.jpg",
    parents: ["deanna", "kevin"],
    spouse: ["amelia"]
  },
  {
    id: "amelia",
    name: "Amelia Vela(Hammond)",
    dob: "January 20, 1996",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "amelia.jpg",
    parents: [],
    spouse : ["damon"]
  },
  {
    id: "camila",
    name: "Camila Hammond",
    dob: "January 08, 2022",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "camila.jpg",
    parents: ["damon", "amelia"]
  },
  {
    id: "dalton",
    name: "Dalton Hammond",
    dob: "October 24, 1993",
    dod: "TBD",
    gender: "M",
    bio: "",
    photo: "dalton.jpg",
    parents: ["deanna", "kevin"],
    spouse: ["megan"]
  },
  {
    id: "megan",
    name: "Megan Hammond",
    dob: "September 11, 1996",
    dod: "TBD",
    gender: "F",
    bio: "PooPooPeePee doodie head",
    photo: "megan.jpg",
    parents: [],
    spouse: ["dalton"]
  },
  {
    id: "luna",
    name: "Luna Hammond",
    dob: "IDK",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "luna.jpg",
    parents: ["dalton", "megan"],
  },
  {
    id: "kaden",
    name: "Kaden Hammond",
    dob: "May 26, 2008",
    dod: "",
    gender: "M",
    bio: "",
    photo: "kaden.jpg",
    parents: ["deanna", "robbie"]
  },
  {
    id: "deanna",
    name: "Deanna Hammond (Pohlman)",
    dob: "September 11, 1973",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "deanna.jpg",
    parents: ["eileen", "curtis"],
    spouse: ["Ronald Pohlman"]
  },
  {
    id: "ron",
    name: "Ronald Pohlman",
    dob: "",
    dod: "TBD",
    gender: "M",
    bio: "",
    photo: "ron.jpg",
    parents: [],
    spouse: ["deanna"]
  },
  {
    id: "robbie",
    name: "Robbie Elson",
    dob: "",
    dod: "",
    gender: "M",
    bio: "",
    photo: "robbie.jpg",
    parents: []
  },
  {
    id: "eileen",
    name: "Eileen Chambers (Hammond)",
    dob: "May 24, 1949",
    dod: "July 30, 2011",
    gender: "F",
    bio: "",
    photo: "eileen.jpg",
    parents: [],
    spouse: ["curtis"]
  },
  {
    id: "curtis",
    name: "Curtis (Jim) Hammond Sr.",
    dob: "September 8, 1945",
    dod: "July 30, 2011",
    gender: "M",
    bio: "",
    photo: "curtis_sr.jpg",
    parents: [],
    spouse: ["eileen"]
  },
  {
    id: "trina",
    name: "Bettrina Hammond",
    dob: "March 08, 1969",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "trina.jpg",
    parents: ["eileen", "curtis"]
  },
  {
    id: "jr",
    name: "Curtis Hammond Jr.",
    dob: "December 03, 1967",
    dod: "",
    gender: "M",
    bio: "",
    photo: "curtis_jr.jpg",
    parents: ["eileen", "curtis"]
  },
  {
    id: "diane",
    name: "Diane Hammond",
    dob: "May 29, 1976",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "diane.jpg",
    parents: []
  },
  {
    id: "seth",
    name: "Seth Hammond",
    dob: "May 11, 2000",
    dod: "",
    gender: "M",
    bio: "",
    photo: "seth.jpg",
    parents: ["jr", "diane"]
  },
  {
    id: "taylor",
    name: "Taylor Hammond",
    dob: "April 29, 2002",
    dod: "",
    gender: "M",
    bio: "",
    photo: "taylor.jpg",
    parents: ["jr", "diane"]
  },
  {
    id: "susan",
    name: "Susan Johnson",
    dob: "September 06, 1945",
    dod: "September 26, 2025",
    gender: "F",
    bio: "",
    photo: "susan.jpg",
    parents: []
  },
  {
    id: "bobby",
    name: "Bobby Johnson",
    dob: "",
    dod: "March 26, 2024",
    gender: "M",
    bio: "",
    photo: "bobby.jpg",
    parents: []
  },
  {
    id: "kevin",
    name: "Kevin Johnson",
    dob: "January 06, 1969",
    dod: "TBD",
    gender: "M",
    bio: "",
    photo: "kevin.jpg",
    parents: ["bobby", "susan"],
    spouse: ["michelle"]
  },
  {
    id: "michelle",
    name: "Michelle Johnson (maidenName)",
    dob: "",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "michelle.jpg",
    parents: [],
    spouse: ["kevin"]
  },
  {
    id: "scott",
    name: "Scott Johnson",
    dob: "",
    dod: "TBD",
    gender: "M",
    bio: "",
    photo: "scott.jpg",
    parents: ["bobby", "susan"],
    spouse: ["jennifer"]
  },
  {
    id: "jennifer",
    name: "Jennifer Johnson (maidenName)",
    dob: "",
    dod: "TBD",
    gender: "F",
    bio: "",
    photo: "jennifer.jpg",
    parents: [],
    spouse: ["scott"]
  },
  {
    id: "cara",
    name: "Cara Johnson (Ham)",
    dob: "",
    dod: "TBD",
    gender: "M",
    bio: "",
    photo: "cara.jpg",
    parents: ["bobby", "susan"],
    spouse: []
  },
];


// Fast lookup by id
const peopleById = Object.fromEntries(
  people.map(p => [p.id, p])
);

// Build children list for each person
people.forEach(person => {
  person.children = people
    .filter(p => p.parents.includes(person.id))
    .map(p => p.id);
});

// Build siblings list for each person
people.forEach(person => {
  person.siblings = people
    .filter(p =>
      p.id !== person.id &&
      p.parents.some(parentId => person.parents.includes(parentId))
    )
    .map(p => p.id);
});

// Link to a person's page
function getPersonHref(personId) {
  return `/people/index.html?id=${personId}`;
}


// =======================
// FAMILY UNIT CONSTRUCTION
// =======================

// Every child with two parents defines a "parent pair" unit
function parentPairKey(child) {
  if (!child.parents || child.parents.length < 2) return null;
  const pair = [...child.parents].sort();
  return pair.join("|");
}

const familyUnitsByKey = {};

people.forEach(child => {
  const key = parentPairKey(child);
  if (!key) return;

  if (!familyUnitsByKey[key]) {
    familyUnitsByKey[key] = {
      key,
      parents: [...child.parents],
      children: []
    };
  }

  familyUnitsByKey[key].children.push(child.id);
});

const familyUnits = Object.values(familyUnitsByKey);

// Reverse: which family units is a person a parent in
const familiesByParentId = {};
familyUnits.forEach(unit => {
  unit.parents.forEach(pid => {
    if (!familiesByParentId[pid]) familiesByParentId[pid] = [];
    familiesByParentId[pid].push(unit);
  });
});

// Find which ids are ever children, to identify roots
const allChildrenIds = new Set();
familyUnits.forEach(unit => {
  unit.children.forEach(c => allChildrenIds.add(c));
});

// Root families = families whose parents are not children in any other family
const rootFamilies = familyUnits.filter(unit =>
  unit.parents.every(pid => !allChildrenIds.has(pid))
);


// ============================
// TREE RENDERING FOR index.html
// ============================

function renderFamily(unit, visited = new Set(), branchIndex = 0) {
  if (!unit || !unit.key) return null;

  // avoid infinite loops if bad data creates a cycle
  if (visited.has(unit.key)) return null;
  visited.add(unit.key);

  const li = document.createElement("li");

  // ----- Parents row -----
  const parentDiv = document.createElement("div");
  parentDiv.className = "parent-pair";

  unit.parents.forEach(parentId => {
    const person = peopleById[parentId];
    if (!person) return;

    const link = document.createElement("a");
    // add branch-specific class for color
    link.className = `person-box branch-${branchIndex}`;
    link.href = getPersonHref(person.id);
    link.textContent = person.name || person.id;

    parentDiv.appendChild(link);
  });

  li.appendChild(parentDiv);

  // ----- Children row -----
  if (unit.children && unit.children.length > 0) {
    const ul = document.createElement("ul");

    unit.children.forEach(childId => {
      const child = peopleById[childId];
      if (!child) return;

      const childFamilies = familiesByParentId[childId];

      if (childFamilies && childFamilies.length > 0) {
        // Child is a parent in one or more family units
        childFamilies.forEach(cf => {
          const subLi = renderFamily(cf, new Set(visited), branchIndex);
          if (subLi) ul.appendChild(subLi);
        });

      } else {
        // Just a simple child node
        const childLi = document.createElement("li");

        const link = document.createElement("a");
        link.className = `person-box branch-${branchIndex}`;
        link.href = getPersonHref(child.id);
        link.textContent = child.name || child.id;

        childLi.appendChild(link);
        ul.appendChild(childLi);
      }
    });

    li.appendChild(ul);
  }

  return li;
}


// =========================
// PAGE INITIALIZATION HOOK
// =========================

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const rootUl = document.getElementById("tree-root");
    if (!rootUl) return;

    // Each independent root family gets its own branch index
    rootFamilies.forEach((unit, index) => {
      const li = renderFamily(unit, new Set(), index);
      if (li) rootUl.appendChild(li);
    });
  });
}
