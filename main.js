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
    parents: ["deanna", "kevin"]
  },
  {
    id: "megan",
    name: "Megan Hammond",
    dob: "September 11, 1996",
    dod: "TBD",
    gender: "M",
    bio: "PooPooPeePee doodie head",
    photo: "megan.jpg",
    parents: [],
    spouse: ["dalton"]
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
    id: "kevin",
    name: "Kevin Johnson",
    dob: "January 06, 1969",
    dod: "TBD",
    gender: "M",
    bio: "",
    photo: "kevin.jpg",
    parents: ["bobby", "susan"]
  },
  {
    id: "robbie",
    name: "Robbie LastName",
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
    id: "susan",
    name: "Susan Johnson",
    dob: "",
    dod: "",
    gender: "F",
    bio: "",
    photo: "susan.jpg",
    parents: []
  },
  {
    id: "bobby",
    name: "Bobby Johnson",
    dob: "",
    dod: "",
    gender: "M",
    bio: "",
    photo: "bobby.jpg",
    parents: []
  },
  {
    id: "jr",
    name: "Curtis Hammond Jr.",
    dob: "December 03, 1965",
    dod: "",
    gender: "M",
    bio: "",
    photo: "curtis_jr.jpg",
    parents: ["eileen", "curtis"]
  },
  {
    id: "diane",
    name: "Diane Hammond",
    dob: "",
    dod: "",
    gender: "F",
    bio: "",
    photo: "diane.jpg",
    parents: []
  },
  {
    id: "seth",
    name: "Seth Hammond",
    dob: "",
    dod: "",
    gender: "M",
    bio: "",
    photo: "seth.jpg",
    parents: ["jr", "diane"]
  },
  {
    id: "taylor",
    name: "Taylor Hammond",
    dob: "",
    dod: "",
    gender: "F",
    bio: "",
    photo: "taylor.jpg",
    parents: ["jr", "diane"]
  },
];


// ---------- SHARED LOOKUPS / RELATIONSHIPS ----------

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

// Helper: link to the single person template page
function getPersonHref(personId) {
  // Root-based path so it works from both /index.html and /people/index.html
  return `/people/index.html?id=${personId}`;
}

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

// ---------- RENDERING THE TREE (for index.html) ----------

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
    // Use our new helper instead of the old folder link
    link.href = getPersonHref(person.id);
    link.textContent = person.name || person.id;

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
        // Again, use the central helper
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

// Only attach DOM listeners in the browser, not when running with Node
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const rootUl = document.getElementById("tree-root");
    // If this page doesn't have the tree container (like people/index.html), do nothing
    if (!rootUl) return;

    // Render each top-level family (grandparents couples) with their descendants
    rootFamilies.forEach(unit => {
      const li = renderFamily(unit);
      if (li) rootUl.appendChild(li);
    });
  });
}
